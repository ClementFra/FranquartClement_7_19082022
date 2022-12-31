import React, { useState } from "react";

//  Actions
import { uploadPicture } from "../actions/userActions";

//  Redux
import { useDispatch, useSelector } from "react-redux";

//  Styles
import { Form, Button } from "react-bootstrap";

const UploadImage = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const handleAvatar = (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("file", file);
    dispatch(uploadPicture(data, userData.id));
  };

  return (
    <Form
      encType="multipart/form-data"
      onSubmit={handleAvatar}
    >
      <Form.Group>
        <Form.Control
          type="file"
          id="file"
          name="file"
          accept=".jpg, .jpeg, .png"
          onChange={(event) => setFile(event.target.files[0])}
        />
      </Form.Group>

      <Button>Envoyer</Button>
    </Form>
  );
};

export default UploadImage;
