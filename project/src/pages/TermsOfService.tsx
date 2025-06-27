import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function TermsOfService() {
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
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Terms of Service</h1>
        <p className="mb-2 text-gray-700 font-medium">Effective Date: 28/06/2025</p>
        <p className="mb-6 text-gray-700">Welcome to Farm Profit Pro. By creating an account and using this platform, you agree to these Terms of Service.</p>
        <ol className="list-decimal pl-6 space-y-4 text-gray-800">
          <li>
            <span className="font-semibold">Use of the Platform</span>
            <ol className="list-decimal pl-6 mt-2 space-y-1">
              <li>Farm Profit Pro is provided as a free, educational prototype.</li>
              <li>You must register an account to access the features.</li>
              <li>You agree to use the platform only for lawful purposes related to agricultural planning.</li>
            </ol>
          </li>
          <li>
            <span className="font-semibold">User Responsibilities</span>
            <ol className="list-decimal pl-6 mt-2 space-y-1">
              <li>You are responsible for keeping your login credentials secure.</li>
              <li>You agree not to misuse the platform (for example, by trying to disrupt its operation or access data you are not authorized to see).</li>
            </ol>
          </li>
          <li>
            <span className="font-semibold">Data and Recommendations</span>
            <ol className="list-decimal pl-6 mt-2 space-y-1">
              <li>All recommendations (including price predictions, weather data, and historical data) are provided for informational purposes only.</li>
              <li>We do not guarantee accuracy, completeness, or financial outcomes.</li>
              <li>You are solely responsible for decisions made based on the information provided.</li>
            </ol>
          </li>
          <li>
            <span className="font-semibold">Intellectual Property</span>
            <ol className="list-decimal pl-6 mt-2 space-y-1">
              <li>The platform's content, code, and design belong to the Farm Profit Pro development team.</li>
              <li>You may not copy, modify, or distribute any part of the platform without permission.</li>
            </ol>
          </li>
          <li>
            <span className="font-semibold">Termination</span>
            <ol className="list-decimal pl-6 mt-2 space-y-1">
              <li>We may suspend or terminate your access if you violate these Terms or use the platform inappropriately.</li>
              <li>You may delete your account at any time by contacting support.</li>
            </ol>
          </li>
          <li>
            <span className="font-semibold">Limitation of Liability</span>
            <ol className="list-decimal pl-6 mt-2 space-y-1">
              <li>Farm Profit Pro is provided "as is" without warranties.</li>
              <li>We are not liable for any loss or damage arising from your use of the platform.</li>
            </ol>
          </li>
          <li>
            <span className="font-semibold">Contact</span>
            <div className="pl-6 mt-2">
              For questions, please contact:<br />
              <a href="mailto:m.ahmad.ahmad@outlook.com" className="text-green-700 underline">m.ahmad.ahmad@outlook.com</a>
            </div>
          </li>
        </ol>
      </div>
    </>
  );
}

export default TermsOfService; 