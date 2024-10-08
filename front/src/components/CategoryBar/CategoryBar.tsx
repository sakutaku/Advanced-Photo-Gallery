import React, { useState, useEffect, useCallback } from "react";
import { ICategory } from "../../type";
import { useAppDispatch } from "../../app/hook";
import { fetchByCategory, fetchPhotos, filterByTitle } from "../../store/photosThunk";
import { debounce } from 'lodash';
import "./CategoryBar.css";

interface Props {
  categories: ICategory[];
}

const CategoryBar: React.FC<Props> = ({ categories }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dispatch = useAppDispatch();

  const categoryClick = (id: string) => {
    try {
      dispatch(fetchByCategory(id));
    } catch (e) {
      console.log(e);
    }
  };

  const debouncedFetchPhotosByTitle = useCallback(
    debounce((searchTerm: string) => {
      dispatch(filterByTitle(searchTerm))
        .then((response) => {
          const payload = response.payload as any[]; 
          if (payload.length === 0) {
            dispatch(fetchPhotos());
          } else {
          }
        })
        .catch((error) => console.log(error));
    }, 3000),
    [dispatch]
  );

  useEffect(() => {
    if (searchTerm) {
      debouncedFetchPhotosByTitle(searchTerm);
    } 
  }, [searchTerm, debouncedFetchPhotosByTitle]);
 
  return (
    <div className="category-wrapper">
      <div className="category-input-wrap">
        <input
          name="photo"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a photo"
        />
      </div>
      <div className="select">
        {categories.map((category, index) => (
          <div key={index} onClick={() => categoryClick(category._id)}>
            {category?.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
