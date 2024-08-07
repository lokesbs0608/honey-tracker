import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'team_lead' | 'team_member';
  department: string;
  position: string;
  dateOfBirth: Date;
  salary: number;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  contact: {
    phone: string;
    alternatePhone: string;
  };
  employmentDetails: {
    startDate: Date;
    endDate: Date | null;
    employmentType: string;
  };
  otp?: string;
  otpExpiry?: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  department: { type: String },
  position: { type: String },
  dateOfBirth: { type: Date },
  salary: { type: Number },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    country: { type: String }
  },
  contact: {
    phone: { type: String },
    alternatePhone: { type: String }
  },
  employmentDetails: {
    startDate: { type: Date },
    endDate: { type: Date, default: null },
    employmentType: { type: String }
  },
  otp: { type: String },
  otpExpiry: { type: Date }
});

export default model<IUser>('User', UserSchema);
