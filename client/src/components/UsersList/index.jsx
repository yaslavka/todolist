import React from "react";
import * as actionTask from "../../actions/task.actions";
import {useDispatch} from "react-redux";

function UsersList({user}) {
    const dispatch = useDispatch()
    return (
        <>
            <button onClick={()=>{dispatch(actionTask.taskUserFoolName(user.foolName))}}>{user.foolName}</button>
        </>
    )
}
export default UsersList