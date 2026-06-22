import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

import api from "../lib/axios";
import LinkCard from "../components/LinkCard";
import AddLinkModal from "../components/AddLinkModal";
import EditLinkModal from "../components/EditLinkModal";

const Dashboard = () => {
  const user = useSelector((state) => state.user);

  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openAddModal, setOpenAddModal] = useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);

  // Fetch All Links
  const fetchLinks = async () => {
    try {
      setLoading(true);

      const response = await api.get("/links");

      if (response.data.success) {
        setLinks(response.data.data);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to load links"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  // Delete Link
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this link?"
    );

    if (!confirmDelete) return;

    try {
      const response = await api.delete(`/links/${id}`);

      if (response.data.success) {
        toast.success(response.data.message);

        setLinks((prev) =>
          prev.filter((link) => link._id !== id)
        );
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  // Open Edit Modal
  const handleEdit = (link) => {
    setSelectedLink(link);
    setOpenEditModal(true);
  };

  return (
    <div>
      {/* Header */}
      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <p className="text-gray-500 mt-2">
        Welcome back, {user?.name}
      </p>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-5 mt-8">
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">
            Total Links
          </h3>

          <p className="text-3xl font-bold mt-2">
            {links.length}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">
            Total Clicks
          </h3>

          <p className="text-3xl font-bold mt-2">
            {links.reduce(
              (acc, item) =>
                acc + (item.clicks || 0),
              0
            )}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">
            Profile Views
          </h3>

          <p className="text-3xl font-bold mt-2">
            {user?.profileViews || 0}
          </p>
        </div>
      </div>

      {/* Links Header */}
      <div className="mt-8 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">
          My Links
        </h2>

        <button
          onClick={() => setOpenAddModal(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} />
          Add Link
        </button>
      </div>

      {/* Links List */}
      <div className="grid gap-4 mt-5">
        {loading ? (
          <div className="bg-white p-8 rounded-xl text-center">
            Loading...
          </div>
        ) : links.length === 0 ? (
          <div className="bg-white p-10 rounded-xl text-center">
            No links found
          </div>
        ) : (
          links.map((link) => (
            <LinkCard
              key={link._id}
              link={link}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      {/* Add Link Modal */}
      <AddLinkModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onSuccess={(newLink) => {
          setLinks((prev) => [
            newLink,
            ...prev,
          ]);
        }}
      />

      {/* Edit Link Modal */}
      <EditLinkModal
        open={openEditModal}
        selectedLink={selectedLink}
        onClose={() => {
          setOpenEditModal(false);
          setSelectedLink(null);
        }}
        onSuccess={(updatedLink) => {
          setLinks((prev) =>
            prev.map((link) =>
              link._id === updatedLink._id
                ? updatedLink
                : link
            )
          );
        }}
      />
    </div>
  );
};

export default Dashboard;