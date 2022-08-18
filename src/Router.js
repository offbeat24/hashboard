import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { UserID } from './components/recoil';
import styled from 'styled-components';
import { Fragment } from "react";
import TopBar from './components/navigation/topbar';
import LoginPage from './components/signinPage/loginPage';
import Dashboard from './components/dashboard/DragLayout';
function Router() {
    const ID = useRecoilValue(UserID)
    console.log("Logged in ID : %s", ID)
    return (
        <BrowserRouter>
            {
                ID !== 1
                ?
                <Fragment>
                    <TopBar />
                </Fragment>
                :
                <Fragment />
            }
            <Body>
                <Routes>
                    
                    <Route path = "/" element={<Dashboard/>} />
                </Routes>
            </Body>
        </BrowserRouter>
    )
}

const Body = styled.div`
    margin-top:77px;
    z-index:10;
`
export default Router;