import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import closeIcon from '../../Assets/Close 1.png';

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const navigate = useNavigate();
    const { logout } = useUserAuth();
    const currentPath = window.location.pathname;

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login'); // Redirecting to login after logout
        } catch (error) {
            // Optionally handle error here
        }
    };

    return (
        <>
           <button
    className="text-white p-3 fixed z-30 md:hidden"
    onClick={toggleSidebar}
>
    {/* Use an image instead of text */}
    {isSidebarOpen ? (
        <img src={require("../../Assets/Close 1.png")} alt="Close icon" className="h-8 w-8 ml-[250px] mt-6"/>
    ) : (
        <img src={require("../../Assets/burger menu button.png")} alt="Menu icon" className="h-8 w-8 ml-[25px] mt-4"/>
    )}
</button>

            <div className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} bg-[white] w-[80%] md:w-[20%] overflow-y-auto h-full fixed text-custom-dark flex flex-col transition-transform duration-300 ease-in-out ${currentPath === "/login" && 'hidden'} ${currentPath === "/register" && 'hidden'}`}>
                <div className="text-#1D1D1D text-2xl font-bold justify-center items-center gap-6 ml-[10%] mt-[10%]">
                    Expense Tracker
                </div>

                <div className="mt-[5%]  cursor-pointer p-8">
                    <li className="text-#1D1D1D h-12 flex flex-row items-center gap-6 p-5 rounded-xl text-lg font-semibold text-base hover:text-xl font-sans">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="text-#1D1D1D h-12 flex flex-row items-center gap-6 p-5 rounded-xl text-lg font-semibold text-base hover:text-xl">
                        <Link to="/expense">Expense</Link>
                    </li>
                    <li className="text-#1D1D1D h-12 flex flex-row items-center gap-6 p-5 rounded-xl text-lg  font-semibold text-base hover:text-xl">
                        <Link to="/income">Income</Link>
                    </li>
                </div>

                <div className="ml-[20%] mt-[70%] flex flex-col justify-center gap-3 text-#1D1D1D">
                    <div className="font-medium text-lg font-semibold cursor-pointer hover:text-xl">
                        <Link to="/register">SignUp</Link>
                    </div>
                    <div className="font-medium text-lg font-semibold cursor-pointer hover:text-xl">
                        <Link to="/login">Login</Link>
                    </div>
                    <div className="font-medium text-lg font-semibold cursor-pointer hover:text-xl" onClick={handleLogout}>
                        Logout
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
