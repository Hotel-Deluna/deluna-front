import React, {useState} from "react";
import {Alert, Form}  from "react-bootstrap";
import "./css/joinCheckbox.scss";
/**
 * 
 * 체크박스
 * 
 */
const JoinCheck = function(props) { 
    //상위컨포넌트에 값보내기
   function checkTrueReturn1 (boolean1){
      console.log(boolean1);
    props.getDataCheckbox1(boolean1);
 }
 function checkTrueReturn2 (boolean2){
    props.getDataCheckbox2(boolean2);
 }
    if(props.value === '0'){
        return(
            <UserJoinCheck checkTrueReturn1={checkTrueReturn1}   />
        );
    }else{
        return(
            <div>
            <UserJoinCheck checkTrueReturn1={checkTrueReturn1}  />
            <PatnerJoinCheck checkTrueReturn2={checkTrueReturn2} />
            </div>
        );
    }
}
 /* 개인정보 약관 동의 */
  function UserJoinCheck(props) { 
    const data = [
        {id : 0, title : '본인은 만 18세 이상이며 이용약관, 규정 및 제한 사항 및 여행에 대한 정부 권고 사항을 읽었고 이에 동의합니다(필수).'},
        {id : 1, title : '개인정보 보호정책에 설명된 대로 개인정보 수집 및 사용에 동의합니다(필수).'},
        {id : 2, title : '개인정보 보호정책에 설명된 대로 국내 또는 해외에서 제3자에게 개인정보를 제공하는 데 동의합니다(필수)'}
    ];
    // 체크된 아이템을 담을 배열
  const [checkItems, setCheckItems] = useState([]);
  const [isCheckbox, setIsCheckbox] = useState(false);
  // 체크박스 단일 선택
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckItems(prev => [...prev, id]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckItems(checkItems.filter((el) => el !== id));
    }
    if(checkItems.length === 2){
      props.checkTrueReturn1(true);
    }else{
      props.checkTrueReturn1(false);
    }
    console.log('',checkItems.length);
  };

  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if(checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      const idArray = [];
      data.forEach((el) => idArray.push(el.id));
      setCheckItems(idArray);
      setIsCheckbox(true);
      props.checkTrueReturn1(true);
    }
    else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
      setIsCheckbox(false);
      props.checkTrueReturn1(false);
    }
  }
    return (
        <div className="mb-3 AllCheckbox">
            <Alert variant="light">
                <Alert.Heading>
                    <Form.Check aria-label="option 1" name='user-all' label="개인정보 전체 동의"
                        onChange={(e) => handleAllCheck(e.target.checked)}
                        // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                        checked={checkItems.length === data.length ? true : false} />
                </Alert.Heading>
                <hr />
                {data?.map((data, key) => (
                    <div className="checkboxs mb-3" key={key}>
                        <Form.Check aria-label="option 1" name={`user-${data.id}`} label={data.title}
                            onChange={(e) => handleSingleCheck(e.target.checked, data.id)}
                            // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                            checked={checkItems.includes(data.id) ? true : false} />
                    </div>
                ))}
            </Alert>
        </div>
    );
  }
  /* 기업정보 약관 동의 */
  function PatnerJoinCheck(props) { 
    const patnerData = [
        {id : 0, title : '본인은 만 18세 이상이며 이용약관, 규정 및 제한 사항 및 여행에 대한 정부 권고 사항을 읽었고 이에 동의합니다(필수).'},
        {id : 1, title : '기업정보 보호정책에 설명된 대로 기업정보 수집 및 사용에 동의합니다(필수).'},
        {id : 2, title : '기업정보 보호정책에 설명된 대로 국내 또는 해외에서 제3자에게 기업정보를 제공하는 데 동의합니다(필수)'}
    ];
    // 체크된 아이템을 담을 배열
  const [patnerCheckItems, patnerSetCheckItems] = useState([]);

  // 체크박스 단일 선택
  const patnerHandleSingleCheck = (checked, id) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      patnerSetCheckItems(prev => [...prev, id]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      patnerSetCheckItems(patnerCheckItems.filter((el) => el !== id));
    }
    if(patnerCheckItems.length === 2){
      props.checkTrueReturn2(true);
    }else{
      props.checkTrueReturn2(false);
    }
  };

  // 체크박스 전체 선택
  const patnerHandleAllCheck = (checked) => {
    if(checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 patnerCheckItems 상태 업데이트
      const idArray = [];
      patnerData.forEach((el) => idArray.push(el.id));
      patnerSetCheckItems(idArray);
      props.checkTrueReturn2(true);
    }
    else {
      // 전체 선택 해제 시 patnerCheckItems 를 빈 배열로 상태 업데이트
      patnerSetCheckItems([]);
      props.checkTrueReturn2(false);
    }
  }
    return (
        <div className="mb-3 AllCheckbox">
            <Alert variant="light">
                <Alert.Heading>
                <Form.Check aria-label="option 1" name='patner-all' label="기업정보 전체 동의"
                    onChange={(e) => patnerHandleAllCheck(e.target.checked)}
                    // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                    checked={patnerCheckItems.length === patnerData.length ? true : false} />
                </Alert.Heading>
                <hr />
                {patnerData?.map((patnerData, key) => (
                    <div className="checkboxs mb-3" key={key}>
                        <Form.Check aria-label="option 1" name={`patner-${patnerData.id}`} label={patnerData.title}
                            onChange={(e) => patnerHandleSingleCheck(e.target.checked, patnerData.id)}
                            // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                            checked={patnerCheckItems.includes(patnerData.id) ? true : false} />
                    </div>
                ))}
            </Alert>
        </div>
    );
  }

  
  export default JoinCheck;