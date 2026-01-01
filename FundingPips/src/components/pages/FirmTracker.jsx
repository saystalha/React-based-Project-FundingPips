import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// 1. Add 'query' and 'where' to your imports
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext"; // Import useAuth to get current user
import FirmLoader from "../layouts/loaders/firmloader"; 

const FirmTracker = () => {
    const [firmData, setFirmData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // 2. Access the logged-in user from context
    const { user, profile } = useAuth();

    const fetchFirmData = async () => {
        if (!user) return; // Exit if no user is logged in

        try {
            setIsLoading(true);
            
            // 3. Create a reference to the collection
            const firmRef = collection(db, "Firm");

            // 4. Create a query to filter documents
            // If the user is an admin, they see everything. 
            // If they are a trader, they only see documents where ownerId matches their UID.
            let q;
            if (profile?.role === "admin") {
                q = query(firmRef); // Admins see all
            } else {
                q = query(firmRef, where("ownerId", "==", user.uid)); // Users see only theirs
            }

            const querySnapshot = await getDocs(q);
            const firmList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            
            setFirmData(firmList);
        } catch (error) {
            console.error("Error fetching Firm data:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fetchFirmData();
    }, [user, profile]); // Re-run if user or profile changes

    if (isLoading) {
        return <FirmLoader />;
    }

    return (
        <div className="w-full animate-fade-in p-2">
            <div className="mb-6 flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-electric mb-2">
                        {profile?.role === "admin" ? "All Submissions" : "My Submissions"}
                    </h2>
                    <p className="text-muted text-sm">
                        Viewing <span className="text-white font-bold">{firmData.length}</span> 
                        {profile?.role === "admin" ? " total records." : " of your records."}
                    </p>
                </div>
            </div>

            {/* Rest of your table UI remains the same... */}
            <div className="grid grid-cols-4 gap-4 px-4 py-2 text-sm text-muted font-semibold uppercase tracking-wider border-b border-white/5 mb-2">
                <div className="col-span-1">Trader ID / Name</div>
                <div className="text-left">Inquiry Type</div>
                <div className="text-left">Email</div>
                <div className="text-left">Action</div>
            </div>

            <div className="space-y-3">
                {firmData.length === 0 ? (
                    <div className="text-center p-12 bg-card rounded-xl border border-dashed border-white/10">
                        <p className="text-muted">No submissions found.</p>
                    </div>
                ) : (
                    firmData.map((item) => (
                        <div key={item.id} className="grid grid-cols-4 gap-4 items-center p-4 bg-card rounded-lg border-l-4 border-electric/50 hover:translate-x-1 transition-all">
                             {/* ... (Keep your item mapping UI same as before) */}
                             <div className="col-span-1">
                                <div className="font-bold text-white text-lg">{item.traderId || 'N/A'}</div>
                                <div className="text-sm text-muted">{item.fullName || 'No Name'}</div>
                            </div>
                            <div className={`text-left font-medium ${item.inquiryType === 'Technical Issue' ? 'text-red-400' : 'text-green-400'}`}>
                                {item.inquiryType || 'General'}
                            </div>
                            <div className="text-left text-muted text-sm font-mono truncate">
                                {item.email || 'No Email'}
                            </div>
                            <div className="text-right">
                                <Link to={`/firm/${item.id}`} className="text-electric hover:text-white font-semibold text-sm">
                                    View Details →
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default FirmTracker;