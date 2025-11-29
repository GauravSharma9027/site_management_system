import React, { useState } from "react";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { twMerge } from "tailwind-merge";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ScopeOfWorkModal = ({ onClose, className }) => {
    const projectData = {
        clientName: "John Doe",
        companyName: "Tech Solutions Pvt Ltd",
        projectKeyID: "PRJ-2025-001",
        jobs: Array.from({ length: 10 }, (_, i) => ({
            jobID: `JOB-${i + 1}`,
            description:
                "This is a dummy description for job ID. It can be very long (up to 300 words).",
            days: `${10 + (i % 5)} Days`,
            assignedBy: `Manager ${i + 1}`,
            progress: Math.floor(Math.random() * 100),
        })),
    };

    const [selectedJob, setSelectedJob] = useState(projectData.jobs[0]);
    const [activeTab, setActiveTab] = useState("details");

    const handlePrint = () => window.print();

    const chartData = {
        labels: projectData.jobs.map((job) => job.jobID),
        datasets: [
            {
                label: "Work Completed (%)",
                data: projectData.jobs.map((job) => job.progress),
                backgroundColor: "rgba(37, 99, 235, 0.8)",
                borderRadius: 6,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const job = projectData.jobs[context.dataIndex];
                        return `${job.jobID}: ${job.progress}% completed`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: { stepSize: 20 },
                title: { display: true, text: "Completion (%)" },
            },
            x: {
                ticks: {
                    autoSkip: false,
                    maxRotation: 90,
                    minRotation: 45,
                },
                title: { display: true, text: "Job IDs" },
            },
        },
    };

    return (
        <div className={twMerge("px-4 fixed inset-0 z-50 flex items-center justify-center", className)}>
            {/* Proper semi-transparent background overlay */}
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />

            {/* Modal Box */}
            <div
                className="relative w-full max-w-3xl bg-white text-gray-900 rounded-xl shadow-2xl border border-gray-200 p-6 h-[85vh] md:h-fit lg:h-[90vh] max-h-[90vh] flex flex-col justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="w-full md:w-fit flex justify-between">
                        <h2 className="text-lg font-bold text-[#003f9a] text-nowrap">Scope of Work</h2>
                        {/* Close Button maintained like reference */}
                        <button
                            onClick={onClose}
                            className="md:hidden px-3 py-1 text-sm rounded-md bg-gray-100 hover:bg-gray-200 transition"
                        >
                            Close
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="space-x-3 mt-2 md:mt-0 flex">
                        <button
                            className={`text-nowrap px-4 py-1 rounded-4xl text-sm transition ${activeTab === "details"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-transparent text-gray-600 hover:bg-gray-100"
                                }`}
                            onClick={() => setActiveTab("details")}
                        >
                            Details
                        </button>
                        <button
                            className={`text-nowrap px-4 py-1 rounded-4xl text-sm transition ${activeTab === "graph"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-transparent text-gray-600 hover:bg-gray-100"
                                }`}
                            onClick={() => setActiveTab("graph")}
                        >
                            Progress Graph
                        </button>
                    </div>

                    {/* Close Button maintained like reference */}
                    <button
                        onClick={onClose}
                        className="hidden md:block px-3 py-1 text-sm rounded-md bg-gray-100 hover:bg-gray-200 transition"
                    >
                        Close
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 justify-center items-center overflow-y-auto mt-8">
                    {activeTab === "details" && (
                        <div className="grid grid-cols-1 md:grid-cols-2  gap-4 text-sm">
                            <div className="p-3 bg-gray-100 rounded-md">
                                <p className="text-gray-700 font-medium">Client</p>
                                <p className="text-gray-600">{projectData.clientName}</p>
                            </div>
                            <div className="p-3 bg-gray-100 rounded-md">
                                <p className="text-gray-700 font-medium">Company</p>
                                <p className="text-gray-600">{projectData.companyName}</p>
                            </div>
                            <div className="p-3 bg-gray-100 rounded-md md:col-span-2">
                                <p className="text-gray-700 font-medium">Project Key</p>
                                <p className="text-gray-600">{projectData.projectKeyID}</p>
                            </div>

                            {/* Job Dropdown */}
                            <div className="p-3 rounded-md space-x-4 md:col-span-2 bg-gray-100">
                                <label className="text-gray-700 font-medium">Job ID</label>
                                <select
                                    className="w-full max-w-xl border rounded-md p-2 mt-1 text-gray-600 focus:ring-2 focus:ring-blue-500"
                                    value={selectedJob.jobID}
                                    onChange={(e) =>
                                        setSelectedJob(
                                            projectData.jobs.find(
                                                (job) => job.jobID === e.target.value
                                            )
                                        )
                                    }
                                >
                                    {projectData.jobs.map((job) => (
                                        <option key={job.jobID} value={job.jobID}>
                                            {job.jobID}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Job Details */}
                            <div className="p-3 bg-gray-100 rounded-md md:col-span-2">
                                <p className="text-gray-700 font-medium">Description</p>
                                <p className="text-gray-600 leading-relaxed">
                                    {selectedJob.description}
                                </p>
                            </div>
                            <div className="p-3 bg-gray-100 rounded-md">
                                <p className="text-gray-700 font-medium">Days</p>
                                <p className="text-gray-600">{selectedJob.days}</p>
                            </div>
                            <div className="p-3 bg-gray-100 rounded-md">
                                <p className="text-gray-700 font-medium">Assigned By</p>
                                <p className="text-gray-600">{selectedJob.assignedBy}</p>
                            </div>

                            {/* Actions */}
                            <div className="mt-6 grid sm:grid-cols-2 gap-3 md:col-span-2">
                                <button
                                    onClick={handlePrint}
                                    className="w-full bg-[#ffd54f] hover:bg-[#ffca28] py-3 rounded-lg text-gray-900 font-bold text-sm tracking-wide transition-all active:scale-[0.98]"
                                >
                                    Download Agreement
                                </button>
                                <button
                                    onClick={handlePrint}
                                    className="w-full border border-gray-300 text-gray-700 hover:border-[#004bb8] hover:text-[#004bb8] py-3 rounded-lg font-medium text-sm tracking-wide transition-all active:scale-[0.98]"
                                >
                                    Print Summary
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === "graph" && (
                        <div className="h-full md:h-[65vh] lg:h-full grid grid-cols-1 md:grid-cols-2 gap-6 p-6 py-12 bg-gray-100 rounded-lg">

                            {/* Left Side: Dropdown + Job Work Details */}
                            <div className="flex flex-col space-y-6">
                                {/* Job Dropdown */}
                                <div>
                                    <label className="text-gray-700 font-medium">Select Job</label>
                                    <select
                                        className="w-full border rounded-md p-2 mt-1 text-gray-600 focus:ring-2 focus:ring-blue-500"
                                        value={selectedJob.jobID}
                                        onChange={(e) =>
                                            setSelectedJob(
                                                projectData.jobs.find(
                                                    (job) => job.jobID === e.target.value
                                                )
                                            )
                                        }
                                    >
                                        {projectData.jobs.map((job) => (
                                            <option key={job.jobID} value={job.jobID}>
                                                {job.jobID}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Job Work Details Card */}
                                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 space-y-4">
                                    <h3 className="text-base font-semibold text-gray-800">
                                        {selectedJob.jobID} Status
                                    </h3>

                                    {/* Completed */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-blue-600 font-medium">Completed</span>
                                        <span className="text-blue-600 font-bold">
                                            {selectedJob.progress}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full"
                                            style={{ width: `${selectedJob.progress}%` }}
                                        />
                                    </div>

                                    {/* Remaining */}
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-red-500 font-medium">Remaining</span>
                                        <span className="text-red-500 font-bold">
                                            {100 - selectedJob.progress}%
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Pie Chart */}
                            <div className="w-full h-full flex justify-center items-center bg-white rounded-lg shadow-md p-6 border border-gray-200">
                                <Bar
                                    data={{
                                        labels: ["Completed", "Remaining"],
                                        datasets: [
                                            {
                                                data: [
                                                    selectedJob.progress,
                                                    100 - selectedJob.progress,
                                                ],
                                                backgroundColor: [
                                                    "rgba(37, 99, 235, 0.9)", // Blue for completed
                                                    "rgba(229, 231, 235, 0.9)", // Gray for remaining
                                                ],
                                            },
                                        ],
                                    }}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: { position: "bottom" },
                                            tooltip: {
                                                callbacks: {
                                                    label: (context) =>
                                                        `${context.label}: ${context.raw}%`,
                                                },
                                            },
                                        },
                                    }}
                                    type="pie"
                                />
                            </div>
                        </div>
                    )}



                </div>
            </div>
        </div>
    );
};

export default ScopeOfWorkModal;
