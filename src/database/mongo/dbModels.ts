// create a database schema for Intructors and TAs with their name and email as attributes
import mongoose from 'mongoose';

const { Schema } = mongoose;

let Instructor;
if (!mongoose.models.Instructor) {
    const instructorSchema = new Schema({
            name: String,
            email: String,
    });
    Instructor = mongoose.model('Instructor', instructorSchema);
    module.exports.Instructor = Instructor;
}

let TA;
if (!mongoose.models.TA) {
    const taSchema = new Schema({
            name: String,
            email: String,
    });
    TA = mongoose.model('TA', taSchema);
    module.exports.TA = TA;
}
if (!mongoose.models.TA) {
    const taSchema = new Schema({
            name: String,
            email: String,
    });
    TA = mongoose.model('TA', taSchema);
    module.exports.TA = TA;
}

export { Instructor, TA };

// Path: src/database/mongo/index.ts
// create a function to add an instructor to the database
import { Instructor: InstructorModel } from './dbModels';

const addInstructor = async (name: string, email: string) => {
    const instructor = new InstructorModel({ name, email });
    await instructor.save();
};

export { addInstructor };

// Path: src/database/mongo/index.ts
// create a function to add a TA to the database
const { TA } = require('./dbModels');

import { TA, Instructor } from './dbModels';

const addTA = async (name: string, email: string) => {
    const ta = new TA({ name, email });
    await ta.save();
};

// Path: src/database/mongo/index.ts
// create a function to get all instructors from the database
import mongoose from 'mongoose';

const { Schema } = mongoose;

let InstructorModel;
if (!mongoose.models.Instructor) {
    const instructorSchema = new Schema({
        name: String,
        email: String,
    });
    InstructorModel = mongoose.model('Instructor', instructorSchema);
}

let TAModel;
if (!mongoose.models.TA) {
    const taSchema = new Schema({
        name: String,
        email: String,
    });
    TAModel = mongoose.model('TA', taSchema);
}

const getInstructors = async () => {
    const instructors = await InstructorModel.find();
    return instructors;
};

const addTA = async (name: string, email: string) => {
    const ta = new TAModel({ name, email });
    await ta.save();
};

export { InstructorModel as Instructor, TAModel as TA, getInstructors, addTA };

// Path: src/database/mongo/index.ts
// create a function to get all TAs from the database
import { TA } from './dbModels';

const getTAs = async () => {
    const tas = await TA.find();
    return tas;
};

export { getTAs };

// Path: src/database/mongo/index.ts
// create a function to delete an instructor from the database
import { Instructor } from './dbModels';

const deleteInstructor = async (name: string) => {
    await Instructor.deleteOne({ name });
};

export { deleteInstructor };
