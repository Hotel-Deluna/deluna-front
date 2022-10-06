import React, {useState, useEffect} from "react";

import {room_list, room_code} from "../../modules/hotel/roomMainActions";
import RoomDetailListTable from "../../components/hotel/roomDetailListTable";
/* redux 영역 */
import { connect } from "react-redux";
import { useSearchParams, useNavigate } from 'react-router-dom';

const RoomDetailList = ({room_list, roomList, room_code, code}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchValue, setSearchValue] = useState(searchParams.get('hotelNum'));
    const [room_arr, setRoom_arr] = useState([]);
    const [code_arr, setCode_arr] = useState([]);
    const [roomModalOpen, setRoomModalOpen] = useState(false);
    const [type, setType] = useState(0);
    const [room_num, setRoom_num] = useState(0);
    
    const showRoomModal = (e) => {
        const {name} = e.currentTarget;
        if(name === 'register'){
            setType(0);
        }else if(name.split('_')[0] === 'modify'){
            const idx = name.split('_')[1];
            setRoom_num(room_arr[idx].room_num);
            setType(1);
        }
        setRoomModalOpen(true);
    };
    let navigate = useNavigate();

    //진입 시 모든 리스트가 보여줘야 함
    useEffect(() => {
        //console.log('searchValue', searchValue);
        room_list({hotel_num : searchValue, page : 1, page_cnt : 10});
    },[])
    useEffect(() => {
        if(roomList){
            //console.log(roomList);
            if(roomList.result === 'OK'){
                console.log('roomList.data',roomList.data);
                room_code();
                const room_copy = JSON.parse(JSON.stringify(roomList.data));
                for(var i=0; i<room_copy.length; i++){
                    let comma_weekday_price = roomList.data[i].weekday_price.toString();
                    let comma_weekend_price = roomList.data[i].weekend_price.toString();
                    let comma_p_weekday_price = roomList.data[i].p_weekday_price.toString();
                    let comma_p_weekend_price = roomList.data[i].p_weekend_price.toString();
                    
                    room_copy[i].weekday_price = comma_weekday_price.replace(/\B(?=(\d{3})+(?!\d))/g,",");
                    room_copy[i].weekend_price = comma_weekend_price.replace(/\B(?=(\d{3})+(?!\d))/g,",");
                    room_copy[i].p_weekday_price = comma_p_weekday_price.replace(/\B(?=(\d{3})+(?!\d))/g,",");
                    room_copy[i].p_weekend_price = comma_p_weekend_price.replace(/\B(?=(\d{3})+(?!\d))/g,",");
                    room_copy[i].roomStatusCheck = false;
                    let detail_copy = JSON.parse(JSON.stringify(roomList.data[i].room_detail_info));
                    let cnt = 0;
                    for(var j=0; j< detail_copy.length; j++){
                        if(parseInt(detail_copy[j].status) === 1){//테스트용
                        //if(!detail_copy[j].available_yn){    
                            cnt = 1;
                            let start_date = roomList.data[i].room_detail_info[j].room_closed_start.toString();
                            let end_date = roomList.data[i].room_detail_info[j].room_closed_end.toString();//.replace(/\T.*/,'')
                            detail_copy[j].room_closed_start = start_date.replace(/\T.*/,'');
                            detail_copy[j].room_closed_end = end_date.replace(/\T.*/,'');
                        }
                    }
                    if(cnt === 1){
                        room_copy[i].room_detail_info = detail_copy;
                    }
                }
                setRoom_arr(room_copy);
            }else{
                alert("객실 리스트 조회 실패");
                navigate("/auth/hotel/main");
            }
        }
    },[room_list, roomList]);

    useEffect(() => {
        if(code){
            if(code.result === 'OK'){
                setCode_arr(code.data);
            }else{
                alert("객실 코드 조회가 안됩니다.");
                navigate("/auth/hotel/main");
            }
        }
    },[room_code, code]);

    const handleClick = (e) => {
        const {name} = e.currentTarget;
        //console.log(name);
        const room_copy = JSON.parse(JSON.stringify(room_arr));
        if(name.split('_')[0] === 'showRoom'){
            const idx = name.split('_')[1];
            if(room_copy[idx].roomStatusCheck){
                room_copy[idx].roomStatusCheck = false;
            }else{
                room_copy[idx].roomStatusCheck = true;
            }
            setRoom_arr(room_copy);
        }
    }
    return(
        <RoomDetailListTable room_arr={room_arr} code_arr={code_arr} handleClick={handleClick} setRoomModalOpen={setRoomModalOpen} showRoomModal={showRoomModal} roomModalOpen={roomModalOpen} type={type} room_num={room_num} />
    );
}

export default connect(
    () => ({ roomMainActions}) => ({
        roomList : roomMainActions.roomList,
        code : roomMainActions.code
    }), {
        room_list,
        room_code
    }
)(RoomDetailList);