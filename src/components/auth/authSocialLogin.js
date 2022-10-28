import React from "react";
import googleLogo from '../logos/google_logo.png';
import kakaoLogo from '../logos/kakao_logo.png';
import naverLogo from '../logos/naver_logo.png';
import { KAKAO_CLIENT_ID, NAVER_CLIENT_ID, NAVER_REDIRECT_URI, GOOGLE_CLIENT_ID} from "../../lib/api/Oauth";
import NaverLogin from 'react-login-by-naver';
import KakaoLogin from 'react-kakao-login';
import jwt_decode from "jwt-decode";
import { Row,Col, Button } from "react-bootstrap";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { socialLogin } from "../../modules/auth";
import { useDispatch } from "react-redux";

const AuthSocialLogin = () => {
    const dispatch = useDispatch();
     //소셜로그인 선택 시
     function handleSocialClick(names,e) {
        //소셜로그인 부분
        ////console.log('소셜',names, e);
        let email = '';
        let name = '';
        if(names === 'kakao'){
            if(e.profile.kakao_account.email){
                email = e.profile.kakao_account.email;
                name = e.profile.kakao_account.profile.nickname;
            }else{
                return alert('카카오 이메일 승인을 해야합니다.');
            }
        }else if(names === 'naver'){
            ////console.log('aa',e.email, e.name);
             email = e.email;
            name = e.name;
        }else if(names === 'google'){
            
            var decoded = jwt_decode(e.credential);
            //console.log('decoded', decoded);
            email = decoded.email;
            name = decoded.name;
        }
        dispatch(socialLogin({email, name}));
    }
    

    const simbolSize = {
        width : '1.5rem',
        height : '1.5rem',
        marginRight: '0.5rem'
    }
    const btnBorder = {
        border: '1px solid rgb(0 0 0 / 20%)',
        color : '#000000',
        height : '38px'
    }
    const btnText = {
        fontSize: '1rem',
        fontFamily: '"Google Sans",arial,sans-serif',
        fontWeight: '500'
    }
    const minWidths = {
        paddingLeft :'0',
        paddingRight : '0',
        color : '#212529',
        minWidth: 'min-content',
        fontSize: 'small',
        maxWidth: 'fit-content'
    }
    return (
            <>
             <Row className="align-items-center mb-3">
                <Col>
                    <hr />
                </Col>
                <Col xs='auto' style={minWidths}>
                    <span>혹은 아래 계정을 이용해 로그인</span>
                </Col>
                <Col>
                    <hr />
                </Col>
            </Row>
            <Row className="justify-content-md-center justify-content-sm-center justify-content-xs-center mb-2">
            <Col xs={6} style={{ textAlign: 'center' }}>
                <div className="d-grid">
                    <KakaoLogin token={KAKAO_CLIENT_ID} needProfile={true} useLoginForm={true} persistAccessToken={true} throughTalk={true} onSuccess={(e) => { handleSocialClick('kakao', e); } } render={({ onClick }) => (
                        <Button name="kakao" variant="light" style={btnBorder} onClick={(e) => { onClick(); } }>
                            <img name="kakao" style={simbolSize} src={kakaoLogo} alt="kakaoLogo" />
                            <span style={btnText}>카카오</span>
                        </Button>
                    )} />

                </div>
            </Col>
            <Col xs={6} style={{ textAlign: 'center' }}>
                <div className="d-grid">
                    <NaverLogin clientId={NAVER_CLIENT_ID} callbackUrl={NAVER_REDIRECT_URI} render={renderProps => (
                        <Button name="naver" variant="light" style={btnBorder} onClick={renderProps.onClick} disabled={renderProps.disabled}>
                            <img name="naver" style={simbolSize} src={naverLogo} alt="naverLogo" />
                            <span style={btnText}>네이버</span>
                        </Button>)} 
                        onSuccess={(e) => {handleSocialClick('naver', e);} }
                        onError={() => {console.log('Login Failed');} } />
                </div>
            </Col>
        </Row><Row className="justify-content-md-center justify-content-sm-center justify-content-xs-center mb-2">
                <Col sm={2} />
                <Col md='auto'>
                    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                        <GoogleLogin useOneTap={false} width="100" size="large" theme='outline' shape="square" text="Google" locale="ko_KO" onSuccess={(e) => { handleSocialClick('google', e); } } onError={() => { console.log('Login Failed'); } } />
                    </GoogleOAuthProvider>
                </Col>
                <Col lg={2} />
            </Row></>
    );
}

export default AuthSocialLogin;