import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Import Firestore functions
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase/config"; // Ensure this path is correct
// Import your custom skeleton loader
import FirmLoader from "../layouts/loaders/firmloader"; 

const FirmTracker = () => {
    const [firmData, setFirmData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchFirmData = async () => {
        try {
            // 1. Fetch documents from the "Firm" collection
            const querySnapshot = await getDocs(collection(db, "Firm"));
            
            // 2. Map the results, capturing the Firestore Document ID specifically
            const firmList = querySnapshot.docs.map((doc) => ({
                id: doc.id, // Capture the Document ID (not a field ID)
                ...doc.data() // Spread the rest of the fields (email, traderId, etc.)
            }));
            
            setFirmData(firmList);
        } catch (error) {
            console.error("Error fetching Firm data:", error);
        } finally {
            // 3. Stop the loader regardless of success or failure
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fetchFirmData();
    }, []);

    // Display the custom skeleton loader while fetching
    if (isLoading) {
        return <FirmLoader />;
    }

    return (
        <div className="w-full animate-fade-in p-2">
            {/* Header Section */}
            <div className="mb-6 flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-electric mb-2">Firm Submissions Tracker</h2>
                    <p className="text-muted text-sm">
                        Viewing <span className="text-white font-bold">{firmData.length}</span> live records from Firestore.
                    </p>
                </div>
            </div>

            {/* Table Header Labels */}
            <div className="grid grid-cols-4 gap-4 px-4 py-2 text-sm text-muted font-semibold uppercase tracking-wider border-b border-white/5 mb-2">
                <div className="col-span-1">Trader ID / Name</div>
                <div className="text-left">Inquiry Type</div>
                <div className="text-left">Email</div>
                <div className="text-left">Action</div>
            </div>

            {/* Submission List */}
            <div className="space-y-3">
                {firmData.length === 0 ? (
                    <div className="text-center p-12 bg-card rounded-xl border border-dashed border-white/10">
                        <p className="text-muted">No submissions found.</p>
                    </div>
                ) : (
                    firmData.map((item) => (
                        <div 
                            key={item.id} 
                            className={`grid grid-cols-4 gap-4 items-center p-4 bg-card rounded-lg border-l-4 ${
                                item.inquiryType === 'Technical Issue' ? 'border-red-500/80' : 'border-electric/50'
                            } hover:translate-x-1 transition-all duration-300 shadow-md`}
                        >
                            {/* Trader ID & Name */}
                            <div className="col-span-1">
                                <div className="font-bold text-white text-lg">{item.traderId || 'N/A'}</div>
                                <div className="text-sm text-muted">{item.fullName || 'No Name'}</div>
                            </div>

                            {/* Inquiry Type */}
                            <div className={`text-left font-medium ${
                                item.inquiryType === 'Technical Issue' ? 'text-red-400' : 'text-green-400'
                            }`}>
                                {item.inquiryType || 'General'}
                            </div>

                            {/* Email */}
                            <div className="text-left text-muted text-sm font-mono truncate">
                                {item.email || 'No Email'}
                            </div>

                            {/* Action Button - Using Document ID for the URL */}
                            <div className="text-right">
                                <Link
                                    to={`/firm/${item.id}`} 
                                    className="inline-block"
                                >
                                    <button className="text-electric hover:text-white font-semibold text-sm transition-colors duration-200">
                                        View Details →
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default FirmTracker;