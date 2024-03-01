import mongoose from 'mongoose'

const connectToMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to database', error.message);
    }
}

export default connectToMongoDb