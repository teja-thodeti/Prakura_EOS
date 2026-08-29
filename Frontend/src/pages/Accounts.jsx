import React, { useState, useEffect, useRef, useMemo } from "react";
import "../styles/Dashboard.css";
import "../styles/Accounts.css";

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
    <path d="M4 7.5A1.5 1.5 0 0 1 5.5 6h11A1.5 1.5 0 0 1 18 7.5v1H5.5A1.5 1.5 0 0 1 4 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M4 8.5h14.5A1.5 1.5 0 0 1 20 10v8a1.5 1.5 0 0 1-1.5 1.5H5.5A1.5 1.5 0 0 1 4 18Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <circle cx="16" cy="14" r="1.1" fill="currentColor" />
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
const IconX = (p) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </Icon>
);
const IconCalendar = (p) => (
  <Icon {...p}>
    <rect x="3.5" y="5.2" width="17" height="15.3" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </Icon>
);
const IconBank = (p) => (
  <Icon {...p}>
    <path d="M4 10.5 12 5l8 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 10.5h14V19H5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M7.5 13v3.5M12 13v3.5M16.5 13v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M4 19.5h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </Icon>
);
const IconCreditCard = (p) => (
  <Icon {...p}>
    <rect x="3.5" y="6" width="17" height="12.5" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3.5 10.2h17" stroke="currentColor" strokeWidth="1.7" />
    <path d="M6.5 14.5h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </Icon>
);
const IconSmartphone = (p) => (
  <Icon {...p}>
    <rect x="7" y="3.2" width="10" height="17.6" rx="2.2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M10.5 17.3h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </Icon>
);
const IconBriefcase = (p) => (
  <Icon {...p}>
    <rect x="3.5" y="8" width="17" height="11.5" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M8.5 8V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M3.5 13h17" stroke="currentColor" strokeWidth="1.5" />
  </Icon>
);
const IconPercent = (p) => (
  <Icon {...p}>
    <circle cx="7.5" cy="7.5" r="2.3" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="16.5" cy="16.5" r="2.3" stroke="currentColor" strokeWidth="1.6" />
    <path d="M18 6 6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </Icon>
);
const IconArchive = (p) => (
  <Icon {...p}>
    <rect x="3.5" y="4.5" width="17" height="4.2" rx="1.3" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M4.7 8.9v9a1.6 1.6 0 0 0 1.6 1.6h11.4a1.6 1.6 0 0 0 1.6-1.6v-9" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M10 13h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </Icon>
);
const IconArchiveRestore = (p) => (
  <Icon {...p}>
    <rect x="3.5" y="4.5" width="17" height="4.2" rx="1.3" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M4.7 8.9v9a1.6 1.6 0 0 0 1.6 1.6h11.4a1.6 1.6 0 0 0 1.6-1.6v-9" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M12 11.3v5M9.6 13.4 12 11l2.4 2.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);
const IconInfo = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 11v5.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <circle cx="12" cy="8.3" r="1" fill="currentColor" />
  </Icon>
);

/* ---------------------------------------------------------------- */
/* Static config                                                     */
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

const ACCOUNT_TYPES = [
  { key: "Bank", label: "Bank", icon: IconBank, tone: "blue" },
  { key: "Cash Wallet", label: "Cash Wallet", icon: IconWallet, tone: "green" },
  { key: "Credit Card", label: "Credit Card", icon: IconCreditCard, tone: "red" },
  { key: "Digital Wallet", label: "Digital Wallet", icon: IconSmartphone, tone: "purple" },
  { key: "Salary Account", label: "Salary Account", icon: IconBriefcase, tone: "blue" },
  { key: "Loan Account", label: "Loan Account", icon: IconPercent, tone: "red" },
  { key: "Custom", label: "Custom", icon: IconLayers, tone: "purple" },
];

const CURRENCIES = ["INR", "USD", "EUR", "GBP", "AED", "SGD"];
const BASE_CURRENCY = "INR";
const CURRENCY_SYMBOL = { INR: "₹", USD: "$", EUR: "€", GBP: "£", AED: "AED ", SGD: "S$" };

const uid = () => Math.random().toString(36).slice(2, 10);

/* Seed data. `netMovement` stands in for the running total of every
   transaction booked against the account since it was created — in the
   full app this is kept in sync by the Transactions module (see
   `applyTransactionDelta` below). Current balance is always derived,
   never stored, so an opening-balance adjustment recalculates it
   automatically without touching transaction history. */
const SEED_ACCOUNTS = [
  { id: uid(), name: "HDFC Bank •• 4521", type: "Bank", currency: "INR", openingBalance: 50000, netMovement: 32000, includeInTotal: true, archived: false, lastUpdated: "2026-08-24", notes: "Primary salary account" },
  { id: uid(), name: "Cash Wallet", type: "Cash Wallet", currency: "INR", openingBalance: 2000, netMovement: 3400, includeInTotal: true, archived: false, lastUpdated: "2026-08-18", notes: "" },
  { id: uid(), name: "ICICI Credit Card •• 8890", type: "Credit Card", currency: "INR", openingBalance: 0, netMovement: -4098, includeInTotal: true, archived: false, lastUpdated: "2026-08-21", notes: "Billing cycle ends on the 28th" },
  { id: uid(), name: "SBI Savings •• 1122", type: "Bank", currency: "INR", openingBalance: 120000, netMovement: -2120, includeInTotal: true, archived: false, lastUpdated: "2026-08-12", notes: "" },
  { id: uid(), name: "Payroll Account •• 7734", type: "Salary Account", currency: "INR", openingBalance: 0, netMovement: 82000, includeInTotal: true, archived: false, lastUpdated: "2026-08-23", notes: "" },
  { id: uid(), name: "Zerodha Investment", type: "Custom", currency: "INR", openingBalance: 40000, netMovement: 15000, includeInTotal: true, archived: false, lastUpdated: "2026-08-22", notes: "Brokerage cash ledger" },
  { id: uid(), name: "HDFC Home Loan", type: "Loan Account", currency: "INR", openingBalance: -1850000, netMovement: 25000, includeInTotal: false, archived: false, lastUpdated: "2026-08-05", notes: "Excluded from net worth total by default" },
  { id: uid(), name: "PayPal Wallet", type: "Digital Wallet", currency: "USD", openingBalance: 120, netMovement: 35, includeInTotal: true, archived: false, lastUpdated: "2026-08-19", notes: "Freelance receipts" },
  { id: uid(), name: "Old Postpaid Wallet", type: "Digital Wallet", currency: "INR", openingBalance: 500, netMovement: -500, includeInTotal: false, archived: true, lastUpdated: "2026-06-02", notes: "Closed — kept for records" },
];

/* ---------------------------------------------------------------- */
/* Helpers                                                            */
/* ---------------------------------------------------------------- */

function getCurrentBalance(acc) {
  return Number(acc.openingBalance || 0) + Number(acc.netMovement || 0);
}

function typeMeta(typeKey) {
  return ACCOUNT_TYPES.find((t) => t.key === typeKey) || ACCOUNT_TYPES[ACCOUNT_TYPES.length - 1];
}

function formatMoney(n, currency) {
  const symbol = CURRENCY_SYMBOL[currency] || "";
  const abs = Math.abs(Number(n || 0)).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${n < 0 ? "-" : ""}${symbol}${abs}`;
}

function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function emptyDraft() {
  return {
    id: null,
    name: "",
    type: "Bank",
    currency: BASE_CURRENCY,
    openingBalance: "",
    includeInTotal: true,
    notes: "",
  };
}

/* Integration point: call this from the Transactions module whenever a
   transaction is created, edited, or deleted, so account balances stay
   correct without ever touching the stored opening balance. */
function applyTransactionDelta(accounts, accountId, delta) {
  const today = new Date().toISOString().slice(0, 10);
  return accounts.map((a) =>
    a.id === accountId ? { ...a, netMovement: a.netMovement + delta, lastUpdated: today } : a
  );
}

/* ---------------------------------------------------------------- */
/* Main page                                                         */
/* ---------------------------------------------------------------- */

export default function Accounts() {
  const [active] = useState("Accounts");
  const [openMenu, setOpenMenu] = useState(null);
  const wrapRef = useRef(null);

  const [accounts, setAccounts] = useState(SEED_ACCOUNTS);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("Active");

  const [drawer, setDrawer] = useState(null); // { mode: "add" | "edit", account }
  const [archiveTarget, setArchiveTarget] = useState(null);

  const toggleMenu = (name) => setOpenMenu((cur) => (cur === name ? null : name));

  useEffect(() => {
    if (!openMenu) return;
    const onDocClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpenMenu(null);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [openMenu]);

  const filtered = useMemo(() => {
    return accounts
      .filter((a) => {
        if (statusFilter === "Active" && a.archived) return false;
        if (statusFilter === "Archived" && !a.archived) return false;
        if (typeFilter !== "All" && a.type !== typeFilter) return false;
        if (search.trim()) {
          const q = search.trim().toLowerCase();
          if (!`${a.name} ${a.type}`.toLowerCase().includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => (a.archived === b.archived ? a.name.localeCompare(b.name) : a.archived ? 1 : -1));
  }, [accounts, search, typeFilter, statusFilter]);

  const totalIncluded = useMemo(() => {
    const included = accounts.filter((a) => !a.archived && a.includeInTotal && a.currency === BASE_CURRENCY);
    const sum = included.reduce((acc, a) => acc + getCurrentBalance(a), 0);
    const otherCurrencyCount = accounts.filter(
      (a) => !a.archived && a.includeInTotal && a.currency !== BASE_CURRENCY
    ).length;
    return { sum, count: included.length, otherCurrencyCount };
  }, [accounts]);

  const openAdd = () => setDrawer({ mode: "add", account: emptyDraft() });
  const openEdit = (a) =>
    setDrawer({
      mode: "edit",
      account: { ...a, openingBalance: String(a.openingBalance) },
    });
  const closeDrawer = () => setDrawer(null);

  const saveAccount = (draft) => {
    const today = new Date().toISOString().slice(0, 10);
    const openingBalance = Number(draft.openingBalance);

    if (draft.id) {
      setAccounts((list) =>
        list.map((a) =>
          a.id === draft.id
            ? { ...a, name: draft.name, type: draft.type, currency: draft.currency, openingBalance, includeInTotal: draft.includeInTotal, notes: draft.notes, lastUpdated: today }
            : a
        )
      );
    } else {
      setAccounts((list) => [
        {
          id: uid(),
          name: draft.name,
          type: draft.type,
          currency: draft.currency,
          openingBalance,
          netMovement: 0,
          includeInTotal: draft.includeInTotal,
          archived: false,
          lastUpdated: today,
          notes: draft.notes,
        },
        ...list,
      ]);
    }
    setDrawer(null);
  };

  const toggleIncludeInTotal = (id) => {
    const today = new Date().toISOString().slice(0, 10);
    setAccounts((list) =>
      list.map((a) => (a.id === id ? { ...a, includeInTotal: !a.includeInTotal, lastUpdated: today } : a))
    );
  };

  const requestArchive = (a) => setArchiveTarget(a);
  const confirmArchiveToggle = () => {
    const today = new Date().toISOString().slice(0, 10);
    setAccounts((list) =>
      list.map((a) => (a.id === archiveTarget.id ? { ...a, archived: !a.archived, lastUpdated: today } : a))
    );
    if (drawer && drawer.account && drawer.account.id === archiveTarget.id) setDrawer(null);
    setArchiveTarget(null);
  };

  const clearFilters = () => {
    setSearch("");
    setTypeFilter("All");
    setStatusFilter("Active");
  };

  const hasActiveFilters = search || typeFilter !== "All" || statusFilter !== "Active";

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

        <main className="dash-content acc-content">
          <div className="dash-title-row">
            <h1>Accounts</h1>
            <button type="button" className="tx-add-btn" onClick={openAdd}>
              <IconPlus size={15} /> Add Account
            </button>
          </div>

          {/* ---------------- Total balance summary ---------------- */}
          <div className="acc-summary-card">
            <div className="acc-summary-main">
              <p className="acc-summary-label">Total balance across included accounts</p>
              <p className={`acc-summary-value ${totalIncluded.sum < 0 ? "acc-summary-value-neg" : ""}`}>
                {formatMoney(totalIncluded.sum, BASE_CURRENCY)}
              </p>
              <p className="acc-summary-sub">
                {totalIncluded.count} account{totalIncluded.count === 1 ? "" : "s"} included
                {totalIncluded.otherCurrencyCount > 0 && (
                  <> · {totalIncluded.otherCurrencyCount} in other currencies, not added to this total</>
                )}
              </p>
            </div>
            <div className="acc-summary-icon">
              <IconWallet size={22} />
            </div>
          </div>

          {/* ---------------- Filters ---------------- */}
          <div className="tx-filters-panel">
            <div className="search-box tx-search-box">
              <IconSearch size={15} />
              <input
                type="text"
                placeholder="Search accounts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="tx-type-pills">
              {["Active", "Archived", "All"].map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`tx-type-pill ${statusFilter === s ? "tx-type-pill-active" : ""}`}
                  onClick={() => setStatusFilter(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="tx-filter-selects">
              <div className="tx-filter-select-wrap">
                <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                  <option value="All">All account types</option>
                  {ACCOUNT_TYPES.map((t) => (
                    <option key={t.key} value={t.key}>{t.label}</option>
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

          {/* ---------------- Account cards ---------------- */}
          <div className="acc-grid">
            {filtered.map((a) => (
              <AccountCard
                key={a.id}
                account={a}
                onEdit={() => openEdit(a)}
                onToggleInclude={() => toggleIncludeInTotal(a.id)}
                onArchiveToggle={() => requestArchive(a)}
              />
            ))}

            {filtered.length === 0 && (
              <div className="tx-empty acc-empty">
                <p>No accounts match your filters.</p>
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

      {/* ---------------- Add / Edit drawer ---------------- */}
      {drawer && (
        <AccountDrawer
          mode={drawer.mode}
          account={drawer.account}
          onClose={closeDrawer}
          onSave={saveAccount}
          onArchive={() => requestArchive(accounts.find((a) => a.id === drawer.account.id))}
        />
      )}

      {/* ---------------- Archive / unarchive confirmation ---------------- */}
      {archiveTarget && (
        <div className="tx-modal-overlay" onClick={(e) => e.target === e.currentTarget && setArchiveTarget(null)}>
          <div className="tx-confirm-card" role="alertdialog" aria-modal="true">
            <span className="tx-confirm-icon">
              {archiveTarget.archived ? <IconArchiveRestore size={20} /> : <IconArchive size={20} />}
            </span>
            <h3 className="tx-confirm-title">
              {archiveTarget.archived ? "Unarchive this account?" : "Archive this account?"}
            </h3>
            <p className="tx-confirm-sub">
              {archiveTarget.archived ? (
                <>
                  {archiveTarget.name} will reappear in your active accounts list and can be included in your total balance again.
                </>
              ) : (
                <>
                  {archiveTarget.name} will be hidden from active lists and excluded from your total balance. Its balance and history are kept, and you can unarchive it anytime.
                </>
              )}
            </p>
            <div className="tx-confirm-actions">
              <button type="button" className="tx-secondary-btn" onClick={() => setArchiveTarget(null)}>
                Cancel
              </button>
              <button
                type="button"
                className={archiveTarget.archived ? "signin-btn" : "tx-danger-btn"}
                onClick={confirmArchiveToggle}
              >
                {archiveTarget.archived ? "Unarchive" : "Archive"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Account card                                                      */
/* ---------------------------------------------------------------- */

function AccountCard({ account: a, onEdit, onToggleInclude, onArchiveToggle }) {
  const meta = typeMeta(a.type);
  const TypeIcon = meta.icon;
  const balance = getCurrentBalance(a);

  return (
    <div className={`acc-card ${a.archived ? "acc-card-archived" : ""}`}>
      <div className="acc-card-top">
        <span className={`acc-type-icon acc-type-icon-${meta.tone}`}>
          <TypeIcon size={17} />
        </span>
        <div className="acc-card-title-block">
          <p className="acc-card-name">{a.name}</p>
          <p className="acc-card-type">{meta.label}</p>
        </div>
        {a.archived && <span className="acc-badge acc-badge-archived">Archived</span>}
      </div>

      <div className="acc-card-balance">
        <p className={`acc-balance-value ${balance < 0 ? "acc-balance-value-neg" : ""}`}>
          {formatMoney(balance, a.currency)}
        </p>
        <p className="acc-balance-label">Current balance</p>
      </div>

      <dl className="acc-card-meta">
        <div className="acc-card-meta-row">
          <dt>Opening balance</dt>
          <dd>{formatMoney(a.openingBalance, a.currency)}</dd>
        </div>
        <div className="acc-card-meta-row">
          <dt>Currency</dt>
          <dd>{a.currency}</dd>
        </div>
        <div className="acc-card-meta-row">
          <dt>Last updated</dt>
          <dd><IconCalendar size={11} /> {formatDate(a.lastUpdated)}</dd>
        </div>
      </dl>

      <div className="acc-card-toggle-row">
        <span className="acc-toggle-label">Include in total balance</span>
        <button
          type="button"
          className={`acc-switch ${a.includeInTotal ? "acc-switch-on" : ""}`}
          role="switch"
          aria-checked={a.includeInTotal}
          aria-label="Include in total balance"
          disabled={a.archived}
          onClick={onToggleInclude}
        >
          <span className="acc-switch-thumb" />
        </button>
      </div>

      <div className="acc-card-actions">
        <button type="button" className="tx-secondary-btn acc-card-btn" onClick={onEdit}>
          <IconEdit size={13} /> Edit
        </button>
        <button
          type="button"
          className={`acc-card-btn ${a.archived ? "signin-btn" : "tx-danger-btn"}`}
          onClick={onArchiveToggle}
        >
          {a.archived ? <IconArchiveRestore size={13} /> : <IconArchive size={13} />}
          {a.archived ? "Unarchive" : "Archive"}
        </button>
      </div>
    </div>
  );
}


function AccountDrawer({ mode, account, onClose, onSave, onArchive }) {
  const [draft, setDraft] = useState(account);
  const [errors, setErrors] = useState({});
  const isEdit = mode === "edit";

  useEffect(() => {
    setDraft(account);
    setErrors({});
  }, [account]);

  useEffect(() => {
    const onKeyDown = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const update = (key, value) => setDraft((d) => ({ ...d, [key]: value }));

  const validate = () => {
    const e = {};
    if (!draft.name.trim()) e.name = "Enter an account name";
    if (draft.openingBalance === "" || Number.isNaN(Number(draft.openingBalance))) e.openingBalance = "Enter a valid amount";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave(draft);
  };

  const previewBalance = isEdit
    ? Number(draft.openingBalance || 0) + Number(account.netMovement || 0)
    : Number(draft.openingBalance || 0);

  const meta = typeMeta(draft.type);

  return (
    <div className="tx-drawer-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="tx-drawer" role="dialog" aria-modal="true" aria-labelledby="acc-drawer-title">
        <div className="tx-drawer-header">
          <h2 id="acc-drawer-title">{isEdit ? "Edit Account" : "Add Account"}</h2>
          <button type="button" className="tx-modal-close" onClick={onClose} aria-label="Close">
            <IconX size={16} />
          </button>
        </div>

        <div className="tx-drawer-body">
          <div className="tx-form">
            <div className="tx-field">
              <label className="field-label" htmlFor="acc-name">Account name <span className="tx-required">*</span></label>
              <div className="input-wrap">
                <span className="input-icon"><meta.icon size={16} /></span>
                <input
                  id="acc-name" type="text" placeholder="e.g. HDFC Bank •• 4521"
                  value={draft.name} onChange={(e) => update("name", e.target.value)}
                />
              </div>
              {errors.name && <p className="tx-error">{errors.name}</p>}
            </div>

            <div className="tx-field">
              <label className="field-label">Account type</label>
              <div className="acc-type-grid">
                {ACCOUNT_TYPES.map((t) => {
                  const TIcon = t.icon;
                  return (
                    <button
                      key={t.key}
                      type="button"
                      className={`tx-choice-card acc-type-choice ${draft.type === t.key ? "tx-choice-card-active" : ""}`}
                      onClick={() => update("type", t.key)}
                    >
                      <TIcon size={15} />
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="tx-field-row">
              <div style={{ flex: 1 }}>
                <label className="field-label" htmlFor="acc-currency">Currency</label>
                <div className="input-wrap tx-select-wrap">
                  <select id="acc-currency" className="tx-select" style={{ paddingLeft: 14 }} value={draft.currency} onChange={(e) => update("currency", e.target.value)}>
                    {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <span className="tx-select-chevron"><IconChevronDown size={15} /></span>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <label className="field-label" htmlFor="acc-opening">Opening balance <span className="tx-required">*</span></label>
                <div className="input-wrap">
                  <span className="input-icon tx-currency-prefix">{CURRENCY_SYMBOL[draft.currency] || ""}</span>
                  <input
                    id="acc-opening" type="number" step="0.01" placeholder="0.00"
                    value={draft.openingBalance} onChange={(e) => update("openingBalance", e.target.value)}
                  />
                </div>
                {errors.openingBalance && <p className="tx-error">{errors.openingBalance}</p>}
              </div>
            </div>

            <div className="acc-balance-preview">
              <IconInfo size={14} />
              {isEdit ? (
                <span>
                  Current balance updates to <strong>{formatMoney(previewBalance, draft.currency)}</strong> automatically —
                  recorded transactions on this account are kept as-is.
                </span>
              ) : (
                <span>
                  This account will start with a current balance of <strong>{formatMoney(previewBalance, draft.currency)}</strong>.
                </span>
              )}
            </div>

            <div className="tx-field acc-include-field">
              <div className="acc-card-toggle-row acc-form-toggle-row">
                <span className="acc-toggle-label">Include in total balance</span>
                <button
                  type="button"
                  className={`acc-switch ${draft.includeInTotal ? "acc-switch-on" : ""}`}
                  role="switch"
                  aria-checked={draft.includeInTotal}
                  onClick={() => update("includeInTotal", !draft.includeInTotal)}
                >
                  <span className="acc-switch-thumb" />
                </button>
              </div>
            </div>

            <div className="tx-field">
              <label className="field-label" htmlFor="acc-notes">Notes</label>
              <textarea
                id="acc-notes" className="tx-textarea" rows={3} placeholder="Optional notes about this account..."
                value={draft.notes} onChange={(e) => update("notes", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="tx-drawer-footer">
          {isEdit && (
            <button type="button" className="tx-danger-btn" onClick={onArchive}>
              <IconArchive size={14} /> Archive
            </button>
          )}
          <button type="button" className="tx-secondary-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="signin-btn" onClick={handleSave}>
            {isEdit ? "Save Changes" : "Add Account"}
          </button>
        </div>
      </div>
    </div>
  );
}

export { applyTransactionDelta, getCurrentBalance };
