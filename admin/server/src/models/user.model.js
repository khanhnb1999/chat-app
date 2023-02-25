import mongoose from "mongoose";

const userSchema = mongoose.Schema({
       username: { type: String, required: true, maxLength: 30 },
       email: { type: String, required: true, maxLength: 50 },
       password: { type: String, required: true, maxLength: 500000 },
       avatar: {type: String, default: ''}
});

export default mongoose.model('Users', userSchema);

