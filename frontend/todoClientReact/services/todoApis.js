export {GET_TODOS_URL} from './config';
import { api } from './api';

const getTodos = async () => {
    const response = await api.get('/todo/todos');
   // const data = await response.json();
    console.log("getTodos ", response);
    if (response.status >= 400) {
      //  throw new Error(data.errors);
    }
    return response;
};

const addTodo = async (params) => {

    
    try{
        var apiResult =await  api.post('/todo/add', params); 
      
        
    }
   catch(er){
       console.log("eror adding" , er)
   }
    
    return apiResult;
}


export { getTodos, addTodo};