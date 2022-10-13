import React from "react";
import { useLocation } from "react-router-dom";
import ReservationContainer from "../../containers/client/reservationContainer";

const ReservationPage = () => {
    const location = useLocation();

    

    return(
        <ReservationContainer reservationList={location.state && location.state.reservationList}  />
    )
}

export default ReservationPage;