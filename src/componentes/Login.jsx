import React, { useState } from 'react'
import { useForms } from './ayuda/useForms'
import {login} from './funciones/Funciones'
import { useNavigate } from 'react-router-dom'

export default function Login() {

    const {form, actualizado} = useForms() 

    const navegar = useNavigate()
    const validarDatos = async (e) => {
        e.preventDefault()
        let parametros = form
        const respuesta = await login('usuario/login', parametros)
        const dato = await respuesta.json()
        console.log(dato) 
       

        if(dato.status == 'succes' && dato.validar == 1){

            navegar('/panel')
            console.log('entrando')
        }
        else{

            navegar('/')
            
        }
        
    }

    return (
        <>


            <form className="form" onSubmit={validarDatos}>
                <span className="input-span">
                    <label htmlFor="email" className="label">Email</label>
                    <input type="email" name="email" id="email" onChange={actualizado}/>
                </span>
                <span className="input-span">
                    <label htmlFor="password" className="label">Password</label>
                    <input type="password" name="password" id="password" onChange={actualizado} />
                </span>
                <input className="submit" type="submit" value="Login" />
            </form>

        </>
    )
}
