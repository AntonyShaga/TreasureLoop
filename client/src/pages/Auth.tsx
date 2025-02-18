import {FC, useState} from 'react';
import {AuthService} from "../services/auth.service.ts";
import {toast} from "react-toastify";
import {setTokenToLocaleStorage} from "../helpers/localStorage.helper.ts";
import {logIn} from "../store/users/userSlice.ts";
import {useAppDispatch} from "../store/hooks.ts";
import {useNavigate} from "react-router-dom";


const Auth: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isLogin, setIslogin] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const data = await AuthService.registration({email, password})
            if (data) {
                toast.success('Account has been created.')
                setIslogin(!isLogin)
            }
        } catch (err:any) {
            const error = err.response?.data.message
            toast.error(error.toString())
        }
    }

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const data = await AuthService.login({email, password})
            if (data) {
                setTokenToLocaleStorage('token',data.token)
                dispatch(logIn(data))
                toast.success('You logget in')
                navigate('/')
            }
        } catch (err:any) {
            const error = err.response?.data.message
            toast.error(error.toString())
        }
    }

    return (
        <div className="mt-40 flex flex-col items-center justify-center bg-slate-900 text-white">
            <h1 className="mb-10 text-center text-xl">
                {
                    isLogin ? 'Login' : 'Registration'
                }
            </h1>
            <form className="mx-auto flex w-1/3 flex-col gap-5" onSubmit={isLogin ? loginHandler : registrationHandler}>
                <input className="input" type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                <input className="input" type="password" placeholder="Password"
                       onChange={(e) => setPassword(e.target.value)}/>

                <button className="btn btn-green mx-auto" type="submit">Submit</button>
            </form>
            <div className="mt-5 flex justify-center">
                {
                    isLogin ? (
                        <button onClick={() => setIslogin(!isLogin)} className="text-slate-300 hover:text-white">
                            You don't have an account?
                        </button>
                    ) : (
                        <button onClick={() => setIslogin(!isLogin)} className="text-slate-300 hover:text-white">
                            Already have an account?
                        </button>
                    )
                }
            </div>
        </div>
    );
};

export default Auth;
