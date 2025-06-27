import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function PrivacyPolicy() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto py-10 px-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 font-medium"
        >
          &larr; Back
        </button>
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Privacy Policy</h1>
        <p className="mb-2 text-gray-700 font-medium">Effective Date: 28/06/2025</p>
        <p className="mb-6 text-gray-700">Your privacy is important to us. This policy explains how we collect and use your data.</p>
        <ol className="list-decimal pl-6 space-y-4 text-gray-800">
          <li>
            <span className="font-semibold">Information We Collect</span>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Personal Information: name, email, contact number, address, and account credentials.</li>
              <li>Usage Data: interactions with the platform, device type, and IP address.</li>
              <li>Agricultural Data: crop details, quantity, location, and preferences.</li>
            </ul>
          </li>
          <li>
            <span className="font-semibold">How We Use Your Information</span>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Provide the platform's features and recommendations.</li>
              <li>Maintain and improve the system.</li>
              <li>Communicate important notices or support information.</li>
            </ul>
          </li>
          <li>
            <span className="font-semibold">Data Sharing</span>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>We do not sell or rent your data.</li>
              <li>We may share data with our university supervisors or service providers who help operate the platform under strict confidentiality.</li>
              <li>We may disclose information if required by law.</li>
            </ul>
          </li>
          <li>
            <span className="font-semibold">Data Security</span>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Your information is stored securely.</li>
              <li>While we take reasonable measures to protect your data, no system is completely secure.</li>
              <li>Use the platform at your own risk.</li>
            </ul>
          </li>
          <li>
            <span className="font-semibold">Your Rights</span>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>You can request to access, correct, or delete your data by contacting us.</li>
              <li>If you wish to delete your account, please let us know.</li>
            </ul>
          </li>
          <li>
            <span className="font-semibold">Changes to This Policy</span>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>We may update this policy. If significant changes occur, we will notify you on the platform or by email.</li>
            </ul>
          </li>
          <li>
            <span className="font-semibold">Contact</span>
            <div className="pl-6 mt-2">
              If you have questions about this policy or your data, please contact:<br />
              <a href="mailto:m.ahmad.ahmad@outlook.com" className="text-green-700 underline">m.ahmad.ahmad@outlook.com</a>
            </div>
          </li>
        </ol>
      </div>
    </>
  );
}

export default PrivacyPolicy; 