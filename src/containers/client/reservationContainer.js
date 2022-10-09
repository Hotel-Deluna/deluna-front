import React,{useState, useEffect} from "react";

const ReservationContainer = (props) => {
    const [list, setList] = useState({});
    useEffect(() => {
        console.log(props.reservationList);
        setList(props.reservationList);
    },[]);

    return(
        <div>
            <div>{list.hote_num}</div>
            <div>{list.hotel_ko_name}</div>
            <div>{list.hotel_en_name}</div>
            <div>{list.roomInfo}</div>
        
        </div>
    );

}

export default ReservationContainer;