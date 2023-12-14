import React, {useCallback, useMemo} from "react";
import Modal from 'react-bootstrap/Modal';
import {useDispatch} from "react-redux";
import {Button} from "reactstrap";
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import * as actions from '../../actions/auth.actions'
import styles from "../ModalAddTask/modalAddTask.module.scss";
import InputTodo from "../InputTodo";
import {isValidEmail, isValidPassword, isValidPhone, isValidUsername} from "../../utils";

function ModalSignUp({modalSignUp, modalSignUpVisible}) {
    const dispatch = useDispatch()
    const initialValues = useMemo(
        () => ({
            foolName:'',
            username:'',
            email:'',
            password:'',
            phone:''
        }),
        [],
    )
    const validationSchema = useMemo(
        () =>
            yup.object().shape({
                foolName: yup
                    .string()
                    .required('Полеобязательно для заполнения'),
                username: yup
                    .string()
                    .required('Полеобязательно для заполнения')
                    .test('username', 'Неверный формат Username', (value) => isValidUsername(value)),
                email: yup
                    .string()
                    .required('Полеобязательно для заполнения')
                    .test('email', 'Email должен быть test@mail.ru', (value) => isValidEmail(value)),
                password: yup
                    .string()
                    .required('Полеобязательно для заполнения')
                    .test('password', 'пароль должен содержать 8 цифер латинские буквы одну маленькую одну большую и один специальный символ', (value) => isValidPassword(value)),
                phone: yup
                    .string()
                    .required('Полеобязательно для заполнения')
                    .test('phone', 'Поле Телефон Некоректно', (value) => isValidPhone(value)),
            }),
        [],
    )
    const onSubmitSignUp =useCallback((credentials)=>{
        dispatch(actions.signUp({...credentials}))
    },[dispatch])
    return (
        <>
            <Modal show={modalSignUpVisible} onHide={modalSignUp}>
                <Modal.Header  closeButton={modalSignUp}>
                    <Modal.Title>
                        Регистрация
                    </Modal.Title>
                </Modal.Header>
                <Formik initialValues={initialValues} onSubmit={onSubmitSignUp} validationSchema={validationSchema}>
                    {()=>(
                        <>
                            <Form>
                                <Modal.Body>
                                    <Field
                                        type='text'
                                        name='foolName'
                                        className={styles.input}
                                        placeholder={'Ваш Имя'}
                                        component={InputTodo}
                                    />
                                    <Field
                                        type='username'
                                        name='username'
                                        className={styles.input}
                                        placeholder={'Ваш Username'}
                                        component={InputTodo}
                                    />
                                    <Field
                                        type='email'
                                        name='email'
                                        className={styles.input}
                                        placeholder={'Ваш Емаил'}
                                        component={InputTodo}
                                    />
                                    <Field
                                        type='password'
                                        name='password'
                                        className={styles.input}
                                        placeholder={'Ваш пароль'}
                                        component={InputTodo}
                                    />
                                    <Field
                                        type='phone'
                                        name='phone'
                                        className={styles.input}
                                        placeholder={'Ваш Телефон'}
                                        component={InputTodo}
                                    />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button color={'primary'} type='submit' block>
                                        Зарегистрироватся
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        </>
                    )}
                </Formik>
            </Modal>
        </>
    )
}
export default ModalSignUp