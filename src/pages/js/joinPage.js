import React from "react";
import AuthLayout from "./authLayout";
import UserJoinForm from "./userJoinForm";
import ManagerJoinForm from "./managerJoinForm";
import { Tabs, Tab} from "react-bootstrap";
/**
 * 
 * 
 * 회원가입 페이지
 * 
 * 
 */

const JoinPage = () => {
    return (
        <AuthLayout>
            <Tabs defaultActiveKey="userJoin" id="justify-tab-example" className="mb-3" justify>
                        {/* 고객 회원가입 */}
                        <Tab eventKey="userJoin" title="고객 회원가입">
                                <UserJoinForm />
                        </Tab> 
                        {/* 사업자 회원가입 */}
                        <Tab eventKey="partnerJoin" title="사업자 회원가입">
                                <ManagerJoinForm />
                        </Tab>
                    </Tabs>
        </AuthLayout>
    );
}

export default JoinPage;