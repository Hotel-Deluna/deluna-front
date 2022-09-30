import React, {useState, useEffect} from "react";
import * as roomMainReducer from "../../modules/hotel/roomMainReducer";
import {room_list, room_code} from "../../modules/hotel/roomMainActions";
import RoomDetailListTable from "../../components/hotel/roomDetailListTable";
/* redux 영역 */
import { connect } from "react-redux";
import { useSearchParams } from 'react-router-dom';

const RoomDetailList = ({form, code, room_list, room_code}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchValue, setSearchValue] = useState(searchParams.get('hotelNum'));

    const roomList = form.list;
    const codeList = code.code;
    console.log(roomList);
    console.log(codeList);
    //진입 시 모든 리스트가 보여줘야 함
    useEffect(() => {
        room_list(searchValue);
        room_code();
        
    },[])
    return(
        <RoomDetailListTable room_list={room_list} codeList={codeList} />
    );
}

export default connect(
    () => ({ roomMainReducer}) => ({
        form: roomMainReducer.getIn(['ROOM_LIST', 'form']),
        code : roomMainReducer.getIn(['ROOM_CODE', 'form'])
    }), {
        room_list, //나(사업자)의 호텔리스트 조회 액션
        room_code
    }
)(RoomDetailList);