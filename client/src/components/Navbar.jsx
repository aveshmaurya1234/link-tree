import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "./Avatar";
import { useNavigate } from "react-router";
import { LogOutIcon } from 'lucide-react'
import { logout } from "../redex/userSlice";


const Navbar = () => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = ()=>{
        dispatch(logout())
        navigate("/login")
        localStorage.clear()
    }

    return (
        <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">
                Welcome, {user?.name || "User"}
            </h2>
            
            <div className='flex items-center gap-2'>
                <button className='mx-auto' title={user?.name}>
                    <Avatar
                        width={40}
                        height={40}
                        name={user?.name}
                        imageUrl={user?.profilePic}
                        userId={user?._id}
                    />
                </button>
                <button title='logout' className='w-10 h-10 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded-full' onClick={handleLogout}>
                    <span className='flex'>
                        <LogOutIcon size={20}/>
                    </span>
                </button>
            </div>
        </header>
    );
};

export default Navbar;