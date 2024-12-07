import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema(
    {
        imageUrl: {
            type: String,
            required: true
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        location:{
            type: String,
            required: true
        },
        imagePath: {
            type: String,
            required: true
        },
        maskPath: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);

const Image = mongoose.model('Image', imageSchema);

export default Image;