import React, {useEffect, useState} from "react";
const Timer = ({timerCheck, reTimerCheck, resetCertify}) => {
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [booleanCheck, setBooleanCheck] = useState(false);
  if(!booleanCheck){
    setBooleanCheck(true);
    setMinutes(1);
    setSeconds(0);
  }
  useEffect(() => {
    setMinutes();
    setSeconds();
    setMinutes(3);
    setSeconds(0);
  },[reTimerCheck]);
  let countdown;
  useEffect(() => {
    if(timerCheck){
      countdown = setInterval(() => {
        if (parseInt(seconds) > 0) {
          setSeconds(parseInt(seconds) - 1);
        }
        if (parseInt(seconds) === 0) {
          if (parseInt(minutes) === 0) {
              setBooleanCheck(false);
              resetCertify(1);
              clearInterval(countdown);
              
          } else {
            setMinutes(parseInt(minutes) - 1);
            setSeconds(59);
          }
        }
      }, 1000);
      return () => clearInterval(countdown);
    }else{
      setBooleanCheck(false);
      setMinutes(0);
      setSeconds(0);
      clearInterval(countdown);
    }
  }, [minutes, seconds, timerCheck]);
  
  return (
      <p>
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds} 
      </p>
  );
};

export default Timer;