// backend/routes/user.js
import { Router } from 'express';
const router = Router();
import zod from "zod";
import {User, Account} from '../db.js';
import jwt  from "jsonwebtoken";
import JWT_SECRET from "../config.js";
import authMiddleware from '../middleware.js';

const signupBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})

router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.floor(Math.random() * 10000)
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token,
        
    })
})

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
})

const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
});

router.put("/update", authMiddleware, async (req, res) => {
    const { data, error } = updateBody.safeParse(req.body);
    
    if (error) {
        return res.status(400).json({ message: "Invalid request body", error: error.errors });
    }

    try {
        const updatedUser = await User.updateOne({ _id: req.userId }, data);
        
        if (updatedUser.nModified === 0) {
            return res.status(404).json({ message: "User not found or no changes applied" });
        }

        return res.json({ message: "Updated successfully" });
    } catch (err) {
        console.error("Error updating user:", err);
        return res.status(500).json({ message: "Error updating user information" });
    }
});


router.get("/bulk", async (req,res) =>{
    const filter = req.query.filter || " "
    const users = await User.find({
    $or: [{
        firstName: { 
            $regex: filter  
        }
    },
    {
        lastName: {  
            $regex: filter,    
        }
    }]
})
    res.json({
        user : users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })

} )


export default router;