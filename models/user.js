import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is required'],
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
    },
    image: {
        type: String,
    }
});

//we need this because next backend works as serverless functions and it always creates new DB connections
const User = models.User || model("User", UserSchema);

export default User;