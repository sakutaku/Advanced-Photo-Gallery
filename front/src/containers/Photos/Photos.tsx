import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { selectPhotos, selectPhotosLoading } from "../../store/photosSlice";
import { Fade } from "react-awesome-reveal";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import { fetchPhotos } from "../../store/photosThunk";
import Spinner from "../../components/Spinner/Spinner";
import "./Photos.css";
import CategoryBar from "../../components/CategoryBar/CategoryBar";
import { fetchCategories } from "../../store/categoriesThunk";
import { selectCategories } from "../../store/categoriesSlice";

const Photos = () => {
  const dispatch = useAppDispatch();
  const photos = useAppSelector(selectPhotos);
  const categories = useAppSelector(selectCategories);
  const photosLoading = useAppSelector(selectPhotosLoading);

  useEffect(() => {
    dispatch(fetchPhotos());
    dispatch(fetchCategories());
  }, [dispatch]);

  if (photosLoading) {
    return (
      <div className="container">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container">
      <CategoryBar categories={categories} />
      <div className="photos-page">
        {photos.map((photo) => (
          <Fade key={photo._id}>
            <PhotoItem photo={photo} />
          </Fade>
        ))}
      </div>
    </div>
  );
};

export default Photos;
