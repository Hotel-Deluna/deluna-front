import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as roomInfoActions from '../../modules/hotel/roomInfoReducer';
import RoomForm from "../../components/hotel/roomForm";
import moment from "moment";
const RoomRegister = (props) => {
    const { RoomInfoActions } = props;
    //첫 진입 시
    useEffect(() => {
        if(props.type === 0){
            RoomInfoActions.changeInput({name:'hotel_num',value: parseInt(props.hotel_num), form : 'REGISTER'});
        }
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        //console.log(name, value);
        props.setFocusName(name);
        if(name === 'name'){
            RoomInfoActions.changeInput({name:name,value: value, form : 'REGISTER'});
            if(value !== ''){
                console.log(props.hotel_num, value);
                props.name_check({hotel_num : props.hotel_num, name : value});
            }else{
                props.setIsNameCheck(true);
            }
        }else if(name.split('_')[0] === 'status'){
            const inputItemsCopy = JSON.parse(JSON.stringify( props.form.toJS().room_detail_list));
            const idx = parseInt(name.split('_')[1]);
            if(value === '0'){
                inputItemsCopy[idx].room_detail_status = 1;
            }else{
                inputItemsCopy[idx].room_detail_status = 0;
                inputItemsCopy[idx].room_closed_start = '';
                inputItemsCopy[idx].room_closed_end = '';
            }
            RoomInfoActions.changeInput({name:'room_detail_list',value: inputItemsCopy, form : 'REGISTER'});
        }else if(name.split('_')[0] === 'roomName'){
            //console.log(value.length);
            if(value.length < 6){
                const inputItemsCopy = JSON.parse(JSON.stringify( props.form.toJS().room_detail_list));
                const idx = parseInt(name.split('_')[1]);
                inputItemsCopy[idx].name = value;
                RoomInfoActions.changeInput({name:'room_detail_list',value: inputItemsCopy, form : 'REGISTER'});
            }
        }else if(name === 'weekday_price' || name === 'weekend_price' || name === 'p_weekday_price' || name === 'p_weekend_price'){
            const regExp = /^[0-9]{0,7}$/;
            let noCommaValue = value.replace(/,/g, '');
            //console.log(regExp.test(noCommaValue), noCommaValue);
            if(regExp.test(noCommaValue) || value === ''){
                value.length > 3 ? RoomInfoActions.changeInput({name: name,value: noCommaValue.replace(/\B(?=(\d{3})+(?!\d))/g,","), form : 'REGISTER'}) : RoomInfoActions.changeInput({name: name,value: value, form : 'REGISTER'});
            }
        }
    }

    

    const handleCheck = (e) => {
        //console.log(e.target.checked);
        props.setFocusName('holiday_price_status');
        if(e.target.checked) {
            RoomInfoActions.changeInput({name:'holiday_price_status',value: 1, form : 'REGISTER'});
        }else{
            RoomInfoActions.changeInput({name:'holiday_price_status',value: 0, form : 'REGISTER'});
        }
    }

    function  handleCalender (name, date)  {
        console.log(name, date);
        props.setFocusName(name);
        //console.log(moment(date).format("YYYY-MM-DD"));
        const idx = parseInt(name.split('_')[1]);
        if(name.split('_')[0] === 'startDate'){
            const inputItemsCopy = JSON.parse(JSON.stringify( props.form.toJS().room_detail_list));
            if(date === null){
                inputItemsCopy[idx].room_closed_start = '';
            }else{
                if(new Date(inputItemsCopy[idx].room_closed_end) < date || inputItemsCopy[idx].room_closed_end === ''){
                    inputItemsCopy[idx].room_closed_end = moment(date).format("YYYY-MM-DD");
                }
                inputItemsCopy[idx].room_closed_start = moment(date).format("YYYY-MM-DD");
            }
            RoomInfoActions.changeInput({name:'room_detail_list',value: inputItemsCopy, form : 'REGISTER'});
        }else if(name.split('_')[0] === 'endDate'){
            const inputItemsCopy2 = JSON.parse(JSON.stringify( props.form.toJS().room_detail_list));
            if(date === null){
                inputItemsCopy2[idx].room_closed_end = '';
            }else{
                inputItemsCopy2[idx].room_closed_end = moment(date).format("YYYY-MM-DD");
            }
            RoomInfoActions.changeInput({name:'room_detail_list',value: inputItemsCopy2, form : 'REGISTER'});
        }
    }

    const handleClick = (e) => {
        const {name} = e.currentTarget;
        const arr = name.split('_');
        props.setFocusName(name);
        //console.log('aa',arr);
        if(arr[0] === 'minPeople'){
            let value = props.form.toJS().minimum_people;
            if(arr[1] === 'minus'){
                if(value > 1) value--;
            }else{
                if(value < 10){
                    let maxValue = props.form.toJS().maximum_people;
                    if(value === maxValue){
                        maxValue++;
                        RoomInfoActions.changeInput({name:'maximum_people',value: maxValue, form : 'REGISTER'});
                    }
                    value++;
                }
            }
            RoomInfoActions.changeInput({name:'minimum_people',value: value, form : 'REGISTER'});
        }else if(arr[0] === 'maxPeople'){
            let minValue = props.form.toJS().minimum_people;
            let value = props.form.toJS().maximum_people;
            if(arr[1] === 'minus'){
                if(value > minValue) value--;
            }else{
                if(value < 20) value++;
            }
            RoomInfoActions.changeInput({name:'maximum_people',value: value, form : 'REGISTER'});
        }else if(arr[0] === 'checkIn' || arr[0] === 'checkOut'){
            let value = arr[0] === 'checkIn' ? props.form.toJS().check_in_time : props.form.toJS().check_out_time;
            const splitValue = value.split(':')[0];
            let parseValue = parseInt(splitValue);
            if(arr[1] === 'minus'){
                if(parseValue !== 0){
                    parseValue--;
                }
            }else{
                if(parseValue < 24){
                    parseValue++;
                }
            }
            if(parseValue < 10){
                parseValue = '0'+''+parseValue;
            }
            arr[0] === 'checkIn' ? RoomInfoActions.changeInput({name:'check_in_time',value: parseValue+':00', form : 'REGISTER'}) : RoomInfoActions.changeInput({name:'check_out_time',value: parseValue+':00', form : 'REGISTER'});
        
        }else if(arr[0] === 'singleBed' || arr[0] === 'doubleBed'){
            let value = arr[0] === 'singleBed' ? props.form.toJS().single_bed_count : props.form.toJS().double_bed_count;
            if(arr[1] === 'minus'){
                if(value > 0){value--;}
            }else{
                if(value < 5){value++;}
            }
            arr[0] === 'singleBed' ? RoomInfoActions.changeInput({name:'single_bed_count',value: value, form : 'REGISTER'}) : RoomInfoActions.changeInput({name:'double_bed_count',value: value, form : 'REGISTER'});
        
        }else if(arr[0] === 'room'){
            const inputItemsCopy = JSON.parse(JSON.stringify(props.form.toJS().room_detail_list));
            if(arr[1] === 'plus'){
                const input = {
                    name : '',
                    room_closed_start : '',
                    room_closed_end : '',
                    room_detail_status : 0
                }
                RoomInfoActions.changeInput({
                    name:"room_detail_list",
                    value:[...inputItemsCopy, input],
                    form : 'REGISTER'});
            }else{
                const idx = parseInt(arr[2]);
                RoomInfoActions.changeInput({
                    name:"room_detail_list",
                    value: inputItemsCopy.filter((item, index) => index !== idx),
                    form : 'REGISTER'
                });
            }
        }
    }

    return (
        <RoomForm form={props.form.toJS()} type={props.type} handleChange={handleChange} handleClick={handleClick} handleCalender={handleCalender} handleCheck={handleCheck} nameIsCheck={props.nameIsCheck} />
    )
}
export default connect(
    (state) => ({
        form: state.roomInfoReducer.getIn(['REGISTER', 'form']),
    }),
    (dispatch) => ({
        RoomInfoActions: bindActionCreators(roomInfoActions, dispatch)
    })
)(RoomRegister);