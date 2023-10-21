import React from "react";
import { Fade } from "react-awesome-reveal";
import PhotoForm from "../../components/PhotoForm/PhotoForm";

const AddPhoto = () => {
  return (
    <>
      <div className="container add-page">
        <Fade>
          <PhotoForm />
        </Fade>
      </div>
    </>
  );
};

export default AddPhoto;
