const { default: axios } = require("axios")

export const fetchLatest = async()=>{
    const response = await axios.get("/transaction",{withCredentials:true})
    return response
}