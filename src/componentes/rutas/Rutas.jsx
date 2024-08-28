import React from 'react'
import{Routes, Route, BrowserRouter, Link} from "react-router-dom"
import Publico from "../Publico"
import { Privado } from '../Privado'
import Login from "../Login" 
import { Panel } from '../Panel'


export const Rutas = () => {
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
            <Route index element ={<Panel/>}/> 
        </Route>
     </Routes>
    </BrowserRouter>
  )
}
