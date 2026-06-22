import React, { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios";

const EditLinkModal = ({
  open,
  onClose,
  selectedLink,
  onSuccess,
}) => {
  const [data, setData] = useState({
    title: "",
    url: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedLink) {
      setData({
        title: selectedLink.title || "",
        url: selectedLink.url || "",
      });
    }
  }, [selectedLink]);

  if (!open || !selectedLink) return null;

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

      const response = await api.put(
        `/links/${selectedLink._id}`,
        data
      );

      if (response.data.success) {
        toast.success(
          response.data.message ||
            "Link updated successfully"
        );

        onSuccess(response.data.data);

        onClose();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update link"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center border-b p-5">
          <h2 className="text-xl font-semibold">
            Edit Link
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
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
              Title
            </label>

            <input
              type="text"
              name="title"
              value={data.title}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
              placeholder="GitHub"
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
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
              placeholder="https://github.com/username"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex justify-center items-center gap-2 disabled:opacity-50"
          >
            {loading && (
              <Loader2
                size={18}
                className="animate-spin"
              />
            )}

            Update Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditLinkModal;
