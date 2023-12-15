import React, {useState} from "react";
import {Modal} from "react-bootstrap";
import styles from './modalSortName.module.scss'
import {Button, Input} from "reactstrap";
import UsersList from "../UsersList";

function ModalSortName({onClick, modalSortName, nameUsers}) {
    const [searchUser, setSearchUser] = useState('');
    const filteredUsers = nameUsers
        ? nameUsers.filter((user) =>
            user.foolName.toLowerCase().includes(searchUser.toLowerCase())
        )
        : [];
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
                    {filteredUsers && filteredUsers.map((user, index)=>(
                        <UsersList user={user} key={index}/>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button color={'primary'} onClick={onClick}>
                        найти
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalSortName