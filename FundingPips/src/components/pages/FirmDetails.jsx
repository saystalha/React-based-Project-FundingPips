import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
// Import Firestore functions
import { doc, getDoc, deleteDoc, updateDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";

const FirmDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [firmEntry, setFirmEntry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // States for Editing
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchFirmDetail = async () => {
      try {
        const docRef = doc(db, "Firm", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() };
          setFirmEntry(data);
          setEditData(data); // Initialize edit form with current data
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchFirmDetail();
  }, [id]);

  // --- DELETE FUNCTION ---
  // Inside FirmDetails.jsx

const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this submission?")) {
        setIsDeleting(true);
        try {
            const docRef = doc(db, "Firm", id);
            
            // 1. Execute the delete operation
            await deleteDoc(docRef);
            
            console.log("Document successfully deleted");

            // 2. CRITICAL: Clear local state immediately to avoid "Unexpected state" errors
            setFirmEntry(null); 
            
            // 3. Navigate away using 'replace' to remove this ID from history
            navigate("/firmtracker", { replace: true });
            
        } catch (error) {
            console.error("Error deleting document:", error);
            alert("Failed to delete the entry. Please check your permissions.");
        } finally {
            // Only update deleting state if navigation didn't happen (error case)
            setIsDeleting(false);
        }
    }
};

  // --- UPDATE FUNCTION ---
  const handleUpdate = async () => {
    try {
      const docRef = doc(db, "Firm", id);
      // We only update the editable fields
      await updateDoc(docRef, {
        fullName: editData.fullName,
        email: editData.email,
        traderId: editData.traderId,
        message: editData.message,
      });
      setFirmEntry(editData);
      setIsEditing(false);
      alert("Updated successfully!");
    } catch (error) {
      console.error("Error updating document:", error);
      alert("Failed to update.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin h-10 w-10 border-4 border-electric border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!firmEntry) {
    return (
      <div className="p-8 text-center bg-card rounded-xl border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-4">Entry Not Found</h2>
        <Link to="/firmtracker" className="text-electric hover:underline">← Back to Tracker</Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 animate-fade-in">
      {/* Navigation Header */}
      <div className="mb-8 flex items-center justify-between">
        <Link to="/firmtracker" className="text-muted hover:text-white transition-colors flex items-center gap-2">
          ← Back to Submissions
        </Link>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-1.5 rounded-lg bg-electric/10 text-electric border border-electric/20 text-sm font-bold hover:bg-electric hover:text-white transition-all"
          >
            {isEditing ? "Cancel Edit" : "Edit Details"}
          </button>
          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-1.5 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 text-sm font-bold hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete Entry"}
          </button>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
        <div className={`h-2 w-full ${firmEntry.inquiryType === 'Technical Issue' ? 'bg-red-500' : 'bg-electric'}`}></div>
        
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-muted font-bold">Full Name</label>
              {isEditing ? (
                <input 
                  className="w-full bg-gray-900 border border-white/10 rounded p-2 text-white focus:border-electric outline-none"
                  value={editData.fullName}
                  onChange={(e) => setEditData({...editData, fullName: e.target.value})}
                />
              ) : (
                <h3 className="text-2xl font-bold text-white">{firmEntry.fullName || "N/A"}</h3>
              )}
            </div>

            {/* Trader ID */}
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-muted font-bold">Trader ID</label>
              {isEditing ? (
                <input 
                  className="w-full bg-gray-900 border border-white/10 rounded p-2 text-white focus:border-electric outline-none"
                  value={editData.traderId}
                  onChange={(e) => setEditData({...editData, traderId: e.target.value})}
                />
              ) : (
                <p className="text-white text-xl font-bold">{firmEntry.traderId || "N/A"}</p>
              )}
            </div>

            {/* Email Address */}
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-muted font-bold">Email Address</label>
              {isEditing ? (
                <input 
                  className="w-full bg-gray-900 border border-white/10 rounded p-2 text-white focus:border-electric outline-none"
                  value={editData.email}
                  onChange={(e) => setEditData({...editData, email: e.target.value})}
                />
              ) : (
                <p className="text-electric font-mono">{firmEntry.email || "No email"}</p>
              )}
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-muted font-bold block mb-1">Inquiry Category</label>
              <span className={`px-3 py-1 rounded text-sm font-bold ${
                firmEntry.inquiryType === 'Technical Issue' ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'
              }`}>
                {firmEntry.inquiryType || "General"}
              </span>
            </div>
          </div>

          {/* Submission Message */}
          <div className="bg-black/20 rounded-xl p-6 border border-white/5">
            <label className="text-xs uppercase tracking-widest text-muted font-bold block mb-4 border-b border-white/10 pb-2">
              Submission Message
            </label>
            {isEditing ? (
              <textarea 
                className="w-full bg-gray-900 border border-white/10 rounded p-4 text-white focus:border-electric outline-none min-h-[150px]"
                value={editData.message}
                onChange={(e) => setEditData({...editData, message: e.target.value})}
              />
            ) : (
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap italic">
                {firmEntry.message ? `"${firmEntry.message}"` : "No message provided."}
              </p>
            )}
          </div>

          {/* Save Changes Button (Only in Edit Mode) */}
          {isEditing && (
            <div className="mt-8">
              <button 
                onClick={handleUpdate}
                className="w-full bg-electric py-3 rounded-lg font-bold text-white hover:bg-blue-600 transition-all shadow-lg shadow-electric/20"
              >
                Save Updated Details
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FirmDetails;