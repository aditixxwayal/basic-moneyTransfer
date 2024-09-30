

// db.js
import mongoose from 'mongoose';
mongoose.connect('mongodb+srv://wayaladiti27:DBW4p2kj5mtP2103@cluster0.yulpd7o.mongodb.net/paytm-main')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));


const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
});

const accountsSchema = new mongoose.Schema({
    userId : { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true 
    }, 
    accountNumber: Number, 
    balance: {  
        type: Number,  
        default: 0,
        required: true}
});

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountsSchema);
export  {User, Account};

