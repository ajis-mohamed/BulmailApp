import React, { useContext, useState } from "react";
import { context } from "../App";
import { useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
    const { setIsMenu, darkMode } = useContext(context);
    const location = useLocation()
    const loc = location.pathname
    // Values could be: 'send', 'history'
    const [activeTab, setActiveTab] = useState(loc === '/sendmail' ? 'send' : 'history');

    const navigate = useNavigate()

    return (
        <>
            {/* Backdrop: Only visible on mobile/small screens when menu is open */}
            <div
                onClick={() => setIsMenu(false)}
                className="fixed inset-0 bg-black/50 z-40 backdrop-blur-xs md:hidden"
            />

            {/* Responsive Sidebar: Floating drawer on mobile, static flex item on desktop */}
            <aside
                className={`fixed tp-0 left-0 z-50 h-full w-[240px] px-3 py-4 shadow-2xl transition-colors duration-300 md:static md:z-auto md:shadow-none shrink-0 border-r ${darkMode
                    ? "bg-[#0d1729] border-[#1d293b] text-white"
                    : "bg-white border-slate-200 text-slate-800"
                    }`}
            >
                {/* Logo */}
                <div className="flex items-center justify-between px-1 mb-6">
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center">
                            <span className="text-white text-xs">➤</span>
                        </div>
                        <span className={`text-sm font-bold tracking-wide ${darkMode ? "text-white" : "text-slate-900"}`}>
                            BulkMail
                        </span>
                    </div>

                    {/* Close Button: Hidden on desktop since it's a permanent flex sidebar there */}
                    <button
                        onClick={() => setIsMenu(false)}
                        className={`text-lg cursor-pointer px-1 md:hidden ${darkMode ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-800"
                            }`}
                        aria-label="Close Menu"
                    >
                        ×
                    </button>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                    {/* Active Link (Send Mail) */}
                    <div
                        className={`h-10 px-3 rounded-lg flex items-center gap-3 font-medium cursor-pointer
                            ${activeTab === 'send'
                                ? darkMode
                                    ? "bg-[#18336b] text-blue-400"
                                    : "bg-blue-50 text-blue-600"
                                : "text-gray-400 hover:bg-gray-800"
                            }`
                        }
                        onClick={() => {
                            setActiveTab('send')
                            navigate('sendmail')
                        }}
                    >
                        <span className="text-sm">▷</span>
                        <span className="text-xs font-semibold">Send Mail</span>
                    </div>

                    {/* History Link */}
                    <div
                        className={`h-10 px-3 rounded-lg flex items-center gap-3 transition-colors cursor-pointer 
                            ${activeTab === 'history'
                                ? darkMode
                                    ? "bg-[#18336b] text-blue-400"
                                    : "bg-blue-50 text-blue-600"
                                : "text-gray-400 hover:bg-gray-800"
                            }`}
                        onClick={() => {
                            setActiveTab('history')
                            navigate('history')
                        }}
                    >
                        <span className="text-sm">↻</span>
                        <span className="text-xs font-semibold">History</span>
                    </div>
                </nav>
            </aside>
        </>
    );
}

export default Sidebar;