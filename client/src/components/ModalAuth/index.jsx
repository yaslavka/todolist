import React, {useCallback, useMemo} from "react";
import Modal from 'react-bootstrap/Modal';
import {useDispatch} from "react-redux";
import {Button} from "reactstrap";
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import * as actions from '../../actions/auth.actions'
import styles from "../ModalAddTask/modalAddTask.module.scss";
import InputTodo from "../InputTodo";
import {isValidEmail} from "../../utils";
import * as useStateAction from "../../actions/globalUseState.actions";

function ModalAuth({modalAuthVisible, modalAuth}) {
    const dispatch = useDispatch()
    const initialValues = useMemo(
        () => ({
            email:'',
            password:''
        }),
        [],
    )
    const validationSchema = useMemo(
        () =>
            yup.object().shape({
                email: yup
                    .string()
                    .required('Полеобязательно для заполнения')
                    .test('email', 'Email должен быть test@mail.ru', (value) => isValidEmail(value)),
                password: yup
                    .string()
                    .required('Полеобязательно для заполнения'),
            }),
        [],
    )
    const onSubmitSignIn =useCallback((credentials)=>{
        dispatch(actions.signIn({...credentials}))
        dispatch(useStateAction.modalAuth(false))
    },[dispatch])
    return (
        <>
            <Modal show={modalAuthVisible} onHide={modalAuth}>
                <Modal.Header  closeButton={modalAuth}>
                    <Modal.Title>
                        Авторизация
                    </Modal.Title>
                </Modal.Header>
                <Formik initialValues={initialValues} onSubmit={onSubmitSignIn} validationSchema={validationSchema}>
                    {()=>(
                        <>
                          <Form>
                              <Modal.Body>
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
                              </Modal.Body>
                              <Modal.Footer>
                                  <Button color={'primary'} type='submit' block>
                                      Войти
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
export default ModalAuth