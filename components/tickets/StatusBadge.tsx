import React from "react";
interface StatusBadgeProps {
  status: "open" | "closed";
}
export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <span
      className={`
        inline-block px-2 py-0.5 text-xs font-medium rounded-full
        ${status === "open" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
      `}
    >
      {status}
    </span>
  );
};
