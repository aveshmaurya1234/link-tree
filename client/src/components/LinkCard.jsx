import React from "react";
import { Pencil, Trash2, ExternalLink, MousePointerClick } from "lucide-react";

const LinkCard = ({ link, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md border p-5 hover:shadow-lg transition">
            <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                    {link.title}
                </h3>

                <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-green-600 text-sm break-all hover:underline"
                >
                    {link.url}
                </a>
                </div>

                <div className="flex items-center gap-2">
                <button
                    onClick={() => onEdit(link)}
                    className="p-2 rounded-lg hover:bg-blue-50 text-blue-600"
                    title="Edit Link"
                >
                    <Pencil size={18} />
                </button>

                <button
                    onClick={() => onDelete(link._id)}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                    title="Delete Link"
                >
                    <Trash2 size={18} />
                </button>
                </div>
            </div>

            <div className="flex justify-between items-center mt-5">
                <div className="flex items-center gap-2 text-gray-600">
                <MousePointerClick size={18} />
                <span>{link.clicks || 0} Clicks</span>
                </div>

                <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                <ExternalLink size={16} />
                Open
                </a>
            </div>
        </div>
    );
};

export default LinkCard;
