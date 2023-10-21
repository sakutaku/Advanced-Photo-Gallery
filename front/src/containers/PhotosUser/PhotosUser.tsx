import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PhotosUser.css';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { selectPhotos, selectPhotosLoading } from '../../store/photosSlice';
import { fetchPhotos } from '../../store/photosThunk';
import Spinner from '../../components/Spinner/Spinner';
import { Fade } from 'react-awesome-reveal';
import PhotoItem from '../../components/PhotoItem/PhotoItem';

const PhotosUser = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const photos = useAppSelector(selectPhotos);
  const photosLoading = useAppSelector(selectPhotosLoading);

  useEffect(() => {
    if(id) {
      dispatch(fetchPhotos(id));
    }
  }, [dispatch, id]);

  if (photosLoading) {
    return <div className="container"><Spinner/></div>;
  }

  if (photos.length === 0) {
    return <Fade>
      <div className="photos-page-nonavailable">No photos available.</div>
    </Fade>;
  }

  return (
    <div className="container photos-user-page">
      {photos.map(photo =>
        <Fade key={photo._id}>
          <PhotoItem photo={photo} userPhotos={true}/>
        </Fade>
      )
      }
    </div>
  );
};

export default PhotosUser;