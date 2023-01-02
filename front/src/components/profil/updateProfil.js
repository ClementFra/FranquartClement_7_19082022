import React, { useState } from "react";

//  Actions
import { updateUser } from "../actions/userActions";

//  Components
import DeleteProfil from "./deleteProfil";

//  Redux
import { useDispatch, useSelector } from "react-redux";

//  Styles
import { Card, Container, Row, Col, Button } from "react-bootstrap";

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
    <Container>
      <Row>
        <Col sm={5}>
          <Card>
            <Card.Header as="h4">Biographie</Card.Header>
            <Card.Body>
              <Card.Text onClick={() => setUpdateForm(!updateForm)}>
                {userData.biography}
              </Card.Text>
            </Card.Body>

            {updateForm === false && (
              <Button
                variant="secondary"
                onClick={() => setUpdateForm(!updateForm)}
              >
                Modifier ma biographie
              </Button>
            )}

            {updateForm && (
              <>
                <textarea
                  type="text"
                  defaultValue={userData.biography}
                  onChange={(e) => setBiography(e.target.value)}
                ></textarea>
                <Button onClick={handleUpdate}>Valider</Button>
              </>
            )}

            <Card.Footer>
              <h6>Membre depuis {dateParser(userData.createdAt)}</h6>
              <DeleteProfil />
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateProfil;
