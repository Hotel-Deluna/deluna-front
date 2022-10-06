import React, {useEffect, useState} from "react";
import MainComponent from "../components/mainComponent";
import {selectCityList} from "../modules/mainActions";
import * as hotelSearchReducer from "../modules/client/hotelSearchReducer";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import moment from "moment";
const MainContainer = ({selectCityList, cityList}) => {
    const [imgIdx, setImgIdx] = useState(0);
    const [city_list, setCity_list] = useState([]);
    const [maxImgIdx, setMaxImgIdx] = useState(0);
    //도시 가져오기
    useEffect(() => {
        selectCityList();
    },[]);

    useEffect(() => {
        if(cityList){
            if(cityList.result === 'OK'){
                setCity_list(cityList.data);
                setMaxImgIdx(cityList.total_cnt);
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
        if(name === 'plus') setImgIdx((imgIdx+1));
        if(name === 'minus') setImgIdx((imgIdx-1));
    }

    return(
        <MainComponent city_list={city_list} onClick={onClick} btnClick={btnClick} imgIdx={imgIdx} maxImgIdx={maxImgIdx} />
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