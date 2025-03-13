import axios from "axios";
import { endpoint } from "../../utils/endpoint";

const ListLevelService = async (idUser) => {
    try {
    
   const result = await axios.get(`${endpoint}/listLevel/${idUser}`);
        console.log(result);
        
        return result.data.data;
        
    } catch (error) {
        console.log(error)
        return null
    }
}

export default ListLevelService;