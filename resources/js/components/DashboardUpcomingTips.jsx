import React from 'react';

export default function DashboardUpcomingTips({ translate }) {
    return (
        <div className="rounded-lg border border-dashed border-gray-700 bg-gray-800 p-6">
            <h2 className="text-white text-xl font-semibold">{translate("rightTitle")}</h2>

            {/* Upcoming */}
            <h3 className="mt-4 text-sm font-semibold text-gray-200">{translate("upcoming")}</h3>
            <ul className="mt-2 space-y-2 text-sm text-gray-300">
                <li className="rounded-md bg-gray-900/40 p-3">• {translate("u1")}</li>
                <li className="rounded-md bg-gray-900/40 p-3">• {translate("u2")}</li>
                <li className="rounded-md bg-gray-900/40 p-3">• {translate("u3")}</li>
            </ul>

            {/* Tips */}
            <h3 className="mt-6 text-sm font-semibold text-gray-200">{translate("tipTitle")}</h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-gray-300 space-y-1">
                <li>{translate("tip1")}</li>
                <li>{translate("tip2")}</li>
                <li>{translate("tip3")}</li>
            </ul>
        </div>
    );
}

