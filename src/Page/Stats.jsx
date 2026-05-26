import React from "react";
import { useOutletContext } from "react-router-dom";

export default function Stats() {
  const context = useOutletContext();

  const interactionCounts = context?.interactionCounts || {
    text: 0,
    call: 0,
    video: 0,
  };
  const totalStats = context?.totalStats || 0;

  const textPct =
    totalStats > 0
      ? Math.round((interactionCounts.text / totalStats) * 100)
      : 0;
  const callPct =
    totalStats > 0
      ? Math.round((interactionCounts.call / totalStats) * 100)
      : 0;
  const videoPct =
    totalStats > 0
      ? Math.round((interactionCounts.video / totalStats) * 100)
      : 0;

  const data = [
    { name: "Text", value: textPct, color: "#8b5cf6" },
    { name: "Call", value: callPct, color: "#234e42" },
    { name: "Video", value: videoPct, color: "#22c55e" },
  ];

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  let currentOffset = 0;

  return (
    <div className="w-full max-w-5xl mx-auto p-6 pt-16 font-sans bg-slate-50/30 min-h-screen">
      <h1 className="text-4xl font-bold text-[#1e293b] mb-8 px-4">
        Friendship Analytics
      </h1>

      <div className="bg-white rounded-2xl border border-slate-100 p-8 md:p-12 shadow-sm max-w-4xl mx-auto flex flex-col items-center">
        <h3 className="text-sm font-bold text-[#234e42] mb-12 self-start pl-2">
          By Interaction Type
        </h3>

        {totalStats > 0 ? (
          <div className="flex flex-col items-center w-full">
            <div className="relative w-56 h-56 flex items-center justify-center">
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 100 100"
              >
                {data.map((item, index) => {
                  if (item.value === 0) return null;

                  const strokeDashoffset =
                    circumference - (item.value / 100) * circumference;
                  const rotation = (currentOffset / 100) * 360;
                  currentOffset += item.value;

                  return (
                    <circle
                      key={index}
                      cx="50"
                      cy="50"
                      r={radius}
                      fill="transparent"
                      stroke={item.color}
                      strokeWidth="10"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      style={{
                        transform: `rotate(${rotation}deg)`,
                        transformOrigin: "50px 50px",
                        transition: "all 0.5s ease",
                      }}
                    />
                  );
                })}
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold text-slate-800">
                  {totalStats}
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-0.5">
                  Total
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 mt-12 flex-wrap">
              {data.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span className="text-xs font-medium text-slate-600">
                    {item.name} ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400 text-sm">
            <p>No analytics data available to display.</p>
          </div>
        )}
      </div>
    </div>
  );
}
