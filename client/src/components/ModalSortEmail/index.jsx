import React, {useCallback, useState} from "react";
import {Modal} from "react-bootstrap";
import {Button, Input} from "reactstrap";
import {useDispatch} from "react-redux";
import * as actionTask from "../../actions/task.actions";
import styles from "../ModalSortName/modalSortName.module.scss";
import UsersList from "../UsersList";


function ModalSortEmail({emailUsers, modalSortEmail, onClick}) {
    const dispatch = useDispatch()
    const [searchUser, setSearchUser] = useState('');
    const filteredUsers = emailUsers
        ? emailUsers.filter((user) =>
            user.email.toLowerCase().includes(searchUser.toLowerCase())
        )
        : [];

    const searchEmail = useCallback(()=>{
        dispatch(actionTask.taskPages(1));
        dispatch(actionTask.taskUserEmail(searchUser))
        onClick()
    },[searchUser, dispatch, onClick])
    return (
        <>
            <Modal show={modalSortEmail} onHide={onClick}>
                <Modal.Header closeButton={onClick}>
                    <Modal.Title className={styles.title}>
                        Введите имя
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input className={styles.input} value={searchUser} onChange={(e)=>setSearchUser(e.target.value)}/>
                    <article className={styles.userWrapper}>
                        {filteredUsers && filteredUsers.map((user, index)=>(
                            <UsersList user={user} key={index} setSearchUser={setSearchUser} email/>
                        ))}
                    </article>
                </Modal.Body>
                <Modal.Footer>
                    <Button color={'primary'} onClick={searchEmail}>
                        найти
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalSortEmail