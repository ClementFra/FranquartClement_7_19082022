import React, { useState } from "react";

//  Actions
import { updateUser } from "../actions/userActions";


//  Components
import DeleteProfil from "./deleteProfil";

//  Redux
import { useDispatch, useSelector } from "react-redux";

//  Styles
import { Card, Container,Image, Row, Col, Button } from "react-bootstrap";
import "../sass/profil.scss";

//  Utils
import { dateParser } from "../utils/utils";

const UpdateProfil = () => {
  const [biography, setBiography] = useState("");
  const [updateForm, setUpdateForm] = useState(false);

  const userData = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateUser(userData.id, biography));
    setUpdateForm(false);
  };

  

  return (

    <Container className="profil">
      <Row className="card">
        <Col>
          <Card >
            <Card.Header className="profil__title">Votre Profil</Card.Header>
            <Card.Body>
              <Image className="profil__image"
                src='https://cdn.pixabay.com/photo/2015/01/09/11/09/meeting-594091_960_720.jpg'
                alt="avatar"
              />
            </Card.Body>
          </Card>
        </Col>

        <Col className="update">
          <Card>
            <Card.Header className="update__title">Biographie</Card.Header>
            <Card.Body className="update__text" >
              {userData.biography? userData.biography:"Vive Groupomania"}
              <Card.Text  onClick={() => setUpdateForm(!updateForm)}>
                
              </Card.Text>
            </Card.Body>
            
            {updateForm === false && (
              <Button className="update__button"  onClick={() => setUpdateForm(!updateForm)}>
                Modifier ma biographie
              </Button>
            )}

            {updateForm && (
              <>
                <textarea
                  type="text"
                  defaultValue={userData.biography}
                  onChange={e => setBiography(e.target.value)}
                ></textarea>
                <Button onClick={handleUpdate}>Valider</Button>
              </>
            )}

            <Card.Footer className="footer">
              <h6 className="footer__member">Membre depuis {dateParser(userData.createdAt)}</h6>
              <DeleteProfil />
            </Card.Footer>
          </Card>
        </Col>

      </Row>
    </Container>
  );
};

export default UpdateProfil;
