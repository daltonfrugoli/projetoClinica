import { create } from "apisauce";

const api = create({
    baseURL: "https://project.apus.info",
    headers: {"Content-Type" : "application/json", "Accept" : "application/json" }
})

api.addResponseTransform(response => {
    if ( !response.ok ){
        throw response
    }
})

export default api;