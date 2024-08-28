export const api = 'http://localhost:3000/api/'

export const login = async (URL, parametros) => {
    
    const respuesta =  await fetch(api+URL,{
        method: 'POST',
        body: JSON.stringify(parametros),
        headers: {
            "Content-Type": "application/json"
        }

    })
    return respuesta;
}