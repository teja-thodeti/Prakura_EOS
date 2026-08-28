import React, { useMemo, useRef, useState, useEffect } from "react";
import "../styles/Dashboard.css";
import "../styles/Transactions.css";
import "../styles/Bills.css";

const BILL_TYPES = [
  "Rent", "EMI", "Credit-card bill", "Electricity", "Mobile",
  "Internet", "Insurance", "School fee", "Subscription", "Custom bill"
];

const FREQUENCIES = ["One-time", "Monthly", "Quarterly", "Yearly"];

const SEED_BILLS = [
  { id: 1, name: "Rent", type: "Rent", amount: 12000, dueDate: "2026-08-30", frequency: "Monthly", category: "Housing", account: "HDFC Bank", reminder: "3 days before", notes: "", status: "Upcoming" },
  { id: 2, name: "Electricity", type: "Electricity", amount: 1450, dueDate: "2026-09-02", frequency: "Monthly", category: "Utilities", account: "HDFC Bank", reminder: "3 days before", notes: "", status: "Upcoming" },
  { id: 3, name: "Credit Card Bill", type: "Credit-card bill", amount: 3200, dueDate: "2026-08-25", frequency: "Monthly", category: "Credit Card", account: "HDFC Bank", reminder: "3 days before", notes: "", status: "Overdue" },
  { id: 4, name: "Netflix", type: "Subscription", amount: 649, dueDate: "2026-09-08", frequency: "Monthly", category: "Subscriptions", account: "HDFC Bank", reminder: "1 day before", notes: "", status: "Upcoming" },
  { id: 5, name: "Internet", type: "Internet", amount: 999, dueDate: "2026-09-12", frequency: "Monthly", category: "Utilities", account: "HDFC Bank", reminder: "3 days before", notes: "", status: "Upcoming" },
];

const NAV_ITEMS = [
  ["Dashboard", "⌂"], ["Transactions", "▤"], ["Accounts", "▣"],
  ["Budgets", "◔"], ["Bills", "▤"], ["Reports", "▥"], ["Subscription", "♛"]
];

const money = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

function daysUntil(date) {
  const today = new Date("2026-08-27T00:00:00");
  const d = new Date(`${date}T00:00:00`);
  return Math.round((d - today) / 86400000);
}

function statusFor(bill) {
  const days = daysUntil(bill.dueDate);
  if (bill.status === "Paid") return "Paid";
  if (days < 0) return "Overdue";
  if (days === 0) return "Due today";
  return "Upcoming";
}

export default function Bills() {
  const [bills, setBills] = useState(SEED_BILLS);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [drawer, setDrawer] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpenMenu(null);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const filtered = useMemo(() => bills.filter((b) => {
    const status = statusFor(b);
    const matchesStatus = statusFilter === "All" || status === statusFilter;
    const matchesType = typeFilter === "All" || b.type === typeFilter;
    const q = search.trim().toLowerCase();
    return matchesStatus && matchesType &&
      (!q || `${b.name} ${b.type} ${b.category} ${b.account}`.toLowerCase().includes(q));
  }), [bills, statusFilter, typeFilter, search]);

  const summary = useMemo(() => {
    const upcoming = bills.filter(b => ["Upcoming", "Due today"].includes(statusFor(b))).reduce((s, b) => s + b.amount, 0);
    const overdue = bills.filter(b => statusFor(b) === "Overdue").reduce((s, b) => s + b.amount, 0);
    const month = bills.filter(b => daysUntil(b.dueDate) >= 0 && daysUntil(b.dueDate) <= 31).reduce((s, b) => s + b.amount, 0);
    return { upcoming, overdue, month };
  }, [bills]);

  const saveBill = (draft) => {
    if (draft.id) {
      setBills(prev => prev.map(b => b.id === draft.id ? { ...draft, status: statusFor(draft) } : b));
    } else {
      setBills(prev => [...prev, { ...draft, id: Date.now(), status: statusFor(draft) }]);
    }
    setDrawer(null);
  };

  const markPaid = (bill) => {
    setBills(prev => prev.map(b => b.id === bill.id ? { ...b, status: "Paid" } : b));
  };

  const deleteBill = () => {
    setBills(prev => prev.filter(b => b.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="dash-app" ref={wrapRef}>
      <aside className="sidebar">
        <div className="sidebar-brand"><div className="brand-logo">P</div><span className="brand-name">Prakura</span></div>
        <nav className="sidebar-nav">
          {NAV_ITEMS.map(([label, icon]) => (
            <button key={label} type="button" className={`nav-item ${label === "Bills" ? "nav-item-active" : ""}`}>
              <span className="bills-nav-icon">{icon}</span><span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom"><button type="button" className="nav-item"><span>⚙</span><span>Settings</span></button></div>
      </aside>

      <div className="dash-main">
        <header className="topbar">
          <div className="search-box"><span>⌕</span><input placeholder="Search" /></div>
          <div className="topbar-actions">
            <button type="button" className="icon-btn" onClick={() => setOpenMenu(openMenu === "help" ? null : "help")}>?</button>
            <button type="button" className="icon-btn bell-btn" onClick={() => setOpenMenu(openMenu === "bell" ? null : "bell")}>♢<span className="badge">2</span></button>
            <button type="button" className="avatar-btn" onClick={() => setOpenMenu(openMenu === "avatar" ? null : "avatar")}><span className="avatar-circle">P</span><span>⌄</span></button>
          </div>
        </header>

        <main className="dash-content bills-content">
          <div className="dash-title-row">
            <h1>Bills</h1>
            <button className="tx-add-btn" type="button" onClick={() => setDrawer({ mode: "add", bill: null })}>＋ Add Bill</button>
          </div>

          <div className="bills-summary-grid">
            <Summary label="Upcoming" value={summary.upcoming} tone="blue" />
            <Summary label="Due this month" value={summary.month} tone="purple" />
            <Summary label="Overdue" value={summary.overdue} tone={summary.overdue ? "red" : "green"} />
          </div>

          <div className="tx-filters-panel">
            <div className="search-box tx-search-box">
              <span>⌕</span>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search bills..." />
            </div>

            <div className="tx-type-pills">
              {["All", "Upcoming", "Due today", "Overdue", "Paid"].map(s => (
                <button key={s} type="button" className={`tx-type-pill ${statusFilter === s ? "tx-type-pill-active" : ""}`} onClick={() => setStatusFilter(s)}>{s}</button>
              ))}
            </div>

            <div className="tx-filter-selects">
              <div className="tx-filter-select-wrap">
                <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                  <option value="All">All bill types</option>
                  {BILL_TYPES.map(t => <option key={t}>{t}</option>)}
                </select><span>⌄</span>
              </div>
              {(search || typeFilter !== "All" || statusFilter !== "All") && (
                <button className="tx-clear-filters" type="button" onClick={() => { setSearch(""); setTypeFilter("All"); setStatusFilter("All"); }}>Clear</button>
              )}
            </div>
          </div>

          <div className="bills-list">
            {filtered.map(bill => (
              <BillCard key={bill.id} bill={bill}
                onEdit={() => setDrawer({ mode: "edit", bill })}
                onDelete={() => setDeleteTarget(bill)}
                onPaid={() => markPaid(bill)}
              />
            ))}
            {!filtered.length && <div className="tx-empty"><p>No bills match your filters.</p></div>}
          </div>
        </main>
      </div>

      {drawer && <BillDrawer mode={drawer.mode} bill={drawer.bill} onClose={() => setDrawer(null)} onSave={saveBill} />}

      {deleteTarget && (
        <div className="tx-modal-overlay" onClick={e => e.target === e.currentTarget && setDeleteTarget(null)}>
          <div className="tx-confirm-card" role="alertdialog">
            <div className="bills-delete-icon">!</div>
            <h3 className="tx-confirm-title">Delete this bill?</h3>
            <p className="tx-confirm-sub">“{deleteTarget.name}” will be removed from your bills and reminders.</p>
            <div className="tx-confirm-actions">
              <button className="tx-secondary-btn" onClick={() => setDeleteTarget(null)}>Cancel</button>
              <button className="tx-danger-btn" onClick={deleteBill}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Summary({ label, value, tone }) {
  return <div className={`bills-summary-card bills-summary-${tone}`}>
    <div><p>{label}</p><strong>{money(value)}</strong></div>
    <span className="bills-summary-icon">₹</span>
  </div>;
}

function BillCard({ bill, onEdit, onDelete, onPaid }) {
  const status = statusFor(bill);
  const days = daysUntil(bill.dueDate);
  const statusClass = status === "Overdue" ? "overdue" : status === "Paid" ? "paid" : status === "Due today" ? "today" : "upcoming";
  return (
    <article className={`bills-card bills-card-${statusClass}`}>
      <div className="bills-card-main">
        <div className={`bills-type-icon bills-type-${statusClass}`}>▤</div>
        <div className="bills-card-info">
          <h3>{bill.name}</h3>
          <p>{bill.type} · {bill.category}</p>
        </div>
      </div>
      <div className="bills-card-date"><span>Due date</span><strong>{new Date(`${bill.dueDate}T00:00:00`).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</strong><small>{status === "Overdue" ? `${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"} overdue` : status === "Paid" ? "Paid" : days === 0 ? "Due today" : `In ${days} days`}</small></div>
      <div className="bills-card-amount"><strong>{money(bill.amount)}</strong><span>{bill.frequency}</span></div>
      <div className={`bills-status bills-status-${statusClass}`}>{status}</div>
      <div className="bills-card-actions">
        {status !== "Paid" && <button type="button" className="bills-action-primary" onClick={onPaid}>Mark paid</button>}
        <button type="button" className="bills-action" onClick={onEdit}>Edit</button>
        <button type="button" className="bills-action bills-action-danger" onClick={onDelete}>Delete</button>
      </div>
    </article>
  );
}

function BillDrawer({ mode, bill, onClose, onSave }) {
  const initial = bill || {
    name: "", type: "Rent", amount: "", dueDate: "2026-09-01",
    frequency: "Monthly", category: "", account: "", reminder: "3 days before", notes: ""
  };
  const [draft, setDraft] = useState(initial);
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = e => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const update = (key, value) => setDraft(d => ({ ...d, [key]: value }));

  const submit = e => {
    e.preventDefault();
    if (!draft.name.trim() || !draft.amount || !draft.dueDate) {
      setError("Please enter a bill name, amount, and due date.");
      return;
    }
    onSave({ ...draft, amount: Number(draft.amount) });
  };

  return (
    <div className="tx-drawer-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <aside className="tx-drawer" role="dialog" aria-modal="true">
        <div className="tx-drawer-header">
          <h2>{mode === "edit" ? "Edit Bill" : "Add Bill"}</h2>
          <button className="tx-modal-close" type="button" onClick={onClose}>×</button>
        </div>
        <form className="tx-drawer-body" onSubmit={submit}>
          {error && <p className="ob-error">{error}</p>}
          <Field label="Bill name" required><input value={draft.name} onChange={e => update("name", e.target.value)} placeholder="e.g. Rent" /></Field>
          <Field label="Bill type"><select value={draft.type} onChange={e => update("type", e.target.value)}>{BILL_TYPES.map(t => <option key={t}>{t}</option>)}</select></Field>
          <div className="tx-field-row">
            <Field label="Amount" required><input type="number" min="0" value={draft.amount} onChange={e => update("amount", e.target.value)} placeholder="0" /></Field>
            <Field label="Due date" required><input type="date" value={draft.dueDate} onChange={e => update("dueDate", e.target.value)} /></Field>
          </div>
          <div className="tx-field-row">
            <Field label="Frequency"><select value={draft.frequency} onChange={e => update("frequency", e.target.value)}>{FREQUENCIES.map(f => <option key={f}>{f}</option>)}</select></Field>
            <Field label="Reminder timing"><select value={draft.reminder} onChange={e => update("reminder", e.target.value)}>{["On due date", "1 day before", "3 days before", "7 days before"].map(f => <option key={f}>{f}</option>)}</select></Field>
          </div>
          <Field label="Category"><input value={draft.category} onChange={e => update("category", e.target.value)} placeholder="e.g. Utilities" /></Field>
          <Field label="Account"><input value={draft.account} onChange={e => update("account", e.target.value)} placeholder="e.g. HDFC Bank" /></Field>
          <Field label="Notes"><textarea rows="3" value={draft.notes} onChange={e => update("notes", e.target.value)} placeholder="Optional notes" /></Field>
          <div className="tx-drawer-footer">
            <button type="button" className="tx-secondary-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="signin-btn">{mode === "edit" ? "Save changes" : "Add bill"}</button>
          </div>
        </form>
      </aside>
    </div>
  );
}

function Field({ label, required, children }) {
  return <div className="tx-field"><label className="field-label">{label}{required && <span className="ob-required"> *</span>}</label>{children}</div>;
}
