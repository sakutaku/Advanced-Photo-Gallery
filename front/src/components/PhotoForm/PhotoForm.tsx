import React, { useEffect, useState } from "react";
import { PhotoMutation } from "../../type";
import FileInput from "../FileInput/FileInput";
import { useSelector } from "react-redux";
import { selectAddError, selectCreateLoading } from "../../store/photosSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { createPhoto } from "../../store/photosThunk";
import { selectUser } from "../../store/usersSlice";
import BtnSpinner from "../Spinner/BtnSpinner";
import { fetchCategories } from "../../store/categoriesThunk";
import { selectCategories } from "../../store/categoriesSlice";

const PhotoForm = () => {
  const [state, setState] = useState<PhotoMutation>({
    title: "",
    image: null,
    category: "",
  });
  const error = useSelector(selectAddError);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectCreateLoading);
  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const filesInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (user) {
      try {
        await dispatch(createPhoto(state)).unwrap();
        navigate("/");
      } catch (e) {
        alert("Something is wrong!");
      } finally {
        setState(() => ({
          title: "",
          image: null,
          category: "",
        }));
      }
    }
  };

  return (
    <form className="form" onSubmit={submitFormHandler}>
      <h2 className="form-title">Add new photo</h2>
      <div className="input-wrap">
        <label className="form-label">Title</label>
        {error ? <span className="error">{error.error}</span> : null}
        <input
          className={error ? "form-control-error" : "form-control"}
          name="title"
          type="text"
          value={state.title}
          onChange={inputChangeHandler}
        />
      </div>
      <>
        <FileInput
          onChange={filesInputChangeHandler}
          name="image"
          label="Image:"
        />
      </>
      <div className="input-wrap">
        <select
          value={state.category}
          required
          onChange={inputChangeHandler}
          name="category"
          id="category"
          className="form-control"
        >
          <option value="" disabled defaultValue="">
            Select category
          </option>
          {categories.map((item, index) => (
            <option value={item._id} key={index}>
              {item.title}
            </option>
          ))}
        </select>
      </div>
      <div className="input-wrap">
        <button className="form-btn" type="submit" disabled={loading}>
          {loading && <BtnSpinner />}
          Add
        </button>
      </div>
    </form>
  );
};

export default PhotoForm;
