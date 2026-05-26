import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function Timeline() {
  const { timelineEvents } = useOutletContext();
  const [filterType, setFilterType] = useState("all");

  const getIcon = (type) => {
    switch (type.toLowerCase()) {
      case "call":
        return "📞";
      case "text":
        return "💬";
      case "video":
        return "📹";
      default:
        return "🤝";
    }
  };

  const filteredEvents = timelineEvents.filter((event) => {
    if (filterType === "all") return true;
    return event.type.toLowerCase() === filterType.toLowerCase();
  });

  return (
    <div className="w-full max-w-2xl mx-auto p-6 min-h-screen bg-slate-50/50 pt-12 font-sans">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Timeline</h1>

      {/* Filter Dropdown */}
      <div className="mb-6 relative max-w-xs">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="w-full bg-white border border-slate-200 text-slate-500 rounded-lg px-4 py-2.5 text-sm appearance-none focus:outline-none cursor-pointer shadow-sm"
        >
          <option value="all">Filter timeline</option>
          <option value="call">Calls</option>
          <option value="text">Texts</option>
          <option value="video">Videos</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400 text-xs">
          ▼
        </div>
      </div>

      {/* ইভেন্ট লিস্ট */}
      {filteredEvents.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-100 p-8 text-center text-slate-400 text-sm shadow-sm">
          No timeline events found.
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {filteredEvents.map((event, index) => (
            <React.Fragment key={event.id}>
              <div className="w-full bg-white border border-slate-100 rounded-xl p-5 shadow-sm flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-slate-50 flex items-center justify-center text-xl border border-slate-100">
                  {getIcon(event.type)}
                </div>

                <div className="flex flex-col">
                  <h3 className="text-sm font-semibold text-slate-700">
                    <span className="capitalize">
                      {event.type === "video" ? "Video" : event.type}
                    </span>{" "}
                    <span className="text-slate-400 font-normal">with</span>{" "}
                    <span className="text-slate-600 font-medium">
                      {event.with}
                    </span>
                  </h3>
                  <span className="text-xs text-slate-400 mt-1 font-medium">
                    {event.date}
                  </span>
                </div>
              </div>

              {index !== filteredEvents.length - 1 && (
                <div className="w-8 h-0.5 bg-pink-400 my-2 rounded-full"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
