import Users from '../models/user.model';
import Messages from '../models/message.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res) => {
       try {
              const username = await Users.findOne({username: req.body.username});
              if(username) {
                     return res.status(200).json({
                            username: 'Username đã tồn tại!!!',
                            status: false
                     })
              }

              const checkEmail = await Users.findOne({ email: req.body.email }).exec();
              if(checkEmail) {
                     return res.status(200).json({
                            email: 'Email đã tồn tại!!!',
                            status: false
                     })
              }

              const salt = await bcrypt.genSalt(10);
              const hashed = await bcrypt.hash(req.body.password, salt);
              const user = await new Users({
                     username: req.body.username,
                     email: req.body.email,
                     password: hashed
              }).save();
              delete user.password;

              return res.status(200).json({
                     status: true,
                     user
              })
       } catch (error) {
              return res.status(400).json({
                     message: "Đăng kí không thành công!!!"
              })
       }
}

export const singIn = async (req, res) => {
       try {
              // check mail
              const user = await Users.findOne({email: req.body.email});
              if(!user) {
                     return res.status(200).json({
                            email: "Email không hợp lệ",
                            status: false,
                     })
              }

              // check password
              const checkPassword = await bcrypt.compare(
                     req.body.password, 
                     user.password
              )

              if(!checkPassword) {
                     return res.status(200).json({
                            password: "Mật khẩu không hợp lệ",
                            status: false
                     })
              }
              delete user.password;
              // check login
              if(user && checkPassword) {
                     // const token = jwt.sign({_id: user._id}, 'khanhnb');
                     return res.status(200).json({
                            status: true,
                            user
                     })
              }

       } catch (error) {
              return res.status(400).json({
                     message: 'Lỗi đăng nhập'
              })
       }
}

export const uploadAvatar = async (req, res) => {
       try {
              res.status(200).json({
                     message: "Upload image success"
              });
       } catch (error) {
              res.status(400).json({
                     message: 'Upload image error'
              });
       }
}

export const getOneUser = async (req, res) => {
       try {
              const id = req.params.id;
              const user = await Users.findOne({
                     _id: id
              });
              res.status(200).json(user)
       } catch (error) {
              res.status(400).json({
                     message: "User not found"
              });
       }
}

export const updateAvatarUser = async (req, res) => {
       try {
              const id = req.params.id;
              const user = await Users.findOneAndUpdate({
                     _id: id
              }, req.body, {
                     user: true
              });
              console.log(user)
              res.status(200).json(user)
       } catch (error) {
              res.status(400).json({
                     message: "Cập nhật avatar không thành công",
              });
       }
}

export const getAllUser = async (req, res) => {
       try {
              const users = await Users.find({_id: { $ne: req.params.id}}).select([
                     'username', 'email', '_id','avatar'
              ]);
              return res.status(200).json(users);
       } catch (error) {
              return res.status(500).json({message: error.message});
       }
}

export const getAllUserAndMessage = async (req, res) => {
       try {
              const users = await Users.find().populate('User');
              return res.status(200).json(users)
       } catch (error) {
              return res.status(500).json({message: error.message});
       }
}

