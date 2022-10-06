import React, {useState, useEffect} from "react";
import RoomRegister from "./roomRegister";
import RoomService from "./RoomService";
import ImagesUpload from "../../components/hotel/imagesUpload";

import { room_register, room_edit, room_info, room_info_reset, name_check } from "../../modules/hotel/roomInfoActions";
import * as hotelInfoReducer from '../../modules/hotel/hotelInfoReducer';
import * as roomInfoReducer from '../../modules/hotel/roomInfoReducer';
import { connect, useDispatch } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom'
import moment from "moment";
import { Modal, Container, Row, Col, Button } from "react-bootstrap";
const RoomCommon = ({type, room_num, hotel_num, setRoomModalOpen, roomModalOpen, room_register, room_edit, room_info, inputValue, roomService, edit,register, info, hotelImage, name_check, nameCheck
    ,room_info_reset}) => {
    const [btnDisabled,setBtnDisabled] = useState(true);
    const [nameIsCheck, setIsNameCheck] = useState(true);//true- 객실명 중복 false - 중복아님
    const [focusName, setFocusName] = useState('');
    const dispatch = useDispatch();
    //console.log(type, hotel_num, room_num);
    //console.log('gggg', name_check({}));
    const closeOnClick = () => {//모달 닫기
        setRoomModalOpen(false);
    }
    
    //첫 진입 시
    useEffect(() => {
        if(type === 1) { //수정일경우
            if(room_num){ //호텔번호가 있을 경우 API 호출
                room_info({room_num : room_num}); 
            }else{ //호텔 번호가 없을 경우 모달 닫힘
                alert("객실 정보 조회가 실패하셨습니다.");
                setRoomModalOpen(false);
            } 
        }
        return () => {
            room_info_reset();
            dispatch(roomInfoReducer.reset());
        };
    }, []);

    //객실정보 조회 시
    useEffect(() => {
        if(info) {
            console.log(info);
            if(info.result === 'OK'){ //성공할 경우 Data dispatch & 수정버튼 활성화
                dispatch(roomInfoReducer.insertInput({ data : info.data}));
                //const image_copy = JSON.parse(JSON.stringify(info.data.image));
                //console.log(info.data.image);
                if(info.data.image !== null){
                    for(var i=0; i<info.data.image.length; i++){
                        hotelInfoReducer.chnageImages({name:"imageUrl",value: info.data.image[i],form : 'HOTEL_IMAGE'});
                    }
                }
            }else{ //실패할 경우 error 노출하고 모달 닫힘
                alert("호텔 정보 조회가 실패하였습니다.");
                setRoomModalOpen(false);
            }
        }
    }, [room_info, info]);
    // useEffect(() => {
    //     if(focusName === 'name') { //수정일경우
            
    //     }
    // }, [focusName]);
    //필수값 입력 완료시 수정 or 등록버튼 활성화, 비활성화
    useEffect(() => {
        //console.log('inputValue', inputValue);
        if((inputValue.double_bed_count > 0 || inputValue.single_bed_count > 0) && inputValue.p_weekday_price && inputValue.p_weekend_price &&
            inputValue.weekday_price && inputValue.weekend_price && inputValue.name && inputValue.check_in_time && 
            inputValue.check_out_time && inputValue.maximum_people && inputValue.minimum_people && !nameCheck){
                for(var i = 0; i<inputValue.room_detail_list.length; i++){
                    if(inputValue.room_detail_list[i].name && inputValue.room_detail_list[i].room_detail_status === 0){
                        setBtnDisabled(false);
                    }else if(inputValue.room_detail_list[i].name && inputValue.room_detail_list[i].room_detail_status === 1 && inputValue.room_detail_list[i].room_closed_start && inputValue.room_detail_list[i].room_closed_end){
                        setBtnDisabled(false);
                    }else{
                        setBtnDisabled(true);
                        break;
                    }
                }
        }else{
            setBtnDisabled(true)
        }
            
    }, [inputValue]);
    const onClick = () => {
        const frm = new FormData();
        frm.append("hotel_num",inputValue.hotel_num);
        frm.append("check_in_time",inputValue.check_in_time);
        frm.append("check_out_time",inputValue.check_out_time);
        frm.append("double_bed_count",inputValue.double_bed_count);
        frm.append("single_bed_count",inputValue.single_bed_count);
        frm.append("holiday_price_status",inputValue.holiday_price_status);
        frm.append("maximum_people",inputValue.maximum_people);
        frm.append("minimum_people",inputValue.minimum_people);
        frm.append("name",inputValue.name);
        let p_weekday_price = inputValue.p_weekday_price;
        frm.append("p_weekday_price", p_weekday_price.replace(/,/g, ''));
        let p_weekend_price = inputValue.p_weekday_price;
        frm.append("p_weekend_price",p_weekend_price.replace(/,/g, ''));
        let weekday_price = inputValue.p_weekday_price;
        frm.append("weekday_price",weekday_price.replace(/,/g, ''));
        let weekend_price = inputValue.weekend_price;
        frm.append("weekend_price",weekend_price.replace(/,/g, ''));
        for(var i = 0; i<inputValue.room_detail_list.length; i++){
            frm.append("room_detail_list["+[i]+"].name",inputValue.room_detail_list[i].name);
            frm.append("room_detail_list["+[i]+"].room_detail_status",inputValue.room_detail_list[i].room_detail_status);
            if(inputValue.room_detail_list[i].room_detail_status === 1){
                frm.append("room_detail_list["+[i]+"].room_closed_start",inputValue.room_detail_list[i].room_closed_start);
                frm.append("room_detail_list["+[i]+"].room_closed_end",inputValue.room_detail_list[i].room_closed_end);
            }
        }
        //태그
        if(roomService.tags.length > 0){
            frm.append("tags",roomService.tags);
        }
        //이미지
        //이미지가 있을 경우
        if(hotelImage.imageFile.length > 0){
            for(var i=0; i<hotelImage.imageFile.length; i++){
                frm.append("image",hotelImage.imageFile[i])
            }
        }
        if(type === '1'){//수정일때
            room_edit(frm);
        }else{//등록일때
            // for (let key of frm.keys()) {
            //     console.log(key);
            //   }
            //   for (let value of frm.values()) {
            //     console.log(value);
            //   }
            room_register(frm);
        }
    }
    useEffect(() => {
        if(nameCheck) {
            //console.log('nameCheck', nameCheck);
            if(nameCheck.result === 'OK'){ //성공
                setIsNameCheck(nameCheck.data);
            }else{ //실패
                console.log(nameCheck);
            }
        }
    }, [name_check, nameCheck]);

    //호텔 수정 요청 response 처리
    useEffect(() => {
        if(edit) {
            if(edit.result === 'OK'){ //성공
                alert("호텔 정보 수정이 완료되었습니다.")
            }else{ //실패
                alert("호텔 정보 수정이 실패하였습니다. 잠시 후 다시 이용해주세요.")
            }
            setRoomModalOpen(false);
        }
    }, [room_edit,edit]);

    //호텔 등록 요청 response 처리
    useEffect(() => {
        if(register) {
            //console.log(register);
            if(register.result === 'OK'){ //등록 성공
                alert("호텔 등록이 완료되었습니다.")
            }else{ //등록 실패
                alert("호텔 등록이 실패하였습니다. 잠시 후 다시 이용해주세요.")
            }
            setRoomModalOpen(false);
        }
    }, [room_register,register]);

    return(
        <Modal size="lg"  show={roomModalOpen} onHide={closeOnClick} backdrop="static" aria-labelledby="contained-modal-title-vcenter" centered>
            {/* <RoomForm type={'0'} closeOnClick={closeOnClick} roomModalOpen={roomModalOpen} /> */}
            <Container fluid="xxl">
                <Row className="justify-content-md-center">
                    <Col lg="12">
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                객실 {type === 1 ? '수정' : '등록'}
                            </Modal.Title>
                        </Modal.Header>
                    </Col>
                </Row>
                {/* 등록 폼 */}
                <RoomRegister type={type} hotel_num={hotel_num} setFocusName={setFocusName} nameIsCheck={nameIsCheck} name_check={name_check} />
                {/* 태그 */}
                <RoomService />
                {/* 이미지 등록 */}
                <Row className="justify-content-md-center mb-3">
                    <Col sm={12}>
                        <ImagesUpload maxImagesNum={5} />
                    </Col>
                </Row>
                <Row className="justify-content-md-center mb-3">
                    <Col xs lg="5">
                        <div className="d-grid">
                            <Button size="lg" disabled={btnDisabled} onClick={() => onClick()}>객실 {type === 1 ? '수정' : '등록'}</Button>
                        </div>
                    </Col>
                    <Col md="auto" />
                    <Col xs lg="5">
                        <div className="d-grid">
                            <Button size="lg" variant="secondary" onClick={closeOnClick}>닫기</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Modal>
        
    );
}

export default connect(
    () =>  ({ roomInfoActions, roomInfoReducer, hotelInfoReducer}) => ({
        register: roomInfoActions.register, //등록
        edit : roomInfoActions.edit, //수정
        info : roomInfoActions.info, //조회
        nameCheck : roomInfoActions.nameCheck,
        inputValue : roomInfoReducer.getIn(['REGISTER', 'form']).toJS(), //입력된 input값
        roomService : roomInfoReducer.getIn(['ROOM_SERVICE', 'form']), //체크된 호텔서비스/부가서비스 값
        hotelImage : hotelInfoReducer.getIn(['HOTEL_IMAGE', 'form']) //호텔 url,파일 리스트
    }),
    {
        room_register,
        room_edit,
        room_info,
        room_info_reset,
        name_check
    }
)(RoomCommon)
