import React, { useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import FriendCard from "./FriendCard";

export default function FriendshipDashboard() {
  // 1. RootLayout থেকে friendsList, totalStats এবং গ্লোবাল setLoading ফাংশনটি আনা হলো
  const { friendsList, totalStats, setLoading } = useOutletContext();
  const navigate = useNavigate();

  // 2. পেজ লোড হওয়ার সময় গ্লোবাল স্পিনার চালু করা
  useEffect(() => {
    setLoading(true); // লোডিং শুরু

    const timer = setTimeout(() => {
      setLoading(false); // ১ সেকেন্ড পর লোডিং শেষ
    }, 1000);

    return () => clearTimeout(timer);
  }, [setLoading]);

  // মেট্রিক্স ক্যালকুলেশন
  const totalFriends = friendsList.length;
  const onTrackCount = friendsList.filter(
    (f) => f.status === "on_track",
  ).length;
  const needAttentionCount = friendsList.filter(
    (f) => f.status !== "on_track",
  ).length;

  const handleAddFriend = () => {
    console.log("Add Friend button clicked");
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col items-center justify-start pt-16 px-4 font-sans selection:bg-teal-100">
      {/* Header Section */}
      <header className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-4xl md:text-[42px] font-bold text-[#1e293b] tracking-tight mb-4">
          Friends to keep close in your life
        </h1>
        <p className="text-sm md:text-base text-slate-500 leading-relaxed max-w-lg mx-auto">
          Your personal shelf of meaningful connections. Browse, tend, and
          nurture the relationships that matter most.
        </p>
      </header>

      {/* Action Button */}
      <div className="mb-12">
        <button
          onClick={handleAddFriend}
          className="inline-flex items-center gap-2 bg-[#234e42] hover:bg-[#1b3d33] text-white px-5 py-2.5 rounded-md text-sm font-semibold tracking-wide transition-colors duration-200 shadow-sm"
        >
          <Plus size={16} strokeWidth={2.5} />
          Add a Friend
        </button>
      </div>

      {/* Metrics Grid */}
      <main className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2 mb-12">
        {/* Metric Cards */}
        {[
          { label: "Total Friends", value: totalFriends },
          { label: "On Track", value: onTrackCount },
          { label: "Need Attention", value: needAttentionCount },
          { label: "Interactions This Month", value: totalStats },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-slate-100/80 p-8 flex flex-col items-center justify-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-transform duration-200 hover:scale-[1.01]"
          >
            <span className="text-[38px] font-bold text-[#1f4d3e] leading-none mb-3">
              {item.value}
            </span>
            <span className="text-sm font-medium text-slate-500 tracking-wide">
              {item.label}
            </span>
          </div>
        ))}
      </main>

      {/* Title Section */}
      <div className="w-full max-w-5xl text-left mb-6 px-2">
        <h2 className="text-2xl font-bold text-[#1e293b]">Your Friends</h2>
      </div>

      {/* Friends List Grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2 pb-16">
        {friendsList.length === 0 ? (
          <div className="col-span-full text-center py-12 text-slate-400 bg-white rounded-2xl border border-slate-100 p-8 w-full">
            No friends found in your network.
          </div>
        ) : (
          friendsList.map((friend) => (
            <FriendCard
              key={friend.id}
              friend={friend}
              onClick={() => navigate(`/friends/${friend.id}`)}
            />
          ))
        )}
      </div>
    </div>
  );
}
