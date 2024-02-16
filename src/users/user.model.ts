import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  age: { type: Number, required: true },
  hobbies: { type: [String], required: true },
  uuid:{type:String}
});

export interface UserModel {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
  uuid:string
}
