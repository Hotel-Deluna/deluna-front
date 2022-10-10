import React, {useState} from "react";
import { Modal, Carousel,Container, Row, Col, Image, Button } from "react-bootstrap";

const ImageModal = (props) => {
    console.log(props);
    const [modalIndex, setModalIndex] = useState(props.idx);

    const handleSelect = (selectedIndex) => {
        setModalIndex(selectedIndex);
    };

    function handleClick(idx) {
        setModalIndex(idx);
    }

    const closeOnClick = () => {//모달 닫기
        props.setRoomModalOpen(false);
    }
    return(
        <Modal size="xl"  show={props.roomModalOpen} onHide={closeOnClick} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>{props.imgType === 0 ? '호텔이미지' : '객실이미지'}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{padding : 0}}>
                <Carousel interval={null} data-interval="false" wrap={false} activeIndex={modalIndex} onSelect={handleSelect} style={{color : ''}}>
                { props.imgList.map((item, index) => (
                    <Carousel.Item key={'modalImg'+index}>
                        <img
                        className="d-block w-100"
                        src={item}
                        alt={"modalImg"+index}
                        style={{height:'28rem', minHeight : 'auto'}}
                        />
                        <Carousel.Caption>
                            <p>{(modalIndex+1)}/{props.imgList.length}</p>
                        </Carousel.Caption>
                    </Carousel.Item> 
                ))}
                </Carousel>
            </Modal.Body>
            <Modal.Footer style={{backgroundColor : '#212529'}}>
                <Container>
                <Row>
                    <Col sm={12} xs={12} md={12}>
                    <Row className="justify-content-md-center justify-content-sm-center justify-content-xs-center">
                        { props.imgList.map((item, index) => (
                            <Col md="auto" sm="auto" xs='auto'>
                            <Image style={{height : '4rem', width: '5rem', margin:'0.2rem'}} className="img-thumbnail mx-auto d-block" src={item} alt={'thumbnail'+index} onClick={()=>handleClick(index)}/>
                            </Col>
                        ))}
                    </Row>
                    </Col>
                </Row>
                </Container>
            </Modal.Footer>
        </Modal>
    );
}

export default ImageModal;