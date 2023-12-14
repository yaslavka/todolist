import React from "react";
import styles from './header.module.scss'
import logo from "../../logo.svg";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as actions from '../../actions/auth.actions'

function Header({modalAuth, modalSignUp}) {
    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state.app.user)
    const LogOuts =  () => {
        dispatch(actions.signOutSuccess());
        localStorage.clear();
        localStorage.removeItem('access_token');
    };
    return (
        <>
            <header className={styles.header}>
                <Link to={'/'}>
                    <img src={logo} className="App-logo" alt="logo" />
                </Link>
                <div className={styles.headerCenter}>
                    TODO TEST LIST
                </div>
                {userInfo ? (
                    <div className={styles.buttonContainer}>
                        <img className={styles.avatar} alt={userInfo?.foolName} src={
                            userInfo?.avatar
                                ? `${process.env.REACT_APP_BASE_IMAGE_URL}/${userInfo?.avatar}`
                                : 'https://www.w3schools.com/howto/img_avatar.png'
                        }/>
                        <button className={styles.button} onClick={LogOuts}>
                            Выйти
                        </button>
                    </div>
                ):(
                    <div className={styles.buttonContainer}>
                        <button className={styles.button} onClick={modalAuth}>
                            Войти
                        </button>
                        <button className={styles.button} onClick={modalSignUp}>
                            Регистрация
                        </button>
                    </div>
                )}
            </header>
        </>
    )
}
export default Header