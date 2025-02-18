import {FC} from 'react';
import {Link, NavLink, useNavigate} from "react-router-dom";
import logo from '../icons/TreasureLoopLogo.webp'
import {useAuth} from "../hooks/useAuth.ts";
import {useAppDispatch} from "../store/hooks.ts";
import {logOut} from "../store/users/userSlice.ts";
import {removeTokenFromLocalStorage} from "../helpers/localStorage.helper.ts";
import {toast} from "react-toastify";

const Header: FC = () => {
    const dispatch = useAppDispatch()
    const isAuth = useAuth()
    const navigate = useNavigate()
    const logOutHendler = () => {
        dispatch(logOut())
        removeTokenFromLocalStorage('token')
        toast.success('You logged Out')
        navigate('/')
    }
    return (
        <header className="flex items-center  bg-slate-800 p-2 shadow-sm backdrop-blur-sm">
            <Link to="/">
                <img title={"Logo"} alt={"Logo of Treasure Loop"} src={logo} className="w-10 h-10  rounded-full"/>
            </Link>
            {
                isAuth && (
                    <nav className="ml-auto mr-10">
                        <ul className=" flex items-center gap-5">
                            <li>
                                <NavLink to={"/"} className={({isActive})=> isActive ? 'text-white' : 'text-white/50'}>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/transactions"} className={({isActive})=> isActive ? 'text-white' : 'text-white/50'}>Transactions</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/categories"} className={({isActive})=> isActive ? 'text-white' : 'text-white/50'}>Categories</NavLink>
                            </li>
                        </ul>
                    </nav>
                )
            }
            {
                isAuth ? (
                    <button onClick={logOutHendler} type="submit" className="btn btn-red">
                        <span>
                            Log Out
                        </span>
                    </button>
                ) : (
                    <Link to={'auth'} className="py-2 text-white/50 hover:text-white ml-auto">
                        Log in / Sing in
                    </Link>
                )
            }
        </header>
    );
};

export default Header;
