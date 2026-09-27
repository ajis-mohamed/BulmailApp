import React, { useContext, useEffect, useState } from 'react'
import { context } from '../App';
import axios from 'axios'

function History() {
    const { darkMode, emailList, message } = useContext(context);

    const [historyData, setHistoryData] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("https://bulkmail-backend-gkpn.onrender.com/history");
                setHistoryData(response.data)
            } catch (error) {
                console.log("something Went Wrong : ", error)
            }
        }

        fetchData();
    }, [])
    return (
        <div className="p-6 md:p-8 max-w-6xl mx-auto">
            {/* Title */}
            <h1 className={`text-2xl font-bold mb-6 ${darkMode ? "text-white" : "text-slate-800"}`}>
                Mail History
            </h1>

            {/* Table Container with dynamic theme styles */}
            <div className={`overflow-x-auto rounded-xl shadow-lg border transition-colors ${darkMode ? "bg-[#18263e] border-gray-700/60" : "bg-white border-slate-200"
                }`}>
                <table className="min-w-full text-left border-collapse">

                    {/* Table Header */}
                    <thead className={`${darkMode ? "bg-[#111b2d] text-gray-300 border-b border-gray-700/60" : "bg-slate-50 text-slate-700 border-b border-slate-200"
                        }`}>
                        <tr>
                            <th className="py-4 px-6 font-semibold text-sm">Mail ID</th>
                            <th className="py-4 px-6 font-semibold text-sm">Message</th>
                            <th className="py-4 px-6 font-semibold text-sm">Date</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className={`divide-y ${darkMode ? "divide-gray-700/50 text-gray-200" : "divide-slate-100 text-slate-600"}`}>
                        {historyData && historyData.length > 0 ? (
                            historyData.map((item, index) => {
                                // Handles whether your emailList stores objects or plain string emails
                                const mailId = typeof item === 'object' ? item.email : item;
                                const mailMessage = typeof item === 'object' && item.message ? item.message : (message || "No message provided");
                                const mailDate = typeof item === 'object' && item.date ? item.date : new Date().toLocaleDateString();

                                return (
                                    <tr
                                        key={index}
                                        className={`transition-colors ${darkMode ? "hover:bg-[#1f314f]" : "hover:bg-slate-50"
                                            }`}
                                    >
                                        <td className="py-4 px-6 font-medium">{mailId}</td>
                                        <td className="py-4 px-6 max-w-xs truncate">{mailMessage}</td>
                                        <td className={`py-4 px-6 text-sm ${darkMode ? "text-gray-400" : "text-slate-400"}`}>
                                            {mailDate}
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            /* Fallback UI when history is empty */
                            <tr>
                                <td colSpan="3" className={`py-8 text-center text-sm ${darkMode ? "text-gray-400" : "text-slate-400"}`}>
                                    No mail history found. Send a campaign to see records here!
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default History;