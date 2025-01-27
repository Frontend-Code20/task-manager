import mongoose from 'mongoose'

// Schema for user 
const userSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

// Create a unique index on the 'email' field to prevent duplicate emails in the database
userSchema.index({ email: 1 }, { unique: true })

// Create the User model based on the userSchema
const User = mongoose.model("accounts", userSchema);

// Synchronize the model's indexes with the MongoDB database
User.syncIndexes()
.then(() => console.log("indexed created!"))
.catch((error) => console.log("index not created "+ error));

export default User;
