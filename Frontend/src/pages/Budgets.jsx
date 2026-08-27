import React, { useState, useEffect, useRef, useMemo } from "react";
import "../styles/Dashboard.css";
import "../styles/Transactions.css";
import "../styles/Budgets.css";

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
const IconChevronLeft = (p) => (
  <Icon {...p}>
    <path d="m15 6-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);
const IconChevronRight = (p) => (
  <Icon {...p}>
    <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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
const IconX = (p) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </Icon>
);
const IconAlertTriangle = (p) => (
  <Icon {...p}>
    <path d="M12 4.5 21 19.5H3L12 4.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M12 10v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="16.7" r="1" fill="currentColor" />
  </Icon>
);
const IconAlertCircle = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 7.3v5.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="16.2" r="1" fill="currentColor" />
  </Icon>
);
const IconCheckCircle = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="m8.3 12.3 2.6 2.6 4.8-5.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);
const IconTarget = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="4.6" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="1.2" fill="currentColor" />
  </Icon>
);
const IconSliders = (p) => (
  <Icon {...p}>
    <path d="M4 7h9M17 7h3M4 17h3M11 17h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="14" cy="7" r="2.1" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="8" cy="17" r="2.1" stroke="currentColor" strokeWidth="1.6" />
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

const EXPENSE_CATEGORIES = ["Food", "Shopping", "Rent", "EMI / Loans", "Utilities", "Travel", "Entertainment", "Education", "Healthcare", "Subscriptions", "Other"];

const CATEGORY_TONE = {
  Food: "purple", Shopping: "blue", Rent: "red", "EMI / Loans": "red", Utilities: "blue",
  Travel: "purple", Entertainment: "purple", Education: "blue", Healthcare: "red",
  Subscriptions: "purple", Other: "blue",
};

const DEFAULT_THRESHOLD = 80;

const uid = () => Math.random().toString(36).slice(2, 10);

function monthLabel(ym) {
  const [y, m] = ym.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}

function shiftMonth(ym, delta) {
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

/* Seed data. `spent` stands in for the running total of expense
   transactions booked against a budget's category (or the whole month,
   for an overall budget) — in the full app this is kept in sync by the
   Transactions module (see `applyExpenseToBudget` below), never edited
   directly here. */
const SEED_BUDGETS = [
  { id: uid(), scope: "overall", category: null, month: "2026-08", amount: 60000, spent: 52680, threshold: 80 },
  { id: uid(), scope: "category", category: "Food", month: "2026-08", amount: 8000, spent: 7450, threshold: 80 },
  { id: uid(), scope: "category", category: "Shopping", month: "2026-08", amount: 5000, spent: 6120, threshold: 80 },
  { id: uid(), scope: "category", category: "Rent", month: "2026-08", amount: 22000, spent: 21500, threshold: 90 },
  { id: uid(), scope: "category", category: "Utilities", month: "2026-08", amount: 3000, spent: 2120, threshold: 80 },
  { id: uid(), scope: "category", category: "Travel", month: "2026-08", amount: 2500, spent: 780, threshold: 80 },
  { id: uid(), scope: "category", category: "Entertainment", month: "2026-08", amount: 1500, spent: 599, threshold: 80 },
  { id: uid(), scope: "category", category: "Healthcare", month: "2026-08", amount: 2000, spent: 0, threshold: 80 },
  { id: uid(), scope: "overall", category: null, month: "2026-07", amount: 55000, spent: 54200, threshold: 80 },
  { id: uid(), scope: "category", category: "Food", month: "2026-07", amount: 7500, spent: 8100, threshold: 80 },
  { id: uid(), scope: "category", category: "Rent", month: "2026-07", amount: 21500, spent: 21500, threshold: 90 },
];

/* Integration point: call this from the Transactions module whenever an
   expense transaction is created, edited, or deleted, so budget "spent"
   figures stay correct without ever hand-editing them here. */
function applyExpenseToBudget(budgets, { category, month, delta }) {
  return budgets.map((b) => {
    const matchesCategory = b.scope === "category" && b.category === category && b.month === month;
    const matchesOverall = b.scope === "overall" && b.month === month;
    if (matchesCategory || matchesOverall) return { ...b, spent: Math.max(0, b.spent + delta) };
    return b;
  });
}

function status(pct, threshold) {
  if (pct >= 100) return "over";
  if (pct >= threshold) return "near";
  return "safe";
}

function formatAmount(n) {
  return Number(n || 0).toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function emptyDraft(month) {
  return {
    id: null,
    scope: "category",
    category: "",
    month,
    amount: "",
    threshold: DEFAULT_THRESHOLD,
  };
}

/* ---------------------------------------------------------------- */
/* Main page                                                         */
/* ---------------------------------------------------------------- */

export default function Budgets() {
  const [active] = useState("Budget");
  const [openMenu, setOpenMenu] = useState(null);
  const wrapRef = useRef(null);

  const [budgets, setBudgets] = useState(SEED_BUDGETS);
  const [month, setMonth] = useState("2026-08");
  const [scopeFilter, setScopeFilter] = useState("All");

  const [drawer, setDrawer] = useState(null); // { mode: "add" | "edit", budget }
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

  const monthBudgets = useMemo(() => budgets.filter((b) => b.month === month), [budgets, month]);
  const overallBudget = useMemo(() => monthBudgets.find((b) => b.scope === "overall") || null, [monthBudgets]);
  const categoryBudgets = useMemo(() => monthBudgets.filter((b) => b.scope === "category"), [monthBudgets]);

  const filteredCategoryBudgets = useMemo(() => {
    if (scopeFilter === "All") return categoryBudgets;
    if (scopeFilter === "Over budget") return categoryBudgets.filter((b) => (b.spent / b.amount) * 100 >= 100);
    if (scopeFilter === "Near limit") {
      return categoryBudgets.filter((b) => {
        const pct = (b.spent / b.amount) * 100;
        return pct >= b.threshold && pct < 100;
      });
    }
    return categoryBudgets;
  }, [categoryBudgets, scopeFilter]);

  const summary = useMemo(() => {
    const budgetedFromCategories = categoryBudgets.reduce((s, b) => s + b.amount, 0);
    const spentFromCategories = categoryBudgets.reduce((s, b) => s + b.spent, 0);
    const budgeted = overallBudget ? overallBudget.amount : budgetedFromCategories;
    const spent = overallBudget ? overallBudget.spent : spentFromCategories;
    const remaining = budgeted - spent;
    const pct = budgeted > 0 ? Math.min(999, (spent / budgeted) * 100) : 0;
    return { budgeted, spent, remaining, pct };
  }, [overallBudget, categoryBudgets]);

  const alerts = useMemo(() => {
    return monthBudgets
      .filter((b) => b.amount > 0)
      .map((b) => ({ ...b, pct: (b.spent / b.amount) * 100 }))
      .filter((b) => b.pct >= b.threshold)
      .sort((a, b) => b.pct - a.pct);
  }, [monthBudgets]);

  const openAdd = () => setDrawer({ mode: "add", budget: emptyDraft(month) });
  const openEdit = (b) => setDrawer({ mode: "edit", budget: { ...b, amount: String(b.amount) } });
  const closeDrawer = () => setDrawer(null);

  const saveBudget = (draft) => {
    const amount = Number(draft.amount);
    const threshold = Number(draft.threshold);
    if (draft.id) {
      setBudgets((list) =>
        list.map((b) =>
          b.id === draft.id
            ? { ...b, scope: draft.scope, category: draft.scope === "overall" ? null : draft.category, month: draft.month, amount, threshold }
            : b
        )
      );
    } else {
      setBudgets((list) => [
        {
          id: uid(),
          scope: draft.scope,
          category: draft.scope === "overall" ? null : draft.category,
          month: draft.month,
          amount,
          spent: 0,
          threshold,
        },
        ...list,
      ]);
    }
    setDrawer(null);
  };

  const requestDelete = (b) => setDeleteTarget(b);
  const confirmDelete = () => {
    setBudgets((list) => list.filter((b) => b.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const usedCategories = useMemo(
    () => new Set(categoryBudgets.map((b) => b.category)),
    [categoryBudgets]
  );

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

        <main className="dash-content bud-content">
          <div className="dash-title-row">
            <h1>Budgets</h1>
            <button type="button" className="tx-add-btn" onClick={openAdd}>
              <IconPlus size={15} /> Add Budget
            </button>
          </div>

          {/* ---------------- Month switcher ---------------- */}
          <div className="bud-month-switcher">
            <button type="button" className="bud-month-nav" aria-label="Previous month" onClick={() => setMonth((m) => shiftMonth(m, -1))}>
              <IconChevronLeft size={16} />
            </button>
            <span className="bud-month-label">{monthLabel(month)}</span>
            <button type="button" className="bud-month-nav" aria-label="Next month" onClick={() => setMonth((m) => shiftMonth(m, 1))}>
              <IconChevronRight size={16} />
            </button>
          </div>

          {/* ---------------- Current month summary ---------------- */}
          <div className={`bud-summary-card bud-summary-${status(summary.pct, overallBudget ? overallBudget.threshold : DEFAULT_THRESHOLD)}`}>
            <div className="bud-summary-stats">
              <div className="bud-summary-stat">
                <p className="bud-summary-stat-label">Budgeted</p>
                <p className="bud-summary-stat-value">₹{formatAmount(summary.budgeted)}</p>
              </div>
              <div className="bud-summary-stat">
                <p className="bud-summary-stat-label">Spent</p>
                <p className="bud-summary-stat-value">₹{formatAmount(summary.spent)}</p>
              </div>
              <div className="bud-summary-stat">
                <p className="bud-summary-stat-label">{summary.remaining < 0 ? "Over by" : "Remaining"}</p>
                <p className={`bud-summary-stat-value ${summary.remaining < 0 ? "bud-summary-stat-neg" : ""}`}>
                  ₹{formatAmount(Math.abs(summary.remaining))}
                </p>
              </div>
            </div>

            <div className="bud-progress-track bud-progress-track-lg">
              <div
                className={`bud-progress-fill bud-progress-fill-${status(summary.pct, overallBudget ? overallBudget.threshold : DEFAULT_THRESHOLD)}`}
                style={{ width: `${Math.min(100, summary.pct)}%` }}
              />
            </div>
            <div className="bud-summary-footer">
              <span>{summary.pct.toFixed(0)}% of {overallBudget ? "your overall budget" : "budgeted categories"} used</span>
              {summary.remaining < 0 && (
                <span className="bud-overspend-chip"><IconAlertTriangle size={11} /> Overspending</span>
              )}
            </div>
          </div>

          {/* ---------------- Threshold alerts ---------------- */}
          {alerts.length > 0 && (
            <div className="bud-alerts-panel">
              <div className="bud-alerts-header">
                <IconAlertCircle size={16} />
                <p>{alerts.length} budget{alerts.length === 1 ? "" : "s"} {alerts.length === 1 ? "has" : "have"} reached its alert threshold</p>
              </div>
              <div className="bud-alerts-list">
                {alerts.map((a) => (
                  <span key={a.id} className={`bud-alert-chip bud-alert-chip-${status(a.pct, a.threshold)}`}>
                    {a.scope === "overall" ? "Overall budget" : a.category} · {Math.min(999, a.pct).toFixed(0)}%
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ---------------- Category filter ---------------- */}
          <div className="tx-type-pills bud-scope-pills">
            {["All", "Near limit", "Over budget"].map((s) => (
              <button
                key={s}
                type="button"
                className={`tx-type-pill ${scopeFilter === s ? "tx-type-pill-active" : ""}`}
                onClick={() => setScopeFilter(s)}
              >
                {s}
              </button>
            ))}
          </div>

          {/* ---------------- Category budget cards ---------------- */}
          <div className="bud-grid">
            {overallBudget && scopeFilter === "All" && (
              <BudgetCard budget={overallBudget} onEdit={() => openEdit(overallBudget)} onDelete={() => requestDelete(overallBudget)} />
            )}
            {filteredCategoryBudgets.map((b) => (
              <BudgetCard key={b.id} budget={b} onEdit={() => openEdit(b)} onDelete={() => requestDelete(b)} />
            ))}

            {filteredCategoryBudgets.length === 0 && !(overallBudget && scopeFilter === "All") && (
              <div className="tx-empty bud-empty">
                <p>
                  {monthBudgets.length === 0
                    ? `No budgets set for ${monthLabel(month)} yet.`
                    : "No budgets match this filter."}
                </p>
                <button type="button" className="tx-clear-filters" onClick={openAdd}>
                  Add a budget
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ---------------- Add / Edit drawer ---------------- */}
      {drawer && (
        <BudgetDrawer
          mode={drawer.mode}
          budget={drawer.budget}
          usedCategories={usedCategories}
          onClose={closeDrawer}
          onSave={saveBudget}
        />
      )}

      {/* ---------------- Delete confirmation ---------------- */}
      {deleteTarget && (
        <div className="tx-modal-overlay" onClick={(e) => e.target === e.currentTarget && setDeleteTarget(null)}>
          <div className="tx-confirm-card" role="alertdialog" aria-modal="true">
            <span className="tx-confirm-icon"><IconAlertTriangle size={20} /></span>
            <h3 className="tx-confirm-title">Delete this budget?</h3>
            <p className="tx-confirm-sub">
              {deleteTarget.scope === "overall" ? "Your overall monthly budget" : `The ${deleteTarget.category} budget`} for{" "}
              {monthLabel(deleteTarget.month)} will be removed. This action can't be undone.
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
/* Budget card                                                       */
/* ---------------------------------------------------------------- */

function BudgetCard({ budget: b, onEdit, onDelete }) {
  const pct = b.amount > 0 ? (b.spent / b.amount) * 100 : 0;
  const st = status(pct, b.threshold);
  const remaining = b.amount - b.spent;
  const tone = b.scope === "overall" ? "blue" : CATEGORY_TONE[b.category] || "blue";

  return (
    <div className={`bud-card bud-card-${st}`}>
      <div className="bud-card-top">
        <span className={`bud-card-icon bud-card-icon-${tone}`}>
          {b.scope === "overall" ? <IconTarget size={16} /> : <IconPieChart size={16} />}
        </span>
        <div className="bud-card-title-block">
          <p className="bud-card-name">{b.scope === "overall" ? "Overall Monthly Budget" : b.category}</p>
          <p className="bud-card-sub">{monthLabel(b.month)}</p>
        </div>
        {st === "over" && <span className="bud-badge bud-badge-over"><IconAlertTriangle size={10} /> Over budget</span>}
        {st === "near" && <span className="bud-badge bud-badge-near"><IconAlertCircle size={10} /> Near limit</span>}
        {st === "safe" && <span className="bud-badge bud-badge-safe"><IconCheckCircle size={10} /> On track</span>}
      </div>

      <div className="bud-card-amounts">
        <span className="bud-card-spent">₹{formatAmount(b.spent)}</span>
        <span className="bud-card-of"> of ₹{formatAmount(b.amount)}</span>
      </div>

      <div className="bud-progress-track">
        <div className={`bud-progress-fill bud-progress-fill-${st}`} style={{ width: `${Math.min(100, pct)}%` }} />
      </div>

      <div className="bud-card-bottom">
        <span className={`bud-card-remaining ${remaining < 0 ? "bud-card-remaining-neg" : ""}`}>
          {remaining < 0
            ? <>₹{formatAmount(Math.abs(remaining))} over budget</>
            : <>₹{formatAmount(remaining)} remaining</>}
        </span>
        <span className="bud-card-pct">{Math.min(999, pct).toFixed(0)}%</span>
      </div>

      <div className="bud-card-actions">
        <button type="button" className="tx-icon-btn" aria-label="Edit budget" onClick={onEdit}>
          <IconEdit size={14} />
        </button>
        <button type="button" className="tx-icon-btn tx-icon-btn-danger" aria-label="Delete budget" onClick={onDelete}>
          <IconTrash size={14} />
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Add / edit drawer                                                 */
/* ---------------------------------------------------------------- */

function BudgetDrawer({ mode, budget, usedCategories, onClose, onSave }) {
  const [draft, setDraft] = useState(budget);
  const [errors, setErrors] = useState({});
  const isEdit = mode === "edit";

  useEffect(() => {
    setDraft(budget);
    setErrors({});
  }, [budget]);

  useEffect(() => {
    const onKeyDown = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const update = (key, value) => setDraft((d) => ({ ...d, [key]: value }));

  const availableCategories = EXPENSE_CATEGORIES.filter(
    (c) => c === draft.category || !usedCategories.has(c)
  );

  const validate = () => {
    const e = {};
    if (!draft.amount || Number(draft.amount) <= 0) e.amount = "Enter a valid amount";
    if (!draft.month) e.month = "Required";
    if (draft.scope === "category" && !draft.category) e.category = "Select a category";
    const th = Number(draft.threshold);
    if (Number.isNaN(th) || th < 1 || th > 100) e.threshold = "Enter 1–100";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave(draft);
  };

  return (
    <div className="tx-drawer-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="tx-drawer" role="dialog" aria-modal="true" aria-labelledby="bud-drawer-title">
        <div className="tx-drawer-header">
          <h2 id="bud-drawer-title">{isEdit ? "Edit Budget" : "Add Budget"}</h2>
          <button type="button" className="tx-modal-close" onClick={onClose} aria-label="Close">
            <IconX size={16} />
          </button>
        </div>

        <div className="tx-drawer-body">
          <div className="tx-form">
            <div className="tx-field">
              <label className="field-label">Budget type</label>
              <div className="tx-toggle-pills">
                {[
                  { key: "overall", label: "Overall Monthly" },
                  { key: "category", label: "Category" },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    className={`tx-choice-card tx-toggle-pill ${draft.scope === opt.key ? "tx-choice-card-active" : ""}`}
                    onClick={() => update("scope", opt.key)}
                    disabled={isEdit}
                  >
                    <span className="tx-choice-radio">{draft.scope === opt.key && <span className="tx-choice-radio-dot" />}</span>
                    {opt.label}
                  </button>
                ))}
              </div>
              {isEdit && <p className="bud-form-hint">Budget type can't be changed after creation — delete and recreate it instead.</p>}
            </div>

            <div className="tx-field-row">
              {draft.scope === "category" && (
                <div style={{ flex: 1 }}>
                  <label className="field-label" htmlFor="bud-category">Category <span className="tx-required">*</span></label>
                  <div className="input-wrap tx-select-wrap">
                    <span className="input-icon"><IconPieChart size={16} /></span>
                    <select id="bud-category" className="tx-select" value={draft.category} onChange={(e) => update("category", e.target.value)} disabled={isEdit}>
                      <option value="" disabled>Select category</option>
                      {availableCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <span className="tx-select-chevron"><IconChevronDown size={15} /></span>
                  </div>
                  {errors.category && <p className="tx-error">{errors.category}</p>}
                </div>
              )}
              <div style={{ flex: 1 }}>
                <label className="field-label" htmlFor="bud-month">Month <span className="tx-required">*</span></label>
                <div className="input-wrap">
                  <input id="bud-month" type="month" value={draft.month} onChange={(e) => update("month", e.target.value)} disabled={isEdit} style={{ paddingLeft: 14 }} />
                </div>
                {errors.month && <p className="tx-error">{errors.month}</p>}
              </div>
            </div>

            <div className="tx-field-row">
              <div style={{ flex: 1 }}>
                <label className="field-label" htmlFor="bud-amount">Budget amount <span className="tx-required">*</span></label>
                <div className="input-wrap">
                  <span className="input-icon tx-currency-prefix">₹</span>
                  <input
                    id="bud-amount" type="number" min="0" step="1" placeholder="0"
                    value={draft.amount} onChange={(e) => update("amount", e.target.value)}
                  />
                </div>
                {errors.amount && <p className="tx-error">{errors.amount}</p>}
              </div>
              <div style={{ flex: 1 }}>
                <label className="field-label" htmlFor="bud-threshold">Alert threshold <span className="tx-required">*</span></label>
                <div className="input-wrap">
                  <span className="input-icon"><IconSliders size={16} /></span>
                  <input
                    id="bud-threshold" type="number" min="1" max="100" step="1" placeholder="80"
                    value={draft.threshold} onChange={(e) => update("threshold", e.target.value)}
                  />
                  <span className="bud-threshold-suffix">%</span>
                </div>
                {errors.threshold && <p className="tx-error">{errors.threshold}</p>}
              </div>
            </div>
            <p className="bud-form-hint bud-threshold-hint">
              You'll see an alert once spending reaches this percentage of the budget.
            </p>
          </div>
        </div>

        <div className="tx-drawer-footer">
          <button type="button" className="tx-secondary-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="signin-btn" onClick={handleSave}>
            {isEdit ? "Save Changes" : "Add Budget"}
          </button>
        </div>
      </div>
    </div>
  );
}

export { applyExpenseToBudget };
