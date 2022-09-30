import axios from "axios";

//객실등록 api
export const room_register = (data) =>
axios.post('http://43.200.222.222:8080/room/register',data,{
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization' : '1234',
    }
});

//객실 수정 API
export const room_edit = (data) =>
axios.patch('http://43.200.222.222:8080/room/edit',data,{
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization' : '1234',
    }
});

//객실 상세 정보 조회 API
export const room_info = (data) =>
axios.post('http://43.200.222.222:8080/room/info',{
    room_num : data
});

export const room_info_list = (data) =>
axios.post('http://43.200.222.222:8080/room/info/list',{
    room_num : data.room_num,
    page: data.page,
    page_cnt: 10,
});

//객실 태그 조회 API
export const room_code = () =>
axios.get('http://43.200.222.222:8080/common/code/room');

