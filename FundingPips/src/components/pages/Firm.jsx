import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const Contact = () => {
  // 1. Use useState to store the form inputs in a single object
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    traderId: '',       // Relevant to a trading/funding app
    inquiryType: 'General Support',
    message: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Attempt to save the data to the 'Firm' collection
      const docRef = await addDoc(collection(db, "Firm"), formData);

      console.log("Form Data Submitted:", formData);
      console.log("Document successfully written with ID:", docRef.id);
      alert("Message sent! Your contact request has been submitted.");
      

      setFormData({
        fullName: '',
        email: '',
        traderId: '',
        inquiryType: 'General Support',
        message: ''
      });

    } catch (error) {
      console.error("Error adding document: ", error);
      alert("There was an error submitting your request. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">Contact Support</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Field 1: Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Field 2: Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Field 3: Trader ID (Project Relevant) */}
          <div>
            <label className="block text-sm font-medium mb-1">Trader / Account ID</label>
            <input
              type="text"
              name="traderId"
              value={formData.traderId}
              onChange={handleChange}
              placeholder="e.g. TRD-88421"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Field 4: Inquiry Type (Dropdown) */}
          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <select
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
            >
              <option value="General Support">General Support</option>
              <option value="Billing & Payouts">Billing & Payouts</option>
              <option value="Technical Issue">Technical Issue</option>
              <option value="Partnership">Partnership</option>
            </select>
          </div>

          {/* Field 5: Message */}
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="How can we help you today?"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Submit Request
          </button>

        </form>
      </div>
    </div>
  );
};

export default Contact;