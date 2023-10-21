import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { selectPhotos, selectPhotosLoading } from "../../store/photosSlice";
import { Fade } from "react-awesome-reveal";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import { fetchPhotos } from "../../store/photosThunk";
import Spinner from "../../components/Spinner/Spinner";
import "./Photos.css";

const Photos = () => {
  const dispatch = useAppDispatch();
  const photos = useAppSelector(selectPhotos);
  const photosLoading = useAppSelector(selectPhotosLoading);

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  if (photosLoading) {
    return (
      <div className="container">
        <Spinner />
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <Fade>
        <div className="photos-page-nonavailable">No photos available.</div>
      </Fade>
    );
  }

  return (
    <div className="container">
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
