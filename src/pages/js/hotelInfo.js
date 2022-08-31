/*global kakao*/
import React, { useRef,useState, useEffect, useCallback } from "react";

/* 2022.08.28 (한예지) : UI개발을 위한 react-bootstrap에 필요한 기능 import */
import {Form, Container, Row, Col, InputGroup, Button, Card, CardGroup } from 'react-bootstrap';

/* 2022.08.28 (한예지) : 호텔등록&수정 UI를 위한 scss파일 */
import "../css/hotelInfo.scss";

/* 2022.08.28 (한예지) : react 링크이동(페이지이동) */
import { Link, useSearchParams } from 'react-router-dom'

/* 2022.08.28 (한예지) : daum api 사용을 위한 import */
import DaumPostcode from 'react-daum-postcode';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from 'axios';

const HotelInfo = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const type = searchParams.get('type') //registration:등록, modfiy : 수정
    
    const testData = {
        "data": {
          "address": "경기 평택시 서정동 879-1",
          "eng_name": "Shilla Stay",
          "hotel_num": 12345,
          "image": ["https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_1280.jpg",
           "https://cdn.pixabay.com/photo/2016/05/09/10/42/weimaraner-1381186_1280.jpg"],
          "info": "신라스테이 강남점은...",
          "name": "신라스테이",
          "peak_season_list": [
            {
                "peak_season_end": "2022-08-31T06:04:21.431Z",
                "peak_season_start": "2022-08-31T06:04:21.431Z"
            }
          ],
          "phone_num": "0212345678",
          "rule": "대욕장 이용안내...",
          "star": 5,
          "tags": [{code : 1, name: "뷔페"}, {code : 2, name: "주차장"},{code : 10, name: "스파사우나"}]
        },
        "message": "string",
        "result": "string"
    }
    const nextId = useRef(1);
    let imgIdx = 0;
    const [inputItems, setInputItems] = useState([
        {
            id : 0,
            content : {
                peakSeasonStart : '',
                peakSeasonEnd : ''
            }
        }
    ])
    
    /* 2022.08.28 (한예지) : 성수기 추가버튼 누를 시 Input 추가 */
    const addInput = () => {
        const input = {
            id : nextId.current,
            content : {
                peakSeasonStart : undefined,
                peakSeasonEnd : undefined
            }
        }
        setInputItems([...inputItems, input]);
        nextId.current += 1; 
    }

    /* 2022.08.28 (한예지) : 삭제하기 누를 시 Input 삭제 */
    const deleteInput = (idx) =>{
        const inputItemsCopy = JSON.parse(JSON.stringify(inputItems));
        if(inputItems.length === 1){ //1개의 input남을 경우 date 초기화
            inputItemsCopy[0].content.peakSeasonStart = ''
            inputItemsCopy[0].content.peakSeasonEnd = ''
            setInputItems(inputItemsCopy)
        }else{ //1개 이상의 input일 경우 삭제
            setInputItems(inputItems.filter(item => item.id !== idx))
        }
    }
    /* 2022.08.28 (한예지) : input value 동적 처리 */
    const inputValueChange = (e, idx, type) => {
        const inputItemsCopy = JSON.parse(JSON.stringify(inputItems));
        if(type === 'start'){ //성수기 시작값
            inputItemsCopy[idx].content.peakSeasonStart = e.target.value
        }else{ //성수기 종료값
            inputItemsCopy[idx].content.peakSeasonEnd = e.target.value
        }
        setInputItems(inputItemsCopy)
    }

    /* 2022.08.28 (한예지) : 이미지 등록 관련*/
    const [showImages, setShowImages] = useState([]);
    const [imagesFile, setImagesFile] = useState([]);
    /* 2022.08.28 (한예지) : 이미지 등록 */
    const handleAddImages = (e) => {
        const imageList = e.target.files;
        let imageUrlList = [...showImages];
        let imageFileList = [...imagesFile]
        for(let i = 0; i < imageList.length; i++){
            const currentImgeUrl = URL.createObjectURL(imageList[i]);
            imageUrlList.push(currentImgeUrl)
            imageFileList.push(imageList[i])
        }
        //10장 이상일 경우 예외처리
        if(imageUrlList.length > 10){
            alert("이미지는 최대 10장까지 등록이 가능합니다.")
            imageUrlList = imageUrlList.slice(0,10);
            imageFileList = imageFileList.slice(0,10);
        }
        
        setImagesFile(imageFileList)
        setShowImages(imageUrlList)
    }

    /* 2022.08.28 (한예지) : 이미지 개별삭제&일괄삭제 관련*/   
    const handleDeleteImage = (id) => {
        setShowImages(showImages.filter((_, index) => index !== id));
        setImagesFile(imagesFile.filter((_, index) => index !== id));
    };

    const handleDeleteAllImage = useCallback(() =>{
        setShowImages([]);
        setImagesFile([]);
        
    },[])

    const changeClick = (idx) => {
        imgIdx = idx
    }

    /* 2022.08.29(한예지) : 이미지 변경 */
    const changeImg = (e) => {
        const changeImgeUrl = URL.createObjectURL(e.target.files[0]);
        const changeImageFile = e.target.files[0];
        showImages[imgIdx] = changeImgeUrl;
        imagesFile[imgIdx] = changeImageFile;
        setShowImages(showImages.map(index =>
            index === imgIdx ? {...index, changeImgeUrl} : index)
        )
        setImagesFile(imagesFile.map(index =>
            index === imgIdx ? {...index, changeImageFile} : index)
        )
    }
    /* 2022.08.28 (한예지) : 주소찾기 버튼에따라 다음 주소창 true, false */
    const [click, setClick] = useState(false);
    const clickFucn = () => {
        setClick(current => !current)
    }
    /* 2022.08.28 (한예지) : 다음 주소 api 사용 */
    const [address, setAddress] = useState('');
    const handleComplete = (data) => {
        let addr = '';
        console.log(data.userSelectedType)
        if (data.userSelectedType === "R") {
          alert("지번 주소만 선택 가능합니다.")
          setClick(true)
        }else{
            addr = data.jibunAddress
            setClick(false)
            setAddress(addr)
            HandleCoord(addr)
        }
        console.log(click)
      };

    const [addrCoord, setAddrCoord] = useState({x:'', y:'',region_1depth:'',region_2depth:''}) //2022.08.29 (한예지) : 주소 -> 좌표변환 하는 영역 kakaoMap 사용
    const HandleCoord = (addr) =>{
        // 주소-좌표 변환 객체를 생성
        var geocoder = new kakao.maps.services.Geocoder();
        // 주소로 좌표를 검색
        geocoder.addressSearch(addr, function(result, status) {
            // 정상적으로 검색이 완료됐으면 
            if (status === kakao.maps.services.Status.OK) {
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                setAddrCoord(
                    {
                        x : coords.La,
                        y : coords.Ma,
                        region_1depth : result[0].road_address.region_1depth_name,
                        region_2depth : result[0].road_address.region_2depth_name
                    }
                )
            } 
        });    
    };


    const [phoneValue, setPhoneValue] = useState(''); //2022.08.29 (한예지) : 호텔 전화번호 input 상태     
    /* 2022.08.29 (한예지) : 호텔 전화번호 input 정규식 체크 */
    const handlePhone = (e) => {
        const regex = /^[0-9\b -]{0,12}$/; // 하이픈 포함 최대 12자리
        if(regex.test(e.target.value)){
            setPhoneValue(e.target.value.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-") ); 
        }
    }

     //2022.08.29 (한예지) : 호텔명 한글 input 상태
    const [hotelKoreaName, setHotelKoreaName] = useState('');
    /* 2022.08.29 (한예지) : 호텔명 한글 input 정규식 체크 */
    const handleHotelKoreaName = (e) => {
        const regex = /^[가-힣|ㄱ-ㅎ\s]+$/;
        if(regex.test(e.target.value)){
            setHotelKoreaName(e.target.value)
        }
    }
    
    const [hotelEnglishName, setHotelEnglishName] = useState(''); //2022.08.29 (한예지) : 호텔명 영문 input 상태
    /* 2022.08.29 (한예지) : 호텔명 영문 input 정규식 체크 */
    const handleHotelEnglishName = (e) => {
        const regex = /^[a-z|A-Z\s]+$/;
        if(regex.test(e.target.value)){
            setHotelEnglishName(e.target.value)
        }
    }

    const [selected, setSelected] = useState(''); //2022.08.29 (한예지) : 호텔 등급
    const handleChangeSelect = (e) => {
        setSelected(e.target.value);
    }


    const [explanation, setExplanation] = useState(''); //2022.08.29 (한예지) : 호텔 설명
    const handleExplanation = (e) => {
        setExplanation(e.target.value)
    }

    const [rule, setRule] = useState(''); //2022.08.29 (한예지) : 호텔 규정
    const handleRule = (e) => {
        setRule(e.target.value)
    }

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
            name : '애경동반',
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
    const inputRef = useRef([])
    const searchAddrRef = useRef();
    const handleHotelRegis = () =>{
        let joinBoolean = true;
        for(let i = 0; i<inputRef.current.length; i++){
            if(!inputRef.current[i].value || inputRef.current[i].value === ''){
                
                if(i !== 4){
                    inputRef.current[i].focus();
                }else{
                    searchAddrRef.current.focus()
                }
                joinBoolean = false
                break;
            }
	    }
        
        //axios 연동 부분
        if(joinBoolean){
            const frm = new FormData();
            const peak_season_list = []
            for(var i = 0; i<inputItems.length; i++){
                if(inputItems[i].content.peakSeasonStart && inputItems[i].content.peakSeasonEnd){
                    
                    peak_season_list.push({
                        peak_season_end : inputItems[i].content.peakSeasonStart,
                        peak_season_start : inputItems[i].content.peakSeasonEnd
                    })
                }
            }
            /* 필수 데이터 */
            frm.append("address",address);
            frm.append("eng_name",hotelEnglishName);
            frm.append("location",[addrCoord.x,addrCoord.y]);
            frm.append("name",hotelKoreaName);
            frm.append("phone_num",phoneValue);
            frm.append("region_1depth_name",addrCoord.region_1depth);
            frm.append("region_2depth_name",addrCoord.region_2depth);
            frm.append("info",explanation);
            frm.append("rule",rule);
            frm.append("star",selected);

           
            if(type == 'registration'){
                 //성수기 값이 있을 경우에만
                if(peak_season_list.length > 0){
                    frm.append("peak_season_list",peak_season_list)
                }
                //태그 값이 있을 경우에만
                if(checkedItems.length > 0){
                    frm.append("tags",checkedItems)
                }

                //이미지가 있을 경우
                if(imagesFile.length > 0){
                    frm.append("image",imagesFile)
                }
            }else{
                frm.append("peak_season_list",peak_season_list)
                frm.append("tags",checkedItems)
                frm.append("image",imagesFile)
            }
            
            /*axios({
                url: 'http://43.200.222.222:8080/hotel/register',
                method: 'post',
                headers: {
                    Authorization : "1234"
                },
                data: {
                        "address": "서울시 강남구",
                        "eng_name": "Shilla Stay",
                        "image": "[멀티파트 파일 이미지1 , 멀티파트 파일 이미지2]",
                        "location": "[123.546, 10.48]",
                        "name": "신라스테이",
                        "peak_season_list": [
                          {
                            "peak_season_end": "2022-08-30T09:44:05.307Z",
                            "peak_season_start": "2022-08-30T09:44:05.307Z"
                          }
                        ],
                        "phone_num": "0212345678",
                        "region_1depth_name": "서울시",
                        "region_2depth_name": "강남구",
                        "rule": "대욕장 이용안내...",
                        "star": 5,
                        "tags": "[1,2,3]" 
                }
            })
                .then((response) => {
                    console.log(response)
                })
                .catch(function(error) {
                });*/
                
        }
        
        

    }

    useEffect(() => {
        if(type !== 'registration'){
            setHotelKoreaName(testData.data.name);
            setHotelEnglishName(testData.data.eng_name);
            setSelected(testData.data.star);
            setPhoneValue(testData.data.phone_num);
            setAddress(testData.data.address);
            HandleCoord(testData.data.address)
            setExplanation(testData.data.info);
            setRule(testData.data.rule);
            for(var i = 0; i < testData.data.tags.length; i++){
                checkedItems.push(testData.data.tags[i].code);
                
            }
            
            if(testData.data.peak_season_list.length > 0){
                for(var i =0; i<testData.data.peak_season_list.length; i++){
                    if(i === 0){
                        inputItems[0].content.peakSeasonStart = testData.data.peak_season_list[i].peak_season_start.split('T')[0]
                        inputItems[0].content.peakSeasonEnd = testData.data.peak_season_list[i].peak_season_end.split('T')[0]
                    }else{
                        inputItems.push({
                            id : i,
                            content : {
                               peakSeasonStart : testData.data.peak_season_list[i].peak_season_start.split('T')[0],
                               peakSeasonEnd : testData.data.peak_season_list[i].peak_season_end.split('T')[0]
                           }
                            
                           })
                    }
                }
            }
            for(var i=0; i<testData.data.image.length; i++){
                showImages.push(testData.data.image[i]);
                convertURLtoFile(testData.data.image[i]).then(result => imagesFile.push(result))
            }
        }
    },[])

    //서버에서 받은 이미지 URL을 File로 변환
    const convertURLtoFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();
        const ext = url.split(".").pop(); // url 구조에 맞게 수정할 것
        const filename = url.split("/").pop(); // url 구조에 맞게 수정할 것
        const metadata = { type: `image/${ext}` };
        return new File([data], filename, metadata);
      };
      const [todos, setTodos] = useState([
        { id: "1", title: "공부" },
        { id: "2", title: "헬스" },
        { id: "3", title: "독서" },
        { id: "4", title: "산책" },
        { id: "5", title: "요리" }
      ]);
      const handleChange = (result) => {
        if (!result.destination) return;
        console.log(result);
        const items = [...todos];
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
    
        setTodos(items);
      };
      /*const handleChange = (result) => {
        if (!result.destination) return;
        console.log(result);
        const items = [...showImages];
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setShowImages(items);
        
      };*/
    return (
        <>
        <Container className="containerMain">
            <Row className="containerTitle">
                <Col>
                    호텔등록
                </Col>
            </Row>
            <Row className="inputBox">
                <Col>
                    <Form.Label htmlFor="hotelKoreaName">호텔명(한글)<span className="essential">*필수입력</span></Form.Label>
                    <Form.Control
                        type="text"
                        name="호텔명 한글"
                        placeholder="ex) 신라스테이 서초점"
                        maxLength={30}
                        onChange={handleHotelKoreaName}
                        value={hotelKoreaName}
                        ref={el => (inputRef.current[0] = el)}
                    />
                </Col>
                <Col>
                    <Form.Label htmlFor="hotelEnglishName">호텔명(영어)<span className="essential">*필수입력</span></Form.Label>
                    <Form.Control
                        type="text"
                        name="호텔명 영어"
                        placeholder="ex) Shilla Stay Seocho"
                        maxLength={30}
                        onChange={handleHotelEnglishName}
                        value={hotelEnglishName}
                        ref={el => (inputRef.current[1] = el)}
                    />
                </Col>
                <Col>
                    <Form.Label htmlFor="hotelEnglishName">호텔등급<span className="essential">*필수선택</span></Form.Label>
                    <Form.Select onChange={handleChangeSelect}
                        ref={el => (inputRef.current[2] = el)}
                        name="호텔둥급" value={selected}
                    >
                        <option value="">호텔 등급을 선택해주세요.</option>
                        <option value="1">1성</option>
                        <option value="2">2성</option>
                        <option value="3">3성</option>
                        <option value="4">4성</option>
                        <option value="5">5성</option>
                    </Form.Select>
                </Col>
            </Row>

            <Row className="inputBox">
                <Col>
                    <Form.Label htmlFor="hotelPhoneNumber">호텔 전화번호<span className="essential">*필수입력</span></Form.Label>
                    <Form.Control
                        type="text"
                        name="호텔 전화번호"
                        placeholder="ex)02-123-4567"
                        maxLength={12}
                        onChange={handlePhone}
                        value={phoneValue}
                        ref={el => (inputRef.current[3] = el)}
                    />
                </Col>
            </Row>

            <Row className="inputBox">
                <Col>
                <Form.Label htmlFor="hotelAddress">호텔 주소<span className="essential">*필수입력</span></Form.Label>
                <InputGroup className="mb-3">
                    <Form.Control
                    type="text"
                    name="호텔 주소"
                    placeholder="ex) 지번주소만 입력 가능합니다."
                    value = {address}
                    disabled
                    ref={el => (inputRef.current[4] = el)}
                    />
                    <Button variant="outline-secondary" id="hotelAddressSearch" onClick={clickFucn}
                        ref={searchAddrRef}
                    >
                        주소찾기{click.toString()}
                    </Button>
                </InputGroup>
                </Col>
            </Row>
            {
                click ?
                <Row>
                    <Col>
                        <DaumPostcode onComplete={handleComplete}/>
                    </Col>
                </Row>
                : null
            }
            <Row className="inputBox">
                <Col>
                    <Form.Group className="mb-3" controlId="hotelExplanation">
                        <Form.Label>호텔 설명<span className="essential">*필수입력</span></Form.Label>
                        <Form.Control as="textarea" rows={5} maxLength={200}
                        onChange={handleExplanation}
                        value = {explanation}
                        name="호텔 설명"
                        ref={el => (inputRef.current[5] = el)}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row className="inputBox">
                <Col>
                    <Form.Group className="mb-3" controlId="hotelRule">
                        <Form.Label>호텔 규정<span className="essential">*필수입력</span></Form.Label>
                        <Form.Control as="textarea" rows={5} maxLength={200}
                        onChange={handleRule}
                        value={rule}
                        name="호텔 규정"
                        ref={el => (inputRef.current[6] = el)}
                        />
                    </Form.Group>
                </Col>
            </Row>

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
                            name="hotelService"
                            type='checkbox'
                            checked={checkedItems.indexOf(item.value) !== -1 ? true : false}
                            />
                            
                        ))}
                    </div>
                </Col>
            </Row>
            <Row className="inputBox">
                <Form.Label htmlFor="hotelPeakSeason">성수기</Form.Label>
                <Col>
                    {inputItems.map((item, index) => (
                        <InputGroup className="mb-3" key={index}>
                            <Form.Control
                                type="date"
                                id="hotelPeakSeasonEnd"
                                value = {item.content.peakSeasonStart}
                                onChange={e => inputValueChange(e, index, 'start')}
                            />
                            <InputGroup.Text className="inputText">~</InputGroup.Text>
                            <Form.Control
                                type="date"
                                id="hotelPeakSeasonEnd"
                                value = {item.content.peakSeasonEnd}
                                onChange={e => inputValueChange(e, index, 'end')}
                            />
                            <Button variant="danger" onClick={() => deleteInput(item.id)}>삭제하기</Button>{' '}
                        </InputGroup>
                    ))}
                    
                    
                </Col>
                
            </Row>
            <Row className="inputBox">
                <Col>
                    <div className="d-grid gap-2">
                        <Button variant="outline-primary" size="sm" onClick={addInput}>
                            추가하기
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row className="inputBox">
                <Form.Label htmlFor="imgInset">호텔 이미지 (최대 10장까지 업로드가 가능합니다.)</Form.Label>
                <Row xs={1} md={5} className="g-4">
                <DragDropContext onDragEnd={handleChange}>
      <Droppable droppableId="todos">
        {(provided) => (
          <ul
            className="todos"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {todos.map(({ id, title }, index) => (
              <Draggable key={id} draggableId={id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                  >
                    {title}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
                    {showImages.map((image, idx) => (
                        
                        <Col key={idx} draggable>
                            <Card border="dark">
                                <Card.Img variant="top" src={image} />
                            </Card>
                            <Button variant="primary" size="sm">
                            <label htmlFor="change-file" onClick={() => changeClick(idx)}>
                                변경하기
                            </label>
                            
                            </Button>
                            <input type="file" id="change-file" style={{display:"none"}}
                            accept=".png, .jpg" onChange={changeImg}
                            />
                            <Button variant="danger" size="sm" onClick={() => handleDeleteImage(idx)}>삭제하기</Button>{' '}
                        </Col>
                         
                    ))}
                </Row>
                 <div className="buttonGroup">
                    <Button variant="outline-primary" size="sm">
                    <label htmlFor="input-file">
                        이미지 업로드
                    </label>
                    </Button>
                    <input type="file" id="input-file" style={{display:"none"}}
                        onChange={handleAddImages} multiple accept=".png, .jpg"
                    />
                    <Button variant="outline-danger" size="sm" onClick={() => handleDeleteAllImage()}>
                        일괄삭제
                    </Button>
                </div>
                
            </Row>
            <Row className="inputBox">
                <Col>
                    <div className="finalButton">
                            <Button variant="primary" size="sm" onClick={()=> handleHotelRegis()}>
                                { type === 'modfiy' ? '수정' : '등록' }
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