import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    traderId: "", 
    inquiryType: "General Support",
    message: "",
  });

  // 1. Add a processing state
  const [isProcessing, setIsProcessing] = useState(false);

  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 2. Start processing
    setIsProcessing(true);

    try {
      const payload = {
        ...formData,
        createdAt: new Date(),
        ownerId: user?.uid || null,
      };

      const docRef = await addDoc(collection(db, "Firm"), payload);

      console.log("Document successfully written with ID:", docRef.id);
      alert("Message sent! Your contact request has been submitted.");

      setFormData({
        fullName: "",
        email: "",
        traderId: "",
        inquiryType: "General Support",
        message: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("There was an error submitting your request. Please try again.");
    } finally {
      // 3. Stop processing regardless of success or failure
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">
          Contact Support
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              disabled={isProcessing} // Disable input while processing
            />
          </div>

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
              disabled={isProcessing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Trader / Account ID</label>
            <input
              type="text"
              name="traderId"
              value={formData.traderId}
              onChange={handleChange}
              placeholder="e.g. TRD-88421"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
              disabled={isProcessing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <select
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
              disabled={isProcessing}
            >
              <option value="General Support">General Support</option>
              <option value="Billing & Payouts">Billing & Payouts</option>
              <option value="Technical Issue">Technical Issue</option>
              <option value="Partnership">Partnership</option>
            </select>
          </div>

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
              disabled={isProcessing}
            ></textarea>
          </div>

          {/* 4. Conditional Button Logic */}
          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full font-bold py-2 px-4 rounded transition duration-200 flex items-center justify-center ${
              isProcessing 
                ? "bg-gray-600 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              "Submit Request"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;