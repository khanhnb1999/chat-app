import Rooms from '../models/room.model';
import Users from '../models/user.model';

export const addUserRooms = async (req, res) => {
       try {
              const { name, userId, users } = req.body;
              const { _id, username,avatar,email } = await Users.findOne({_id: userId});
              users.push({
                     _id: _id.toString(),
                     username: username,
                     avatar: avatar,
                     email: email
              });
              const room = await new Rooms({
                     name: name,
                     userId: userId,
                     users: users
              }).save();
              return res.status(200).json({
                     status: true,
                     room: room
              });
       } catch (error) {
              return res.status(500).json('Tạo nhóm không thành công!');
       }
}

export const getAllUserGroups = async (req, res) => {
       try {
              const room = await Rooms.find()
              res.status(200).json(room);
       } catch (error) {
              res.status(400).json({
                     message: error
              });
       }
};
