import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";

import api from "../lib/axios";
import uploadFile from "../helpers/uploadFile";
import { setUser } from "../redex/userSlice";
import { Link } from "react-router";

const Profile = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const uploadPhotoRef = useRef();

    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        bio: "",
        profilePic: "",
    });

    useEffect(() => {
        setFormData({
        name: user?.name || "",
        username: user?.username || "",
        bio: user?.bio || "",
        profilePic: user?.profilePic || "",
        });
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleOpenUploadPhoto = (e) => {
        e.preventDefault();
        uploadPhotoRef.current.click();
    };

    const handleUploadPhoto = async (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        try {
        setLoading(true);

        const uploadResponse = await uploadFile(
            file,
            setUploadProgress
        );

        setFormData((prev) => ({
            ...prev,
            profilePic: uploadResponse.secure_url,
        }));

        toast.success("Image uploaded successfully");
        } catch (error) {
        toast.error("Image upload failed");
        } finally {
        setLoading(false);
        setUploadProgress(0);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        setLoading(true);

        const response = await api.put(
            "/users/profile",
            formData
        );

        if (response.data.success) {
            dispatch(setUser(response.data.data));

            toast.success(response.data.message);
        }
        } catch (error) {
        toast.error(
            error?.response?.data?.message ||
            "Something went wrong"
        );
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow p-6">
            <h1 className="text-3xl font-bold">
            Profile Settings
            </h1>

            <p className="text-gray-500 mt-2">
            Manage your public profile information.
            </p>
        </div>

        {/* Form */}
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow p-6 mt-6"
        >
            {/* Profile Image */}
            <div className="flex flex-col items-center">
            <img
                src={formData?.profilePic || "https://via.placeholder.com/150" }
                alt="profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-green-500"
            />

            <button
                onClick={handleOpenUploadPhoto}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
            >
                Change Photo
            </button>

            <input
                ref={uploadPhotoRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUploadPhoto}
            />

            {uploadProgress > 0 && (
                <p className="mt-2 text-sm text-gray-500">
                Uploading: {uploadProgress}%
                </p>
            )}
            </div>

            {/* Inputs */}
            <div className="grid md:grid-cols-2 gap-5 mt-8">
            <div>
                <label className="block mb-2 font-medium">
                Full Name
                </label>

                <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            <div>
                <label className="block mb-2 font-medium">
                Username
                </label>

                <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>
            </div>

            {/* Bio */}
            <div className="mt-5">
            <label className="block mb-2 font-medium">
                Bio
            </label>

            <textarea
                rows="4"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Tell people about yourself..."
            />
            </div>

            {/* Public URL */}
            <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="font-medium text-green-700"> Your Public Profile</p>

                <Link to={`/${formData.username}`}target="_blank" className="text-green-600 hover:underline">
                    {window.location.origin}/{formData.username}
                </Link>
            </div>

            {/* Submit */}
            <div className="mt-8 flex justify-end">
            <button
                disabled={loading}
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2"
            >
                {loading && (
                <Loader2Icon
                    className="animate-spin"
                    size={18}
                />
                )}

                Save Changes
            </button>
            </div>
        </form>
        </div>
    );
};

export default Profile;