import React, { useState } from "react";
import "./CategoryBar.css";
import { ICategory } from "../../type";

interface Props {
  categories: ICategory[];
}

const CategoryBar: React.FC<Props> = ({ categories }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

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
          <div key={index}>{category?.title}</div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
