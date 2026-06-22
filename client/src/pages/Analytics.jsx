import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../lib/axios";

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    totalLinks: 0,
    totalClicks: 0,
    links: [],
  });

  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      const response = await api.get("/analytics");

      if (response.data.success) {
        setAnalytics(response.data.data);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to load analytics"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const topLink =
    analytics.links.length > 0
      ? [...analytics.links].sort(
          (a, b) => b.clicks - a.clicks
        )[0]
      : null;

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow p-10 text-center">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h1 className="text-3xl font-bold">
          Analytics
        </h1>

        <p className="text-gray-500 mt-2">
          Track the performance of your links.
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">
            Total Links
          </p>

          <h2 className="text-4xl font-bold mt-2 text-green-600">
            {analytics.totalLinks}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">
            Total Clicks
          </p>

          <h2 className="text-4xl font-bold mt-2 text-blue-600">
            {analytics.totalClicks}
          </h2>
        </div>
      </div>

      {/* Top Link */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          Top Performing Link
        </h2>

        {topLink ? (
          <div className="border rounded-xl p-4">
            <h3 className="font-semibold text-lg">
              {topLink.title}
            </h3>

            <p className="text-gray-500 mt-1">
              {topLink.clicks} clicks
            </p>
          </div>
        ) : (
          <p className="text-gray-500">
            No links found
          </p>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          Link Performance
        </h2>

        {analytics.links.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No analytics data available
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3">Title</th>
                  <th className="pb-3">Clicks</th>
                  <th className="pb-3">
                    Performance
                  </th>
                </tr>
              </thead>

              <tbody>
                {analytics.links.map((link) => (
                  <tr
                    key={link._id}
                    className="border-b"
                  >
                    <td className="py-4 font-medium">
                      {link.title}
                    </td>

                    <td className="py-4">
                      {link.clicks}
                    </td>

                    <td className="py-4 w-64">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-green-600 h-3 rounded-full transition-all"
                          style={{
                            width: `${
                              analytics.totalClicks > 0
                                ? (link.clicks /
                                    analytics.totalClicks) *
                                  100
                                : 0
                            }%`,
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;