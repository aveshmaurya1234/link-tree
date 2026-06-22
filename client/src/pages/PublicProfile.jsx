import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Globe, Link as LinkIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import api from "../lib/axios";

const PublicProfile = () => {
  const { username } = useParams();

  const [profile, setProfile] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        `/users/public/${username}`
      );

      if (response.data.success) {
        setProfile(response.data.data.user);
        setLinks(response.data.data.links);
      }
    } catch (error) {
      console.log(error);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [username]);

  const getIcon = (title) => {
    const lower = title?.toLowerCase();

    if (lower.includes("github")) {
      return <FaGithub size={20} />;
    }

    return <Globe size={20} />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center">
        <div className="text-white text-xl font-semibold">
          Loading...
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-white text-3xl font-bold">
            User Not Found
          </h1>

          <p className="text-slate-400 mt-3">
            This profile does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black">
      <div className="max-w-lg mx-auto px-4 py-10">
        {/* Profile Section */}
        <div className="text-center">
          <img
            src={profile?.profilePic}
            alt={profile?.name}
            className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-white shadow-xl"
          />

          <h1 className="text-white text-3xl font-bold mt-5">
            {profile?.name}
          </h1>

          <p className="text-green-400 mt-2">
            @{profile?.username}
          </p>

          {profile?.bio && (
            <p className="text-slate-300 mt-4 max-w-md mx-auto">
              {profile.bio}
            </p>
          )}
        </div>

        {/* Links */}
        <div className="mt-10 space-y-4">
          {links.length > 0 ? (
            links.map((link) => (
              <a
                key={link._id}
                href={`${
                  import.meta.env.VITE_API_URL
                }/links/redirect/${link._id}`}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between bg-white text-slate-900 px-5 py-4 rounded-2xl shadow-lg hover:scale-[1.02] hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  {getIcon(link.title)}

                  <span className="font-semibold">
                    {link.title}
                  </span>
                </div>

                <LinkIcon
                  size={18}
                  className="group-hover:rotate-12 transition"
                />
              </a>
            ))
          ) : (
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center text-slate-300">
              No links available
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm">
            Powered by LinkHub
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;