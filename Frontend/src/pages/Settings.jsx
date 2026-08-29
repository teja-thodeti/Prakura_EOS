import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React, { useState, useEffect, useRef } from "react";
import { getProfile, updateProfile, changePassword } from "../api/users";
import "../styles/Dashboard.css";
import "../styles/Transactions.css";
import "../styles/Settings.css";

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
const IconPhone = (p) => (
  <Icon {...p}>
    <path d="M7.5 3.8h3.2l1.3 3.6-1.9 1.6a11.5 11.5 0 0 0 4.9 4.9l1.6-1.9 3.6 1.3v3.2a1.6 1.6 0 0 1-1.7 1.6C11.9 17.7 6.3 12.1 5.9 5.5a1.6 1.6 0 0 1 1.6-1.7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </Icon>
);
const IconGlobe = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3.5 12h17M12 3.5c2.4 2.3 3.6 5.2 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.2-3.6-8.5S9.6 5.8 12 3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </Icon>
);
const IconClock = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 7.5V12l3.2 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);
const IconSliders = (p) => (
  <Icon {...p}>
    <path d="M4 7h9M17 7h3M4 17h3M11 17h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="14" cy="7" r="2.1" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="8" cy="17" r="2.1" stroke="currentColor" strokeWidth="1.6" />
  </Icon>
);
const IconEdit = (p) => (
  <Icon {...p}>
    <path d="M15.5 4.5 19.5 8.5 8 20H4v-4L15.5 4.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </Icon>
);
const IconCheckCircle = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="m8.3 12.3 2.6 2.6 4.8-5.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);
const IconCircle = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.6" />
  </Icon>
);
const IconLock = (p) => (
  <Icon {...p}>
    <rect x="5.5" y="10.5" width="13" height="9" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <circle cx="12" cy="15" r="1.1" fill="currentColor" />
  </Icon>
);
const IconShieldCheck = (p) => (
  <Icon {...p}>
    <path d="M12 3.8 19 6.3v5.4c0 5-3 7.8-7 8.5-4-.7-7-3.5-7-8.5V6.3L12 3.8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="m9 12 2.2 2.2L15.3 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);
const IconAlertTriangle = (p) => (
  <Icon {...p}>
    <path d="M12 4.5 21 19.5H3L12 4.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M12 10v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="16.7" r="1" fill="currentColor" />
  </Icon>
);
const IconMonitor = (p) => (
  <Icon {...p}>
    <rect x="3.5" y="4.5" width="17" height="12" rx="1.8" stroke="currentColor" strokeWidth="1.6" />
    <path d="M8.5 20h7M12 16.5V20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
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

const COUNTRIES = ["India", "United States", "United Kingdom", "United Arab Emirates", "Singapore", "Australia", "Canada"];
const CURRENCIES = ["INR", "USD", "EUR", "GBP", "AED", "SGD"];
const TIME_ZONES = [
  "Asia/Kolkata (IST, UTC+5:30)",
  "America/New_York (EST, UTC-5:00)",
  "Europe/London (GMT, UTC+0:00)",
  "Asia/Dubai (GST, UTC+4:00)",
  "Asia/Singapore (SGT, UTC+8:00)",
  "Australia/Sydney (AEST, UTC+10:00)",
];

const TODAY = new Date().toISOString().slice(0, 10);

function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

/* ---------------------------------------------------------------- */
/* Main page                                                         */
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

export default function Settings() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const handleLogout = () => {
    signOut();
    navigate("/", { replace: true });
  };
  const [openMenu, setOpenMenu] = useState(null);
  const wrapRef = useRef(null);

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    mobile: "",
  });

  const [regional, setRegional] = useState({
    country: "",
    currency: "INR",
    timeZone: "Asia/Kolkata (IST, UTC+5:30)",
  });

  const [financial, setFinancial] = useState({
    defaultCurrency: "INR",
    budgetAlertThreshold: 80,
  });

  const [notifications, setNotifications] = useState({
    billReminders: true,
    budgetAlerts: true,
  });

  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    lastPasswordChange: TODAY,
  });

  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setPageError("");
      try {
        const data = await getProfile();
        if (cancelled) return;
        setProfile({
          fullName: data.user?.name || "",
          email: data.user?.email || "",
          mobile: data.profile?.phone || "",
        });
        setRegional({
          country: data.profile?.address?.country || "",
          currency: data.profile?.currency || "INR",
          timeZone: data.profile?.timezone || "Asia/Kolkata (IST, UTC+5:30)",
        });
        setFinancial((f) => ({ ...f, defaultCurrency: data.profile?.currency || "INR" }));
        setNotifications({
          billReminders: data.profile?.notificationPreferences?.billReminders ?? true,
          budgetAlerts: data.profile?.notificationPreferences?.budgetAlerts ?? true,
        });
      } catch (err) {
        if (!cancelled) setPageError(err.message || "Unable to load settings");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleProfileSave = async (draft) => {
    try {
      await updateProfile({ name: draft.fullName, phone: draft.mobile });
      setProfile(draft);
    } catch (err) {
      setPageError(err.message || "Unable to save profile");
    }
  };

  const handleRegionalSave = async (draft) => {
    try {
      await updateProfile({
        currency: draft.currency,
        timezone: draft.timeZone,
        address: { country: draft.country },
      });
      setRegional(draft);
    } catch (err) {
      setPageError(err.message || "Unable to save regional settings");
    }
  };

  const handleFinancialSave = async (draft) => {
    try {
      await updateProfile({ currency: draft.defaultCurrency });
      setFinancial(draft);
    } catch (err) {
      setPageError(err.message || "Unable to save financial settings");
    }
  };

  const toggleNotification = async (key) => {
    const next = { ...notifications, [key]: !notifications[key] };
    setNotifications(next);
    try {
      await updateProfile({ notificationPreferences: next });
    } catch (err) {
      setPageError(err.message || "Unable to save notification preference");
      setNotifications(notifications);
    }
  };

  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [logoutDone, setLogoutDone] = useState(false);

  const onboardingSteps = [
    { key: "profile", label: "Profile details added", done: true },
    { key: "account", label: "First account added", done: true },
    { key: "budget", label: "First budget created", done: true },
    { key: "bill", label: "First bill reminder added", done: true },
  ];
  const onboardingDone = onboardingSteps.filter((s) => s.done).length;
  const onboardingComplete = onboardingDone === onboardingSteps.length;

  const toggleMenu = (name) => setOpenMenu((cur) => (cur === name ? null : name));

  useEffect(() => {
    if (!openMenu) return;
    const onDocClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpenMenu(null);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [openMenu]);

  const confirmLogoutAll = () => {
    setLogoutConfirmOpen(false);
    setLogoutDone(true);
  };

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
            <button key={label} type="button" className="nav-item" onClick={() => navigate(NAV_ROUTES[label] || "/Dashboard")}>
              <ItemIcon size={16} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button type="button" className="nav-item nav-item-active">
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
                  <button type="button" className="dropdown-item" onClick={() => navigate("/Bills")}><IconReceipt size={14} /> Bills</button>
                  <button type="button" className="dropdown-item" onClick={() => navigate("/Reports")}><IconBarChart size={14} /> Reports</button>
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

        <main className="dash-content set-content">
          <div className="dash-title-row">
            <h1>Settings</h1>
          </div>

          {pageError && (
            <p className="welcome-subtitle" style={{ color: "#ef4444", fontWeight: 600 }}>
              {pageError}
            </p>
          )}
          {loading && <p className="notif-sub">Loading settings...</p>}

          <div className="set-sections">
            {/* ---------------- 1. Profile ---------------- */}
            <ProfileSection profile={profile} onSave={handleProfileSave} />

            {/* ---------------- 2. Regional Preferences ---------------- */}
            <RegionalSection regional={regional} onSave={handleRegionalSave} />

            {/* ---------------- 3. Financial Preferences ---------------- */}
            <FinancialSection financial={financial} onSave={handleFinancialSave} />

            {/* ---------------- 4. Notification Preferences ---------------- */}
            <section className="set-card">
              <div className="set-card-header">
                <span className="set-card-icon"><IconBell size={16} /></span>
                <h2>Notification Preferences</h2>
              </div>
              <div className="set-toggle-row">
                <div>
                  <p className="set-toggle-title">Bill reminders</p>
                  <p className="set-toggle-sub">Get notified before your bills are due</p>
                </div>
                <button
                  type="button"
                  className={`set-switch ${notifications.billReminders ? "set-switch-on" : ""}`}
                  role="switch"
                  aria-checked={notifications.billReminders}
                  onClick={() => toggleNotification("billReminders")}
                >
                  <span className="set-switch-thumb" />
                </button>
              </div>
              <div className="set-toggle-row">
                <div>
                  <p className="set-toggle-title">Budget alerts</p>
                  <p className="set-toggle-sub">Get notified when a budget nears or crosses its limit</p>
                </div>
                <button
                  type="button"
                  className={`set-switch ${notifications.budgetAlerts ? "set-switch-on" : ""}`}
                  role="switch"
                  aria-checked={notifications.budgetAlerts}
                  onClick={() => toggleNotification("budgetAlerts")}
                >
                  <span className="set-switch-thumb" />
                </button>
              </div>
            </section>

            {/* ---------------- 5. Account ---------------- */}
            <section className="set-card">
              <div className="set-card-header">
                <span className="set-card-icon"><IconUser size={16} /></span>
                <h2>Account</h2>
              </div>
              <div className="set-onboarding">
                <div className="set-onboarding-top">
                  <p className="set-toggle-title">Onboarding status</p>
                  <span className={`set-badge ${onboardingComplete ? "set-badge-done" : "set-badge-pending"}`}>
                    {onboardingComplete ? "Complete" : `${onboardingDone} of ${onboardingSteps.length} done`}
                  </span>
                </div>
                <div className="set-progress-track">
                  <div className="set-progress-fill" style={{ width: `${(onboardingDone / onboardingSteps.length) * 100}%` }} />
                </div>
                <ul className="set-checklist">
                  {onboardingSteps.map((s) => (
                    <li key={s.key} className={s.done ? "set-checklist-done" : ""}>
                      {s.done ? <IconCheckCircle size={15} /> : <IconCircle size={15} />}
                      {s.label}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* ---------------- 6. Security ---------------- */}
            <SecuritySection
              security={security}
              onPasswordChanged={() => setSecurity((s) => ({ ...s, lastPasswordChange: TODAY }))}
              onToggle2FA={() => setSecurity((s) => ({ ...s, twoFactorEnabled: !s.twoFactorEnabled }))}
              onLogoutAllClick={() => setLogoutConfirmOpen(true)}
              logoutDone={logoutDone}
            />
          </div>
        </main>
      </div>

      {/* ---------------- Log out confirmation ---------------- */}
      {logoutConfirmOpen && (
        <div className="tx-modal-overlay" onClick={(e) => e.target === e.currentTarget && setLogoutConfirmOpen(false)}>
          <div className="tx-confirm-card" role="alertdialog" aria-modal="true">
            <span className="tx-confirm-icon"><IconAlertTriangle size={20} /></span>
            <h3 className="tx-confirm-title">Log out of all other devices?</h3>
            <p className="tx-confirm-sub">
              You'll stay signed in here, but every other active session will be signed out immediately.
            </p>
            <div className="tx-confirm-actions">
              <button type="button" className="tx-secondary-btn" onClick={() => setLogoutConfirmOpen(false)}>
                Cancel
              </button>
              <button type="button" className="tx-danger-btn" onClick={confirmLogoutAll}>
                Log Out Devices
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Shared bits                                                       */
/* ---------------------------------------------------------------- */

function SectionHeader({ icon: HIcon, title, isEditing, onEdit }) {
  return (
    <div className="set-card-header">
      <span className="set-card-icon"><HIcon size={16} /></span>
      <h2>{title}</h2>
      {!isEditing && (
        <button type="button" className="set-edit-btn" onClick={onEdit}>
          <IconEdit size={13} /> Edit
        </button>
      )}
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div className="set-field-view">
      <p className="set-field-label">{label}</p>
      <p className="set-field-value">{value}</p>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* 1. Profile                                                        */
/* ---------------------------------------------------------------- */

function ProfileSection({ profile, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(profile);
  const [errors, setErrors] = useState({});

  const startEdit = () => {
    setDraft(profile);
    setErrors({});
    setIsEditing(true);
  };

  const update = (key, value) => setDraft((d) => ({ ...d, [key]: value }));

  const validate = () => {
    const e = {};
    if (!draft.fullName.trim()) e.fullName = "Enter your full name";
    if (!/^\S+@\S+\.\S+$/.test(draft.email)) e.email = "Enter a valid email";
    if (!/^\+?[\d\s]{7,15}$/.test(draft.mobile)) e.mobile = "Enter a valid mobile number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const save = () => {
    if (!validate()) return;
    onSave(draft);
    setIsEditing(false);
  };

  return (
    <section className="set-card">
      <SectionHeader icon={IconUser} title="Profile" isEditing={isEditing} onEdit={startEdit} />

      {!isEditing ? (
        <div className="set-field-grid">
          <Field label="Full name" value={profile.fullName} />
          <Field label="Email" value={profile.email} />
          <Field label="Mobile number" value={profile.mobile} />
        </div>
      ) : (
        <>
          <div className="set-field-grid set-field-grid-edit">
            <div className="tx-field">
              <label className="field-label" htmlFor="set-name">Full name</label>
              <div className="input-wrap">
                <span className="input-icon"><IconUser size={16} /></span>
                <input id="set-name" type="text" value={draft.fullName} onChange={(e) => update("fullName", e.target.value)} />
              </div>
              {errors.fullName && <p className="tx-error">{errors.fullName}</p>}
            </div>
            <div className="tx-field">
              <label className="field-label" htmlFor="set-email">Email</label>
              <div className="input-wrap">
                <span className="input-icon"><IconMail size={16} /></span>
                <input id="set-email" type="email" value={draft.email} onChange={(e) => update("email", e.target.value)} />
              </div>
              {errors.email && <p className="tx-error">{errors.email}</p>}
            </div>
            <div className="tx-field">
              <label className="field-label" htmlFor="set-mobile">Mobile number</label>
              <div className="input-wrap">
                <span className="input-icon"><IconPhone size={16} /></span>
                <input id="set-mobile" type="tel" value={draft.mobile} onChange={(e) => update("mobile", e.target.value)} />
              </div>
              {errors.mobile && <p className="tx-error">{errors.mobile}</p>}
            </div>
          </div>
          <div className="set-card-actions">
            <button type="button" className="tx-secondary-btn" onClick={() => setIsEditing(false)}>Cancel</button>
            <button type="button" className="signin-btn" onClick={save}>Save</button>
          </div>
        </>
      )}
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 2. Regional Preferences                                           */
/* ---------------------------------------------------------------- */

function RegionalSection({ regional, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(regional);

  const startEdit = () => {
    setDraft(regional);
    setIsEditing(true);
  };

  const update = (key, value) => setDraft((d) => ({ ...d, [key]: value }));

  const save = () => {
    onSave(draft);
    setIsEditing(false);
  };

  return (
    <section className="set-card">
      <SectionHeader icon={IconGlobe} title="Regional Preferences" isEditing={isEditing} onEdit={startEdit} />

      {!isEditing ? (
        <div className="set-field-grid">
          <Field label="Country" value={regional.country} />
          <Field label="Currency" value={regional.currency} />
          <Field label="Time zone" value={regional.timeZone} />
        </div>
      ) : (
        <>
          <div className="set-field-grid set-field-grid-edit">
            <div className="tx-field">
              <label className="field-label" htmlFor="set-country">Country</label>
              <div className="input-wrap tx-select-wrap">
                <span className="input-icon"><IconGlobe size={16} /></span>
                <select id="set-country" className="tx-select" value={draft.country} onChange={(e) => update("country", e.target.value)}>
                  {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <span className="tx-select-chevron"><IconChevronDown size={15} /></span>
              </div>
            </div>
            <div className="tx-field">
              <label className="field-label" htmlFor="set-currency">Currency</label>
              <div className="input-wrap tx-select-wrap">
                <span className="input-icon tx-currency-prefix">#</span>
                <select id="set-currency" className="tx-select" value={draft.currency} onChange={(e) => update("currency", e.target.value)}>
                  {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <span className="tx-select-chevron"><IconChevronDown size={15} /></span>
              </div>
            </div>
            <div className="tx-field">
              <label className="field-label" htmlFor="set-tz">Time zone</label>
              <div className="input-wrap tx-select-wrap">
                <span className="input-icon"><IconClock size={16} /></span>
                <select id="set-tz" className="tx-select" value={draft.timeZone} onChange={(e) => update("timeZone", e.target.value)}>
                  {TIME_ZONES.map((tz) => <option key={tz} value={tz}>{tz}</option>)}
                </select>
                <span className="tx-select-chevron"><IconChevronDown size={15} /></span>
              </div>
            </div>
          </div>
          <div className="set-card-actions">
            <button type="button" className="tx-secondary-btn" onClick={() => setIsEditing(false)}>Cancel</button>
            <button type="button" className="signin-btn" onClick={save}>Save</button>
          </div>
        </>
      )}
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 3. Financial Preferences                                          */
/* ---------------------------------------------------------------- */

function FinancialSection({ financial, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(financial);
  const [errors, setErrors] = useState({});

  const startEdit = () => {
    setDraft(financial);
    setErrors({});
    setIsEditing(true);
  };

  const update = (key, value) => setDraft((d) => ({ ...d, [key]: value }));

  const validate = () => {
    const e = {};
    const th = Number(draft.budgetAlertThreshold);
    if (Number.isNaN(th) || th < 1 || th > 100) e.budgetAlertThreshold = "Enter 1–100";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const save = () => {
    if (!validate()) return;
    onSave({ ...draft, budgetAlertThreshold: Number(draft.budgetAlertThreshold) });
    setIsEditing(false);
  };

  return (
    <section className="set-card">
      <SectionHeader icon={IconSliders} title="Financial Preferences" isEditing={isEditing} onEdit={startEdit} />

      {!isEditing ? (
        <div className="set-field-grid">
          <Field label="Default currency for new accounts" value={financial.defaultCurrency} />
          <Field label="Default budget alert threshold" value={`${financial.budgetAlertThreshold}%`} />
        </div>
      ) : (
        <>
          <div className="set-field-grid set-field-grid-edit">
            <div className="tx-field">
              <label className="field-label" htmlFor="set-def-currency">Default currency for new accounts</label>
              <div className="input-wrap tx-select-wrap">
                <span className="input-icon tx-currency-prefix">#</span>
                <select id="set-def-currency" className="tx-select" value={draft.defaultCurrency} onChange={(e) => update("defaultCurrency", e.target.value)}>
                  {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <span className="tx-select-chevron"><IconChevronDown size={15} /></span>
              </div>
            </div>
            <div className="tx-field">
              <label className="field-label" htmlFor="set-def-threshold">Default budget alert threshold</label>
              <div className="input-wrap">
                <span className="input-icon"><IconSliders size={16} /></span>
                <input
                  id="set-def-threshold" type="number" min="1" max="100" step="1"
                  value={draft.budgetAlertThreshold} onChange={(e) => update("budgetAlertThreshold", e.target.value)}
                />
                <span className="set-input-suffix">%</span>
              </div>
              {errors.budgetAlertThreshold && <p className="tx-error">{errors.budgetAlertThreshold}</p>}
            </div>
          </div>
          <div className="set-card-actions">
            <button type="button" className="tx-secondary-btn" onClick={() => setIsEditing(false)}>Cancel</button>
            <button type="button" className="signin-btn" onClick={save}>Save</button>
          </div>
        </>
      )}
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* 6. Security                                                       */
/* ---------------------------------------------------------------- */

function SecuritySection({ security, onPasswordChanged, onToggle2FA, onLogoutAllClick, logoutDone }) {
  const [changingPassword, setChangingPassword] = useState(false);
  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [savedNote, setSavedNote] = useState(false);

  const update = (key, value) => setPwd((p) => ({ ...p, [key]: value }));

  const validate = () => {
    const e = {};
    if (!pwd.current) e.current = "Enter your current password";
    if (!pwd.next || pwd.next.length < 8) e.next = "At least 8 characters";
    if (pwd.confirm !== pwd.next) e.confirm = "Passwords don't match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const savePassword = async () => {
    if (!validate()) return;
    try {
      await changePassword({ currentPassword: pwd.current, newPassword: pwd.next });
      onPasswordChanged();
      setPwd({ current: "", next: "", confirm: "" });
      setChangingPassword(false);
      setSavedNote(true);
      setTimeout(() => setSavedNote(false), 4000);
    } catch (err) {
      setErrors({ current: err.message || "Unable to change password" });
    }
  };

  return (
    <section className="set-card">
      <div className="set-card-header">
        <span className="set-card-icon"><IconLock size={16} /></span>
        <h2>Security</h2>
      </div>

      <div className="set-security-row">
        <div>
          <p className="set-toggle-title">Password</p>
          <p className="set-toggle-sub">Last changed {formatDate(security.lastPasswordChange)}</p>
        </div>
        {!changingPassword && (
          <button type="button" className="tx-secondary-btn" onClick={() => setChangingPassword(true)}>
            Change Password
          </button>
        )}
      </div>

      {savedNote && (
        <p className="set-success-note"><IconCheckCircle size={13} /> Password updated</p>
      )}

      {changingPassword && (
        <div className="set-password-form">
          <div className="tx-field">
            <label className="field-label" htmlFor="pwd-current">Current password</label>
            <input id="pwd-current" type="password" value={pwd.current} onChange={(e) => update("current", e.target.value)} />
            {errors.current && <p className="tx-error">{errors.current}</p>}
          </div>
          <div className="tx-field-row">
            <div style={{ flex: 1 }}>
              <label className="field-label" htmlFor="pwd-next">New password</label>
              <input id="pwd-next" type="password" value={pwd.next} onChange={(e) => update("next", e.target.value)} />
              {errors.next && <p className="tx-error">{errors.next}</p>}
            </div>
            <div style={{ flex: 1 }}>
              <label className="field-label" htmlFor="pwd-confirm">Confirm new password</label>
              <input id="pwd-confirm" type="password" value={pwd.confirm} onChange={(e) => update("confirm", e.target.value)} />
              {errors.confirm && <p className="tx-error">{errors.confirm}</p>}
            </div>
          </div>
          <div className="set-card-actions">
            <button type="button" className="tx-secondary-btn" onClick={() => { setChangingPassword(false); setErrors({}); }}>Cancel</button>
            <button type="button" className="signin-btn" onClick={savePassword}>Save</button>
          </div>
        </div>
      )}

      <div className="set-toggle-row set-security-divider">
        <div>
          <p className="set-toggle-title">Two-factor authentication</p>
          <p className="set-toggle-sub">Require a one-time code in addition to your password</p>
        </div>
        <button
          type="button"
          className={`set-switch ${security.twoFactorEnabled ? "set-switch-on" : ""}`}
          role="switch"
          aria-checked={security.twoFactorEnabled}
          onClick={onToggle2FA}
        >
          <span className="set-switch-thumb" />
        </button>
      </div>

      <div className="set-security-row set-security-divider">
        <div>
          <p className="set-toggle-title">Active sessions</p>
          <p className="set-toggle-sub">Sign out everywhere except this device</p>
        </div>
        <button type="button" className="tx-secondary-btn" onClick={onLogoutAllClick}>
          <IconMonitor size={13} /> Log out other devices
        </button>
      </div>
      {logoutDone && (
        <p className="set-success-note"><IconShieldCheck size={13} /> All other sessions have been signed out</p>
      )}
    </section>
  );
}
