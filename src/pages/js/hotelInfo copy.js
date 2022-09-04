
import React, {useState,useEffect} from "react";
import {Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom'

import HotelRegisForm from "../../components/hotel/hotelRegisForm";
import HotelService from "../../components/hotel/hotelService";
import ImagesUpload from "../../components/hotel/imagesUpload";
const HotelInfo = () => {
    //query 값 (registration:등록, modfiy : 수정)
    const [searchParams, setSearchParams] = useSearchParams();

    /* 부모컴포넌트 -> 자식컴포넌트 */
    //최대 이미지 등록 갯수 ( 호텔 : 10, 객실 : 5) ImagesUpload 컴포넌트에 전달
    const [maxImagesNum, setMaxImagesNum] = useState(10);
    //api를 통해 받은 호텔정보
    const [hotelInfo, setHotelInfo] = useState({});
    //api를 통해 받은 호텔 부가서비스/시설
    const [hotelTags,setHotelTags] = useState([]);
    //api를 통해 받은 호텔 이미지
    const [hotelImages, setHotelImages] = useState([]);

    /* 자식컴포넌트 -> 부모컴포넌트 */
    //HotelRegisForm 컴포넌트 자식에게 전달받은 input
    const [propHotelInfo, setPropHotelInfo] = useState('');
    //HotelService 컴포넌트 자식에게 전달받은 체크된 부가시설/서비스
    const [propCheckedItems, setPropCheckedItems] = useState([]);
    //ImagesUpload 컴포넌트 자식에게 전달받은 이미지 파일
    const [propImagesFile, setPropImagesFile] = useState([]);
    
    
    //HotelRegisForm 컴포넌트 자식에게 전달받은 input값 받기
    const getHotelInfo = (info) => {
        console.log(info)
        setPropHotelInfo(info)
    }
    //HotelService 컴포넌트 자식에게 전달받은 부가시설/서비스 체크 항목 받기
    const getCheckedItems = (items) => {
        console.log(items)
        setPropCheckedItems(items);
    }

    //ImagesUpload 컴포넌트 자식에게 전달받은 이미지 파일 받기
    const getImagesFile = (file) => {
        setPropImagesFile(file);
        
    }
    useEffect(() => {
        if(searchParams.get('type') === 'modfiy'){
            axios.post('http://43.200.222.222:8080/hotel/info',{
                hotel_num : '12345'
            }).then((res)=>{
                if(res.data.result === 'OK'){
                    setHotelInfo(res.data.data)
                    //테스트코드
                    res.data.data.image = [
                        "https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_1280.jpg",
                        "https://cdn.pixabay.com/photo/2016/05/09/10/42/weimaraner-1381186_1280.jpg"
                    ]
                    //테스트코드
                    res.data.data.tags = [{code : 1, name: "뷔페"}, {code : 2, name: "주차장"},{code : 10, name: "스파사우나"}]
                    setHotelTags(res.data.data.tags);
                    setHotelImages(res.data.data.image);
                    
                }
                //testData = res.data.data
            })
        }
    },[])
    return (
        <>
            <Container className="containerMain">
                {/* 호텔 정보 입력 컴포넌트*/}
                <HotelRegisForm value={ hotelInfo } getHotelInfo={getHotelInfo}/>
                {/* 호텔 부가서비스/서비스 체크박스 컴포넌트 */}
                <HotelService value={ hotelTags } getCheckedItems={getCheckedItems}/>
                {/* 호텔 이미지 업로드 컴포넌트 */}
                <ImagesUpload 
                    maxImagesNum={ maxImagesNum } 
                    hotelImages = { hotelImages }
                    getImagesFile = { getImagesFile }/>
                <Row className="inputBox">
                    <Col>
                        <div className="finalButton">
                                <Button variant="primary" size="sm">
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

export default HotelInfo;