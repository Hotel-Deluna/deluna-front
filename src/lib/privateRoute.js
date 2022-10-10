import React from "react";
import { Route, Navigate } from "react-router-dom";
import isLogin from "./isLogin";

const PrivateRoute = ({ component : Comment, ...rest}) => {
    return (
        <Route
            {...rest}
            //접근가능한 권한이 없을 경우 login페이지 이동
            render={(props) => {
                !isLogin() && alert("로그인 후 이용가능합니다.");
                return isLogin() ? <Comment {...props} /> : <Navigate to="/auth/login" />;
            }}
        />
    )
};

export default PrivateRoute