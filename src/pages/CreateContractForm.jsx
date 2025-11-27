import { useEffect, useMemo, useState } from "react";

/* ---------- Utilities ---------- */

// Currency formatter for INR
const formatINR = (value) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(value);

// Date parser (expects "DD Mon YYYY | HH:MM AM/PM")
const parseDate = (str) => {
    const [datePart, timePart] = str.split("|").map((s) => s.trim());
    const [d, mon, y] = datePart.split(" ");
    const [hhmm, ampm] = timePart.split(" ");
    let [h, m] = hhmm.split(":").map(Number);
    if (ampm === "PM" && h !== 12) h += 12;
    if (ampm === "AM" && h === 12) h = 0;
    const months = {
        Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
        Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
    };
    return new Date(Number(y), months[mon], Number(d), h, m);
};

const statusMeta = {
    Planned: { class: "bg-blue-100 text-blue-700 ring-1 ring-blue-200", dot: "bg-blue-500" },
    Active: { class: "bg-green-100 text-green-700 ring-1 ring-green-200", dot: "bg-green-500" },
    "On Hold": { class: "bg-amber-100 text-amber-700 ring-1 ring-amber-200", dot: "bg-amber-500" },
    Completed: { class: "bg-gray-200 text-gray-700 ring-1 ring-gray-300", dot: "bg-gray-500" },
};

/* ---------- Page ---------- */

export default function CreateContractPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState(null);

    // Controls
    const [search, setSearch] = useState("");
    const [companyFilter, setCompanyFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [sortBy, setSortBy] = useState("startDateAsc"); // startDateAsc | endDateDesc | valueDesc | valueAsc

    // Pagination (kept, but scrolling is removed from the list container)
    const [page, setPage] = useState(1);
    const pageSize = 5;

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            const dummy = [
                {
                    projectId: "PRJ-001",
                    companyName: "Adani Infra Pvt Ltd",
                    projectName: "Solar Plant Expansion",
                    startDate: "12 Feb 2025 | 09:00 AM",
                    endDate: "12 Dec 2025 | 06:00 PM",
                    totalValue: 540000000, // ₹ 5,40,00,000
                    status: "Active",
                },
                {
                    projectId: "PRJ-002",
                    companyName: "Tata Steel Ltd",
                    projectName: "Smart Manufacturing Control System",
                    startDate: "18 Jan 2025 | 10:30 AM",
                    endDate: "30 Aug 2025 | 04:15 PM",
                    totalValue: 96800000, // ₹ 96,80,000
                    status: "Planned",
                },
                {
                    projectId: "PRJ-003",
                    companyName: "JSW Energy",
                    projectName: "Wind Turbine Automation",
                    startDate: "05 Mar 2025 | 11:00 AM",
                    endDate: "22 Nov 2025 | 05:30 PM",
                    totalValue: 210500000, // ₹ 2,10,50,000
                    status: "On Hold",
                },
                {
                    projectId: "PRJ-004",
                    companyName: "Larsen & Toubro",
                    projectName: "Industrial IoT Upgrade",
                    startDate: "10 Apr 2025 | 08:45 AM",
                    endDate: "15 Sep 2025 | 07:00 PM",
                    totalValue: 125000000,
                    status: "Active",
                },
                {
                    projectId: "PRJ-005",
                    companyName: "Reliance Infrastructure",
                    projectName: "Grid Substation Modernization",
                    startDate: "22 Jan 2025 | 09:15 AM",
                    endDate: "11 Nov 2025 | 05:00 PM",
                    totalValue: 432000000,
                    status: "Completed",
                },
            ];
            setProjects(dummy);
            setLoading(false);
        }, 600);
    }, []);

    const uniqueCompanies = useMemo(
        () => ["All", ...Array.from(new Set(projects.map((p) => p.companyName)))],
        [projects]
    );

    const filtered = useMemo(() => {
        return projects
            .filter((p) =>
                search
                    ? `${p.projectId} ${p.companyName} ${p.projectName}`.toLowerCase().includes(search.toLowerCase())
                    : true
            )
            .filter((p) => (companyFilter === "All" ? true : p.companyName === companyFilter))
            .filter((p) => (statusFilter === "All" ? true : p.status === statusFilter));
    }, [projects, search, companyFilter, statusFilter]);

    const sorted = useMemo(() => {
        const arr = [...filtered];
        switch (sortBy) {
            case "startDateAsc":
                arr.sort((a, b) => parseDate(a.startDate) - parseDate(b.startDate));
                break;
            case "endDateDesc":
                arr.sort((a, b) => parseDate(b.endDate) - parseDate(a.endDate));
                break;
            case "valueDesc":
                arr.sort((a, b) => b.totalValue - a.totalValue);
                break;
            case "valueAsc":
                arr.sort((a, b) => a.totalValue - b.totalValue);
                break;
            default:
                break;
        }
        return arr;
    }, [filtered, sortBy]);

    const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
    const pageItems = useMemo(() => {
        const start = (page - 1) * pageSize;
        return sorted.slice(start, start + pageSize);
    }, [sorted, page, pageSize]);

    useEffect(() => {
        setPage(1);
    }, [search, companyFilter, statusFilter, sortBy]);

    const selectedProject = projects.find((p) => p.projectId === selectedId) || null;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Bottom 50% neutral background */}
            <div className="flex-1 bg-gray-50">
                <div className="max-w-[1100px] mx-auto px-4 py-6">
                    {/* Top bar summary */}
                    <div className="mb-6 lg:flex items-center justify-between">
                        <div className="">
                            {/* Heading in brand blue */}
                            <h2 className="text-[#003f9a] font-bold text-4xl tracking-wide">Project contracts</h2>
                            <p className="text-gray-600 text-base mt-1">Use search and filters to refine results</p>
                        </div>
                        <div className="mt-3 lg:mt-0 lg:text-right">
                            <p className="text-gray-500 text-lg md:text-xs">Total value (visible page)</p>
                            <p className="text-[#003f9a] font-semibold">
                                {formatINR(pageItems.reduce((sum, p) => sum + p.totalValue, 0))}
                            </p>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                            <div className="md:col-span-2">
                                <label className="text-gray-700 text-xs">Search</label>
                                <div className="mt-1 relative">
                                    <input
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search by Project ID, Company or Name"
                                        className="w-full bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#004bb8]"
                                    />
                                    <span className="absolute right-3 top-2.5 text-gray-400 text-sm">⌕</span>
                                </div>
                            </div>

                            <div>
                                <label className="text-gray-700 text-xs">Company</label>
                                <select
                                    value={companyFilter}
                                    onChange={(e) => setCompanyFilter(e.target.value)}
                                    className="mt-1 w-full bg-gray-50 text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#004bb8]"
                                >
                                    {uniqueCompanies.map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-gray-700 text-xs">Status</label>
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="mt-1 w-full bg-gray-50 text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#004bb8]"
                                    >
                                        {["All", "Planned", "Active", "On Hold", "Completed"].map((s) => (
                                            <option key={s} value={s}>
                                                {s}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-gray-700 text-xs">Sort</label>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="mt-1 w-full bg-gray-50 text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#004bb8]"
                                    >
                                        <option value="startDateAsc">Start date ↑</option>
                                        <option value="endDateDesc">End date ↓</option>
                                        <option value="valueDesc">Contract value ↓</option>
                                        <option value="valueAsc">Contract value ↑</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content: no scroll container (removed max-h and overflow) */}
                    <div className="space-y-4">
                        {loading ? (
                            <SkeletonList />
                        ) : pageItems.length === 0 ? (
                            <EmptyState onReset={() => { setSearch(""); setCompanyFilter("All"); setStatusFilter("All"); }} />
                        ) : (
                            pageItems.map((p) => (
                                <ProjectCard
                                    key={p.projectId}
                                    project={p}
                                    selected={selectedId === p.projectId}
                                    onSelect={() => setSelectedId(p.projectId)}
                                />
                            ))
                        )}
                    </div>

                    {/* Pagination (kept for dataset control) */}
                    {!loading && totalPages > 1 && (
                        <div className="mt-5 flex items-center justify-between text-gray-700">
                            <p className="text-sm">Page {page} of {totalPages}</p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    className="px-3 py-2 rounded-lg border border-gray-300 hover:border-[#004bb8] hover:text-[#004bb8] transition"
                                >
                                    Prev
                                </button>
                                <button
                                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                    className="px-3 py-2 rounded-lg border border-gray-300 hover:border-[#004bb8] hover:text-[#004bb8] transition"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons: commented out as requested */}
                    {/*
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              disabled={!selectedId}
              className={`md:col-span-2 w-full py-3 rounded-lg text-gray-900 font-bold text-sm tracking-wide transition-all active:scale-[0.98] ${
                selectedId ? "bg-yellow-300 hover:bg-yellow-400" : "bg-yellow-300/40 cursor-not-allowed"
              }`}
            >
              NEXT
            </button>
            <button
              className="w-full border border-gray-300 text-gray-700 hover:border-[#004bb8] hover:text-[#004bb8] py-3 rounded-lg font-medium text-sm tracking-wide transition-all active:scale-[0.98]"
            >
              Contract Dashboard
            </button>
          </div>
          */
          }
                </div>
            </div>

            {/* Details Modal */}
            {selectedProject && (
                <DetailsModal project={selectedProject} onClose={() => setSelectedId(null)} />
            )}
        </div>
    );
}

/* ---------- Components ---------- */

function ProjectCard({ project, selected, onSelect }) {
    const meta = statusMeta[project.status] || statusMeta.Planned;
    return (
        <div
            onClick={onSelect}
            className={`bg-white border ${selected ? "border-[#004bb8]" : "border-gray-200"} rounded-xl shadow-sm p-5 transition-all cursor-pointer hover:shadow-md`}
        >
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <Field label="Project ID" value={project.projectId} />
                    <Field label="Company Name" value={project.companyName} />
                    <Field label="Project Name" value={project.projectName} />
                </div>
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${meta.class}`}>
                    <span className={`w-2 h-2 rounded-full ${meta.dot}`} />
                    {project.status}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                <Info label="Start Date" value={project.startDate} />
                <Info label="End Date" value={project.endDate} />
                <Info label="Contract Value" value={formatINR(project.totalValue)} />
            </div>

            <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#004bb8]"></span>
                    <span>Click card to view details</span>
                </div>
                <button className="px-3 py-2 rounded-md text-xs font-semibold bg-gray-100 text-gray-900 hover:bg-gray-200 transition">
                    View summary
                </button>
            </div>
        </div>
    );
}

function Field({ label, value }) {
    return (
        <div>
            <p className="text-gray-500 text-[11px] uppercase tracking-wide">{label}</p>
            <p className="text-gray-900 text-sm font-semibold">{value}</p>
        </div>
    );
}

function Info({ label, value }) {
    return (
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-3">
            <p className="text-gray-500 text-[11px] uppercase tracking-wide">{label}</p>
            <p className="text-gray-900 text-sm font-semibold">{value}</p>
        </div>
    );
}

function SkeletonList() {
    return (
        <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="h-6 bg-gray-200 rounded" />
                        <div className="h-6 bg-gray-200 rounded" />
                        <div className="h-6 bg-gray-200 rounded" />
                    </div>
                </div>
            ))}
        </div>
    );
}

function EmptyState({ onReset }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
            <p className="text-gray-900 font-semibold">No projects found</p>
            <p className="text-gray-600 text-sm mt-1">Try clearing filters or check your search terms.</p>
            <button
                onClick={onReset}
                className="mt-4 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:border-[#004bb8] hover:text-[#004bb8] transition"
            >
                Reset filters
            </button>
        </div>
    );
}

function DetailsModal({ project, onClose }) {
    return (
        <div className=" px-4 fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <div className="relative w-full max-w-2xl bg-white text-gray-900 rounded-xl shadow-2xl border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-[#003f9a]">Contract details</h2>
                    <button
                        onClick={onClose}
                        className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition"
                    >
                        Close
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <Field label="Project ID" value={project.projectId} />
                    <Field label="Company Name" value={project.companyName} />
                    <Field label="Project Name" value={project.projectName} />
                    <Field label="Status" value={project.status} />
                    <Info label="Start Date" value={project.startDate} />
                    <Info label="End Date" value={project.endDate} />
                    <Info label="Contract Value" value={formatINR(project.totalValue)} />
                </div>

                {/* Modal actions kept minimal for professional feel */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                    <button className="w-full bg-[#ffd54f] hover:bg-[#ffca28] py-3 rounded-lg text-gray-900 font-bold text-sm tracking-wide transition-all active:scale-[0.98]">
                        Download Agreement PDF
                    </button>
                    <button className="w-full border border-gray-300 text-gray-700 hover:border-[#004bb8] hover:text-[#004bb8] py-3 rounded-lg font-medium text-sm tracking-wide transition-all active:scale-[0.98]">
                        Download summary
                    </button>
                </div>
            </div>
        </div>
    );
}
