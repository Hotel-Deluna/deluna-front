import axios from "axios";

export const hotel_tourist = () =>
axios.get('http://43.200.222.222:8080/hotel/tourist',{
    params : {
        page: 1,
        page_cnt : '100'
    }
});