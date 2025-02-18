import './App.css'
import {RouterProvider} from "react-router-dom";
import {router} from "./router/router.tsx";
import {useAppDispatch} from "./store/hooks.ts";
import {getTokenFromLocalStorage} from "./helpers/localStorage.helper.ts";
import {AuthService} from "./services/auth.service.ts";
import {logIn, logOut} from "./store/users/userSlice.ts";
import {useEffect} from "react";

function App() {
  const dispatch = useAppDispatch()
  const checkAuth = async () => {
    const token = getTokenFromLocalStorage()
    try {
      if(token) {
        const data = await AuthService.getMe()
        if (data) {
          dispatch(logIn(data))
        }else {
          dispatch(logOut())
        }
      }
    }catch (err) {
      console.log(err)
    }
  }
  useEffect(()=> {
    checkAuth()
  },[])
  return <RouterProvider router={router}/>
}

export default App
