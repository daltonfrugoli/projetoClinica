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

//seção para buscar membrios da equipe
export async function getMembers(){
    try{
        const response = await api.get("/members")
       
        return response 
    }

    catch(error){
        return error
    }
} 

//seção para buscar número de consultas 
export async function getQueries(memberId){
    try{
        const response = await api.get('/appointments/' + memberId);

        return response
    }

    catch(error){
        return error
    }
}

export async function updateUser(userData){
    try{
        const response = await api.put('/users', {
            name: userData.name,
            email: userData.email,
            oldPassword: userData.senhaAtual,
            password: userData.senhaNova,
            confirmPassword: userData.senhaNovaConf
        })

        return response  

    }

    catch(error){
        return error
    }
}

