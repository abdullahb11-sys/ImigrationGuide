# Middleware Documentation

This directory contains all the middleware functions used in the Immigration Guide application.

## Available Middleware

### 1. Authentication Middleware (`auth.js`)
- **Purpose**: Validates JWT tokens and attaches user information to requests
- **Usage**: `import { auth } from '../middleware/auth.js'`
- **Example**: `router.post('/posts', auth, createPost)`

### 2. Upload Middleware (`upload.js`)
- **Purpose**: Handles file uploads with validation and error handling
- **Usage**: `import { uploadSingle, handleUploadError } from '../middleware/upload.js'`

#### Available Upload Configurations:

##### `uploadSingle`
- **Purpose**: Upload a single profile picture
- **Field Name**: `profilePicture`
- **Usage**: `router.post('/profile/picture', auth, uploadSingle, handleUploadError, uploadProfilePicture)`

##### `uploadPostImage`
- **Purpose**: Upload a single image for posts (future use)
- **Field Name**: `postImage`
- **Usage**: `router.post('/posts', auth, uploadPostImage, handleUploadError, createPost)`

##### `uploadMultiple`
- **Purpose**: Upload multiple images (up to 5)
- **Field Name**: `images`
- **Usage**: `router.post('/gallery', auth, uploadMultiple, handleUploadError, uploadGallery)`

##### `uploadAny`
- **Purpose**: Upload any number of files
- **Usage**: `router.post('/files', auth, uploadAny, handleUploadError, uploadFiles)`

#### Error Handling
- **File Size Limit**: 5MB maximum
- **File Type**: Only image files allowed
- **Error Responses**: Proper HTTP status codes and error messages

## How to Use Middleware

### Basic Usage
```javascript
import { auth } from '../middleware/auth.js';
import { uploadSingle, handleUploadError } from '../middleware/upload.js';

// Protected route with authentication
router.get('/profile', auth, getUserProfile);

// Protected route with file upload
router.post('/profile/picture', auth, uploadSingle, handleUploadError, uploadProfilePicture);
```

### Middleware Order
1. **Authentication** (if needed)
2. **Upload middleware** (if file upload)
3. **Error handling** (for upload errors)
4. **Controller function**

### Error Handling
The `handleUploadError` middleware should always be used after upload middleware to catch and handle upload-related errors properly.

## Configuration

### File Storage
- **Destination**: `uploads/` directory
- **Filename**: Unique timestamp-based names
- **Path**: Files are served from `/uploads/` URL

### Security Features
- File type validation (images only)
- File size limits
- Unique filename generation
- Error handling for invalid uploads

## Future Enhancements

1. **Cloud Storage**: Integrate with AWS S3 or similar
2. **Image Processing**: Add image resizing and optimization
3. **Multiple File Types**: Support for documents and other file types
4. **Virus Scanning**: Add file scanning for security 