import React, {useCallback} from "react";
import styles from './main.module.scss'
import {Button} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import * as modalActions from '../../actions/globalUseState.actions'
import TodoList from "../../components/TodoList";
import ModalSortName from "../../components/ModalSortName";
import ModalAddTask from "../../components/ModalAddTask";
import ModalSortEmail from "../../components/ModalSortEmail";
import ModalSortStatus from "../../components/ModalSortStatus";

function RootPages() {
    const dispatch = useDispatch()
    const task = useSelector((state) => state.task.task)
    const modalSortName = useSelector((state) => state.useState.modalSortNameVisible)
    const modalSortEmail = useSelector((state) => state.useState.modalSortEmailVisible)
    const modalSortStatus = useSelector((state) => state.useState.modalSortStatusVisible)
    const modalSortAdd = useSelector((state) => state.useState.modalSortAddVisible)

    const modalName = useCallback(() => {
        if (modalSortName === false) {
            dispatch(modalActions.modalSortName(true))
        } else {
            dispatch(modalActions.modalSortName(false))
        }
    }, [dispatch, modalSortName])

    const modalAddTask = useCallback(() => {
        if (modalSortAdd === false) {
            dispatch(modalActions.modalSortAdd(true))
        } else {
            dispatch(modalActions.modalSortAdd(false))
        }
    }, [dispatch, modalSortAdd])

    const modalEmailSort = useCallback(() => {
        if (modalSortEmail === false) {
            dispatch(modalActions.modalSortEmail(true))
        } else {
            dispatch(modalActions.modalSortEmail(false))
        }
    }, [dispatch, modalSortEmail])
    const modalStatusSort = useCallback(() => {
        if (modalSortStatus === false) {
            dispatch(modalActions.modalSortStatus(true))
        } else {
            dispatch(modalActions.modalSortStatus(false))
        }
    }, [dispatch, modalSortStatus])
    return (
        <>
            <main className={styles.main}>
                <div className={styles.sectionButton}>
                    <section className={styles.section}>
                        <div className={styles.sortText}>
                            Сортировать:
                        </div>
                        <Button color={'primary'} className={styles.sortButton} onClick={modalName}>
                            По имени
                        </Button>
                        <Button color={'primary'} className={styles.sortButton}>
                            По Email
                        </Button>
                        <Button color={'primary'} className={styles.sortButton} onClick={modalStatusSort}>
                            По Статусу
                        </Button>
                    </section>
                    <Button color={'primary'} className={styles.sortButton} onClick={modalAddTask}>
                        Добавить задачу
                    </Button>
                </div>
                {task && (
                    <div className={styles.todoListContainer}>

                        <div className={styles.todoListWrapper}>
                            <section className={styles.sectionWrapper}>
                                <div className={styles.titleRow}>
                                    статус
                                </div>
                                <div className={styles.titleRow}>
                                    Задача
                                </div>
                                <div className={styles.titleRow}>
                                    Email
                                </div>
                                <div className={styles.titleRow}>
                                    Автор
                                </div>
                                <div className={styles.titleRow}>
                                    Телефон
                                </div>
                                <div className={styles.options}>
                                    Опции
                                </div>
                            </section>
                            <section className={styles.sectionTask}>
                                {task.task.map((item, index) => (
                                    <TodoList list={item} key={index}/>
                                ))}
                            </section>
                        </div>
                    </div>
                )}
                {modalSortName &&
                <ModalSortName modalSortName={modalSortName} onClick={modalName} nameUsers={task && task.users}/>
                }
                {modalSortAdd &&
                <ModalAddTask onClick={modalAddTask} modalSortAdd={modalSortAdd}/>
                }
                {modalSortEmail &&
                <ModalSortEmail onClick={modalEmailSort} modalSortEmail={modalSortEmail} emailUsers={task && task.users}/>
                }
                {modalSortStatus &&
                <ModalSortStatus onClick={modalStatusSort} modalSortStatus={modalSortStatus}/>
                }
            </main>
        </>
    )
}

export default RootPages