import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  listPlans,
  getCurrentSubscription,
  subscribeToPlan as apiSubscribeToPlan,
  cancelSubscription as apiCancelSubscription,
  listInvoices,
} from "../api/subscriptions";
import "../styles/Dashboard.css";
import "../styles/Transactions.css";
import "../styles/Subscription.css";

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
const IconCheckCircle = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="m8.3 12.3 2.6 2.6 4.8-5.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);
const IconAlertTriangle = (p) => (
  <Icon {...p}>
    <path d="M12 4.5 21 19.5H3L12 4.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M12 10v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="16.7" r="1" fill="currentColor" />
  </Icon>
);
const IconClock = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 7.5V12l3.2 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);
const IconCreditCard = (p) => (
  <Icon {...p}>
    <rect x="3.5" y="6" width="17" height="12.5" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3.5 10.2h17" stroke="currentColor" strokeWidth="1.7" />
    <path d="M6.5 14.5h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </Icon>
);
const IconDownload = (p) => (
  <Icon {...p}>
    <path d="M12 4v11.5M8 12l4 4 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 19.5h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </Icon>
);
const IconSpinner = (p) => (
  <svg width={p.size || 22} height={p.size || 22} viewBox="0 0 24 24" fill="none" className="sub-spinner">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2.4" />
    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
const IconShieldCheck = (p) => (
  <Icon {...p}>
    <path d="M12 3.8 19 6.3v5.4c0 5-3 7.8-7 8.5-4-.7-7-3.5-7-8.5V6.3L12 3.8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="m9 12 2.2 2.2L15.3 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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

/* Benefits are the app's own existing modules only — nothing invented. */
const FEATURES = [
  "Unlimited transactions & accounts",
  "Budgets and category tracking",
  "Bill reminders & recurring bills",
  "Reports & analytics",
  "Multi-currency accounts",
];

/* Default plan set shown before the real plans have loaded from the API. */
const FALLBACK_PLANS = [];

const TODAY = new Date().toISOString().slice(0, 10);

function addMonths(dateISO, n) {
  const d = new Date(dateISO + "T00:00:00");
  d.setMonth(d.getMonth() + n);
  return d.toISOString().slice(0, 10);
}
function addYears(dateISO, n) {
  const d = new Date(dateISO + "T00:00:00");
  d.setFullYear(d.getFullYear() + n);
  return d.toISOString().slice(0, 10);
}
function addDays15(dateISO) {
  const d = new Date(dateISO + "T00:00:00");
  d.setDate(d.getDate() + 15);
  return d.toISOString().slice(0, 10);
}
function daysBetween(fromISO, toISO) {
  const a = new Date(fromISO + "T00:00:00");
  const b = new Date(toISO + "T00:00:00");
  return Math.round((b - a) / 86400000);
}
function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}
function uid() {
  return Math.random().toString(36).slice(2, 10);
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

export default function Subscription() {
  const [active] = useState("Subscription");
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

  const [plans, setPlans] = useState(FALLBACK_PLANS);
  const [subscription, setSubscription] = useState({
    plan: null,
    status: "trialing",
    trialStartedAt: TODAY,
    trialEndsAt: addDays15(TODAY),
    renewsAt: null,
    autoRenew: true,
    paymentMethod: null,
    subscriptionId: null,
  });
  const [invoices, setInvoices] = useState([]);
  const [checkoutPlan, setCheckoutPlan] = useState(null);
  const [cancelConfirmOpen, setCancelConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const planMeta = (key) => plans.find((p) => p.key === key);

  const loadAll = async () => {
    setLoading(true);
    setError("");
    try {
      const [plansData, currentSub, invoiceData] = await Promise.all([
        listPlans(),
        getCurrentSubscription().catch(() => null),
        listInvoices().catch(() => []),
      ]);

      const mappedPlans = plansData.map((p) => ({
        key: p._id,
        planKey: p.key,
        name: p.name,
        price: p.price,
        priceSuffix: p.cadence === "yearly" ? "/ year" : p.price === 0 ? "" : "/ month",
        cycle: p.price === 0 ? "Free, no card required" : `Billed ${p.cadence}`,
        badge: p.isHighlighted ? "Best Value" : undefined,
      }));
      setPlans(mappedPlans);

      if (currentSub && currentSub.plan) {
        setSubscription({
          plan: currentSub.plan._id,
          status: currentSub.status === "trialing" ? "trialing" : "active",
          trialStartedAt: currentSub.currentPeriodStart,
          trialEndsAt: currentSub.trialEndsAt || currentSub.currentPeriodStart,
          renewsAt: currentSub.currentPeriodEnd,
          autoRenew: !currentSub.cancelAtPeriodEnd,
          paymentMethod: "Card",
          subscriptionId: currentSub._id,
        });
      } else {
        const freePlan = mappedPlans.find((p) => p.price === 0) || mappedPlans[0];
        setSubscription({
          plan: freePlan?.key || null,
          status: "trialing",
          trialStartedAt: TODAY,
          trialEndsAt: addDays15(TODAY),
          renewsAt: null,
          autoRenew: true,
          paymentMethod: null,
          subscriptionId: null,
        });
      }

      setInvoices(
        invoiceData.map((inv) => ({
          id: inv._id,
          date: (inv.issuedAt || inv.createdAt || "").slice(0, 10),
          plan: inv.lineItems?.[0]?.description || "Subscription",
          amount: inv.total,
          status: inv.status === "paid" ? "Paid" : inv.status,
        }))
      );
    } catch (err) {
      setError(err.message || "Unable to load subscription data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);


  const toggleMenu = (name) => setOpenMenu((cur) => (cur === name ? null : name));

  useEffect(() => {
    if (!openMenu) return;
    const onDocClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpenMenu(null);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [openMenu]);

  const trialDaysLeft = useMemo(
    () => Math.max(0, daysBetween(TODAY, subscription.trialEndsAt)),
    [subscription.trialEndsAt]
  );
  const trialDaysUsed = 15 - trialDaysLeft;

  const currentPlanMeta = planMeta(subscription.plan) || plans[0];

  const completeCheckout = async (planKey, paymentMethod) => {
    try {
      await apiSubscribeToPlan(planKey, (paymentMethod || "card").toLowerCase());
      await loadAll();
    } catch (err) {
      setError(err.message || "Unable to complete checkout");
    }
    setCheckoutPlan(null);
  };

  const confirmCancelRenewal = async () => {
    try {
      if (subscription.subscriptionId) {
        await apiCancelSubscription(subscription.subscriptionId);
        await loadAll();
      } else {
        setSubscription((s) => ({ ...s, autoRenew: false }));
      }
    } catch (err) {
      setError(err.message || "Unable to cancel renewal");
    }
    setCancelConfirmOpen(false);
  };

  const resumeRenewal = () => setSubscription((s) => ({ ...s, autoRenew: true }));

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

        <main className="dash-content sub-content">
          <div className="dash-title-row">
            <h1>Subscription</h1>
          </div>

          {error && (
            <p className="welcome-subtitle" style={{ color: "#ef4444", fontWeight: 600 }}>
              {error}
            </p>
          )}
          {loading && <p className="notif-sub">Loading subscription...</p>}

          {/* ---------------- Current status ---------------- */}
          <div className={`sub-status-card sub-status-${subscription.status === "trialing" ? "trial" : subscription.autoRenew ? "active" : "canceling"}`}>
            <div className="sub-status-icon">
              {subscription.status === "trialing" ? <IconClock size={20} /> : <IconShieldCheck size={20} />}
            </div>
            <div className="sub-status-body">
              {subscription.status === "trialing" ? (
                <>
                  <p className="sub-status-title">You're on your Free Trial</p>
                  <p className="sub-status-sub">
                    <strong>{trialDaysLeft} day{trialDaysLeft === 1 ? "" : "s"}</strong> remaining · trial ends {formatDate(subscription.trialEndsAt)}
                  </p>
                  <div className="sub-trial-track">
                    <div className="sub-trial-fill" style={{ width: `${Math.min(100, (trialDaysUsed / 15) * 100)}%` }} />
                  </div>
                </>
              ) : (
                <>
                  <p className="sub-status-title">You're on {currentPlanMeta.name}</p>
                  <p className="sub-status-sub">
                    {subscription.autoRenew
                      ? <>Renews on <strong>{formatDate(subscription.renewsAt)}</strong> · {subscription.paymentMethod}</>
                      : <>Access continues until <strong>{formatDate(subscription.renewsAt)}</strong>, then auto-renewal stops</>}
                  </p>
                </>
              )}
            </div>
            {subscription.status === "trialing" && (
              <button type="button" className="signin-btn sub-status-cta" onClick={() => setCheckoutPlan(plans.find((p) => p.price > 0) || plans[0])}>
                Upgrade now
              </button>
            )}
          </div>

          {/* ---------------- Plans ---------------- */}
          <h2 className="sub-section-title">Choose your plan</h2>
          <div className="sub-plans-grid">
            {plans.map((plan) => (
              <PlanCard
                key={plan.key}
                plan={plan}
                isCurrent={subscription.plan === plan.key}
                trialAlreadyUsed={plan.price === 0 && subscription.status !== "trialing"}
                onChoose={() => setCheckoutPlan(plan)}
              />
            ))}
          </div>

          {/* ---------------- Subscription management ---------------- */}
          {subscription.status === "active" && (
            <>
              <h2 className="sub-section-title">Manage subscription</h2>
              <div className="sub-manage-card">
                <div className="sub-manage-row">
                  <div>
                    <p className="sub-manage-label">Current plan</p>
                    <p className="sub-manage-value">{currentPlanMeta.name}</p>
                  </div>
                  <div>
                    <p className="sub-manage-label">{subscription.autoRenew ? "Next renewal" : "Access until"}</p>
                    <p className="sub-manage-value">{formatDate(subscription.renewsAt)}</p>
                  </div>
                  <div>
                    <p className="sub-manage-label">Payment method</p>
                    <p className="sub-manage-value">{subscription.paymentMethod}</p>
                  </div>
                </div>
                <div className="sub-manage-actions">
                  {subscription.autoRenew ? (
                    <button type="button" className="tx-danger-btn" onClick={() => setCancelConfirmOpen(true)}>
                      Cancel renewal
                    </button>
                  ) : (
                    <button type="button" className="tx-secondary-btn" onClick={resumeRenewal}>
                      Resume auto-renewal
                    </button>
                  )}
                </div>
              </div>
            </>
          )}

          {/* ---------------- Invoice history ---------------- */}
          <h2 className="sub-section-title">Invoice history</h2>
          <div className="sub-invoice-list">
            {invoices.length === 0 && (
              <div className="tx-empty sub-invoice-empty">
                <p>No invoices yet — they'll appear here after your first payment.</p>
              </div>
            )}
            {invoices.map((inv) => (
              <div className="sub-invoice-row" key={inv.id}>
                <span className="sub-invoice-icon"><IconReceipt size={15} /></span>
                <div className="sub-invoice-info">
                  <p className="sub-invoice-plan">{inv.plan}</p>
                  <p className="sub-invoice-date">{formatDate(inv.date)}</p>
                </div>
                <span className="sub-invoice-status">{inv.status}</span>
                <span className="sub-invoice-amount">₹{inv.amount}</span>
                <button type="button" className="tx-icon-btn" aria-label="Download invoice">
                  <IconDownload size={14} />
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* ---------------- Checkout flow ---------------- */}
      {checkoutPlan && (
        <CheckoutModal
          plan={checkoutPlan}
          savedPaymentMethod={subscription.paymentMethod}
          onClose={() => setCheckoutPlan(null)}
          onSuccess={(paymentMethod) => completeCheckout(checkoutPlan.key, paymentMethod)}
        />
      )}

      {/* ---------------- Cancel renewal confirmation ---------------- */}
      {cancelConfirmOpen && (
        <div className="tx-modal-overlay" onClick={(e) => e.target === e.currentTarget && setCancelConfirmOpen(false)}>
          <div className="tx-confirm-card" role="alertdialog" aria-modal="true">
            <span className="tx-confirm-icon"><IconAlertTriangle size={20} /></span>
            <h3 className="tx-confirm-title">Cancel auto-renewal?</h3>
            <p className="tx-confirm-sub">
              You'll keep full access to {currentPlanMeta.name} until <strong>{formatDate(subscription.renewsAt)}</strong>.
              After that date your plan won't renew automatically.
            </p>
            <div className="tx-confirm-actions">
              <button type="button" className="tx-secondary-btn" onClick={() => setCancelConfirmOpen(false)}>
                Keep plan
              </button>
              <button type="button" className="tx-danger-btn" onClick={confirmCancelRenewal}>
                Cancel Renewal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Plan card                                                         */
/* ---------------------------------------------------------------- */

function PlanCard({ plan, isCurrent, trialAlreadyUsed, onChoose }) {
  return (
    <div className={`sub-plan-card ${isCurrent ? "sub-plan-card-current" : ""}`}>
      {plan.badge && !isCurrent && <span className="sub-plan-ribbon">{plan.badge}</span>}
      {isCurrent && <span className="sub-plan-ribbon sub-plan-ribbon-current">Current Plan</span>}

      <p className="sub-plan-name">{plan.name}</p>
      <div className="sub-plan-price-row">
        <span className="sub-plan-price">₹{plan.price}</span>
        {plan.priceSuffix && <span className="sub-plan-suffix">{plan.priceSuffix}</span>}
      </div>
      <p className="sub-plan-cycle">{plan.cycle}</p>

      <ul className="sub-plan-features">
        {FEATURES.map((f) => (
          <li key={f}><IconCheck size={13} /> {f}</li>
        ))}
      </ul>

      {isCurrent ? (
        <button type="button" className="tx-secondary-btn sub-plan-btn" disabled>
          Current Plan
        </button>
      ) : trialAlreadyUsed ? (
        <button type="button" className="tx-secondary-btn sub-plan-btn" disabled>
          Trial Used
        </button>
      ) : (
        <button type="button" className="signin-btn sub-plan-btn" onClick={onChoose}>
          {plan.price === 0 ? "Start Free Trial" : "Upgrade"}
        </button>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Checkout modal                                                    */
/* ---------------------------------------------------------------- */

function CheckoutModal({ plan, savedPaymentMethod, onClose, onSuccess }) {
  const [step, setStep] = useState("review"); // review | processing | success
  const [useSaved, setUseSaved] = useState(!!savedPaymentMethod);
  const [card, setCard] = useState({ name: "", number: "", expiry: "", cvv: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const onKeyDown = (e) => e.key === "Escape" && step !== "processing" && onClose();
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, step]);

  const update = (key, value) => setCard((c) => ({ ...c, [key]: value }));

  const validate = () => {
    if (useSaved) return true;
    const e = {};
    if (!card.name.trim()) e.name = "Required";
    if (!/^\d{12,19}$/.test(card.number.replace(/\s/g, ""))) e.number = "Enter a valid card number";
    if (!/^\d{2}\/\d{2}$/.test(card.expiry)) e.expiry = "MM/YY";
    if (!/^\d{3,4}$/.test(card.cvv)) e.cvv = "Invalid";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePay = () => {
    if (!validate()) return;
    setStep("processing");
    setTimeout(() => {
      const method = useSaved ? savedPaymentMethod : `Visa •••• ${card.number.slice(-4)}`;
      setStep("success");
      onSuccess(method);
    }, 1100);
  };

  return (
    <div className="tx-modal-overlay" onClick={(e) => e.target === e.currentTarget && step !== "processing" && onClose()}>
      <div className="sub-checkout-modal" role="dialog" aria-modal="true">
        {step !== "processing" && (
          <button type="button" className="tx-modal-close sub-checkout-close" onClick={onClose} aria-label="Close">
            <IconX size={16} />
          </button>
        )}

        {step === "review" && (
          <>
            <h3 className="sub-checkout-title">Checkout</h3>
            <div className="sub-checkout-summary">
              <div>
                <p className="sub-manage-label">Plan</p>
                <p className="sub-manage-value">{plan.name}</p>
              </div>
              <p className="sub-checkout-amount">₹{plan.price}{plan.priceSuffix}</p>
            </div>

            <p className="field-label sub-checkout-section-label">Payment method</p>

            {savedPaymentMethod && (
              <label className="sub-payment-option">
                <input type="radio" checked={useSaved} onChange={() => setUseSaved(true)} />
                <IconCreditCard size={16} /> {savedPaymentMethod}
              </label>
            )}
            <label className="sub-payment-option">
              <input type="radio" checked={!useSaved} onChange={() => setUseSaved(false)} />
              <IconCreditCard size={16} /> {savedPaymentMethod ? "Use a new card" : "Card payment"}
            </label>

            {!useSaved && (
              <div className="tx-form sub-card-form">
                <div className="tx-field">
                  <label className="field-label" htmlFor="cc-name">Name on card</label>
                  <input id="cc-name" type="text" placeholder="As on card" value={card.name} onChange={(e) => update("name", e.target.value)} />
                  {errors.name && <p className="tx-error">{errors.name}</p>}
                </div>
                <div className="tx-field">
                  <label className="field-label" htmlFor="cc-number">Card number</label>
                  <input id="cc-number" type="text" inputMode="numeric" placeholder="1234 5678 9012 3456" value={card.number} onChange={(e) => update("number", e.target.value)} />
                  {errors.number && <p className="tx-error">{errors.number}</p>}
                </div>
                <div className="tx-field-row">
                  <div style={{ flex: 1 }}>
                    <label className="field-label" htmlFor="cc-expiry">Expiry</label>
                    <input id="cc-expiry" type="text" placeholder="MM/YY" value={card.expiry} onChange={(e) => update("expiry", e.target.value)} />
                    {errors.expiry && <p className="tx-error">{errors.expiry}</p>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <label className="field-label" htmlFor="cc-cvv">CVV</label>
                    <input id="cc-cvv" type="password" inputMode="numeric" placeholder="•••" value={card.cvv} onChange={(e) => update("cvv", e.target.value)} />
                    {errors.cvv && <p className="tx-error">{errors.cvv}</p>}
                  </div>
                </div>
              </div>
            )}

            <button type="button" className="signin-btn sub-checkout-pay-btn" onClick={handlePay}>
              Pay ₹{plan.price}
            </button>
          </>
        )}

        {step === "processing" && (
          <div className="sub-checkout-center">
            <IconSpinner size={32} />
            <p className="sub-checkout-processing-text">Processing your payment…</p>
          </div>
        )}

        {step === "success" && (
          <div className="sub-checkout-center">
            <span className="sub-success-icon"><IconCheckCircle size={30} /></span>
            <p className="sub-checkout-title">Payment successful</p>
            <p className="sub-status-sub">You're now on {plan.name}.</p>
            <button type="button" className="signin-btn sub-checkout-pay-btn" onClick={onClose}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
