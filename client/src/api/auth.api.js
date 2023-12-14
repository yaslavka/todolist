import {baseInstance} from "./index";

export const signIn = (credentials) =>{
   return  baseInstance.post('/login', credentials)
}
export const signInAdmin = (credentials) =>{
   return  baseInstance.post('/login_admin', credentials)
}
export const signUp = (credentials) =>{
   return  baseInstance.post('/register', credentials)
}