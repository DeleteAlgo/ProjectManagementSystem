import React from "react"

export default function DashboardOverviewPanel({ translate }) {
    return (
        <div className="rounded-lg border border-dashed border-gray-700 bg-gray-800 p-6">
            <h2 className="text-white text-xl font-semibold">{translate("header")}</h2>
            <p className="mt-1 text-sm text-gray-300">{translate("subheader")}</p>

            {/* Stats */}
            <h3 className="mt-6 text-sm font-semibold text-gray-200">{translate("statsTitle")}</h3>
            <div className="mt-3 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-md bg-gray-900/40 p-3">
                    <div className="text-2xl font-bold text-white">12</div>
                    <div className="text-xs text-gray-400">{translate("projects")}</div>
                </div>
                <div className="rounded-md bg-gray-900/40 p-3">
                    <div className="text-2xl font-bold text-white">34</div>
                    <div className="text-xs text-gray-400">{translate("tasks")}</div>
                </div>
                <div className="rounded-md bg-gray-900/40 p-3">
                    <div className="text-2xl font-bold text-white">7</div>
                    <div className="text-xs text-gray-400">{translate("due")}</div>
                </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
            <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500">
                {translate("primaryCta")}
            </button>
            <button className="rounded-md border border-gray-600 px-3 py-2 text-sm font-medium text-gray-100 hover:bg-gray-700">
                {translate("secondaryCta")}
            </button>
            </div>
        </div>
    );
}

