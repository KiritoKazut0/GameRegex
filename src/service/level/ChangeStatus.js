import axios from "axios";
import { endpoint } from "../../utils/endpoint";

const RegisterService = async ({idUser, idLevel, status, score }) => {
    try {
    
   const result = await axios.put(`${endpoint}/changeStatus`, {
            idUser,
            idLevel,
            status,
            score
        });

        return result.status;
        
    } catch (error) {
        console.log(error)
        return null
    }
}

export default RegisterService;