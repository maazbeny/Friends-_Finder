import { User, Post } from "../models/FreindFinder.js";
import jwt from "jsonwebtoken";
import { useParams } from 'react-router-dom';


class FreindFinderController {

    static Signup = async (req, res) => {
        try {
            console.log("Request Body:", req.body);
            const checkUser = await User.findOne({ email: req.body.email });
            const checkUser1 = await User.findOne({ username: req.body.username });
            if (checkUser) {
                return res.status(400).json({ success: false, error: "User with this email  already exists" });
            }
            if (checkUser1) {
                return res.status(400).json({ success: false, error: "User with this  username already exists" });
            }

           

            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                turnover: req.body.userImage,
                userImage: req.body.userImage,
                userImage: req.body.userImage,
                userImage: req.body.userImage,
                posts: [],
            });
            await user.save();

            const data = { user: { id: user.id } };
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token, user });
        } catch (error) {
            res.status(500).json({ success: false, error: error });
        }
    };

    static Login = async (req, res) => {
        try {
            const checkUser = await User.findOne({ email: req.body.email });
            if (checkUser) {
                const passcompare = req.body.password === checkUser.password;
                if (passcompare) {
                    const data = { checkUser: { id: checkUser.id } };
                    const token = jwt.sign(data, "secret_ecom");
                    res.json({ success: true, token, id: checkUser.id });
                } else {
                    res.json({ success: false, error: "Invalid credentials" });
                }
            } else {
                res.json({ success: false, error: "User not found" });
            }
        } catch (error) {
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    };
    static DisplayDetails = async (req, res) => {
        try {
            const user = await User.findById(req.params.id).populate('posts')
            console.log('User fetched:', user);
            if (user) {
                res.json({ success: true, user });
            } else {
                res.status(404).json({ success: false, error: "User not found" });
            }
        } catch (error) {
            console.error('Error fetching user:', error); 
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    };

    static Add_Post = async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ success: false, error: "User not found" });
            }

            const { image, des, video, friend } = req.body;
            if (!image && !des && !video) {
                return res.status(400).json({ success: false, error: "At least one field (image, description, or video) is required" });
            }

            const newPost = new Post({
                image,
                des,
                video,
                user: user._id,
                friend,
            });

            const savedPost = await newPost.save();
            user.posts.push(savedPost._id);
            await user.save();

            res.json({ success: true, post: savedPost });
        } catch (error) {
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    };

    static UploadUserImage = async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ success: false, error: 'User not found' });
            }

            user.userImage = req.body.userImage;
            await user.save();

            res.json({ success: true, userImage: user.userImage });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    };

    static Post = async (req, res) => {
        const user = await User.findById(req.params.id)
        if (user) {
            res.json({
                success: true,
                user
            })

        }
        else {
            res.json({
                success: false, error: "user not found"
            })
        }

    }

    static Show_friend = async (req, res) => {
        try {
            console.log(req.body.postId)
            const FindPost = await Post.findById(req.body.postId);
            const Myname = await User.findById(req.body.user._id)
            console.log(FindPost)
            if (!FindPost) {
                return res.status(404).json({ success: false, error: "Post not found" });
            }
            const friend = await User.findOne({ username: req.body.username });
            if (!friend) {
                return res.status(404).json({ success: false, error: "Friend not found" });
            }
            if (!friend.posts.includes(FindPost._id)) {
                friend.posts.push(FindPost._id);
                FindPost.friend = "Shared by " + Myname.username;
                await FindPost.save();

                await friend.save();
                res.json({ success: true, message: "showed by friend" });
            } else {
                res.json({ success: false, error: "Post already added to friend's dashboard" });
            }

        }

        catch (error) {
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    }

    static DeletePost = async (req, res) => {
        try {
            const { postId } = req.body;

            const deleteResult = await Post.findByIdAndDelete(postId);
            if (!deleteResult) {
                return res.status(404).json({ success: false, error: 'Post not found' });
            }
            console.log(`Post with ID ${postId} deleted successfully.`);

          
            const updateResult = await User.updateMany(
                { 'posts': postId },
                { $pull: { 'posts': postId } }
            );

           
            console.log(`Users updated: ${updateResult.nModified} document(s) modified.`);

            res.json({ success: true });
        } catch (error) {
            console.error('Error deleting post:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    };

}




export default FreindFinderController;
