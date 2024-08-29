import React, { useState, useEffect, useCallback } from "react";
import "./CategoryBar.css";
import { ICategory } from "../../type";
import { useAppDispatch } from "../../app/hook";
import { fetchByCategory, fetchPhotos, filterByTitle } from "../../store/photosThunk";
import { debounce } from 'lodash';

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
      dispatch(filterByTitle(searchTerm));
    }, 3000), // Delay of 300ms
    [dispatch]
  );

  useEffect(() => {
    if (searchTerm) {
      debouncedFetchPhotosByTitle(searchTerm);
    } else {
      // Optionally, you can dispatch an action to fetch all photos when searchTerm is empty
      // dispatch(filterByTitle(""));
    }
  }, [searchTerm, debouncedFetchPhotosByTitle, dispatch]);

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
