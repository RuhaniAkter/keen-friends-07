import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import initialFriendsData from "../Page/data.json";

const Spinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
  </div>
);

function Rootlayout() {
  const [friendsList, setFriendsList] = useState(initialFriendsData);
  const [totalStats, setTotalStats] = useState(0);
  const [loading, setLoading] = useState(false);

  const [interactionCounts, setInteractionCounts] = useState({
    call: 0,
    text: 0,
    video: 0,
  });
  const [timelineEvents, setTimelineEvents] = useState([]);

  const handleNewInteraction = (type, id, name) => {
    setTotalStats((prev) => prev + 1);
    setInteractionCounts((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));

    // FIXED: Added
    const actionType =
      type === "call"
        ? "Call"
        : type === "text"
          ? "Text"
          : type === "video"
            ? "Video"
            : "Email";

    const newEvent = {
      id: Date.now(),
      type: actionType,
      with: name,
      date:
        new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }) + " (Just now)",
    };

    setTimelineEvents((prev) => [newEvent, ...prev]);

    setFriendsList((prevList) =>
      prevList.map((f) =>
        f.id === id ? { ...f, days_since_contact: 0, status: "on_track" } : f,
      ),
    );

    toast.success(`Logged ${actionType} interaction with ${name}! 🚀`, {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* যদি loading ট্রু হয় তবেই Spinner দেখাবে */}
      {loading && <Spinner />}

      <div>
        <Navbar />
        <Outlet
          context={{
            friendsList,
            totalStats,
            interactionCounts,
            timelineEvents,
            handleNewInteraction,
            setLoading,
          }}
        />
      </div>

      <Footer />
      <ToastContainer />
    </div>
  );
}

export default Rootlayout;
