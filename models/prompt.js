import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'user_id is required'],
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is required'],
    }
});

//we need this because next backend works as serverless functions and it always creates new DB connections
const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;