import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {ProjectApi} from './service/ProjectApi'

export const projectApi = new ProjectApi('http://localhost:8000')

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
