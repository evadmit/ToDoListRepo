import * as Routes from './config';
import { api } from './api';

export const getTodos = () => {
    try {
        var response = api.get(Routes.GET_TODOS_URL);
           
   // const data = await response.json();
    if (response.status >= 400) {
      //  throw new Error(data.errors);
    }
    return response;
    } catch (error) {
        console.log("getTodos error ", error);
    }
 
};

export const addTodo =  (params) => {
  
    try{
        var apiResult =  api.post(Routes.ADD_TODO_URL, params);  
    }
   catch(er){
       console.log("eror adding" , er)
   }
    
    return apiResult;
}

