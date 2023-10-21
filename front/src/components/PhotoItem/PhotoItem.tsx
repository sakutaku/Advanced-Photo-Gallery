import React from "react";
import { Photo } from "../../type";
import { apiUrl, userRoles } from "../../constants";
import "./PhotoItem.css";
import { Modal } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { selectUser } from "../../store/usersSlice";
import { deletePhoto, fetchPhotos } from "../../store/photosThunk";

interface Props {
  photo: Photo;
  userPhotos?: boolean;
  id?: string;
}

const PhotoItem: React.FC<Props> = ({ photo, userPhotos, id }) => {
  const [open, setOpen] = React.useState(false);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const imageLink = apiUrl + "/" + photo.image;

  const onDelete = (id: string) => {
    if (window.confirm(`Do you want to delete ${photo.title} ?`)) {
      dispatch(deletePhoto(id));
      dispatch(fetchPhotos());
      navigate("/");
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-click">
          <img className="card-image" src={imageLink} alt={photo.title} />
        </div>
        <div className="card-title-wrap" onClick={handleOpen}>
          <span className="card-title">{photo.title}</span>
        </div>
        {userPhotos && user?._id === id ? (
          <div className="card-author">
            <button
              onClick={() => onDelete(photo._id)}
              className="card-delete"
            ></button>
          </div>
        ) : (
          <div className="card-author">
            Made by:
            <span>
              <Link to={`/users/${photo.user._id}`} className="card-user">
                {photo.user.displayName}
              </Link>
            </span>
            {user && user.role === userRoles.admin ? (
              <button
                onClick={() => onDelete(photo._id)}
                className="card-delete"
              ></button>
            ) : null}
          </div>
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ border: "none" }}
      >
        <div className="modal">
          <img className="card-image-big" src={imageLink} alt={photo.title} />
          <div>
            <button onClick={handleClose} className="modal-btn">
              Close
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PhotoItem;
