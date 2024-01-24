import api from "./Api" 

export async function signIn(email, password){

    try{
        const response = await api.post("/sessions", {email: email, password: password})
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
            oldPassword: userData.currentPassword,
            password: userData.newPassword,
            confirmPassword: userData.newPasswordConf
        })

        return response  

    }

    catch(error){
        return error
    }
}

export async function listAppointments(userId){

    try{
        const response = await api.get('/appointments', {
        userId: userId})

        return response
    }

    catch(error){
        return error
    }
} 

export async function appointmentsCancel(appointmentId){

    try{
        const response = await api.delete('/appointments/' + appointmentId)

        return response
    }

    catch(error){
        return error
    }
}


export async function datesList(){

    try{
        const response = await api.get('/alldates');

        return response 
    }

    catch(error){
        return error
    }
}

export async function timetableList(memberId, date){

    try{
        const response = await api.get('/providers/' + memberId + '/available', { date: date });

        return response 
    }

    catch(error){
        return error
    }
}

export async function saveAppointment(userId, memberId, date){

    try{
        const response = await api.post('/appointments', { userId: userId, memberId: memberId, date: date });

        return response
    }

    catch(error){
        return error
    }

}



export async function attAppointment(appointmentId, userId, memberId, date){

    try{
        const response = await api.put('/appointments/' + appointmentId, { userId: userId, memberId: memberId, date: date });

        return response
    }

    catch(error){
        return error
    }

}