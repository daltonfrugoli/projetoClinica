import api from "./Api" 

export async function signIn(email, senha){
    try{
        const response = await api.post("/sessions", {email: email, password: senha})
        api.setHeader("Authorization", "Bearer " + response.data.token )
        return response
    }

    catch(error){
        return error
    }
}

export async function getMembers(){
    try{
        const response = await api.get("/members")
       
        return response 
    }

    catch(error){
        return error
    }
} 