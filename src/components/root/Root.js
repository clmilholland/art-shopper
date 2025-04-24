import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Message from "../message/Message";

export const Root = () => {
    return (
        <>
            <Header/>
            <Message/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}