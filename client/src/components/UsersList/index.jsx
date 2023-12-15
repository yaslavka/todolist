import React from "react";
import styles from './userList.module.css'

function UsersList({user, setSearchUser, email}) {

    return (
        <>
            {email ? (
                <div className={styles.userListContainer}>
                    <button onClick={()=>{setSearchUser(user.email)}} className={styles.userBottom}>{user.email}</button>
                </div>
            ):(
                <div className={styles.userListContainer}>
                    <button onClick={()=>{setSearchUser(user.foolName)}} className={styles.userBottom}>{user.foolName}</button>
                </div>
            )}
        </>
    )
}
export default UsersList