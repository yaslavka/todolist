import React, {useCallback, useState} from "react";
import {Modal} from "react-bootstrap";
import styles from './modalSortName.module.scss'
import {Button, Input} from "reactstrap";
import UsersList from "../UsersList";
import * as actionTask from "../../actions/task.actions";
import {useDispatch} from "react-redux";

function ModalSortName({onClick, modalSortName, nameUsers}) {
    const dispatch = useDispatch()
    const [searchUser, setSearchUser] = useState('');
    const filteredUsers = nameUsers
        ? nameUsers.filter((user) =>
            user.foolName.toLowerCase().includes(searchUser.toLowerCase())
        )
        : [];
    const search = useCallback(()=>{
        dispatch(actionTask.taskPages(1));
        dispatch(actionTask.taskUserFoolName(searchUser))
        onClick()
    },[searchUser, dispatch, onClick])
    return (
        <>
            <Modal show={modalSortName} onHide={onClick}>
                <Modal.Header closeButton={onClick}>
                    <Modal.Title className={styles.title}>
                        Введите имя
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input className={styles.input} value={searchUser} onChange={(e)=>setSearchUser(e.target.value)}/>
                    <article className={styles.userWrapper}>
                        {filteredUsers && filteredUsers.map((user, index)=>(
                            <UsersList user={user} key={index} setSearchUser={setSearchUser}/>
                        ))}
                    </article>
                </Modal.Body>
                <Modal.Footer>
                    <Button color={'primary'} onClick={search}>
                        найти
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalSortName