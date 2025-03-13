import axios from "axios";
import { endpoint } from "../../utils/endpoint";

const RegisterService = async ({email, password}) => {
    try {
        console.log(email, password)
   const result = await axios.post(`${endpoint}/create`, {
            email,
            password
        });

        return result.data.data;
        
    } catch (error) {
        console.log(error)
    }
}

export default RegisterService;