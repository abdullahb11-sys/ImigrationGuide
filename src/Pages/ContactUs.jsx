import NavBar from '../components/NavBar';
import Footer from '../components/footer';
import { useState } from 'react';

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the form data to your backend or email service
    setSubmitted(true);
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-[#588157] mb-2 text-center">Contact Us</h1>
          <p className="text-gray-600 mb-8 text-center">We'd love to hear from you! Fill out the form below or reach us directly.</p>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a3b18a]"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a3b18a]"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a3b18a]"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#588157] text-white font-semibold py-3 rounded-lg hover:bg-[#476146] transition-colors duration-300"
                disabled={submitted}
              >
                {submitted ? 'Message Sent!' : 'Send Message'}
              </button>
            </form>
            {/* Contact Info & Map */}
            <div className="flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-[#a3b18a] text-xl">📍</span>
                  <span className="text-gray-700">Lahore, Pakistan</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-[#a3b18a] text-xl">📧</span>
                  <a href="mailto:info@movewise.com" className="text-[#588157] hover:underline">info@movewise.com</a>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-[#a3b18a] text-xl">📞</span>
                  <a href="tel:+923001234567" className="text-[#588157] hover:underline">+92 300 123 4567</a>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-[#a3b18a] text-xl">🕒</span>
                  <span className="text-gray-700">Mon - Fri: 9AM - 6PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 