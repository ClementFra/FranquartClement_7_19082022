import axios from "axios";

let Axios= axios.create({
    baseURL:"http://localhost:8000/api",
    headers:{
        "Content-Type":"application/json"
    },
    withCredentials:true,
})

export default Axios;