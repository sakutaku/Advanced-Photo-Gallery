import React from 'react';
import { Photo } from '../../type';
import { apiUrl } from '../../constants';
import './PhotoItem.css';
import { Modal } from '@mui/material';

interface Props {
  photo: Photo;
}
const PhotoItem: React.FC<Props> = ({photo}) => {
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
        <div className="card-author">Made by:
          <span>{photo.user.displayName}</span>
        </div>
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