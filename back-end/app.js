const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const cors = require('cors');


app.use(cors()); 
const uri = 'mongodb+srv://user:user@cluster0.cyzu5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/api/courses', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('vues');  // Name of your database
        const collection = database.collection('courses');  // Name of your collection

        const courses = await collection.find({}).toArray();  // Fetch all courses

        if (courses.length > 0) {
            res.json(courses);  // Send the courses to the frontend as a JSON response
        } else {
            res.status(404).send('No courses found');
        }
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Error retrieving courses');
    } finally {
        await client.close();  // Close the database connection after processing
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

