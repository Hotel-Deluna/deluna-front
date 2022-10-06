import React, {useState} from "react";
import RoomCheckBox from "../../components/hotel/roomCheckbox";
import * as roomInfoActions from '../../modules/hotel/roomInfoReducer';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const RoomService = (props) => {
    //console.log(props.form.tags);
    const tags = props.form.tags;
    const { RoomInfoActions } = props;
    const [isChecked, setIsChecked] = useState(false);
    const checkbox = [
        {
            name : '금연시설',
            value : 1

        },
        {
            name : '시티뷰',
            value : 2

        },
        {
            name : '오션뷰',
            value : 3

        },
        {
            name : '욕조',
            value : 4

        },
        {
            name : '무료 와이파이',
            value : 5

        },
        {
            name : '조식',
            value : 6

        },
        {
            name : '스파',
            value : 7

        },
        {
            name : '얼리체크인',
            value : 8

        },
        {
            name : '레이트체크인',
            value : 9

        },
        {
            name : '외부음식가능',
            value : 10

        }
    ]

    const checkedList = (e) => {
        setIsChecked(!isChecked);
        handleChecked(e.target.value, e.target.checked)
    }

    const handleChecked = (val, isChecked) => {
        //const tags = props.form.toJS().tags;
        if(isChecked){
            RoomInfoActions.changeCheckbox({name:"tags",value:[...tags, parseInt(val)],form : 'ROOM_SERVICE'})
        }else if(!isChecked && tags.includes(parseInt(val))){
            RoomInfoActions.changeCheckbox({
                name:"tags",
                value: tags.filter(item => item !== parseInt(val)),
                form : 'ROOM_SERVICE'})
            ;
        }
        //console.log(tags);
    }

    return(
        <RoomCheckBox checkbox={checkbox} checkedList={checkedList} handleChecked={handleChecked} tags={tags} />
    );
}
export default connect(
    (state) => ({
        form: state.roomInfoReducer.getIn(['ROOM_SERVICE', 'form'])
    }),
    (dispatch) => ({
        RoomInfoActions: bindActionCreators(roomInfoActions, dispatch)
    })
)(RoomService);