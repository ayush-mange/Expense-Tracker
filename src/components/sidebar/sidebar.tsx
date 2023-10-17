import React from "react";
// import { useState } from "react";
// import Login from "./auth/login";
// import SignUp from "./auth/signup";
import { Link } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";

const Sidebar = () => {
const { logout } = useUserAuth();

    const handleLogout =async () => {
    try {
        await logout();
    } catch (error) {
        
    }
}
    return(
        <>
        <div className="bg-[#303030] w-[20%] overflow-y-auto h-[100%] fixed text-custom-dark flex flex-col">
            <div className=" text-white text-2xl font-semibold justify-center items-center gap-6  ml-[10%] mt-[10%]">
                Save Sphere
            </div>
                
                <div className="mt-[5%] cursor-pointer p-8">
                <>
                <li className={`text-white h-12 flex flex-row items-center gap-6 p-5 rounded-xl font-medium text-base hover:text-lg` }> 
                    <Link to="/">Home</Link>
                </li>
                <li className={` text-white h-12 flex flex-row items-center gap-6 p-5 rounded-xl font-medium text-base  hover:text-lg` }>
                   <Link to="/expense">Expense</Link> 
                </li>
                <li className={` text-white h-12 flex flex-row items-center gap-6 p-5 rounded-xl font-medium text-base   hover:text-lg` }>
                    Income
                </li>
                <li className={` text-white h-12 flex flex-row items-center gap-6 p-5 rounded-xl font-medium text-base  hover:text-lg` }>
                    Analytics
                </li>  
                <li className={` text-white h-12 flex flex-row items-center gap-6 p-5 rounded-xl font-medium text-base   hover:text-lg` }>
                    Contact Us
                </li>  
                </>
                </div>

                <div className="ml-[10%] mt-[30%] flex flex-col justify-center gap-3    text-white">
                   <div className="font-medium text-xl cursor-pointer hover:text-[#ccc8c8]">
                   <Link to="register">SignUp</Link>
                   </div>
                    <div   className="font-medium text-xl cursor-pointer hover:text-[#ccc8c8]">
                        <Link to="login">Login</Link>
                    </div>
                    <div className="font-medium text-xl cursor-pointer hover:text-[#ccc8c8]" onClick={handleLogout}>
                        Logout
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default Sidebar;