import React, { useState } from 'react'

export const useForms=(objeto = {})=> {

    const [form, setForm] = useState(objeto);

    const actualizado = ({target}) =>{
        const{name, value} = target;

        setForm({
            ...form,
            [name]:value
            
        })

    }
  return {

    form,
    actualizado
  }


    
 
}
