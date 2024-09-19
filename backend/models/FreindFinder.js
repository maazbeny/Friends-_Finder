import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    userImage: {
        type: String,
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }],

});

const User = mongoose.model('User', UserSchema);

const PostSchema = new mongoose.Schema({
    image: String,
    des: String,
    video: String,
    friend: { type: String, default: "" },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

});

const Post = mongoose.model('Post', PostSchema);

export { User, Post };
