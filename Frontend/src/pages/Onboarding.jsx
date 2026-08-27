import React, { useState, useMemo, useEffect, useRef } from "react";
import "../styles/Onboarding.css";

/* ---------------------------------------------------------------- */
/* Subscription configuration                                        */
/* In the real app this should be imported from the app's shared     */
/* subscription config (e.g. `config/subscriptionPlans.js`) so the   */
/* pricing shown here always matches billing. Kept local + isolated  */
/* here so it's a one-line swap: replace this constant with an       */
/* import from that config module.                                   */
/* ---------------------------------------------------------------- */
const SUBSCRIPTION_PLANS = {
  freeTrial: {
    id: "free_trial",
    name: "Free Trial",
    price: "₹0",
    cadence: "15 days",
    perks: ["Full basic functionality", "No automatic charge without approval"],
  },
  quarterly: {
    id: "basic_quarterly",
    name: "Basic Quarterly",
    price: "₹49",
    cadence: "Every 3 months",
    perks: ["Continued access after the trial", "Paid subscription"],
  },
  annual: {
    id: "basic_annual",
    name: "Basic Annual",
    price: "₹99",
    cadence: "Per year",
    perks: ["Continued access after the trial", "Paid subscription"],
  },
};

/* ---------------------------------------------------------------- */
/* Small shared icons (mirrors icon style used in Dashboard.jsx)     */
/* ---------------------------------------------------------------- */

const Icon = ({ children, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    {children}
  </svg>
);

const IconUser = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.6" />
    <path d="M4.5 19.5c1.6-3.5 4.4-5.3 7.5-5.3s5.9 1.8 7.5 5.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </Icon>
);

const IconMail = (p) => (
  <Icon {...p}>
    <path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v11A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5v-11Z" stroke="currentColor" strokeWidth="1.6" />
    <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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

const IconClock = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 7.3V12l3.2 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);

const IconChevronDown = (p) => (
  <Icon {...p}>
    <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);

const IconCheck = (p) => (
  <Icon {...p}>
    <path d="m5 12.5 4.5 4.5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);

const IconX = (p) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </Icon>
);

const IconArrowLeft = (p) => (
  <Icon {...p}>
    <path d="M19 12H5M5 12l6-6M5 12l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
);

/* ---------------------------------------------------------------- */
/* Static option data                                                */
/* ---------------------------------------------------------------- */

const COUNTRIES = ["India", "United States", "United Kingdom", "United Arab Emirates", "Singapore", "Australia", "Canada", "Other"];
const CURRENCIES = ["INR (₹)", "USD ($)", "EUR (€)", "GBP (£)", "AED (د.إ)", "SGD ($)", "AUD ($)", "CAD ($)"];
const TIMEZONES = ["IST (UTC+5:30)", "PST (UTC-8:00)", "EST (UTC-5:00)", "GST (UTC+4:00)", "SGT (UTC+8:00)", "AEST (UTC+10:00)", "GMT (UTC+0:00)"];

const INCOME_SOURCES = ["Salary", "Freelance", "Business", "Investments", "Other"];
const INCOME_RANGES = [
  "Below ₹20,000",
  "₹20,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹2,00,000",
  "Above ₹2,00,000",
  "Prefer not to say",
];
const INCOME_MODES = ["Bank account", "Cash", "UPI", "Multiple sources"];
const FINANCIAL_GOALS = [
  "Track my spending",
  "Save money",
  "Control unnecessary expenses",
  "Manage monthly budget",
  "Pay bills on time",
  "Track subscriptions",
  "Build an emergency fund",
  "Other",
];
const SPENDING_HABITS = ["Very careful", "Mostly controlled", "Sometimes overspend", "Frequently overspend", "Prefer not to say"];
const EXPENSE_TYPES = ["Food", "Shopping", "Rent", "EMI / Loans", "Utilities", "Travel", "Entertainment", "Education", "Healthcare", "Subscriptions", "Other"];

const ACCOUNT_TYPES = ["Bank Account", "Cash Wallet", "Credit Card", "Savings Account", "Investment Account", "Other"];

const REMINDER_FREQUENCY = ["Never", "On the due date", "1 day before", "3 days before", "7 days before"];
const NOTIFICATION_TYPES = [
  "Expense reminders",
  "Budget alerts",
  "Upcoming bill reminders",
  "Subscription reminders",
  "Overspending alerts",
  "Payment notifications",
];

const STEPS = ["Personal", "Financial", "Accounts", "Preferences", "Plan"];

/* ---------------------------------------------------------------- */
/* Small reusable field building blocks                              */
/* ---------------------------------------------------------------- */

function TextField({ id, label, icon, required, ...inputProps }) {
  return (
    <div className="ob-field">
      <label className="field-label" htmlFor={id}>
        {label} {required && <span className="ob-required">*</span>}
      </label>
      <div className="input-wrap">
        <span className="input-icon" aria-hidden="true">
          {icon}
        </span>
        <input id={id} {...inputProps} />
      </div>
    </div>
  );
}

function SelectField({ id, label, icon, required, value, onChange, options, placeholder }) {
  return (
    <div className="ob-field">
      <label className="field-label" htmlFor={id}>
        {label} {required && <span className="ob-required">*</span>}
      </label>
      <div className="input-wrap ob-select-wrap">
        <span className="input-icon" aria-hidden="true">
          {icon}
        </span>
        <select id={id} value={value} onChange={onChange} className="ob-select">
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <span className="ob-select-chevron" aria-hidden="true">
          <IconChevronDown size={15} />
        </span>
      </div>
    </div>
  );
}

function RadioCardGroup({ name, options, value, onChange, columns = 2 }) {
  return (
    <div className="ob-choice-grid" style={{ "--ob-cols": columns }}>
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            type="button"
            key={opt}
            className={`ob-choice-card ${active ? "ob-choice-card-active" : ""}`}
            onClick={() => onChange(opt)}
            aria-pressed={active}
          >
            <span className="ob-choice-radio">{active && <span className="ob-choice-radio-dot" />}</span>
            <span>{opt}</span>
          </button>
        );
      })}
    </div>
  );
}

function CheckboxChipGroup({ options, values, onToggle, columns = 2 }) {
  return (
    <div className="ob-choice-grid" style={{ "--ob-cols": columns }}>
      {options.map((opt) => {
        const active = values.includes(opt);
        return (
          <button
            type="button"
            key={opt}
            className={`ob-choice-card ${active ? "ob-choice-card-active" : ""}`}
            onClick={() => onToggle(opt)}
            aria-pressed={active}
          >
            <span className={`ob-choice-check ${active ? "ob-choice-check-active" : ""}`}>
              {active && <IconCheck size={11} />}
            </span>
            <span>{opt}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Main component                                                    */
/* ---------------------------------------------------------------- */

export default function Onboarding({ onFinishTrial, onGoToCheckout }) {
  const [step, setStep] = useState(0);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    // Step 1 — Personal
    fullName: "",
    email: "",
    mobile: "",
    country: "",
    currency: "",
    timezone: "",
    // Step 2 — Financial
    incomeSource: "",
    incomeRange: "",
    incomeMode: "",
    financialGoals: [],
    spendingHabit: "",
    expenseTypes: [],
    // Step 3 — Accounts
    accountTypes: [],
    includeAllInBalance: "",
    setOpeningBalance: "",
    // Step 4 — Preferences
    reminderFrequency: "",
    notificationTypes: [],
    wantsInsights: "",
  });

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const toggleInList = (key, value) =>
    setForm((f) => ({
      ...f,
      [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value],
    }));

  /* ---------------- Validation per step ---------------- */
  const validateStep = () => {
    const e = {};
    if (step === 0) {
      if (!form.fullName.trim()) e.fullName = "Required";
      if (!form.email.trim()) e.email = "Required";
      else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
      if (!form.mobile.trim()) e.mobile = "Required";
      if (!form.country) e.country = "Required";
      if (!form.currency) e.currency = "Required";
      if (!form.timezone) e.timezone = "Required";
    }
    // Steps 2 (Financial) and 3 (Accounts) are intentionally optional /
    // skippable per the product requirement — no hard validation here.
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goNext = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleStartFreeTrial = () => {
    // Marks onboarding complete + starts the 15-day trial.
    // TODO: wire up to POST /onboarding/complete { plan: 'free_trial', ...form }
    if (onFinishTrial) onFinishTrial(form);
  };

  const handleChooseSubscription = (planKey) => {
    // Subscription is NOT activated here — user is routed to checkout,
    // and activation only happens after payment is verified server-side.
    // TODO: wire up to navigate to /checkout?plan=<planId>
    if (onGoToCheckout) onGoToCheckout(planKey, form);
  };

  return (
    <div className="ob-page">
      <div className="ob-box">
        <div className="brand-row">
          <div className="brand-logo">P</div>
          <span className="brand-name">Prakura</span>
        </div>

        <ProgressBar step={step} />

        <div className="ob-step-body">
          {step === 0 && <StepPersonal form={form} update={update} errors={errors} />}
          {step === 1 && <StepFinancial form={form} update={update} toggleInList={toggleInList} />}
          {step === 2 && <StepAccounts form={form} update={update} toggleInList={toggleInList} />}
          {step === 3 && <StepPreferences form={form} update={update} toggleInList={toggleInList} />}
          {step === 4 && (
            <StepPlan
              onOpenCompare={() => setShowPlanModal(true)}
              onStartFreeTrial={handleStartFreeTrial}
              onChooseSubscription={handleChooseSubscription}
            />
          )}
        </div>

        {step < STEPS.length - 1 && (
          <div className="ob-nav-row">
            <button type="button" className="ob-back-btn" onClick={goBack} disabled={step === 0}>
              <IconArrowLeft size={15} /> Back
            </button>
            <button type="button" className="signin-btn ob-continue-btn" onClick={goNext}>
              Continue
            </button>
          </div>
        )}

        {step === STEPS.length - 1 && (
          <div className="ob-nav-row ob-nav-row-plan">
            <button type="button" className="ob-back-btn" onClick={goBack}>
              <IconArrowLeft size={15} /> Back
            </button>
          </div>
        )}
      </div>

      {showPlanModal && <PlanCompareModal onClose={() => setShowPlanModal(false)} />}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Progress bar                                                      */
/* ---------------------------------------------------------------- */

function ProgressBar({ step }) {
  return (
    <div className="ob-progress" role="list">
      {STEPS.map((label, i) => {
        const state = i < step ? "done" : i === step ? "active" : "upcoming";
        return (
          <React.Fragment key={label}>
            <div className={`ob-progress-node ob-progress-${state}`} role="listitem">
              <span className="ob-progress-dot">{state === "done" ? <IconCheck size={11} /> : i + 1}</span>
              <span className="ob-progress-label">{label}</span>
            </div>
            {i < STEPS.length - 1 && <span className={`ob-progress-line ${i < step ? "ob-progress-line-done" : ""}`} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Step 1 — Personal information                                     */
/* ---------------------------------------------------------------- */

function StepPersonal({ form, update, errors }) {
  return (
    <div className="ob-step">
      <h1 className="welcome-title">Tell us about yourself</h1>
      <p className="welcome-subtitle">This helps us set up your Prakura profile.</p>

      <TextField
        id="fullName"
        label="Full name"
        icon={<IconUser size={18} />}
        required
        type="text"
        placeholder="Prakura Sharma"
        value={form.fullName}
        onChange={(e) => update("fullName", e.target.value)}
      />
      {errors.fullName && <p className="ob-error">{errors.fullName}</p>}

      <TextField
        id="email"
        label="Email address"
        icon={<IconMail size={18} />}
        required
        type="email"
        placeholder="prakura@gmail.com"
        value={form.email}
        onChange={(e) => update("email", e.target.value)}
      />
      {errors.email && <p className="ob-error">{errors.email}</p>}

      <TextField
        id="mobile"
        label="Mobile number"
        icon={<IconPhone size={18} />}
        required
        type="tel"
        placeholder="+91 98765 43210"
        value={form.mobile}
        onChange={(e) => update("mobile", e.target.value)}
      />
      {errors.mobile && <p className="ob-error">{errors.mobile}</p>}

      <div className="ob-field-row">
        <div style={{ flex: 1 }}>
          <SelectField
            id="country"
            label="Country"
            icon={<IconGlobe size={18} />}
            required
            placeholder="Select country"
            options={COUNTRIES}
            value={form.country}
            onChange={(e) => update("country", e.target.value)}
          />
          {errors.country && <p className="ob-error">{errors.country}</p>}
        </div>
      </div>

      <div className="ob-field-row">
        <div style={{ flex: 1 }}>
          <SelectField
            id="currency"
            label="Preferred currency"
            icon={<IconCoin size={18} />}
            required
            placeholder="Select currency"
            options={CURRENCIES}
            value={form.currency}
            onChange={(e) => update("currency", e.target.value)}
          />
          {errors.currency && <p className="ob-error">{errors.currency}</p>}
        </div>
        <div style={{ flex: 1 }}>
          <SelectField
            id="timezone"
            label="Time zone"
            icon={<IconClock size={18} />}
            required
            placeholder="Select time zone"
            options={TIMEZONES}
            value={form.timezone}
            onChange={(e) => update("timezone", e.target.value)}
          />
          {errors.timezone && <p className="ob-error">{errors.timezone}</p>}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Step 2 — Financial information                                    */
/* ---------------------------------------------------------------- */

function StepFinancial({ form, update, toggleInList }) {
  return (
    <div className="ob-step">
      <h1 className="welcome-title">Your financial setup</h1>
      <p className="welcome-subtitle">Optional — skip anything you'd rather not share.</p>

      <p className="ob-question">What is your primary source of income?</p>
      <RadioCardGroup name="incomeSource" options={INCOME_SOURCES} value={form.incomeSource} onChange={(v) => update("incomeSource", v)} columns={3} />

      <p className="ob-question">What is your approximate monthly income?</p>
      <RadioCardGroup name="incomeRange" options={INCOME_RANGES} value={form.incomeRange} onChange={(v) => update("incomeRange", v)} columns={2} />

      <p className="ob-question">How do you usually receive your income?</p>
      <RadioCardGroup name="incomeMode" options={INCOME_MODES} value={form.incomeMode} onChange={(v) => update("incomeMode", v)} columns={2} />

      <p className="ob-question">What are your main financial goals? <span className="ob-hint">(select all that apply)</span></p>
      <CheckboxChipGroup options={FINANCIAL_GOALS} values={form.financialGoals} onToggle={(v) => toggleInList("financialGoals", v)} columns={2} />

      <p className="ob-question">How would you describe your spending habits?</p>
      <RadioCardGroup name="spendingHabit" options={SPENDING_HABITS} value={form.spendingHabit} onChange={(v) => update("spendingHabit", v)} columns={2} />

      <p className="ob-question">What types of expenses do you want to track? <span className="ob-hint">(select all that apply)</span></p>
      <CheckboxChipGroup options={EXPENSE_TYPES} values={form.expenseTypes} onToggle={(v) => toggleInList("expenseTypes", v)} columns={3} />
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Step 3 — Accounts & money setup                                   */
/* ---------------------------------------------------------------- */

function StepAccounts({ form, update, toggleInList }) {
  return (
    <div className="ob-step">
      <h1 className="welcome-title">Accounts & money setup</h1>
      <p className="welcome-subtitle">Tell us where your money lives — you can edit this later.</p>

      <p className="ob-question">Which accounts do you currently use? <span className="ob-hint">(select all that apply)</span></p>
      <CheckboxChipGroup options={ACCOUNT_TYPES} values={form.accountTypes} onToggle={(v) => toggleInList("accountTypes", v)} columns={2} />

      <p className="ob-question">Would you like to include all your accounts in your total balance?</p>
      <RadioCardGroup name="includeAllInBalance" options={["Yes", "No"]} value={form.includeAllInBalance} onChange={(v) => update("includeAllInBalance", v)} columns={2} />

      <p className="ob-question">Do you want to set an opening balance for your accounts?</p>
      <RadioCardGroup name="setOpeningBalance" options={["Yes", "Skip for now"]} value={form.setOpeningBalance} onChange={(v) => update("setOpeningBalance", v)} columns={2} />
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Step 4 — Preferences                                              */
/* ---------------------------------------------------------------- */

function StepPreferences({ form, update, toggleInList }) {
  return (
    <div className="ob-step">
      <h1 className="welcome-title">A few quick preferences</h1>
      <p className="welcome-subtitle">Keeping this short — you can change these anytime in settings.</p>

      <p className="ob-question">How often do you want financial reminders?</p>
      <RadioCardGroup name="reminderFrequency" options={REMINDER_FREQUENCY} value={form.reminderFrequency} onChange={(v) => update("reminderFrequency", v)} columns={2} />

      <p className="ob-question">Which notifications would you like to receive? <span className="ob-hint">(select all that apply)</span></p>
      <CheckboxChipGroup options={NOTIFICATION_TYPES} values={form.notificationTypes} onToggle={(v) => toggleInList("notificationTypes", v)} columns={2} />

      <p className="ob-question">Do you want to receive financial insights and recommendations?</p>
      <RadioCardGroup name="wantsInsights" options={["Yes", "No"]} value={form.wantsInsights} onChange={(v) => update("wantsInsights", v)} columns={2} />
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Final step — Choose your plan                                     */
/* ---------------------------------------------------------------- */

function StepPlan({ onOpenCompare, onStartFreeTrial, onChooseSubscription }) {
  const [selectedPaid, setSelectedPaid] = useState("quarterly");

  return (
    <div className="ob-step">
      <h1 className="welcome-title">Choose your plan</h1>
      <p className="welcome-subtitle">Start free, or pick a subscription. You're never charged without approval.</p>

      <div className="ob-plans-grid">
        <PlanCard plan={SUBSCRIPTION_PLANS.freeTrial} highlight />
        {["quarterly", "annual"].map((key) => (
          <PlanCard
            key={key}
            plan={SUBSCRIPTION_PLANS[key]}
            selectable
            selected={selectedPaid === key}
            onSelect={() => setSelectedPaid(key)}
          />
        ))}
      </div>

      <button type="button" className="ob-compare-link" onClick={onOpenCompare}>
        What's the difference?
      </button>

      <div className="ob-plan-actions">
        <button type="button" className="signin-btn ob-plan-btn" onClick={onStartFreeTrial}>
          Start Free Trial
        </button>
        <button
          type="button"
          className="ob-secondary-btn ob-plan-btn"
          onClick={() => onChooseSubscription(selectedPaid)}
        >
          Choose Subscription
        </button>
      </div>
    </div>
  );
}

function PlanCard({ plan, highlight, selectable, selected, onSelect }) {
  return (
    <div
      className={`ob-plan-card ${highlight ? "ob-plan-card-highlight" : ""} ${selected ? "ob-plan-card-selected" : ""}`}
      onClick={selectable ? onSelect : undefined}
      role={selectable ? "button" : undefined}
      tabIndex={selectable ? 0 : undefined}
    >
      {highlight && <span className="ob-plan-badge">Try it free</span>}
      {selectable && (
        <span className={`ob-choice-radio ob-plan-radio ${selected ? "ob-choice-radio-selected" : ""}`}>
          {selected && <span className="ob-choice-radio-dot" />}
        </span>
      )}
      <p className="ob-plan-name">{plan.name}</p>
      <p className="ob-plan-price">
        {plan.price}
        <span className="ob-plan-cadence"> / {plan.cadence}</span>
      </p>
      <ul className="ob-plan-perks">
        {plan.perks.map((perk) => (
          <li key={perk}>
            <IconCheck size={13} /> {perk}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* "What's the difference?" comparison modal                         */
/* ---------------------------------------------------------------- */

function PlanCompareModal({ onClose }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div className="ob-modal-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="ob-modal-card" role="dialog" aria-modal="true" aria-labelledby="ob-modal-title">
        <button type="button" className="ob-modal-close" onClick={onClose} aria-label="Close">
          <IconX size={16} />
        </button>

        <h2 id="ob-modal-title" className="ob-modal-title">
          Compare your options
        </h2>

        <div className="ob-modal-grid">
          {Object.values(SUBSCRIPTION_PLANS).map((plan) => (
            <div className="ob-modal-plan" key={plan.id}>
              <p className="ob-modal-plan-name">{plan.name}</p>
              <p className="ob-modal-plan-price">
                {plan.price} <span>{plan.cadence === "15 days" ? "" : `/ ${plan.cadence}`}</span>
              </p>
              {plan.cadence === "15 days" && <p className="ob-modal-plan-sub">15-day trial</p>}
              <ul className="ob-modal-plan-perks">
                {plan.perks.map((perk) => (
                  <li key={perk}>
                    <IconCheck size={12} /> {perk}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="ob-modal-note">
          The Free Trial lets you try ExpenseOS for 15 days. A paid subscription continues access after the trial
          period.
        </p>

        <button type="button" className="signin-btn ob-modal-got-it" onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  );
}
