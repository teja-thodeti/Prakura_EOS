import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getDashboardSummary } from "../api/dashboard";
import { getIncomeVsExpense } from "../api/reports";
import "../styles/Dashboard.css";

/* ---------------------------------------------------------------- */
/* Icons                                                             */
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
    <path
      d="M12 3.8v2.1M12 18.1v2.1M20.2 12h-2.1M5.9 12H3.8M17.5 6.5l-1.5 1.5M8 16l-1.5 1.5M17.5 17.5 16 16M8 8 6.5 6.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
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

const IconArrowDownRight = (p) => (
  <Icon {...p}>
    <path d="M7 7 17 17M17 17V9M17 17H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);

const IconCardStack = (p) => (
  <Icon {...p}>
    <rect x="3.5" y="6.5" width="17" height="12" rx="2.2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3.5 10.3h17" stroke="currentColor" strokeWidth="1.6" />
  </Icon>
);

const IconAlertCircle = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 8v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="16.3" r="1" fill="currentColor" />
  </Icon>
);

const IconRepeat = (p) => (
  <Icon {...p}>
    <path d="M4 8h11.5L13 5.5M20 16H8.5L11 18.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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

const IconKey = (p) => (
  <Icon {...p}>
    <circle cx="8" cy="15" r="3.2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M10.2 12.7 18 5M15.5 7.5l2 2M18 5l2 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);

const IconCreditCard = (p) => (
  <Icon {...p}>
    <rect x="3.5" y="6" width="17" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3.5 9.8h17" stroke="currentColor" strokeWidth="1.6" />
  </Icon>
);

/* ---------------------------------------------------------------- */
/* Static content                                                    */
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

const fmtMoney = (n) =>
  `₹${Number(n || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/* Trial ring: circumference for r=22 */
const TRIAL_TOTAL_DAYS = 15;
const RING_R = 22;
const RING_C = 2 * Math.PI * RING_R;

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [active, setActive] = useState("Dashboard");
  const [openMenu, setOpenMenu] = useState(null); // "help" | "bell" | "apps" | "avatar" | "manage" | null
  const wrapRef = useRef(null);

  const [summary, setSummary] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const toggleMenu = (name) => setOpenMenu((cur) => (cur === name ? null : name));

  const handleNavigate = (label) => {
    setActive(label);
    const route = NAV_ROUTES[label];
    if (route) navigate(route);
  };

  const handleLogout = () => {
    signOut();
    navigate("/", { replace: true });
  };

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const [dashData, trend] = await Promise.all([
          getDashboardSummary(),
          getIncomeVsExpense().catch(() => []),
        ]);
        if (!cancelled) {
          setSummary(dashData);
          setChartData(trend || []);
        }
      } catch (err) {
        if (!cancelled) setError(err.message || "Unable to load dashboard data");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!openMenu) return;
    const onDocClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [openMenu]);

  const STATS = summary
    ? [
        { label: "Balance", value: fmtMoney(summary.totalBalance), tone: "navy" },
        { label: "Income", value: fmtMoney(summary.monthIncome), tone: "green" },
        {
          label: "Expenses",
          value: fmtMoney(summary.monthExpense),
          tone: "red",
          badge: summary.monthExpense > 0,
        },
      ]
    : [];

  const CHART_LABELS = chartData.map((d) => d.month);
  const CHART_INCOME = chartData.map((d) => d.income);
  const CHART_EXPENSE = chartData.map((d) => d.expense);
  const CHART_MAX = Math.max(1, ...CHART_INCOME, ...CHART_EXPENSE);

  const budgetItems = summary?.budgets || [];
  const recentTransactions = summary?.recentTransactions || [];
  const upcomingBills = summary?.upcomingBills || [];

  const onboarding = summary?.onboarding;
  const trialDaysLeft = TRIAL_TOTAL_DAYS;
  const ringProgress = 1;
  const ringOffset = 0;

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
            <button
              key={label}
              type="button"
              className={`nav-item ${active === label ? "nav-item-active" : ""}`}
              onClick={() => handleNavigate(label)}
            >
              <ItemIcon size={16} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button
            type="button"
            className={`nav-item ${active === "Settings" ? "nav-item-active" : ""}`}
            onClick={() => handleNavigate("Settings")}
          >
            <IconSettings size={16} />
            <span>Settings</span>
          </button>

          <div className="trial-card">
            <div className="trial-ring-wrap">
              <svg width="56" height="56" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r={RING_R} fill="none" stroke="#eef0f5" strokeWidth="5" />
                <circle
                  cx="28"
                  cy="28"
                  r={RING_R}
                  fill="none"
                  stroke="#2f6fed"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={RING_C}
                  strokeDashoffset={ringOffset}
                  transform="rotate(-90 28 28)"
                />
                <text x="28" y="31" textAnchor="middle" className="trial-ring-text">
                  {trialDaysLeft}
                </text>
              </svg>
            </div>
            <div className="trial-text">
              <p className="trial-title">Free trial</p>
              <p className="trial-sub">{trialDaysLeft} days left</p>
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
              <button
                type="button"
                className="icon-btn"
                aria-label="Help"
                onClick={() => toggleMenu("help")}
              >
                <IconHelp size={16} />
              </button>
              {openMenu === "help" && (
                <div className="dropdown-panel dropdown-right">
                  <p className="dropdown-title">Help &amp; support</p>
                  <button type="button" className="dropdown-item">
                    <IconBook size={14} /> Help center
                  </button>
                  <button type="button" className="dropdown-item">
                    <IconMail size={14} /> Contact support
                  </button>
                </div>
              )}
            </div>

            <div className="dropdown-wrap">
              <button
                type="button"
                className="icon-btn bell-btn"
                aria-label="Notifications"
                onClick={() => toggleMenu("bell")}
              >
                <IconBell size={16} />
                {upcomingBills.length > 0 && <span className="badge">{upcomingBills.length}</span>}
              </button>
              {openMenu === "bell" && (
                <div className="dropdown-panel dropdown-right dropdown-wide">
                  <p className="dropdown-title">Notifications</p>
                  {upcomingBills.length === 0 && <p className="notif-sub">No upcoming bills.</p>}
                  {upcomingBills.map((n) => (
                    <div className="notif-row" key={n._id}>
                      <p className="notif-title">{n.name}</p>
                      <p className="notif-sub">
                        Due {new Date(n.dueDate).toLocaleDateString()} · {fmtMoney(n.amount)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="dropdown-wrap">
              <button
                type="button"
                className="icon-btn"
                aria-label="Apps"
                onClick={() => toggleMenu("apps")}
              >
                <IconLayers size={16} />
              </button>
              {openMenu === "apps" && (
                <div className="dropdown-panel dropdown-right">
                  <p className="dropdown-title">Quick links</p>
                  <button type="button" className="dropdown-item">
                    <IconReceipt size={14} /> Bills
                  </button>
                  <button type="button" className="dropdown-item">
                    <IconBarChart size={14} /> Reports
                  </button>
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
                  <button type="button" className="dropdown-item" onClick={() => navigate("/Profile")}>
                    <IconUser size={14} /> Profile
                  </button>
                  <button type="button" className="dropdown-item" onClick={() => navigate("/Settings")}>
                    <IconSettings size={14} /> Account settings
                  </button>
                  <div className="dropdown-divider" />
                  <button type="button" className="dropdown-item dropdown-item-danger" onClick={handleLogout}>
                    <IconLogOut size={14} /> Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="dash-content">
          <div className="dash-title-row">
            <h1>Dashboard</h1>
            <div className="dropdown-wrap">
              <button type="button" className="manage-btn" onClick={() => toggleMenu("manage")}>
                Manage account
                <IconChevronDown size={13} />
              </button>
              {openMenu === "manage" && (
                <div className="dropdown-panel dropdown-right-align">
                  <button type="button" className="dropdown-item" onClick={() => navigate("/Profile")}>
                    <IconUser size={14} /> Profile settings
                  </button>
                  <button type="button" className="dropdown-item" onClick={() => navigate("/Subscription")}>
                    <IconCreditCard size={14} /> Billing
                  </button>
                  <button type="button" className="dropdown-item" onClick={() => navigate("/Settings")}>
                    <IconKey size={14} /> Security
                  </button>
                  <div className="dropdown-divider" />
                  <button type="button" className="dropdown-item dropdown-item-danger" onClick={handleLogout}>
                    <IconLogOut size={14} /> Log out
                  </button>
                </div>
              )}
            </div>
          </div>

          {error && (
            <p className="welcome-subtitle" style={{ color: "#ef4444", fontWeight: 600, margin: "0 0 12px" }}>
              {error}
            </p>
          )}

          {/* ---------------- Stat cards ---------------- */}
          <div className="stats-row">
            {loading && STATS.length === 0 && <p className="notif-sub">Loading...</p>}
            {STATS.map((s) => (
              <div className="stat-card" key={s.label}>
                <span className="stat-label">{s.label}</span>
                <div className="stat-value-row">
                  <span className={`stat-value stat-${s.tone}`}>{s.value}</span>
                  {s.badge && (
                    <span className="stat-mini-badge">
                      <IconArrowDownRight size={11} />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ---------------- Two column grid ---------------- */}
          <div className="dash-grid">
            <div className="dash-col">
              <section className="panel">
                <div className="panel-header">
                  <h2>Income vs Expense</h2>
                  <button type="button" className="pill-select">
                    6 months
                    <IconChevronDown size={12} />
                  </button>
                </div>

                <div className="bar-chart">
                  <div className="bar-chart-yaxis">
                    {[CHART_MAX, Math.round(CHART_MAX * 0.66), Math.round(CHART_MAX * 0.33), 0].map((v, i) => (
                      <span key={i}>{v}</span>
                    ))}
                  </div>
                  <div className="bar-chart-bars-wrap">
                    {CHART_LABELS.map((m, i) => (
                      <div className="bar-group" key={i}>
                        <div className="bar bar-navy" style={{ height: `${(CHART_INCOME[i] / CHART_MAX) * 100}%` }} />
                        <div className="bar bar-purple" style={{ height: `${(CHART_EXPENSE[i] / CHART_MAX) * 100}%` }} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bar-chart-labels">
                  {CHART_LABELS.map((m, i) => (
                    <span key={i}>{m}</span>
                  ))}
                </div>
              </section>

              <section className="panel">
                {budgetItems.slice(0, 2).map((b) => (
                  <div className="budget-block" key={b._id}>
                    <div className="budget-row-top">
                      <h2>{b.name}</h2>
                      <span className="budget-percent">{Math.round(b.percentUsed)}%</span>
                    </div>
                    <div className="progress-track">
                      <div
                        className={`progress-fill ${b.percentUsed >= 100 ? "progress-blue" : "progress-green"}`}
                        style={{ width: `${Math.min(b.percentUsed, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
                {budgetItems.length === 0 && <p className="notif-sub">No budgets set up yet.</p>}

                <div className="panel-footer-row">
                  <span>Recent Transactions</span>
                  <button type="button" className="send-more-btn" onClick={() => navigate("/Transactions")}>
                    View all
                  </button>
                </div>
              </section>
            </div>

            <div className="dash-col">
              <section className="panel">
                <div className="panel-header">
                  <h2>Budgets</h2>
                </div>
                <ul className="item-list">
                  {budgetItems.map((b) => (
                    <li className="item-row" key={b._id}>
                      <span className="item-icon icon-purple">
                        <IconPieChart size={15} />
                      </span>
                      <div className="item-text">
                        <p className="item-title">{b.name}</p>
                        <p className="item-sub">{fmtMoney(b.amount)}</p>
                      </div>
                      <span className="item-amount">
                        -{fmtMoney(b.spent)}{" "}
                        <span className="item-tag">{b.percentUsed >= 100 ? "over" : "on track"}</span>
                      </span>
                    </li>
                  ))}
                  {budgetItems.length === 0 && <li className="notif-sub">No budgets yet.</li>}
                </ul>
              </section>

              <section className="panel">
                <div className="panel-header">
                  <h2>Recent Transactions</h2>
                </div>
                <ul className="item-list">
                  {recentTransactions.map((t) => (
                    <li className="item-row" key={t._id}>
                      <span className={`item-icon icon-${t.type === "income" ? "blue" : "red"}`}>
                        {t.type === "income" ? <IconRepeat size={15} /> : <IconAlertCircle size={15} />}
                      </span>
                      <div className="item-text">
                        <p className="item-title">{t.description || t.category?.name || "Transaction"}</p>
                        <p className="item-sub">{new Date(t.date).toLocaleDateString()}</p>
                      </div>
                      <div className="item-amount-col">
                        <span className="item-amount-red">
                          {t.type === "income" ? "+" : "-"}
                          {fmtMoney(t.amount)}
                        </span>
                      </div>
                    </li>
                  ))}
                  {recentTransactions.length === 0 && <li className="notif-sub">No transactions yet.</li>}
                </ul>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
