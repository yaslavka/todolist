import {baseInstance} from "./index";

export const userInfo = () => baseInstance.get('/user')
