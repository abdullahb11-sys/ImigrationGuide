import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';

const Profile = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        dateOfBirth: '',
        gender: '',
        targetCountries: [],
        visaType: '',
        educationLevel: '',
        workExperience: ''
    });
    const [profilePicture, setProfilePicture] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        fetchUserProfile();
    }, [token, navigate]);

    const fetchUserProfile = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`http://localhost:5000/api/auth/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setProfile({
                name: response.data.name || '',
                email: response.data.email || '',
                dateOfBirth: response.data.dateOfBirth ? response.data.dateOfBirth.split('T')[0] : '',
                gender: response.data.gender || '',
                targetCountries: response.data.targetCountries || [],
                visaType: response.data.visaType || '',
                educationLevel: response.data.educationLevel || '',
                workExperience: response.data.workExperience || ''
            });
            
            if (response.data.profilePicture) {
                setPreviewUrl(`http://localhost:5000${response.data.profilePicture}`);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value
        });
    };

    const handleCountryChange = (country) => {
        const updatedCountries = [...profile.targetCountries];
        if (updatedCountries.includes(country)) {
            const index = updatedCountries.indexOf(country);
            updatedCountries.splice(index, 1);
        } else {
            updatedCountries.push(country);
        }
        setProfile({
            ...profile,
            targetCountries: updatedCountries
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicture(file);
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setPreviewUrl(fileReader.result);
            };
            fileReader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Update user profile
            await axios.put(`http://localhost:5000/api/auth/profile`, {
                name: profile.name,
                dateOfBirth: profile.dateOfBirth,
                gender: profile.gender,
                targetCountries: profile.targetCountries,
                visaType: profile.visaType,
                educationLevel: profile.educationLevel,
                workExperience: profile.workExperience
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // If there's a new profile picture, upload it
            if (profilePicture) {
                const formData = new FormData();
                formData.append('profilePicture', profilePicture);

                await axios.post(`http://localhost:5000/api/auth/profile/picture`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                
                setProfilePicture(null);
            }

            await fetchUserProfile();
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#e7ecef] flex items-center justify-center">
                <div className="text-[#588157] text-xl">Loading profile...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#e7ecef]">
            <NavBar />
            <div className="pt-20 px-4 py-8">
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-4xl font-bold text-[#588157]">My Profile</h1>
                        <div className="flex items-center space-x-4">
                            <Link
                                to={`/user/${userData.id}`}
                                className="px-4 py-2 bg-[#588157] text-white rounded-lg hover:bg-[#a3b18a] transition-colors duration-300"
                            >
                                View Public Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-[#e63946] text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Profile Picture Section */}
                        <div className="flex flex-col items-center space-y-4">
                            <div className="relative">
                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#a3b18a] hover:border-[#588157] transition-colors duration-300">
                                    {previewUrl ? (
                                        <img src={previewUrl} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-[#a3b18a] hover:bg-[#588157] transition-colors duration-300 flex items-center justify-center text-white text-3xl font-bold">
                                            {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="profile-picture-input" className="cursor-pointer px-4 py-2 bg-[#a3b18a] text-white rounded-lg hover:bg-[#588157] transition-colors duration-300">
                                    Change Profile Picture
                                </label>
                                <input
                                    id="profile-picture-input"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </div>
                        </div>

                        {/* Basic Information */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleChange}
                                    className="w-full p-3 border-b-2 border-gray-300 focus:ring-2 focus:ring-[#a3b18a] focus:border-[#a3b18a] focus:outline-none transition-colors duration-300 bg-transparent"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value={profile.email}
                                    disabled
                                    className="w-full p-3 border-b-2 border-gray-300 bg-gray-100 text-gray-500"
                                />
                                <small className="text-gray-500">Email cannot be changed</small>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={profile.dateOfBirth}
                                    onChange={handleChange}
                                    className="w-full p-3 border-b-2 border-gray-300 focus:ring-2 focus:ring-[#a3b18a] focus:border-[#a3b18a] focus:outline-none transition-colors duration-300 bg-transparent"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Gender</label>
                                <select
                                    name="gender"
                                    value={profile.gender}
                                    onChange={handleChange}
                                    className="w-full p-3 border-b-2 border-gray-300 focus:ring-2 focus:ring-[#a3b18a] focus:border-[#a3b18a] focus:outline-none transition-colors duration-300 bg-transparent"
                                >
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        {/* Immigration Preferences */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold text-[#588157] border-b-2 border-[#a3b18a] pb-2">
                                Immigration Preferences
                            </h2>

                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-gray-700">Target Countries</label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {['USA', 'Canada', 'Germany', 'Australia', 'Pakistan'].map((country) => (
                                        <div key={country} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                id={`country-${country}`}
                                                checked={profile.targetCountries.includes(country)}
                                                onChange={() => handleCountryChange(country)}
                                                className="h-4 w-4 text-[#a3b18a] focus:ring-[#a3b18a] border-gray-300 rounded"
                                            />
                                            <label htmlFor={`country-${country}`} className="text-sm text-gray-700 cursor-pointer">
                                                {country}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Visa Type</label>
                                    <select
                                        name="visaType"
                                        value={profile.visaType}
                                        onChange={handleChange}
                                        className="w-full p-3 border-b-2 border-gray-300 focus:ring-2 focus:ring-[#a3b18a] focus:border-[#a3b18a] focus:outline-none transition-colors duration-300 bg-transparent"
                                    >
                                        <option value="">Select visa type</option>
                                        <option value="student">Student Visa</option>
                                        <option value="work">Work Visa</option>
                                        <option value="family">Family Visa</option>
                                        <option value="tourist">Tourist Visa</option>
                                        <option value="permanent">Permanent Residence</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Education Level</label>
                                    <select
                                        name="educationLevel"
                                        value={profile.educationLevel}
                                        onChange={handleChange}
                                        className="w-full p-3 border-b-2 border-gray-300 focus:ring-2 focus:ring-[#a3b18a] focus:border-[#a3b18a] focus:outline-none transition-colors duration-300 bg-transparent"
                                    >
                                        <option value="">Select education level</option>
                                        <option value="high_school">High School</option>
                                        <option value="bachelor">Bachelor's Degree</option>
                                        <option value="master">Master's Degree</option>
                                        <option value="phd">PhD</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Work Experience</label>
                                    <select
                                        name="workExperience"
                                        value={profile.workExperience}
                                        onChange={handleChange}
                                        className="w-full p-3 border-b-2 border-gray-300 focus:ring-2 focus:ring-[#a3b18a] focus:border-[#a3b18a] focus:outline-none transition-colors duration-300 bg-transparent"
                                    >
                                        <option value="">Select work experience</option>
                                        <option value="none">No experience</option>
                                        <option value="1-2_years">1-2 years</option>
                                        <option value="3-5_years">3-5 years</option>
                                        <option value="5-10_years">5-10 years</option>
                                        <option value="10+_years">10+ years</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center pt-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-3 bg-[#a3b18a] text-white rounded-lg hover:bg-[#588157] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                            >
                                {isSubmitting ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile; 