import {useDispatch, useSelector} from "react-redux";
import * as actionUserInfo from './actions/app.actions'
import {useEffect} from "react";
import PublicRoutes from "./roures/PublicRoutes";
import PrivateRoutes from "./roures/PrivateRoutes";
import * as actionTask from "./actions/task.actions";

function App() {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const status = useSelector((state) => state.task.status)
  const email = useSelector((state) => state.task.email)
  const foolName = useSelector((state) => state.task.foolName)
  useEffect(()=>{
    if (isAuthenticated){
      dispatch(actionUserInfo.userInfo())
    }
  }, [dispatch, isAuthenticated])

  useEffect(()=>{
    dispatch(actionTask.taskInfo({foolName:foolName, email:email, status:status}))
  },[dispatch, foolName, email, status])

  if (!isAuthenticated){
    return <PublicRoutes/>
  }else {
    return <PrivateRoutes/>
  }
}

export default App;
