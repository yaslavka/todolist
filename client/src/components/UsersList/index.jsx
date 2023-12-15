import React from "react";

function UsersList({user, setName}) {
    return (
        <>
            <button onClick={()=>setName(user.foolName)}>{user.foolName}</button>
        </>
    )
}
export default UsersList