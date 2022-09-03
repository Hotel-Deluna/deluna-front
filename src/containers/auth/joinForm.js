import { useEffect, useState } from "react";
import AuthCommonForm from "../../components/auth/authJoinForm";
import { changeField,initializeForm, login } from "../../modules/auth";
import { useDispatch, useSelector } from "react-redux";

/**
 * 
 * 회원가입 공통 컨테이너(사업자, 고객)
 * 
 */
const JoinForm = ({type, value}) => {
    const dispatch = useDispatch();
    const {userInputStates, SetuserInputStates} = useState({
        email : {
            isCheck : false,//유효성 통과인지
            msg : false,
            btnCheck : 0 //버튼을 통해 api연동시의 버튼 상태값 미확인 - 0 ,실패 - 1  확인 - 2
        },
        password : {
            value : '',
            isCheck : false,//유효성 통과인지
            msg : ''
        },
        passwordCheck : {
            value : '',
            isCheck : false,//유효성 통과인지
            msg : ''
        },
        name : {
            isCheck : false
        },
        phone_num : {
            value : '',
            hyphen_value : '',
            isCheck : false,
            msg : ''
        },
        phone_auth_num : {
            isCheck : false,
            msg : ''
        },
        checkBox1 : {
            value : false
        },
    });
    const {partnerInputStates, SetPartnerInputStates} = useState({
        email : {
            isCheck : false,//유효성 통과인지
            msg : false,
            btnCheck : 0 //버튼을 통해 api연동시의 버튼 상태값 미확인 - 0 ,실패 - 1  확인 - 2
        },
        password : {
            value : '',
            isCheck : false,//유효성 통과인지
            msg : ''
        },
        passwordCheck : {
            value : '',
            isCheck : false,//유효성 통과인지
            msg : ''
        },
        name : {
            isCheck : false
        },
        business_num : {
            value : '',
            hyphen_value : '',
            isCheck : false
        },
        opening_day : {
            isCheck : false
        },
        phone_num : {
            value : '',
            hyphen_value : '',
            isCheck : false,
            msg : ''
        },
        phone_auth_num : {
            isCheck : false,
            msg : ''
        },
        checkBox1 : {
            value : false
        },
        checkBox2 : {
            value : false
        }
    });
    const { form, auth, authError } = useSelector(({ auth }) => ({
        form: auth.join,
        auth : auth.auth,
        authError : auth.authError
    }));

    const onChange = e => {
        const {name, value} = e.target;
        console.log(name, value);
        if(name === 'email'){

        }else if(name === 'password'){

        }else if(name === 'passwordCheck'){

        }else if(name === 'name'){

        }else if(name === 'opening_day'){

        }
        dispatch(
            changeField({
                form : 'join',
                key : name,
                value : value
            })
        );//테스트

    }

    const onChangeHyphen = e =>{ //휴대폰번호, 사업자관리번호

    }

    const onClick = e => {
        const [name] = e.target;

    }

    const onSubmit = e => {
        
    }

    return(
        <AuthCommonForm type={type} value={value} onChange={onChange} onChangeHyphen={onChangeHyphen} onClick={onClick} onSubmit={onSubmit} inputStates={type === 'user' ? userInputStates : partnerInputStates} />
    )
}

export default JoinForm;