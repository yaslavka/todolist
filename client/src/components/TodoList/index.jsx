import React from "react";
import styles from './todoList.module.scss'
import {Button} from "reactstrap";

function TodoList({list}) {

    return (
        <>

            <div className={styles.sectionTaskRow}>
                {list.status === true ? (
                    <div className={styles.taskRow}>
                        Выполнен
                    </div>
                ):(
                    <div className={styles.taskRow}>
                        не выполнен
                    </div>
                )}
                <div className={styles.taskRow}>
                    {list.task}
                </div>
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
                    <svg width={25} height={25} fill={'#00008B'} role={"button"}>
                        <path d="M22 24H2v-4h20v4zM13.06 5.19l3.75 3.75L7.75 18H4v-3.75l9.06-9.06zm4.82 2.68-3.75-3.75 1.83-1.83c.39-.39 1.02-.39 1.41 0l2.34 2.34c.39.39.39 1.02 0 1.41l-1.83 1.83z"/>
                    </svg>
                    <Button disabled={list.status}>{list.status === true ? 'Выполненно':'Выполнить'}</Button>
                </div>
            </div>
        </>
    )
}
export default TodoList