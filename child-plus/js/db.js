/**
 * Child Plus - Core Database & Supabase Cloud Integration Service
 * Manages hybrid data storage with local caching and real-time Supabase Database Sync.
 */

const SUPABASE_URL = "https://cveityvuekdajvpxfpet.supabase.co";
const SUPABASE_KEY = "sb_publishable_3jf-vQ5OvGhD82zmibooxQ_ueqM4jfE";

const SEED_DATA = {
  users: [
    {
      id: "u_worker",
      username: "worker",
      password: "worker123",
      name: "Lakshmi Devi",
      role: "WORKER",
      centerId: "c_anekal_12",
      centerName: "Anekal North Center #12",
      phone: "+91 98765 43210",
      avatar: "👩‍⚕️"
    },
    {
      id: "u_supervisor",
      username: "supervisor",
      password: "super123",
      name: "Dr. R. K. Varma",
      role: "SUPERVISOR",
      sector: "Anekal District Sector 4",
      centerCount: 14,
      phone: "+91 98765 88888",
      avatar: "👨‍🏫"
    },
    {
      id: "u_parent",
      username: "parent",
      password: "parent123",
      name: "Sunita Kumar",
      role: "BENEFICIARY",
      childId: "child_aarav",
      phone: "+91 98765 11111",
      avatar: "👩"
    }
  ],

  centers: [
    { id: "c_anekal_12", name: "Anekal North Center #12", worker: "Lakshmi Devi", childrenCount: 24, samCount: 1, mamCount: 3 },
    { id: "c_anekal_08", name: "Anekal South Center #08", worker: "Savitha Bai", childrenCount: 30, samCount: 0, mamCount: 4 },
    { id: "c_anekal_03", name: "Anekal West Center #03", worker: "Anusuya R.", childrenCount: 18, samCount: 2, mamCount: 2 },
    { id: "c_anekal_15", name: "Sarjapura Road Center #15", worker: "Kavitha M.", childrenCount: 28, samCount: 0, mamCount: 1 }
  ],

  children: [
    {
      id: "child_aarav",
      name: "Aarav Kumar",
      dob: "2023-03-15",
      gender: "Male",
      centerId: "c_anekal_12",
      centerName: "Anekal North Center #12",
      parentName: "Sunita Kumar",
      phone: "+91 98765 11111",
      photo: "👦",
      bloodGroup: "O+",
      enrolledDate: "2023-09-01",
      currentStatus: "NORMAL",
      currentHeight: 96.5,
      currentWeight: 14.8,
      muac: 14.2,
      cognitiveScore: 88,
      attendanceRate: 95,
      lastCheckup: "2026-07-15",
      growthHistory: [
        { date: "2026-02-10", ageMonths: 35, height: 92.0, weight: 13.5, status: "NORMAL" },
        { date: "2026-03-12", ageMonths: 36, height: 93.1, weight: 13.8, status: "NORMAL" },
        { date: "2026-04-15", ageMonths: 37, height: 94.0, weight: 14.0, status: "NORMAL" },
        { date: "2026-05-18", ageMonths: 38, height: 95.0, weight: 14.3, status: "NORMAL" },
        { date: "2026-06-14", ageMonths: 39, height: 95.8, weight: 14.5, status: "NORMAL" },
        { date: "2026-07-15", ageMonths: 40, height: 96.5, weight: 14.8, status: "NORMAL" }
      ],
      activitiesCompleted: [
        { id: "act_1", name: "Fruit Counter", category: "Math & Counting", date: "2026-07-18", score: 100, stars: 3 },
        { id: "act_2", name: "Shape Sorter", category: "Cognitive Motor", date: "2026-07-19", score: 90, stars: 3 },
        { id: "act_3", name: "Color & Sound Matcher", category: "Language & Audio", date: "2026-07-20", score: 85, stars: 2 }
      ],
      milestones: {
        grossMotor: true,
        fineMotor: true,
        speechLanguage: true,
        socialEmotional: true,
        cognitiveProblemSolving: true
      },
      nutritionalPlan: {
        thrDistributed: true,
        hotMealAttended: true,
        supplementaryEgg: true,
        ironFolicSupplying: false,
        advice: "Growth velocity is excellent! Continue balanced home meals with ragi porridge and fresh papaya."
      }
    },
    {
      id: "child_priya",
      name: "Priya Sharma",
      dob: "2024-06-10",
      gender: "Female",
      centerId: "c_anekal_12",
      centerName: "Anekal North Center #12",
      parentName: "Meena Sharma",
      phone: "+91 98765 22222",
      photo: "👧",
      bloodGroup: "A+",
      enrolledDate: "2024-11-01",
      currentStatus: "MAM",
      currentHeight: 81.0,
      currentWeight: 9.8,
      muac: 12.1,
      cognitiveScore: 68,
      attendanceRate: 82,
      lastCheckup: "2026-07-14",
      growthHistory: [
        { date: "2026-02-10", ageMonths: 20, height: 78.0, weight: 9.6, status: "NORMAL" },
        { date: "2026-03-12", ageMonths: 21, height: 78.5, weight: 9.5, status: "MAM" },
        { date: "2026-04-15", ageMonths: 22, height: 79.2, weight: 9.6, status: "MAM" },
        { date: "2026-05-18", ageMonths: 23, height: 80.0, weight: 9.7, status: "MAM" },
        { date: "2026-06-14", ageMonths: 24, height: 80.5, weight: 9.7, status: "MAM" },
        { date: "2026-07-14", ageMonths: 25, height: 81.0, weight: 9.8, status: "MAM" }
      ],
      activitiesCompleted: [
        { id: "act_1", name: "Fruit Counter", category: "Math & Counting", date: "2026-07-10", score: 70, stars: 2 },
        { id: "act_2", name: "Shape Sorter", category: "Cognitive Motor", date: "2026-07-12", score: 65, stars: 2 }
      ],
      milestones: {
        grossMotor: true,
        fineMotor: true,
        speechLanguage: false,
        socialEmotional: true,
        cognitiveProblemSolving: false
      },
      nutritionalPlan: {
        thrDistributed: true,
        hotMealAttended: true,
        supplementaryEgg: true,
        ironFolicSupplying: true,
        advice: "Moderate Acute Malnutrition detected. High-protein energy dense food (Bal Amrutam) and daily boiled egg recommended."
      }
    },
    {
      id: "child_vihaan",
      name: "Vihaan Reddy",
      dob: "2022-01-20",
      gender: "Male",
      centerId: "c_anekal_08",
      centerName: "Anekal South Center #08",
      parentName: "Rajesh Reddy",
      phone: "+91 98765 33333",
      photo: "👦",
      bloodGroup: "B+",
      enrolledDate: "2022-06-01",
      currentStatus: "STUNTING_RISK",
      currentHeight: 98.0,
      currentWeight: 15.2,
      muac: 13.8,
      cognitiveScore: 92,
      attendanceRate: 90,
      lastCheckup: "2026-07-16",
      growthHistory: [
        { date: "2026-02-10", ageMonths: 48, height: 95.5, weight: 14.5, status: "STUNTING_RISK" },
        { date: "2026-03-12", ageMonths: 49, height: 96.0, weight: 14.7, status: "STUNTING_RISK" },
        { date: "2026-04-15", ageMonths: 50, height: 96.5, weight: 14.8, status: "STUNTING_RISK" },
        { date: "2026-05-18", ageMonths: 51, height: 97.0, weight: 15.0, status: "STUNTING_RISK" },
        { date: "2026-06-14", ageMonths: 52, height: 97.5, weight: 15.1, status: "STUNTING_RISK" },
        { date: "2026-07-16", ageMonths: 54, height: 98.0, weight: 15.2, status: "STUNTING_RISK" }
      ],
      activitiesCompleted: [
        { id: "act_1", name: "Fruit Counter", category: "Math & Counting", date: "2026-07-15", score: 95, stars: 3 },
        { id: "act_2", name: "Shape Sorter", category: "Cognitive Motor", date: "2026-07-16", score: 90, stars: 3 },
        { id: "act_3", name: "Color & Sound Matcher", category: "Language & Audio", date: "2026-07-16", score: 90, stars: 3 }
      ],
      milestones: {
        grossMotor: true,
        fineMotor: true,
        speechLanguage: true,
        socialEmotional: true,
        cognitiveProblemSolving: true
      },
      nutritionalPlan: {
        thrDistributed: true,
        hotMealAttended: true,
        supplementaryEgg: true,
        ironFolicSupplying: true,
        advice: "Height for Age is below target standard. Ensure calcium rich milk and vitamin D exposure during outdoor play."
      }
    }
  ]
};

class DatabaseService {
  constructor() {
    this.supabaseUrl = SUPABASE_URL;
    this.supabaseKey = SUPABASE_KEY;
    this.supabaseClient = (window.supabase && window.supabase.createClient) 
      ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) 
      : null;

    this.init();
    this.syncInitialDataToSupabase();
  }

  init() {
    if (!localStorage.getItem("childplus_initialized")) {
      localStorage.setItem("childplus_users", JSON.stringify(SEED_DATA.users));
      localStorage.setItem("childplus_centers", JSON.stringify(SEED_DATA.centers));
      localStorage.setItem("childplus_children", JSON.stringify(SEED_DATA.children));
      localStorage.setItem("childplus_initialized", "true");
    }
  }

  /**
   * Supabase REST API Call Helper
   */
  async sendToSupabase(table, data) {
    try {
      const endpoint = `${this.supabaseUrl}/rest/v1/${table}`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "apikey": this.supabaseKey,
          "Authorization": `Bearer ${this.supabaseKey}`,
          "Content-Type": "application/json",
          "Prefer": "return=minimal"
        },
        body: JSON.stringify(data)
      });
      return response.ok;
    } catch (err) {
      console.warn(`Supabase table '${table}' sync notice:`, err.message);
      return false;
    }
  }

  async syncInitialDataToSupabase() {
    const children = this.getChildren();
    for (const child of children) {
      this.sendToSupabase("children", {
        id: child.id,
        name: child.name,
        dob: child.dob,
        gender: child.gender,
        center_id: child.centerId,
        height: child.currentHeight,
        weight: child.currentWeight,
        muac: child.muac,
        status: child.currentStatus,
        cognitive_score: child.cognitiveScore,
        updated_at: new Date().toISOString()
      });
    }
  }

  getUsers() {
    return JSON.parse(localStorage.getItem("childplus_users") || "[]");
  }

  getCenters() {
    return JSON.parse(localStorage.getItem("childplus_centers") || "[]");
  }

  getChildren(centerId = null) {
    const list = JSON.parse(localStorage.getItem("childplus_children") || "[]");
    if (centerId) {
      return list.filter(c => c.centerId === centerId);
    }
    return list;
  }

  getChildById(childId) {
    const list = this.getChildren();
    return list.find(c => c.id === childId) || null;
  }

  saveChild(childData) {
    let list = this.getChildren();
    const idx = list.findIndex(c => c.id === childData.id);
    if (idx >= 0) {
      list[idx] = childData;
    } else {
      list.push(childData);
    }
    localStorage.setItem("childplus_children", JSON.stringify(list));

    // Sync child record to Supabase table
    this.sendToSupabase("children", {
      id: childData.id,
      name: childData.name,
      dob: childData.dob,
      gender: childData.gender,
      center_id: childData.centerId,
      height: childData.currentHeight,
      weight: childData.currentWeight,
      muac: childData.muac,
      status: childData.currentStatus,
      cognitive_score: childData.cognitiveScore,
      updated_at: new Date().toISOString()
    });

    return childData;
  }

  addGrowthRecord(childId, record) {
    const child = this.getChildById(childId);
    if (!child) return null;

    child.currentHeight = parseFloat(record.height);
    child.currentWeight = parseFloat(record.weight);
    if (record.muac) child.muac = parseFloat(record.muac);
    child.lastCheckup = record.date;
    if (record.status) child.currentStatus = record.status;

    child.growthHistory.push(record);
    this.saveChild(child);

    // Sync individual growth log to Supabase 'growth_logs' table
    this.sendToSupabase("growth_logs", {
      child_id: childId,
      date: record.date,
      height: parseFloat(record.height),
      weight: parseFloat(record.weight),
      muac: parseFloat(record.muac || 0),
      status: record.status || "NORMAL"
    });

    return child;
  }

  addActivityLog(childId, activity) {
    const child = this.getChildById(childId);
    if (!child) return null;

    if (!child.activitiesCompleted) child.activitiesCompleted = [];
    child.activitiesCompleted.push(activity);
    
    // Recalculate cognitive score
    const totalScore = child.activitiesCompleted.reduce((acc, curr) => acc + curr.score, 0);
    child.cognitiveScore = Math.min(100, Math.round(totalScore / child.activitiesCompleted.length));

    this.saveChild(child);

    // Sync activity log to Supabase 'activity_logs' table
    this.sendToSupabase("activity_logs", {
      child_id: childId,
      activity_name: activity.name,
      category: activity.category,
      score: activity.score,
      stars: activity.stars,
      completed_at: new Date().toISOString()
    });

    return child;
  }

  resetToSeed() {
    localStorage.removeItem("childplus_initialized");
    this.init();
    return true;
  }
}

window.DB = new DatabaseService();
