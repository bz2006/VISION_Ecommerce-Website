import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true

    },
    ordersNo:{
        type:Number,
        default: 0,
    },
    phone: {
        type: Number,
    },
    address: {
        type: String
    },
    role: {
        type: Number,
        default: 0,
    },

},
    { timestamps: true }
);

export default mongoose.model("users", userSchema)