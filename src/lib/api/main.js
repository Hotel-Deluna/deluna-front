import axios from "axios";

export const hotel_tourist = (data) =>
axios.get('http://43.200.222.222:8080/hotel/tourist',{
    params : {
        page: data.page,
        page_cnt : '5'
    }
});