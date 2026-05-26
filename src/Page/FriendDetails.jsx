import React from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { Phone, MessageSquare, Video } from "lucide-react";

export default function FriendDetails() {
  const { id } = useParams();

  const { friendsList, handleNewInteraction } = useOutletContext();
  const friend = friendsList.find((f) => f.id === parseInt(id));

  if (!friend) {
    return (
      <div className="p-8 text-center font-medium text-slate-500">
        Friend not found!
      </div>
    );
  }

  const handleActionClick = (e, type) => {
    e.preventDefault();
    handleNewInteraction(type, friend.id, friend.name);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-slate-50 min-h-screen pt-12 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-slate-100">
            <img
              src={
                friend.img ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256"
              }
              alt={friend.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-bold text-slate-800">{friend.name}</h2>

          <span
            className={`mt-2 px-3 py-0.5 text-xs font-bold rounded-full uppercase tracking-wider ${
              friend.status === "overdue"
                ? "bg-red-100 text-red-600"
                : "bg-emerald-100 text-emerald-600"
            }`}
          >
            {friend.status === "overdue" ? "Overdue" : "On Track"}
          </span>

          <span className="mt-2 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 rounded-md">
            {friend.category || "Family"}
          </span>

          <p className="mt-4 text-sm italic text-slate-500 font-medium">
            "{friend.description || "Former colleague, great mentor"}"
          </p>
          <span className="mt-2 text-xs text-slate-400">
            Preferred: {friend.preferred_channel || "email"}
          </span>
          {/* button */}

          <div className="w-full mt-6 space-y-2 pt-4 border-t border-slate-50">
            <button className="w-full py-2.5 px-4 text-sm font-medium text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors flex items-center justify-center gap-2">
              ⏰ Snooze 2 Weeks
            </button>
            <button className="w-full py-2.5 px-4 text-sm font-medium text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors flex items-center justify-center gap-2">
              📁 Archive
            </button>
            <button className="w-full py-2.5 px-4 text-sm font-medium text-red-600 bg-white hover:bg-red-50 border border-red-100 rounded-xl transition-colors flex items-center justify-center gap-2">
              🗑️ Delete
            </button>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm text-center">
              <span className="text-3xl font-bold text-slate-700">
                {friend.days_since_contact}
              </span>
              <p className="text-xs font-medium text-slate-400 mt-1">
                Days Since Contact
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm text-center">
              <span className="text-3xl font-bold text-slate-700">
                {friend.connection_goal_days || 30}
              </span>
              <p className="text-xs font-medium text-slate-400 mt-1">
                Goal (Days)
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm text-center flex flex-col justify-center items-center">
              <span className="text-lg md:text-xl font-bold text-[#1e3d32] whitespace-nowrap">
                {friend.next_due_date || "Feb 27, 2026"}
              </span>
              <p className="text-xs font-medium text-slate-400 mt-1">
                Next Due
              </p>
            </div>
          </div>

          {/* Relationship Goal Card */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-slate-700">
                Relationship Goal
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Connect every{" "}
                <span className="font-bold text-slate-800">
                  {friend.connection_goal_days || 30} days
                </span>
              </p>
            </div>
            <button className="px-4 py-1.5 text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors">
              Edit
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h3 className="text-base font-bold text-[#1e3d32] mb-4">
              Quick Check-In
            </h3>

            <div className="grid grid-cols-3 gap-4">
              {/* Call Button */}
              <button
                onClick={(e) => handleActionClick(e, "call")}
                className="flex flex-col items-center justify-center p-5 bg-slate-50 hover:bg-slate-100/80 active:scale-95 rounded-xl border border-slate-100/80 transition-all duration-150 group"
              >
                <Phone
                  className="text-slate-600 group-hover:text-[#1e3d32] mb-2 transition-colors"
                  size={22}
                />
                <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-800">
                  Call
                </span>
              </button>

              {/* Text Button */}
              <button
                onClick={(e) => handleActionClick(e, "text")}
                className="flex flex-col items-center justify-center p-5 bg-slate-50 hover:bg-slate-100/80 active:scale-95 rounded-xl border border-slate-100/80 transition-all duration-150 group"
              >
                <MessageSquare
                  className="text-slate-600 group-hover:text-[#1e3d32] mb-2 transition-colors"
                  size={22}
                />
                <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-800">
                  Text
                </span>
              </button>

              {/* Video Button */}
              <button
                onClick={(e) => handleActionClick(e, "video")}
                className="flex flex-col items-center justify-center p-5 bg-slate-50 hover:bg-slate-100/80 active:scale-95 rounded-xl border border-slate-100/80 transition-all duration-150 group"
              >
                <Video
                  className="text-slate-600 group-hover:text-[#1e3d32] mb-2 transition-colors"
                  size={22}
                />
                <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-800">
                  Video
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
