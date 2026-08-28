import React, { useState, useEffect, useRef } from "react";
import "../styles/Dashboard.css";
import "../styles/Transactions.css";
import "../styles/Settings.css";
import "../styles/Profile.css";

/* ---------------------------------------------------------------- */
/* Small icons — kept in the same style as the existing pages       */
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

const IconMail = (p) => (
  <Icon {...p}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="1.8" stroke="currentColor" strokeWidth="1.6" />
    <path d="m4.5 6.5 7.5 6 7.5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);

const IconPhone = (p) => (
  <Icon {...p}>
    <path d="M6.5 3.5h3l1.5 4-2 1.4a11 11 0 0 0 4.6 4.6l1.4-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 5 5.1 1.5 1.5 0 0 1 6.5 3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </Icon>
);

const IconGlobe = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3.5 12h17M12 3.5c2.4 2.3 3.6 5.2 3.6 8.5S14.4 18.2 12 20.5C9.6 18.2 8.4 15.3 8.4 12S9.6 5.8 12 3.5Z" stroke="currentColor" strokeWidth="1.5" />
  </Icon>
);

const IconCoin = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 7.5v9M9.5 9.7c0-1.3 1.1-2 2.5-2s2.5.8 2.5 1.9c0 2.7-5 1.4-5 4 0 1.1 1.1 1.9 2.5 1.9s2.5-.7 2.5-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </Icon>
);

const IconBook = (p) => (
  <Icon {...p}>
    <path d="M5 4.5h9.5a1.5 1.5 0 0 1 1.5 1.5v13.5H6.5A1.5 1.5 0 0 1 5 17.5V4.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M8 8.5h5M8 11.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </Icon>
);

const IconLogOut = (p) => (
  <Icon {...p}>
    <path d="M9 20H5.5a1.5 1.5 0 0 1-1.5-1.5v-13A1.5 1.5 0 0 1 5.5 4H9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M14.5 16.5 19 12l-4.5-4.5M19 12H9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);

const NOTIFICATIONS = [
  { title: "Budget alert", sub: "Dining budget is at 82%." },
  { title: "Bill reminder", sub: "Internet bill is due tomorrow." },
];

export default function Profile() {
  const [openMenu, setOpenMenu] = useState(null);
  const wrapRef = useRef(null);

  const [profile, setProfile] = useState({
    fullName: "Ravi Kumar",
    email: "ravi.kumar@example.com",
    mobile: "+91 98765 43210",
    country: "India",
    currency: "INR (₹)",
    timeZone: "Asia/Kolkata (IST, UTC+5:30)",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(profile);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  const toggleMenu = (name) => setOpenMenu((cur) => (cur === name ? null : name));

  useEffect(() => {
    const onDocClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpenMenu(null);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const startEdit = () => {
    setDraft(profile);
    setErrors({});
    setSaved(false);
    setIsEditing(true);
  };

  const update = (key, value) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setSaved(false);
  };

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
    setProfile(draft);
    setIsEditing(false);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  const initials = profile.fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "P";

  const navItems = [
    ["Dashboard", IconHome],
    ["Transactions", IconList],
    ["Accounts", IconWallet],
    ["Budget", IconPieChart],
    ["Bills", IconReceipt],
    ["Reports", IconBarChart],
    ["Subscription", IconCrown],
  ];

  return (
    <div className="dash-app">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo">P</div>
          <span className="brand-name">Prakura</span>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(([label, NavIcon]) => (
            <button type="button" className="nav-item" key={label}>
              <NavIcon size={16} />
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

      <div className="dash-main">
        <header className="topbar" ref={wrapRef}>
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
                <span className="avatar-circle">{initials.charAt(0)}</span>
                <IconChevronDown size={13} />
              </button>
              {openMenu === "avatar" && (
                <div className="dropdown-panel dropdown-right">
                  <p className="dropdown-title">Prakura account</p>
                  <button type="button" className="dropdown-item profile-menu-active"><IconUser size={14} /> Profile</button>
                  <button type="button" className="dropdown-item"><IconSettings size={14} /> Account settings</button>
                  <div className="dropdown-divider" />
                  <button type="button" className="dropdown-item dropdown-item-danger"><IconLogOut size={14} /> Log out</button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="dash-content profile-content">
          <div className="dash-title-row">
            <h1>Profile</h1>
          </div>

          <div className="profile-sections">
            <section className="profile-hero-card">
              <div className="profile-avatar-large">{initials.charAt(0)}</div>
              <div className="profile-hero-info">
                <h2>{profile.fullName}</h2>
                <p>{profile.email}</p>
                <span className="profile-status">Active account</span>
              </div>
              <button type="button" className="set-edit-btn profile-hero-edit" onClick={startEdit}>
                Edit profile
              </button>
            </section>

            <section className="set-card">
              <div className="set-card-header">
                <span className="set-card-icon"><IconUser size={16} /></span>
                <h2>Personal information</h2>
              </div>

              {!isEditing ? (
                <div className="set-field-grid profile-field-grid">
                  <ProfileField icon={IconUser} label="Full name" value={profile.fullName} />
                  <ProfileField icon={IconMail} label="Email address" value={profile.email} />
                  <ProfileField icon={IconPhone} label="Mobile number" value={profile.mobile} />
                </div>
              ) : (
                <>
                  <div className="set-field-grid profile-field-grid profile-edit-grid">
                    <EditField icon={IconUser} id="profile-name" label="Full name" value={draft.fullName} onChange={(v) => update("fullName", v)} error={errors.fullName} />
                    <EditField icon={IconMail} id="profile-email" label="Email address" type="email" value={draft.email} onChange={(v) => update("email", v)} error={errors.email} />
                    <EditField icon={IconPhone} id="profile-mobile" label="Mobile number" type="tel" value={draft.mobile} onChange={(v) => update("mobile", v)} error={errors.mobile} />
                  </div>
                  <div className="set-card-actions">
                    <button type="button" className="tx-secondary-btn" onClick={() => { setIsEditing(false); setErrors({}); }}>Cancel</button>
                    <button type="button" className="signin-btn" onClick={save}>Save</button>
                  </div>
                </>
              )}
            </section>

            <section className="set-card">
              <div className="set-card-header">
                <span className="set-card-icon"><IconGlobe size={16} /></span>
                <h2>Regional preferences</h2>
              </div>

              <div className="set-field-grid profile-field-grid">
                <ProfileField icon={IconGlobe} label="Country" value={profile.country} />
                <ProfileField icon={IconCoin} label="Preferred currency" value={profile.currency} />
                <ProfileField icon={IconGlobe} label="Time zone" value={profile.timeZone} />
              </div>
            </section>

            <section className="set-card">
              <div className="set-card-header">
                <span className="set-card-icon"><IconCrown size={16} /></span>
                <h2>Account overview</h2>
              </div>

              <div className="profile-overview-grid">
                <div>
                  <p className="set-field-label">Subscription</p>
                  <p className="set-field-value">15-day Free Trial</p>
                </div>
                <div>
                  <p className="set-field-label">Account status</p>
                  <span className="profile-active-badge">Active</span>
                </div>
                <div>
                  <p className="set-field-label">Onboarding</p>
                  <span className="profile-complete-badge">Complete</span>
                </div>
              </div>
            </section>

            {saved && <div className="profile-save-note">Profile updated successfully.</div>}
          </div>
        </main>
      </div>
    </div>
  );
}

function ProfileField({ icon: FieldIcon, label, value }) {
  return (
    <div className="profile-field-view">
      <div className="profile-field-label-row">
        <FieldIcon size={14} />
        <p className="set-field-label">{label}</p>
      </div>
      <p className="set-field-value">{value}</p>
    </div>
  );
}

function EditField({ icon: FieldIcon, id, label, type = "text", value, onChange, error }) {
  return (
    <div className="tx-field">
      <label className="field-label" htmlFor={id}>{label}</label>
      <div className="input-wrap">
        <span className="input-icon"><FieldIcon size={16} /></span>
        <input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
      {error && <p className="tx-error">{error}</p>}
    </div>
  );
}
