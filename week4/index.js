const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

const PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: Number,
    gender: String,
    salary: Number,
    city: String,
});

const Person = mongoose.model('modelname', PersonSchema, 'personCollection');

async function insertOne() {
    const person = new Person({
        name: 'NHQ',
        age: 32,
        gender: 'Male',
        salary: 1234,
        city: 'London',
    });
    const savedPerson = await person.save();
    console.log('One document inserted');
    console.log(savedPerson);
}

// Function to insert many documents
async function insertMany() {
    const manyPersons = [
        { name: 'Aakriti', age: 20, gender: 'Female', salary: 50000 },
        { name: 'Anup', age: 22, gender: 'male', salary: 1000000 },
        { name: 'Grish', age: 23, gender: 'male', salary: 80000 },
        { name: 'ankit', age: 25, gender: 'Male', salary: 300000 },
    ];
    const result = await Person.insertMany(manyPersons);
    console.log('Many documents inserted');
    console.log(result);
}

async function findAll() {
    const docs = await Person.find({})
        .sort({ salary: 1 })
        .select('name salary age')
        .limit(100);
    console.log('Showing multiple documents');
    docs.forEach((doc) => {
        console.log(doc.age, doc.name, doc.salary);
    });
}

async function main() {
    try {
        if (!MONGO_URI) {
            throw new Error('Set the MONGO_URI environment variable before running this script.');
        }
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');
        await insertOne();
        await insertMany();
        await findAll();
    } catch (err) {
        console.error('Error:', err);
        process.exitCode = 1;
    } finally {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close();
            console.log('Connection closed');
        }
    }
}


main();
