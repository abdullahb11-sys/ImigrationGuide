import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Profile fields
  name: {
    type: String,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  profilePicture: {
    type: String,
  },
  // Immigration preferences
  targetCountries: [{
    type: String,
    enum: ['USA', 'Canada', 'Germany', 'Australia', 'Pakistan']
  }],
  visaType: {
    type: String,
    enum: ['student', 'work', 'family', 'tourist', 'permanent'],
  },
  educationLevel: {
    type: String,
    enum: ['high_school', 'bachelor', 'master', 'phd', 'other'],
  },
  workExperience: {
    type: String,
    enum: ['none', '1-2_years', '3-5_years', '5-10_years', '10+_years'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model('User', userSchema);
export default User; 