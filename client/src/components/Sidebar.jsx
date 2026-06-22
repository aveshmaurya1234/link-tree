import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navLinkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-lg transition ${
      isActive
        ? "bg-green-600 text-white"
        : "hover:bg-gray-100 text-gray-700"
    }`;

    return (
        <aside className="w-64 bg-white border-r min-h-screen p-5">
            <h1 className="text-2xl font-bold text-green-600 mb-10">LinkHub</h1>

            <nav className="space-y-2">
                <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>

                <NavLink to="/profile" className={navLinkClass}>Profile</NavLink>

                <NavLink to="/analytics" className={navLinkClass}> Analytics</NavLink>
            </nav>
        </aside>
    );
};

export default Sidebar;