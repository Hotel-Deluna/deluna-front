import React, { useState,useCallback } from "react";

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
  
const ImagesUpload = () => {
    let imgIdx = 0;
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
    //이미지 개별삭제  
    const handleDeleteImage = (id) => {
        setShowImages(showImages.filter((_, index) => index !== id));
        setImagesFile(imagesFile.filter((_, index) => index !== id));
    };
    //이미지 일괄삭제
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

    //서버에서 받은 이미지 URL을 File로 변환
    const convertURLtoFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();
        const ext = url.split(".").pop(); // url 구조에 맞게 수정할 것
        const filename = url.split("/").pop(); // url 구조에 맞게 수정할 것
        const metadata = { type: `image/${ext}` };
        return new File([data], filename, metadata);
    };
    //이미지 순서 바꾸기
    const onChange = (sourceId, sourceIndex, targetIndex) => {
        const imgUrl = swap(showImages, sourceIndex, targetIndex);
        const imgFile = swap(imagesFile, sourceIndex, targetIndex);
        setShowImages(imgUrl);
        setImagesFile(imgFile);
    }

    return (
        <>
            <Form.Label htmlFor="imgInset">호텔 이미지 (최대 10장까지 업로드가 가능합니다.)</Form.Label>
                <GridContextProvider onChange={onChange}>
                    <Row xs={1} md={5} className="g-4">
                    <GridDropZone
                    className="dropzone"
                    style={showImages.length === 0 ? {height:"auto"} : showImages.length < 6 ? {height:"150px"} : {height:"300px"}}
                    id="showImages"
                    boxesPerRow={5}
                    rowHeight={150}
                    >
                    {showImages.map((item,idx) => (
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
        </>
    );
};

export default ImagesUpload;