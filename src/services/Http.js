import api from "./Api" 

export async function signIn(email, senha){
    try{
        const response = await api.post("/sessions", {email: email, password: senha})

        return response
    }

    catch(error){
        return error
    }
}