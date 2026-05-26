import React from "react";

export default function FriendCard({ friend, onClick }) {
  const getStatusClass = (status) => {
    switch (status) {
      case "overdue":
        return "bg-[#ef4444] text-white";
      case "on_track":
        return "bg-[#0f3d32] text-white";
      case "due":
      case "almost_due":
        return "bg-[#f59e0b] text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const formatStatusText = (status) => {
    if (status === "on_track") return "On-Track";
    if (status === "due" || status === "almost_due") return "Almost Due";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-center text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-200 hover:shadow-[0_4px_25px_-2px_rgba(0,0,0,0.08)] hover:scale-[1.01]"
    >
      <div className="w-24 h-24 rounded-full overflow-hidden mb-4 ring-4 ring-gray-50 flex items-center justify-center">
        <img
          className="w-full h-full object-cover"
          src={friend.picture}
          alt={friend.name}
        />
      </div>

      <h3 className="text-[17px] font-bold text-[#1e293b] tracking-tight">
        {friend.name}
      </h3>

      <p className="text-xs text-gray-400 mt-1 font-medium">
        {friend.days_since_contact}d ago
      </p>

      <div className="flex flex-wrap justify-center gap-1.5 mt-4 min-h-6">
        {friend.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-[#d1fae5] text-[#065f46] text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 w-full">
        <span
          className={`inline-block text-xs font-bold px-5 py-2 rounded-full tracking-wide min-w-28.75 ${getStatusClass(friend.status)}`}
        >
          {formatStatusText(friend.status)}
        </span>
      </div>
    </div>
  );
}
