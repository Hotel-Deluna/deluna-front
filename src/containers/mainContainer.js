import React, {useEffect, useState} from "react";
import MainComponent from "../components/mainComponent";
import {selectCityList} from "../modules/mainActions";
import * as hotelSearchReducer from "../modules/client/hotelSearchReducer";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import moment from "moment";
const MainContainer = ({selectCityList, cityList}) => {
    const [pageNum, setPageNum] = useState(1);
    const [city_list, setCity_list] = useState([]);
    const [maxPage, setMaxPage] = useState(1);
    //도시 가져오기
    useEffect(() => {
        selectCityList({
            page : pageNum
        })
    },[pageNum]);

    useEffect(() => {
        if(cityList){
            if(cityList.result === 'OK'){
                setCity_list(cityList.data);
                if(cityList.total_cnt > 5){
                    console.log(Math.ceil(cityList.total_cnt/5));
                    setMaxPage(Math.ceil(cityList.total_cnt/5));
                }
            }else{
                alert("도시가 조회가 안됩니다.");
            }
        }
    },[selectCityList, cityList]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onClick = (idx) => {
        //console.log(city_list[idx]);
        let today = new Date();
        let now = new Date();
        let tomorrow = new Date(now.setDate(now.getDate() + 1));
        console.log(moment(today).format("YYYY/MM/DD"));
        console.log(moment(tomorrow).format("YYYY/MM/DD"));
        dispatch(hotelSearchReducer.headerData({
            data : {
                page : 1,
                people_count : 1,
                page_cnt : 10,
                reservation_start_date : moment(today).format("YYYY/MM/DD"),
                reservation_end_date : moment(tomorrow).format("YYYY/MM/DD"),
                search_type : 1,
                text : city_list[idx].tourist_spot_name
            }
        }));
        navigate("/search");
    }

    const btnClick = (e) => {
        let {name} = e.currentTarget;
        if(name === 'plus') setPageNum((pageNum+1));
        if(name === 'minus') setPageNum((pageNum-1));
    }

    return(
        <MainComponent city_list={city_list} onClick={onClick} maxPage={maxPage} pageNum={pageNum} btnClick={btnClick} />
    );
}

export default connect(
    () =>  ({ mainActions, hotelSearchReducer}) => ({
        cityList : mainActions.cityList,
        headerData : hotelSearchReducer.getIn(['HEADER_DATA','form']),

    }),
    {
        selectCityList

    }
)(MainContainer);