import React from "react";

const EditedImage = ({ editedImage, handleDownload }) => {
  return (
    <>
      {editedImage && (
        <div className="image-container">
          <div className="first">
            <h2>Edited Image:</h2>
            <img src={editedImage} alt="Edited" />
          </div>
          <div className="second">
            <button className="down" onClick={handleDownload}>
              Download
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditedImage;
