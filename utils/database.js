import mongoose from "mongoose"

let isConnected = false;

export const connectDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log('DB is already connected')
        return;
    }

    try {
        const uri = process.env.MONGO_URI

        await mongoose.connect(uri, {
            dbName: 'prompt',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log('DB is successfully connected')
    } catch (err) {
        console.log(err);
        isConnected = false;
    }
}