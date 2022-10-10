import React from "react";
import { Route, Navigate } from "react-router-dom";
import isLogin from "./isLogin";

//로그인 한 고객, 사업자가 다시 로그인 페이지에 접속하려고 할때
const PublicRoute = ({ component : Comment, restricted, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => 
                isLogin() && restricted ? <Navigate to="/" /> : <Comment {...props} />
            }
        />
    )
};

export default PublicRoute