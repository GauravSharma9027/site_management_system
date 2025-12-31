import { useState } from "react";

export default function Home() {
    const [reportStatus, setReportStatus] = useState("Pending");

    return (
        <main className="min-h-screen bg-gray-100 py-6  px-6">
            <div className="max-w-[1100px] mx-auto px-4 space-y-6">

                {/* Hero Section */}
                <section className="">
                    <h1 className="text-[#003f9a] font-bold text-3xl sm:text-4xl tracking-wide text-nowrap">
                        Daily Work Progress Portal
                    </h1>
                    <p className="mt-3 text-gray-600 max-w-2xl">
                        Submit daily progress with clarity. Consistent reporting improves project visibility, accountability, and delivery.
                    </p>
                </section>

                {/* Today’s Quick Summary */}
                <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Today’s Summary</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <SummaryCard label="Current Date" value={new Date().toLocaleDateString()} />
                        <SummaryCard label="Assigned Project" value="North Sector Road Expansion" />
                        <SummaryCard label="Job ID" value="JOB-NSRE-2025-0142" />
                        <SummaryCard label="Report Status" value={reportStatus} status />
                    </div>
                </section>

                {/* Daily Work Progress Report Form */}
                <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
                    <DailyReportForm onSubmitted={() => setReportStatus("Submitted")} />
                </section>

                {/* Work Submission Guidelines */}
                <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Work Submission Guidelines</h2>
                    <ul className="space-y-2 text-gray-700">
                        <li>Submit report daily before end of shift</li>
                        <li>Upload clear images/videos</li>
                        <li>Describe work accurately</li>
                        <li>Report any site issues immediately</li>
                    </ul>
                </section>

                {/* Media Upload Rules */}
                <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Media Upload Rules</h2>
                    <ul className="space-y-2 text-gray-700">
                        <li>Allowed formats: jpg, png, mp4</li>
                        <li>Max file size: Images 5MB, Videos 50MB</li>
                        <li>Multiple uploads allowed</li>
                    </ul>
                </section>

                {/* Help & Support */}
                <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Help & Support</h2>
                    <p className="text-gray-700">
                        Facing any issue while submitting report? Contact your supervisor or reach the admin support team.
                    </p>
                </section>

                {/* System Trust / Security Note */}
                <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
                    <p className="text-sm text-gray-700">
                        All submitted data is securely stored and monitored by the admin team. Access is logged and reviewed regularly.
                    </p>
                </section>
            </div>
        </main>
    );
}

/* ================= DailyReportForm Component ================= */
function DailyReportForm({ onSubmitted }) {
    const [formData, setFormData] = useState({
        projectName: "",
        jobId: "",
        activities: "",
        supervisorName: "",
        siteIssue: "",
        workDetails: "",
    });
    const [files, setFiles] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFiles = (e) => {
        const selected = Array.from(e.target.files || []);
        setFiles(selected);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitted && onSubmitted();
        setFormData({ projectName: "", jobId: "", activities: "", supervisorName: "", siteIssue: "", workDetails: "" });
        setFiles([]);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 text-black">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput label="Project Name" name="projectName" value={formData.projectName} onChange={handleChange} className="border rounded-lg shadow-sm"/>
                <FormInput label="Job ID" name="jobId" value={formData.jobId} onChange={handleChange} className="border rounded-lg shadow-sm"/>
                <FormInput label="Activities" name="activities" value={formData.activities} onChange={handleChange} className="border rounded-lg shadow-sm"/>
                <FormInput label="Supervisor Name" name="supervisorName" value={formData.supervisorName} onChange={handleChange} className="border rounded-lg shadow-sm"/>
                <FormFile label="Images / Videos" accept=".jpg,.jpeg,.png,.mp4" multiple onChange={handleFiles} files={files} className="border rounded-lg shadow-sm"/>
                <FormInput label="Site Related Issue" name="siteIssue" value={formData.siteIssue} onChange={handleChange} className="border rounded-lg shadow-sm"/>
                <FormTextArea label="Work Details" name="workDetails" value={formData.workDetails} onChange={handleChange} className="md:col-span-2 " />
            </div>
            <div className="flex justify-center">
                <button type="submit" className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
                    Submit Report
                </button>
            </div>
        </form>
    );
}

function FormInput({ label, name, value, onChange }) {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-800 mb-1">{label}</label>
            <input id={name} name={name} type="text" value={value} onChange={onChange} className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500" />
        </div>
    );
}

function FormTextArea({ label, name, value, onChange, className }) {
    return (
        <div className={className}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-800 mb-1">{label}</label>
            <textarea id={name} name={name} rows={6} value={value} onChange={onChange} className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500" />
        </div>
    );
}

function FormFile({ label, accept, multiple, onChange, files }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">{label}</label>
            <input type="file" accept={accept} multiple={multiple} onChange={onChange} className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500" />
            {files?.length > 0 && (
                <ul className="mt-2 space-y-1">
                    {files.map((f, i) => (
                        <li key={i} className="text-xs text-gray-700 truncate">{f.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

/* ================= SummaryCard Component ================= */
function SummaryCard({ label, value, status = false }) {
    const statusClass =
        status && value === "Submitted"
            ? "text-green-700 bg-green-50 border-green-200"
            : status
                ? "text-yellow-700 bg-yellow-50 border-yellow-200"
                : "text-gray-900 bg-gray-50 border-gray-200";

    return (
        <div className={`rounded-lg border p-4 shadow-sm ${statusClass}`}>
            <p className="text-xs font-medium text-gray-600">{label}</p>
            <p className="mt-2 text-sm font-semibold">{value}</p>
        </div>
    );
}
