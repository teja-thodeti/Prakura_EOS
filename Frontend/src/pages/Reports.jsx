import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { listTransactions } from "../api/transactions";
import { listAccounts } from "../api/accounts";
import "../styles/Dashboard.css";
import "../styles/Reports.css";

/* ---------------------------------------------------------------- */
/* Icons                                                              */
/* ---------------------------------------------------------------- */

const Icon = ({ children, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    {children}
  </svg>
);

const IconHome = (p) => (
  <Icon {...p}>
    <path d="M4 11.5 12 4l8 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 10v9a1 1 0 0 0 1 1h3v-5.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1V20h3a1 1 0 0 0 1-1v-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);
const IconList = (p) => (
  <Icon {...p}>
    <rect x="3.5" y="5" width="17" height="14" rx="2.2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3.5 10h17" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="16.7" cy="14.3" r="1.1" fill="currentColor" />
  </Icon>
);
const IconWalletNav = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M8.2 12.3 10.7 15l5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);
const IconPieChart = (p) => (
  <Icon {...p}>
    <path d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5H12V3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M15.5 3.9A8.5 8.5 0 0 1 20.1 8.5H15.5V3.9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </Icon>
);
const IconReceipt = (p) => (
  <Icon {...p}>
    <path d="M6 3.5h12v17l-2.2-1.4L13.6 20l-1.6-1.4L10.4 20l-2.2-1.4L6 20.5V3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M9 8h6M9 11.5h6M9 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </Icon>
);
const IconBarChart = (p) => (
  <Icon {...p}>
    <path d="M5 20V11M12 20V4M19 20v-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </Icon>
);
const IconCrown = (p) => (
  <Icon {...p}>
    <path d="M4 17.5h16l-1.4-8.2-4.1 3.4L12 6l-2.5 6.7-4.1-3.4L4 17.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M5.5 20h13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </Icon>
);
const IconSettings = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 3.8v2.1M12 18.1v2.1M20.2 12h-2.1M5.9 12H3.8M17.5 6.5l-1.5 1.5M8 16l-1.5 1.5M17.5 17.5 16 16M8 8 6.5 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </Icon>
);
const IconBell = (p) => (
  <Icon {...p}>
    <path d="M6 10.5a6 6 0 0 1 12 0c0 3.6 1 5 1.6 5.8H4.4C5 15.5 6 14.1 6 10.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M10 18.5a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </Icon>
);
const IconSearch = (p) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="m20 20-4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </Icon>
);
const IconChevronDown = (p) => (
  <Icon {...p}>
    <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);
const IconHelp = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M9.6 9.4a2.4 2.4 0 1 1 3.4 2.2c-.9.4-1 1-1 1.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="12" cy="17.1" r="1" fill="currentColor" />
  </Icon>
);
const IconLayers = (p) => (
  <Icon {...p}>
    <path d="m12 3.5 8 4.2-8 4.2-8-4.2 8-4.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="m4 12 8 4.2 8-4.2M4 15.8 12 20l8-4.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);
const IconUser = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.6" />
    <path d="M4.5 19.5c1.6-3.5 4.4-5.3 7.5-5.3s5.9 1.8 7.5 5.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </Icon>
);
const IconLogOut = (p) => (
  <Icon {...p}>
    <path d="M9 20H5.5a1.5 1.5 0 0 1-1.5-1.5v-13A1.5 1.5 0 0 1 5.5 4H9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M14.5 16.5 19 12l-4.5-4.5M19 12H9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);
const IconBook = (p) => (
  <Icon {...p}>
    <path d="M5 4.5h9.5a1.5 1.5 0 0 1 1.5 1.5v13.5H6.5A1.5 1.5 0 0 1 5 17.5V4.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M8 8.5h5M8 11.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </Icon>
);
const IconMail = (p) => (
  <Icon {...p}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="1.8" stroke="currentColor" strokeWidth="1.6" />
    <path d="m4.5 6.5 7.5 6 7.5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);
const IconChevronDownSm = IconChevronDown;
const IconCalendar = (p) => (
  <Icon {...p}>
    <rect x="3.5" y="5.2" width="17" height="15.3" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </Icon>
);
const IconScale = (p) => (
  <Icon {...p}>
    <path d="M12 3.5v17M7 6.5h10M4.5 6.5 2.5 12a2.5 2.5 0 0 0 5 0L5.5 6.5ZM19.5 6.5l-2 5.5a2.5 2.5 0 0 0 5 0l-2-5.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);
const IconFileSpreadsheet = (p) => (
  <Icon {...p}>
    <path d="M7 3.5h7l4 4V19.5A1.5 1.5 0 0 1 16.5 21h-9A1.5 1.5 0 0 1 6 19.5V5A1.5 1.5 0 0 1 7 3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M9 12.5h6M9 15.5h6M9 12.5v6M12 12.5v6M15 12.5v6" stroke="currentColor" strokeWidth="1.3" />
  </Icon>
);
const IconFileText = (p) => (
  <Icon {...p}>
    <path d="M7 3.5h7l4 4V19.5A1.5 1.5 0 0 1 16.5 21h-9A1.5 1.5 0 0 1 6 19.5V5A1.5 1.5 0 0 1 7 3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M9 12h6M9 15h6M9 18h3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </Icon>
);

/* ---------------------------------------------------------------- */
/* Static config                                                     */
/* ---------------------------------------------------------------- */

const NAV_ITEMS = [
  { label: "Dashboard", icon: IconHome },
  { label: "Transactions", icon: IconList },
  { label: "Accounts", icon: IconWalletNav },
  { label: "Budget", icon: IconPieChart },
  { label: "Bills", icon: IconReceipt },
  { label: "Reports", icon: IconBarChart },
  { label: "Subscription", icon: IconCrown },
];

const NOTIFICATIONS = [
  { title: "Electricity bill due", sub: "3 days left · $140" },
  { title: "Budget limit reached", sub: "Groceries · 92% used" },
];

const TRIAL_TOTAL_DAYS = 30;
const TRIAL_DAYS_LEFT = 15;
const RING_R = 22;
const RING_C = 2 * Math.PI * RING_R;
const RING_OFFSET = RING_C * (1 - TRIAL_DAYS_LEFT / TRIAL_TOTAL_DAYS);

const CATEGORY_COLORS = ["#2f6fed", "#6d5ff7", "#ef4444", "#16a34a", "#f59e0b", "#06b6d4", "#ec4899", "#84766b"];

const MONTH_LABELS = { "2026-03": "Mar", "2026-04": "Apr", "2026-05": "May", "2026-06": "Jun", "2026-07": "Jul", "2026-08": "Aug" };

/* ---------------------------------------------------------------- */
/* Formatting helpers                                                 */
/* ---------------------------------------------------------------- */

function formatMoney(n) {
  const sign = n < 0 ? "-" : "";
  return `${sign}₹${Math.abs(Number(n || 0)).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatCompact(n) {
  return new Intl.NumberFormat("en-IN", { notation: "compact", maximumFractionDigits: 1 }).format(n);
}

function monthLabel(monthKey) {
  const [year, month] = monthKey.split("-");
  return `${MONTH_LABELS[monthKey] || month} '${year.slice(2)}`;
}

/* ---------------------------------------------------------------- */
/* Main page                                                          */
/* ---------------------------------------------------------------- */

const NAV_ROUTES = {
  Dashboard: "/Dashboard",
  Transactions: "/Transactions",
  Accounts: "/Accounts",
  Budget: "/Budgets",
  Bills: "/Bills",
  Reports: "/Reports",
  Subscription: "/Subscription",
  Settings: "/Settings",
};

export default function Reports() {
  const [active] = useState("Reports");
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const handleNavigate = (label) => {
    const route = NAV_ROUTES[label];
    if (route) navigate(route);
  };
  const handleLogout = () => {
    signOut();
    navigate("/", { replace: true });
  };
  const [openMenu, setOpenMenu] = useState(null);
  const wrapRef = useRef(null);

  const [dateFrom, setDateFrom] = useState(() => {
    const d = new Date();
    d.setMonth(d.getMonth() - 5, 1);
    return d.toISOString().slice(0, 10);
  });
  const [dateTo, setDateTo] = useState(() => new Date().toISOString().slice(0, 10));
  const [accountFilter, setAccountFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [rawTransactions, setRawTransactions] = useState([]);
  const [accountsList, setAccountsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const defaultDateFrom = useMemo(() => {
    const d = new Date();
    d.setMonth(d.getMonth() - 5, 1);
    return d.toISOString().slice(0, 10);
  }, []);
  const defaultDateTo = useMemo(() => new Date().toISOString().slice(0, 10), []);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const [txData, accs] = await Promise.all([
          listTransactions({ limit: 1000 }),
          listAccounts(),
        ]);
        if (cancelled) return;
        const mapped = (txData.items || [])
          .filter((t) => t.type !== "transfer")
          .map((t) => ({
            id: t._id,
            type: t.type,
            date: (t.date || "").slice(0, 10),
            account: t.account?.name || "Unknown",
            category: t.category?.name || "Uncategorized",
            amount: t.amount,
          }));
        setRawTransactions(mapped);
        setAccountsList(accs.map((a) => a.name));
      } catch (err) {
        if (!cancelled) setError(err.message || "Unable to load report data");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const allCategories = useMemo(
    () => Array.from(new Set(rawTransactions.map((t) => t.category))).sort(),
    [rawTransactions]
  );


  const toggleMenu = (name) => setOpenMenu((cur) => (cur === name ? null : name));

  useEffect(() => {
    if (!openMenu) return;
    const onDocClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpenMenu(null);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [openMenu]);

  const clearFilters = () => {
    setDateFrom(defaultDateFrom);
    setDateTo(defaultDateTo);
    setAccountFilter("All");
    setCategoryFilter("All");
  };
  const hasFilters = accountFilter !== "All" || categoryFilter !== "All" || dateFrom !== defaultDateFrom || dateTo !== defaultDateTo;

  /* ---------------- Filtered dataset (transfers excluded) ---------------- */
  const filtered = useMemo(() => {
    return rawTransactions.filter((t) => {
      if (dateFrom && t.date < dateFrom) return false;
      if (dateTo && t.date > dateTo) return false;
      if (accountFilter !== "All" && t.account !== accountFilter) return false;
      if (categoryFilter !== "All" && t.category !== categoryFilter) return false;
      return true;
    });
  }, [rawTransactions, dateFrom, dateTo, accountFilter, categoryFilter]);

  /* ---------------- Totals ---------------- */
  const totals = useMemo(() => {
    const income = filtered.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const expense = filtered.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    return { income, expense, net: income - expense };
  }, [filtered]);

  /* ---------------- Monthly summary (also used for Income vs Expense chart) ---------------- */
  const monthly = useMemo(() => {
    const map = {};
    filtered.forEach((t) => {
      const key = t.date.slice(0, 7);
      if (!map[key]) map[key] = { key, income: 0, expense: 0 };
      map[key][t.type === "income" ? "income" : "expense"] += t.amount;
    });
    return Object.values(map)
      .sort((a, b) => (a.key < b.key ? -1 : 1))
      .map((m) => ({ ...m, label: monthLabel(m.key), net: m.income - m.expense }));
  }, [filtered]);

  /* ---------------- Category-wise expense breakdown ---------------- */
  const categoryBreakdown = useMemo(() => {
    const map = {};
    filtered.filter((t) => t.type === "expense").forEach((t) => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
    const totalExpense = Object.values(map).reduce((s, v) => s + v, 0) || 1;
    return Object.entries(map)
      .map(([category, amount], i) => ({ category, amount, pct: (amount / totalExpense) * 100, color: CATEGORY_COLORS[i % CATEGORY_COLORS.length] }))
      .sort((a, b) => b.amount - a.amount);
  }, [filtered]);

  /* ---------------- Account-wise report ---------------- */
  const accountBreakdown = useMemo(() => {
    const map = {};
    filtered.forEach((t) => {
      if (!map[t.account]) map[t.account] = { account: t.account, income: 0, expense: 0 };
      map[t.account][t.type === "income" ? "income" : "expense"] += t.amount;
    });
    return Object.values(map)
      .map((a) => ({ ...a, net: a.income - a.expense }))
      .sort((a, b) => (b.income + b.expense) - (a.income + a.expense));
  }, [filtered]);

  const maxMonthly = Math.max(1, ...monthly.map((m) => Math.max(m.income, m.expense)));

  /* ---------------- Export handlers ---------------- */
  const handleExportCSV = () => {
    const header = ["Date", "Type", "Category", "Account", "Amount"];
    const rows = filtered
      .slice()
      .sort((a, b) => (a.date < b.date ? -1 : 1))
      .map((t) => [t.date, t.type, t.category, t.account, t.amount]);
    const csv = [header, ...rows].map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `prakura-report-${dateFrom}_to_${dateTo}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Uses the browser's native print dialog (Save as PDF) so the report
  // exports without adding a PDF-generation dependency to the project.
  // Swap for a library like jsPDF here if a pixel-exact export is needed.
  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="dash-app" ref={wrapRef}>
      {/* ---------------- Sidebar ---------------- */}
      <aside className="sidebar rp-no-print">
        <div className="sidebar-brand">
          <div className="brand-logo">P</div>
          <span className="brand-name">Prakura</span>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map(({ label, icon: ItemIcon }) => (
            <button key={label} type="button" className={`nav-item ${active === label ? "nav-item-active" : ""}`} onClick={() => handleNavigate(label)}>
              <ItemIcon size={16} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button type="button" className="nav-item" onClick={() => handleNavigate("Settings")}>
            <IconSettings size={16} />
            <span>Settings</span>
          </button>

          <div className="trial-card">
            <div className="trial-ring-wrap">
              <svg width="56" height="56" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r={RING_R} fill="none" stroke="#eef0f5" strokeWidth="5" />
                <circle
                  cx="28" cy="28" r={RING_R} fill="none" stroke="#2f6fed" strokeWidth="5" strokeLinecap="round"
                  strokeDasharray={RING_C} strokeDashoffset={RING_OFFSET} transform="rotate(-90 28 28)"
                />
                <text x="28" y="31" textAnchor="middle" className="trial-ring-text">{TRIAL_DAYS_LEFT}</text>
              </svg>
            </div>
            <div className="trial-text">
              <p className="trial-title">Free trial</p>
              <p className="trial-sub">{TRIAL_DAYS_LEFT} days left</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ---------------- Main column ---------------- */}
      <div className="dash-main">
        <header className="topbar rp-no-print">
          <div className="search-box">
            <IconSearch size={15} />
            <input type="text" placeholder="Search" />
          </div>

          <div className="topbar-actions">
            <div className="dropdown-wrap">
              <button type="button" className="icon-btn" aria-label="Help" onClick={() => toggleMenu("help")}>
                <IconHelp size={16} />
              </button>
              {openMenu === "help" && (
                <div className="dropdown-panel dropdown-right">
                  <p className="dropdown-title">Help &amp; support</p>
                  <button type="button" className="dropdown-item"><IconBook size={14} /> Help center</button>
                  <button type="button" className="dropdown-item"><IconMail size={14} /> Contact support</button>
                </div>
              )}
            </div>

            <div className="dropdown-wrap">
              <button type="button" className="icon-btn bell-btn" aria-label="Notifications" onClick={() => toggleMenu("bell")}>
                <IconBell size={16} />
                <span className="badge">2</span>
              </button>
              {openMenu === "bell" && (
                <div className="dropdown-panel dropdown-right dropdown-wide">
                  <p className="dropdown-title">Notifications</p>
                  {NOTIFICATIONS.map((n) => (
                    <div className="notif-row" key={n.title}>
                      <p className="notif-title">{n.title}</p>
                      <p className="notif-sub">{n.sub}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="dropdown-wrap">
              <button type="button" className="icon-btn" aria-label="Apps" onClick={() => toggleMenu("apps")}>
                <IconLayers size={16} />
              </button>
              {openMenu === "apps" && (
                <div className="dropdown-panel dropdown-right">
                  <p className="dropdown-title">Quick links</p>
                  <button type="button" className="dropdown-item"><IconReceipt size={14} /> Bills</button>
                  <button type="button" className="dropdown-item"><IconList size={14} /> Transactions</button>
                </div>
              )}
            </div>

            <div className="dropdown-wrap">
              <button type="button" className="avatar-btn" onClick={() => toggleMenu("avatar")}>
                <span className="avatar-circle">P</span>
                <IconChevronDown size={13} />
              </button>
              {openMenu === "avatar" && (
                <div className="dropdown-panel dropdown-right">
                  <p className="dropdown-title">Prakura account</p>
                  <button type="button" className="dropdown-item" onClick={() => navigate("/Profile")}><IconUser size={14} /> Profile</button>
                  <button type="button" className="dropdown-item" onClick={() => navigate("/Settings")}><IconSettings size={14} /> Account settings</button>
                  <div className="dropdown-divider" />
                  <button type="button" className="dropdown-item dropdown-item-danger" onClick={handleLogout}><IconLogOut size={14} /> Log out</button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="dash-content rp-content">
          <div className="dash-title-row rp-no-print">
            <h1>Reports</h1>
            <div className="rp-export-actions">
              <button type="button" className="rp-export-btn" onClick={handleExportCSV}>
                <IconFileSpreadsheet size={15} /> Export CSV
              </button>
              <button type="button" className="rp-export-btn" onClick={handleExportPDF}>
                <IconFileText size={15} /> Export PDF
              </button>
            </div>
          </div>

          <p className="rp-print-title">Prakura ExpenseOS — Report ({dateFrom} to {dateTo})</p>

          {error && (
            <p className="welcome-subtitle rp-no-print" style={{ color: "#ef4444", fontWeight: 600 }}>
              {error}
            </p>
          )}
          {loading && <p className="notif-sub rp-no-print">Loading report data...</p>}

          {/* ---------------- Filters ---------------- */}
          <div className="rp-filters-panel rp-no-print">
            <div className="rp-filter-select-wrap">
              <IconCalendar size={13} />
              <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} aria-label="From date" />
            </div>
            <span className="rp-filter-dash">–</span>
            <div className="rp-filter-select-wrap">
              <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} aria-label="To date" />
            </div>

            <div className="rp-filter-select-wrap">
              <select value={accountFilter} onChange={(e) => setAccountFilter(e.target.value)}>
                <option value="All">All accounts</option>
                {accountsList.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
              <IconChevronDownSm size={13} />
            </div>

            <div className="rp-filter-select-wrap">
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                <option value="All">All categories</option>
                {allCategories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <IconChevronDownSm size={13} />
            </div>

            {hasFilters && (
              <button type="button" className="rp-clear-filters" onClick={clearFilters}>Clear</button>
            )}
          </div>

          {/* ---------------- Totals ---------------- */}
          <div className="stats-row rp-stats-row">
            <div className="stat-card">
              <span className="stat-label">Total income</span>
              <div className="stat-value-row">
                <span className="stat-value stat-green">{formatMoney(totals.income)}</span>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-label">Total expenses</span>
              <div className="stat-value-row">
                <span className="stat-value stat-red">{formatMoney(totals.expense)}</span>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-label">Net amount</span>
              <div className="stat-value-row">
                <span className={`stat-value ${totals.net >= 0 ? "stat-green" : "stat-red"}`}>{formatMoney(totals.net)}</span>
              </div>
            </div>
          </div>

          {/* ---------------- Income vs Expense ---------------- */}
          <section className="panel rp-panel">
            <div className="panel-header">
              <h2><IconScale size={14} className="rp-header-icon" /> Income vs Expense</h2>
            </div>
            {monthly.length === 0 ? (
              <p className="rp-empty-note">No data for the selected filters.</p>
            ) : (
              <>
                <div className="rp-legend">
                  <span className="rp-legend-item"><span className="rp-legend-dot rp-legend-green" /> Income</span>
                  <span className="rp-legend-item"><span className="rp-legend-dot rp-legend-red" /> Expense</span>
                </div>
                <div className="bar-chart rp-bar-chart">
                  <div className="bar-chart-yaxis">
                    <span>{formatCompact(maxMonthly)}</span>
                    <span>{formatCompact(maxMonthly / 2)}</span>
                    <span>0</span>
                  </div>
                  <div className="bar-chart-bars-wrap">
                    {monthly.map((m) => (
                      <div className="bar-group" key={m.key}>
                        <div className="bar rp-bar rp-bar-income" style={{ height: `${(m.income / maxMonthly) * 100}%` }} title={`Income: ${formatMoney(m.income)}`} />
                        <div className="bar rp-bar rp-bar-expense" style={{ height: `${(m.expense / maxMonthly) * 100}%` }} title={`Expense: ${formatMoney(m.expense)}`} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bar-chart-labels rp-bar-labels">
                  {monthly.map((m) => <span key={m.key}>{m.label}</span>)}
                </div>
              </>
            )}
          </section>

          <div className="rp-two-col">
            {/* ---------------- Category-wise expense ---------------- */}
            <section className="panel rp-panel">
              <div className="panel-header">
                <h2><IconPieChart size={14} className="rp-header-icon" /> Category-wise expenses</h2>
              </div>
              {categoryBreakdown.length === 0 ? (
                <p className="rp-empty-note">No expenses for the selected filters.</p>
              ) : (
                <ul className="rp-category-list">
                  {categoryBreakdown.map((c) => (
                    <li key={c.category} className="rp-category-row">
                      <div className="rp-category-top">
                        <span className="rp-category-name">
                          <span className="rp-category-dot" style={{ background: c.color }} />
                          {c.category}
                        </span>
                        <span className="rp-category-amount">{formatMoney(c.amount)}</span>
                      </div>
                      <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${c.pct}%`, background: c.color }} />
                      </div>
                      <span className="rp-category-pct">{c.pct.toFixed(1)}%</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* ---------------- Account-wise report ---------------- */}
            <section className="panel rp-panel">
              <div className="panel-header">
                <h2><IconWalletNav size={14} className="rp-header-icon" /> Account-wise report</h2>
              </div>
              {accountBreakdown.length === 0 ? (
                <p className="rp-empty-note">No data for the selected filters.</p>
              ) : (
                <div className="rp-table-wrap">
                  <table className="rp-table">
                    <thead>
                      <tr>
                        <th>Account</th>
                        <th className="rp-col-num">Income</th>
                        <th className="rp-col-num">Expenses</th>
                        <th className="rp-col-num">Net</th>
                      </tr>
                    </thead>
                    <tbody>
                      {accountBreakdown.map((a) => (
                        <tr key={a.account}>
                          <td>{a.account}</td>
                          <td className="rp-col-num stat-green">{formatMoney(a.income)}</td>
                          <td className="rp-col-num stat-red">{formatMoney(a.expense)}</td>
                          <td className={`rp-col-num ${a.net >= 0 ? "stat-green" : "stat-red"}`}>{formatMoney(a.net)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>

          {/* ---------------- Monthly summary ---------------- */}
          <section className="panel rp-panel">
            <div className="panel-header">
              <h2><IconBarChart size={14} className="rp-header-icon" /> Monthly summary</h2>
            </div>
            {monthly.length === 0 ? (
              <p className="rp-empty-note">No data for the selected filters.</p>
            ) : (
              <div className="rp-table-wrap">
                <table className="rp-table">
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th className="rp-col-num">Income</th>
                      <th className="rp-col-num">Expenses</th>
                      <th className="rp-col-num">Net</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthly.map((m) => (
                      <tr key={m.key}>
                        <td>{m.label}</td>
                        <td className="rp-col-num stat-green">{formatMoney(m.income)}</td>
                        <td className="rp-col-num stat-red">{formatMoney(m.expense)}</td>
                        <td className={`rp-col-num ${m.net >= 0 ? "stat-green" : "stat-red"}`}>{formatMoney(m.net)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td>Total</td>
                      <td className="rp-col-num stat-green">{formatMoney(totals.income)}</td>
                      <td className="rp-col-num stat-red">{formatMoney(totals.expense)}</td>
                      <td className={`rp-col-num ${totals.net >= 0 ? "stat-green" : "stat-red"}`}>{formatMoney(totals.net)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
