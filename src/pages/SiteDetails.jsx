// // src/pages/SiteDeatil.jsx
// import React, { useState } from "react";
// import axios from "axios";

// const POSITION_OPTIONS = ["Foreman", "Supervisor", "Manager", "Team Lead"];

// const wordCount = (text) =>
//   text.trim().split(/\s+/).filter((w) => w.length > 0).length;

// export default function SiteDeatil() {
//   const [form, setForm] = useState({
//     siteForemanName: "",
//     position: "",
//     emergencyContact: "",
//     siteAddress: "",
//     latitude: "",
//     longitude: "",
//     anyDetails: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [submitting, setSubmitting] = useState(false);

//   // Validation
//   const validate = () => {
//     const e = {};
//     if (!form.siteForemanName) e.siteForemanName = "Foreman name is required.";
//     if (!form.position) e.position = "Select a position.";
//     if (!form.emergencyContact || form.emergencyContact.length < 8)
//       e.emergencyContact = "Emergency contact must be at least 8 characters.";
//     if (!form.siteAddress || form.siteAddress.length < 10)
//       e.siteAddress = "Site address must be at least 10 characters.";
//     if (form.latitude === "") e.latitude = "Latitude is required.";
//     if (form.longitude === "") e.longitude = "Longitude is required.";
//     if (wordCount(form.anyDetails) < 50)
//       e.anyDetails = `Details must be at least 50 words. Current: ${wordCount(
//         form.anyDetails
//       )}`;
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   // Input Change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   // GPS Auto Fetch
//   const fetchGeo = () => {
//     if (!navigator.geolocation) {
//       alert("Geolocation not supported in this browser.");
//       return;
//     }
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const { latitude, longitude } = pos.coords;
//         setForm((prev) => ({
//           ...prev,
//           latitude: latitude.toFixed(6),
//           longitude: longitude.toFixed(6),
//         }));
//       },
//       () => {
//         alert("Unable to fetch GPS. Please allow location access.");
//       },
//       { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
//     );
//   };

//   // Submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;
//     setSubmitting(true);
//     try {
//       await axios.post("/api/projects/create-contract", form);
//       alert("Contract created successfully!");
//     } catch (err) {
//       alert("Submission failed. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center p-6">
//       <div className="w-full max-w-5xl rounded-2xl bg-white shadow-xl border border-gray-200 p-8">

//         {/* Heading */}
//         <h1 className="text-3xl font-bold mb-8 text-gray-800" style={{ color: "#003f9a" }}>
//           Create Contract
//         </h1>

//         {/* Layout: Mobile = 1 col, Laptop = 2 col */}
//         <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">

//           {/* LEFT COLUMN */}
//           <div className="space-y-6">

//             {/* Site Foreman Name */}
//             <div>
//               <label className="block text-sm font-medium text-gray-800">Site Foreman Name</label>
//               <input
//                 type="text"
//                 name="siteForemanName"
//                 value={form.siteForemanName}
//                 onChange={handleChange}
//                 placeholder="Enter foreman name"
//                 className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 
//                 shadow-sm focus:ring-2 focus:ring-[#003f9a] focus:border-[#003f9a] 
//                 text-gray-800 placeholder-gray-400"
//               />
//               {errors.siteForemanName && (
//                 <p className="text-red-500 text-sm">{errors.siteForemanName}</p>
//               )}
//             </div>

//             {/* Position */}
//             <div>
//               <label className="block text-sm font-medium text-gray-800">Position</label>
//               <select
//                 name="position"
//                 value={form.position}
//                 onChange={handleChange}
//                 className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 
//                 shadow-sm focus:ring-2 focus:ring-[#003f9a] focus:border-[#003f9a] 
//                 text-gray-800"
//               >
//                 <option value="">Select position</option>
//                 {POSITION_OPTIONS.map((opt) => (
//                   <option key={opt} value={opt}>{opt}</option>
//                 ))}
//               </select>
//               {errors.position && (
//                 <p className="text-red-500 text-sm">{errors.position}</p>
//               )}
//             </div>

//             {/* Emergency Contact */}
//             <div>
//               <label className="block text-sm font-medium text-gray-800">Emergency Contact</label>
//               <input
//                 type="text"
//                 name="emergencyContact"
//                 value={form.emergencyContact}
//                 onChange={handleChange}
//                 placeholder="Enter emergency contact"
//                 className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 
//                 shadow-sm focus:ring-2 focus:ring-[#003f9a] focus:border-[#003f9a]
//                 text-gray-800 placeholder-gray-400"
//               />
//               {errors.emergencyContact && (
//                 <p className="text-red-500 text-sm">{errors.emergencyContact}</p>
//               )}
//             </div>

//           </div>

//           {/* RIGHT COLUMN */}
//           <div className="space-y-6">

//             {/* Site Address */}
//             <div>
//               <label className="block text-sm font-medium text-gray-800">Site Address</label>
//               <input
//                 type="text"
//                 name="siteAddress"
//                 value={form.siteAddress}
//                 onChange={handleChange}
//                 placeholder="Enter full site address"
//                 className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 
//                 shadow-sm focus:ring-2 focus:ring-[#003f9a] focus:border-[#003f9a]
//                 text-gray-800 placeholder-gray-400"
//               />
//               {errors.siteAddress && (
//                 <p className="text-red-500 text-sm">{errors.siteAddress}</p>
//               )}
//             </div>

//             {/* GPS Coordinates */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-800">Latitude</label>
//                 <input
//                   type="number"
//                   name="latitude"
//                   value={form.latitude}
//                   onChange={handleChange}
//                   placeholder="Latitude"
//                   className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 
//                   shadow-sm focus:ring-2 focus:ring-[#003f9a] focus:border-[#003f9a]
//                   text-gray-800 placeholder-gray-400"
//                 />
//                 {errors.latitude && (
//                   <p className="text-red-500 text-sm">{errors.latitude}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-800">Longitude</label>
//                 <input
//                   type="number"
//                   name="longitude"
//                   value={form.longitude}
//                   onChange={handleChange}
//                   placeholder="Longitude"
//                   className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 
//                   shadow-sm focus:ring-2 focus:ring-[#003f9a] focus:border-[#003f9a]
//                   text-gray-800 placeholder-gray-400"
//                 />
//                 {errors.longitude && (
//                   <p className="text-red-500 text-sm">{errors.longitude}</p>
//                 )}
//               </div>
//             </div>

//             {/* GPS Button */}
//             <button
//               type="button"
//               onClick={fetchGeo}
//               className="w-full rounded-lg bg-[#003f9a] hover:bg-[#014693] 
//               text-white px-4 py-3 shadow-md transition-all active:scale-[0.98]"
//             >
//               Get Current GPS
//             </button>
//           </div>

//           {/* FULL WIDTH TEXT AREA (Bottom) */}
//           <div className="lg:col-span-2">
//             <label className="block text-sm font-medium text-gray-800">Any Details</label>
//             <textarea
//               name="anyDetails"
//               rows={5}
//               value={form.anyDetails}
//               onChange={handleChange}
//               placeholder="Enter at least 50 words..."
//               className="mt-3 w-full rounded-lg border border-gray-300 bg-white px-3 py-3 
//               shadow-sm focus:ring-2 focus:ring-[#003f9a] focus:border-[#003f9a]
//               text-gray-800 placeholder-gray-400"
//             />
//             <p className="text-xs text-gray-500 mt-1">
//               Word count: {wordCount(form.anyDetails)}
//             </p>
//             {errors.anyDetails && (
//               <p className="text-red-500 text-sm">{errors.anyDetails}</p>
//             )}
//           </div>

//           {/* SUBMIT BUTTON - full width */}
//           <div className="lg:col-span-2">
//             <button
//               type="submit"
//               disabled={submitting}
//               className="w-full rounded-lg bg-[#003f9a] hover:bg-[#014693] 
//               text-white py-3 font-semibold shadow-lg transition-all active:scale-[0.98]"
//             >
//               {submitting ? "Submitting..." : "Create Contract"}
//             </button>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// }


// src/pages/SiteDeatil.jsx
import React, { useState } from "react";
import axios from "axios";

const POSITION_OPTIONS = ["Foreman", "Supervisor", "Manager", "Team Lead"];

const wordCount = (text) =>
  text.trim().split(/\s+/).filter((w) => w.length > 0).length;

export default function SiteDeatil() {
  const [form, setForm] = useState({
    siteForemanName: "",
    position: "",
    emergencyContact: "",
    siteAddress: "",
    latitude: "",
    longitude: "",
    anyDetails: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.siteForemanName) e.siteForemanName = "Foreman name is required.";
    if (!form.position) e.position = "Select a position.";
    if (!form.emergencyContact || form.emergencyContact.length < 8)
      e.emergencyContact = "Emergency contact must be at least 8 characters.";
    if (!form.siteAddress || form.siteAddress.length < 10)
      e.siteAddress = "Site address must be at least 10 characters.";
    if (form.latitude === "") e.latitude = "Latitude is required.";
    if (form.longitude === "") e.longitude = "Longitude is required.";
    if (wordCount(form.anyDetails) < 50)
      e.anyDetails = `Details must be at least 50 words. Current: ${wordCount(
        form.anyDetails
      )}`;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const fetchGeo = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported in this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setForm((prev) => ({
          ...prev,
          latitude: latitude.toFixed(6),
          longitude: longitude.toFixed(6),
        }));
      },
      () => {
        alert("Unable to fetch GPS. Please allow location access.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await axios.post("/api/projects/create-contract", form);
      alert("Contract created successfully!");
    } catch (err) {
      alert("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] pt-10 pb-16 px-6">

      {/* ------------------ TOP PAGE HEADER ------------------ */}
      <div className="max-w-5xl mx-auto mb-10">
        <h1 className="text-4xl font-bold text-[#003f9a]">
          Create Contract
        </h1>
        <p className="mt-2 text-gray-600 text-base">
          Fill out all required details carefully to generate an official site contract.
        </p>
      </div>

      {/* ------------------ FORM CARD ------------------ */}
      <div className="max-w-5xl mx-auto rounded-2xl bg-white shadow-xl border border-gray-200 p-8">

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* Site Foreman Name */}
            <div>
              <label className="block text-sm font-medium text-gray-800">Site Foreman Name</label>
              <input
                type="text"
                name="siteForemanName"
                value={form.siteForemanName}
                onChange={handleChange}
                placeholder="Enter foreman name"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-800 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-[#003f9a] focus:border-[#003f9a]"
              />
              {errors.siteForemanName && (
                <p className="text-red-500 text-sm">{errors.siteForemanName}</p>
              )}
            </div>

            {/* Position */}
            <div>
              <label className="block text-sm font-medium text-gray-800">Position</label>
              <select
                name="position"
                value={form.position}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-800 shadow-sm focus:ring-2 focus:ring-[#003f9a] focus:border-[#003f9a]"
              >
                <option value="">Select position</option>
                {POSITION_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {errors.position && (
                <p className="text-red-500 text-sm">{errors.position}</p>
              )}
            </div>

            {/* Emergency Contact */}
            <div>
              <label className="block text-sm font-medium text-gray-800">Emergency Contact</label>
              <input
                type="text"
                name="emergencyContact"
                value={form.emergencyContact}
                onChange={handleChange}
                placeholder="Enter emergency contact"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-800 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-[#003f9a] focus:border-[#003f9a]"
              />
              {errors.emergencyContact && (
                <p className="text-red-500 text-sm">{errors.emergencyContact}</p>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">

            {/* Site Address */}
            <div>
              <label className="block text-sm font-medium text-gray-800">Site Address</label>
              <input
                type="text"
                name="siteAddress"
                value={form.siteAddress}
                onChange={handleChange}
                placeholder="Enter full site address"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-800 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-[#003f9a] focus:border-[#003f9a]"
              />
              {errors.siteAddress && (
                <p className="text-red-500 text-sm">{errors.siteAddress}</p>
              )}
            </div>

            {/* GPS Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-800">Latitude</label>
                <input
                  type="number"
                  name="latitude"
                  value={form.latitude}
                  onChange={handleChange}
                  disabled
                  placeholder="Latitude"
                  className="mt-2 w-full rounded-lg cursor-not-allowed border border-gray-300 bg-white px-3 py-2 text-gray-800 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-[#003f9a] focus:border-[#003f9a]"
                />
                {errors.latitude && (
                  <p className="text-red-500 text-sm">{errors.latitude}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800">Longitude</label>
                <input
                  type="number"
                  name="longitude"
                  value={form.longitude}
                  onChange={handleChange}
                  placeholder="Longitude"
                  disabled
                  className="mt-2 w-full rounded-lg cursor-not-allowed border border-gray-300 bg-white px-3 py-2 text-gray-800 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-[#003f9a] focus:border-[#003f9a]"
                />
                {errors.longitude && (
                  <p className="text-red-500 text-sm">{errors.longitude}</p>
                )}
              </div>
            </div>

            {/* GPS Button */}
            <button
              type="button"
              onClick={fetchGeo}
              className="w-full rounded-lg bg-[#003f9a] hover:bg-[#014693] text-white px-4 py-3 shadow-md transition-all active:scale-[0.98]"
            >
              Get Current GPS
            </button>
          </div>

          {/* FULL WIDTH TEXT AREA */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-800">Any Details</label>
            <textarea
              name="anyDetails"
              rows={5}
              value={form.anyDetails}
              onChange={handleChange}
              placeholder="Enter at least 50 words..."
              className="mt-3 w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-gray-800 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-[#003f9a] focus:border-[#003f9a]"
            />
            <p className="text-xs text-gray-500 mt-1">
              Word count: {wordCount(form.anyDetails)}
            </p>
            {errors.anyDetails && (
              <p className="text-red-500 text-sm">{errors.anyDetails}</p>
            )}
          </div>

          {/* Submit */}
          <div className="lg:col-span-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-[#003f9a] hover:bg-[#014693] text-white py-3 font-semibold shadow-lg transition-all active:scale-[0.98]"
            >
              {submitting ? "Submitting..." : "Create Contract"}
            </button>
          </div>
        </form>
      </div>

      {/* ------------------ BOTTOM HELP SECTION ------------------ */}
      <div className="max-w-5xl mx-auto mt-10 bg-white border border-gray-200 rounded-xl p-6 shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Instructions & Guidelines</h2>
        <ul className="text-gray-600 text-sm leading-relaxed space-y-2">
          <li>• Ensure GPS is fetched from an accurate location.</li>
          <li>• Foreman name must be the authorized site incharge.</li>
          <li>• Emergency contact should be reachable at all times.</li>
          <li>• Write clear details — at least 50 words are required.</li>
          <li>• All contract information will be stored in the database.</li>
        </ul>
      </div>
    </div>
  );
}
