import './App.css';
import {useDispatch, useSelector} from "react-redux";
import * as actionUserInfo from './actions/app.actions'
import * as actionTask from './actions/task.actions'
import {useEffect} from "react";
import PublicRoutes from "./roures/PublicRoutes";
import PrivateRoutes from "./roures/PrivateRoutes";

function App() {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  useEffect(()=>{
    if (isAuthenticated){
      dispatch(actionUserInfo.userInfo())
    }
  }, [dispatch, isAuthenticated])

  useEffect(()=>{
    dispatch(actionTask.taskInfo())
  },[dispatch])

  if (!isAuthenticated){
    return <PublicRoutes/>
  }else {
    return <PrivateRoutes/>
  }
}

export default App;
