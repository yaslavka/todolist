import React, {useCallback} from "react";
import styles from './main.module.scss'
import {Button} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import * as modalActions from '../../actions/globalUseState.actions'
import TodoList from "../../components/TodoList";
import ModalSortName from "../../components/ModalSortName";
import ModalAddTask from "../../components/ModalAddTask";
import ModalSortEmail from "../../components/ModalSortEmail";
import * as actionTask from "../../actions/task.actions";

function RootPages() {
    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state.app.user)
    const task = useSelector((state) => state.task.task)
    const pages = useSelector((state) => state.task.pages)
    const modalSortName = useSelector((state) => state.useState.modalSortNameVisible)
    const modalSortEmail = useSelector((state) => state.useState.modalSortEmailVisible)
    const status = useSelector((state) => state.task.status)
    const email = useSelector((state) => state.task.email)
    const foolName = useSelector((state) => state.task.email)
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

    const nextPages = (page)=>{
        dispatch(actionTask.taskInfo({pages: page ? page : pages, count: 3 , foolName:foolName, email:email, status:status}))
        dispatch(actionTask.taskPages(page))
        //dispatch(actionTask.taskUserEmail(email))
    }

    const titleMap = [
        'Номер п/п', 'статус', 'Задача', 'Email', 'Автор', 'Телефон'
    ];
    const titleAdmin = [
        'Номер п/п', 'статус', 'Задача', 'Email', 'Автор', 'Телефон', 'Опции'
    ];

    return (
        <>
            <main className={styles.main}>
                <aside className={styles.sectionButton}>
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
                        <Button color={'primary'} className={styles.sortButton} onClick={()=>{dispatch(actionTask.status(false))}} >
                            Не выполненые
                        </Button>
                        <Button color={'primary'} className={styles.sortButton} onClick={()=>{dispatch(actionTask.status(true))}} >
                            Выполненые
                        </Button>
                    </section>
                    <Button color={'primary'} className={styles.sortButton} onClick={modalAddTask}>
                        Добавить задачу
                    </Button>
                </aside>
                {task && (
                    <section className={styles.todoListContainer}>
                         <article className={userInfo?.isAdmin ? styles.sectionWrapperAdmin : styles.sectionWrapper}>
                             {userInfo?.isAdmin ? (
                                 <ul className={styles.ulAdmin}>
                                     {titleAdmin.map((item, index) => (
                                         <li className={styles.titleRow} key={index}>{item}</li>
                                     ))}
                                 </ul>
                             ):(
                                 <ul className={styles.ul}>
                                     {titleMap.map((item, index) => (
                                         <li className={styles.titleRow} key={index}>{item}</li>
                                     ))}
                                 </ul>
                             )}
                         </article>
                         <article className={styles.sectionTask}>
                             {task.task.map((item, index) => (
                                 <TodoList list={item} key={index} userInfo={userInfo && userInfo}/>
                             ))}
                         </article>
                         {Array.from({length: task.totalPages}, (_, index) =>(
                             <button key={index +1} onClick={()=>{nextPages(index + 1)}} className={styles.pagesButton}>{index + 1}</button>
                         ))}
                    </section>
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
            </main>
        </>
    )
}

export default RootPages