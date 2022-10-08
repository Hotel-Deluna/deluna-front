import axios from "axios";

//객실등록 api
export const room_register = (data) =>
axios.post('http://43.200.222.222:8080/hotel/room/register',data,{
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization' : localStorage.getItem('accessToken')
    }
});

//객실 수정 API
export const room_edit = (data) =>
axios.patch('http://43.200.222.222:8080/hotel/room/edit',data,{
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization' : localStorage.getItem('accessToken')
    }
});

//객실 상세 정보 조회 API
export const room_info = (data) =>
axios.post('http://43.200.222.222:8080/hotel/room/info',data,{
    headers: {
        'Content-Type': 'application/json'
    }
});

export const room_info_list = (data) =>
axios.post('http://43.200.222.222:8080/hotel/room/info/list',data,{
    headers: {
        'Content-Type': 'application/json'
    }
});

export const name_check = (data) =>
axios.post('http://43.200.222.222:8080/hotel/room/check-duplicate-name',data,{
    headers: {
        'Content-Type': 'application/json'
    }
});

//객실 태그 조회 API
export const room_code = () =>
axios.get('http://43.200.222.222:8080/common/code/room');

