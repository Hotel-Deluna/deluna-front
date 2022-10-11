import React,{useState, useEffect} from "react";
import ReservationComponent from "../../components/client/reservationComponent";

const ReservationContainer = (props) => {
    const [list, setList] = useState({});
    const [roomInfoList, setroomInfoList] = useState({});
    useEffect(() => {
        console.log(props.reservationList);
        console.log('roomList', props.reservationList.roomList);
        setList(JSON.parse(JSON.stringify(props.reservationList)));
        //roomInfoList()
    },[]);

    return(
       <ReservationComponent list={list} />
    );

}

export default ReservationContainer;