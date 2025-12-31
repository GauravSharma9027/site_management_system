import React from "react";
export default function SummaryCard({ label, value, status = false }) {
    const statusClass =
        status && value === "Submitted"
            ? "text-green-700 bg-green-50 border-green-200"
            : status
                ? "text-amber-700 bg-amber-50 border-amber-200"
                : "text-gray-900 bg-white border-gray-200";

    return (
        <div className={`rounded-xl border ${statusClass} p-4 shadow-sm`}>
            <p className="text-xs font-medium text-gray-600">{label}</p>
            <p className="mt-2 text-sm font-semibold">
                {value}
            </p>
        </div>
    );
}
