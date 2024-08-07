import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const register = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);

    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    const token = jwt.sign({ userId: user._id, role: user.role }, 'your_jwt_secret');
    res.status(201).send({ user, token });
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send({ error: 'Invalid login credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).send({ error: 'Invalid login credentials' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, 'your_jwt_secret');
    res.send({ user, token });
};
