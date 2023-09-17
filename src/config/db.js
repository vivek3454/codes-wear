import mongoose from "mongoose";

const connectToDb = async () => {
    try {

        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGOOSE_URI);
            console.log("connected to db");
        }
    } catch (error) {
        console.log(error);
    }
};

export default connectToDb;