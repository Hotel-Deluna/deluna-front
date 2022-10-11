import React,{useState, useEffect} from "react";
import ReservationComponent from "../../components/client/reservationComponent";
import { member_info, reservation_register } from "../../modules/client/reservationActions";
import { set_info, change_value, delete_list } from "../../modules/client/reservationReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const ReservationContainer = (props) => {
    const list = JSON.parse(JSON.stringify(props.reservationList));
    const {memberInfo, reservationRegister} = useSelector(({reservationActions})=>({reservationRegister: reservationActions.reservationRegister, memberInfo : reservationActions.memberInfo}));
    const {reservationList, totalPrice, reservationInfoList} = useSelector(({reservationReducer})=>({reservationList: reservationReducer.getIn(['reservationList']),reservationInfoList: reservationReducer.getIn(['reservationInfoList']), totalPrice : reservationReducer.getIn(['totalPrice'])}));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [btnCheck, setBtnCheck] = useState(false);
    //첫진입 시
    useEffect(() => {
        if(list.role === 3){//비회원 시 고객정보 조회 하지 않음
            console.log('비회원', list);
            dispatch(set_info({data : {
                list : list
            }}));
            setLoading(true);
        }else if(list.role === 1){
            console.log('회원', list);
            console.log('member');
            dispatch(member_info());
        }else{
            alert('뒤로가');
            navigate(-1);
        }
    },[]);
    //고객 정보 조회 시
    useEffect(()=>{
        if(memberInfo){
            if(memberInfo.result === 'OK'){ 
                dispatch(set_info({data : {
                    list : list,
                    memberInfo : JSON.parse(JSON.stringify(memberInfo.data))
                }}));
            }else{
                console.log('고객정보에러', memberInfo);
                alert('고객정보에러');
                navigate(-1);
            }
        }
      },[member_info, memberInfo]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        const splitName = name.split('_')[0];
        const splitIdx = parseInt(name.split('_')[1]);
        console.log(splitName, splitIdx, value);
        if(splitName === 'name'){
            const nameCheck = /^[ㄱ-ㅎ|가-힣]{0,17}$/;//한글만 입력되게
            if(nameCheck.test(value)){
                dispatch(change_value({data : { index : splitIdx, key : 'reservation_name', value : value }}));
            }
        }else if(splitName === 'phoneNum' || splitName === 'phoneConfirm'){
            let regCheck = /^[0-9\b -]{0,13}$/;
            if(regCheck.test(value)){
                let insertValue = value.replace(/-/g, '');
                if(insertValue.length > 9){
                    insertValue = insertValue.length === 10 ? insertValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3') :  insertValue.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
                }
                dispatch(change_value({data : { index : splitIdx, key : splitName === 'phoneNum' ? 'reservation_phone' : 'reservation_phone_confirm', value : insertValue }}));
                
            }// 숫자입력시에만 Input에 들어감
            
        }
    }

    const goDispatch = useDispatch();
    const handleClick = (e) => {
        const {name} = e.currentTarget;
        if(name.indexOf('_') !== -1){
            const splitName = name.split('_')[0];
            const splitIdx = parseInt(name.split('_')[1]);
            if(splitName === 'people'){
                const arithmetic = name.split('_')[2];
                let value = reservationList[splitIdx].reservation_people;
                if(arithmetic === 'minus'){
                    if(value > 1){
                        value--;
                        dispatch(change_value({data : { index : splitIdx, key : 'reservation_people', value : value }}));
                    }
                }else{
                    if(value < reservationInfoList[splitIdx].maximum_people){
                        value++;
                        dispatch(change_value({data : { index : splitIdx, key : 'reservation_people', value : value }}));
                    }
                }
            }else if(splitName === 'closeBtn' || splitName === 'listDelete'){
                dispatch(delete_list({data : {index : splitIdx}}));
            }
        }else{
            if(name === 'back'){//취소 버튼
                navigate(-1);
            }else if(name == 'goRegister'){//결제 버튼
                goDispatch(reservation_register(reservationList));
            }
        }
    }

    //결제하기 시
    useEffect(()=>{
        if(reservationRegister){
            if(reservationRegister.result === 'OK'){ 
                alert('예약이 완료되었습니다.');
            }else{
                console.log('예약하기에러', reservationRegister);
                alert('예약에 실패하였습니다. 다시 시도해주세요.');
                //navigate(-1);
            }
        }
      },[reservationRegister, reservationRegister]);

    useEffect(()=>{//결제하기 버튼 유효성
        if(reservationList){
            for(let i=0; i < reservationList.length; i++){
                if(list.role === 3){//비회원일때
                    if(reservationList[i].reservation_name && reservationList[i].reservation_phone && reservationList[i].reservation_phone_confirm){
                        if(reservationList[i].reservation_phone.replace(/-/g, '').length > 9 &&reservationList[i].reservation_phone_confirm.replace(/-/g, '').length > 9){
                            if(reservationList[i].reservation_phone.replace(/-/g, '') === reservationList[i].reservation_phone_confirm.replace(/-/g, '')){
                                setBtnCheck(true);
                            }else{
                                console.log('dd');
                                setBtnCheck(false);
                                break;
                            }
                        }else{
                            console.log('cc');
                            setBtnCheck(false);
                            break;
                        }
                    }else{
                        console.log('bb');
                        setBtnCheck(false);
                        break;
                    }
                }else{//회원일때
                    if(reservationList[i].name && reservationList[i].reservation_phone){
                        if(reservationList[i].reservation_phone.length > 11){
                            setBtnCheck(true);
                        }
                    }else{
                        setBtnCheck(false);
                        break;
                    }
                }
            }
        }
      },[reservationList]);
    return(
       <ReservationComponent list={list} reservationInfoList={reservationInfoList} reservationList={reservationList} totalPrice={totalPrice} loading={loading} handleChange={handleChange} handleClick={handleClick} btnCheck={btnCheck} />
    );

}

export default ReservationContainer;