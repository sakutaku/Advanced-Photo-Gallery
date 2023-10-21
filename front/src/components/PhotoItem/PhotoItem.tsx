import React from 'react';
import { Photo } from '../../type';
import { apiUrl } from '../../constants';
import './PhotoItem.css';

interface Props {
  photo: Photo;
}
const PhotoItem: React.FC<Props> = ({photo}) => {
  return (
    <div className="card">
      <div>
        <img
          className="card-image"
          src={apiUrl + '/' + photo.image}
          alt={photo.title}/>
      </div>
      <div className="card-title-wrap">
        <span className="card-title">{photo.title}</span>
      </div>
      <div className="card-author">Made by: {photo.user.username}</div>
    </div>
  );
};

export default PhotoItem;