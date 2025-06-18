import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// Get user profile by ID (public)
export const getUserProfileById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password -email');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { name, dateOfBirth, gender, targetCountries, visaType, educationLevel, workExperience } = req.body;
    
    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (dateOfBirth !== undefined) updateFields.dateOfBirth = dateOfBirth;
    if (gender !== undefined) updateFields.gender = gender;
    if (targetCountries !== undefined) updateFields.targetCountries = targetCountries;
    if (visaType !== undefined) updateFields.visaType = visaType;
    if (educationLevel !== undefined) updateFields.educationLevel = educationLevel;
    if (workExperience !== undefined) updateFields.workExperience = workExperience;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateFields,
      { new: true, runValidators: true }
    ).select('-password');

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// Upload profile picture
export const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const profilePicture = `/uploads/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { profilePicture },
      { new: true }
    ).select('-password');

    res.json({ profilePicture: user.profilePicture });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
}; 