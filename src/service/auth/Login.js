import axios from "axios";
import { endpoint } from "../../utils/endpoint";

const AuthenticationService = async ({email, password}) => {
    try {
        console.log(email, password)
   const result = await axios.post(`${endpoint}/login`, {
            email,
            password
        });

        return result.data.data;
        
    } catch (error) {
        console.log(error)
    }
}

export default AuthenticationService;