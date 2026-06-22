import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import api from "../lib/axios";
import { logout, setUser } from "../redex/userSlice";
import Loading from "./Loading";

const AuthLoader = ({ children }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await api.get("/users/profile");

            if (response.data.success) {
                dispatch(setUser(response?.data?.data));
            }
        } catch (error) {
            localStorage.removeItem("token");
            dispatch(logout());
        } finally {
            setLoading(false);
        }
        };

        fetchProfile();
    }, [dispatch]);

    if (loading) {
        return (
        <div className="h-screen flex items-center justify-center">
            <Loading/> Loading...
        </div>
        );
    }

    return children;
};

export default AuthLoader;