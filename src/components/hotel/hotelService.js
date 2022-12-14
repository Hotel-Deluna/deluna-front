import React, { useState, useEffect } from "react";

/* 2022.08.28 (한예지) : UI개발을 위한 react-bootstrap에 필요한 기능 import */
import {Form, Col, Row } from 'react-bootstrap';

/* 2022.08.28 (한예지) : 호텔등록&수정 UI를 위한 scss파일 */
import "./css/hotelInfo.scss";

/* redux 영역 */
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as hotelInfoActions from '../../modules/hotel/hotelInfoReducer';

const HotelService = (props) => {
    const tags = props.form.tags;
    const { HotelInfoActions } = props;
    //2022.08.29 (한예지) : 호텔 부가시설/서비스 UI뿌려주기 위한 데이터
    const checkbox = [
        {
            name : '뷔페',
            value : 1

        },
        {
            name : '주차장',
            value : 2

        },
        {
            name : '커피숍',
            value : 3

        },
        {
            name : '수영장',
            value : 4

        },
        {
            name : '헬스장',
            value : 5

        },
        {
            name : '룸서비스',
            value : 6

        },
        {
            name : '와인바&레스토랑',
            value : 7

        },
        {
            name : '24시간 데스크',
            value : 8

        },
        {
            name : '애견동반',
            value : 9

        },
        {
            name : '스파&사우나',
            value : 10

        }
    ]

    const [isChecked, setIsChecked] = useState(false) // 2022.08.29 (한예지) : 체크박스 체크 여부

    /*2022.08.29 (한예지) : 체크박스 선택시 핸들링*/
    const checkedList = (e) => {
        setIsChecked(!isChecked);
        handleChecked(e.target.value, e.target.checked)
    }

    /*2022.08.28 (한예지) : 체크박스 true, false에 따라 선택된항목 추가 or 삭제*/
    const handleChecked = (val, isChecked) => {
        if(isChecked){
            HotelInfoActions.changeCheckbox({name:"tags",value:[...tags, parseInt(val)],form : 'HOTEL_SERVICE'})

        }else if(!isChecked && tags.includes(parseInt(val))){
            HotelInfoActions.changeCheckbox({
                name:"tags",
                value: tags.filter(item => item !== parseInt(val)),
                form : 'HOTEL_SERVICE'})
            ;
        }
        
    }

    return (
        <>
            <Row className="inputBox">
            <Col>
                <Form.Label htmlFor="hotelService">부가시설/서비스</Form.Label>
                <div className="mb3">
                    {checkbox.map((item, index) => (
                        <Form.Check
                        inline
                        key={index}
                        label={item.name}
                        value={item.value}
                        onChange={checkedList}
                        name="hotelServic1e"
                        type='checkbox'
                        checked={tags.indexOf(item.value) !== -1 ? true : false}
                        />
                        
                    ))}
                </div>
            </Col>
            </Row>
        </>
    );
};

export default connect(
    (state) => ({
        form: state.hotelInfoReducer.getIn(['HOTEL_SERVICE', 'form'])
    }),
    (dispatch) => ({
        HotelInfoActions: bindActionCreators(hotelInfoActions, dispatch)
    })
)(HotelService);