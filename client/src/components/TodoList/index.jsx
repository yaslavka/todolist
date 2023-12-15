import React, {useState} from "react";
import styles from './todoList.module.scss'
import {Button} from "reactstrap";
import {useDispatch} from "react-redux";
import * as taskActions from '../../actions/task.actions'

function TodoList({list}) {
    const dispatch = useDispatch()
    const [editActive, setEditActive]=useState(false)
    const [text, setText] = useState('')
    const taskStatusChange = (id)=>{
        dispatch(taskActions.taskStatus({id: id, status: true}))
    }
    const taskEdit = (id)=>{
        dispatch(taskActions.taskEdit({id: id, task: text || list.task}))
        setEditActive(false)
    }
    return (
        <>

            <div className={styles.sectionTaskRow}>
                {list.status === true ? (
                    <div className={styles.taskRow}>
                        <svg width={25} height={25} fill={'#60ff03'}>
                            <path d="m18 7-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41 6 19l1.41-1.41L1.83 12 .41 13.41z"/>
                        </svg>
                        <div>Выполнен</div>
                    </div>
                ):(
                    <div className={styles.taskRow}>
                        <svg width={25} height={25}>
                            <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                        </svg>
                        <div>не выполнен</div>
                    </div>
                )}
                {editActive ? (
                    <>
                        <textarea value={text} onChange={(e)=>setText(e.target.value)} placeholder={list.task}/>
                    </>
                ):(
                    <div className={styles.taskRow}>
                        {list.task}
                    </div>
                )}
                <div className={styles.taskRow}>
                    {list.user?.email}
                </div>
                <div className={styles.taskRow}>
                    {list.user?.foolName}
                </div>
                <div className={styles.taskRow}>
                    {list.user?.phone}
                </div>
                <div className={styles.actionsButton}>
                    <svg width={25} height={25} fill={'#00008B'} role={"button"} onClick={()=>setEditActive(!editActive)}>
                        <path d="M22 24H2v-4h20v4zM13.06 5.19l3.75 3.75L7.75 18H4v-3.75l9.06-9.06zm4.82 2.68-3.75-3.75 1.83-1.83c.39-.39 1.02-.39 1.41 0l2.34 2.34c.39.39.39 1.02 0 1.41l-1.83 1.83z"/>
                    </svg>
                    {editActive ? (
                        <Button color={'success'} type={'submit'} onClick={()=>{taskEdit(list.id)}}>
                            Сохранить
                        </Button>
                    ):(
                        <Button onClick={()=>{taskStatusChange(list.id)}} type={'submit'} disabled={list.status} color={list.status === true ? 'success': 'primary'}>{list.status === true ? 'Выполненно':'Выполнить'}</Button>
                    )}
                </div>
            </div>
        </>
    )
}
export default TodoList