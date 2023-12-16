import React, {useCallback, useEffect, useState} from "react";
import styles from './main.module.scss'
import {Button} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import * as modalActions from '../../actions/globalUseState.actions'
import TodoList from "../../components/TodoList";
import ModalSortName from "../../components/ModalSortName";
import ModalAddTask from "../../components/ModalAddTask";
import ModalSortEmail from "../../components/ModalSortEmail";
import * as actionTask from "../../actions/task.actions";
import filter from 'lodash.filter';

function RootPages() {
    const dispatch = useDispatch()
    const [count]=useState(3)
    const userInfo = useSelector((state) => state.app.user)
    const task = useSelector((state) => state.task.task)
    const pages = useSelector((state) => state.task.pages)
    const modalSortName = useSelector((state) => state.useState.modalSortNameVisible)
    const modalSortEmail = useSelector((state) => state.useState.modalSortEmailVisible)
    const modalSortAdd = useSelector((state) => state.useState.modalSortAddVisible)
    const status = useSelector((state) => state.task.status)
    const email = useSelector((state) => state.task.email)
    const foolName = useSelector((state) => state.task.foolName)
    const [state, setState] = useState(task && task.task)
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
        dispatch(actionTask.taskPages(page))
    }
    const titleMap = [
        'Номер п/п', 'статус', 'Задача', 'Email', 'Автор', 'Телефон'
    ];
    const titleAdmin = [
        'Номер п/п', 'статус', 'Задача', 'Email', 'Автор', 'Телефон', 'Опции'
    ];
    const resetFilter = useCallback(()=>{
        dispatch(actionTask.taskPages(1))
        dispatch(actionTask.taskUserFoolName(null))
        dispatch(actionTask.taskUserEmail(null))
        dispatch(actionTask.status(undefined))
        dispatch(actionTask.taskInfoSuccess({task: task && task.task.sort((a, b) => a.id - b.id), users: task && task.users}))
    },[dispatch, task])

    const handleSort = () => {
        dispatch(actionTask.taskInfoSuccess({task: task && task.task.sort((a, b) => b.id - a.id), users: task && task.users}))

    }
    const containsTask=(tasks, statuses, name, emails)=>{
        return (
            tasks.status === statuses || tasks.user.foolName.toString() === name || tasks.user.email.toString() === emails
        )
    }
    let pagesNumber = []
    const lastTaskIndex = pages * count
    const firstTaskIndex = lastTaskIndex - count
    let currentPages = state && state.slice(firstTaskIndex, lastTaskIndex)
    const taskValue = task && task.task
    useEffect(()=>{
        const filterValue= filter(taskValue, item=>{
            return containsTask(item, status, foolName, email)
        })
        if (filterValue.length === 0){
           setState(taskValue)
        }else {
            setState(filterValue)
        }
    },[status, foolName, email, taskValue])

    for (let i = 1; i <= Math.ceil(state.length / count); i++){
        pagesNumber.push(i)
    }
    return (
        <>
            <main className={styles.main}>
                <aside className={styles.sectionButton}>
                    <section className={styles.section}>
                        <Button color={'primary'} className={styles.sortButton} onClick={handleSort}>
                            Сначало старые
                        </Button>
                        <Button color={'primary'} className={styles.sortButton} onClick={modalName}>
                            По имени
                        </Button>
                        <Button color={'primary'} className={styles.sortButton} onClick={modalEmailSort}>
                            По Email
                        </Button>
                        <Button color={'primary'} className={styles.sortButton} onClick={()=>{dispatch(actionTask.status(false))}} >
                            Не выполненые
                        </Button>
                        <Button color={'primary'} className={styles.sortButton} onClick={()=>{dispatch(actionTask.status(true))}} >
                            Выполненые
                        </Button>
                        <Button color={'primary'} className={styles.sortButton} onClick={resetFilter} >
                            Сбросить фильтер
                        </Button>
                    </section>
                    <Button color={'primary'} className={styles.sortButton} onClick={modalAddTask}>
                        Добавить задачу
                    </Button>
                </aside>
                {currentPages && (
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
                             {currentPages.map((item, index) => (
                                 <TodoList list={item} key={index} userInfo={userInfo && userInfo}/>
                             ))}
                         </article>
                        {pagesNumber.map((numberPages)=>(
                            <button key={numberPages} onClick={()=>{nextPages(numberPages)}} className={styles.pagesButton}>{numberPages}</button>
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