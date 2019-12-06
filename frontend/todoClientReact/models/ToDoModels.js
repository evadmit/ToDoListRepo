export  class NewToDoModel {
    title;
    description;
    image;
    coordinates;
    isCompleted;
    isDisplayable;
    constructor() {
       this.image = null;
       this.isCompleted = false;
       this.isDisplayable = true;
    }
  }
  
export  class NewToDoResponseModel{
   _id;
   title;
   description;
   coordinates;
   image;
}

export class Coordinates{
   constructor (_longitude, _latitude){
       this.latitude=_latitude;
       this.longitude=_longitude;
   } 
   longitude;
   latitude;
   
   todo_id;
  
}

export class ResponseGetAllTodosModel{
   todoList;
}

export class ResponseUpdateStatusTodoModel{
   message;
   todo;
}


export class ResponseTodoGetAllTodosModelItem{
   _id;
   title;
   description;
   isCompleted;
   coordinates ;
   image;
}



export class ResponseTodoEditTodoModelItem{
   _id;
   title;
   description;
   isCompleted;
   coordinates;
   image;
}

