import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// react-router-dom이 업그레이드 되면서 Switch 가 routes로 변경됨 + component도 element로 변경


import LoginContainer from './LoginContainer';
import SignupContainer from './SignupContainer';
import HomePage from './HomePage';
import NotFoundPage from './NotFoundPage';
import ModifyContainer from './ModifyContainer';
import SignupOkPage from './SignupOkPage';

export default function App() {

    // const {location: {pathname}} = window;

    // console.log(pathname)

    // const MyComponent = {
    //     '/': HomePage,
    //     '/login': LoginContainer,
    //      '/signup':SignupContainer,
    //       '/modify':ModifyContainer,
    // }[pathname] || NotFoundPage; 

    return (
        // <MyComponent
        // />
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/login" element={<LoginContainer/>} />
                <Route exact path="/signup" element={<SignupContainer/>} />
                <Route exact path="/modify" element={<ModifyContainer/>} />
                <Route exact path="/signupok" element={<SignupOkPage/>} />
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </BrowserRouter>
    )
      
}