import mongoose from 'mongoose';

const prodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('Product', prodSchema);