import React, {useEffect, useState,useRef} from "react";
import {Table, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HotelDelete from "./hotelDelete";
/* redux 영역 */
import { connect,useDispatch } from "react-redux";
import {my_hotel_list} from "../../modules/hotel/hotelMainActions";

//페이징 라이브 러리
import { useInView } from 'react-intersection-observer';

const MyhotelList = ({my_hotel_list,hotelList}) => { 
    const [modalOpen, setModalOpen] = useState(false);
    const [hotelNum, setHotelNum] = useState('');
    const [hotelName, setHotelName] = useState('');
    

    const [ref, inView] = useInView();
    const [hotelLists, setHotelLists] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const onSetModalOpen = (open, hotel_num, hotel_name) => {
        setHotelNum(hotel_num);
        setModalOpen(open);
        setHotelName(hotel_name)
    }

    //roomBatchDelete.js(자식컴포넌트) 에게 전달받은 modal false : modal창 닫기 위해서
    const getData = (modalOpen) => {
        setModalOpen(modalOpen);
    }
    
    //store에 Data전달을 위해
    const dispatch = useDispatch();

    useEffect(() => {
        my_hotel_list({
            text : '',
            page : page
        });
    },[])
    useEffect(() => {
        if (!inView) {
          return;
        }else{
            if(loading && page > 1){
                my_hotel_list({
                    text : '',
                    page : page
                });
            }
        }
      }, [inView]);
    
    useEffect(() => {
        if(hotelList){
            if(hotelList.result === 'OK'){
                if(hotelList.data.length > 0){
                    setPage((page) => page+1)
                    hotelList.data.map((array) => hotelLists.push(array))
                    setHotelLists(hotelLists)
                }else{
                    setLoading(false)
                }
            }else{
                alert("호텔 리스트 조회가 실패하였습니다. 잠시 후 다시 이용해주세요.");
            }
        }
    },[my_hotel_list,hotelList]);
    return (
        <>
            <div className="containerTitle">나의 호텔 리스트</div>
                <Table bordered>
                    <thead className="table-blue">
                        <tr>
                            <th>호텔명</th>
                            <th>호텔주소</th>
                            <th>호텔 전화번호</th>
                            <th>호텔이미지</th>
                            <th>호텔 정보수정</th>
                            <th>객실관리</th>
                            <th>예약리스트</th>
                            <th>삭제</th>
                            
                        </tr>
                    </thead>
                    {
                        hotelLists.length > 0 ?
                        <tbody>
                        {hotelLists.map((item, index) => (
                            <tr className="table-light" key={index}>
                                <td>{item.name}</td>
                                <td>{item.address}</td>
                                <td>{item.phone_num ? item.phone_num.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-") : ''}</td>
                                <td><img src={item.image ? item.image[0] : ''}></img></td>
                                <td>
                                    <Link to = {"/auth/hotel/info?type=modfiy"+"&hotel_num="+item.hotel_num}>
                                        <Button variant="outline-dark">수정</Button>
                                    </Link>
                                </td>
                                <td>
                                    <Link to = {"/auth/hotel/roomList?hotelName="+item.name}>
                                        <Button variant="outline-dark">조회/변경</Button>
                                    </Link>
                                </td>
                                <td><Button variant="outline-dark">보기</Button></td>
                                <td><Button variant="danger" onClick={() => onSetModalOpen(true,item.hotel_num,item.name)}>삭제</Button></td>
                            </tr>
                            
                        ))}
                        
                        </tbody>
                        
                        :
                        <tbody>
                            <tr className="table-light">
                                <td colSpan={8}>둥록된 호텔이 없습니다.</td>
                            </tr>
                        </tbody>
                    
                    
                    }
                    
                </Table>
                <div>
                {
                modalOpen && (
                    <HotelDelete hotel_name={hotelName} hotel_num={hotelNum} modalOpen={modalOpen} getData={getData}/>
                )}
                </div>
                <div ref={ref}/>
        </>
    )
};
export default connect(
    () =>  ({ hotelMainActions}) => ({
        hotelList: hotelMainActions.hotelList, //나(사업자)의 호텔리스트 조회 상태값
    }),
    {
        my_hotel_list, //나(사업자)의 호텔리스트 조회 액션

    }
)(MyhotelList);