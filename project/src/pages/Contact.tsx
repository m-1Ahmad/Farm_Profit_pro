import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Contact() {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSuccess('Message sent successfully!');
        setForm({ name: '', email: '', message: '' });
      } else {
        setError('Failed to send message. Please try again.');
      }
    } catch {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center py-16 px-4">
        <h1 className="text-4xl font-bold text-green-700 mb-6">Contact Us</h1>
        <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">
          Have a question, suggestion, or need support? Reach out to us and we'll get back to you as soon as possible.
        </p>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Send a Message
        </button>
      </div>
      <Footer />

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button
              onClick={() => { setModalOpen(false); setSuccess(null); setError(null); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-green-700 mb-4">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              {success && <div className="text-green-700 font-medium text-center">{success}</div>}
              {error && <div className="text-red-600 font-medium text-center">{error}</div>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contact; 