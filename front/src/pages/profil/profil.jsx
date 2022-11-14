 import React, { useContext } from 'react';

// // Components
 import Login from '../login/login';
 import UpdateProfil from '../../components/profil/updateProfil';

// // Context
 import { UidContext } from '../../contexts/appContext';

// // Styles
 import { Container } from 'react-bootstrap';

 const Profil = () => {
   const uid = useContext(UidContext);

   return (
     <Container fluid>
       {uid ? (
         <UpdateProfil />
      ) : (
        <Login signin={false} signup={true} />
       )}
     </Container>
   )
 };

 export default Profil;