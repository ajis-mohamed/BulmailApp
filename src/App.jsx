import { createContext, useState } from "react"
import Navbar from "./Components/Navbar"
import SendBulkEmail from "./Components/SendBulkEmail"
import Sidebar from "./Components/Sidebar";
import History from "./Components/History";
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // 1. Fixed import

export const context = createContext()

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isMenu, setIsMenu] = useState(false);

  const [emailList, setEmailList] = useState([]);
  const [message, setMessage] = useState("");

  return (
    <BrowserRouter>
      {/* 2. Wrap your Context Provider at the very top level inside BrowserRouter */}
      <context.Provider value={{ darkMode, setDarkMode, isMenu, setIsMenu, emailList, setEmailList, message, setMessage }}>
        <div className={`flex min-h-screen relative ${darkMode ? "bg-[#111b2d]" : "bg-slate-100"}`}>

          {/* Sidebar: Always shown on desktop (md:block), conditional drawer on mobile */}
          <div className={`${isMenu ? "block" : "hidden md:block"} absolute md:relative z-50 min-h-screen`}>
            <Sidebar />
          </div>

          {/* Full-width / Flex Content Area */}
          <div className="flex-1 flex flex-col min-w-0">
            <Navbar />
            <main className="flex-1">
              {/* 3. Routes and Route components live neatly inside your main content area */}
              <Routes>
                <Route path='/sendmail' element={<SendBulkEmail />} />
                <Route path='/history' element={<History />} />
                <Route path='/' element={<SendBulkEmail />} />
              </Routes>
            </main>
          </div>

        </div>
      </context.Provider>
    </BrowserRouter>
  )
}

export default App;