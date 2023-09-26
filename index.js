const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Mock user data
const users = {
  '1': {
    id: '1',
    name: 'John Doe',
    username: 'johndoe',
    bio: 'Frontend Developer',
    followers: 100,
    following: 50,
    posts: 150,
  },
  '2': {
    id: '2',
    name: 'Jane Smith',
    username: 'janesmith',
    bio: 'Backend Developer',
    followers: 200,
    following: 75,
    posts: 220,
  },
};

// Middleware to check if a user exists
function checkUserExists(req, res, next) {
  const { userId } = req.params;
  if (!users[userId]) {
    return res.status(404).json({ error: 'User not found' });
  }
  next();
}

// Get user profile
app.get('/api/users/:userId/profile', checkUserExists, (req, res) => {
  const { userId } = req.params;
  const userProfile = {
    name: users[userId].name,
    username: users[userId].username,
    bio: users[userId].bio,
  };
  res.json(userProfile);
});

// Get social media metrics
app.get('/api/users/:userId/metrics', checkUserExists, (req, res) => {
  const { userId } = req.params;
  const userMetrics = {
    followers: users[userId].followers,
    following: users[userId].following,
    posts: users[userId].posts,
  };
  res.json(userMetrics);
});

// Follow user
app.post('/api/users/:userId/follow', checkUserExists, (req, res) => {
  const { userId } = req.params;
  // In a real application, you would implement the logic to follow the user here.
  res.json({ message: `You are now following user ${userId}` });
});

// Unfollow user
app.post('/api/users/:userId/unfollow', checkUserExists, (req, res) => {
  const { userId } = req.params;
  // In a real application, you would implement the logic to unfollow the user here.
  res.json({ message: `You have unfollowed user ${userId}` });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
