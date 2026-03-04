import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import AppPlus from './AppPlus.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* LP principal */}
        <Route path="/" element={<App />} />

        {/* LP Plus — versão de testes */}
        <Route path="/lp-plus" element={<AppPlus />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
