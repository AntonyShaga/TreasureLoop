import {FC, ReactNode} from "react";
import { useAuth } from "../hooks/useAuth.ts";
import protection from "../assets/protection.webp";

interface Props {
    children: ReactNode;
}

const ProtectedRoute: FC<Props> = ({ children }) => {
    const isAuth = useAuth();

    return isAuth ? children : (
        <div className="flex flex-col justify-center items-center mt-20 gap-10">
            <h1 className="text-2xl">To view this page, you must be logged in.</h1>
            <img src={protection} alt="Access restricted" />
        </div>
    );
};

export default ProtectedRoute;
