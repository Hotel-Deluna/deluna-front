import React, {useState, useEffect} from "react";
import { ko } from "date-fns/esm/locale";
import {  Row, Col } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./calender.css";

export default function Calender(props){
    registerLocale("ko", ko);
    const [sDate, setSDate] = useState();
    const [eDate, setEDate] = useState();
    const [isCheck, setIsCheck] = useState(false);
    function setEnd(date){
      setSDate(date);
      setEDate(date);
      setIsCheck(true);
    }
    useEffect(() => {
      if(sDate !== undefined){
        props.handleCalender('startDate_'+props.idx, sDate);
      }
  }, [sDate]);
  useEffect(() => {
    if(eDate !== undefined){
      if(isCheck){
        setIsCheck(false);
      }else{
        props.handleCalender('endDate_'+props.idx, eDate);
      }
    }
  }, [eDate]);

    return(
      <>
      <Row>
        <Col sm={5}>
        <DatePicker
          name={'startDate_'+props.idx}
          selected={sDate}
          onSelect={(date) => (date < eDate ? setSDate(date) : setEnd(date))}
          selectsStart
          startDate={sDate}
          endDate={eDate}
          locale={ko}
          minDate={new Date()}
          style={{fontSize:'small', width: '100%'}}
          dateFormat="yyyy-MM-dd"
          
        />
          {/* <Form.Control value={startDate} onChange={(e) => setStartDate(e.target.value)}  type="date" name="startDate" /> */}
        </Col>
        <Col sm={1} style={{textAlign:'center'}}>
          <span>~</span>
        </Col>
        <Col sm={5}>
        <DatePicker
          name={'endDate_'+props.idx}
          selected={eDate}
          onSelect={(date) => setEDate(date)}
          selectsEnd
          startDate={sDate}
          endDate={eDate}
          minDate={sDate === undefined ? new Date() : sDate}
          locale={ko}
          style={{fontSize:'small', width: '100%'}}
          dateFormat="yyyy-MM-dd"
        />
        <Col sm={1} />
          {/* <Form.Control value={endDate} onChange={(e) => setEndDate(e.target.value)} type="date" name="endDate" /> */}
        </Col>
      </Row>
      </>
    
    );
}
