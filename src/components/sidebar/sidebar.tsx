import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";

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
        <img src="" alt="Close icon" />
    ) : (
        <img src="/path_to_menu_icon" alt="Menu icon" />
    )}
</button>

            <div className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} bg-[#303030] w-[80%] md:w-[20%] overflow-y-auto h-full fixed text-custom-dark flex flex-col transition-transform duration-300 ease-in-out ${currentPath === "/login" && 'hidden'} ${currentPath === "/register" && 'hidden'}`}>
                <div className="text-white text-2xl font-semibold justify-center items-center gap-6 ml-[10%] mt-[10%]">
                    Save Sphere
                </div>

                <div className="mt-[5%] cursor-pointer p-8">
                    <li className="text-white h-12 flex flex-row items-center gap-6 p-5 rounded-xl font-medium text-base hover:text-lg">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="text-white h-12 flex flex-row items-center gap-6 p-5 rounded-xl font-medium text-base hover:text-lg">
                        <Link to="/expense">Expense</Link>
                    </li>
                    <li className="text-white h-12 flex flex-row items-center gap-6 p-5 rounded-xl font-medium text-base hover:text-lg">
                        <Link to="/income">Income</Link>
                    </li>
                </div>

                <div className="ml-[10%] mt-[30%] flex flex-col justify-center gap-3 text-white">
                    <div className="font-medium text-xl cursor-pointer hover:text-[#ccc8c8]">
                        <Link to="/register">SignUp</Link>
                    </div>
                    <div className="font-medium text-xl cursor-pointer hover:text-[#ccc8c8]">
                        <Link to="/login">Login</Link>
                    </div>
                    <div className="font-medium text-xl cursor-pointer hover:text-[#ccc8c8]" onClick={handleLogout}>
                        Logout
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
