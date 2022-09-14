const KAKAO_CLIENT_ID = '2433b4e89ad89bc3db2600c704019c3f';
const KAKAO_REDIRECT_URI =  'http://localhost:3000/auth/kakao';
const NAVER_REDIRECT_URI =  'http://localhost:3000/auth/naver';
const NAVER_CCLIENT_ID = 'ujTxeGQ6iDErvd2yX3L9';
const STATE = '';//encodeURI(NAVER_REDIRECT_URI, 'UTF-8');
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CCLIENT_ID}&state=${STATE}&redirect_uri=${NAVER_REDIRECT_URI}`;
