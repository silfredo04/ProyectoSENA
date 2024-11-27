import React from 'react'
import{Routes, Route, BrowserRouter, Link} from "react-router-dom"
import Publico from "../Publico"
import { Privado } from '../Privado'
import Login from "../Login" 
import { Panel } from '../Panel'
import {Dashboard} from '../../pages/Dashboard'


export const Rutas = () => {
  const user = {
    name: "Admin User",
    photo: "https://via.placeholder.com/40",
  };

  const sidebarOptionsAdmin = [
    { label: "Crer usuarios", link: "#", icon: "🏠" },
    { label: "Listar usuarios", link: "#", icon: "👥" },
    { label: "Crear curso", link: "#", icon: "⚙️" },
    { label: "Listar curso", link: "#", icon: "⚙️" },
    { label: "Salir", link: "#", icon: "⚙️" },
  ];

  const sidebarOptionsProfe = [
    { label: "Calificar estudiantes", link: "#", icon: "🏠" },
    { label: "Listar Estudiantes", link: "#", icon: "👥" },
    { label: "Salir", link: "#", icon: "⚙️" },
  ];

  const sidebarOptionsEstu = [
    { label: "Ver calificaciones", link: "#", icon: "⚙️" },
    { label: "Salir", link: "#", icon: "⚙️" },
  ];
  return (
    <BrowserRouter>
     <Routes>
        {/* ruta publica */}
        <Route path="/" element = {<Publico/>}>
            <Route index element ={<Login/>}/> 
            <Route path="login" element ={<Login/>}/>
        </Route>
        {/* ruta privado */}
        <Route path="/panel" element = {<Privado/>}>
            <Route index element ={
              <Panel user={user} sidebarOptions={sidebarOptionsAdmin}>
                <Dashboard/>
             </Panel>
          }/> 
        </Route>
     </Routes>
    </BrowserRouter>
  )
}
