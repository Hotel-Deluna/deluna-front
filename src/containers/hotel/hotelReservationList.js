import React, {useEffect, useState} from "react";
import HotelReservationListTable from "../../components/hotel/hotelReservationListTable";
//import { hotelList } from "../../modules/hotel/hotelReservationActions";
import {my_hotel_list} from "../../modules/hotel/hotelMainActions";
import { reservation_list } from "../../modules/hotel/hotelReservationActions";
import { connect } from 'react-redux';
import moment from "moment";
import { useSearchParams } from 'react-router-dom';

const HotelReservationList = ({my_hotel_list, hotelList, reservation_list, reservationList}) => {
    
    const [hotel_list, setHotel_list] = useState([]);
    const [list, setlist] = useState([]);
    const [rank_num, setRank_num] = useState(1);// 1- 전체, 2- 예약확정, 3- 예약취소, 이용완료
    const [pageNum, setPageNum] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [changeCheck, setChangeChcek] = useState(false);

    const [hotelIdx, setHotelIdx] = useState(0);
    const [inputidx, setInputIdx] = useState(0); // 0 - 고객명, 1- 예약자명, 2-고객 핸드폰번호, 3- 예약일자 
    const [searchValue, setSearchValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [hotelNum, setHotelNum] = useState(searchParams.get('hotelNum'));

    useEffect(() => {
        my_hotel_list({text : '',page : '1'});
        //console.log(hotelNum);
        if(hotelNum !== null){
            reservation_list({
                hotel_num : hotelNum,
                page : 1,
                rank_num : 1,
                page_cnt : 10,
                customer_name : '',
                customer_phone_num : '',
                reservation_date : '',
                reservation_num : ''
            });
        }
    },[]);

    //호텔 리스트 조회
    useEffect(() => {
        if(hotelList){
            if(hotelList.result === 'OK'){
                //console.log(hotelList.data);
                setHotel_list(hotelList.data);
                if(hotelNum === null){
                    if(hotelList.data.length !== 0){
                        reservation_list({
                            hotel_num : hotelList.data[0].hotel_num,
                            page : 1,
                            rank_num : 1,
                            page_cnt : 10,
                            customer_name : '',
                            customer_phone_num : '',
                            reservation_date : '',
                            reservation_num : ''
                        });
                        setHotelIdx(0);
                    }
                }else{
                    const selectIdx = hotelList.data.findIndex(item => item.hotel_num == hotelNum);
                    //console.log(selectIdx);
                    setHotelIdx(selectIdx);
                }
            }else{
                console.log(hotelList);
                alert("호텔 리스트 조회가 실패하였습니다. 잠시 후 다시 이용해주세요.");
            }
        }
    },[my_hotel_list, hotelList]);

    //예약내역 조회
    useEffect(() => {
        if(reservationList){
            if(reservationList.result === 'OK'){
                console.log(reservationList.data);
                if(pageNum === 1){
                    setlist(reservationList.data);
                }else{
                    setlist(state => [...state, reservationList.data]);
                }
                if(reservationList.total_cnt > 10){
                    setMaxPage(Math.ceil(reservationList.total_cnt/10));
                }
            }else{
                console.log(reservationList);
                alert("예약 내역 조회가 실패하였습니다. 잠시 후 다시 이용해주세요.");
            }
        }
    },[reservation_list, reservationList]);

    useEffect(() => {
        if(changeCheck){
            reservation_list({
                hotel_num : hotel_list[hotelIdx].hotel_num,
                rank_num : rank_num,
                page : 1,
                page_cnt : 10,
                customer_name : '',
                customer_phone_num : '',
                reservation_date : '',
                reservation_num : ''
            });
        }
    },[rank_num]);
    
    //버튼클릭시
    const onClick = (e) => {
        let {name} = e.currentTarget;
        
        if(name === 'search'){
            let data = settingData(inputidx, 1);
            //console.log(data);
            setPageNum(1);
            reservation_list(data);
        }else if(name === 'moreList'){
            let p_num = pageNum+1;
            setPageNum(p_num);
            let data = settingData(inputidx, p_num);
            console.log(data);
            reservation_list(data);
        }else{
            setPageNum(1);
            setChangeChcek(true);
            if(name === 'all')setRank_num(1);
            if(name === 'confirmation')setRank_num(2);
            if(name === 'cancel')setRank_num(3);
            if(name === 'complete')setRank_num(4);
        }
        
    }

    function settingData(idx, p_num) {
        console.log(idx, p_num);
        let data = {};
        if(idx === '0'){
            data = {
                hotel_num : hotel_list[hotelIdx].hotel_num,
                rank_num : rank_num,
                page : p_num,
                page_cnt : 10,
                customer_name : searchValue,
                customer_phone_num : '',
                reservation_date : '',
                reservation_num : ''
            }
        }else if(idx === '1'){
            data = {
                hotel_num : hotel_list[hotelIdx].hotel_num,
                rank_num : rank_num,
                page : p_num,
                page_cnt : 10,
                customer_name : '',
                customer_phone_num : '',
                reservation_date : '',
                reservation_num : searchValue
            }
        }else if(idx === '2'){
            data = {
                hotel_num : hotel_list[hotelIdx].hotel_num,
                rank_num : rank_num,
                page : p_num,
                page_cnt : 10,
                customer_name : '',
                customer_phone_num : searchValue.replace(/-/g, ''),
                reservation_date : '',
                reservation_num : ''
            }
        }else if(idx === '3'){
            console.log(moment(searchValue).format("YYYY/MM/DD"));
            data = {
                hotel_num : hotel_list[hotelIdx].hotel_num,
                rank_num : rank_num,
                page : pageNum,
                page_cnt : 10,
                customer_name : '',
                customer_phone_num : '',
                reservation_date : moment(searchValue).format("YYYY/MM/DD"),
                reservation_num : ''
            }
        }
        return data;
    }
    //select 선택시
    const onChangeSelect = (e) => {
        let {value} = e.currentTarget;
        let { name } = e.target;
        //console.log(value, name);
        if(name === 'search'){
            setInputIdx(value);
            setSearchValue('');
        }else if(name === 'hotel'){
            setHotelIdx(value);
        }
    }
    //검색창 입력 시
    const onChange = (e) => {
        const {value} = e.target;
        if(inputidx === '2'){
            let phone_num = value.replace(/-/g, '');
            if(phone_num.length < 12){
                if(phone_num.length === 10){
                    setSearchValue(phone_num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
                }else if(phone_num.length === 11){ 
                    setSearchValue(phone_num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
                }else {
                    setSearchValue(phone_num);
                }
            }
        }else{
            setSearchValue(value);
        }
    }

    return(
        <HotelReservationListTable hotel_list={hotel_list} onClick={onClick} onChangeSelect={onChangeSelect} inputidx={inputidx} rank_num={rank_num} list={list} 
            maxPage={maxPage} searchValue={searchValue} onChange={onChange} pageNum={pageNum} hotelIdx={hotelIdx} 
        />
    );
}

export default connect(
    () =>  ({ hotelMainActions, hotelReservationActions}) => ({
        hotelList: hotelMainActions.hotelList, //나(사업자)의 호텔리스트 조회 상태값
        reservationList : hotelReservationActions.reservationList
    }),
    {
        my_hotel_list, //나(사업자)의 호텔리스트 조회 액션
        reservation_list
    }
)(HotelReservationList);