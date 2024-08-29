import React, { useState } from "react";
import "./CategoryBar.css";
import { ICategory } from "../../type";
import { useAppDispatch } from "../../app/hook";
import { fetchByCategory } from "../../store/photosThunk";

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
