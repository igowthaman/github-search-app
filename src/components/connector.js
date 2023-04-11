import axios from "axios";

const  connect = async(method, url)=>{
    try{
        return await axios.request(url,{method:method});
    }
    catch(error){
        return error;
    }
}   

export default connect;