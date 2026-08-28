import React, { useState, useEffect, useRef, useMemo } from "react";
import "../styles/Dashboard.css";
import "../styles/Transactions.css";
import "../styles/Bills.css";

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
const IconClock = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 7.5V12l3.2 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);
const IconCalendar = (p) => (
  <Icon {...p}>
    <rect x="3.5" y="5.2" width="17" height="15.3" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </Icon>
);
const IconRepeat = (p) => (
  <Icon {...p}>
    <path d="M4 8h11.5L13 5.5M20 16H8.5L11 18.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);
const IconHouse = (p) => (
  <Icon {...p}>
    <path d="M4.5 11 12 5l7.5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.5 10v8.5A1.5 1.5 0 0 0 8 20h8a1.5 1.5 0 0 0 1.5-1.5V10" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </Icon>
);
const IconPercent = (p) => (
  <Icon {...p}>
    <circle cx="7.5" cy="7.5" r="2.3" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="16.5" cy="16.5" r="2.3" stroke="currentColor" strokeWidth="1.6" />
    <path d="M18 6 6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </Icon>
);
const IconCreditCard = (p) => (
  <Icon {...p}>
    <rect x="3.5" y="6" width="17" height="12.5" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3.5 10.2h17" stroke="currentColor" strokeWidth="1.7" />
    <path d="M6.5 14.5h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </Icon>
);
const IconBolt = (p) => (
  <Icon {...p}>
    <path d="M12.5 3.5 5.5 13h5l-1 7.5 8-10.5h-5l1-6.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </Icon>
);
const IconSmartphone = (p) => (
  <Icon {...p}>
    <rect x="7" y="3.2" width="10" height="17.6" rx="2.2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M10.5 17.3h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </Icon>
);
const IconWifi = (p) => (
  <Icon {...p}>
    <path d="M4.5 9.3a11 11 0 0 1 15 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M7.3 12.6a7 7 0 0 1 9.4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M10.1 15.9a3 3 0 0 1 3.8 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="12" cy="18.6" r="1" fill="currentColor" />
  </Icon>
);
const IconShield = (p) => (
  <Icon {...p}>
    <path d="M12 3.8 19 6.3v5.4c0 5-3 7.8-7 8.5-4-.7-7-3.5-7-8.5V6.3L12 3.8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="m9 12 2.2 2.2L15.3 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);
const IconTag = (p) => (
  <Icon {...p}>
    <path d="M11.6 4.5H6A1.5 1.5 0 0 0 4.5 6v5.6c0 .4.2.8.4 1.1l8 8a1.5 1.5 0 0 0 2.1 0l5.2-5.2a1.5 1.5 0 0 0 0-2.1l-8-8a1.5 1.5 0 0 0-1-.4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="8.7" cy="8.7" r="1.2" fill="currentColor" />
  </Icon>
);
const IconSkipForward = (p) => (
  <Icon {...p}>
    <path d="M6 5.5v13l9-6.5-9-6.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M17 5.5v13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
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

const BILL_TYPES = [
  { key: "Rent", label: "Rent", icon: IconHouse, tone: "blue" },
  { key: "EMI", label: "EMI", icon: IconPercent, tone: "red" },
  { key: "Credit Card Bill", label: "Credit Card Bill", icon: IconCreditCard, tone: "red" },
  { key: "Electricity", label: "Electricity", icon: IconBolt, tone: "purple" },
  { key: "Mobile", label: "Mobile", icon: IconSmartphone, tone: "blue" },
  { key: "Internet", label: "Internet", icon: IconWifi, tone: "blue" },
  { key: "Insurance", label: "Insurance", icon: IconShield, tone: "green" },
  { key: "School Fee", label: "School Fee", icon: IconBook, tone: "purple" },
  { key: "Subscription", label: "Subscription", icon: IconRepeat, tone: "purple" },
  { key: "Custom Bill", label: "Custom Bill", icon: IconTag, tone: "blue" },
];

const FREQUENCIES = ["One-time", "Weekly", "Monthly", "Quarterly", "Yearly"];
const REMINDER_OPTIONS = [
  { key: 0, label: "On due date" },
  { key: 1, label: "1 day before" },
  { key: 3, label: "3 days before" },
  { key: 7, label: "1 week before" },
];
const SNOOZE_OPTIONS = [
  { days: 1, label: "1 day" },
  { days: 3, label: "3 days" },
  { days: 7, label: "1 week" },
];
const CATEGORIES = ["Rent", "EMI / Loans", "Utilities", "Insurance", "Education", "Subscriptions", "Other"];
const ACCOUNTS = ["HDFC Bank •• 4521", "Cash Wallet", "ICICI Credit Card •• 8890", "SBI Savings •• 1122", "Zerodha Investment"];

/* Fixed reference "today" so the seeded bills line up predictably with
   overdue / due-today / due-soon / upcoming examples. */
const TODAY = "2026-08-27";

const uid = () => Math.random().toString(36).slice(2, 10);

function typeMeta(key) {
  return BILL_TYPES.find((t) => t.key === key) || BILL_TYPES[BILL_TYPES.length - 1];
}

function daysBetween(fromISO, toISO) {
  const a = new Date(fromISO + "T00:00:00");
  const b = new Date(toISO + "T00:00:00");
  return Math.round((b - a) / 86400000);
}

function addCycle(dateISO, frequency) {
  const d = new Date(dateISO + "T00:00:00");
  if (frequency === "Weekly") d.setDate(d.getDate() + 7);
  else if (frequency === "Monthly") d.setMonth(d.getMonth() + 1);
  else if (frequency === "Quarterly") d.setMonth(d.getMonth() + 3);
  else if (frequency === "Yearly") d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().slice(0, 10);
}

function addDays(dateISO, n) {
  const d = new Date(dateISO + "T00:00:00");
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

function formatDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function formatAmount(n) {
  return Number(n || 0).toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function getStatus(bill) {
  if (bill.paid) return "paid";
  if (bill.snoozedUntil && bill.snoozedUntil > TODAY) return "snoozed";
  const diff = daysBetween(TODAY, bill.dueDate);
  if (diff < 0) return "overdue";
  if (diff === 0) return "due-today";
  if (diff <= 7) return "due-soon";
  return "upcoming";
}

const STATUS_META = {
  overdue: { label: "Overdue", tone: "over", icon: IconAlertTriangle },
  "due-today": { label: "Due today", tone: "near", icon: IconAlertCircle },
  "due-soon": { label: "Due soon", tone: "near", icon: IconClock },
  upcoming: { label: "Upcoming", tone: "safe", icon: IconCalendar },
  paid: { label: "Paid", tone: "paid", icon: IconCheckCircle },
  snoozed: { label: "Snoozed", tone: "snoozed", icon: IconClock },
};

const STATUS_ORDER = { overdue: 0, "due-today": 1, "due-soon": 2, snoozed: 3, upcoming: 4, paid: 5 };

function dueCopy(bill) {
  const diff = daysBetween(TODAY, bill.dueDate);
  if (bill.paid) return `Paid ${formatDate(bill.lastPaidDate)}`;
  if (diff < 0) return `${Math.abs(diff)} day${Math.abs(diff) === 1 ? "" : "s"} overdue`;
  if (diff === 0) return "Due today";
  if (diff === 1) return "Due tomorrow";
  return `Due in ${diff} days`;
}

/* Seed data. */
const SEED_BILLS = [
  { id: uid(), name: "Monthly Rent — Ravi Kumar", type: "Rent", amount: 21500, dueDate: "2026-09-01", frequency: "Monthly", category: "Rent", account: "HDFC Bank •• 4521", reminderDays: 3, notes: "", paid: false, lastPaidDate: "2026-08-01", snoozedUntil: null },
  { id: uid(), name: "Car Loan EMI", type: "EMI", amount: 12400, dueDate: "2026-08-25", frequency: "Monthly", category: "EMI / Loans", account: "HDFC Bank •• 4521", reminderDays: 3, notes: "Auto-debit usually fails without balance top-up", paid: false, lastPaidDate: "2026-07-25", snoozedUntil: null },
  { id: uid(), name: "ICICI Credit Card Bill", type: "Credit Card Bill", amount: 15800, dueDate: "2026-08-28", frequency: "Monthly", category: "EMI / Loans", account: "ICICI Credit Card •• 8890", reminderDays: 5, notes: "", paid: false, lastPaidDate: "2026-07-28", snoozedUntil: null },
  { id: uid(), name: "BESCOM Electricity", type: "Electricity", amount: 2400, dueDate: "2026-09-05", frequency: "Monthly", category: "Utilities", account: "SBI Savings •• 1122", reminderDays: 3, notes: "", paid: false, lastPaidDate: "2026-08-04", snoozedUntil: null },
  { id: uid(), name: "Jio Postpaid", type: "Mobile", amount: 599, dueDate: "2026-08-27", frequency: "Monthly", category: "Utilities", account: "Cash Wallet", reminderDays: 1, notes: "", paid: false, lastPaidDate: "2026-07-27", snoozedUntil: null },
  { id: uid(), name: "ACT Fibernet", type: "Internet", amount: 1199, dueDate: "2026-09-10", frequency: "Monthly", category: "Utilities", account: "HDFC Bank •• 4521", reminderDays: 3, notes: "", paid: false, lastPaidDate: "2026-08-10", snoozedUntil: null },
  { id: uid(), name: "Term Life Insurance", type: "Insurance", amount: 18000, dueDate: "2027-02-15", frequency: "Yearly", category: "Insurance", account: "HDFC Bank •• 4521", reminderDays: 7, notes: "LIC policy #4471", paid: false, lastPaidDate: "2026-02-15", snoozedUntil: null },
  { id: uid(), name: "Kid's School Fee — Term 2", type: "School Fee", amount: 45000, dueDate: "2026-11-01", frequency: "Quarterly", category: "Education", account: "SBI Savings •• 1122", reminderDays: 7, notes: "", paid: false, lastPaidDate: "2026-08-01", snoozedUntil: null },
  { id: uid(), name: "Netflix Premium", type: "Subscription", amount: 649, dueDate: "2026-09-17", frequency: "Monthly", category: "Subscriptions", account: "ICICI Credit Card •• 8890", reminderDays: 1, notes: "", paid: false, lastPaidDate: "2026-08-17", snoozedUntil: null },
  { id: uid(), name: "Cult Gym Membership", type: "Subscription", amount: 1500, dueDate: "2026-08-26", frequency: "Monthly", category: "Subscriptions", account: "Cash Wallet", reminderDays: 1, notes: "", paid: false, lastPaidDate: "2026-07-26", snoozedUntil: "2026-08-30" },
  { id: uid(), name: "Society Maintenance — August", type: "Custom Bill", amount: 3200, dueDate: "2026-08-20", frequency: "One-time", category: "Other", account: "HDFC Bank •• 4521", reminderDays: 3, notes: "", paid: true, lastPaidDate: "2026-08-19", snoozedUntil: null },
];

function emptyDraft() {
  return {
    id: null,
    name: "",
    type: "Rent",
    amount: "",
    dueDate: TODAY,
    frequency: "Monthly",
    category: "",
    account: "",
    reminderDays: 3,
    notes: "",
  };
}

/* ---------------------------------------------------------------- */
/* Main page                                                         */
/* ---------------------------------------------------------------- */

export default function Bills() {
  const [active] = useState("Bills");
  const [openMenu, setOpenMenu] = useState(null);
  const wrapRef = useRef(null);

  const [bills, setBills] = useState(SEED_BILLS);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [recurFilter, setRecurFilter] = useState("All");

  const [drawer, setDrawer] = useState(null); // { mode: "add" | "edit", bill }
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [snoozeMenuId, setSnoozeMenuId] = useState(null);

  const toggleMenu = (name) => setOpenMenu((cur) => (cur === name ? null : name));

  useEffect(() => {
    const onDocClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpenMenu(null);
        setSnoozeMenuId(null);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const withStatus = useMemo(
    () => bills.map((b) => ({ ...b, status: getStatus(b) })),
    [bills]
  );

  const filtered = useMemo(() => {
    return withStatus
      .filter((b) => {
        if (statusFilter === "Due Soon" && !(b.status === "due-today" || b.status === "due-soon")) return false;
        if (statusFilter !== "All" && statusFilter !== "Due Soon") {
          const map = { Overdue: "overdue", Upcoming: "upcoming", Paid: "paid", Snoozed: "snoozed" };
          if (b.status !== map[statusFilter]) return false;
        }
        if (typeFilter !== "All" && b.type !== typeFilter) return false;
        if (recurFilter === "One-time" && b.frequency !== "One-time") return false;
        if (recurFilter === "Recurring" && b.frequency === "One-time") return false;
        if (search.trim() && !b.name.toLowerCase().includes(search.trim().toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => {
        const orderDiff = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
        if (orderDiff !== 0) return orderDiff;
        return a.dueDate < b.dueDate ? -1 : 1;
      });
  }, [withStatus, statusFilter, typeFilter, recurFilter, search]);

  const stats = useMemo(() => {
    const overdue = withStatus.filter((b) => b.status === "overdue");
    const dueSoon = withStatus.filter((b) => b.status === "due-today" || b.status === "due-soon");
    const upcoming = withStatus.filter((b) => b.status === "upcoming");
    const paidThisMonth = withStatus.filter((b) => b.lastPaidDate && b.lastPaidDate.slice(0, 7) === TODAY.slice(0, 7) && (b.paid || b.status !== "overdue"));
    const sum = (list) => list.reduce((s, b) => s + b.amount, 0);
    return {
      overdue: { count: overdue.length, amount: sum(overdue) },
      dueSoon: { count: dueSoon.length, amount: sum(dueSoon) },
      upcoming: { count: upcoming.length, amount: sum(upcoming) },
      paid: { count: paidThisMonth.length, amount: sum(paidThisMonth) },
    };
  }, [withStatus]);

  const openAdd = () => setDrawer({ mode: "add", bill: emptyDraft() });
  const openEdit = (b) => setDrawer({ mode: "edit", bill: { ...b, amount: String(b.amount) } });
  const closeDrawer = () => setDrawer(null);

  const saveBill = (draft) => {
    const amount = Number(draft.amount);
    const reminderDays = Number(draft.reminderDays);
    if (draft.id) {
      setBills((list) =>
        list.map((b) =>
          b.id === draft.id
            ? { ...b, name: draft.name, type: draft.type, amount, dueDate: draft.dueDate, frequency: draft.frequency, category: draft.category, account: draft.account, reminderDays, notes: draft.notes }
            : b
        )
      );
    } else {
      setBills((list) => [
        {
          id: uid(),
          name: draft.name,
          type: draft.type,
          amount,
          dueDate: draft.dueDate,
          frequency: draft.frequency,
          category: draft.category,
          account: draft.account,
          reminderDays,
          notes: draft.notes,
          paid: false,
          lastPaidDate: null,
          snoozedUntil: null,
        },
        ...list,
      ]);
    }
    setDrawer(null);
  };

  const markPaid = (bill) => {
    setBills((list) =>
      list.map((b) => {
        if (b.id !== bill.id) return b;
        if (b.frequency === "One-time") return { ...b, paid: true, lastPaidDate: TODAY, snoozedUntil: null };
        return { ...b, paid: false, lastPaidDate: TODAY, dueDate: addCycle(b.dueDate, b.frequency), snoozedUntil: null };
      })
    );
  };

  const skipCycle = (bill) => {
    setBills((list) =>
      list.map((b) => (b.id === bill.id ? { ...b, dueDate: addCycle(b.dueDate, b.frequency), snoozedUntil: null } : b))
    );
  };

  const snoozeBill = (bill, days) => {
    setBills((list) => list.map((b) => (b.id === bill.id ? { ...b, snoozedUntil: addDays(TODAY, days) } : b)));
    setSnoozeMenuId(null);
  };

  const clearSnooze = (bill) => {
    setBills((list) => list.map((b) => (b.id === bill.id ? { ...b, snoozedUntil: null } : b)));
    setSnoozeMenuId(null);
  };

  const requestDelete = (b) => setDeleteTarget(b);
  const confirmDelete = () => {
    setBills((list) => list.filter((b) => b.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setTypeFilter("All");
    setRecurFilter("All");
  };

  const hasActiveFilters = search || statusFilter !== "All" || typeFilter !== "All" || recurFilter !== "All";

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

        <main className="dash-content bill-content">
          <div className="dash-title-row">
            <h1>Bills &amp; Reminders</h1>
            <button type="button" className="tx-add-btn" onClick={openAdd}>
              <IconPlus size={15} /> Add Bill
            </button>
          </div>

          {/* ---------------- Dashboard stats ---------------- */}
          <div className="bill-stats-grid">
            <StatCard tone="over" icon={IconAlertTriangle} label="Overdue" count={stats.overdue.count} amount={stats.overdue.amount} />
            <StatCard tone="near" icon={IconClock} label="Due this week" count={stats.dueSoon.count} amount={stats.dueSoon.amount} />
            <StatCard tone="blue" icon={IconCalendar} label="Upcoming" count={stats.upcoming.count} amount={stats.upcoming.amount} />
            <StatCard tone="paid" icon={IconCheckCircle} label="Paid this month" count={stats.paid.count} amount={stats.paid.amount} />
          </div>

          {/* ---------------- Filters ---------------- */}
          <div className="tx-filters-panel">
            <div className="search-box tx-search-box">
              <IconSearch size={15} />
              <input
                type="text"
                placeholder="Search bills..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="tx-type-pills">
              {["All", "Overdue", "Due Soon", "Upcoming", "Paid", "Snoozed"].map((s) => (
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
                  <option value="All">All bill types</option>
                  {BILL_TYPES.map((t) => <option key={t.key} value={t.key}>{t.label}</option>)}
                </select>
                <IconChevronDown size={13} />
              </div>

              <div className="tx-filter-select-wrap">
                <select value={recurFilter} onChange={(e) => setRecurFilter(e.target.value)}>
                  <option value="All">One-time &amp; recurring</option>
                  <option value="One-time">One-time only</option>
                  <option value="Recurring">Recurring only</option>
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

          {/* ---------------- Bills list ---------------- */}
          <div className="bill-list">
            {filtered.map((b) => (
              <BillCard
                key={b.id}
                bill={b}
                snoozeOpen={snoozeMenuId === b.id}
                onToggleSnoozeMenu={() => setSnoozeMenuId((cur) => (cur === b.id ? null : b.id))}
                onSnooze={(days) => snoozeBill(b, days)}
                onClearSnooze={() => clearSnooze(b)}
                onMarkPaid={() => markPaid(b)}
                onSkipCycle={() => skipCycle(b)}
                onEdit={() => openEdit(b)}
                onDelete={() => requestDelete(b)}
              />
            ))}

            {filtered.length === 0 && (
              <div className="tx-empty bill-empty">
                <p>No bills match your filters.</p>
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
        <BillDrawer mode={drawer.mode} bill={drawer.bill} onClose={closeDrawer} onSave={saveBill} />
      )}

      {/* ---------------- Delete confirmation ---------------- */}
      {deleteTarget && (
        <div className="tx-modal-overlay" onClick={(e) => e.target === e.currentTarget && setDeleteTarget(null)}>
          <div className="tx-confirm-card" role="alertdialog" aria-modal="true">
            <span className="tx-confirm-icon"><IconAlertTriangle size={20} /></span>
            <h3 className="tx-confirm-title">Delete this bill?</h3>
            <p className="tx-confirm-sub">
              "{deleteTarget.name}" and its reminder will be removed. This action can't be undone.
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
/* Dashboard stat card                                               */
/* ---------------------------------------------------------------- */

function StatCard({ tone, icon: StatIcon, label, count, amount }) {
  return (
    <div className={`bill-stat-card bill-stat-${tone}`}>
      <span className="bill-stat-icon"><StatIcon size={16} /></span>
      <div>
        <p className="bill-stat-label">{label}</p>
        <p className="bill-stat-value">₹{formatAmount(amount)}</p>
        <p className="bill-stat-count">{count} bill{count === 1 ? "" : "s"}</p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Bill card                                                         */
/* ---------------------------------------------------------------- */

function BillCard({ bill: b, snoozeOpen, onToggleSnoozeMenu, onSnooze, onClearSnooze, onMarkPaid, onSkipCycle, onEdit, onDelete }) {
  const meta = typeMeta(b.type);
  const TypeIcon = meta.icon;
  const sMeta = STATUS_META[b.status];
  const StatusIcon = sMeta.icon;
  const isRecurring = b.frequency !== "One-time";
  const isDone = b.status === "paid";

  return (
    <div className={`bill-card bill-card-${sMeta.tone}`}>
      <div className="bill-card-main">
        <span className={`bill-type-icon bill-type-icon-${meta.tone}`}>
          <TypeIcon size={17} />
        </span>

        <div className="bill-card-info">
          <div className="bill-card-title-row">
            <p className="bill-card-name">{b.name}</p>
            <span className={`bill-status-badge bill-status-badge-${sMeta.tone}`}>
              <StatusIcon size={11} /> {sMeta.label}
            </span>
          </div>
          <div className="bill-card-chips">
            <span className="bill-chip">{meta.label}</span>
            <span className="bill-chip">{b.category}</span>
            <span className="bill-chip">{b.account}</span>
            <span className="bill-chip bill-chip-freq">
              {isRecurring ? <IconRepeat size={10} /> : null} {b.frequency}
            </span>
          </div>
          {b.status === "snoozed" ? (
            <p className="bill-due-note">Snoozed until {formatDate(b.snoozedUntil)} · originally due {formatDate(b.dueDate)}</p>
          ) : (
            <p className="bill-due-note">
              {dueCopy(b)} · {formatDate(b.dueDate)}
              {!isDone && <> · reminds {b.reminderDays === 0 ? "on due date" : `${b.reminderDays}d before`}</>}
            </p>
          )}
          {b.notes && <p className="bill-notes">{b.notes}</p>}
        </div>

        <div className="bill-card-amount-block">
          <p className="bill-card-amount">₹{formatAmount(b.amount)}</p>
        </div>
      </div>

      <div className="bill-card-actions">
        {!isDone && (
          <button type="button" className="signin-btn bill-action-btn" onClick={onMarkPaid}>
            <IconCheckCircle size={13} /> Mark Paid
          </button>
        )}

        {!isDone && isRecurring && (
          <button type="button" className="tx-secondary-btn bill-action-btn" onClick={onSkipCycle}>
            <IconSkipForward size={13} /> Skip Cycle
          </button>
        )}

        {!isDone && (
          <div className="dropdown-wrap bill-snooze-wrap">
            <button type="button" className="tx-secondary-btn bill-action-btn" onClick={onToggleSnoozeMenu}>
              <IconClock size={13} /> {b.status === "snoozed" ? "Snoozed" : "Snooze"}
            </button>
            {snoozeOpen && (
              <div className="dropdown-panel bill-snooze-menu">
                <p className="dropdown-title">Snooze reminder</p>
                {SNOOZE_OPTIONS.map((opt) => (
                  <button key={opt.days} type="button" className="dropdown-item" onClick={() => onSnooze(opt.days)}>
                    <IconClock size={14} /> {opt.label}
                  </button>
                ))}
                {b.status === "snoozed" && (
                  <>
                    <div className="dropdown-divider" />
                    <button type="button" className="dropdown-item dropdown-item-danger" onClick={onClearSnooze}>
                      <IconX size={14} /> Clear snooze
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        <span className="bill-actions-spacer" />

        <button type="button" className="tx-icon-btn" aria-label="Edit bill" onClick={onEdit}>
          <IconEdit size={14} />
        </button>
        <button type="button" className="tx-icon-btn tx-icon-btn-danger" aria-label="Delete bill" onClick={onDelete}>
          <IconTrash size={14} />
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Add / edit drawer                                                 */
/* ---------------------------------------------------------------- */

function BillDrawer({ mode, bill, onClose, onSave }) {
  const [draft, setDraft] = useState(bill);
  const [errors, setErrors] = useState({});
  const isEdit = mode === "edit";

  useEffect(() => {
    setDraft(bill);
    setErrors({});
  }, [bill]);

  useEffect(() => {
    const onKeyDown = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const update = (key, value) => setDraft((d) => ({ ...d, [key]: value }));

  const validate = () => {
    const e = {};
    if (!draft.name.trim()) e.name = "Enter a bill name";
    if (!draft.amount || Number(draft.amount) <= 0) e.amount = "Enter a valid amount";
    if (!draft.dueDate) e.dueDate = "Required";
    if (!draft.category) e.category = "Required";
    if (!draft.account) e.account = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave(draft);
  };

  return (
    <div className="tx-drawer-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="tx-drawer" role="dialog" aria-modal="true" aria-labelledby="bill-drawer-title">
        <div className="tx-drawer-header">
          <h2 id="bill-drawer-title">{isEdit ? "Edit Bill" : "Add Bill / Reminder"}</h2>
          <button type="button" className="tx-modal-close" onClick={onClose} aria-label="Close">
            <IconX size={16} />
          </button>
        </div>

        <div className="tx-drawer-body">
          <div className="tx-form">
            <div className="tx-field">
              <label className="field-label" htmlFor="bill-name">Bill name <span className="tx-required">*</span></label>
              <div className="input-wrap">
                <span className="input-icon"><IconReceipt size={16} /></span>
                <input
                  id="bill-name" type="text" placeholder="e.g. Monthly Rent"
                  value={draft.name} onChange={(e) => update("name", e.target.value)}
                />
              </div>
              {errors.name && <p className="tx-error">{errors.name}</p>}
            </div>

            <div className="tx-field">
              <label className="field-label">Bill type</label>
              <div className="bill-type-grid">
                {BILL_TYPES.map((t) => {
                  const TIcon = t.icon;
                  return (
                    <button
                      key={t.key}
                      type="button"
                      className={`tx-choice-card bill-type-choice ${draft.type === t.key ? "tx-choice-card-active" : ""}`}
                      onClick={() => update("type", t.key)}
                    >
                      <TIcon size={14} />
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="tx-field-row">
              <div style={{ flex: 1 }}>
                <label className="field-label" htmlFor="bill-amount">Amount <span className="tx-required">*</span></label>
                <div className="input-wrap">
                  <span className="input-icon tx-currency-prefix">₹</span>
                  <input
                    id="bill-amount" type="number" min="0" step="0.01" placeholder="0.00"
                    value={draft.amount} onChange={(e) => update("amount", e.target.value)}
                  />
                </div>
                {errors.amount && <p className="tx-error">{errors.amount}</p>}
              </div>
              <div style={{ flex: 1 }}>
                <label className="field-label" htmlFor="bill-due">Due date <span className="tx-required">*</span></label>
                <div className="input-wrap">
                  <span className="input-icon"><IconCalendar size={16} /></span>
                  <input id="bill-due" type="date" value={draft.dueDate} onChange={(e) => update("dueDate", e.target.value)} />
                </div>
                {errors.dueDate && <p className="tx-error">{errors.dueDate}</p>}
              </div>
            </div>

            <div className="tx-field-row">
              <div style={{ flex: 1 }}>
                <label className="field-label" htmlFor="bill-frequency">Frequency</label>
                <div className="input-wrap tx-select-wrap">
                  <span className="input-icon"><IconRepeat size={16} /></span>
                  <select id="bill-frequency" className="tx-select" value={draft.frequency} onChange={(e) => update("frequency", e.target.value)}>
                    {FREQUENCIES.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                  <span className="tx-select-chevron"><IconChevronDown size={15} /></span>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <label className="field-label" htmlFor="bill-reminder">Reminder timing</label>
                <div className="input-wrap tx-select-wrap">
                  <span className="input-icon"><IconBell size={16} /></span>
                  <select id="bill-reminder" className="tx-select" value={draft.reminderDays} onChange={(e) => update("reminderDays", Number(e.target.value))}>
                    {REMINDER_OPTIONS.map((r) => <option key={r.key} value={r.key}>{r.label}</option>)}
                  </select>
                  <span className="tx-select-chevron"><IconChevronDown size={15} /></span>
                </div>
              </div>
            </div>

            <div className="tx-field-row">
              <div style={{ flex: 1 }}>
                <label className="field-label" htmlFor="bill-category">Category <span className="tx-required">*</span></label>
                <div className="input-wrap tx-select-wrap">
                  <span className="input-icon"><IconPieChart size={16} /></span>
                  <select id="bill-category" className="tx-select" value={draft.category} onChange={(e) => update("category", e.target.value)}>
                    <option value="" disabled>Select category</option>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <span className="tx-select-chevron"><IconChevronDown size={15} /></span>
                </div>
                {errors.category && <p className="tx-error">{errors.category}</p>}
              </div>
              <div style={{ flex: 1 }}>
                <label className="field-label" htmlFor="bill-account">Pay from account <span className="tx-required">*</span></label>
                <div className="input-wrap tx-select-wrap">
                  <span className="input-icon"><IconWallet size={16} /></span>
                  <select id="bill-account" className="tx-select" value={draft.account} onChange={(e) => update("account", e.target.value)}>
                    <option value="" disabled>Select account</option>
                    {ACCOUNTS.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                  <span className="tx-select-chevron"><IconChevronDown size={15} /></span>
                </div>
                {errors.account && <p className="tx-error">{errors.account}</p>}
              </div>
            </div>

            <div className="tx-field">
              <label className="field-label" htmlFor="bill-notes">Notes</label>
              <textarea
                id="bill-notes" className="tx-textarea" rows={3} placeholder="Optional notes about this bill..."
                value={draft.notes} onChange={(e) => update("notes", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="tx-drawer-footer">
          <button type="button" className="tx-secondary-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="signin-btn" onClick={handleSave}>
            {isEdit ? "Save Changes" : "Add Bill"}
          </button>
        </div>
      </div>
    </div>
  );
}
