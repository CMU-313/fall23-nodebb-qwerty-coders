import mongoose, { Document, Model, Schema } from 'mongoose';

// Define schema for TA
interface TAAttributes {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    coursesAssigned: string[]; // Assuming an array of course IDs
    startDate: Date;
    endDate?: Date;
}

export interface TAModel extends Document, TAAttributes {}

const taSchema: Schema<TAModel> = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    phoneNumber: String,
    coursesAssigned: [String],
    startDate: Date,
    endDate: Date,
});

// Define schema for Instructor
interface InstructorAttributes {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    coursesTaught: string[]; // Assuming an array of course IDs
    startDate: Date;
    endDate?: Date;
}

export interface InstructorModel extends Document, InstructorAttributes {}

const instructorSchema: Schema<InstructorModel> = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    phoneNumber: String,
    coursesTaught: [String],
    startDate: Date,
    endDate: Date,
});

// Create and export models based on the schemas
export const TAModel: Model<TAModel> = mongoose.model<TAModel>('TA', taSchema);
export const InstructorModel: Model<InstructorModel> = mongoose.model<InstructorModel>('Instructor', instructorSchema);
