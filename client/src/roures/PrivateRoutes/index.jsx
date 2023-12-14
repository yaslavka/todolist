import React from "react";
import {Switch, Redirect, BrowserRouter as Router, BrowserRouter} from 'react-router-dom'
import omit from 'lodash-es/omit'
import routesLik from "../../constants/routes.constants";
import RouteWithSubRoutes from "../../components/RouteWithSubRoutes";
import {privateRouteConfig} from "../../routes";
import styles from './privateRoute.module.scss'
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function PrivateRoutes() {
    return (
        <>
            <BrowserRouter>
                <Router>
                   <div className={styles.globalWrapper}>
                       <Header/>
                       <Switch>
                           {privateRouteConfig.map((route)=>(
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
export default PrivateRoutes