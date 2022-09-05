import React from "react";

const Timer = function(props) {

    return(
        <div className='timerDiv'>
            <p className={props.timerCheck ? 'visibility_visible' : 'visibility_hidden'}>
            </p>
        </div>
    );
}

export default Timer;