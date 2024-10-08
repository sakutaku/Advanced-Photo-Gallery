import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./PhotosUser.css";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { selectPhotos, selectPhotosLoading } from "../../store/photosSlice";
import { fetchPhotos } from "../../store/photosThunk";
import Spinner from "../../components/Spinner/Spinner";
import { Fade } from "react-awesome-reveal";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import { selectUser } from "../../store/usersSlice";

const PhotosUser = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const photos = useAppSelector(selectPhotos);
  const photosLoading = useAppSelector(selectPhotosLoading);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (id) {
      dispatch(fetchPhotos(id));
    }
  }, [dispatch, id]);

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
        <div className="container">
          <div className="photos-page-nonavailable">
            <div className="photos-page-nonavailable-title">
              No photos available.
            </div>
            <div>
              {user && user._id === id ? (
                <Link to="/add-photo" className="photos-user-page-btn">
                  Add new photo
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </Fade>
    );
  }

  const items1 = photos.map((photo) => (
    <Fade key={photo._id}>
      <PhotoItem photo={photo} userPhotos={true} id={id} />
    </Fade>
  ));

  const items2 = photos.map((photo) => (
    <Fade key={photo._id}>
      <PhotoItem photo={photo} userPhotos={true} />
    </Fade>
  ));

  return (
    <div className="container">
      {user && user._id === id ? (
        <div className="photos-user-page-wrap">
          <h2 className="photos-user-page-title">
            {photos[0].user.displayName} photo gallery
          </h2>
          <Link to="/add-photo" className="photos-user-page-btn">
            Add new photo
          </Link>
        </div>
      ) : (
        <h2 className="photos-user-page-title">
          {photos[0].user.displayName} photo gallery
        </h2>
      )}
      <div className="photos-user-page">
        {user && user._id === id ? items1 : items2}
      </div>
    </div>
  );
};

export default PhotosUser;
