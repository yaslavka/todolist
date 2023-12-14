import React from "react";
import {Modal} from "react-bootstrap";
import styles from "../ModalSortName/modalSortName.module.scss";
import {Button, Input} from "reactstrap";

function ModalSortStatus({onClick, modalSortStatus, status}) {
    return (
        <>
            <Modal show={modalSortStatus} onHide={onClick}>
                <Modal.Header closeButton={onClick}>
                    <Modal.Title className={styles.title}>
                        Введите имя
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input className={styles.input}/>
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
export default ModalSortStatus