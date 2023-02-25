import Messages from '../models/message.model';

export const addMessage = async (req, res) => {
       try {
              const {from ,to, message,reply } = req.body;
              const msg = await new Messages({
                     message: {
                            text: message,
                            reply: reply
                     },
                     users: [from, to],
                     sender: from
              }).save();
              return res.status(200).json(msg);
       } catch (error) {
              return res.status(400).json("Send message error");
       }
}

export const getMessage = async (req, res) => {
       try {
              const {from, to, rooms} = req.body;
              const messages = await Messages.find({
                     users: {
                            $all: [rooms ? to : from, to]
                     }
              }).sort({updatedAt: 1});
              
              const result = messages.map((msg) => {
                     return {
                            id: msg._id,
                            fromSelf: msg.sender.toString() === from,
                            message: msg.message.text,
                            reply: msg.message.reply ? msg.message.reply : '',
                     }
              });

              return res.status(200).json(result);
       } catch (error) {
              return res.status(400).json("Get message error");
       }
}