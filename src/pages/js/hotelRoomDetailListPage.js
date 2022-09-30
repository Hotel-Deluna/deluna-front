import React from "react";
import AuthLayout from "../../components/auth/authLayout";
import RoomDetailList from "../../containers/hotel/roomDetailList";
const HotelRoomDetailListPage = () => {
    return(
        <AuthLayout>
            <RoomDetailList />
        </AuthLayout>
    );
}

export default HotelRoomDetailListPage;