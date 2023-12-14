import React from "react";
import {Switch, Redirect, BrowserRouter as Router, BrowserRouter} from 'react-router-dom'
import omit from 'lodash-es/omit'
import routesLik from "../../constants/routes.constants";
import RouteWithSubRoutes from "../../components/RouteWithSubRoutes";
import {publicRouteConfig} from "../../routes";
import styles from './publicRoute.module.scss'
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {useDispatch, useSelector} from "react-redux";
import * as useStateAction from "../../actions/globalUseState.actions";
import ModalAuth from "../../components/ModalAuth";
import ModalSignUp from "../../components/ModalSignUp";

function PublicRoutes() {
    const dispatch = useDispatch()
    const modalAuthVisible = useSelector((state) => state.useState.modalAuthVisible)
    const modalSignUpVisible = useSelector((state) => state.useState.modalSignUpVisible)
    const modalAuth = ()=>{
        if (modalAuthVisible === false){
            dispatch(useStateAction.modalAuth(true))
        }else {
            dispatch(useStateAction.modalAuth(false))
        }
    }
    const modalSignUp = ()=>{
        if (modalSignUpVisible === false){
            dispatch(useStateAction.modalSinUp(true))
        }else {
            dispatch(useStateAction.modalSinUp(false))
        }
    }
    return (
        <>
            <BrowserRouter>
                <Router>
                    <div className={styles.globalWrapper}>
                        <Header modalAuth={modalAuth} modalSignUp={modalSignUp}/>
                        {modalAuthVisible && <ModalAuth modalAuthVisible={modalAuthVisible} modalAuth={modalAuth}/>}
                        {modalSignUpVisible && <ModalSignUp modalSignUpVisible={modalSignUpVisible} modalSignUp={modalSignUp}/>}
                        <Switch>
                            {publicRouteConfig.map((route)=>(
                                <RouteWithSubRoutes key={route.id} {...omit(route, 'id')}/>
                            ))}
                            <Redirect to={routesLik.root}/>
                        </Switch>
                        <Footer/>
                    </div>
                </Router>
            </BrowserRouter>
        </>
    )
}
export default PublicRoutes
