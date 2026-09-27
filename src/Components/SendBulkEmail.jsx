import React, { useContext, useState } from "react";
import axios from "axios";
import { context } from "../App";
import * as XLSX from "xlsx"


export default function SendBulkEmail() {
    const { darkMode, message, setMessage, emailList, setEmailList } = useContext(context);


    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState("");

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSend() {
        setLoading(true);
        setSuccessMessage("");
        setErrorMessage("");
        try {
            const response = await axios.post("https://bulkmail-backend-gkpn.onrender.com/sendmail", { message: message, emailList: emailList });
            console.log(response.data);
            setSuccessMessage("Campaign sent successfully! 🎉");
        } catch (error) {
            console.log("Something went wrong", error);
            setErrorMessage("Failed to send campaign. Please try again later.");
        } finally {
            setLoading(false);
            setMessage("");
        }
    }

    // Common file reading logic
    function processFile(file) {
        if (!file) return;

        setFileName(file.name);
        setSuccessMessage("");
        setErrorMessage("");
        const reader = new FileReader();

        reader.onload = (event) => {
            const data = event.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheets = workbook.Sheets[sheetName];
            const rawList = XLSX.utils.sheet_to_json(sheets, { header: "A" });
            const totalEmail = rawList.map(item => item.A);
            setEmailList(totalEmail);
        };

        reader.readAsBinaryString(file);
    }

    function handleFile(event) {
        const file = event.target.files[0];
        processFile(file);
    }

    // Handler for Drag & Drop
    function handleDrop(event) {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        processFile(file);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    return (
        <div
            className={`min-h-[calc(100vh-4rem)] p-4 sm:p-6 transition-colors duration-300 ${darkMode ? "bg-[#111b2d] text-white" : "bg-slate-100 text-slate-900"
                }`}
        >
            <div className="max-w-xl mx-auto w-full">

                <div className="mb-4">
                    <h1 className="text-base sm:text-lg font-semibold">
                        Send Bulk Email
                    </h1>
                    <p
                        className={`text-xs sm:text-sm mt-0.5 leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-500"
                            }`}
                    >
                        Upload your contact list, write messages, and send them simultaneously with verified deliverability.
                    </p>
                </div>

                <div className={`inline-flex items-center gap-2 px-4 py-2 border rounded-xl text-sm font-medium shadow-sm backdrop-blur-sm mb-4 ${darkMode
                    ? "bg-[#0d1729] border-[#263b59] text-slate-200"
                    : "bg-white border-slate-300 text-slate-700"
                    }`}>
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                    <p className="m-0">
                        Total Email sent : <span className="font-bold text-indigo-400">{emailList.length}</span>
                    </p>
                </div>

                <div className="space-y-4">

                    {/* DROP AREA WITH DRAG & DROP EVENTS ADDED */}
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        className={`p-4 sm:p-6 rounded-xl border border-dashed flex flex-col items-center justify-center text-center transition-colors cursor-pointer ${darkMode
                            ? "bg-[#0d1729] border-[#263b59] hover:border-blue-500/50"
                            : "bg-white border-slate-300 hover:border-blue-400"
                            }`}
                    >
                        <div className="flex items-center justify-between w-full gap-4">
                            <div className="flex items-center gap-3 text-left">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-blue-400 text-lg border shrink-0 ${darkMode ? "bg-[#1c2c45] border-[#304563]" : "bg-blue-50 border-blue-200"
                                        }`}
                                >
                                    ↑
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm font-medium">
                                        Choose a file or drag & drop here
                                    </p>
                                    <p
                                        className={`text-[10px] sm:text-xs ${darkMode ? "text-slate-400" : "text-slate-500"
                                            }`}
                                    >
                                        .CSV, .XLSX, .XLS (Max 10MB / 50k records)
                                    </p>
                                </div>
                            </div>

                            <label
                                className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${darkMode
                                    ? "bg-[#1d2b42] border-[#34445e] text-blue-400 hover:bg-[#253651]"
                                    : "bg-slate-100 border-slate-300 text-blue-600 hover:bg-slate-200"
                                    }`}
                            >
                                <span>▣</span> Browse
                                <input type="file" accept=".csv,.xlsx,.xls" className="hidden" onChange={handleFile} />
                            </label>
                        </div>
                    </div>

                    {fileName && (
                        <p className="text-xs font-medium text-green-500 mt-2 px-1 flex items-center gap-1.5">
                            <span>✓</span> Selected file: <span className="font-semibold">{fileName}</span>
                        </p>
                    )}

                    <div>
                        <label className={`block text-xs sm:text-sm font-medium mb-1 ${darkMode ? "text-slate-300" : "text-slate-700"
                            }`}>
                            Email Message / Template
                        </label>
                        <textarea
                            rows={3}
                            placeholder="Write your message here... Use tags like {{First Name}} for personalization."
                            className={`w-full p-3 rounded-lg border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none ${darkMode
                                ? "bg-[#0d1729] border-[#263b59] text-white placeholder-slate-500"
                                : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
                                }`}
                            onChange={(evt) => setMessage(evt.target.value)}
                            value={message}
                            disabled={loading}
                        ></textarea>
                    </div>

                    {successMessage && (
                        <div className={`p-3 rounded-lg text-xs sm:text-sm font-medium border flex items-center gap-2 ${darkMode
                            ? "bg-emerald-950/50 border-emerald-800 text-emerald-400"
                            : "bg-emerald-50 border-emerald-200 text-emerald-700"
                            }`}>
                            <span>✓</span> {successMessage}
                        </div>
                    )}

                    {errorMessage && (
                        <div className={`p-3 rounded-lg text-xs sm:text-sm font-medium border flex items-center gap-2 ${darkMode
                            ? "bg-rose-950/50 border-rose-800 text-rose-400"
                            : "bg-rose-50 border-rose-200 text-rose-700"
                            }`}>
                            <span>✕</span> {errorMessage}
                        </div>
                    )}

                    <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                            type="button"
                            disabled={loading || !message.trim()}
                            className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20 flex items-center gap-2 ${loading ? "opacity-75 cursor-not-allowed" : ""
                                }`}
                            onClick={handleSend}
                        >
                            {loading && (
                                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            )}
                            {loading ? "Sending Campaign..." : "Send Bulk Campaign 🚀"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}