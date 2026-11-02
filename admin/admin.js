// Srinika Admin Panel - owner only (Google sign-in). Talks to Firestore directly; the
// security rules (firestore.rules) are what protect the data, this page is just a UI.
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCYF8fz7INIDgs-jVGOHbRLe2pu3ygXJEM",
  authDomain: "srinika-medisurge.firebaseapp.com",
  projectId: "srinika-medisurge",
  storageBucket: "srinika-medisurge.firebasestorage.app",
  messagingSenderId: "706331056301",
  appId: "1:706331056301:web:083ab5aeb1694e4d6c4e24",
  measurementId: "G-KVWZVZ5QHL"
};
const OWNER_EMAIL = "srinika.medisurge@gmail.com";

firebase.initializeApp(FIREBASE_CONFIG);
const auth = firebase.auth();
const db = firebase.firestore();

const $ = id => document.getElementById(id);
const esc = v => String(v == null ? "" : v).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const inr = n => "₹" + Number(n || 0).toLocaleString("en-IN");
const fmtDate = ms => ms ? new Date(ms).toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }) : "-";

function toast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.style.opacity = 1;
  clearTimeout(t._h);
  t._h = setTimeout(() => { t.style.opacity = 0; }, 3500);
}

// ================= auth =================
$("login-btn").onclick = async () => {
  $("login-error").classList.add("hidden");
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    await auth.signInWithPopup(provider);
  } catch (e) {
    showLoginError(e.code === "auth/unauthorized-domain"
      ? "This website address is not authorised for Google sign-in in Firebase (Authentication > Settings > Authorized domains)."
      : (e.message || "Sign-in failed"));
  }
};
$("logout-btn").onclick = () => auth.signOut();

function showLoginError(msg) {
  const el = $("login-error");
  el.textContent = msg;
  el.classList.remove("hidden");
}

auth.onAuthStateChanged(user => {
  if (!user) {
    $("app").classList.add("hidden");
    $("login").classList.remove("hidden");
    return;
  }
  if ((user.email || "").toLowerCase() !== OWNER_EMAIL || !user.emailVerified) {
    showLoginError("Access denied: " + user.email + " is not the owner account.");
    auth.signOut();
    return;
  }
  $("who").textContent = user.email;
  $("login").classList.add("hidden");
  $("app").classList.remove("hidden");
  startApp();
});

// ================= tabs =================
document.querySelectorAll(".tab-btn").forEach(b => {
  b.onclick = () => showTab(b.dataset.tab);
});
function showTab(name) {
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.toggle("active", b.dataset.tab === name));
  ["overview", "bookings", "payments", "prices", "staff", "idcard"].forEach(t => $("tab-" + t).classList.toggle("hidden", t !== name));
}

// ================= data =================
let tasks = [];          // visits in the selected window
let openTasks = [];      // all not-completed visits
let staff = [];
let prices = {};         // current overrides {key: number}
let pricesMeta = null;
let payRange = "30";     // "1" | "7" | "30" | "month" | "all"
let payStatus = "all", payMode = "all", payStaff = "all";
let started = false;

async function startApp() {
  if (started) { await reloadAll(); return; }
  started = true;
  await reloadAll();
}

function rangeStartMs(range) {
  const now = new Date();
  if (range === "all") return 0;
  if (range === "month") return new Date(now.getFullYear(), now.getMonth(), 1).getTime();
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  d.setDate(d.getDate() - (Number(range) - 1));
  return d.getTime();
}

async function loadTasks() {
  const from = rangeStartMs(payRange === "all" ? "all" : payRange);
  // Overview always needs the last 30 days; take the wider of the two windows.
  const overviewFrom = rangeStartMs("30");
  const start = Math.min(from, overviewFrom);
  let q = db.collection("tasks");
  if (start > 0) q = q.where("createdAtMs", ">=", start);
  const snap = await q.get();
  tasks = snap.docs.map(d => ({ ...d.data(), id: d.id }));
  tasks.sort((a, b) => (b.createdAtMs || 0) - (a.createdAtMs || 0));
  const open = await db.collection("tasks").where("status", "in", ["pending", "assigned", "in_progress"]).get();
  openTasks = open.docs.map(d => ({ ...d.data(), id: d.id }));
}

async function loadStaff() {
  const snap = await db.collection("staff").get();
  staff = snap.docs.map(d => ({ ...d.data(), id: d.id }));
  staff.sort((a, b) => String(a.name).localeCompare(String(b.name)));
}

async function loadPrices() {
  const snap = await db.collection("config").doc("prices").get();
  pricesMeta = snap.exists ? snap.data() : null;
  prices = (pricesMeta && pricesMeta.prices) ? { ...pricesMeta.prices } : {};
}

async function reloadAll() {
  try {
    await Promise.all([loadTasks(), loadStaff(), loadPrices(),
      loadIdCards().catch(e => toast("Could not load ID cards: " + (e.code || e.message) + " (publish the Firestore rules?)"))]);
  } catch (e) {
    toast("Could not load data: " + (e.code || e.message) + " (publish the Firestore rules?)");
  }
  renderOverview();
  renderBookings();
  renderPayments();
  renderPrices();
  renderStaff();
  renderIdCard();
}

// ================= overview =================
function amountOf(t) {
  if (t.paymentStatus === "paid") return Number(t.amountCollected || t.fee || 0);
  return Number(t.fee || 0);
}

// Cancelled / test bookings never count in visits or money.
const isLive = t => t.status !== "cancelled";

function renderOverview() {
  const todayStart = rangeStartMs("1");
  const monthStart = rangeStartMs("month");
  const live = tasks.filter(isLive);
  const cancelled = tasks.filter(t => !isLive(t));
  const paid = live.filter(t => t.paymentStatus === "paid");
  const when = t => t.completedAtMs || t.createdAtMs || 0;
  const sum = list => list.reduce((s, t) => s + amountOf(t), 0);
  const today = paid.filter(t => when(t) >= todayStart);
  const month = paid.filter(t => when(t) >= monthStart);
  const claimed = live.filter(t => t.paymentStatus === "claimed");
  const pending = openTasks.filter(t => t.status === "pending");
  const inProg = openTasks.filter(t => t.status !== "pending");
  const stat = (label, value, sub, color) => `<div class="card p-4"><div class="text-[11px] font-bold uppercase text-slate-400">${label}</div><div class="text-2xl font-black ${color || "text-slate-900"}">${value}</div><div class="text-[11px] text-slate-500">${sub || ""}</div></div>`;
  const recent = live.slice(0, 8).map(t => `<tr class="border-t border-slate-100"><td class="p-2 text-xs text-slate-500 whitespace-nowrap">${fmtDate(t.createdAtMs)}</td><td class="p-2 font-semibold">${esc(t.patientName)}</td><td class="p-2 text-xs">${esc(t.serviceName)}</td><td class="p-2 text-xs">${badge(t.status)}</td></tr>`).join("");
  $("tab-overview").innerHTML = `
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
      ${stat("Collected today", inr(sum(today)), today.length + " paid visits", "text-emerald-600")}
      ${stat("Collected this month", inr(sum(month)), month.length + " paid visits", "text-emerald-600")}
      ${stat("New / unassigned", pending.length, "waiting for assignment", pending.length ? "text-amber-600" : "")}
      ${stat("In progress", inProg.length, "assigned, not completed")}
      ${stat("Online payments to verify", claimed.length, inr(sum(claimed)) + " claimed", claimed.length ? "text-sky-700" : "")}
      ${stat("Visits (30 days)", live.length, "all sources, without cancelled")}
      ${stat("Cancelled (30 days)", cancelled.length, cancelled.filter(t => t.cancelReason === "Test entry").length + " test • " + cancelled.filter(t => t.cancelledBy === "patient").length + " by patient", cancelled.length ? "text-rose-600" : "")}
      ${stat("Active staff", staff.filter(s => s.status !== "inactive").length, staff.filter(s => s.status === "inactive").length + " deactivated")}
      ${stat("Price overrides", Object.keys(prices).length, pricesMeta && pricesMeta.updatedAtMs ? "updated " + fmtDate(pricesMeta.updatedAtMs) : "using built-in prices")}
    </div>
    <div class="card mt-3 overflow-x-auto">
      <div class="p-3 font-extrabold text-sm">Latest visit requests</div>
      <table class="w-full text-sm"><tbody>${recent || '<tr><td class="p-4 text-slate-400 text-sm">No visits yet.</td></tr>'}</tbody></table>
    </div>`;
}

function badge(status) {
  const map = { pending: "bg-amber-100 text-amber-800", assigned: "bg-sky-100 text-sky-800", in_progress: "bg-sky-100 text-sky-800", completed: "bg-emerald-100 text-emerald-800", cancelled: "bg-rose-100 text-rose-800" };
  const label = { pending: "New", assigned: "Assigned", in_progress: "In progress", completed: "Completed", cancelled: "Cancelled" }[status] || status;
  return `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${map[status] || "bg-slate-100"}">${esc(label)}</span>`;
}

// ================= bookings (cancel / restore / delete) =================
const CANCEL_REASONS = ["Test entry", "Patient cancelled", "Duplicate booking", "Patient not reachable", "Service not available", "Other"];
let bkStatus = "active";   // active | completed | cancelled | test | all
let bkSearch = "";
let cancelId = null, cancelReason = "";

function bookingGroups() {
  const from = rangeStartMs(payRange);
  const inRange = tasks.filter(t => (t.createdAtMs || 0) >= from);
  // Open visits older than the window still need attention, so always include them.
  const ids = new Set(inRange.map(t => t.id));
  openTasks.forEach(t => { if (!ids.has(t.id)) inRange.push(t); });
  return {
    active: inRange.filter(t => ["pending", "assigned", "in_progress"].includes(t.status)),
    completed: inRange.filter(t => t.status === "completed"),
    cancelled: inRange.filter(t => t.status === "cancelled" && t.cancelReason !== "Test entry"),
    test: inRange.filter(t => t.status === "cancelled" && t.cancelReason === "Test entry"),
    all: inRange
  };
}

function renderBookings() {
  const g = bookingGroups();
  const q = bkSearch.toLowerCase();
  const list = (g[bkStatus] || g.all)
    .filter(t => !q || [t.patientName, t.phone, t.serviceName, t.bookingNo].join(" ").toLowerCase().includes(q))
    .sort((a, b) => (b.createdAtMs || 0) - (a.createdAtMs || 0));
  const chip = (k, label) => `<button data-bk="${k}" class="px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap ${bkStatus === k ? "bg-sky-900 text-white" : "bg-white border border-slate-200"}">${label} (${g[k].length})</button>`;
  const opt = (v, label) => `<option value="${v}" ${v === payRange ? "selected" : ""}>${label}</option>`;
  $("tab-bookings").innerHTML = `
    <div class="card p-3 flex flex-wrap gap-2 items-center">
      <div class="flex gap-1.5 overflow-x-auto">${chip("active", "Active")}${chip("completed", "Completed")}${chip("cancelled", "Cancelled")}${chip("test", "Test")}${chip("all", "All")}</div>
      <select id="bk-range" class="border border-slate-300 rounded-lg px-2 py-1.5 text-sm bg-white">${opt("1", "Today")}${opt("7", "Last 7 days")}${opt("30", "Last 30 days")}${opt("month", "This month")}${opt("all", "All time")}</select>
      <input id="bk-search" value="${esc(bkSearch)}" placeholder="Search name, phone, booking no." class="border border-slate-300 rounded-xl px-3 py-1.5 text-sm flex-1 min-w-[180px]">
      ${bkStatus === "test" && g.test.length ? `<button id="bk-del-tests" class="px-3 py-2 text-xs font-bold bg-rose-600 text-white rounded-xl"><i class="fa-solid fa-trash mr-1"></i>Delete all test (${g.test.length})</button>` : ""}
    </div>
    <div class="card mt-3 overflow-x-auto">
      <table class="w-full text-sm">
        <thead><tr class="text-left text-[11px] uppercase text-slate-500 bg-slate-50"><th class="p-2">Booked</th><th class="p-2">Patient</th><th class="p-2">Service</th><th class="p-2">Status</th><th class="p-2">Payment</th><th class="p-2 text-right">Actions</th></tr></thead>
        <tbody>${list.map(t => {
          const cancelled = t.status === "cancelled";
          const info = cancelled
            ? `<div class="text-[10px] text-rose-700 mt-0.5">${esc(t.cancelReason || "")}${t.cancelNote ? " - " + esc(t.cancelNote) : ""}</div><div class="text-[10px] text-slate-400">${t.cancelledBy === "patient" ? "by patient" : "by " + esc(t.cancelledByName || "admin")} • ${fmtDate(t.cancelledAtMs)}</div>`
            : (t.assignedToName ? `<div class="text-[10px] text-slate-500 mt-0.5">${esc(t.assignedToName)}</div>` : "");
          const actions = cancelled
            ? `<button data-bk-restore="${esc(t.id)}" class="px-2 py-1 text-[11px] font-bold bg-sky-50 text-sky-800 border border-sky-200 rounded-lg">Restore</button>
               <button data-bk-delete="${esc(t.id)}" class="px-2 py-1 text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200 rounded-lg">Delete</button>`
            : `<button data-bk-cancel="${esc(t.id)}" class="px-2 py-1 text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200 rounded-lg"><i class="fa-solid fa-ban mr-1"></i>Cancel</button>`;
          return `<tr class="border-t border-slate-100 align-top ${cancelled ? "bg-rose-50/30" : ""}">
            <td class="p-2 text-xs text-slate-500 whitespace-nowrap">${fmtDate(t.createdAtMs)}${t.bookingNo ? `<div class="text-[10px]">#${esc(t.bookingNo)}</div>` : ""}</td>
            <td class="p-2"><div class="font-semibold">${esc(t.patientName)}</div><div class="text-[11px] text-slate-500">${esc(t.phone)} • ${esc(t.source || "")}</div></td>
            <td class="p-2 text-xs">${esc(t.serviceName)}${t.fee ? `<div class="text-[11px] font-bold">${inr(t.fee)}</div>` : ""}</td>
            <td class="p-2 text-xs">${badge(t.status)}${info}</td>
            <td class="p-2 text-xs">${payBadge(t)}</td>
            <td class="p-2 text-right whitespace-nowrap space-x-1">${actions}</td>
          </tr>`;
        }).join("") || '<tr><td colspan="6" class="p-6 text-center text-slate-400">No bookings here.</td></tr>'}</tbody>
      </table>
    </div>
    <p class="text-[11px] text-slate-500 mt-2">Cancel test entries with reason <strong>Test entry</strong>, then delete them from the Test filter. Patients can also cancel from the patient app until the visit is done; those show "by patient".</p>`;

  const tab = $("tab-bookings");
  tab.querySelectorAll("[data-bk]").forEach(b => { b.onclick = () => { bkStatus = b.dataset.bk; renderBookings(); }; });
  $("bk-range").onchange = async e => { payRange = e.target.value; await loadTasks(); renderBookings(); renderPayments(); renderOverview(); };
  $("bk-search").oninput = e => { bkSearch = e.target.value; const pos = e.target.selectionStart; renderBookings(); const el = $("bk-search"); el.focus(); el.setSelectionRange(pos, pos); };
  if ($("bk-del-tests")) $("bk-del-tests").onclick = () => deleteBookings(g.test);
  tab.querySelectorAll("[data-bk-cancel]").forEach(b => { b.onclick = () => openCancel(b.dataset.bkCancel); });
  tab.querySelectorAll("[data-bk-restore]").forEach(b => { b.onclick = () => restoreBooking(b.dataset.bkRestore); });
  tab.querySelectorAll("[data-bk-delete]").forEach(b => { b.onclick = () => { const t = findTask(b.dataset.bkDelete); if (t) deleteBookings([t]); }; });
}

function findTask(id) { return tasks.find(t => t.id === id) || openTasks.find(t => t.id === id); }

function afterTaskChange() {
  renderBookings();
  renderOverview();
  renderPayments();
}

function openCancel(id) {
  const t = findTask(id);
  if (!t) return;
  cancelId = id; cancelReason = "";
  $("cancel-sub").textContent = t.patientName + " • " + t.serviceName + (t.bookingNo ? " • #" + t.bookingNo : "");
  $("cancel-note").value = "";
  const warn = [];
  if (t.status === "completed") warn.push("This visit is already completed; its billing will be removed from the totals.");
  if (t.paymentStatus === "paid" || t.paymentStatus === "claimed") warn.push("A payment is recorded (" + inr(t.amountCollected || t.fee) + "). Refund it separately if needed.");
  if (t.assignedToName && t.status !== "completed") warn.push(t.assignedToName + " is assigned. Inform them; the visit leaves their app.");
  $("cancel-warn").innerHTML = warn.map(w => "<div>" + esc(w) + "</div>").join("");
  $("cancel-warn").classList.toggle("hidden", !warn.length);
  drawCancelReasons();
  $("cancel-modal").classList.remove("hidden");
  $("cancel-modal").classList.add("flex");
}

function drawCancelReasons() {
  $("cancel-reasons").innerHTML = CANCEL_REASONS.map(r => `<button type="button" data-reason="${esc(r)}" class="p-2 rounded-xl border text-xs font-bold text-left ${r === cancelReason ? "border-rose-500 bg-rose-50 text-rose-800" : "border-slate-200"}">${esc(r)}</button>`).join("");
  document.querySelectorAll("[data-reason]").forEach(b => { b.onclick = () => { cancelReason = b.dataset.reason; drawCancelReasons(); }; });
}

function closeCancel() {
  $("cancel-modal").classList.add("hidden");
  $("cancel-modal").classList.remove("flex");
  cancelId = null;
}
$("cancel-close").onclick = closeCancel;

$("cancel-confirm").onclick = async () => {
  const t = findTask(cancelId);
  if (!t) return;
  if (!cancelReason) { toast("Choose a reason."); return; }
  const fields = {
    status: "cancelled", statusBeforeCancel: t.status || "pending",
    cancelReason, cancelNote: $("cancel-note").value.trim().slice(0, 300),
    cancelledBy: "admin", cancelledByName: auth.currentUser.email, cancelledAtMs: Date.now()
  };
  try {
    await db.collection("tasks").doc(t.id).update(fields);
    Object.assign(t, fields);
    openTasks = openTasks.filter(x => x.id !== t.id);
    if (!tasks.includes(t)) tasks.push(t);
    closeCancel();
    afterTaskChange();
    toast("Booking cancelled (" + cancelReason + ").");
  } catch (e) { toast("Could not cancel: " + (e.code || e.message)); }
};

async function restoreBooking(id) {
  const t = findTask(id);
  if (!t || !confirm("Restore this booking for " + t.patientName + "?")) return;
  const back = t.statusBeforeCancel && t.statusBeforeCancel !== "cancelled" ? t.statusBeforeCancel : (t.assignedTo ? "in_progress" : "pending");
  const del = firebase.firestore.FieldValue.delete();
  try {
    await db.collection("tasks").doc(id).update({
      status: back, statusBeforeCancel: del, cancelReason: del, cancelNote: del,
      cancelledBy: del, cancelledByName: del, cancelledAtMs: del, restoredAtMs: Date.now()
    });
    ["statusBeforeCancel", "cancelReason", "cancelNote", "cancelledBy", "cancelledByName", "cancelledAtMs"].forEach(k => delete t[k]);
    t.status = back;
    if (back !== "completed") openTasks.push(t);
    afterTaskChange();
    toast("Booking restored.");
  } catch (e) { toast("Could not restore: " + (e.code || e.message)); }
}

async function deleteBookings(list) {
  if (!list.length) return;
  const what = list.length === 1 ? list[0].patientName + " • " + list[0].serviceName : list.length + " bookings";
  if (!confirm("Delete " + what + " permanently?\nThis cannot be undone.")) return;
  let ok = 0;
  for (const t of list) {
    try { await db.collection("tasks").doc(t.id).delete(); ok++; } catch (e) {}
  }
  const gone = new Set(list.map(t => t.id));
  tasks = tasks.filter(t => !gone.has(t.id));
  openTasks = openTasks.filter(t => !gone.has(t.id));
  afterTaskChange();
  toast(ok + " booking" + (ok === 1 ? "" : "s") + " deleted.");
}

// ================= payments =================
function filteredPayments() {
  const from = rangeStartMs(payRange);
  return tasks.filter(t => {
    if (!isLive(t)) return false;
    if ((t.createdAtMs || 0) < from) return false;
    if (payStatus !== "all" && (t.paymentStatus || "unpaid") !== payStatus) return false;
    if (payMode !== "all" && (t.paymentMode || "") !== payMode) return false;
    if (payStaff !== "all" && (t.completedBy || t.assignedTo || "") !== payStaff) return false;
    return true;
  });
}

function renderPayments() {
  const list = filteredPayments();
  const paid = list.filter(t => t.paymentStatus === "paid");
  const claimed = list.filter(t => t.paymentStatus === "claimed");
  const unpaid = list.filter(t => !t.paymentStatus || t.paymentStatus === "unpaid");
  const sum = l => l.reduce((s, t) => s + amountOf(t), 0);
  const modes = {};
  paid.forEach(t => { const m = t.paymentMode || "Cash"; modes[m] = (modes[m] || 0) + amountOf(t); });
  const modes2 = [...new Set(tasks.map(t => t.paymentMode).filter(Boolean))];
  const opt = (v, cur, label) => `<option value="${esc(v)}" ${v === cur ? "selected" : ""}>${esc(label)}</option>`;

  $("tab-payments").innerHTML = `
    <div class="card p-3 flex flex-wrap gap-2 items-end">
      <label class="text-[11px] font-bold text-slate-500">Period<br><select id="f-range" class="border border-slate-300 rounded-lg px-2 py-1.5 text-sm bg-white">
        ${opt("1", payRange, "Today")}${opt("7", payRange, "Last 7 days")}${opt("30", payRange, "Last 30 days")}${opt("month", payRange, "This month")}${opt("all", payRange, "All time")}</select></label>
      <label class="text-[11px] font-bold text-slate-500">Status<br><select id="f-status" class="border border-slate-300 rounded-lg px-2 py-1.5 text-sm bg-white">
        ${opt("all", payStatus, "All")}${opt("paid", payStatus, "Received")}${opt("claimed", payStatus, "Online - to verify")}${opt("unpaid", payStatus, "Not paid yet")}</select></label>
      <label class="text-[11px] font-bold text-slate-500">Mode<br><select id="f-mode" class="border border-slate-300 rounded-lg px-2 py-1.5 text-sm bg-white">
        ${opt("all", payMode, "All")}${modes2.map(m => opt(m, payMode, m)).join("")}</select></label>
      <label class="text-[11px] font-bold text-slate-500">Staff<br><select id="f-staff" class="border border-slate-300 rounded-lg px-2 py-1.5 text-sm bg-white">
        ${opt("all", payStaff, "All")}${staff.map(s => opt(s.id, payStaff, s.name)).join("")}</select></label>
      <button id="pay-csv" class="ml-auto px-3 py-2 text-xs font-bold bg-white border border-slate-300 rounded-xl hover:bg-slate-50"><i class="fa-solid fa-file-csv mr-1"></i>Export CSV</button>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
      <div class="card p-4"><div class="text-[11px] font-bold uppercase text-slate-400">Received</div><div class="text-2xl font-black text-emerald-600">${inr(sum(paid))}</div><div class="text-[11px] text-slate-500">${paid.length} visits</div></div>
      <div class="card p-4"><div class="text-[11px] font-bold uppercase text-slate-400">Online - verify</div><div class="text-2xl font-black text-sky-700">${inr(sum(claimed))}</div><div class="text-[11px] text-slate-500">${claimed.length} payments</div></div>
      <div class="card p-4"><div class="text-[11px] font-bold uppercase text-slate-400">Not paid yet</div><div class="text-2xl font-black text-amber-600">${inr(sum(unpaid))}</div><div class="text-[11px] text-slate-500">${unpaid.length} visits</div></div>
      <div class="card p-4"><div class="text-[11px] font-bold uppercase text-slate-400">By mode (received)</div><div class="text-xs mt-1 space-y-0.5">${Object.keys(modes).map(m => `<div class="flex justify-between"><span>${esc(m)}</span><strong>${inr(modes[m])}</strong></div>`).join("") || '<span class="text-slate-400">-</span>'}</div></div>
    </div>

    <div class="card mt-3 overflow-x-auto">
      <table class="w-full text-sm">
        <thead><tr class="text-left text-[11px] uppercase text-slate-500 bg-slate-50"><th class="p-2">Date</th><th class="p-2">Patient</th><th class="p-2">Service</th><th class="p-2">Amount</th><th class="p-2">Payment</th><th class="p-2">Staff</th><th class="p-2"></th></tr></thead>
        <tbody>${list.map(t => `
          <tr class="border-t border-slate-100 align-top">
            <td class="p-2 text-xs text-slate-500 whitespace-nowrap">${fmtDate(t.createdAtMs)}</td>
            <td class="p-2"><div class="font-semibold">${esc(t.patientName)}</div><div class="text-[11px] text-slate-500">${esc(t.phone)}</div></td>
            <td class="p-2 text-xs">${esc(t.serviceName)}<div class="mt-0.5">${badge(t.status)}</div></td>
            <td class="p-2 font-bold whitespace-nowrap">${t.fee || t.amountCollected ? inr(amountOf(t)) : '<span class="text-slate-400">to confirm</span>'}</td>
            <td class="p-2 text-xs">${payBadge(t)}${t.paymentRef || t.paymentTxnRef ? `<div class="text-[10px] text-slate-500 break-all">${esc(t.paymentRef || t.paymentTxnRef)}</div>` : ""}</td>
            <td class="p-2 text-xs">${esc(t.completedByName || t.assignedToName || "-")}</td>
            <td class="p-2">${t.paymentStatus === "claimed" ? `<button data-verify="${esc(t.id)}" class="px-2 py-1 text-[11px] font-bold bg-sky-600 text-white rounded-lg">Mark received</button>` : ""}</td>
          </tr>`).join("") || '<tr><td colspan="7" class="p-6 text-center text-slate-400">No payments match these filters.</td></tr>'}
        </tbody>
      </table>
    </div>
    <p class="text-[11px] text-slate-500 mt-2">"Online - to verify": the patient paid through the website/app (Razorpay or UPI). Check the payment id in your Razorpay dashboard, then tap <strong>Mark received</strong>.</p>`;

  $("f-range").onchange = async e => { payRange = e.target.value; await loadTasks(); renderPayments(); renderOverview(); renderBookings(); };
  $("f-status").onchange = e => { payStatus = e.target.value; renderPayments(); };
  $("f-mode").onchange = e => { payMode = e.target.value; renderPayments(); };
  $("f-staff").onchange = e => { payStaff = e.target.value; renderPayments(); };
  $("pay-csv").onclick = exportPaymentsCsv;
  document.querySelectorAll("[data-verify]").forEach(b => { b.onclick = () => verifyPayment(b.dataset.verify); });
}

function payBadge(t) {
  if (t.paymentStatus === "paid") return `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Received</span> <span class="text-[10px] text-slate-500">${esc(t.paymentMode || "Cash")}</span>`;
  if (t.paymentStatus === "claimed") return `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800">Verify</span> <span class="text-[10px] text-slate-500">${esc(t.paymentMode || "Online")}</span>`;
  return `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">Not paid</span>`;
}

async function verifyPayment(id) {
  const t = tasks.find(x => x.id === id);
  if (!t) return;
  if (!confirm("Confirm you have seen payment " + (t.paymentRef || "") + " (" + inr(t.fee) + ") in Razorpay / your UPI app?")) return;
  try {
    await db.collection("tasks").doc(id).update({
      paymentStatus: "paid", amountCollected: Number(t.fee || 0),
      verifiedBy: auth.currentUser.email, verifiedAtMs: Date.now()
    });
    Object.assign(t, { paymentStatus: "paid", amountCollected: Number(t.fee || 0) });
    renderPayments();
    renderOverview();
    toast("Marked as received.");
  } catch (e) { toast("Could not update: " + (e.code || e.message)); }
}

function exportPaymentsCsv() {
  const rows = [["Date", "Booking", "Patient", "Phone", "Service", "Amount", "Payment status", "Mode", "Reference", "Staff", "Visit status"]];
  filteredPayments().forEach(t => rows.push([
    t.createdAtMs ? new Date(t.createdAtMs).toISOString() : "", t.bookingNo || "", t.patientName || "", t.phone || "", t.serviceName || "",
    amountOf(t), t.paymentStatus || "unpaid", t.paymentMode || "", t.paymentRef || t.paymentTxnRef || "", t.completedByName || t.assignedToName || "", t.status || ""
  ]));
  const csv = rows.map(r => r.map(c => '"' + String(c).replace(/"/g, '""') + '"').join(",")).join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
  a.download = "srinika-payments-" + new Date().toISOString().slice(0, 10) + ".csv";
  a.click();
}

// ================= prices =================
let priceFilter = "";

function renderPrices() {
  const groups = {};
  PRICE_LINES.forEach(l => { (groups[l.group] = groups[l.group] || []).push(l); });
  const changedCount = PRICE_LINES.filter(l => prices[l.key] != null && prices[l.key] !== l.price).length;
  const q = priceFilter.toLowerCase();
  $("tab-prices").innerHTML = `
    <div class="card p-4 space-y-1">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 class="font-extrabold">Service prices</h2>
          <p class="text-xs text-slate-500">Change a price and press <strong>Save prices</strong>. It updates the website, the booking form, the online-consultation payment amount and the patient app (within ~2 minutes).</p>
        </div>
        <div class="flex gap-2">
          <input id="price-search" placeholder="Search service..." value="${esc(priceFilter)}" class="border border-slate-300 rounded-xl px-3 py-2 text-sm w-44">
          <button id="price-save" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold"><i class="fa-solid fa-floppy-disk mr-1"></i>Save prices</button>
        </div>
      </div>
      <p class="text-[11px] ${changedCount ? "text-amber-700" : "text-slate-400"}">${changedCount} price${changedCount === 1 ? "" : "s"} different from the built-in default. ${pricesMeta && pricesMeta.updatedAtMs ? "Last saved " + fmtDate(pricesMeta.updatedAtMs) + " by " + esc(pricesMeta.updatedBy || "") : ""}</p>
    </div>
    ${Object.keys(groups).map(g => {
      const rows = groups[g].filter(l => !q || (l.label + " " + g).toLowerCase().includes(q));
      if (!rows.length) return "";
      return `<div class="card mt-3 overflow-hidden"><div class="px-4 py-2.5 bg-slate-50 font-extrabold text-sm">${esc(g)}</div>
        ${rows.map(l => {
          const cur = prices[l.key] != null ? prices[l.key] : l.price;
          const changed = cur !== l.price;
          return `<div class="px-4 py-2 border-t border-slate-100 flex items-center gap-3">
            <div class="flex-1 min-w-0"><div class="text-sm font-semibold">${esc(l.label)}</div><div class="text-[11px] text-slate-400">built-in ${inr(l.price)} ${esc(l.unit)}</div></div>
            <div class="flex items-center gap-1"><span class="text-slate-500 font-bold">₹</span>
              <input type="number" min="1" max="1000000" step="1" inputmode="numeric" data-price="${esc(l.key)}" value="${cur}" class="w-28 border rounded-lg px-2 py-1.5 text-sm font-bold text-right ${changed ? "changed" : "border-slate-300"}"></div>
            <button data-reset="${esc(l.key)}" title="Back to built-in price" class="w-8 h-8 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 ${changed ? "" : "invisible"}"><i class="fa-solid fa-rotate-left"></i></button>
          </div>`;
        }).join("")}</div>`;
    }).join("")}`;

  $("price-search").oninput = e => { priceFilter = e.target.value; const pos = e.target.selectionStart; renderPrices(); const el = $("price-search"); el.focus(); el.setSelectionRange(pos, pos); };
  $("price-save").onclick = savePrices;
  document.querySelectorAll("[data-price]").forEach(inp => {
    inp.onchange = () => {
      const key = inp.dataset.price;
      const n = Number(inp.value);
      const line = PRICE_LINES.find(l => l.key === key);
      if (!Number.isInteger(n) || n < 1 || n > 1000000) { toast("Enter a whole number between 1 and 10,00,000."); inp.value = prices[key] != null ? prices[key] : line.price; return; }
      if (n === line.price) delete prices[key]; else prices[key] = n;
      renderPrices();
    };
  });
  document.querySelectorAll("[data-reset]").forEach(b => { b.onclick = () => { delete prices[b.dataset.reset]; renderPrices(); }; });
}

async function savePrices() {
  const clean = {};
  PRICE_LINES.forEach(l => { const n = prices[l.key]; if (Number.isInteger(n) && n !== l.price && n >= 1 && n <= 1000000) clean[l.key] = n; });
  try {
    await db.collection("config").doc("prices").set({ prices: clean, updatedAtMs: Date.now(), updatedBy: auth.currentUser.email });
    prices = clean;
    await loadPrices();
    renderPrices();
    renderOverview();
    toast("Prices saved. Live on the website and app within ~2 minutes.");
  } catch (e) { toast("Could not save: " + (e.code || e.message)); }
}

// ================= staff =================
// Same lists as the Partner app (android-partner/www/data.js). admin: true = full Owner Dashboard.
const STAFF_ROLES = {
  doctor: { label: "Doctor", admin: false },
  nurse: { label: "Nurse", admin: false },
  physio: { label: "Physiotherapist", admin: false },
  attendant: { label: "Attendant", admin: false },
  owner: { label: "Owner", admin: true },
  management: { label: "Management", admin: true },
  admin: { label: "Admin", admin: true }
};
const QUALIFICATIONS = [
  "MBBS", "MBBS, MD (Medicine)", "MBBS, MS", "MBBS (Gynaecologist)", "MBBS (Neurologist)", "MBBS (Neuro Surgeon)",
  "BAMS", "BHMS", "BUMS", "BEMS", "BNYS",
  "BPT / MPT (Physiotherapy)", "GNM / B.Sc Nursing", "ANM", "Trained Patient Care Assistant"
];
const roleLabel = role => (STAFF_ROLES[role] || {}).label || role || "Staff";
const isAdminRole = role => !!(STAFF_ROLES[role] && STAFF_ROLES[role].admin);

function fillQualification(current) {
  const sel = $("sf-qualification"), txt = $("sf-designation");
  sel.innerHTML = '<option value="">Select qualification</option>' +
    QUALIFICATIONS.map(q => `<option value="${esc(q)}">${esc(q)}</option>`).join("") +
    '<option value="__other">Other (type below)</option>';
  sel.value = !current ? "" : (QUALIFICATIONS.includes(current) ? current : "__other");
  txt.value = current || "";
  txt.classList.toggle("hidden", sel.value !== "__other");
}
$("sf-qualification").onchange = () => {
  const sel = $("sf-qualification"), txt = $("sf-designation");
  if (sel.value === "__other") { txt.value = ""; txt.classList.remove("hidden"); txt.focus(); }
  else { txt.value = sel.value; txt.classList.add("hidden"); }
};
const updateRoleHint = () => $("sf-role-hint").classList.toggle("hidden", !isAdminRole($("sf-role").value));
$("sf-role").onchange = updateRoleHint;

function renderStaff() {
  const rows = staff.map(s => {
    const inactive = s.status === "inactive";
    const open = openTasks.filter(t => t.assignedTo === s.id).length;
    const done = tasks.filter(t => t.assignedTo === s.id && t.status === "completed").length;
    const isOwner = (s.email || "").toLowerCase() === OWNER_EMAIL || s.id === "dr-piyush-saxena";
    return `<div class="card p-3 flex flex-wrap items-center gap-3 ${inactive ? "opacity-60" : ""}">
      <div class="flex-1 min-w-[200px]">
        <div class="font-bold">${esc(s.name)} <span class="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">${esc(s.roleBadge || roleLabel(s.role))}</span>${isAdminRole(s.role) ? ' <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">FULL ACCESS</span>' : ""} ${inactive ? '<span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-700">DEACTIVATED</span>' : ""}</div>
        <div class="text-[11px] text-slate-500">${esc(s.designation || "")}</div>
        <div class="text-xs mt-0.5">${s.email ? '<i class="fa-brands fa-google text-sky-500 mr-1"></i>' + esc(s.email) : '<span class="text-amber-600 font-bold">No Google email - cannot sign in yet</span>'} &nbsp;•&nbsp; ${esc(s.phone || "")}</div>
        <div class="text-[11px] text-slate-500 mt-0.5">Open visits: <strong>${open}</strong> &nbsp; Completed (30 days): <strong>${done}</strong></div>
      </div>
      <div class="flex flex-wrap gap-1.5">
        <button data-edit="${esc(s.id)}" class="px-3 py-1.5 text-xs font-bold bg-sky-50 text-sky-800 border border-sky-200 rounded-lg"><i class="fa-solid fa-pen mr-1"></i>Edit</button>
        <button data-idcard="${esc(s.id)}" class="px-3 py-1.5 text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200 rounded-lg"><i class="fa-solid fa-id-badge mr-1"></i>ID card</button>
        ${isOwner ? "" : `
          <button data-toggle="${esc(s.id)}" class="px-3 py-1.5 text-xs font-bold ${inactive ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-amber-50 text-amber-800 border-amber-200"} border rounded-lg">${inactive ? '<i class="fa-solid fa-user-check mr-1"></i>Activate' : '<i class="fa-solid fa-user-slash mr-1"></i>Deactivate'}</button>
          <button data-staff-delete="${esc(s.id)}" class="px-3 py-1.5 text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 rounded-lg"><i class="fa-solid fa-trash mr-1"></i>Delete</button>`}
      </div>
    </div>`;
  }).join("");
  $("tab-staff").innerHTML = `
    <div class="flex items-center justify-between mb-3">
      <div><h2 class="font-extrabold">Team</h2><p class="text-xs text-slate-500">Staff sign in to the Partner app with the Google account saved here. <strong>Deactivate</strong> blocks login immediately but keeps their visit history.</p></div>
      <button id="staff-add" class="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-xl text-sm font-bold"><i class="fa-solid fa-user-plus mr-1"></i>Add staff</button>
    </div>
    <div class="space-y-2">${rows || '<div class="card p-6 text-center text-slate-400 text-sm">No staff yet. Open the Partner app once as the owner to load the default team, or add staff here.</div>'}</div>`;
  $("staff-add").onclick = () => openStaffModal(null);
  const tab = $("tab-staff");
  tab.querySelectorAll("[data-edit]").forEach(b => { b.onclick = () => openStaffModal(staff.find(s => s.id === b.dataset.edit)); });
  tab.querySelectorAll("[data-idcard]").forEach(b => { b.onclick = () => openIdCard(b.dataset.idcard); });
  tab.querySelectorAll("[data-toggle]").forEach(b => { b.onclick = () => toggleStaff(b.dataset.toggle); });
  tab.querySelectorAll("[data-staff-delete]").forEach(b => { b.onclick = () => deleteStaff(b.dataset.staffDelete); });
}

function openStaffModal(member) {
  $("staff-modal-title").textContent = member ? "Edit staff" : "Add staff";
  $("sf-id").value = member ? member.id : "";
  $("sf-name").value = member ? member.name : "";
  $("sf-email").value = member ? member.email || "" : "";
  $("sf-role").value = member ? member.role : "doctor";
  $("sf-phone").value = member ? member.phone || "" : "";
  fillQualification(member ? member.designation || "" : "");
  $("sf-specialty").value = member ? member.specialty || "" : "";
  $("sf-regno").value = member ? member.regNo || "" : "";
  $("sf-empid").value = member ? member.empId || "" : nextEmpId();
  $("sf-blood").value = member ? member.bloodGroup || "" : "";
  updateRoleHint();
  $("staff-modal").classList.remove("hidden");
  $("staff-modal").classList.add("flex");
}
function closeStaffModal() { $("staff-modal").classList.add("hidden"); $("staff-modal").classList.remove("flex"); }
$("staff-modal-close").onclick = closeStaffModal;

$("staff-form").onsubmit = async e => {
  e.preventDefault();
  const id = $("sf-id").value;
  const existing = id ? staff.find(s => s.id === id) : null;
  const email = $("sf-email").value.trim().toLowerCase();
  const clash = email && staff.find(s => (s.email || "").toLowerCase() === email && s.id !== id);
  if (clash) { toast("That email already belongs to " + clash.name); return; }
  const role = $("sf-role").value;
  const admin = isAdminRole(role);
  const member = {
    ...(existing || {}),
    id: existing ? existing.id : "staff-" + Date.now(),
    name: $("sf-name").value.trim(), email, role,
    roleBadge: roleLabel(role),
    phone: $("sf-phone").value.trim(),
    designation: $("sf-designation").value.trim() || (role === "doctor" ? "Consulting Physician" : (admin ? roleLabel(role) : "Certified Healthcare Staff")),
    specialty: $("sf-specialty").value.trim() || (admin ? "Operations & Administration" : "Doorstep Clinical Care"),
    regNo: $("sf-regno").value.trim(),
    empId: $("sf-empid").value.trim(),
    bloodGroup: $("sf-blood").value,
    status: existing ? (existing.status || "active") : "active",
    avatarBg: (existing && existing.role === role && existing.avatarBg) ||
      (admin ? "bg-amber-600 text-white" : (role === "doctor" ? "bg-sky-600 text-white" : "bg-teal-600 text-white"))
  };
  try {
    await saveStaff(member, existing ? existing.email : "");
    closeStaffModal();
    await loadStaff();
    renderStaff();
    toast(email ? "Saved. They can sign in with " + email : "Saved. Add their Google email so they can sign in.");
  } catch (err) { toast("Could not save: " + (err.code || err.message)); }
};

// Same two documents the Partner app writes: staff/{id} (directory) + staffAuth/{email} (login permission)
async function saveStaff(member, previousEmail) {
  const email = (member.email || "").toLowerCase().trim();
  const prev = (previousEmail || "").toLowerCase().trim();
  const data = { ...member, email };
  delete data.id;
  await db.collection("staff").doc(member.id).set(data, { merge: true });
  if (prev && prev !== email) await db.collection("staffAuth").doc(prev).delete().catch(() => {});
  if (email && email !== OWNER_EMAIL) {
    await db.collection("staffAuth").doc(email).set({
      staffId: member.id, name: member.name, role: member.role,
      designation: member.designation || "", regNo: member.regNo || "",
      phone: member.phone || "", specialty: member.specialty || "",
      active: member.status !== "inactive"
    });
  }
}

async function toggleStaff(id) {
  const s = staff.find(x => x.id === id);
  if (!s) return;
  const deactivate = s.status !== "inactive";
  if (deactivate && !confirm("Deactivate " + s.name + "? They will be signed out of the Partner app and cannot log in. Their history stays.")) return;
  try {
    s.status = deactivate ? "inactive" : "active";
    await saveStaff(s, s.email);
    renderStaff();
    toast(s.name + (deactivate ? " deactivated." : " activated."));
  } catch (e) { toast("Could not update: " + (e.code || e.message)); }
}

async function deleteStaff(id) {
  const s = staff.find(x => x.id === id);
  if (!s) return;
  const open = openTasks.filter(t => t.assignedTo === id).length;
  if (open) { alert(s.name + " still has " + open + " open visit(s). Reassign them in the Partner app first, or deactivate instead."); return; }
  if (!confirm("Permanently delete " + s.name + "? Past visits and prescriptions stay on record. (Use Deactivate if they may return.)")) return;
  try {
    if (s.email) await db.collection("staffAuth").doc(s.email.toLowerCase()).delete().catch(() => {});
    await db.collection("staff").doc(id).delete();
    await loadStaff();
    renderStaff();
    toast(s.name + " deleted.");
  } catch (e) { toast("Could not delete: " + (e.code || e.message)); }
}

// ================= ID cards =================
// Printable staff ID card (front + back). Details come from the staff profile and can be edited here.
// Edits and the photo are saved in Firestore idCards/{staffId} (owner-only, see firestore.rules), so
// the card is the same on every device. Like rxUploads, the compressed photo is kept inside the doc
// because Cloud Storage is no longer free.
const ID_PREFIX = "SMS-";
const IDC_LAST_KEY = "srinika.idcards.last";   // last opened card, per browser
const IDC_OLD_KEY = "srinika.idcards.v1";      // earlier browser-only drafts, moved to Firestore once
const idPhotos = {};      // staffId -> photo data URL
let idCards = {};         // staffId|"_custom" -> { fields, photo } from Firestore
let idc = null;           // card being edited
let idcSaveTimer = null;

async function loadIdCards() {
  const snap = await db.collection("idCards").get();
  idCards = {};
  snap.docs.forEach(d => { idCards[d.id] = d.data(); });
  // One-time move of cards that were only kept in this browser before.
  let old = null;
  try { old = JSON.parse(localStorage.getItem(IDC_OLD_KEY)); } catch (e) {}
  if (old && old.cards) {
    for (const [key, card] of Object.entries(old.cards)) {
      if (idCards[key]) continue;
      idCards[key] = card;
      await writeIdCard(key).catch(() => {});
    }
    try { localStorage.removeItem(IDC_OLD_KEY); } catch (e) {}
  }
}
function writeIdCard(key) {
  const card = idCards[key];
  return db.collection("idCards").doc(key).set({ fields: card.fields, photo: card.photo || "", updatedAtMs: Date.now() });
}
function setIdcStatus(text, bad) {
  const el = $("idc-status");
  if (el) { el.textContent = text; el.className = "font-bold " + (bad ? "text-rose-600" : "text-emerald-700"); }
}
// Save the card being edited. Typing is batched (0.8 s) so Firestore is not written on every key.
function persistIdc(now) {
  const key = idc.staffId || "_custom";
  const { staffId, ...fields } = idc;
  idCards[key] = { fields, photo: idPhotos[key] || "" };
  try { localStorage.setItem(IDC_LAST_KEY, idc.staffId); } catch (e) {}
  setIdcStatus("Saving...");
  clearTimeout(idcSaveTimer);
  idcSaveTimer = setTimeout(() => {
    writeIdCard(key)
      .then(() => setIdcStatus("Saved"))
      .catch(e => setIdcStatus("Not saved: " + (e.code || e.message), true));
  }, now ? 0 : 800);
}
async function forgetIdc(key) {
  delete idCards[key];
  delete idPhotos[key];
  await db.collection("idCards").doc(key).delete();
}
// Shrink the photo (max 700 px tall so zooming in stays sharp, JPEG, ~100 KB) to stay well under
// the Firestore 1 MB doc limit.
function shrinkPhoto(dataUrl) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, 700 / img.height);
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * scale); c.height = Math.round(img.height * scale);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      resolve(c.toDataURL("image/jpeg", 0.82));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

function nextEmpId() {
  const ids = staff.map(s => s.empId).concat(Object.values(idCards).map(c => c.fields && c.fields.empId));
  const nums = ids.map(v => parseInt(String(v || "").replace(/\D/g, ""), 10)).filter(n => !isNaN(n));
  return ID_PREFIX + String((nums.length ? Math.max(...nums) : 0) + 1).padStart(4, "0");
}
const isoDay = d => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
const dmy = iso => iso ? iso.split("-").reverse().join("/") : "";

// Team members already shown on the website (/doctors/): their photo and qualification fill the card
// automatically. Keyed by staff id (same ids as the Partner app team), matched by name as a fallback.
const WEBSITE_TEAM = {
  "dr-piyush-saxena": { name: "Dr. Piyush Saxena", photo: "/assets/images/dr-piyush-saxena.jpg", role: "Founder", qual: "General & Surgical Care Lead" },
  "dr-harshit-nigam": { name: "Dr. Harshit Nigam", photo: "/assets/images/dr-harshit-nigam.jpg", role: "Doctor", qual: "MBBS, MD (Medicine)" },
  "dr-desh-deepak-singh": { name: "Dr. Desh Deepak Singh (P.T.)", photo: "/assets/images/dr-desh-deepak-singh.jpg", role: "Physiotherapist", qual: "B.P.T., M.P.T. (Neuro)" },
  "dr-akash-shrivastav": { name: "Dr. Akash Shrivastav", photo: "/assets/images/dr-akash.jpg", role: "Doctor", qual: "M.B.B.S." },
  "dr-reshmi-r": { name: "Dr. Reshmi R", photo: "/assets/images/dr-reshmi-r.jpg", role: "Doctor", qual: "M.B.B.S." }
};
const personKey = n => String(n || "").toLowerCase().replace(/\(.*?\)|\bdr\.?\s*|[^a-z]/g, "");
function websiteInfo(s) {
  if (!s) return null;
  return WEBSITE_TEAM[s.id] || Object.values(WEBSITE_TEAM).find(w => personKey(w.name) === personKey(s.name)) || null;
}

const DEFAULT_CROP = { x: 50, y: 30, z: 1 };
// Photo position on the card: x/y = which part of the photo is in view (0-100 %), z = zoom.
const cropStyle = c => {
  const { x, y, z } = { ...DEFAULT_CROP, ...(c || {}) };
  return `object-position:${x}% ${y}%;transform:scale(${z});transform-origin:${x}% ${y}%`;
};

function idcFromStaff(s) {
  const today = new Date(), valid = new Date(today);
  valid.setFullYear(valid.getFullYear() + 1);
  valid.setDate(valid.getDate() - 1);
  const key = s ? s.id : "_custom";
  const saved = idCards[key];
  const web = websiteInfo(s);
  idPhotos[key] = (saved && saved.photo) || (web && web.photo) || "";
  return {
    ...defaultIdc(s, web, today, valid),
    ...(saved ? saved.fields : {}),
    staffId: s ? s.id : ""
  };
}

// Card starts from the website details, then the staff profile. Card edits are saved only in
// idCards/{staffId} and never change the staff profile or the Staff list.
function defaultIdc(s, web, today, valid) {
  return {
    name: s ? s.name || "" : "",
    role: (web && web.role) || (s ? s.roleBadge || roleLabel(s.role) : ""),
    empId: s ? s.empId || "" : "",
    qual: (web && web.qual) || (s ? String(s.designation || "").split("•")[0].trim() : ""),
    blood: s ? s.bloodGroup || "" : "",
    phone: s ? s.phone || "" : "",
    issued: isoDay(today),
    valid: isoDay(valid),
    crop: { ...DEFAULT_CROP }
  };
}

function openIdCard(staffId) {
  idc = idcFromStaff(staff.find(s => s.id === staffId));
  renderIdCard();
  showTab("idcard");
}

function renderIdCard() {
  if (!idc) {
    let last = null;
    try { last = localStorage.getItem(IDC_LAST_KEY); } catch (e) {}
    idc = idcFromStaff(last === "" ? null : staff.find(s => s.id === last) || staff.find(s => s.status !== "inactive"));
  }
  const field = (k, label, extra = "") => `<label class="block text-xs font-bold text-slate-600">${label}
      <input data-idc="${k}" value="${esc(idc[k])}" ${extra} class="mt-1 w-full border border-slate-300 rounded-xl px-3 py-2 text-sm"></label>`;
  $("tab-idcard").innerHTML = `
    <div class="idc-head mb-3"><h2 class="font-extrabold">Staff ID cards</h2>
      <p class="text-xs text-slate-500">Pick a team member, add their photo, check the details and print. Print at <strong>100% / Actual size</strong> for a true card size (54 x 85.6 mm).</p></div>
    <div class="flex flex-wrap gap-5 items-start">
      <form id="idc-form" class="card p-4 space-y-2.5 w-full sm:w-80" onsubmit="return false">
        <label class="block text-xs font-bold text-slate-600">Staff member
          <select id="idc-staff" class="mt-1 w-full border border-slate-300 rounded-xl px-3 py-2 text-sm bg-white">
            <option value="">Someone else (type details)</option>
            ${staff.map(s => `<option value="${esc(s.id)}" ${s.id === idc.staffId ? "selected" : ""}>${esc(s.name)}${s.status === "inactive" ? " (deactivated)" : ""}</option>`).join("")}
          </select></label>
        <div>
          <div class="text-xs font-bold text-slate-600 mb-1">Photo</div>
          <div class="flex gap-2">
            <label class="flex-1 py-2 text-center text-xs font-bold bg-white border border-slate-300 rounded-xl hover:bg-slate-50 cursor-pointer"><i class="fa-solid fa-upload mr-1"></i>${idPhotos[idc.staffId || "_custom"] ? "Change" : "Upload"}
              <input id="idc-photo" type="file" accept="image/*" class="hidden"></label>
            <button type="button" id="idc-adjust" class="${idPhotos[idc.staffId || "_custom"] ? "" : "hidden "}flex-1 py-2 text-xs font-bold bg-white border border-slate-300 rounded-xl hover:bg-slate-50"><i class="fa-solid fa-crop-simple mr-1"></i>Crop / adjust</button>
          </div>
          ${websiteInfo(staff.find(s => s.id === idc.staffId)) ? '<p class="text-[11px] text-emerald-700 mt-1"><i class="fa-solid fa-globe mr-1"></i>Photo and qualification filled from the website.</p>' : ""}
        </div>
        ${field("name", "Full name")}
        ${field("role", "Designation (on badge)")}
        <div class="grid grid-cols-2 gap-2">${field("empId", "Employee ID", 'placeholder="' + esc(nextEmpId()) + '"')}${field("blood", "Blood group", 'placeholder="B+"')}</div>
        ${field("qual", "Qualification")}
        ${field("phone", "Mobile")}
        <div class="grid grid-cols-2 gap-2">${field("issued", "Issued", 'type="date"')}${field("valid", "Valid till", 'type="date"')}</div>
        <div class="grid grid-cols-2 gap-2 pt-1">
          <button type="button" id="idc-print-a4" class="py-2.5 bg-sky-700 hover:bg-sky-800 text-white rounded-xl text-xs font-bold"><i class="fa-solid fa-print mr-1"></i>Print (A4)</button>
          <button type="button" id="idc-print-cr80" class="py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold"><i class="fa-solid fa-id-card mr-1"></i>Card size PDF</button>
        </div>
        <p class="text-[11px] text-slate-500">A4 = front and back on one sheet to cut. Card size = 2 pages for a PVC card printer or print shop. In the print window choose <strong>Save as PDF</strong> to get a file.</p>
        <p class="text-[11px] text-slate-500"><i class="fa-solid fa-cloud text-sky-600 mr-1"></i>Card changes are saved for this card only (every device) and do not change the staff profile or Staff list. <span id="idc-status"></span> <button type="button" id="idc-reset" class="font-bold text-sky-700 underline">Reset card</button></p>
      </form>
      <div id="idc-sheet" class="flex flex-wrap gap-6 justify-center flex-1"></div>
    </div>`;

  $("idc-staff").onchange = e => {
    idc = idcFromStaff(staff.find(s => s.id === e.target.value));
    try { localStorage.setItem(IDC_LAST_KEY, idc.staffId); } catch (err) {}
    renderIdCard();
  };
  $("tab-idcard").querySelectorAll("[data-idc]").forEach(i => { i.oninput = () => { idc[i.dataset.idc] = i.value; persistIdc(); drawIdCard(); }; });
  $("idc-photo").onchange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const key = idc.staffId || "_custom";
    const r = new FileReader();
    r.onload = async () => {
      idPhotos[key] = await shrinkPhoto(r.result);
      idc.crop = { ...DEFAULT_CROP };
      persistIdc(true);
      renderIdCard();
      openCropper();
    };
    r.readAsDataURL(file);
  };
  $("idc-adjust").onclick = openCropper;
  $("idc-reset").onclick = async () => {
    if (!confirm("Clear the photo and card edits for " + (idc.name || "this card") + "?")) return;
    clearTimeout(idcSaveTimer);
    try { await forgetIdc(idc.staffId || "_custom"); } catch (e) { toast("Could not clear: " + (e.code || e.message)); return; }
    idc = idcFromStaff(staff.find(s => s.id === idc.staffId));
    renderIdCard();
  };
  $("idc-print-a4").onclick = () => printIdCard(false);
  $("idc-print-cr80").onclick = () => printIdCard(true);
  drawIdCard();
}

function drawIdCard() {
  const photo = idPhotos[idc.staffId || "_custom"];
  const logo = "/assets/images/logo.png";
  $("idc-sheet").innerHTML = `
    <div class="text-center"><div class="idc-cap text-[11px] font-bold tracking-widest text-slate-500 uppercase mb-2">Front</div>
      <div class="idc">
        <div class="hdr">
          <span class="ring" style="width:30mm;height:30mm;right:-12mm;top:-14mm"></span>
          <span class="ring" style="width:18mm;height:18mm;right:-4mm;top:-6mm"></span>
          <div class="brand">
            <div class="logo"><img src="${logo}" alt="Srinika Medisurge logo"></div>
            <div><div class="nm">SRINIKA<br>MEDISURGE</div><div class="sub">DOORSTEP HEALTHCARE SERVICES</div></div>
          </div>
        </div>
        <div class="photo">${photo ? `<img src="${esc(photo)}" alt="" style="${cropStyle(idc.crop)}">`
          : '<svg viewBox="0 0 24 24" fill="#315d99"><circle cx="12" cy="8" r="4.2"/><path d="M3.5 21c.8-4.4 4.3-7 8.5-7s7.7 2.6 8.5 7z"/></svg>'}</div>
        <div class="body">
          <div class="pname">${esc(idc.name || "Full Name")}</div>
          ${idc.role ? `<div class="role">${esc(idc.role)}</div>` : ""}
          <dl class="facts">
            <dt>Emp. ID</dt><dd>${esc(idc.empId || "-")}</dd>
            ${idc.qual ? `<dt>Qual.</dt><dd>${esc(idc.qual)}</dd>` : ""}
            <dt>Blood</dt><dd class="blood">${esc(idc.blood || "-")}</dd>
            <dt>Mobile</dt><dd>${esc(idc.phone || "-")}</dd>
          </dl>
        </div>
        <div class="stripe"></div>
        <div class="foot"><span>Valid till <b>${esc(dmy(idc.valid))}</b></span></div>
      </div></div>
    <div class="text-center"><div class="idc-cap text-[11px] font-bold tracking-widest text-slate-500 uppercase mb-2">Back</div>
      <div class="idc back">
        <img class="watermark" src="${logo}" alt="">
        <div class="top"><img src="${logo}" alt="">SRINIKA MEDISURGE</div>
        <div class="inner">
          <h3>Terms of use</h3>
          <ol>
            <li>This card is the property of Srinika Medisurge and is non-transferable.</li>
            <li>Must be worn visibly during all patient visits and on duty.</li>
            <li>Loss of card must be reported to the office immediately.</li>
            <li>Return the card on resignation or termination.</li>
          </ol>
          <div class="qrblock">
            <div class="qr" id="idc-qr"></div>
            <div class="qrtext"><b>Verify this staff</b>Scan or call<br>+91 96530 01359<br>24/7 Doorstep Service</div>
          </div>
          <div class="sign"><span>Issued: <b>${esc(dmy(idc.issued))}</b></span><span class="line">Authorised Signatory</span></div>
        </div>
        <div class="addr"><b>If found, please return to:</b><br>Kaushal Puri Rd, Khargapur, Gomti Nagar,<br>Lucknow, UP 226010 · srinikamedisurge.in</div>
      </div></div>`;
  if (window.QRCode) {
    new QRCode($("idc-qr"), {
      text: "https://srinikamedisurge.in/?staff=" + encodeURIComponent(idc.empId || ""),
      width: 256, height: 256, colorDark: "#1d3a66", colorLight: "#ffffff", correctLevel: QRCode.CorrectLevel.M
    });
  }
}

function printIdCard(cardSize) {
  $("idc-page").textContent = cardSize
    ? "@media print { @page { size: 54mm 85.6mm; margin: 0; } }"
    : "@media print { @page { size: A4; margin: 15mm; } }";
  document.body.classList.add("idc-print");
  document.body.classList.toggle("idc-cr80", cardSize);
  const done = () => { document.body.classList.remove("idc-print", "idc-cr80"); $("idc-page").textContent = ""; };
  window.addEventListener("afterprint", done, { once: true });
  // let the photo and QR image finish decoding before the print dialog snapshots the page
  setTimeout(() => window.print(), 150);
}

// Crop / adjust: drag the photo inside a frame shaped like the card photo, zoom with the slider.
// Only the position (idc.crop) is saved; the original photo is kept, so it can be re-adjusted any time.
function openCropper() {
  const src = idPhotos[idc.staffId || "_custom"];
  if (!src) return;
  const c = { ...DEFAULT_CROP, ...(idc.crop || {}) };
  const FW = 220, FH = 250;   // same 22:25 shape as the photo on the card
  const wrap = document.createElement("div");
  wrap.className = "fixed inset-0 z-[70] bg-black/60 flex items-center justify-center p-4";
  wrap.innerHTML = `
    <div class="bg-white rounded-2xl w-full max-w-sm p-5 space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="font-extrabold">Crop / adjust photo</h3>
        <button type="button" data-crop="cancel" class="w-8 h-8 rounded-full bg-slate-100"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <p class="text-[11px] text-slate-500">Drag the photo to move it. Use the slider to zoom in or out.</p>
      <div id="crop-frame" style="width:${FW}px;height:${FH}px;border-radius:14px;overflow:hidden;margin:0 auto;touch-action:none;cursor:grab;background:#e7eef6;box-shadow:0 0 0 3px #4a9599">
        <img id="crop-img" src="${src}" alt="" draggable="false" style="width:100%;height:100%;object-fit:cover;user-select:none;pointer-events:none">
      </div>
      <label class="flex items-center gap-2 text-xs font-bold text-slate-600"><i class="fa-solid fa-magnifying-glass-minus"></i>
        <input id="crop-zoom" type="range" min="1" max="3" step="0.01" value="${c.z}" class="flex-1 accent-teal-700">
        <i class="fa-solid fa-magnifying-glass-plus"></i></label>
      <div class="grid grid-cols-3 gap-2">
        <button type="button" data-crop="reset" class="py-2 text-xs font-bold bg-white border border-slate-300 rounded-xl">Reset</button>
        <button type="button" data-crop="cancel" class="py-2 text-xs font-bold bg-white border border-slate-300 rounded-xl">Cancel</button>
        <button type="button" data-crop="apply" class="py-2 text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white rounded-xl">Apply</button>
      </div>
    </div>`;
  document.body.appendChild(wrap);
  const img = wrap.querySelector("#crop-img"), frame = wrap.querySelector("#crop-frame"), zoom = wrap.querySelector("#crop-zoom");
  const show = () => { img.style.cssText = "width:100%;height:100%;object-fit:cover;user-select:none;pointer-events:none;" + cropStyle(c); zoom.value = c.z; };
  const clamp = v => Math.max(0, Math.min(100, v));
  // How many pixels the photo can travel per axis, so dragging follows the finger roughly 1:1.
  const travel = () => {
    const w = img.naturalWidth || FW, h = img.naturalHeight || FH, s = Math.max(FW / w, FH / h);
    return { x: Math.max(40, (w * s - FW) * c.z + FW * (c.z - 1)), y: Math.max(40, (h * s - FH) * c.z + FH * (c.z - 1)) };
  };
  let drag = null;
  frame.onpointerdown = e => { drag = { x: e.clientX, y: e.clientY }; frame.setPointerCapture(e.pointerId); frame.style.cursor = "grabbing"; };
  frame.onpointermove = e => {
    if (!drag) return;
    const t = travel();
    c.x = clamp(c.x - (e.clientX - drag.x) / t.x * 100);
    c.y = clamp(c.y - (e.clientY - drag.y) / t.y * 100);
    drag = { x: e.clientX, y: e.clientY };
    show();
  };
  frame.onpointerup = frame.onpointercancel = () => { drag = null; frame.style.cursor = "grab"; };
  frame.onwheel = e => { e.preventDefault(); c.z = Math.max(1, Math.min(3, c.z - e.deltaY / 500)); show(); };
  zoom.oninput = () => { c.z = parseFloat(zoom.value); show(); };
  wrap.querySelectorAll("[data-crop]").forEach(b => {
    b.onclick = () => {
      const act = b.dataset.crop;
      if (act === "reset") { Object.assign(c, DEFAULT_CROP); show(); return; }
      if (act === "apply") { idc.crop = { x: Math.round(c.x * 10) / 10, y: Math.round(c.y * 10) / 10, z: Math.round(c.z * 100) / 100 }; persistIdc(true); drawIdCard(); }
      wrap.remove();
    };
  });
  show();
}
