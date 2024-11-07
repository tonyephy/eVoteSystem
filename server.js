const express = require('express');     
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/elections', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

// Define User schema
const userSchema = new mongoose.Schema({
    id: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Define schemas for each position
const candidateSchemas = {
    president: new mongoose.Schema({ name: { type: String, required: true }, votes: { type: Number, default: 0 } }),
    governor: new mongoose.Schema({ name: { type: String, required: true }, votes: { type: Number, default: 0 } }),
    senator: new mongoose.Schema({ name: { type: String, required: true }, votes: { type: Number, default: 0 } }),
    mp: new mongoose.Schema({ name: { type: String, required: true }, votes: { type: Number, default: 0 } })
};

const Candidate = {
    president: mongoose.model('President', candidateSchemas.president),
    governor: mongoose.model('Governor', candidateSchemas.governor),
    senator: mongoose.model('Senator', candidateSchemas.senator),
    mp: mongoose.model('MP', candidateSchemas.mp)
};

// Route to handle user signup
app.post('/signup', async (req, res) => {
    const { id, username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ id, username, email, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// Route to handle user login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Failed to log in' });
    }
});

// Route to handle voting
app.post('/vote', async (req, res) => {
    const { candidate } = req.body;

    console.log('Incoming vote request:', req.body);

    if (!candidate) {
        return res.status(400).json({ error: 'Candidate is required' });
    }

    try {
        let positionFound = false;

        for (let position in Candidate) {
            const CandidateModel = Candidate[position];
            const updateResult = await CandidateModel.findOneAndUpdate(
                { name: candidate },
                { $inc: { votes: 1 } },
                { new: true }
            );

            if (updateResult) {
                positionFound = true;
                return res.status(200).json({ message: 'Vote recorded successfully for ' + candidate + ' in ' + position });
            }
        }

        if (!positionFound) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
    } catch (error) {
        console.error('Error recording vote:', error);
        res.status(500).json({ error: 'Failed to record vote' });
    }
});

// Route to get results for a specific position
app.get('/results/:position', async (req, res) => {
    const { position } = req.params;
    
    if (!Candidate[position]) {
        return res.status(404).json({ error: 'Position not found' });
    }

    try {
        const candidates = await Candidate[position].find();
        const results = candidates.map(candidate => ({
            name: candidate.name,
            votes: candidate.votes
        }));

        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching results for position:', error);
        res.status(500).json({ error: 'Failed to fetch results' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
