import { FC } from 'react';
import { Link } from 'react-router-dom';
import errorImage from '../assets/ErrorPage.webp';

const ErrorPage: FC = () => {
    return (
        <div
            className="relative min-h-screen flex items-center justify-center text-white px-4"
            style={{
                backgroundImage: `url(${errorImage})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundColor: '#000216'
            }}
        >
            {/* Кнопка */}
            <Link
                className="absolute bottom-[25%] left-1/2 -translate-x-1/2 z-10 rounded-md
                    bg-sky-500 px-6 py-2 text-white hover:bg-sky-600 transition"
                to="/"
            >
                Back
            </Link>
        </div>
    );
};

export default ErrorPage;
