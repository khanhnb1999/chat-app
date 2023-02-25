import mongoose from 'mongoose';

const roomSchema = mongoose.Schema({ 
       name: {type: String, required: true},
       userId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
              required: true
       },
       users: Array
})


export default mongoose.model('Rooms', roomSchema);