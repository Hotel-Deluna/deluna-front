import React, { useEffect } from "react";
import {Container, Button} from 'react-bootstrap';
import ReservationList from "../../components/client/reservation";
const ClientReservation = () => {
    return (
        <>
            <Container>
                <ReservationList />
            </Container>
            
        </>
    );
};

export default ClientReservation;