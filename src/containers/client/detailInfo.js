import React, {useState, useEffect} from "react";
import InfoHotel from "../../components/client/infoHotel";

import {room_list, room_code} from "../../modules/hotel/roomMainActions";
import {hotel_info, hotel_info_reset} from "../../modules/hotel/hotelInfoActions";
import {hotel_code} from "../../modules/hotel/hotelMainActions";
import { connect } from "react-redux";
import { useSearchParams, useNavigate } from 'react-router-dom';

const DetailInfo = ({hotel_info, info, hotel_code, hotelCode, room_list, roomList, room_code, roomCode}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchValue, setSearchValue] = useState(searchParams.get('hotelNum'));
    const [hotelInfo, setHotelInfo] = useState([]);
    const [room_arr, setRoom_arr] = useState([]);
    const [hotelCodes, setHotelCodes] = useState([]);
    const [RoomCodes, setRoomCodes] = useState([]);
    const [hotelImgIdx, setHotelImgIdx] = useState(0);
    const [hotelImgMaxIdx, setHotelImgMaxIdx] = useState(0);
    const [roomModalOpen, setRoomModalOpen] = useState(false);
    const [imgType, setImgType] = useState(0);
    const [modalIdx, setModalIdx] = useState(0);
    
    let navigate = useNavigate();
    //첫진입 시 호텔정보, 객실리스트 조회
    useEffect(() => {
        //console.log('searchValue', searchValue);
        if(searchValue !== undefined){
            //console.log('searchValue',searchValue);
            hotel_info(searchValue);
        }
        return () => {
            hotel_info_reset();
        };
    },[]);

    useEffect(() => {
        if(info) {
            if(info.result === 'OK'){ 
                console.log(info.data);
                setHotelInfo(info.data);
                const img_copy = JSON.parse(JSON.stringify(info.data.image));
                //console.log(img_copy);
                if(img_copy.length > 0){
                    setHotelImgMaxIdx((img_copy.length-1));
                }
                room_list({hotel_num : searchValue, page: 1, page_cnt: 10});
                hotel_code();
            }else{ //실패할 경우 error 노출하고 main 페이지 이동
                //console.log(info);
                alert("호텔 정보 조회가 실패하였습니다.");
                navigate("/search");
            }
        }
    },[hotel_info, info]);

    useEffect(() => {
        if(roomList){
            //console.log(roomList);
            if(roomList.result === 'OK'){
                //console.log('roomList.data',roomList.data);
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
                navigate("/search");
            }
        }
    },[room_list, roomList]);

    useEffect(() => {
        if(roomCode){
            if(roomCode.result === 'OK'){
                setRoomCodes(roomCode.data);
            }
        }
    },[hotel_code, roomCode]);

    useEffect(() => {
        if(hotelCode){
            if(hotelCode.result === 'OK'){
                setHotelCodes(hotelCode.data);
            }
        }
    },[room_code, hotelCode]);

    //호텔 이미지 버튼 시
    const handleImgBtnClick = (e) => {
        let {name} = e.currentTarget;
        if(name.split('_')[0] === 'hotelImg'){
            let type = name.split('_')[1];
            if(type === 'minus'){setHotelImgIdx((hotelImgIdx-1))}
            else if(type === 'plus'){setHotelImgIdx((hotelImgIdx+1))}
        }
    }
    //이미지 클릭시
    function handleImgClick(type, idx){
        setImgType(type);
        setModalIdx(idx);
        setRoomModalOpen(true);
    }
    
    return(
        <InfoHotel hotelInfo={hotelInfo} room_arr={room_arr} hotelCodes={hotelCodes} RoomCodes={RoomCodes} hotelImgIdx={hotelImgIdx} hotelImgMaxIdx={hotelImgMaxIdx} handleImgBtnClick={handleImgBtnClick}
            roomModalOpen={roomModalOpen} setRoomModalOpen={setRoomModalOpen} handleImgClick={handleImgClick} imgType={imgType} modalIdx={modalIdx}
        />
    );
}

//export default DetailInfo;
export default connect(
    () =>  ({hotelInfoActions, hotelMainActions,roomMainActions}) => ({
        info : hotelInfoActions.info,
        hotelCode : hotelMainActions.code,
        roomList : roomMainActions.roomList,
        roomCode : roomMainActions.code
        
    }),
    {
        hotel_info,
        hotel_info_reset,
        hotel_code,
        room_list,
        room_code
    }
)(DetailInfo);