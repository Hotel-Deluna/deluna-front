
import React, {useState, useEffect, setEffect} from "react";
import {Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link, useSearchParams,useNavigate } from 'react-router-dom'

import HotelRegisForm from "../../components/hotel/hotelRegisForm";
import HotelService from "../../components/hotel/hotelService";
import ImagesUpload from "../../components/hotel/imagesUpload";
//axios관리 redux
import {hotel_register, hotel_edit, hotel_info} from "../../modules/hotel/hotelInfoActions";

//redux 조회 및 연결
import { useSelector,connect, useDispatch } from 'react-redux';
import * as hotelInfoReducer from '../../modules/hotel/hotelInfoReducer';

//날짜 변환
import moment from "moment";


const HotelInfo = ({hotel_register, hotel_edit, hotel_info, inputValue, hotelService, hotelImage, edit,register, info}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    /* 부모컴포넌트 -> 자식컴포넌트 */
    //최대 이미지 등록 갯수 ( 호텔 : 10, 객실 : 5) ImagesUpload 컴포넌트에 전달
    const [maxImagesNum, setMaxImagesNum] = useState(5);
    const [btnDisabled,setBtnDisabled] = useState(true);
    const onClick = () => {
        const frm = new FormData();
        const peak_season = []
        for(var i = 0; i<inputValue.peak_season_list.length; i++){
            if(inputValue.peak_season_list[i].peak_season_start && inputValue.peak_season_list[i].peak_season_end){
                
                peak_season.push({
                    peak_season_start : moment(inputValue.peak_season_list[i].peak_season_start).format("YYYY/MM/DD"),
                    peak_season_end : moment(inputValue.peak_season_list[i].peak_season_end).format("YYYY/MM/DD")
                })
            }
        }
        /* 필수 데이터 */
        frm.append("address",inputValue.address);
        frm.append("eng_name",inputValue.eng_name);
        frm.append("location",inputValue.location);
        frm.append("name",inputValue.ko_name);
        frm.append("phone_num",inputValue.phone_num);
        frm.append("region_1depth_name",inputValue.region_1depth_name);
        frm.append("region_2depth_name",inputValue.region_2depth_name);
        frm.append("info",inputValue.info);
        frm.append("rule",inputValue.rule);
        frm.append("star",inputValue.star);
        


        //성수기 값이 있을 경우에만
        if(peak_season.length > 0){
            //frm.append("peak_season_list",peak_season_list)
            frm.append("peak_season_list[0].peak_season_start",peak_season[0].peak_season_start)
            frm.append("peak_season_list[0].peak_season_end",peak_season[0].peak_season_end)
        }
        //태그 값이 있을 경우에만
        if(hotelService.tags.length > 0){
            frm.append("tags",hotelService.tags)
        }

        //이미지가 있을 경우
        if(hotelImage.imageFile.length > 0){
            for(var i=0; i<hotelImage.imageFile.length; i++){
                frm.append("image",hotelImage.imageFile[i])
            }
            
        }
        if(searchParams.get('type') === 'modfiy') { //수정버튼 누를경우 수정요청 API 호출
            hotel_edit(frm);
        }else { //등록버튼 누를경우 등록요청 API 호출
            hotel_register(frm)
        };
    }
    
    //store에 Data전달을 위해
    const dispatch = useDispatch();

    //필수값 입력 완료시 수정 or 등록버튼 활성화, 비활성화
    useEffect(() => {
        if(inputValue.ko_name && inputValue.eng_name && inputValue.star && inputValue.phone_num &&
            inputValue.address && inputValue.info && inputValue.rule){
                setBtnDisabled(false)
        }else{
            setBtnDisabled(true)
        }
            
    }, [inputValue]);


    let navigate = useNavigate(); //페이지 이동 : react v6부터 useHistory -> useNavigate

    //호텔 수정으로 진입 시 호텔 상세정보 조회 API 호출
    useEffect(() => {
        //수정일경우
        if(searchParams.get('type') === 'modfiy') {
            if(searchParams.get('hotel_num')){ //호텔번호가 있을 경우 API 호출
                hotel_info(searchParams.get('hotel_num')); 
            }else{ //호텔 번호가 없을 경우 error 노출하고 main페이지로 이동
                alert("호텔 정보 조회가 실패하셨습니다.");
                navigate("/auth/hotel/main");
            }
            
        }
    }, []);

    //호텔 정보 API 호출 response 처리
    useEffect(() => {
        if(info) {
            if(info.result === 'OK'){ //성공할 경우 Data dispatch & 수정버튼 활성화
                setBtnDisabled(false)
                dispatch(hotelInfoReducer.insertInput({ data : info.data}));
                dispatch(hotelInfoReducer.converFile({ data : info.data.image}));
            }else{ //실패할 경우 error 노출하고 main 페이지 이동
                alert("호텔 정보 조회가 실패하였습니다.");
                navigate("/auth/hotel/main");
            }
        }
    }, [hotel_info,info]);

    //호텔 수정 요청 response 처리
    useEffect(() => {
        if(edit) {
            if(edit.result === 'OK'){ //성공
                alert("호텔 정보 수정이 완료되었습니다.")
            }else{ //실패
                alert("호텔 정보 수정이 실패하였습니다. 잠시 후 다시 이용해주세요.")
            }
        }
    }, [hotel_edit,edit]);

    //호텔 등록 요청 response 처리
    useEffect(() => { 
        if(register) {
            if(register.result === 'OK'){ //등록 성공
                alert("호텔 등록이 완료되었습니다.")
                navigate("/auth/hotel/main");
            }else{ //등록 실패
                alert("호텔 등록이 실패하였습니다. 잠시 후 다시 이용해주세요.")
            }
        }
    }, [hotel_register,register]);

    

    return (
        <>
            <Container className="containerMain">
                
                {/* 호텔 정보 입력 컴포넌트*/}
                <HotelRegisForm />
                {/* 호텔 부가서비스/서비스 체크박스 컴포넌트 */}
                <HotelService />
                {/* 호텔 이미지 업로드 컴포넌트 */}
                <ImagesUpload maxImagesNum={maxImagesNum}/>
                <Row className="inputBox">
                    <Col>
                        <div className="finalButton">
                                <Button variant="primary" size="sm" onClick={() => onClick()} disabled={btnDisabled}>
                                    { searchParams.get('type') === 'modfiy' ? '수정' : '등록' }
                                </Button>
                                {/* 2022.08.28 (한예지) : 취소 누를 시 main 이동 */}
                                <Link to = "/">
                                    <Button variant="secondary" size="sm">
                                        취소
                                    </Button>
                                </Link>
                        </div>    
                    </Col>
                </Row>
            </Container>
        </>
            
    );
};
export default connect(
    (state) =>  ({ hotelInfoActions, hotelInfoReducer}) => ({
        register: hotelInfoActions.register, //등록
        edit : hotelInfoActions.edit, //수정
        info : hotelInfoActions.info, //조회
        inputValue : hotelInfoReducer.getIn(['REGISTER', 'form']).toJS(), //입력된 input값
        hotelService : hotelInfoReducer.getIn(['HOTEL_SERVICE', 'form']), //체크된 호텔서비스/부가서비스 값
        hotelImage : hotelInfoReducer.getIn(['HOTEL_IMAGE', 'form']), //호텔 url,파일 리스트
    }),
    {
        hotel_register,
        hotel_edit,
        hotel_info,

    }
)(HotelInfo)