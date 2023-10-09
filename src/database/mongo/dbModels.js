"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructorModel = exports.TAModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const taSchema = new mongoose_1.default.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    phoneNumber: String,
    coursesAssigned: [String],
    startDate: Date,
    endDate: Date,
});
const instructorSchema = new mongoose_1.default.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    phoneNumber: String,
    coursesTaught: [String],
    startDate: Date,
    endDate: Date,
});
// Create and export models based on the schemas
exports.TAModel = mongoose_1.default.model('TA', taSchema);
exports.InstructorModel = mongoose_1.default.model('Instructor', instructorSchema);
