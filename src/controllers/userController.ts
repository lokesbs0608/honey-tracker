import { Request, Response } from 'express';
import User from '../models/User';
import transporter from '../config/nodemailer';
import bcrypt from 'bcrypt';
import crypto from 'crypto';


// Create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, role, department, position, dateOfBirth, salary } = req.body;

        const defaultPassword = crypto.randomBytes(8).toString('hex');
        const hashedPassword = await bcrypt.hash(defaultPassword, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role,
            department,
            position,
            dateOfBirth,
            salary,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await user.save();

        const mailOptions = {
            from: 'Honeycomb@gmail.com',
            to: email,
            subject: 'Welcome to Honey Tracker',
            text: `Your account has been created. Your username is ${email} and your password is ${defaultPassword}. Please log in using this link: http://localhost:3000/login`
        };

        transporter.sendMail(mailOptions, (error: Error | null, info: any) => {
            if (error) {
                return res.status(500).json({ message: 'Error sending email' });
            }
            return res.status(201).json({ message: 'User created and email sent', user });
        });

    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Unknown error' });
    }
};



// Edit an existing user
export const editUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        const user = await User.findByIdAndUpdate(userId, updateData, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User updated', user });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Unknown error' });
    }
};

// Get user(s) based on filter
export const getUsers = async (req: Request, res: Response) => {
    try {
        const filters = req.query;

        const users = await User.find(filters);

        return res.status(200).json({ users });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Unknown error' });
    }
};

// Password reset - Send OTP
export const sendPasswordResetOTP = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const otp = crypto.randomBytes(3).toString('hex');
        const otpExpiry = Date.now() + 2 * 60 * 1000;

        user.set('otp', otp);
        user.set('otpExpiry', otpExpiry);
        await user.save();

        const mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is ${otp}. It is valid for 2 minutes.`
        };

        transporter.sendMail(mailOptions, (error: Error | null, info: any) => {
            if (error) {
                return res.status(500).json({ message: 'Error sending OTP email' });
            }
            return res.status(200).json({ message: 'OTP sent', otp });
        });

    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Unknown error' });
    }
};

// Reset Password
export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { email, otp, newPassword } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.otp !== otp || user.otpExpiry!.getTime() < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.set('password', hashedPassword);
        user.set('otp', undefined);
        user.set('otpExpiry', undefined);
        await user.save();

        return res.status(200).json({ message: 'Password reset successful' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Unknown error' });
    }
};
