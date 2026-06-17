import { useState, useEffect } from "react";
import { post } from "./api";

// ─── Brand Colors ───────────────────────────────────────────────────────────
const Z = {
  blue: "#0066FF",
  blueLight: "#E6EFFE",
  blueMid: "#CCE0FF",
  orange: "#F16723",
  orangeLight: "#FEF0E8",
  dark: "#0A1628",
  darkNav: "#0D1F3C",
  navText: "#94A7C4",
  navActive: "#FFFFFF",
  bg: "#F5F7FA",
  white: "#FFFFFF",
  border: "#E2E8F0",
  text: "#1A2B4A",
  textMuted: "#64748B",
  green: "#10B981",
  greenLight: "#ECFDF5",
  red: "#EF4444",
  redLight: "#FEF2F2",
  amber: "#F59E0B",
  amberLight: "#FFFBEB",
  purple: "#8B5CF6",
  purpleLight: "#F5F3FF",
};

// ─── Mock Data ───────────────────────────────────────────────────────────────
const HUBS = ["Kukatpally Hub", "Madhapur Hub", "Ameerpet Hub"];
const STAFF_LIST = ["Ravi Kumar", "Meera Singh", "Asha Patel", "Nikhil Shah", "Priya Reddy"];

const RENTAL_PLANS = [
  { id: "P001", name: "Starter – 500 KM", duration: "30 days", km: 500, price: 3999, deposit: 2000, active: true },
  { id: "P002", name: "Standard – 1500 KM", duration: "30 days", km: 1500, price: 5999, deposit: 3000, active: true },
  { id: "P003", name: "Pro – 3000 KM", duration: "30 days", km: 3000, price: 8999, deposit: 5000, active: true },
  { id: "P004", name: "Flexi – 30 days Unlimited", duration: "30 days", km: 99999, price: 12000, deposit: 7000, active: false },
];

const VEHICLES = [
  { id: "ZRG-New1", plate: "TGZRG1NEW", model: "Quanta S", hub: "Kukatpally Hub", status: "available", odometer: 0 },
  { id: "ZRG-2828", plate: "TGZRG2828", model: "Quanta S", hub: "Kukatpally Hub", status: "available", odometer: 3241 },
  { id: "ZRG-1717", plate: "TGZRG1717", model: "Quanta S+", hub: "Kukatpally Hub", status: "available", odometer: 8921 },
  { id: "ZRG-7890", plate: "TG01ZRG7890", model: "Quanta S", hub: "Kukatpally Hub", status: "available", odometer: 1200 },
  { id: "ZRG-4567", plate: "TGZRG4567", model: "Quanta S+", hub: "Kukatpally Hub", status: "available", odometer: 5500 },
  { id: "ZRG-027", plate: "TG0AZRG027", model: "Quanta S+", hub: "Kukatpally Hub", status: "ready", odometer: 2100 },
  { id: "ZRG-026", plate: "TG01ZRG026", model: "Quanta S+", hub: "Kukatpally Hub", status: "ready", odometer: 4300 },
  { id: "ZRG-856ab45", plate: "Tg231545as", model: "Quanta S+", hub: "Kukatpally Hub", status: "booked", odometer: 18000 },
  { id: "ZRG-118", plate: "TG09HB7809", model: "Quanta S+", hub: "Madhapur Hub", status: "booked", odometer: 12400 },
  { id: "RB-TEST2", plate: "RB_TEST2", model: "Quanta S+", hub: "Kukatpally Hub", status: "available", odometer: 760 },
  { id: "ZRG-002456", plate: "TG32145asd", model: "Quanta S+", hub: "Kukatpally Hub", status: "booked", odometer: 33000 },
  { id: "ZRG-0145", plate: "Ts0145a545", model: "Quanta S", hub: "Kukatpally Hub", status: "booked", odometer: 9100 },
  { id: "ZRG-RAJ1", plate: "TG12as1245", model: "Quanta S+", hub: "Kukatpally Hub", status: "booked", odometer: 21000 },
  { id: "ZRG-Y2", plate: "TG99Y20012", model: "Quanta Y2", hub: "Madhapur Hub", status: "service", odometer: 44000 },
  { id: "ZRG-X1A", plate: "TG01ZX1001", model: "Quanta X1", hub: "Kukatpally Hub", status: "pdi_pending", odometer: 0 },
];

const LEADS = [
  { id: "Ld001", customer: "Test Lead", phone: "1234567890", source: "Website", stage: "converted", assignedTo: "QA", created: "2026-06-02", notes: "Long-term EV rental inquiry" },
  { id: "Ld002", customer: "Remote Test Lead", phone: "1234567890", source: "Website", stage: "rejected", assignedTo: "QA", created: "2026-06-02", notes: "" },
  { id: "Ld003", customer: "Raju", phone: "999999999", source: "Website", stage: "converted", assignedTo: "Sai", created: "2026-06-03", notes: "Interested in Standard plan" },
  { id: "Ld004", customer: "Raju Duplicate", phone: "999999999", source: "Website", stage: "converted", assignedTo: "Sai", created: "2026-06-04", notes: "" },
  { id: "Ld005", customer: "Rahul Verma", phone: "9100845111", source: "Referral", stage: "converted", assignedTo: "Sai", created: "2026-06-04", notes: "Referred by existing rider" },
  { id: "Ld006", customer: "Amit Patel", phone: "9876543210", source: "Walk-in", stage: "contacted", assignedTo: "Ravi Kumar", created: "2026-06-10", notes: "Budget-conscious, wants basic plan" },
  { id: "Ld007", customer: "Nisha Gupta", phone: "9123456789", source: "Instagram Ad", stage: "qualified", assignedTo: "Meera Singh", created: "2026-06-12", notes: "Delivery partner, needs high-KM plan" },
  { id: "Ld008", customer: "Kiran Reddy", phone: "9988776655", source: "Website", stage: "new", assignedTo: "Asha Patel", created: "2026-06-15", notes: "" },
  { id: "Ld009", customer: "Deepa Rao", phone: "9900112233", source: "Referral", stage: "new", assignedTo: "", created: "2026-06-16", notes: "" },
];

const BOOKINGS = [
  { id: "BKG-1780385786532", customer: "sai", phone: "9999999999999", vehicle: "N/A", vehicleId: "", plan: "Pro – 3000 KM", start: "2026-06-02", end: "2026-07-02", kmUsed: 0, kmLimit: 3000, status: "active", amount: 8999, deposit: 5000, assignedTo: "Sai" },
  { id: "BKG-1003", customer: "Nisha Gupta", phone: "+919999000011", vehicle: "tsgh1245asv", vehicleId: "ZRG-X1A", plan: "Standard – 1500 KM", start: "2026-06-09", end: "2026-07-09", kmUsed: 340, kmLimit: 1500, status: "active", amount: 5999, deposit: 3000, assignedTo: "Nikhil Shah" },
  { id: "BKG-1002", customer: "Anita Singh", phone: "+919999000022", vehicle: "N/A", vehicleId: "", plan: "Starter – 500 KM", start: "2026-04-29", end: "2026-05-06", kmUsed: 480, kmLimit: 500, status: "completed", amount: 3999, deposit: 2000, assignedTo: "Meera Singh" },
  { id: "BKG-1001", customer: "Rahul Verma", phone: "+919999000011", vehicle: "N/A", vehicleId: "", plan: "Starter – 500 KM", start: "2026-05-29", end: "2026-06-05", kmUsed: 120, kmLimit: 500, status: "active", amount: 3999, deposit: 2000, assignedTo: "Ravi Kumar" },
  { id: "BKG-1780897360461", customer: "Nithin", phone: "+919876500001", vehicle: "Tg231545as", vehicleId: "ZRG-856ab45", plan: "Pro – 3000 KM", start: "2026-05-16", end: "2026-06-16", kmUsed: 2890, kmLimit: 3000, status: "active", amount: 8999, deposit: 5000, assignedTo: "Ravi Kumar" },
];

const PDI_ITEMS = [
  "Battery health ≥ 80%", "Brake inspection (front & rear)", "Tyre condition & pressure",
  "Electrical systems (lights, indicators, horn)", "Odometer photo captured",
  "Frame / body damage check", "Charging port functional", "KYC documents verified",
  "Vehicle photos (4 angles) uploaded", "Insurance validity confirmed"
];

const RENEWALS = [
  { id: "RNW-501", customer: "Deepa Sharma", vehicle: "Zargo X1", bookingId: "BKG-301", due: "2026-06-05", status: "upcoming", assignedTo: "Meera Singh", amount: 12000 },
  { id: "RNW-502", customer: "Vikram Rao", vehicle: "Zargo Z3", bookingId: "BKG-302", due: "2026-05-25", status: "overdue", assignedTo: "Ravi Kumar", amount: 15200 },
  { id: "RNW-503", customer: "Priya Sharma", vehicle: "Zargo E-Scooter 12", bookingId: "BKG-1001", due: "2026-06-29", status: "upcoming", assignedTo: "Asha Patel", amount: 5999 },
];

const RETURNS = [
  { id: "RTN-801", bookingId: "BKG-301", vehicle: "Zargo X1", customer: "Deepa Sharma", odometer: 21450, photosSubmitted: true, pdiDone: false, refundRequested: true, refundApproved: false, closed: false, status: "refund-requested", assignedTo: "Ravi Kumar", created: "2026-05-27" },
  { id: "RTN-802", bookingId: "BKG-302", vehicle: "Zargo Z3", customer: "Vikram Rao", odometer: 8250, photosSubmitted: true, pdiDone: true, refundRequested: false, refundApproved: false, closed: true, status: "closed", assignedTo: "Meera Singh", created: "2026-05-25" },
];

const SERVICE_JOBS = [
  { id: "JOB-110", vehicle: "Zargo Y2", vehicleId: "ZRG-Y2", type: "Battery inspection", assignedTo: "Ravi Kumar", status: "in-progress", priority: "high", issue: "Battery cell voltage variance", created: "2026-05-23", fromPdi: false },
  { id: "JOB-111", vehicle: "Zargo X1", vehicleId: "ZRG-X1A", type: "Brake pad replacement", assignedTo: "Meera Singh", status: "scheduled", priority: "medium", issue: "Routine wear check", created: "2026-05-25", fromPdi: false },
  { id: "JOB-112", vehicle: "Quanta S+ (ZRG-027)", vehicleId: "ZRG-027", type: "PDI – Failed inspection", assignedTo: "Nikhil Shah", status: "open", priority: "high", issue: "Charging port not functional. Sent from PDI.", created: "2026-06-14", fromPdi: true },
];

const RECOVERY_CASES = [
  { id: "REC-401", customer: "Anita Joshi", phone: "+919988001122", vehicle: "Zargo Y2", bookingId: "BKG-401", overdueBy: "4 days", status: "open", assignedTo: "Ravi Kumar", created: "2026-05-14", notes: "" },
  { id: "REC-402", customer: "Karan Mehta", phone: "+919876500099", vehicle: "Zargo X1", bookingId: "BKG-402", overdueBy: "11 days", status: "contacted", assignedTo: "Meera Singh", created: "2026-05-02", notes: "Customer promised to return in 3 days" },
  { id: "REC-403", customer: "Suresh Babu", phone: "+919900554433", vehicle: "Quanta S (ZRG-7890)", bookingId: "BKG-501", overdueBy: "2 days", status: "open", assignedTo: "Asha Patel", created: "2026-06-14", notes: "" },
];

const FOLLOW_UPS = [
  { id: "FU-001", customer: "Priya Sharma", phone: "+919876543210", vehicle: "Zargo E-Scooter 12", bookingId: "BKG-1001", reason: "Renewal reminder", due: "2026-06-17", status: "pending", assignedTo: "Asha Patel" },
  { id: "FU-002", customer: "Rahul Verma", phone: "+919812345678", vehicle: "Zargo EV Car 07", bookingId: "BKG-1008", reason: "Payment reminder", due: "2026-06-16", status: "pending", assignedTo: "Nikhil Shah" },
  { id: "FU-003", customer: "Meera Iyer", phone: "+919700112233", vehicle: "Zargo E-Scooter 05", bookingId: "BKG-1012", reason: "Renewal due in 7 days", due: "2026-06-23", status: "pending", assignedTo: "Ravi Kumar" },
  { id: "FU-004", customer: "Anita Desai", phone: "+919999887766", vehicle: "Zargo EV Car 02", bookingId: "BKG-1004", reason: "Missed renewal follow-up", due: "2026-06-15", status: "overdue", assignedTo: "Asha Patel" },
];

const INSURANCE = [
  { id: "INS-902", policy: "POL-5082", vehicle: "Zargo X1", type: "policy", status: "expiring", premium: 18000, renewal: "2026-06-20", managedBy: "Meera Singh" },
  { id: "INS-903", policy: "CLA-7012", vehicle: "Zargo Z3", type: "claim", status: "active", premium: 0, renewal: "2026-08-15", managedBy: "Ravi Kumar" },
];

const EMPLOYEES = [
  { id: "E001", name: "Ravi Kumar", email: "ravi@zargo.in", role: "Staff", phone: "+919876501010", hub: "Kukatpally Hub", status: "Active", joined: "2025-01-15", bookings: 24 },
  { id: "E002", name: "Meera Singh", email: "meera@zargo.in", role: "Staff", phone: "+919876501011", hub: "Kukatpally Hub", status: "Active", joined: "2025-02-01", bookings: 18 },
  { id: "E003", name: "Asha Patel", email: "asha@zargo.in", role: "Staff", phone: "+919876501012", hub: "Madhapur Hub", status: "Active", joined: "2025-03-10", bookings: 31 },
  { id: "E004", name: "Nikhil Shah", email: "nikhil@zargo.in", role: "Staff", phone: "+919876501013", hub: "Kukatpally Hub", status: "Active", joined: "2025-04-05", bookings: 9 },
  { id: "E005", name: "Priya Reddy", email: "priya@zargo.in", role: "Staff", phone: "+919876501014", hub: "Ameerpet Hub", status: "Inactive", joined: "2025-05-20", bookings: 6 },
];

// ─── Utility Components ──────────────────────────────────────────────────────
const Badge = ({ text, color = "blue", size = "sm" }) => {
  const colors = {
    blue: { bg: Z.blueLight, text: Z.blue },
    green: { bg: Z.greenLight, text: Z.green },
    red: { bg: Z.redLight, text: Z.red },
    amber: { bg: Z.amberLight, text: "#92400E" },
    orange: { bg: Z.orangeLight, text: Z.orange },
    purple: { bg: Z.purpleLight, text: Z.purple },
    gray: { bg: "#F1F5F9", text: "#475569" },
  };
  const c = colors[color] || colors.blue;
  const pad = size === "sm" ? "2px 8px" : "4px 12px";
  const fs = size === "sm" ? 11 : 12;
  return (
    <span style={{ background: c.bg, color: c.text, padding: pad, borderRadius: 20, fontSize: fs, fontWeight: 600, whiteSpace: "nowrap" }}>
      {text}
    </span>
  );
};

const statusBadge = (status) => {
  const map = {
    active: <Badge text="Active" color="green" />,
    completed: <Badge text="Completed" color="blue" />,
    overdue: <Badge text="Overdue" color="red" />,
    pending: <Badge text="Pending" color="amber" />,
    available: <Badge text="Available" color="green" />,
    ready: <Badge text="Ready for Booking" color="blue" />,
    booked: <Badge text="Booked" color="purple" />,
    service: <Badge text="In Service" color="red" />,
    pdi_pending: <Badge text="PDI Pending" color="amber" />,
    new: <Badge text="New" color="blue" />,
    contacted: <Badge text="Contacted" color="purple" />,
    qualified: <Badge text="Qualified" color="amber" />,
    converted: <Badge text="Converted" color="green" />,
    rejected: <Badge text="Rejected" color="red" />,
    upcoming: <Badge text="Upcoming" color="blue" />,
    open: <Badge text="Open" color="amber" />,
    "in-progress": <Badge text="In Progress" color="orange" />,
    scheduled: <Badge text="Scheduled" color="purple" />,
    closed: <Badge text="Closed" color="gray" />,
    expiring: <Badge text="Expiring" color="red" />,
    "refund-requested": <Badge text="Refund Requested" color="amber" />,
    high: <Badge text="High" color="red" />,
    medium: <Badge text="Medium" color="amber" />,
    low: <Badge text="Low" color="green" />,
  };
  return map[status] || <Badge text={status} color="gray" />;
};

const StatCard = ({ label, value, sub, accent = Z.blue, icon }) => (
  <div style={{ background: Z.white, border: `1px solid ${Z.border}`, borderRadius: 10, padding: "16px 20px", borderTop: `3px solid ${accent}` }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: Z.textMuted, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
      {icon && <span style={{ fontSize: 20, color: accent, opacity: 0.7 }}>{icon}</span>}
    </div>
    <div style={{ fontSize: 28, fontWeight: 700, color: Z.text, margin: "6px 0 2px" }}>{value}</div>
    {sub && <div style={{ fontSize: 12, color: Z.textMuted }}>{sub}</div>}
  </div>
);

const PageHeader = ({ title, sub, action }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
    <div>
      <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: Z.text }}>{title}</h1>
      {sub && <p style={{ margin: "4px 0 0", fontSize: 13, color: Z.textMuted }}>{sub}</p>}
    </div>
    {action}
  </div>
);

const Btn = ({ children, onClick, variant = "primary", size = "md", disabled = false }) => {
  const styles = {
    primary: { background: Z.blue, color: "#fff", border: "none" },
    secondary: { background: Z.white, color: Z.text, border: `1px solid ${Z.border}` },
    danger: { background: Z.red, color: "#fff", border: "none" },
    ghost: { background: "transparent", color: Z.blue, border: `1px solid ${Z.blue}` },
  };
  const pads = { sm: "6px 12px", md: "8px 16px", lg: "10px 20px" };
  return (
    <button onClick={onClick} disabled={disabled}
      style={{ ...styles[variant], padding: pads[size], borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, display: "inline-flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
      {children}
    </button>
  );
};

const Table = ({ cols, rows, onRow }) => (
  <div style={{ overflowX: "auto" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr style={{ background: "#F8FAFC" }}>
          {cols.map(c => <th key={c.key} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, color: Z.textMuted, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, borderBottom: `1px solid ${Z.border}`, whiteSpace: "nowrap" }}>{c.label}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} onClick={() => onRow && onRow(row)}
            style={{ borderBottom: `1px solid ${Z.border}`, cursor: onRow ? "pointer" : "default", transition: "background 0.1s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#F8FAFC"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            {cols.map(c => <td key={c.key} style={{ padding: "12px 14px", color: Z.text, verticalAlign: "middle" }}>{c.render ? c.render(row) : row[c.key]}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
    {rows.length === 0 && <div style={{ padding: 40, textAlign: "center", color: Z.textMuted, fontSize: 13 }}>No records found</div>}
  </div>
);

const Modal = ({ title, onClose, children, width = 560 }) => (
  <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16 }}
    onClick={e => e.target === e.currentTarget && onClose()}>
    <div style={{ background: Z.white, borderRadius: 12, width: "100%", maxWidth: width, maxHeight: "90vh", overflow: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 24px", borderBottom: `1px solid ${Z.border}` }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: Z.text }}>{title}</h3>
        <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: Z.textMuted, lineHeight: 1 }}>×</button>
      </div>
      <div style={{ padding: 24 }}>{children}</div>
    </div>
  </div>
);

const Field = ({ label, children }) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: Z.textMuted, marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.4 }}>{label}</label>
    {children}
  </div>
);

const Input = ({ value, onChange, placeholder, type = "text" }) => (
  <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
    style={{ width: "100%", padding: "8px 10px", border: `1px solid ${Z.border}`, borderRadius: 7, fontSize: 13, color: Z.text, background: Z.white, boxSizing: "border-box" }} />
);

const Select = ({ value, onChange, options }) => (
  <select value={value} onChange={e => onChange(e.target.value)}
    style={{ width: "100%", padding: "8px 10px", border: `1px solid ${Z.border}`, borderRadius: 7, fontSize: 13, color: Z.text, background: Z.white, boxSizing: "border-box" }}>
    {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
  </select>
);

const initials = (name) => name?.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) || "?";
const Avatar = ({ name, color = Z.blue }) => (
  <div style={{ width: 32, height: 32, borderRadius: "50%", background: Z.blueLight, color: Z.blue, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
    {initials(name)}
  </div>
);

// ─── Section: Dashboard ──────────────────────────────────────────────────────
const DashboardView = ({ role }) => {
  const totalVehicles = VEHICLES.length;
  const available = VEHICLES.filter(v => v.status === "available").length;
  const booked = VEHICLES.filter(v => v.status === "booked").length;
  const inService = VEHICLES.filter(v => v.status === "service").length;
  const activeBookings = BOOKINGS.filter(b => b.status === "active").length;
  const overdueRenewals = RENEWALS.filter(r => r.status === "overdue").length;
  const openRecovery = RECOVERY_CASES.filter(c => c.status !== "resolved").length;
  const openServiceJobs = SERVICE_JOBS.filter(j => j.status !== "completed").length;

  return (
    <div>
      <PageHeader title="Dashboard" sub="Fleet overview and today's key metrics" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 28 }}>
        <StatCard label="Total Fleet" value={totalVehicles} sub="All hubs" accent={Z.blue} icon="🚲" />
        <StatCard label="Available" value={available} sub="Ready to deploy" accent={Z.green} icon="✅" />
        <StatCard label="Active Bookings" value={activeBookings} sub="Currently rented" accent={Z.purple} icon="📋" />
        <StatCard label="In Service" value={inService} sub="Under maintenance" accent={Z.orange} icon="🔧" />
        <StatCard label="Overdue Renewals" value={overdueRenewals} sub="Needs attention" accent={Z.red} icon="⚠️" />
        <StatCard label="Open Recovery" value={openRecovery} sub="Vehicles to recover" accent={Z.amber} icon="🔍" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Recent Bookings */}
        <div style={{ background: Z.white, border: `1px solid ${Z.border}`, borderRadius: 10, padding: 20 }}>
          <h3 style={{ margin: "0 0 14px", fontSize: 14, fontWeight: 700, color: Z.text }}>Active Bookings</h3>
          {BOOKINGS.filter(b => b.status === "active").slice(0, 4).map(b => (
            <div key={b.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${Z.border}` }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <Avatar name={b.customer} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: Z.text }}>{b.customer}</div>
                  <div style={{ fontSize: 11, color: Z.textMuted }}>{b.id} · {b.plan}</div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, color: Z.textMuted }}>{b.kmUsed}/{b.kmLimit} KM</div>
                {statusBadge(b.status)}
              </div>
            </div>
          ))}
        </div>

        {/* Alerts & Tasks */}
        <div style={{ background: Z.white, border: `1px solid ${Z.border}`, borderRadius: 10, padding: 20 }}>
          <h3 style={{ margin: "0 0 14px", fontSize: 14, fontWeight: 700, color: Z.text }}>Attention Required</h3>
          {[
            { label: "Overdue Renewals", count: overdueRenewals, color: Z.red, icon: "⚠️" },
            { label: "Pending Follow-ups", count: FOLLOW_UPS.filter(f => f.status === "pending").length, color: Z.amber, icon: "📞" },
            { label: "PDI Pending Vehicles", count: VEHICLES.filter(v => v.status === "pdi_pending").length, color: Z.orange, icon: "📄" },
            { label: "Open Recovery Cases", count: openRecovery, color: Z.blue, icon: "🔍" },
            { label: "Open Service Jobs", count: openServiceJobs, color: Z.purple, icon: "🔧" },
            { label: "Expiring Insurance", count: INSURANCE.filter(i => i.status === "expiring").length, color: Z.red, icon: "🛡️" },
          ].map(item => (
            <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${Z.border}` }}>
              <div style={{ fontSize: 13, color: Z.text }}>{item.icon} {item.label}</div>
              <span style={{ fontWeight: 700, fontSize: 15, color: item.count > 0 ? item.color : Z.green }}>{item.count}</span>
            </div>
          ))}
        </div>

        {/* Vehicle Status Summary */}
        <div style={{ background: Z.white, border: `1px solid ${Z.border}`, borderRadius: 10, padding: 20 }}>
          <h3 style={{ margin: "0 0 14px", fontSize: 14, fontWeight: 700, color: Z.text }}>Fleet Status</h3>
          {[
            { label: "Available", value: available, total: totalVehicles, color: Z.green },
            { label: "Booked", value: booked, total: totalVehicles, color: Z.purple },
            { label: "Ready for Booking", value: VEHICLES.filter(v => v.status === "ready").length, total: totalVehicles, color: Z.blue },
            { label: "In Service", value: inService, total: totalVehicles, color: Z.orange },
            { label: "PDI Pending", value: VEHICLES.filter(v => v.status === "pdi_pending").length, total: totalVehicles, color: Z.amber },
          ].map(item => (
            <div key={item.label} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: Z.textMuted }}>{item.label}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: Z.text }}>{item.value}/{item.total}</span>
              </div>
              <div style={{ height: 6, background: "#EEF2F7", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(item.value / item.total) * 100}%`, background: item.color, borderRadius: 3, transition: "width 0.5s" }} />
              </div>
            </div>
          ))}
        </div>

        {/* Overdue Renewals */}
        <div style={{ background: Z.white, border: `1px solid ${Z.border}`, borderRadius: 10, padding: 20 }}>
          <h3 style={{ margin: "0 0 14px", fontSize: 14, fontWeight: 700, color: Z.text }}>Upcoming / Overdue Renewals</h3>
          {RENEWALS.map(r => (
            <div key={r.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${Z.border}` }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: Z.text }}>{r.customer}</div>
                <div style={{ fontSize: 11, color: Z.textMuted }}>{r.vehicle} · Due {r.due}</div>
              </div>
              <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: Z.text }}>₹{r.amount.toLocaleString()}</div>
                {statusBadge(r.status)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Section: Leads ──────────────────────────────────────────────────────────
const LeadsView = ({ role }) => {
  const [leads, setLeads] = useState(LEADS);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ customer: "", phone: "", source: "Website", assignedTo: "" });

  const counts = { total: leads.length, active: leads.filter(l => ["new", "contacted", "qualified"].includes(l.stage)).length, converted: leads.filter(l => l.stage === "converted").length };

  const updateStage = (id, stage) => setLeads(prev => prev.map(l => l.id === id ? { ...l, stage } : l));
  const addLead = () => {
    setLeads(prev => [...prev, { ...form, id: `Ld${String(prev.length + 1).padStart(3, "0")}`, stage: "new", created: new Date().toISOString().split("T")[0], notes: "" }]);
    setShowModal(false); setForm({ customer: "", phone: "", source: "Website", assignedTo: "" });
  };

  return (
    <div>
      <PageHeader title="Leads" sub="Track new inquiries and conversion pipeline"
        action={<Btn onClick={() => setShowModal(true)}>+ New Lead</Btn>} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }}>
        <StatCard label="Total Leads" value={counts.total} accent={Z.blue} />
        <StatCard label="Active Pipeline" value={counts.active} accent={Z.amber} />
        <StatCard label="Converted" value={counts.converted} accent={Z.green} />
      </div>

      <div style={{ background: Z.white, border: `1px solid ${Z.border}`, borderRadius: 10, overflow: "hidden" }}>
        <Table
          cols={[
            { key: "id", label: "Lead ID" },
            { key: "customer", label: "Customer", render: r => <div style={{ display: "flex", gap: 8, alignItems: "center" }}><Avatar name={r.customer} /><div><div style={{ fontWeight: 600 }}>{r.customer}</div><div style={{ fontSize: 11, color: Z.textMuted }}>{r.phone}</div></div></div> },
            { key: "source", label: "Source" },
            { key: "stage", label: "Stage", render: r => statusBadge(r.stage) },
            { key: "assignedTo", label: "Assigned To", render: r => r.assignedTo || <span style={{ color: Z.textMuted, fontStyle: "italic" }}>Unassigned</span> },
            { key: "created", label: "Created" },
            { key: "actions", label: "Actions", render: r => (
              <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                {r.stage !== "converted" && r.stage !== "rejected" && (
                  <>
                    {r.stage === "new" && <Btn size="sm" variant="ghost" onClick={() => updateStage(r.id, "contacted")}>Contact</Btn>}
                    {r.stage === "contacted" && <Btn size="sm" variant="ghost" onClick={() => updateStage(r.id, "qualified")}>Qualify</Btn>}
                    {r.stage === "qualified" && <Btn size="sm" onClick={() => updateStage(r.id, "converted")}>Convert ✓</Btn>}
                    <Btn size="sm" variant="danger" onClick={() => updateStage(r.id, "rejected")}>Reject</Btn>
                  </>
                )}
                {r.stage === "converted" && <span style={{ fontSize: 12, color: Z.green }}>✓ Converted</span>}
              </div>
            )},
          ]}
          rows={leads}
        />
      </div>

      {showModal && <Modal title="New Lead" onClose={() => setShowModal(false)}>
        <Field label="Customer Name"><Input value={form.customer} onChange={v => setForm({...form, customer: v})} placeholder="Full name" /></Field>
        <Field label="Phone"><Input value={form.phone} onChange={v => setForm({...form, phone: v})} placeholder="+91..." /></Field>
        <Field label="Source"><Select value={form.source} onChange={v => setForm({...form, source: v})} options={["Website","Referral","Walk-in","Instagram","Phone Inquiry"].map(s => ({value:s,label:s}))} /></Field>
        <Field label="Assign To"><Select value={form.assignedTo} onChange={v => setForm({...form, assignedTo: v})} options={[{value:"",label:"— Select Staff —"}, ...STAFF_LIST.map(s => ({value:s,label:s}))]} /></Field>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
          <Btn variant="secondary" onClick={() => setShowModal(false)}>Cancel</Btn>
          <Btn onClick={addLead} disabled={!form.customer || !form.phone}>Create Lead</Btn>
        </div>
      </Modal>}
    </div>
  );
};

// ─── Section: Vehicles ───────────────────────────────────────────────────────
const VehiclesView = ({ role }) => {
  const [vehicles, setVehicles] = useState(VEHICLES);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ id: "", plate: "", model: "Quanta S", hub: HUBS[0] });
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? vehicles : vehicles.filter(v => v.status === filter);
  const addVehicle = () => {
    setVehicles(prev => [...prev, { ...form, status: "pdi_pending", odometer: 0 }]);
    setShowModal(false); setForm({ id: "", plate: "", model: "Quanta S", hub: HUBS[0] });
  };

  return (
    <div>
      <PageHeader title="Fleet Vehicles" sub="Manage all EV assets across hubs"
        action={role === "admin" && <Btn onClick={() => setShowModal(true)}>+ Add Vehicle</Btn>} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Total Fleet", value: vehicles.length, accent: Z.blue },
          { label: "Available", value: vehicles.filter(v => v.status === "available").length, accent: Z.green },
          { label: "PDI Pending", value: vehicles.filter(v => v.status === "pdi_pending").length, accent: Z.amber },
          { label: "Booked", value: vehicles.filter(v => v.status === "booked").length, accent: Z.purple },
          { label: "In Service", value: vehicles.filter(v => v.status === "service").length, accent: Z.red },
        ].map(s => <StatCard key={s.label} {...s} />)}
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {["all","available","pdi_pending","ready","booked","service"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding: "6px 14px", borderRadius: 20, border: `1px solid ${filter === f ? Z.blue : Z.border}`, background: filter === f ? Z.blueLight : Z.white, color: filter === f ? Z.blue : Z.textMuted, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            {f === "all" ? "All" : f.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase())}
          </button>
        ))}
      </div>

      <div style={{ background: Z.white, border: `1px solid ${Z.border}`, borderRadius: 10, overflow: "hidden" }}>
        <Table
          cols={[
            { key: "id", label: "Vehicle ID" },
            { key: "plate", label: "Number Plate", render: r => <span style={{ fontFamily: "monospace", fontWeight: 600 }}>{r.plate}</span> },
            { key: "model", label: "Model" },
            { key: "hub", label: "Hub" },
            { key: "odometer", label: "Odometer", render: r => `${r.odometer.toLocaleString()} km` },
            { key: "status", label: "Status", render: r => statusBadge(r.status) },
          ]}
          rows={filtered}
        />
      </div>

      {showModal && <Modal title="Add New Vehicle" onClose={() => setShowModal(false)}>
        <Field label="Vehicle ID"><Input value={form.id} onChange={v => setForm({...form, id: v})} placeholder="ZRG-XXXX" /></Field>
        <Field label="Number Plate"><Input value={form.plate} onChange={v => setForm({...form, plate: v})} placeholder="TG01XY1234" /></Field>
        <Field label="Model"><Select value={form.model} onChange={v => setForm({...form, model: v})} options={["Quanta S","Quanta S+","Quanta X1","Quanta Y2"].map(m => ({value:m,label:m}))} /></Field>
        <Field label="Hub"><Select value={form.hub} onChange={v => setForm({...form, hub: v})} options={HUBS.map(h => ({value:h,label:h}))} /></Field>
        <p style={{ fontSize: 12, color: Z.textMuted, background: Z.amberLight, padding: "8px 12px", borderRadius: 7 }}>
          ℹ️ New vehicles are automatically set to <strong>PDI Pending</strong> status. Complete PDI before deploying.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
          <Btn variant="secondary" onClick={() => setShowModal(false)}>Cancel</Btn>
          <Btn onClick={addVehicle} disabled={!form.id || !form.plate}>Add Vehicle</Btn>
        </div>
      </Modal>}
    </div>
  );
};

// ─── Section: PDI ────────────────────────────────────────────────────────────
const PDIView = ({ role }) => {
  const [vehicles, setVehicles] = useState(VEHICLES);
  const [active, setActive] = useState(null);
  const [checklist, setChecklist] = useState({});
  const [notes, setNotes] = useState("");
  const [sendToService, setSendToService] = useState(false);
  const [completed, setCompleted] = useState([]);
  const [toast, setToast] = useState(null);

  const pending = vehicles.filter(v => v.status === "pdi_pending");
  const showToast = (msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  const startPDI = (v) => { setActive(v); setChecklist({}); setNotes(""); setSendToService(false); };

  const submitPDI = () => {
    const allChecked = PDI_ITEMS.every((_, i) => checklist[i]);
    if (sendToService) {
      setVehicles(prev => prev.map(v => v.id === active.id ? { ...v, status: "service" } : v));
      showToast(`${active.id} sent to Service queue`, "warning");
    } else if (allChecked) {
      setVehicles(prev => prev.map(v => v.id === active.id ? { ...v, status: "available" } : v));
      setCompleted(prev => [...prev, { ...active, completedAt: new Date().toLocaleDateString(), completedBy: "Current Staff" }]);
      showToast(`PDI complete! ${active.id} is now Available.`);
    } else {
      showToast("Complete all checklist items or send to service.", "error");
      return;
    }
    setActive(null);
  };

  const progress = active ? Math.round((PDI_ITEMS.filter((_, i) => checklist[i]).length / PDI_ITEMS.length) * 100) : 0;

  return (
    <div>
      {toast && <div style={{ position: "fixed", top: 20, right: 20, background: toast.type === "success" ? Z.green : toast.type === "warning" ? Z.amber : Z.red, color: "#fff", padding: "12px 20px", borderRadius: 8, zIndex: 9999, fontSize: 13, fontWeight: 600 }}>{toast.msg}</div>}
      <PageHeader title="PDI Inspection" sub="Pre-delivery inspection for fleet vehicles" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        <StatCard label="PDI Pending" value={VEHICLES.filter(v => v.status === "pdi_pending").length} accent={Z.amber} />
        <StatCard label="Available" value={VEHICLES.filter(v => v.status === "available").length} accent={Z.green} />
        <StatCard label="Completed (session)" value={completed.length} accent={Z.blue} />
        <StatCard label="In Service" value={VEHICLES.filter(v => v.status === "service").length} accent={Z.red} />
      </div>

      {pending.length > 0 && (
        <div style={{ background: Z.white, border: `1px solid ${Z.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 24 }}>
          <div style={{ padding: "14px 20px", borderBottom: `1px solid ${Z.border}`, fontWeight: 700, fontSize: 14 }}>Vehicles Awaiting PDI</div>
          <Table
            cols={[
              { key: "id", label: "Vehicle ID" },
              { key: "plate", label: "Number Plate" },
              { key: "model", label: "Model" },
              { key: "hub", label: "Hub" },
              { key: "status", label: "Status", render: r => statusBadge(r.status) },
              { key: "action", label: "Action", render: r => <Btn onClick={() => startPDI(r)}>Start PDI</Btn> },
            ]}
            rows={pending}
          />
        </div>
      )}

      {pending.length === 0 && !active && (
        <div style={{ background: Z.greenLight, border: `1px solid #A7F3D0`, borderRadius: 10, padding: 24, textAlign: "center", color: Z.green, fontWeight: 600, marginBottom: 24 }}>
          ✅ All vehicles have completed PDI
        </div>
      )}

      {active && (
        <div style={{ background: Z.white, border: `2px solid ${Z.blue}`, borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>PDI – {active.id} ({active.model})</h3>
              <p style={{ margin: "4px 0 0", fontSize: 13, color: Z.textMuted }}>{active.plate} · {active.hub}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: progress === 100 ? Z.green : Z.blue }}>{progress}%</div>
              <div style={{ fontSize: 12, color: Z.textMuted }}>Complete</div>
            </div>
          </div>
          <div style={{ height: 8, background: "#EEF2F7", borderRadius: 4, marginBottom: 20 }}>
            <div style={{ height: "100%", width: `${progress}%`, background: progress === 100 ? Z.green : Z.blue, borderRadius: 4, transition: "width 0.3s" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
            {PDI_ITEMS.map((item, i) => (
              <label key={i} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "10px 14px", border: `1px solid ${checklist[i] ? Z.green : Z.border}`, borderRadius: 8, background: checklist[i] ? Z.greenLight : Z.white }}>
                <input type="checkbox" checked={!!checklist[i]} onChange={e => setChecklist(prev => ({ ...prev, [i]: e.target.checked }))} style={{ width: 16, height: 16, accentColor: Z.green }} />
                <span style={{ fontSize: 13, color: checklist[i] ? Z.green : Z.text }}>{item}</span>
              </label>
            ))}
          </div>

          <Field label="Inspection Notes">
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3}
              placeholder="Note any issues, concerns, or observations..."
              style={{ width: "100%", padding: "8px 10px", border: `1px solid ${Z.border}`, borderRadius: 7, fontSize: 13, color: Z.text, resize: "vertical", boxSizing: "border-box" }} />
          </Field>

          <div style={{ background: Z.redLight, border: `1px solid #FECACA`, borderRadius: 8, padding: "12px 16px", marginBottom: 16 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
              <input type="checkbox" checked={sendToService} onChange={e => setSendToService(e.target.checked)} style={{ width: 16, height: 16, accentColor: Z.red }} />
              <div>
                <span style={{ fontSize: 13, fontWeight: 600, color: Z.red }}>Send to Service Queue</span>
                <span style={{ fontSize: 12, color: Z.textMuted, marginLeft: 8 }}>Check this if vehicle fails inspection and needs repair</span>
              </div>
            </label>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <Btn variant="secondary" onClick={() => setActive(null)}>Cancel</Btn>
            <Btn onClick={submitPDI} variant={sendToService ? "danger" : "primary"}>
              {sendToService ? "🔧 Send to Service" : "✅ Complete PDI"}
            </Btn>
          </div>
        </div>
      )}

      {completed.length > 0 && (
        <div style={{ background: Z.white, border: `1px solid ${Z.border}`, borderRadius: 10, overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", borderBottom: `1px solid ${Z.border}`, fontWeight: 700, fontSize: 14 }}>Completed This Session ({completed.length})</div>
          <Table
            cols={[
              { key: "id", label: "Vehicle ID" },
              { key: "model", label: "Model" },
              { key: "hub", label: "Hub" },
              { key: "completedAt", label: "Completed" },
              { key: "completedBy", label: "By" },
            ]}
            rows={completed}
          />
        </div>
      )}
    </div>
  );
};

// ─── Section: Bookings ───────────────────────────────────────────────────────
const BookingsView = ({ role }) => {
  const [bookings, setBookings] = useState(BOOKINGS);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ customer: "", phone: "", planId: "P001", vehicleId: "", assignedTo: "" });
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? bookings : bookings.filter(b => b.status === filter);
  const plan = RENTAL_PLANS.find(p => p.id === form.planId) || RENTAL_PLANS[0];
  const availableVehicles = VEHICLES.filter(v => v.status === "available");

  const createBooking = () => {
    const selectedPlan = RENTAL_PLANS.find(p => p.id === form.planId);
    const start = new Date().toISOString().split("T")[0];
    const end = new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0];
    setBookings(prev => [...prev, {
      id: `BKG-${Date.now().toString().slice(-8)}`,
      customer: form.customer, phone: form.phone,
      vehicle: form.vehicleId || "TBD", vehicleId: form.vehicleId,
      plan: selectedPlan.name, start, end,
      kmUsed: 0, kmLimit: selectedPlan.km,
      status: "active", amount: selectedPlan.price, deposit: selectedPlan.deposit,
      assignedTo: form.assignedTo,
    }]);
    setShowModal(false);
    setForm({ customer: "", phone: "", planId: "P001", vehicleId: "", assignedTo: "" });
  };

  return (
    <div>
      <PageHeader title="Bookings" sub="Manage rider bookings and rental contracts"
        action={<Btn onClick={() => setShowModal(true)}>+ New Booking</Btn>} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        <StatCard label="Total" value={bookings.length} accent={Z.blue} />
        <StatCard label="Active" value={bookings.filter(b => b.status === "active").length} accent={Z.green} />
        <StatCard label="Overdue" value={bookings.filter(b => b.status === "overdue").length} accent={Z.red} />
        <StatCard label="Completed" value={bookings.filter(b => b.status === "completed").length} accent={Z.purple} />
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["all","active","overdue","completed","pending"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding: "6px 14px", borderRadius: 20, border: `1px solid ${filter === f ? Z.blue : Z.border}`, background: filter === f ? Z.blueLight : Z.white, color: filter === f ? Z.blue : Z.textMuted, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ background: Z.white, border: `1px solid ${Z.border}`, borderRadius: 10, overflow: "hidden" }}>
        <Table
          cols={[
            { key: "id", label: "Booking ID" },
            { key: "customer", label: "Rider", render: r => <div style={{ display: "flex", gap: 8, alignItems: "center" }}><Avatar name={r.customer} /><div><div style={{ fontWeight: 600 }}>{r.customer}</div><div style={{ fontSize: 11, color: Z.textMuted }}>{r.phone}</div></div></div> },
            { key: "plan", label: "Plan" },
            { key: "vehicle", label: "Vehicle" },
            { key: "start", label: "Start" },
            { key: "end", label: "End" },
            { key: "km", label: "KM Used", render: r => `${r.kmUsed}/${r.kmLimit === 99999 ? "∞" : r.kmLimit}` },
            { key: "amount", label: "Amount", render: r => `₹${r.amount.toLocaleString()}` },
            { key: "status", label: "Status", render: r => statusBadge(r.status) },
          ]}
          rows={filtered}
        />
      </div>

      {showModal && <Modal title="New Booking" onClose={() => setShowModal(false)} width={600}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Field label="Customer Name"><Input value={form.customer} onChange={v => setForm({...form, customer: v})} placeholder="Full name" /></Field>
          <Field label="Phone"><Input value={form.phone} onChange={v => setForm({...form, phone: v})} placeholder="+91..." /></Field>
        </div>
        <Field label="Rental Plan">
          <Select value={form.planId} onChange={v => setForm({...form, planId: v})} options={RENTAL_PLANS.filter(p => p.active).map(p => ({value: p.id, label: `${p.name} – ₹${p.price.toLocaleString()}/mo`}))} />
        </Field>
        {plan && (
          <div style={{ background: Z.blueLight, border: `1px solid ${Z.blueMid}`, borderRadius: 8, padding: "12px 16px", marginBottom: 12, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, fontSize: 12 }}>
            <div><span style={{ color: Z.textMuted }}>Duration:</span> <strong>{plan.duration}</strong></div>
            <div><span style={{ color: Z.textMuted }}>KM Limit:</span> <strong>{plan.km === 99999 ? "Unlimited" : `${plan.km.toLocaleString()} KM`}</strong></div>
            <div><span style={{ color: Z.textMuted }}>Deposit:</span> <strong>₹{plan.deposit.toLocaleString()}</strong></div>
          </div>
        )}
        <Field label="Assign Vehicle">
          <Select value={form.vehicleId} onChange={v => setForm({...form, vehicleId: v})} options={[{value:"",label:"— Select Vehicle —"}, ...availableVehicles.map(v => ({value:v.id,label:`${v.id} · ${v.model} (${v.plate})`}))]} />
        </Field>
        <Field label="Assigned Staff">
          <Select value={form.assignedTo} onChange={v => setForm({...form, assignedTo: v})} options={[{value:"",label:"— Select Staff —"}, ...STAFF_LIST.map(s => ({value:s,label:s}))]} />
        </Field>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
          <Btn variant="secondary" onClick={() => setShowModal(false)}>Cancel</Btn>
          <Btn onClick={createBooking} disabled={!form.customer || !form.phone}>Create Booking</Btn>
        </div>
      </Modal>}
    </div>
  );
};

// ─── Section: Renewals ───────────────────────────────────────────────────────
const RenewalsView = () => {
  const [renewals, setRenewals] = useState(RENEWALS);
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? renewals : renewals.filter(r => r.status === filter);

  return (
    <div>
      <PageHeader title="Renewals" sub="Monitor rental contract renewals and due dates" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }}>
        <StatCard label="Total Contracts" value={renewals.length} accent={Z.blue} />
        <StatCard label="Overdue" value={renewals.filter(r => r.status === "overdue").length} accent={Z.red} />
        <StatCard label="Upcoming" value={renewals.filter(r => r.status === "upcoming").length} accent={Z.amber} />
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["all","upcoming","overdue"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: "6px 14px", borderRadius: 20, border: `1px solid ${filter === f ? Z.blue : Z.border}`, background: filter === f ? Z.blueLight : Z.white, color: filter === f ? Z.blue : Z.textMuted, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {filtered.map(r => (
          <div key={r.id} style={{ background: Z.white, border: `1px solid ${r.status === "overdue" ? "#FECACA" : Z.border}`, borderRadius: 10, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 11, color: Z.textMuted, marginBottom: 2 }}>{r.id}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: Z.text }}>{r.customer}</div>
                <div style={{ fontSize: 13, color: Z.textMuted }}>{r.vehicle}</div>
              </div>
              {statusBadge(r.status)}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              {[{ l: "Due Date", v: r.due }, { l: "Amount", v: `₹${r.amount.toLocaleString()}` }, { l: "Owner", v: r.assignedTo }].map(item => (
                <div key={item.l} style={{ background: Z.bg, borderRadius: 8, padding: "10px 14px" }}>
                  <div style={{ fontSize: 11, color: Z.textMuted, textTransform: "uppercase", letterSpacing: 0.4 }}>{item.l}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: Z.text, marginTop: 4 }}>{item.v}</div>
                </div>
              ))}
            </div>
            {r.status === "overdue" && (
              <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                <Btn size="sm">📞 Call Customer</Btn>
                <Btn size="sm" variant="ghost">Mark Renewed</Btn>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Section: Returns ────────────────────────────────────────────────────────
const ReturnsView = ({ role }) => {
  const [returns, setReturns] = useState(RETURNS);
  const approveRefund = (id) => setReturns(prev => prev.map(r => r.id === id ? { ...r, refundApproved: true, closed: true, status: "closed" } : r));

  return (
    <div>
      <PageHeader title="Return Workflow" sub="Process vehicle returns, inspection, and refunds" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }}>
        <StatCard label="Active Returns" value={returns.filter(r => !r.closed).length} accent={Z.blue} />
        <StatCard label="Pending Reviews" value={returns.filter(r => !r.pdiDone && !r.closed).length} accent={Z.amber} />
        <StatCard label="Refund Approvals" value={returns.filter(r => r.refundRequested && !r.refundApproved).length} accent={Z.red} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        {returns.map(r => (
          <div key={r.id} style={{ background: Z.white, border: `1px solid ${Z.border}`, borderRadius: 10, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 11, color: Z.textMuted }}>{r.id}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: Z.text }}>{r.vehicle}</div>
                <div style={{ fontSize: 12, color: Z.textMuted }}>Booking {r.bookingId} · {r.customer} · {r.assignedTo}</div>
              </div>
              {statusBadge(r.status)}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
              {[
                { l: "Odometer", v: `${r.odometer.toLocaleString()} km` },
                { l: "Photos", v: r.photosSubmitted ? "✅ Submitted" : "❌ Pending" },
                { l: "Post-return PDI", v: r.pdiDone ? "✅ Complete" : "⚠️ Incomplete" },
                { l: "Refund Request", v: r.refundRequested ? (r.refundApproved ? "✅ Approved" : "⏳ Awaiting") : "Not requested" },
              ].map(item => (
                <div key={item.l} style={{ background: Z.bg, borderRadius: 7, padding: "10px 12px" }}>
                  <div style={{ fontSize: 11, color: Z.textMuted }}>{item.l}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: Z.text, marginTop: 3 }}>{item.v}</div>
                </div>
              ))}
            </div>
            {!r.closed && (
              <div>
                <div style={{ fontSize: 11, color: Z.textMuted, marginBottom: 6 }}>Next Step</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: Z.blue, marginBottom: 10 }}>
                  {!r.photosSubmitted ? "Collect return media" : !r.pdiDone ? "Complete post-return PDI" : r.refundRequested && !r.refundApproved ? "Approve refund" : "Close account"}
                </div>
                {r.refundRequested && !r.refundApproved && role === "admin" && (
                  <Btn onClick={() => approveRefund(r.id)}>✅ Approve Refund</Btn>
                )}
              </div>
            )}
            {r.closed && <div style={{ fontSize: 12, color: Z.green, fontWeight: 600 }}>✅ Account Closed</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Section: Recovery ───────────────────────────────────────────────────────
const RecoveryView = () => {
  const [cases, setCases] = useState(RECOVERY_CASES);
  const [toast, setToast] = useState(null);
  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const updateStatus = (id, status) => { setCases(prev => prev.map(c => c.id === id ? { ...c, status } : c)); showToast("Case updated"); };

  const statusColors = { open: Z.red, contacted: Z.amber, "legal-escalation": Z.purple, resolved: Z.green };

  return (
    <div>
      {toast && <div style={{ position: "fixed", top: 20, right: 20, background: Z.green, color: "#fff", padding: "12px 20px", borderRadius: 8, zIndex: 9999, fontSize: 13, fontWeight: 600 }}>{toast}</div>}
      <PageHeader title="Recovery Queue" sub="Manage overdue vehicle recovery cases" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        <StatCard label="Total Cases" value={cases.length} accent={Z.blue} />
        <StatCard label="Open" value={cases.filter(c => c.status === "open").length} accent={Z.red} />
        <StatCard label="Contacted" value={cases.filter(c => c.status === "contacted").length} accent={Z.amber} />
        <StatCard label="Resolved" value={cases.filter(c => c.status === "resolved").length} accent={Z.green} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {cases.map(c => (
          <div key={c.id} style={{ background: Z.white, border: `1px solid ${statusColors[c.status] || Z.border}22`, borderLeft: `4px solid ${statusColors[c.status] || Z.border}`, borderRadius: 10, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: Z.textMuted }}>{c.id}</span>
                  {statusBadge(c.status)}
                  <span style={{ fontSize: 12, color: Z.red, fontWeight: 600 }}>Overdue by {c.overdueBy}</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: Z.text }}>{c.customer}</div>
                <div style={{ fontSize: 13, color: Z.textMuted }}>{c.vehicle} · {c.bookingId} · Assigned: {c.assignedTo}</div>
                {c.notes && <div style={{ fontSize: 12, color: Z.textMuted, marginTop: 6, fontStyle: "italic" }}>{c.notes}</div>}
              </div>
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                <Btn size="sm" variant="ghost">📞 {c.phone}</Btn>
                {c.status === "open" && <Btn size="sm" onClick={() => updateStatus(c.id, "contacted")}>Mark Contacted</Btn>}
                {c.status === "contacted" && <Btn size="sm" variant="danger" onClick={() => updateStatus(c.id, "legal-escalation")}>Escalate</Btn>}
                {c.status === "contacted" && <Btn size="sm" onClick={() => updateStatus(c.id, "resolved")}>Resolved ✓</Btn>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Section: Service Jobs ───────────────────────────────────────────────────
const ServiceJobsView = ({ role }) => {
  const [jobs, setJobs] = useState(SERVICE_JOBS);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ vehicle: "", type: "", assignedTo: "", priority: "medium", issue: "" });
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? jobs : jobs.filter(j => j.status === filter);
  const addJob = () => {
    setJobs(prev => [...prev, { ...form, id: `JOB-${prev.length + 113}`, status: "open", created: new Date().toISOString().split("T")[0], fromPdi: false }]);
    setShowModal(false); setForm({ vehicle: "", type: "", assignedTo: "", priority: "medium", issue: "" });
  };

  const updateStatus = (id, status) => setJobs(prev => prev.map(j => j.id === id ? { ...j, status } : j));

  return (
    <div>
      <PageHeader title="Service Job Cards" sub="Track maintenance and inspection work across the fleet"
        action={role === "admin" && <Btn onClick={() => setShowModal(true)}>+ New Job</Btn>} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }}>
        <StatCard label="Open" value={jobs.filter(j => j.status !== "completed").length} accent={Z.amber} />
        <StatCard label="In Progress" value={jobs.filter(j => j.status === "in-progress").length} accent={Z.orange} />
        <StatCard label="Completed" value={jobs.filter(j => j.status === "completed").length} accent={Z.green} />
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["all","open","scheduled","in-progress","completed","inspection"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: "6px 14px", borderRadius: 20, border: `1px solid ${filter === f ? Z.blue : Z.border}`, background: filter === f ? Z.blueLight : Z.white, color: filter === f ? Z.blue : Z.textMuted, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            {f === "all" ? "All" : f.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase())}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {filtered.map(j => (
          <div key={j.id} style={{ background: Z.white, border: `1px solid ${Z.border}`, borderRadius: 10, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: Z.textMuted }}>{j.id}</span>
                  {statusBadge(j.status)}
                  {statusBadge(j.priority)}
                  {j.fromPdi && <Badge text="From PDI" color="orange" />}
                </div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{j.vehicle}</div>
                <div style={{ fontSize: 13, color: Z.textMuted }}>{j.type} · Assigned: {j.assignedTo}</div>
                <div style={{ fontSize: 12, color: Z.textMuted, marginTop: 4 }}>🔧 {j.issue}</div>
              </div>
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                {j.status === "open" && <Btn size="sm" onClick={() => updateStatus(j.id, "in-progress")}>Start Job</Btn>}
                {j.status === "scheduled" && <Btn size="sm" onClick={() => updateStatus(j.id, "in-progress")}>Start Job</Btn>}
                {j.status === "in-progress" && <Btn size="sm" onClick={() => updateStatus(j.id, "completed")}>Mark Complete ✓</Btn>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && <Modal title="New Service Job" onClose={() => setShowModal(false)}>
        <Field label="Vehicle"><Input value={form.vehicle} onChange={v => setForm({...form, vehicle: v})} placeholder="e.g. Zargo X1 (ZRG-001)" /></Field>
        <Field label="Job Type"><Input value={form.type} onChange={v => setForm({...form, type: v})} placeholder="e.g. Battery inspection" /></Field>
        <Field label="Issue / Description"><textarea value={form.issue} onChange={e => setForm({...form, issue: e.target.value})} rows={2} placeholder="Describe the problem..." style={{ width: "100%", padding: "8px 10px", border: `1px solid ${Z.border}`, borderRadius: 7, fontSize: 13, boxSizing: "border-box" }} /></Field>
        <Field label="Priority"><Select value={form.priority} onChange={v => setForm({...form, priority: v})} options={["high","medium","low"].map(p => ({value:p, label:p.charAt(0).toUpperCase()+p.slice(1)}))} /></Field>
        <Field label="Assign To"><Select value={form.assignedTo} onChange={v => setForm({...form, assignedTo: v})} options={[{value:"",label:"— Select Staff —"}, ...STAFF_LIST.map(s => ({value:s,label:s}))]} /></Field>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
          <Btn variant="secondary" onClick={() => setShowModal(false)}>Cancel</Btn>
          <Btn onClick={addJob} disabled={!form.vehicle || !form.type}>Create Job</Btn>
        </div>
      </Modal>}
    </div>
  );
};

// ─── Section: Insurance ──────────────────────────────────────────────────────
const InsuranceView = () => {
  return (
    <div>
      <PageHeader title="Insurance" sub="Track policies, claims, and renewal readiness"
        action={<Btn>+ New Policy</Btn>} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }}>
        <StatCard label="Total Records" value={INSURANCE.length} accent={Z.blue} />
        <StatCard label="Expiring Soon" value={INSURANCE.filter(i => i.status === "expiring").length} accent={Z.red} />
        <StatCard label="Active Claims" value={INSURANCE.filter(i => i.type === "claim" && i.status === "active").length} accent={Z.amber} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {INSURANCE.map(ins => (
          <div key={ins.id} style={{ background: Z.white, border: `1px solid ${ins.status === "expiring" ? "#FECACA" : Z.border}`, borderRadius: 10, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 11, color: Z.textMuted }}>{ins.id}</div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{ins.policy}</div>
                <div style={{ fontSize: 13, color: Z.textMuted }}>{ins.vehicle} · {ins.type.charAt(0).toUpperCase() + ins.type.slice(1)}</div>
              </div>
              {statusBadge(ins.status)}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              {[{ l: "Premium", v: ins.premium > 0 ? `₹${ins.premium.toLocaleString()}` : "—" }, { l: "Renewal", v: ins.renewal }, { l: "Managed By", v: ins.managedBy }].map(item => (
                <div key={item.l} style={{ background: Z.bg, borderRadius: 8, padding: "10px 14px" }}>
                  <div style={{ fontSize: 11, color: Z.textMuted }}>{item.l}</div>
                  <div style={{ fontWeight: 700, fontSize: 13, marginTop: 4 }}>{item.v}</div>
                </div>
              ))}
            </div>
            {ins.status === "expiring" && (
              <div style={{ marginTop: 12, background: Z.redLight, padding: "8px 12px", borderRadius: 7, fontSize: 12, color: Z.red, fontWeight: 600 }}>
                ⚠️ Policy expires on {ins.renewal} – Action required
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Section: CRM Dashboard ──────────────────────────────────────────────────
const CRMDashboardView = () => (
  <div>
    <PageHeader title="CRM Dashboard" sub="Customer touchpoints, follow-ups, and recovery performance" />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14, marginBottom: 28 }}>
      <StatCard label="Today's Calls" value={0} sub="Customer outreach" accent={Z.blue} />
      <StatCard label="Renewal Follow-ups" value={RENEWALS.filter(r => r.status === "overdue" || r.status === "upcoming").length} sub="Renewal reminders" accent={Z.amber} />
      <StatCard label="Payment Reminders" value={2} sub="Pending payments" accent={Z.red} />
      <StatCard label="Recovery Cases" value={RECOVERY_CASES.length} sub="Open recovery items" accent={Z.orange} />
      <StatCard label="Missed Follow-ups" value={FOLLOW_UPS.filter(f => f.status === "overdue").length} sub="Overdue actions" accent={Z.red} />
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
      {[
        { label: "PENDING CALL", value: FOLLOW_UPS.filter(f => f.status === "pending").length },
        { label: "FOLLOW UP DONE", value: 1 },
        { label: "RECOVERY VISIT REQUIRED", value: 1 },
        { label: "RESOLVED", value: 0 },
        { label: "LEGAL ESCALATION", value: RECOVERY_CASES.filter(c => c.status === "legal-escalation").length },
      ].map(item => (
        <div key={item.label} style={{ background: Z.white, border: `1px solid ${Z.border}`, borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: Z.textMuted, letterSpacing: 0.5 }}>{item.label}</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: Z.text, marginTop: 8 }}>{item.value}</div>
        </div>
      ))}
    </div>
  </div>
);

// ─── Section: Follow Ups ─────────────────────────────────────────────────────
const FollowUpsView = () => {
  const [followUps, setFollowUps] = useState(FOLLOW_UPS);
  const markDone = (id) => setFollowUps(prev => prev.map(f => f.id === id ? { ...f, status: "done" } : f));

  return (
    <div>
      <PageHeader title="Follow-up Center" sub="Manage calls, reminders, and customer follow-up actions" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
        <div style={{ background: Z.white, border: `1px solid ${Z.border}`, borderRadius: 10, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 11, color: Z.textMuted }}>TOTAL FOLLOW-UPS</div>
          <div style={{ fontSize: 36, fontWeight: 800, color: Z.text }}>{followUps.length}</div>
        </div>
        <div style={{ background: Z.white, border: `1px solid ${Z.border}`, borderRadius: 10, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 11, color: Z.textMuted }}>COMPLETED</div>
          <div style={{ fontSize: 36, fontWeight: 800, color: Z.green }}>{followUps.filter(f => f.status === "done").length}</div>
        </div>
      </div>
      <div style={{ background: Z.white, border: `1px solid ${Z.border}`, borderRadius: 10, overflow: "hidden" }}>
        <Table
          cols={[
            { key: "customer", label: "Customer", render: r => <div><div style={{ fontWeight: 600 }}>{r.customer}</div><div style={{ fontSize: 11, color: Z.textMuted }}>{r.phone}</div></div> },
            { key: "vehicle", label: "Vehicle" },
            { key: "bookingId", label: "Booking ID" },
            { key: "reason", label: "Reason" },
            { key: "due", label: "Due Date" },
            { key: "status", label: "Status", render: r => statusBadge(r.status) },
            { key: "assignedTo", label: "Assigned To" },
            { key: "actions", label: "Actions", render: r => r.status !== "done" ? (
              <div style={{ display: "flex", gap: 6 }}>
                <Btn size="sm" variant="ghost">📞 Call</Btn>
                <Btn size="sm" onClick={() => markDone(r.id)}>✓ Done</Btn>
              </div>
            ) : <Badge text="Completed" color="green" /> },
          ]}
          rows={followUps}
        />
      </div>
    </div>
  );
};

// ─── Section: Customer Timeline ──────────────────────────────────────────────
const CustomerTimelineView = () => {
  const timeline = [
    { title: "Recovery Initiated", by: "Meera Iyer", date: "2026-05-29 13:50", desc: "Follow up issued for overdue payment collection.", icon: "🛡️" },
    { title: "Vehicle Returned", by: "Suresh Nair", date: "2026-05-28 17:05", desc: "Return completed with inspection notes logged.", icon: "🔄" },
    { title: "Payment Received", by: "Anita Desai", date: "2026-05-25 11:10", desc: "Invoice settled for current rental period.", icon: "✅" },
    { title: "Lead Created", by: "Priya Sharma", date: "2026-05-24 10:12", desc: "New inquiry recorded for a long-term EV rental.", icon: "📋" },
    { title: "Booking Created", by: "Rahul Verma", date: "2026-05-23 15:20", desc: "Booking confirmed with payment details pending.", icon: "📅" },
    { title: "Vehicle Assigned", by: "Rahul Verma", date: "2026-05-20 09:45", desc: "Vehicle ZRG-X1 assigned after successful PDI.", icon: "🚲" },
  ];

  return (
    <div>
      <PageHeader title="Customer Timeline" sub="Chronological history of customer engagement and service milestones" />
      <div style={{ background: Z.white, border: `1px solid ${Z.border}`, borderRadius: 10, padding: 24 }}>
        {timeline.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 16, paddingBottom: i < timeline.length - 1 ? 20 : 0, borderBottom: i < timeline.length - 1 ? `1px solid ${Z.border}` : "none", marginBottom: i < timeline.length - 1 ? 20 : 0 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: Z.blueLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{item.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: Z.text }}>{item.title}</div>
                <div style={{ fontSize: 12, color: Z.textMuted }}>{item.date}</div>
              </div>
              <div style={{ fontSize: 12, color: Z.blue, marginBottom: 4 }}>{item.by}</div>
              <div style={{ fontSize: 13, color: Z.textMuted }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Section: Rental Plans (Admin) ───────────────────────────────────────────
const RentalPlansView = () => {
  const [plans, setPlans] = useState(RENTAL_PLANS);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", duration: "30 days", km: "", price: "", deposit: "" });

  const addPlan = () => {
    setPlans(prev => [...prev, {
      id: `P${String(prev.length + 1).padStart(3, "0")}`,
      name: form.name, duration: form.duration,
      km: parseInt(form.km) || 0, price: parseInt(form.price) || 0,
      deposit: parseInt(form.deposit) || 0, active: true
    }]);
    setShowModal(false);
    setForm({ name: "", duration: "30 days", km: "", price: "", deposit: "" });
  };

  const toggleActive = (id) => setPlans(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));

  return (
    <div>
      <PageHeader title="Rental Plans" sub="Manage subscription plans available to riders"
        action={<Btn onClick={() => setShowModal(true)}>+ New Plan</Btn>} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
        {plans.map(p => (
          <div key={p.id} style={{ background: Z.white, border: `2px solid ${p.active ? Z.blue : Z.border}`, borderRadius: 12, padding: 24, position: "relative" }}>
            {!p.active && <div style={{ position: "absolute", top: 10, right: 10 }}><Badge text="Inactive" color="gray" /></div>}
            <div style={{ fontSize: 16, fontWeight: 800, color: p.active ? Z.blue : Z.textMuted, marginBottom: 4 }}>{p.name}</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: Z.text, marginBottom: 4 }}>₹{p.price.toLocaleString()}<span style={{ fontSize: 13, color: Z.textMuted }}>/mo</span></div>
            <div style={{ fontSize: 13, color: Z.textMuted, marginBottom: 16 }}>{p.duration}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
              {[
                { l: "KM Limit", v: p.km === 99999 ? "Unlimited" : `${p.km.toLocaleString()} KM` },
                { l: "Security Deposit", v: `₹${p.deposit.toLocaleString()}` },
              ].map(item => (
                <div key={item.l} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: Z.textMuted }}>{item.l}</span>
                  <span style={{ fontWeight: 700, color: Z.text }}>{item.v}</span>
                </div>
              ))}
            </div>
            <Btn size="sm" variant={p.active ? "danger" : "ghost"} onClick={() => toggleActive(p.id)}>
              {p.active ? "Deactivate" : "Activate"}
            </Btn>
          </div>
        ))}
      </div>

      {showModal && <Modal title="New Rental Plan" onClose={() => setShowModal(false)}>
        <Field label="Plan Name"><Input value={form.name} onChange={v => setForm({...form, name: v})} placeholder="e.g. Pro – 3000 KM" /></Field>
        <Field label="Duration"><Select value={form.duration} onChange={v => setForm({...form, duration: v})} options={["30 days","60 days","90 days","Custom"].map(d => ({value:d,label:d}))} /></Field>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          <Field label="KM Limit"><Input value={form.km} onChange={v => setForm({...form, km: v})} placeholder="e.g. 3000" type="number" /></Field>
          <Field label="Price (₹/mo)"><Input value={form.price} onChange={v => setForm({...form, price: v})} placeholder="e.g. 8999" type="number" /></Field>
          <Field label="Deposit (₹)"><Input value={form.deposit} onChange={v => setForm({...form, deposit: v})} placeholder="e.g. 5000" type="number" /></Field>
        </div>
        <p style={{ fontSize: 12, color: Z.textMuted, background: Z.blueLight, padding: "8px 12px", borderRadius: 7 }}>
          ℹ️ New plan will be immediately available when creating bookings.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
          <Btn variant="secondary" onClick={() => setShowModal(false)}>Cancel</Btn>
          <Btn onClick={addPlan} disabled={!form.name || !form.price}>Create Plan</Btn>
        </div>
      </Modal>}
    </div>
  );
};

// ─── Section: Employees (Admin) ──────────────────────────────────────────────
const EmployeesView = () => {
  const [employees, setEmployees] = useState(EMPLOYEES);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "Staff", hub: HUBS[0] });

  const addEmployee = () => {
    setEmployees(prev => [...prev, { ...form, id: `E${String(prev.length + 1).padStart(3, "0")}`, status: "Active", joined: new Date().toISOString().split("T")[0], bookings: 0 }]);
    setShowModal(false); setForm({ name: "", email: "", phone: "", role: "Staff", hub: HUBS[0] });
  };

  return (
    <div>
      <PageHeader title="Staff Management" sub="Manage team members and their assignments"
        action={<Btn onClick={() => setShowModal(true)}>+ Add Staff</Btn>} />
      <div style={{ background: Z.white, border: `1px solid ${Z.border}`, borderRadius: 10, overflow: "hidden" }}>
        <Table
          cols={[
            { key: "name", label: "Name", render: r => <div style={{ display: "flex", gap: 10, alignItems: "center" }}><Avatar name={r.name} /><div><div style={{ fontWeight: 600 }}>{r.name}</div><div style={{ fontSize: 11, color: Z.textMuted }}>{r.email}</div></div></div> },
            { key: "role", label: "Role" },
            { key: "hub", label: "Hub" },
            { key: "phone", label: "Phone" },
            { key: "bookings", label: "Bookings" },
            { key: "joined", label: "Joined" },
            { key: "status", label: "Status", render: r => <Badge text={r.status} color={r.status === "Active" ? "green" : "gray"} /> },
          ]}
          rows={employees}
        />
      </div>

      {showModal && <Modal title="Add Staff Member" onClose={() => setShowModal(false)}>
        <Field label="Full Name"><Input value={form.name} onChange={v => setForm({...form, name: v})} placeholder="Full name" /></Field>
        <Field label="Email"><Input value={form.email} onChange={v => setForm({...form, email: v})} placeholder="name@zargo.in" type="email" /></Field>
        <Field label="Phone"><Input value={form.phone} onChange={v => setForm({...form, phone: v})} placeholder="+91..." /></Field>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Field label="Role"><Select value={form.role} onChange={v => setForm({...form, role: v})} options={["Staff","Manager"].map(r => ({value:r,label:r}))} /></Field>
          <Field label="Hub"><Select value={form.hub} onChange={v => setForm({...form, hub: v})} options={HUBS.map(h => ({value:h,label:h}))} /></Field>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
          <Btn variant="secondary" onClick={() => setShowModal(false)}>Cancel</Btn>
          <Btn onClick={addEmployee} disabled={!form.name || !form.email}>Add Staff</Btn>
        </div>
      </Modal>}
    </div>
  );
};

// ─── Section: My Tasks (Staff) ───────────────────────────────────────────────
const MyTasksView = () => {
  const tasks = [
    { id: "T-001", title: "Complete PDI for ZRG-X1A", module: "PDI Inspection", due: "2026-06-16", status: "in-progress", priority: "high" },
    { id: "T-002", title: "Follow up with Priya Sharma – Renewal", module: "Follow-ups", due: "2026-06-17", status: "assigned", priority: "medium" },
    { id: "T-003", title: "Return workflow for RTN-801 – Approve refund", module: "Returns", due: "2026-06-18", status: "awaiting-approval", priority: "high" },
  ];

  return (
    <div>
      <PageHeader title="My Tasks" sub="Your assigned operational work items" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }}>
        <StatCard label="Assigned" value={tasks.length} accent={Z.blue} />
        <StatCard label="Awaiting Approval" value={tasks.filter(t => t.status === "awaiting-approval").length} accent={Z.amber} />
        <StatCard label="In Progress" value={tasks.filter(t => t.status === "in-progress").length} accent={Z.green} />
      </div>
      {tasks.length === 0 ? (
        <div style={{ background: Z.white, border: `1px solid ${Z.border}`, borderRadius: 10, padding: 60, textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📥</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: Z.textMuted }}>No assigned tasks</div>
          <div style={{ fontSize: 13, color: Z.textMuted }}>Check back when new operational work items are routed to you.</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {tasks.map(t => (
            <div key={t.id} style={{ background: Z.white, border: `1px solid ${Z.border}`, borderRadius: 10, padding: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                    <Badge text={t.module} color="blue" />
                    {statusBadge(t.priority)}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{t.title}</div>
                  <div style={{ fontSize: 12, color: Z.textMuted, marginTop: 4 }}>Due: {t.due}</div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  {statusBadge(t.status)}
                  <Btn size="sm" variant="ghost">View →</Btn>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Login Page ──────────────────────────────────────────────────────────────
const LoginPage = ({ onLogin }) => {
  const [role, setRole] = useState("admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handle = async () => {
    if (!username || !password) { setErr("Please enter credentials."); return; }
    setErr("");
    try {
      const data = await post("/auth/login", { email: username, password });
      localStorage.setItem("zargo_token", data.token);
      onLogin(data.user);
    } catch (e: any) {
      setErr(e.message || "Invalid credentials");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: Z.darkNav, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: Z.white, borderRadius: 16, padding: 40, width: "100%", maxWidth: 400, boxShadow: "0 24px 80px rgba(0,0,0,0.3)" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32, justifyContent: "center" }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: Z.blue, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 900, fontSize: 22, fontStyle: "italic" }}>Z</span>
          </div>
          <span style={{ fontSize: 26, fontWeight: 900, color: Z.blue, fontStyle: "italic" }}>Zargo</span>
        </div>

        <h2 style={{ textAlign: "center", fontSize: 20, fontWeight: 700, color: Z.text, marginBottom: 6 }}>Fleet Dashboard</h2>
        <p style={{ textAlign: "center", fontSize: 13, color: Z.textMuted, marginBottom: 28 }}>Sign in to manage your fleet operations</p>

        <div style={{ display: "flex", marginBottom: 24, border: `1px solid ${Z.border}`, borderRadius: 8, overflow: "hidden" }}>
          {["admin","staff"].map(r => (
            <button key={r} onClick={() => setRole(r)}
              style={{ flex: 1, padding: "10px 0", border: "none", background: role === r ? Z.blue : Z.white, color: role === r ? "#fff" : Z.textMuted, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        <Field label="Username / Email">
          <Input value={username} onChange={setUsername} placeholder={role === "admin" ? "admin" : "staff"} />
        </Field>
        <Field label="Password">
          <Input value={password} onChange={setPassword} placeholder="••••••••" type="password" />
        </Field>

        {err && <div style={{ color: Z.red, fontSize: 12, marginBottom: 12 }}>{err}</div>}

        <button onClick={handle} style={{ width: "100%", padding: "12px 0", background: Z.blue, color: "#fff", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 8 }}>
          Sign In →
        </button>

        <p style={{ textAlign: "center", fontSize: 11, color: Z.textMuted, marginTop: 20 }}>
          Use any credentials to demo the dashboard
        </p>
      </div>
    </div>
  );
};

// ─── Navigation Config ───────────────────────────────────────────────────────
const navConfig = {
  admin: [
    { id: "dashboard", label: "Dashboard", icon: "🏠" },
    {
      group: "Fleet Operations",
      items: [
        { id: "leads", label: "Leads", icon: "👥" },
        { id: "vehicles", label: "Vehicles", icon: "🚲" },
        { id: "pdi", label: "PDI Inspection", icon: "📋" },
        { id: "bookings", label: "Bookings", icon: "📅" },
      ]
    },
    {
      group: "Rental Lifecycle",
      items: [
        { id: "renewals", label: "Renewals", icon: "🔄" },
        { id: "returns", label: "Returns", icon: "↩️" },
        { id: "recovery", label: "Recovery", icon: "🔍" },
      ]
    },
    {
      group: "Support",
      items: [
        { id: "service", label: "Service Jobs", icon: "🔧" },
        { id: "insurance", label: "Insurance", icon: "🛡️" },
      ]
    },
    {
      group: "CRM",
      items: [
        { id: "crm", label: "CRM Dashboard", icon: "📊" },
        { id: "followups", label: "Follow-ups", icon: "📞" },
        { id: "timeline", label: "Customer History", icon: "🗂️" },
      ]
    },
    {
      group: "Administration",
      items: [
        { id: "plans", label: "Rental Plans", icon: "💳" },
        { id: "employees", label: "Staff", icon: "👤" },
      ]
    },
  ],
  staff: [
    { id: "dashboard", label: "Dashboard", icon: "🏠" },
    { id: "mytasks", label: "My Tasks", icon: "✅" },
    {
      group: "Fleet Operations",
      items: [
        { id: "leads", label: "Leads", icon: "👥" },
        { id: "vehicles", label: "Vehicles", icon: "🚲" },
        { id: "pdi", label: "PDI Inspection", icon: "📋" },
        { id: "bookings", label: "Bookings", icon: "📅" },
      ]
    },
    {
      group: "Rental Lifecycle",
      items: [
        { id: "renewals", label: "Renewals", icon: "🔄" },
        { id: "returns", label: "Returns", icon: "↩️" },
      ]
    },
    {
      group: "Support",
      items: [
        { id: "service", label: "Service Jobs", icon: "🔧" },
      ]
    },
    {
      group: "CRM",
      items: [
        { id: "crm", label: "CRM Dashboard", icon: "📊" },
        { id: "followups", label: "Follow-ups", icon: "📞" },
        { id: "timeline", label: "Customer History", icon: "🗂️" },
      ]
    },
  ]
};

// ─── Sidebar ─────────────────────────────────────────────────────────────────
const Sidebar = ({ active, onNav, user, onLogout }) => {
  const [openGroups, setOpenGroups] = useState({ "Fleet Operations": true, "Rental Lifecycle": true, "Support": true, "CRM": true, "Administration": true });
  const nav = navConfig[user.role];

  const toggleGroup = g => setOpenGroups(p => ({ ...p, [g]: !p[g] }));
  const isActive = (id) => active === id;

  const linkStyle = (id) => ({
    display: "flex", alignItems: "center", gap: 9, padding: "8px 12px", borderRadius: 7,
    fontSize: 13, fontWeight: isActive(id) ? 700 : 500, cursor: "pointer", transition: "all 0.15s",
    background: isActive(id) ? Z.blue : "transparent",
    color: isActive(id) ? "#fff" : Z.navText,
    border: "none", width: "100%", textAlign: "left",
  });

  return (
    <div style={{ width: 220, minWidth: 220, background: Z.darkNav, height: "100vh", display: "flex", flexDirection: "column", position: "sticky", top: 0 }}>
      {/* Logo */}
      <div style={{ padding: "20px 20px 16px", borderBottom: `1px solid rgba(255,255,255,0.08)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: Z.blue, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 900, fontSize: 18, fontStyle: "italic" }}>Z</span>
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 900, fontSize: 18, fontStyle: "italic", lineHeight: 1 }}>Zargo</div>
            <div style={{ color: Z.navText, fontSize: 10, lineHeight: 1, marginTop: 2 }}>Fleet Management</div>
          </div>
        </div>
      </div>

      {/* User badge */}
      <div style={{ padding: "12px 16px", borderBottom: `1px solid rgba(255,255,255,0.08)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: Z.blue, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>
            {initials(user.name)}
          </div>
          <div>
            <div style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>{user.name}</div>
            <div style={{ color: Z.navText, fontSize: 11 }}>{user.hub}</div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <Badge text={user.role === "admin" ? "Admin" : "Staff"} color={user.role === "admin" ? "blue" : "gray"} size="xs" />
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: "auto", padding: "12px 10px" }}>
        {nav.map((item, idx) => {
          if (item.group) {
            const isOpen = openGroups[item.group] !== false;
            return (
              <div key={item.group} style={{ marginTop: 8 }}>
                <button onClick={() => toggleGroup(item.group)}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "6px 12px", background: "none", border: "none", cursor: "pointer", color: Z.navText, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8 }}>
                  {item.group}
                  <span style={{ transition: "transform 0.2s", display: "inline-block", transform: isOpen ? "rotate(0)" : "rotate(-90deg)" }}>▾</span>
                </button>
                {isOpen && (
                  <div style={{ paddingLeft: 6 }}>
                    {item.items.map(link => (
                      <button key={link.id} onClick={() => onNav(link.id)} style={linkStyle(link.id)}>
                        <span>{link.icon}</span>
                        <span>{link.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          }
          return (
            <button key={item.id} onClick={() => onNav(item.id)} style={{ ...linkStyle(item.id), marginBottom: 2 }}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: "12px 10px", borderTop: `1px solid rgba(255,255,255,0.08)` }}>
        <button onClick={onLogout} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 7, fontSize: 13, fontWeight: 500, color: "#EF4444", background: "transparent", border: "none", width: "100%", cursor: "pointer" }}>
          ← Logout
        </button>
        <div style={{ fontSize: 10, color: Z.navText, textAlign: "center", marginTop: 8 }}>© 2026 Zargo EV</div>
      </div>
    </div>
  );
};

// ─── Topbar ──────────────────────────────────────────────────────────────────
const Topbar = ({ user, activePage }) => {
  const pageLabels = { dashboard: "Dashboard", leads: "Leads", vehicles: "Fleet Vehicles", pdi: "PDI Inspection", bookings: "Bookings", renewals: "Renewals", returns: "Returns", recovery: "Recovery", service: "Service Jobs", insurance: "Insurance", crm: "CRM Dashboard", followups: "Follow-up Center", timeline: "Customer History", plans: "Rental Plans", employees: "Staff Management", mytasks: "My Tasks" };

  return (
    <div style={{ background: Z.white, borderBottom: `1px solid ${Z.border}`, padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: Z.text }}>{pageLabels[activePage] || "Zargo"}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ fontSize: 13, color: Z.textMuted }}>📅 Tue, Jun 16, 2026</div>
        <div style={{ fontSize: 13, color: Z.textMuted }}>📍 {user.hub}</div>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: Z.blue, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>
          {initials(user.name)}
        </div>
      </div>
    </div>
  );
};

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [active, setActive] = useState("dashboard");

  if (!user) return <LoginPage onLogin={u => setUser(u)} />;

  const pages = {
    dashboard: <DashboardView role={user.role} />,
    leads: <LeadsView role={user.role} />,
    vehicles: <VehiclesView role={user.role} />,
    pdi: <PDIView role={user.role} />,
    bookings: <BookingsView role={user.role} />,
    renewals: <RenewalsView />,
    returns: <ReturnsView role={user.role} />,
    recovery: <RecoveryView />,
    service: <ServiceJobsView role={user.role} />,
    insurance: <InsuranceView />,
    crm: <CRMDashboardView />,
    followups: <FollowUpsView />,
    timeline: <CustomerTimelineView />,
    plans: <RentalPlansView />,
    employees: <EmployeesView />,
    mytasks: <MyTasksView />,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: Z.bg, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <Sidebar active={active} onNav={setActive} user={user} onLogout={() => { localStorage.removeItem("zargo_token"); setUser(null); }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Topbar user={user} activePage={active} />
        <main style={{ flex: 1, padding: 28, overflowY: "auto" }}>
          {pages[active] || <div style={{ padding: 40, textAlign: "center", color: Z.textMuted }}>Page not found</div>}
        </main>
      </div>
    </div>
  );
}
