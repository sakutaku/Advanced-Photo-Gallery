import React from 'react';
import { Photo } from '../../type';
import { apiUrl } from '../../constants';
import './PhotoItem.css';
import { Modal } from '@mui/material';
import { Link } from 'react-router-dom';

interface Props {
  photo: Photo;
  userPhotos?: boolean;
}
const PhotoItem: React.FC<Props> = ({photo, userPhotos}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const imageLink = apiUrl + '/' + photo.image;

  return (
    <>
      <div className="card">
        <div className="card-click">
          <img
            className="card-image"
            src={imageLink}
            alt={photo.title}/>
        </div>
        <div className="card-title-wrap" onClick={handleOpen}>
          <span className="card-title">{photo.title}</span>
        </div>
        {userPhotos
          ? null
          :
          <div className="card-author">Made by:
            <span>
              <Link to={`/users/${photo.user._id}`} className="card-user">
                {photo.user.displayName}
              </Link>
            </span>
          </div>
        }
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{border: 'none'}}
      >
        <div className="modal">
          <img
            className="card-image-big"
            src={imageLink}
            alt={photo.title}
          />
          <div>
            <button onClick={handleClose} className="modal-btn">Close</button>
          </div>
        </div>
      </Modal>
    </>

  );
};

export default PhotoItem;