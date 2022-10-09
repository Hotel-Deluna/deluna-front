import React, {useState, useEffect} from "react";
import InfoHotel from "../../components/client/infoHotel";

import {room_code} from "../../modules/hotel/roomMainActions";
import {hotel_info, hotel_info_reset} from "../../modules/hotel/hotelInfoActions";
import * as hotelSearchReducer from "../../modules/client/hotelSearchReducer";
import {set_info, change_roomField, change_hotelField, add_roomlist, set_selectRoom, reset, set_selectOneRoom} from "../../modules/client/infoReducer";

import {hotel_code} from "../../modules/hotel/hotelMainActions";
import { useDispatch,useSelector } from "react-redux";
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

const DetailInfo = ({}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchValue, setSearchValue] = useState(searchParams.get('hotelNum'));
    const [hotelInfos, setHotelInfo] = useState([]); //호텔정보
    const [room_arr, setRoom_arr] = useState([]); //객실리스트
    const [roomArrIdx, setRoomArrIdx] = useState(0); //선택한 객실의 inxdex
    const [hotelCodes, setHotelCodes] = useState([]); // 호텔 코드
    const [roomCodes, setroomCodes] = useState([]); // 객실 코드
    const [hotelImgIdx, setHotelImgIdx] = useState(0); // 호텔이미지 index
    const [hotelImgMaxIdx, setHotelImgMaxIdx] = useState(0); //호텔 이미지 최대 갯수
    const [roomModalOpen, setRoomModalOpen] = useState(false); // 모달열림 boolean
    const [imgType, setImgType] = useState(0); // 모달에 띄울 이미지 타입 0- 호텔 1- 객실
    const [modalIdx, setModalIdx] = useState(0); // 모달에서 노출되는 이미지의 index

    const [ref, inView] = useInView();
    const [isHotelLoading, setHotelLoading] = useState(false);
    const [isRoomLoading, setRoomLoading] = useState(false);
    const [pagingIdx, setPagingIdx] = useState(0);// 스크롤 페이징 index
    
    const [selectList, setSelectList] =useState([]);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const {headerData} = useSelector(({hotelSearchReducer})=>({headerData : hotelSearchReducer.getIn(['HEADER_DATA','form'])}));
    const {info} = useSelector(({hotelInfoActions})=>({info : hotelInfoActions.info}));
    const {hotelCode} = useSelector(({hotelMainActions})=>({hotelCode : hotelMainActions.code}));
    const {roomCode} = useSelector(({roomMainActions})=>({roomCode : roomMainActions.code}));
    const {roomInfo} = useSelector(({infoReducer})=>({roomInfo: infoReducer.getIn(['hotelInfo']).toJS()}));
    const [allReservationCheck, setAllReservationCheck] = useState(false);
    const [btnIsCheck, setBtnIsCheck] = useState(false);
    //첫진입 시 호텔정보, 객실리스트 조회
    useEffect(() => {
        //console.log('searchValue', searchValue);
        if(searchValue !== undefined){
            //console.log('searchValue',searchValue);
            dispatch(hotel_info(parseInt(searchValue)));
        }
        return () => {
            dispatch(hotel_info_reset());
            dispatch(reset());
        };
    },[]);

    useEffect(() => {
        if(info) {
            if(info.result === 'OK'){ 
                //console.log(info.data);
                setHotelInfo(info.data);
                const roomList = JSON.parse(JSON.stringify(info.data.room_list));
                dispatch(set_info({data : {
                    hotel_num : parseInt(searchValue),
                    hotel_ko_name : info.data.name,
                    hotel_en_name : info.data.eng_name,
                    roomInfo : roomList[pagingIdx],
                    reservation_start_date : headerData.reservation_start_date,
                    reservation_end_date :headerData.reservation_end_date
                }}));
                setRoom_arr([roomList[pagingIdx]]);
                setPagingIdx((pagingIdx+1));
                //console.log('roomList', roomList[pagingIdx]);
                const img_copy = JSON.parse(JSON.stringify(info.data.image));
                if(info.data.image){
                    if(img_copy.length > 0 && img_copy.length !== 0){
                        setHotelImgMaxIdx((img_copy.length-1));
                    }
                }
                dispatch(hotelSearchReducer.headerData({
                    data : {
                        page : headerData.page,
                        page_cnt : headerData.page_cnt,
                        people_count : headerData.people_count,
                        room_count : headerData.room_count,
                        reservation_end_date : headerData.reservation_end_date,
                        reservation_start_date : headerData.reservation_start_date,
                        search_type : 3,
                        text : info.data.name
                    }
                }));
                setHotelLoading(true);
            }else{ //실패할 경우 error 노출하고 main 페이지 이동
                console.log(info);
                alert("호텔 정보 조회가 실패하였습니다.");
                navigate("/search");
            }
        }
    },[hotel_info, info]);

    useEffect(() => {
        if(roomCode){
            if(roomCode.result === 'OK'){
                setroomCodes(roomCode.data);
            }
        }
    },[room_code, roomCode]);

    useEffect(() => {
        if(hotelCode){
            if(hotelCode.result === 'OK'){
                setHotelCodes(hotelCode.data);
            }
        }
    },[hotel_code, hotelCode]);

    //infinitescroll
    useEffect(()=>{
        if(inView && room_arr.length !== 0) {
            if(pagingIdx < hotelInfos.room_list.length){
                setRoomLoading(false);
                setPagingIdx((pagingIdx+1));
                setRoom_arr(((roomList) => roomList.concat(hotelInfos.room_list[pagingIdx])));
                let arr = [];
                for(let i = 0; i < (pagingIdx+1); i++){
                    arr.push(hotelInfos.room_list[i]);
                }
                //console.log('arr',arr);
                dispatch(add_roomlist({data : {roomInfoList : arr, idx : arr.length}}));
                setRoomLoading(true);
            }else{
                return;
            }
          }else{
            return;
          }
      },[inView]);

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
    function handleImgClick(idx){
        const type = idx.split('_')[0];
        const modalIndex = idx.split('_')[1];
        setImgType(type === 'hotel' ? 0 : 1);
        setModalIdx(parseInt(modalIndex));
        type === 'room' && (setRoomArrIdx(parseInt(idx.split('_')[2])));//객실이미지 선택시 객실 리스트 index값을 받아와야함
        setRoomModalOpen(true);
    }
    const goDispatch = useDispatch();
    //버튼 클릭 시
    const handleClick = (e) => {
        const {name} = e.currentTarget;
        const nameArr = name.split('_');
        if(nameArr[0] === 'people'){
            const type = nameArr[1];
            const room_idx = nameArr[2];
            let value = roomInfo.roomList[room_idx].people;
            console.log(nameArr[0],nameArr[1], nameArr[2]);
            if(type === 'minus'){
                if(1 < roomInfo.roomList[room_idx].people){
                     value--;
                }
            }else{
                if(roomInfo.roomList[room_idx].people < room_arr[room_idx].maximum_people){
                    value++;
                    
                }
            }
            dispatch(change_roomField({index : room_idx,key : nameArr[0],value : value}));

        }else if(nameArr[0] === 'makeReservationOne_' || 'makeReservationAll_'){
            console.log('move',nameArr[0]);
            if(nameArr[0] === 'makeReservationAll'){
                console.log('all');
                goDispatch(set_selectRoom());
            }else{
                console.log('one', parseInt(nameArr[1]));
                goDispatch(set_selectOneRoom({index : parseInt(nameArr[1])}));
            }
            setBtnIsCheck(true);
                        
           
        }
    }

    
    useEffect(()=>{
        if(btnIsCheck){
            navigate("/reservation", {
                state : {
                    reservationList : roomInfo
                }
            });
        }
        
      },[roomInfo, btnIsCheck]);

    const handleSelect = (e) => {
        let {value} = e.currentTarget;
        let { name } = e.target;
        const nameArr = name.split('_');
        dispatch(change_roomField({index : nameArr[1],key : 'room_cnt',value : parseInt(value)}));
    
        if(value > 0){
            setAllReservationCheck(true);
        }else{
            setAllReservationCheck(false);
        }
    }

    
    return(
        <InfoHotel hotelInfo={hotelInfos} room_arr={room_arr} hotelCodes={hotelCodes} roomCodes={roomCodes} hotelImgIdx={hotelImgIdx} hotelImgMaxIdx={hotelImgMaxIdx} handleImgBtnClick={handleImgBtnClick} isHotelLoading={isHotelLoading}
            roomModalOpen={roomModalOpen} setRoomModalOpen={setRoomModalOpen} handleImgClick={handleImgClick} imgType={imgType} modalIdx={modalIdx} roomArrIdx={roomArrIdx} isRoomLoading={isRoomLoading} views={ref} pagingIdx={pagingIdx}
            roomInfo={roomInfo} handleClick={handleClick} handleSelect={handleSelect} allReservationCheck={allReservationCheck}
        />
    );
}

export default DetailInfo;
// export default connect(
//     () =>  ({hotelInfoActions, hotelMainActions,roomMainActions, hotelSearchReducer}) => ({
//         headerData : hotelSearchReducer.getIn(['HEADER_DATA','form']),
//         info : hotelInfoActions.info,
//         hotelCode : hotelMainActions.code,
//         roomCode : roomMainActions.code
        
//     }),
//     {
//         hotel_info,
//         hotel_info_reset,
//         hotel_code,
//         room_code
//     }
// )(DetailInfo);