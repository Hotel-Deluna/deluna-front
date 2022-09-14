import React, {useState} from "react";
import RoomForm from "../../components/hotel/roomForm";

const RoomRegister = ({setRoomModalOpen, roomModalOpen}) => {

    const closeOnClick = () => {//모달 닫기
        setRoomModalOpen(false);
      }

    return(
        <RoomForm type={'0'} closeOnClick={closeOnClick} roomModalOpen={roomModalOpen} />
    );
}

export default RoomRegister;