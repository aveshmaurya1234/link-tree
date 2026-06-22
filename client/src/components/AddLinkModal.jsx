import React, { useState } from "react";
import { X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios";


const AddLinkModal = ({ open, onClose, onSuccess }) => {
    const [data, setData] = useState({
        title: "",
        url: "",
    });

    const [loading, setLoading] = useState(false);

    if (!open) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setData((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!data.title.trim()) {
        return toast.error("Title is required");
        }

        if (!data.url.trim()) {
        return toast.error("URL is required");
        }

        try {
        setLoading(true);

        const response = await api.post("/links", data);

        if (response.data.success) {
            toast.success(response.data.message);

            setData({
            title: "",
            url: "",
            });

            // Parent ko new link bhej do
            onSuccess(response.data.data);
            onClose();
        }
        } catch (error) {
        toast.error(
            error?.response?.data?.message ||
            "Failed to create link"
        );
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl">
            {/* Header */}
            <div className="flex justify-between items-center p-5 border-b">
            <h2 className="text-xl font-semibold">
                Add New Link
            </h2>

            <button
                onClick={onClose}
                className="hover:bg-gray-100 p-2 rounded-full"
            >
                <X size={20} />
            </button>
            </div>

            {/* Form */}
            <form
            onSubmit={handleSubmit}
            className="p-5 space-y-5"
            >
            <div>
                <label className="block mb-2 font-medium">
                Link Title
                </label>

                <input
                type="text"
                name="title"
                value={data.title}
                onChange={handleChange}
                placeholder="GitHub"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            <div>
                <label className="block mb-2 font-medium">
                URL
                </label>

                <input
                type="url"
                name="url"
                value={data.url}
                onChange={handleChange}
                placeholder="https://github.com/username"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex justify-center items-center gap-2 disabled:opacity-50"
            >
                {loading && (
                <Loader2 className="animate-spin" size={18} />
                )}

                Add Link
            </button>
            </form>
        </div>
        </div>
    );
};

export default AddLinkModal;
