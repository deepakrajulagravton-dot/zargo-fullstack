require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const Vehicle = require("./models/Vehicle");
const Lead = require("./models/Lead");
const Booking = require("./models/Booking");
const { Plan, PDI, ServiceJob, Renewal, Return, FollowUp, Insurance, Recovery, Task, Timeline } = require("./models/models");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected. Seeding...");

  // Clear all
  await Promise.all([User, Vehicle, Lead, Booking, Plan, PDI, ServiceJob, Renewal, Return, FollowUp, Insurance, Recovery, Task, Timeline].map(M => M.deleteMany({})));

  // Users
  await User.create([
    { name:"Admin User",  email:"admin@zargo.in",  password:"admin123", role:"admin", hub:"Kukatpally Hub" },
    { name:"Ravi Kumar",  email:"ravi@zargo.in",   password:"staff123", role:"staff", hub:"Kukatpally Hub", phone:"9812345001" },
    { name:"Meera Iyer",  email:"meera@zargo.in",  password:"staff123", role:"staff", hub:"Madhapur Hub",   phone:"9812345002" },
    { name:"Asha Patel",  email:"asha@zargo.in",   password:"staff123", role:"staff", hub:"Kukatpally Hub", phone:"9812345003" },
    { name:"Nikhil Singh",email:"nikhil@zargo.in", password:"staff123", role:"staff", hub:"Kukatpally Hub", phone:"9812345004" },
  ]);

  // Vehicles
  await Vehicle.create([
    { id:"ZRG-New1",  plate:"TGZRG1NEW",   model:"Quanta S",  hub:"Kukatpally", status:"available",         odo:1200  },
    { id:"ZRG1717",   plate:"TGZRG1717",   model:"Quanta S+", hub:"Kukatpally", status:"available",         odo:3400  },
    { id:"ZRG7890",   plate:"TG01ZRG7890", model:"Quanta S",  hub:"Kukatpally", status:"available",         odo:5600  },
    { id:"ZRG-4567",  plate:"TGZRG4567",   model:"Quanta S+", hub:"Kukatpally", status:"available",         odo:2100  },
    { id:"ZRG2828",   plate:"TGZRG2828",   model:"Quanta S",  hub:"Kukatpally", status:"ready_for_booking", odo:8900  },
    { id:"ZRG-027",   plate:"TG0AZRG027",  model:"Quanta S+", hub:"Kukatpally", status:"ready_for_booking", odo:12000 },
    { id:"ZRG-026",   plate:"TG01ZRG026",  model:"Quanta S+", hub:"Kukatpally", status:"ready_for_booking", odo:9800  },
    { id:"ZRG856ab",  plate:"Tg231545as",  model:"Quanta S+", hub:"Kukatpally", status:"booked",            odo:4500  },
    { id:"ZRG-118",   plate:"TG09HB7809",  model:"Quanta S+", hub:"Madhapur",   status:"booked",            odo:6700  },
    { id:"RB-TEST2",  plate:"RB_TEST2",    model:"Quanta S+", hub:"Kukatpally", status:"available",         odo:340   },
    { id:"ZRG002456", plate:"TG32145asd",  model:"Quanta S+", hub:"Kukatpally", status:"booked",            odo:7800  },
    { id:"ZRG001-S",  plate:"TG012Ab210",  model:"Quanta S",  hub:"Kukatpally", status:"service",           odo:15600 },
  ]);

  // Plans
  await Plan.create([
    { name:"Basic 1M",      duration:30,  kmLimit:1500,  price:8000,  deposit:2000, features:["Basic support","1500 km included","Standard vehicle"] },
    { name:"Standard 3M",   duration:90,  kmLimit:4500,  price:12000, deposit:3000, features:["Priority support","4500 km included","Standard+ vehicle","1 free service"] },
    { name:"Premium 3M",    duration:90,  kmLimit:9000,  price:18000, deposit:5000, features:["24/7 support","9000 km included","Premium vehicle","2 free services","Insurance covered"] },
    { name:"Enterprise 6M", duration:180, kmLimit:18000, price:30000, deposit:8000, features:["Dedicated manager","18000 km included","Any vehicle","Full maintenance","Insurance included"] },
  ]);

  // Leads
  await Lead.create([
    { name:"Priya Sharma", phone:"9876543210", source:"Referral",stage:"new",         assignedTo:"Ravi Kumar",  notes:"Interested in E-Scooter" },
    { name:"Arjun Mehta",  phone:"9812345678", source:"Website", stage:"contacted",   assignedTo:"Meera Iyer",  notes:"Long-term rental query" },
    { name:"Divya Rao",    phone:"9700112233", source:"Walk-in", stage:"negotiating", assignedTo:"Asha Patel",  notes:"Budget-conscious" },
    { name:"Raju Verma",   phone:"9100845111", source:"Website", stage:"converted",   assignedTo:"Ravi Kumar",  notes:"" },
    { name:"Suresh Nair",  phone:"9665544233", source:"App",     stage:"rejected",    assignedTo:"Asha Patel",  notes:"Out of service area" },
  ]);

  // Bookings
  await Booking.create([
    { riderName:"Rahul Verma",  phone:"+919999000011", vehicleId:"ZRG-4567",  start:"2026-05-29", end:"2026-06-28", kmLimit:4500,  kmUsed:120,  status:"active",    plan:"Standard 3M", amount:12000, deposit:3000, payStatus:"paid" },
    { riderName:"Anita Singh",  phone:"+919999000022", vehicleId:"ZRG7890",   start:"2026-04-29", end:"2026-05-28", kmLimit:1500,  kmUsed:1480, status:"completed", plan:"Basic 1M",    amount:8000,  deposit:2000, payStatus:"paid" },
    { riderName:"Nisha Gupta",  phone:"+919988776655", vehicleId:"ZRG2828",   start:"2026-06-09", end:"2026-07-09", kmLimit:9000,  kmUsed:200,  status:"active",    plan:"Premium 3M",  amount:18000, deposit:5000, payStatus:"paid" },
    { riderName:"Vikram Rao",   phone:"+919812345678", vehicleId:"ZRG-027",   start:"2026-05-01", end:"2026-07-30", kmLimit:4500,  kmUsed:1200, status:"active",    plan:"Standard 3M", amount:15200, deposit:4000, payStatus:"overdue" },
    { riderName:"Deepa Sharma", phone:"+919876543210", vehicleId:"ZRG856ab",  start:"2026-06-02", end:"2026-07-02", kmLimit:9000,  kmUsed:0,    status:"active",    plan:"Premium 3M",  amount:18000, deposit:5000, payStatus:"paid" },
  ]);

  // PDIs
  await PDI.create([
    { vehicleId:"ZRG2828",  status:"completed", completedBy:"Admin User", completedDate:"2026-06-15", checks:{tyres:true,brakes:true,battery:true,lights:true,horn:true,mirrors:true,documents:true,cleanliness:true}, notes:"All checks passed" },
    { vehicleId:"ZRG-027",  status:"completed", completedBy:"Ravi Kumar", completedDate:"2026-06-15", checks:{tyres:true,brakes:true,battery:true,lights:true,horn:true,mirrors:true,documents:true,cleanliness:true}, notes:"Minor scuff noted" },
    { vehicleId:"ZRG001-S", status:"pending",   completedBy:"",           completedDate:"",           checks:{}, notes:"" },
  ]);

  // Service Jobs
  await ServiceJob.create([
    { vehicleId:"ZRG001-S", type:"Battery inspection",    priority:"high",   status:"in-progress", assignedTo:"Ravi Kumar", notes:"Battery cell voltage variance" },
    { vehicleId:"ZRG-118",  type:"Brake pad replacement", priority:"medium", status:"scheduled",   assignedTo:"Meera Iyer", notes:"Routine wear check" },
  ]);

  // Renewals
  await Renewal.create([
    { bookingId:"BKG-1780", customerName:"Deepa Sharma", vehicle:"ZRG856ab", dueDate:"2026-07-02", amount:18000, status:"upcoming", ownedBy:"Meera Iyer" },
    { bookingId:"BKG-1004", customerName:"Vikram Rao",   vehicle:"ZRG-027",  dueDate:"2026-05-25", amount:15200, status:"overdue",  ownedBy:"Ravi Kumar" },
    { bookingId:"BKG-1001", customerName:"Rahul Verma",  vehicle:"ZRG-4567", dueDate:"2026-06-17", amount:12000, status:"due",      ownedBy:"Asha Patel" },
  ]);

  // Returns
  await Return.create([
    { bookingId:"BKG-1002", vehicleId:"ZRG7890", customerName:"Anita Singh", returnDate:"2026-05-28", odo:21450, photos:true, pdiDone:false, refundStatus:"pending",  accountStatus:"open",   assignedTo:"Ravi Kumar", nextStep:"Approve refund" },
    { bookingId:"BKG-1003", vehicleId:"ZRG2828", customerName:"Nisha Gupta", returnDate:"2026-05-28", odo:8250,  photos:true, pdiDone:true,  refundStatus:"none",     accountStatus:"closed", assignedTo:"Meera Iyer", nextStep:"Collect return media" },
  ]);

  // Follow Ups
  await FollowUp.create([
    { customerName:"Priya Sharma", phone:"+919876543210", vehicleId:"ZRG-4567",  bookingId:"BKG-1001", reason:"Renewal reminder",        dueDate:"2026-06-17", status:"pending", assignedTo:"Asha Patel" },
    { customerName:"Rahul Verma",  phone:"+919812345678", vehicleId:"ZRG-027",   bookingId:"BKG-1004", reason:"Payment reminder",         dueDate:"2026-06-16", status:"pending", assignedTo:"Ravi Kumar" },
    { customerName:"Meera Iyer",   phone:"+919700112233", vehicleId:"ZRG2828",   bookingId:"BKG-1003", reason:"Renewal due in 7 days",    dueDate:"2026-06-23", status:"pending", assignedTo:"Asha Patel" },
    { customerName:"Anita Desai",  phone:"+919999887766", vehicleId:"ZRG002456", bookingId:"BKG-1004", reason:"Missed renewal follow-up", dueDate:"2026-06-15", status:"overdue", assignedTo:"Asha Patel", notes:"Awaiting response" },
    { customerName:"Suresh Nair",  phone:"+919665544233", vehicleId:"ZRG-118",   bookingId:"BKG-1015", reason:"3 Days Overdue",           dueDate:"2026-06-13", status:"overdue", assignedTo:"Ravi Kumar",  notes:"Legal team notified" },
  ]);

  // Insurance
  await Insurance.create([
    { vehicleId:"ZRG-New1", policyNum:"POL-5082", type:"policy", premium:18000, renewal:"2026-06-20", status:"expiring", managedBy:"Meera Iyer" },
    { vehicleId:"ZRG-118",  policyNum:"CLA-7012", type:"claim",  premium:0,     renewal:"2026-08-15", status:"active",   managedBy:"Ravi Kumar", claimNotes:"Accident claim filed 2026-06-10" },
  ]);

  // Recovery
  await Recovery.create([
    { bookingId:"BKG-1004", customerName:"Vikram Rao",  phone:"+919812345678", vehicleId:"ZRG-027",  overdueAmount:15200, daysPastDue:22, status:"legal-escalation", assignedTo:"Ravi Kumar",  notes:"Legal team notified" },
    { bookingId:"BKG-1001", customerName:"Rahul Verma", phone:"+919999000011", vehicleId:"ZRG-4567", overdueAmount:2400,  daysPastDue:7,  status:"pending-call",     assignedTo:"Meera Iyer", notes:"First contact pending" },
  ]);

  // Tasks
  await Task.create([
    { title:"Complete PDI for ZRG001-S",           status:"in-progress",      dueDate:"2026-06-18", assignedTo:"Ravi Kumar",  category:"pdi" },
    { title:"Approve refund for RTN-801",           status:"awaiting-approval",dueDate:"2026-06-19", assignedTo:"Admin User",  category:"return" },
    { title:"Contact overdue recovery REC-402",     status:"assigned",         dueDate:"2026-06-20", assignedTo:"Meera Iyer",  category:"recovery" },
    { title:"Renew insurance POL-5082 before 20th", status:"assigned",         dueDate:"2026-06-18", assignedTo:"Asha Patel",  category:"insurance" },
  ]);

  // Timeline
  await Timeline.create([
    { event:"Recovery Initiated", by:"Meera Iyer",   note:"Follow up issued for overdue payment collection." },
    { event:"Vehicle Returned",   by:"Suresh Nair",  note:"Return completed with inspection notes logged." },
    { event:"Payment Received",   by:"Anita Desai",  note:"Invoice settled for current rental period." },
    { event:"Lead Created",       by:"Priya Sharma", note:"New inquiry recorded for a long-term EV rental." },
    { event:"Booking Created",    by:"Rahul Verma",  note:"Booking confirmed with payment details pending." },
    { event:"Vehicle Assigned",   by:"Rahul Verma",  note:"Vehicle assigned after PDI clearance." },
  ]);

  console.log("✅ Seed complete!");
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
