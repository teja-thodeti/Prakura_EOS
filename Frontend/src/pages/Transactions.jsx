import React, { useState, useEffect, useRef, useMemo } from "react";
import "../styles/Dashboard.css";
import "../styles/Transactions.css";

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
const IconWallet = (p) => (
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
const IconPlus = (p) => (
  <Icon {...p}>
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </Icon>
);
const IconEdit = (p) => (
  <Icon {...p}>
    <path d="M15.5 4.5 19.5 8.5 8 20H4v-4L15.5 4.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </Icon>
);
const IconTrash = (p) => (
  <Icon {...p}>
    <path d="M5 7h14M9.5 7V5a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 14.5 5v2M7 7l1 12.5A1.5 1.5 0 0 0 9.5 21h5a1.5 1.5 0 0 0 1.5-1.5L17 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);
const IconEye = (p) => (
  <Icon {...p}>
    <path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
  </Icon>
);
const IconX = (p) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </Icon>
);
const IconCheck = (p) => (
  <Icon {...p}>
    <path d="m5 12.5 4.5 4.5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);
const IconArrowUpRight = (p) => (
  <Icon {...p}>
    <path d="M7 17 17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);
const IconArrowDownLeft = (p) => (
  <Icon {...p}>
    <path d="M17 7 7 17M7 17h8M7 17V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);
const IconRepeat = (p) => (
  <Icon {...p}>
    <path d="M4 8h11.5L13 5.5M20 16H8.5L11 18.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);
const IconCalendar = (p) => (
  <Icon {...p}>
    <rect x="3.5" y="5.2" width="17" height="15.3" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </Icon>
);
const IconUpload = (p) => (
  <Icon {...p}>
    <path d="M12 15.5V5M8 8.5 12 4l4 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 16v2.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </Icon>
);
const IconTag = (p) => (
  <Icon {...p}>
    <path d="M11.6 4.5H6A1.5 1.5 0 0 0 4.5 6v5.6c0 .4.2.8.4 1.1l8 8a1.5 1.5 0 0 0 2.1 0l5.2-5.2a1.5 1.5 0 0 0 0-2.1l-8-8a1.5 1.5 0 0 0-1-.4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="8.7" cy="8.7" r="1.2" fill="currentColor" />
  </Icon>
);
const IconAlertTriangle = (p) => (
  <Icon {...p}>
    <path d="M12 4.5 21 19.5H3L12 4.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M12 10v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="16.7" r="1" fill="currentColor" />
  </Icon>
);

/* ---------------------------------------------------------------- */
/* Static config / sample data                                       */
/* ---------------------------------------------------------------- */

const NAV_ITEMS = [
  { label: "Dashboard", icon: IconHome },
  { label: "Transactions", icon: IconList },
  { label: "Accounts", icon: IconWallet },
  { label: "Budget", icon: IconPieChart },
  { label: "Bills", icon: IconReceipt },
  { label: "Reports", icon: IconBarChart },
  { label: "Subscription", icon: IconCrown },
];

const NOTIFICATIONS = [
  { title: "Electricity bill due", sub: "3 days left · $140" },
  { title: "Budget limit reached", sub: "Groceries · 92% used" },
];

const EXPENSE_CATEGORIES = ["Food", "Shopping", "Rent", "EMI / Loans", "Utilities", "Travel", "Entertainment", "Education", "Healthcare", "Subscriptions", "Other"];
const INCOME_CATEGORIES = ["Salary", "Bonus", "Freelance", "Business", "Cashback", "Refund", "Reimbursement", "Interest", "Dividend", "Deposit", "Other"];
const ACCOUNTS = ["HDFC Bank •• 4521", "Cash Wallet", "ICICI Credit Card •• 8890", "SBI Savings •• 1122", "Zerodha Investment"];
const PAYMENT_METHODS = ["Bank Transfer", "UPI", "Cash", "Credit Card", "Debit Card", "Cheque", "Auto-debit", "Other"];

const TRIAL_TOTAL_DAYS = 30;
const TRIAL_DAYS_LEFT = 15;
const RING_R = 22;
const RING_C = 2 * Math.PI * RING_R;
const RING_OFFSET = RING_C * (1 - TRIAL_DAYS_LEFT / TRIAL_TOTAL_DAYS);

const uid = () => Math.random().toString(36).slice(2, 10);

const SEED_TRANSACTIONS = [
  { id: uid(), type: "expense", amount: 1240, date: "2026-08-24", account: "HDFC Bank •• 4521", category: "Food", merchant: "Swiggy", paymentMethod: "UPI", notes: "Team lunch order", tags: ["work", "lunch"], receiptName: "swiggy_240826.pdf", reimbursable: true, taxDeductible: false },
  { id: uid(), type: "income", amount: 82000, date: "2026-08-23", account: "HDFC Bank •• 4521", category: "Salary", merchant: "Prakura Technologies Pvt Ltd", paymentMethod: "Bank Transfer", notes: "August salary credit", tags: ["salary"], receiptName: null, reimbursable: false, taxDeductible: false },
  { id: uid(), type: "transfer", amount: 15000, date: "2026-08-22", fromAccount: "HDFC Bank •• 4521", toAccount: "Zerodha Investment", category: "", merchant: "Monthly SIP top-up", paymentMethod: "Bank Transfer", notes: "", tags: ["investing"], receiptName: null, reimbursable: false, taxDeductible: false },
  { id: uid(), type: "expense", amount: 3499, date: "2026-08-21", account: "ICICI Credit Card •• 8890", category: "Shopping", merchant: "Amazon", paymentMethod: "Credit Card", notes: "Office chair cushion", tags: [], receiptName: "amazon_inv_9981.pdf", reimbursable: false, taxDeductible: false },
  { id: uid(), type: "expense", amount: 21500, date: "2026-08-20", account: "HDFC Bank •• 4521", category: "Rent", merchant: "Ravi Kumar (Landlord)", paymentMethod: "Bank Transfer", notes: "August rent", tags: ["housing"], receiptName: null, reimbursable: false, taxDeductible: false },
  { id: uid(), type: "income", amount: 6400, date: "2026-08-18", account: "Cash Wallet", category: "Cashback", merchant: "Paytm Cashback", paymentMethod: "UPI", notes: "", tags: [], receiptName: null, reimbursable: false, taxDeductible: false },
  { id: uid(), type: "expense", amount: 599, date: "2026-08-17", account: "ICICI Credit Card •• 8890", category: "Subscriptions", merchant: "Netflix", paymentMethod: "Credit Card", notes: "Monthly plan", tags: ["entertainment", "recurring"], receiptName: null, reimbursable: false, taxDeductible: false },
  { id: uid(), type: "income", amount: 18500, date: "2026-08-15", account: "HDFC Bank •• 4521", category: "Freelance", merchant: "Kestrel Studio", paymentMethod: "Bank Transfer", notes: "UI design project — milestone 2", tags: ["freelance", "design"], receiptName: "invoice_014.pdf", reimbursable: false, taxDeductible: true },
  { id: uid(), type: "expense", amount: 2120, date: "2026-08-12", account: "SBI Savings •• 1122", category: "Utilities", merchant: "BESCOM Electricity", paymentMethod: "Auto-debit", notes: "", tags: ["bills"], receiptName: null, reimbursable: false, taxDeductible: false },
  { id: uid(), type: "expense", amount: 780, date: "2026-08-10", account: "Cash Wallet", category: "Travel", merchant: "Ola Cabs", paymentMethod: "Cash", notes: "Airport drop", tags: [], receiptName: null, reimbursable: true, taxDeductible: false },
];

const CATEGORY_ICON_BG = {
  Food: "purple", Shopping: "blue", Rent: "red", "EMI / Loans": "red", Utilities: "blue",
  Travel: "purple", Entertainment: "purple", Education: "blue", Healthcare: "red",
  Subscriptions: "purple", Other: "blue", Salary: "green", Bonus: "green", Freelance: "green",
  Business: "green", Cashback: "green", Refund: "green", Reimbursement: "green",
  Interest: "green", Dividend: "green", Deposit: "green",
};

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function formatAmount(n) {
  return Number(n || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function emptyDraft(type = "expense") {
  return {
    id: null,
    type,
    amount: "",
    date: new Date().toISOString().slice(0, 10),
    account: "",
    fromAccount: "",
    toAccount: "",
    category: "",
    merchant: "",
    paymentMethod: "",
    notes: "",
    tags: [],
    receiptName: null,
    reimbursable: false,
    taxDeductible: false,
  };
}

/* ---------------------------------------------------------------- */
/* Main page                                                         */
/* ---------------------------------------------------------------- */

export default function Transactions() {
  const [active] = useState("Transactions");
  const [openMenu, setOpenMenu] = useState(null);
  const wrapRef = useRef(null);

  const [transactions, setTransactions] = useState(SEED_TRANSACTIONS);

  // Filters
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [accountFilter, setAccountFilter] = useState("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Drawer: { mode: "view" | "add" | "edit", transaction }
  const [drawer, setDrawer] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const toggleMenu = (name) => setOpenMenu((cur) => (cur === name ? null : name));

  useEffect(() => {
    if (!openMenu) return;
    const onDocClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpenMenu(null);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [openMenu]);

  const allCategories = useMemo(
    () => Array.from(new Set([...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES])).sort(),
    []
  );

  const filtered = useMemo(() => {
    return transactions
      .filter((t) => {
        if (typeFilter !== "All" && t.type !== typeFilter.toLowerCase()) return false;
        if (categoryFilter !== "All" && t.category !== categoryFilter) return false;
        if (accountFilter !== "All") {
          const matchesAccount =
            t.account === accountFilter || t.fromAccount === accountFilter || t.toAccount === accountFilter;
          if (!matchesAccount) return false;
        }
        if (dateFrom && t.date < dateFrom) return false;
        if (dateTo && t.date > dateTo) return false;
        if (search.trim()) {
          const q = search.trim().toLowerCase();
          const haystack = [t.merchant, t.category, t.notes, t.account, t.fromAccount, t.toAccount, ...(t.tags || [])]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();
          if (!haystack.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [transactions, typeFilter, categoryFilter, accountFilter, dateFrom, dateTo, search]);

  const openAdd = () => setDrawer({ mode: "add", transaction: emptyDraft() });
  const openView = (t) => setDrawer({ mode: "view", transaction: t });
  const openEdit = (t) => setDrawer({ mode: "edit", transaction: { ...t } });
  const closeDrawer = () => setDrawer(null);

  const saveTransaction = (draft) => {
    if (draft.id) {
      setTransactions((list) => list.map((t) => (t.id === draft.id ? draft : t)));
    } else {
      setTransactions((list) => [{ ...draft, id: uid() }, ...list]);
    }
    setDrawer(null);
  };

  const requestDelete = (t) => setDeleteTarget(t);
  const confirmDelete = () => {
    setTransactions((list) => list.filter((t) => t.id !== deleteTarget.id));
    if (drawer && drawer.transaction && drawer.transaction.id === deleteTarget.id) setDrawer(null);
    setDeleteTarget(null);
  };

  const clearFilters = () => {
    setSearch("");
    setTypeFilter("All");
    setCategoryFilter("All");
    setAccountFilter("All");
    setDateFrom("");
    setDateTo("");
  };

  const hasActiveFilters =
    search || typeFilter !== "All" || categoryFilter !== "All" || accountFilter !== "All" || dateFrom || dateTo;

  return (
    <div className="dash-app" ref={wrapRef}>
      {/* ---------------- Sidebar ---------------- */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo">P</div>
          <span className="brand-name">Prakura</span>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map(({ label, icon: ItemIcon }) => (
            <button key={label} type="button" className={`nav-item ${active === label ? "nav-item-active" : ""}`}>
              <ItemIcon size={16} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button type="button" className="nav-item">
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
        <header className="topbar">
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
                  <button type="button" className="dropdown-item"><IconBarChart size={14} /> Reports</button>
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
                  <button type="button" className="dropdown-item"><IconUser size={14} /> Profile</button>
                  <button type="button" className="dropdown-item"><IconSettings size={14} /> Account settings</button>
                  <div className="dropdown-divider" />
                  <button type="button" className="dropdown-item dropdown-item-danger"><IconLogOut size={14} /> Log out</button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="dash-content tx-content">
          <div className="dash-title-row">
            <h1>Transactions</h1>
            <button type="button" className="tx-add-btn" onClick={openAdd}>
              <IconPlus size={15} /> Add Transaction
            </button>
          </div>

          {/* ---------------- Filters ---------------- */}
          <div className="tx-filters-panel">
            <div className="search-box tx-search-box">
              <IconSearch size={15} />
              <input
                type="text"
                placeholder="Search merchant, notes, tags..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="tx-type-pills">
              {["All", "Expense", "Income", "Transfer"].map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`tx-type-pill ${typeFilter === t ? "tx-type-pill-active" : ""}`}
                  onClick={() => setTypeFilter(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="tx-filter-selects">
              <div className="tx-filter-select-wrap">
                <IconCalendar size={13} />
                <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} aria-label="From date" />
              </div>
              <span className="tx-filter-dash">–</span>
              <div className="tx-filter-select-wrap">
                <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} aria-label="To date" />
              </div>

              <div className="tx-filter-select-wrap">
                <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                  <option value="All">All categories</option>
                  {allCategories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <IconChevronDown size={13} />
              </div>

              <div className="tx-filter-select-wrap">
                <select value={accountFilter} onChange={(e) => setAccountFilter(e.target.value)}>
                  <option value="All">All accounts</option>
                  {ACCOUNTS.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
                <IconChevronDown size={13} />
              </div>

              {hasActiveFilters && (
                <button type="button" className="tx-clear-filters" onClick={clearFilters}>
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* ---------------- Desktop table ---------------- */}
          <div className="tx-table-wrap">
            <table className="tx-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Account</th>
                  <th>Payment method</th>
                  <th className="tx-col-amount">Amount</th>
                  <th className="tx-col-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr key={t.id} className="tx-row" onClick={() => openView(t)}>
                    <td className="tx-cell-date">{formatDate(t.date)}</td>
                    <td>
                      <div className="tx-desc-cell">
                        <span className={`tx-type-icon tx-type-icon-${t.type}`}>
                          {t.type === "expense" && <IconArrowUpRight size={13} />}
                          {t.type === "income" && <IconArrowDownLeft size={13} />}
                          {t.type === "transfer" && <IconRepeat size={13} />}
                        </span>
                        <div>
                          <p className="tx-desc-title">{t.merchant || "—"}</p>
                          <p className="tx-desc-sub">{t.type === "transfer" ? "Transfer" : t.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="tx-cell-account">
                      {t.type === "transfer" ? (
                        <span className="tx-transfer-accounts">
                          {t.fromAccount} <span className="tx-transfer-arrow">→</span> {t.toAccount}
                        </span>
                      ) : (
                        t.account
                      )}
                    </td>
                    <td className="tx-cell-method">{t.paymentMethod || "—"}</td>
                    <td className="tx-col-amount">
                      <span className={`tx-amount tx-amount-${t.type}`}>
                        {t.type === "expense" ? "-" : t.type === "income" ? "+" : ""}₹{formatAmount(t.amount)}
                      </span>
                      {t.type === "transfer" && <span className="tx-not-counted">Not counted</span>}
                    </td>
                    <td className="tx-col-actions">
                      <div className="tx-row-actions" onClick={(e) => e.stopPropagation()}>
                        <button type="button" className="tx-icon-btn" aria-label="View" onClick={() => openView(t)}>
                          <IconEye size={14} />
                        </button>
                        <button type="button" className="tx-icon-btn" aria-label="Edit" onClick={() => openEdit(t)}>
                          <IconEdit size={14} />
                        </button>
                        <button type="button" className="tx-icon-btn tx-icon-btn-danger" aria-label="Delete" onClick={() => requestDelete(t)}>
                          <IconTrash size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="tx-empty">
                <p>No transactions match your filters.</p>
                {hasActiveFilters && (
                  <button type="button" className="tx-clear-filters" onClick={clearFilters}>
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </div>

          {/* ---------------- Mobile cards ---------------- */}
          <div className="tx-cards">
            {filtered.map((t) => (
              <div className="tx-card" key={t.id} onClick={() => openView(t)}>
                <div className="tx-card-top">
                  <span className={`tx-type-icon tx-type-icon-${t.type}`}>
                    {t.type === "expense" && <IconArrowUpRight size={13} />}
                    {t.type === "income" && <IconArrowDownLeft size={13} />}
                    {t.type === "transfer" && <IconRepeat size={13} />}
                  </span>
                  <div className="tx-card-title-block">
                    <p className="tx-desc-title">{t.merchant || "—"}</p>
                    <p className="tx-desc-sub">{t.type === "transfer" ? "Transfer" : t.category} · {formatDate(t.date)}</p>
                  </div>
                  <div className="tx-card-amount-block">
                    <span className={`tx-amount tx-amount-${t.type}`}>
                      {t.type === "expense" ? "-" : t.type === "income" ? "+" : ""}₹{formatAmount(t.amount)}
                    </span>
                    {t.type === "transfer" && <span className="tx-not-counted">Not counted</span>}
                  </div>
                </div>
                <div className="tx-card-bottom">
                  <span className="tx-card-account">
                    {t.type === "transfer" ? `${t.fromAccount} → ${t.toAccount}` : t.account}
                  </span>
                  <div className="tx-row-actions" onClick={(e) => e.stopPropagation()}>
                    <button type="button" className="tx-icon-btn" aria-label="Edit" onClick={() => openEdit(t)}>
                      <IconEdit size={14} />
                    </button>
                    <button type="button" className="tx-icon-btn tx-icon-btn-danger" aria-label="Delete" onClick={() => requestDelete(t)}>
                      <IconTrash size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="tx-empty">
                <p>No transactions match your filters.</p>
                {hasActiveFilters && (
                  <button type="button" className="tx-clear-filters" onClick={clearFilters}>
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ---------------- Drawer: view / add / edit ---------------- */}
      {drawer && (
        <TransactionDrawer
          mode={drawer.mode}
          transaction={drawer.transaction}
          onClose={closeDrawer}
          onSave={saveTransaction}
          onEdit={() => setDrawer({ mode: "edit", transaction: drawer.transaction })}
          onDelete={() => requestDelete(drawer.transaction)}
        />
      )}

      {/* ---------------- Delete confirmation ---------------- */}
      {deleteTarget && (
        <div className="tx-modal-overlay" onClick={(e) => e.target === e.currentTarget && setDeleteTarget(null)}>
          <div className="tx-confirm-card" role="alertdialog" aria-modal="true">
            <span className="tx-confirm-icon"><IconAlertTriangle size={20} /></span>
            <h3 className="tx-confirm-title">Delete this transaction?</h3>
            <p className="tx-confirm-sub">
              {deleteTarget.merchant || "This transaction"} · ₹{formatAmount(deleteTarget.amount)} on {formatDate(deleteTarget.date)}.
              This action can't be undone.
            </p>
            <div className="tx-confirm-actions">
              <button type="button" className="tx-secondary-btn" onClick={() => setDeleteTarget(null)}>
                Cancel
              </button>
              <button type="button" className="tx-danger-btn" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Transaction drawer — view / add / edit                            */
/* ---------------------------------------------------------------- */

function TransactionDrawer({ mode, transaction, onClose, onSave, onEdit, onDelete }) {
  const [draft, setDraft] = useState(transaction);
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState({});
  const isView = mode === "view";

  useEffect(() => {
    setDraft(transaction);
    setErrors({});
  }, [transaction]);

  useEffect(() => {
    const onKeyDown = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const update = (key, value) => setDraft((d) => ({ ...d, [key]: value }));

  const addTag = () => {
    const val = tagInput.trim();
    if (val && !draft.tags.includes(val)) update("tags", [...draft.tags, val]);
    setTagInput("");
  };
  const removeTag = (tag) => update("tags", draft.tags.filter((t) => t !== tag));

  const handleReceiptChange = (e) => {
    const file = e.target.files && e.target.files[0];
    update("receiptName", file ? file.name : draft.receiptName);
  };

  const categoryOptions = draft.type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const validate = () => {
    const e = {};
    if (!draft.amount || Number(draft.amount) <= 0) e.amount = "Enter a valid amount";
    if (!draft.date) e.date = "Required";
    if (draft.type === "transfer") {
      if (!draft.fromAccount) e.fromAccount = "Required";
      if (!draft.toAccount) e.toAccount = "Required";
      if (draft.fromAccount && draft.toAccount && draft.fromAccount === draft.toAccount) {
        e.toAccount = "Must differ from source account";
      }
    } else {
      if (!draft.account) e.account = "Required";
      if (!draft.category) e.category = "Required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({ ...draft, amount: Number(draft.amount) });
  };

  const title = mode === "add" ? "Add Transaction" : mode === "edit" ? "Edit Transaction" : "Transaction Details";

  return (
    <div className="tx-drawer-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="tx-drawer" role="dialog" aria-modal="true" aria-labelledby="tx-drawer-title">
        <div className="tx-drawer-header">
          <h2 id="tx-drawer-title">{title}</h2>
          <button type="button" className="tx-modal-close" onClick={onClose} aria-label="Close">
            <IconX size={16} />
          </button>
        </div>

        <div className="tx-drawer-body">
          {isView ? (
            <TransactionViewBody t={draft} />
          ) : (
            <TransactionForm draft={draft} update={update} errors={errors} categoryOptions={categoryOptions}
              tagInput={tagInput} setTagInput={setTagInput} addTag={addTag} removeTag={removeTag}
              handleReceiptChange={handleReceiptChange}
            />
          )}
        </div>

        <div className="tx-drawer-footer">
          {isView ? (
            <>
              <button type="button" className="tx-danger-btn" onClick={onDelete}>
                <IconTrash size={14} /> Delete
              </button>
              <button type="button" className="signin-btn" onClick={onEdit}>
                <IconEdit size={14} /> Edit Transaction
              </button>
            </>
          ) : (
            <>
              <button type="button" className="tx-secondary-btn" onClick={onClose}>
                Cancel
              </button>
              <button type="button" className="signin-btn" onClick={handleSave}>
                Save Transaction
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- View body ---------------- */

function TransactionViewBody({ t }) {
  const rows = [];
  rows.push(["Type", t.type.charAt(0).toUpperCase() + t.type.slice(1)]);
  rows.push(["Amount", `₹${formatAmount(t.amount)}`]);
  rows.push(["Date", formatDate(t.date)]);
  if (t.type === "transfer") {
    rows.push(["From account", t.fromAccount]);
    rows.push(["To account", t.toAccount]);
  } else {
    rows.push(["Account", t.account]);
    rows.push(["Category", t.category]);
  }
  rows.push([t.type === "income" ? "Sender / Source" : "Merchant", t.merchant || "—"]);
  rows.push(["Payment method", t.paymentMethod || "—"]);
  if (t.type !== "transfer") {
    rows.push(["Reimbursable", t.reimbursable ? "Yes" : "No"]);
    rows.push(["Tax-deductible", t.taxDeductible ? "Yes" : "No"]);
  }

  return (
    <div className="tx-view">
      <div className={`tx-view-amount-banner tx-view-amount-${t.type}`}>
        <span className={`tx-type-icon tx-type-icon-${t.type}`}>
          {t.type === "expense" && <IconArrowUpRight size={16} />}
          {t.type === "income" && <IconArrowDownLeft size={16} />}
          {t.type === "transfer" && <IconRepeat size={16} />}
        </span>
        <div>
          <p className="tx-view-amount">
            {t.type === "expense" ? "-" : t.type === "income" ? "+" : ""}₹{formatAmount(t.amount)}
          </p>
          {t.type === "transfer" && <p className="tx-not-counted">Transfers aren't counted as income or expense</p>}
        </div>
      </div>

      <dl className="tx-view-list">
        {rows.map(([label, value]) => (
          <div className="tx-view-row" key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      {t.tags && t.tags.length > 0 && (
        <div className="tx-view-tags">
          {t.tags.map((tag) => (
            <span className="tx-tag-chip" key={tag}><IconTag size={11} /> {tag}</span>
          ))}
        </div>
      )}

      {t.notes && (
        <div className="tx-view-notes">
          <p className="tx-view-notes-label">Notes</p>
          <p className="tx-view-notes-body">{t.notes}</p>
        </div>
      )}

      {t.receiptName && (
        <div className="tx-view-receipt">
          <IconReceipt size={14} /> {t.receiptName}
        </div>
      )}
    </div>
  );
}

/* ---------------- Add / edit form ---------------- */

function TransactionForm({ draft, update, errors, categoryOptions, tagInput, setTagInput, addTag, removeTag, handleReceiptChange }) {
  const isTransfer = draft.type === "transfer";

  return (
    <div className="tx-form">
      <div className="tx-field">
        <label className="field-label">Type</label>
        <div className="tx-type-pills tx-type-pills-form">
          {["expense", "income", "transfer"].map((ty) => (
            <button
              key={ty}
              type="button"
              className={`tx-type-pill ${draft.type === ty ? "tx-type-pill-active" : ""}`}
              onClick={() => update("type", ty)}
            >
              {ty.charAt(0).toUpperCase() + ty.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="tx-field-row">
        <div style={{ flex: 1 }}>
          <label className="field-label" htmlFor="tx-amount">Amount <span className="tx-required">*</span></label>
          <div className="input-wrap">
            <span className="input-icon tx-currency-prefix">₹</span>
            <input
              id="tx-amount" type="number" min="0" step="0.01" placeholder="0.00"
              value={draft.amount} onChange={(e) => update("amount", e.target.value)}
            />
          </div>
          {errors.amount && <p className="tx-error">{errors.amount}</p>}
        </div>
        <div style={{ flex: 1 }}>
          <label className="field-label" htmlFor="tx-date">Date <span className="tx-required">*</span></label>
          <div className="input-wrap">
            <span className="input-icon"><IconCalendar size={16} /></span>
            <input id="tx-date" type="date" value={draft.date} onChange={(e) => update("date", e.target.value)} />
          </div>
          {errors.date && <p className="tx-error">{errors.date}</p>}
        </div>
      </div>

      {isTransfer ? (
        <>
          <div className="tx-field-row">
            <div style={{ flex: 1 }}>
              <label className="field-label" htmlFor="tx-from">From account <span className="tx-required">*</span></label>
              <div className="input-wrap tx-select-wrap">
                <span className="input-icon"><IconWallet size={16} /></span>
                <select id="tx-from" className="tx-select" value={draft.fromAccount} onChange={(e) => update("fromAccount", e.target.value)}>
                  <option value="" disabled>Select account</option>
                  {ACCOUNTS.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
                <span className="tx-select-chevron"><IconChevronDown size={15} /></span>
              </div>
              {errors.fromAccount && <p className="tx-error">{errors.fromAccount}</p>}
            </div>
            <div style={{ flex: 1 }}>
              <label className="field-label" htmlFor="tx-to">To account <span className="tx-required">*</span></label>
              <div className="input-wrap tx-select-wrap">
                <span className="input-icon"><IconWallet size={16} /></span>
                <select id="tx-to" className="tx-select" value={draft.toAccount} onChange={(e) => update("toAccount", e.target.value)}>
                  <option value="" disabled>Select account</option>
                  {ACCOUNTS.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
                <span className="tx-select-chevron"><IconChevronDown size={15} /></span>
              </div>
              {errors.toAccount && <p className="tx-error">{errors.toAccount}</p>}
            </div>
          </div>
          <p className="tx-transfer-note">Transfers move money between your own accounts and are not counted as income or expense.</p>
        </>
      ) : (
        <div className="tx-field-row">
          <div style={{ flex: 1 }}>
            <label className="field-label" htmlFor="tx-account">Account <span className="tx-required">*</span></label>
            <div className="input-wrap tx-select-wrap">
              <span className="input-icon"><IconWallet size={16} /></span>
              <select id="tx-account" className="tx-select" value={draft.account} onChange={(e) => update("account", e.target.value)}>
                <option value="" disabled>Select account</option>
                {ACCOUNTS.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
              <span className="tx-select-chevron"><IconChevronDown size={15} /></span>
            </div>
            {errors.account && <p className="tx-error">{errors.account}</p>}
          </div>
          <div style={{ flex: 1 }}>
            <label className="field-label" htmlFor="tx-category">Category <span className="tx-required">*</span></label>
            <div className="input-wrap tx-select-wrap">
              <span className="input-icon"><IconPieChart size={16} /></span>
              <select id="tx-category" className="tx-select" value={draft.category} onChange={(e) => update("category", e.target.value)}>
                <option value="" disabled>Select category</option>
                {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <span className="tx-select-chevron"><IconChevronDown size={15} /></span>
            </div>
            {errors.category && <p className="tx-error">{errors.category}</p>}
          </div>
        </div>
      )}

      <div className="tx-field">
        <label className="field-label" htmlFor="tx-merchant">
          {draft.type === "income" ? "Sender / Source" : draft.type === "transfer" ? "Reference (optional)" : "Merchant"}
        </label>
        <div className="input-wrap">
          <span className="input-icon"><IconUser size={16} /></span>
          <input
            id="tx-merchant" type="text"
            placeholder={draft.type === "income" ? "e.g. Prakura Technologies" : draft.type === "transfer" ? "e.g. Monthly SIP" : "e.g. Amazon"}
            value={draft.merchant} onChange={(e) => update("merchant", e.target.value)}
          />
        </div>
      </div>

      <div className="tx-field">
        <label className="field-label" htmlFor="tx-method">Payment method</label>
        <div className="input-wrap tx-select-wrap">
          <span className="input-icon"><IconWallet size={16} /></span>
          <select id="tx-method" className="tx-select" value={draft.paymentMethod} onChange={(e) => update("paymentMethod", e.target.value)}>
            <option value="" disabled>Select method</option>
            {PAYMENT_METHODS.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <span className="tx-select-chevron"><IconChevronDown size={15} /></span>
        </div>
      </div>

      <div className="tx-field">
        <label className="field-label" htmlFor="tx-notes">Notes</label>
        <textarea
          id="tx-notes" className="tx-textarea" rows={3} placeholder="Add any extra detail..."
          value={draft.notes} onChange={(e) => update("notes", e.target.value)}
        />
      </div>

      <div className="tx-field">
        <label className="field-label">Tags</label>
        <div className="tx-tags-input-row">
          <div className="input-wrap tx-tags-input-wrap">
            <span className="input-icon"><IconTag size={16} /></span>
            <input
              type="text" placeholder="Type a tag and press Enter"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
            />
          </div>
          <button type="button" className="tx-secondary-btn tx-tag-add-btn" onClick={addTag}>Add</button>
        </div>
        {draft.tags.length > 0 && (
          <div className="tx-view-tags">
            {draft.tags.map((tag) => (
              <span className="tx-tag-chip tx-tag-chip-removable" key={tag}>
                {tag}
                <button type="button" onClick={() => removeTag(tag)} aria-label={`Remove ${tag}`}>
                  <IconX size={10} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="tx-field">
        <label className="field-label">Receipt</label>
        <label className="tx-upload-btn">
          <IconUpload size={15} />
          {draft.receiptName ? "Replace receipt" : "Upload receipt"}
          <input type="file" accept="image/*,.pdf" className="tx-file-input" onChange={handleReceiptChange} />
        </label>
        {draft.receiptName && <p className="tx-receipt-name"><IconReceipt size={13} /> {draft.receiptName}</p>}
      </div>

      {!isTransfer && (
        <div className="tx-field-row">
          <div style={{ flex: 1 }}>
            <label className="field-label">Reimbursable</label>
            <div className="tx-toggle-pills">
              {["Yes", "No"].map((opt) => {
                const val = opt === "Yes";
                return (
                  <button
                    key={opt} type="button"
                    className={`tx-choice-card tx-toggle-pill ${draft.reimbursable === val ? "tx-choice-card-active" : ""}`}
                    onClick={() => update("reimbursable", val)}
                  >
                    <span className="tx-choice-radio">{draft.reimbursable === val && <span className="tx-choice-radio-dot" />}</span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <label className="field-label">Tax-deductible</label>
            <div className="tx-toggle-pills">
              {["Yes", "No"].map((opt) => {
                const val = opt === "Yes";
                return (
                  <button
                    key={opt} type="button"
                    className={`tx-choice-card tx-toggle-pill ${draft.taxDeductible === val ? "tx-choice-card-active" : ""}`}
                    onClick={() => update("taxDeductible", val)}
                  >
                    <span className="tx-choice-radio">{draft.taxDeductible === val && <span className="tx-choice-radio-dot" />}</span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
