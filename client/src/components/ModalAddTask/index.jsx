import React, {useCallback, useMemo} from "react";
import Modal from 'react-bootstrap/Modal';
import styles from "./modalAddTask.module.scss";
import {Button} from "reactstrap";
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import {useDispatch, useSelector} from "react-redux";
import * as taskActions from './../../actions/task.actions'
import InputTodo from "../InputTodo";
import {isValidEmail, isValidPhone} from "../../utils";
import * as modalActions from "../../actions/globalUseState.actions";

function ModalAddTask({onClick, modalSortAdd}) {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

    const initialValuesAuth = useMemo(
        () => ({
            task: '',
        }),
        [],
    )
    const initialValues = useMemo(
        () => ({
            task: '',
            name:'',
            email:'',
            phone:''
        }),
        [],
    )

    const validationSchema = useMemo(
        () =>
            yup.object().shape({
                task: yup
                    .string()
                    .required('Полеобязательно для заполнения'),
                name: yup
                    .string()
                    .required('Полеобязательно для заполнения'),
                email: yup
                    .string()
                    .required('Полеобязательно для заполнения')
                    .test('email', 'Поле Email Некоректно', (value) => isValidEmail(value)),
                phone: yup
                    .string()
                    .required('Полеобязательно для заполнения')
                    .test('phone', 'Поле Телефон Некоректно', (value) => isValidPhone(value)),
            }),
        [],
    )


    const addTask = useCallback((taskInfo)=>{
        dispatch(modalActions.modalSortAdd(false))
        dispatch(taskActions.addTask({...taskInfo}))
    },[dispatch])

    const addTaskAuth = useCallback((taskInfo)=>{
        dispatch(taskActions.addTaskAth({...taskInfo}))
        dispatch(modalActions.modalSortAdd(false))
    },[dispatch])

    const validationSchemaAuth = useMemo(
        () =>
            yup.object().shape({
                task: yup
                    .string()
                    .required('Полеобязательно для заполнения'),
            }),
        [],
    )
    return (
        <>
            <Modal show={modalSortAdd} onHide={onClick}>
                <Modal.Header closeButton={onClick}>
                    <Modal.Title className={styles.title}>
                        Добавление новой задачи
                    </Modal.Title>
                </Modal.Header>
                <Formik initialValues={isAuthenticated === true ? initialValuesAuth : initialValues} onSubmit={isAuthenticated === true ? addTaskAuth : addTask} validationSchema={isAuthenticated === true ? validationSchemaAuth : validationSchema}>
                    {()=>(
                        <Form>

                            <Modal.Body>
                                <>
                                    {isAuthenticated === true ? (
                                        <Field
                                            type='text'
                                            name='task'
                                            className={styles.input}
                                            placeholder={'Задача'}
                                            component={InputTodo}
                                        />
                                    ):(
                                        <>
                                            <Field
                                                type='text'
                                                name='task'
                                                className={styles.input}
                                                placeholder={'Задача'}
                                                component={InputTodo}
                                            />
                                            <Field
                                                type='text'
                                                name='name'
                                                className={styles.input}
                                                placeholder={'Ваше имя'}
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
                                                type='phone'
                                                name='phone'
                                                className={styles.input}
                                                placeholder={'Ваш Телефон'}
                                                component={InputTodo}
                                            />
                                        </>
                                    )}
                                </>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button color={'primary'} type='submit' block>
                                    Добавить
                                </Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </>
    )
}
export default ModalAddTask