import React, { useState } from "react";

/* 2022.08.28 (한예지) : UI개발을 위한 react-bootstrap에 필요한 기능 import */
import {Form, Col } from 'react-bootstrap';

/* 2022.08.28 (한예지) : 호텔등록&수정 UI를 위한 scss파일 */
import "./css/hotelInfo.scss";

const HotelService = () => {
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
    const [checkedItems, setCheckedItems] = useState([]); //2022.08.29 (한예지) : 체크된 항목

    /*2022.08.29 (한예지) : 체크박스 선택시 핸들링*/
    const checkedList = (e) => {
        setIsChecked(!isChecked);
        handleChecked(e.target.value, e.target.checked)
    }

    /*2022.08.28 (한예지) : 체크박스 true, false에 따라 선택된항목 추가 or 삭제*/
    const handleChecked = (val, isChecked) => {
        if(isChecked){
            checkedItems.push(parseInt(val));
            setCheckedItems(checkedItems)
        }else if(!isChecked && checkedItems.includes(parseInt(val))){
            checkedItems.splice(checkedItems.indexOf(parseInt(val)), 1);
            setCheckedItems(checkedItems)
        }
        
    }

    return (
        <>
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
                        name="hotelService"
                        type='checkbox'
                        checked={checkedItems.indexOf(item.value) !== -1 ? true : false}
                        />
                        
                    ))}
                </div>
            </Col>
        </>
    );
};

export default HotelService;