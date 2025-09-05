import React from 'react';

export default function LanguageSelector({ lang, setLang }) {
    return (
        <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="rounded-md border border-gray-700 bg-gray-800 px-2 py-1 text-xs text-gray-200 focus:outline-none"
            aria-label="Language"
            title="Language"
        >
            <option value="en">EN</option>
            <option value="tl">TL</option>
            <option value="es">ES</option>
        </select>
    );
}
