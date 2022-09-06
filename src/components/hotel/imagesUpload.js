import React, { useState,useCallback,useEffect } from "react";

/* 2022.08.28 (한예지) : UI개발을 위한 react-bootstrap에 필요한 기능 import */
import {Form, Col, Row, Card, Button } from 'react-bootstrap';

/* 2022.08.28 (한예지) : 호텔등록&수정 UI를 위한 scss파일 */
import "./css/hotelInfo.scss";

import {
    GridContextProvider,
    GridDropZone,
    GridItem,
    swap
  } from "react-grid-dnd";

  /* redux 영역 */
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as hotelInfoActions from '../../modules/hotelInfoReducer';

//자식 컴포넌트
const ImagesUpload = (props) => {
    //props : 부모 컴포넌트에서 전달받은 최대 이미지 등록 갯수 ( 호텔 : 10, 객실 : 5)
    let imgIdx = 0;
    const {imageFile, imageUrl} = props.form;
    const { HotelInfoActions } = props;

    /* 2022.08.28 (한예지) : 이미지 등록 */
    const handleAddImages = (e) => {
        const imageList = e.target.files;
        let imageUrlList = [...imageUrl];
        let imageFileList = [...imageFile];
        for(let i = 0; i < imageList.length; i++){
            const currentImgeUrl = URL.createObjectURL(imageList[i]);
            imageUrlList.push(currentImgeUrl);
            imageFileList.push(imageList[i]);
        }
        //최대갯수 이상일 경우 예외처리
        if(imageUrlList.length > props.maxImagesNum){
            alert("이미지는 최대 "+props.maxImagesNum+"장까지 등록이 가능합니다.");
            imageUrlList = imageUrlList.slice(0,props.maxImagesNum);
            imageFileList = imageFileList.slice(0,props.maxImagesNum);
        }
        HotelInfoActions.chnageImages({name:"imageUrl",value: imageUrlList,form : 'HOTEL_IMAGE'});
        HotelInfoActions.chnageImages({name:"imageFile",value: imageFileList,form : 'HOTEL_IMAGE'});
    }

    /* 2022.08.28 (한예지) : 이미지 개별삭제&일괄삭제 관련*/ 
    //이미지 개별삭제  
    const handleDeleteImage = (id) => {
        HotelInfoActions.chnageImages({name:"imageUrl",value: imageUrl.filter((_, index) => index !== id),form : 'HOTEL_IMAGE'});
        HotelInfoActions.chnageImages({name:"imageFile",value: imageFile.filter((_, index) => index !== id),form : 'HOTEL_IMAGE'});
    };
    //이미지 일괄삭제
    const handleDeleteAllImage = () =>{
        HotelInfoActions.chnageImages({name:"imageUrl",value: [],form : 'HOTEL_IMAGE'});
        HotelInfoActions.chnageImages({name:"imageFile",value: [],form : 'HOTEL_IMAGE'});
    };

    const changeClick = (idx) => {
        imgIdx = idx;
    }

    /* 2022.08.29(한예지) : 이미지 변경 */
    const changeImg = (e) => {
        const changeImgeUrl = URL.createObjectURL(e.target.files[0]);
        const changeImageFile = e.target.files[0];
        imageUrl[imgIdx] = changeImgeUrl;
        imageFile[imgIdx] = changeImageFile;
        HotelInfoActions.chnageImages({
            name:"imageUrl",
            value: imageUrl.map(index =>
                index === imgIdx ? {...index, changeImgeUrl} : index),
            form : 'HOTEL_IMAGE'
        });
        HotelInfoActions.chnageImages({
            name:"imageFile",
            value: imageFile.map(index =>
                index === imgIdx ? {...index, changeImageFile} : index),
            form : 'HOTEL_IMAGE'
        });
    }
    //이미지 순서 바꾸기
    const onChange = (sourceId, sourceIndex, targetIndex) => {
        const imgUrl = swap(imageUrl, sourceIndex, targetIndex);
        const imgFile = swap(imageFile, sourceIndex, targetIndex);
        HotelInfoActions.chnageImages({name:"imageUrl",value: imgUrl,form : 'HOTEL_IMAGE'});
        HotelInfoActions.chnageImages({name:"imageFile",value: imgFile,form : 'HOTEL_IMAGE'});
    }      
    return (
        <>
            <Row className="inputBox">
                <Form.Label htmlFor="imgInset">호텔 이미지 (최대 {props.maxImagesNum}장까지 업로드가 가능합니다.)</Form.Label>
                <GridContextProvider onChange={onChange}>
                    <Row xs={1} md={5} className="g-4">
                    <GridDropZone
                    className="dropzone"
                    name =""
                    style={imageUrl.length === 0 ? {height:"auto"} : imageUrl.length < 6 ? {height:"150px"} : {height:"300px"}}
                    id="showImages"
                    boxesPerRow={5}
                    rowHeight={150}
                    >
                    {imageUrl.map((item,idx) => (
                        <GridItem key={item}>
                        <div className="grid-item">
                            <Col>
                                <Card border="dark">
                                    <Card.Img variant="top" src={item} style={{pointerEvents:"none"}}/>
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
                        </div>
                        </GridItem>
                    ))}
                    </GridDropZone>
                    </Row>
                </GridContextProvider>
                
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
        </>
    );
};

export default connect(
    (state) => ({
        form: state.hotelInfoReducer.getIn(['HOTEL_IMAGE', 'form'])
    }),
    (dispatch) => ({
        HotelInfoActions: bindActionCreators(hotelInfoActions, dispatch)
    })
)(ImagesUpload);