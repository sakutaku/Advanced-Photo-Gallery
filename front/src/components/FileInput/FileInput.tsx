import React, { useRef, useState } from "react";
import "./FileInput.css";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
}

const FileInput: React.FC<Props> = ({ onChange, name, label }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState("");

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename("");
    }
    onChange(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  return (
    <>
      <input
        style={{ display: "none" }}
        type="file"
        name={name}
        onChange={onFileChange}
        ref={inputRef}
      />
      <div className="file-input-wrap">
        <div className="input-wrap">
          <label htmlFor={filename} className="form-label">
            {label}
          </label>
          <input
            type="text"
            id={filename}
            value={filename}
            className="form-control"
            readOnly
          />
        </div>
        <div>
          <button type="button" onClick={activateInput} className="browse-btn">
            Browse
          </button>
        </div>
      </div>
    </>
  );
};

export default FileInput;
