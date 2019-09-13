import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './interfaces/user.interface';
import { TodoSchema } from 'src/todo/todo.schema';
import { Todo } from 'src/todo/intrfaces/todo.interface';

export const UserSchema = new mongoose.Schema({
    id: Number,
    name: String,    
    email: {
      type: String,
      unique: true,
      required: true
  },
   password: {
      type: String,
      required: true
  },
  image: { 
      data: Buffer, contentType: String 
    },
  todos : [TodoSchema]
});

  var TodosModel = mongoose.model('TodosModel', TodoSchema);
  
  UserSchema.pre<User>('save', function(next) {

    let user = this;

    if(!user.isModified('password')) return next();

     bcrypt.genSalt(10, (err, salt) => {

        if(err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {

            if(err) return next(err);
            user.password = hash;
            next();

        });

    });

}); 

