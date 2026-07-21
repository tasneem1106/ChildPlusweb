/**
 * Child Plus - Multi-Language Translation Engine (English ⇄ Kannada)
 * Designed for rural Anganwadi workers, supervisors, and families in Anekal, Karnataka.
 */

const TRANSLATIONS = {
  en: {
    appTitle: "childplus",
    slogan: "NURTURE • GROW • THRIVE",
    statusConnected: "⚡ Supabase Connected",
    logout: "Logout 🚪",
    loginWelcome: "Welcome to Child Plus",
    loginSub: "Anganwadi Nutrition & Education Tracking System",
    demoTag: "⚡ ONE-CLICK DEMO LOGIN:",
    roleWorker: "Worker",
    roleSupervisor: "Supervisor",
    roleParent: "Parent",
    signIn: "Sign In to Dashboard 🚀",
    usernameLbl: "Username",
    passwordLbl: "Password",
    
    // Worker View
    welcomeWorker: "Welcome",
    centerLocation: "Anekal North Center #12",
    todayDate: "Today's Date",
    childrenCountLbl: "Children",
    quickLoggerTitle: "⚡ Quick Icon-Based Logger",
    quickLoggerSub: "Tap to Log Instantly",
    logWeightHeight: "Log Weight & Height",
    growthTracker: "Growth Tracker",
    hotMealsEgg: "Hot Meals & Egg",
    dailyNutrition: "Daily Nutrition",
    thrRations: "THR Rations",
    distributionLog: "Distribution Log",
    milestoneCheck: "Milestone Check",
    cognitiveActivity: "Cognitive Activity",
    rosterTitle: "👶 Center Children Roster",
    filterAll: "All",
    filterHealthy: "🟢 Healthy",
    filterMAM: "🟡 MAM Alert",
    filterSAM: "🔴 SAM Critical",
    filterStunting: "🟠 Stunting Risk",
    btnQuickLog: "⚖️ Log Checkup",
    btnViewDetails: "📊 View Details",
    heightLbl: "Height",
    weightLbl: "Weight",
    muacLbl: "MUAC",
    cognitiveLbl: "Cognitive",

    // Modals
    growthModalTitle: "⚖️ Icon Growth Logger",
    selectChildLbl: "Select Child:",
    checkupDateLbl: "Checkup Date:",
    saveGrowthBtn: "✅ Save Growth Record",
    cancelBtn: "Cancel",

    // Supervisor View
    supervisorDash: "Supervisor Dashboard",
    sectorTitle: "Sector: Anekal District Sector 4",
    exportCSV: "📥 Export CSV Data",
    printReport: "📄 Print Official PDF Report",
    activeCenters: "Active Centers",
    enrolledChildren: "Total Enrolled Children",
    mamCases: "MAM Cases (Moderate)",
    samCases: "SAM Cases (Severe)",
    reportingCompliance: "Daily Reporting Compliance",
    centersStatusTitle: "🏢 Anganwadi Centers Status (Anekal Sector)",
    colCenterName: "Center Name",
    colWorker: "Assigned Worker",
    colChildren: "Total Children",
    colMAM: "MAM Cases",
    colSAM: "SAM Cases",
    colStunting: "Stunting Risk",
    colCompliance: "Compliance Status",
    colActions: "Actions",
    btnInspect: "🔍 Inspect",
    
    // Parent View
    parentHubTitle: "Growth & Learning Hub",
    parentNameLbl: "Parent",
    centerLbl: "Anganwadi",
    cognitiveStars: "Cognitive Stars",
    attendanceLbl: "Attendance",
    growthStatusTitle: "📈 Growth & Health Status",
    currentHeight: "Current Height",
    currentWeight: "Current Weight",
    muacMetric: "MUAC Arm Metric",
    expectedLbl: "Expected",
    standardLbl: "Standard",
    dailyNutritionPlan: "🥗 Daily Nutrition Plan",
    smartAdviceTitle: "Smart Nutrition Recommendation",
    playLearnHub: "🎮 Play & Learn Hub (Cognitive Activities)",
    badgesTitle: "🏆 Milestone Badges",
    btnPlay: "Play Game 🎯"
  },

  kn: {
    appTitle: "ಚೈಲ್ಡ್ ಪ್ಲಸ್",
    slogan: "ಪೋಷಣೆ • ಬೆಳವಣಿಗೆ • ಏಳಿಗೆ",
    statusConnected: "⚡ ಸುಪೇಬೇಸ್ ಸಂಪರ್ಕಗೊಂಡಿದೆ",
    logout: "ನಿರ್ಗಮಿಸಿ 🚪",
    loginWelcome: "ಚೈಲ್ಡ್ ಪ್ಲಸ್‌ಗೆ ಸುಸ್ವಾಗತ",
    loginSub: "ಅಂಗನವಾಡಿ ಪೌಷ್ಟಿಕಾಂಶ ಮತ್ತು ಶಿಕ್ಷಣ ಟ್ರ್ಯಾಕಿಂಗ್ ವ್ಯವಸ್ಥೆ",
    demoTag: "⚡ ಏಕ-ಕ್ಲಿಕ್ ಡೆಮೊ ಪ್ರವೇಶ:",
    roleWorker: "ಕಾರ್ಯಕರ್ತೆ",
    roleSupervisor: "ಮೇಲ್ವಿಚಾರಕರು",
    roleParent: "ಪೋಷಕರು",
    signIn: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಲಾಗಿನ್ ಮಾಡಿ 🚀",
    usernameLbl: "ಬಳಕೆದಾರ ಹೆಸರು",
    passwordLbl: "ಪಾಸ್‌ವರ್ಡ್",
    
    // Worker View
    welcomeWorker: "ಸುಸ್ವಾಗತ",
    centerLocation: "ಆನೇಕಲ್ ಉತ್ತರ ಕೇಂದ್ರ #೧೨",
    todayDate: "ಇಂದಿನ ದಿನಾಂಕ",
    childrenCountLbl: "ಮಕ್ಕಳು",
    quickLoggerTitle: "⚡ ತ್ವರಿತ ಚಿಹ್ನೆ ಆಧಾರಿತ ದಾಖಲೆ",
    quickLoggerSub: "ದಾಖಲಿಸಲು ಸ್ಪರ್ಶಿಸಿ",
    logWeightHeight: "ತೂಕ ಮತ್ತು ಎತ್ತರ ದಾಖಲಿಸಿ",
    growthTracker: "ಬೆಳವಣಿಗೆ ಟ್ರ್ಯಾಕರ್",
    hotMealsEgg: "ಬಿಸಿ ಊಟ ಮತ್ತು ಮೊಟ್ಟೆ",
    dailyNutrition: "ದೈನಂದಿನ ಪೌಷ್ಟಿಕಾಂಶ",
    thrRations: "ಟಿ.ಎಚ್.ಆರ್ ಪಡಿತರ",
    distributionLog: "ವಿತರಣಾ ದಾಖಲೆ",
    milestoneCheck: "ಮೈಲಿಗಲ್ಲು ತಪಾಸಣೆ",
    cognitiveActivity: "ಜ್ಞಾನಾತ್ಮಕ ಚಟುವಟಿಕೆ",
    rosterTitle: "👶 ಕೇಂದ್ರದ ಮಕ್ಕಳ ಪಟ್ಟಿ",
    filterAll: "ಎಲ್ಲಾ",
    filterHealthy: "🟢 ಆರೋಗ್ಯಕರ",
    filterMAM: "🟡 ಮಧ್ಯಮ ಅಪೌಷ್ಟಿಕತೆ (MAM)",
    filterSAM: "🔴 ತೀವ್ರ ಅಪೌಷ್ಟಿಕತೆ (SAM)",
    filterStunting: "🟠 ಎತ್ತರ ಕೊರತೆ ಅಪಾಯ",
    btnQuickLog: "⚖️ ತಪಾಸಣೆ ದಾಖಲಿಸಿ",
    btnViewDetails: "📊 ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    heightLbl: "ಎತ್ತರ",
    weightLbl: "ತೂಕ",
    muacLbl: "ತೋಳಿನ ಸುತ್ತಳತೆ",
    cognitiveLbl: "ಜ್ಞಾನಾತ್ಮಕ",

    // Modals
    growthModalTitle: "⚖️ ಚಿಹ್ನೆ ಆಧಾರಿತ ಬೆಳವಣಿಗೆ ದಾಖಲೆ",
    selectChildLbl: "ಮಗುವನ್ನು ಆಯ್ಕೆಮಾಡಿ:",
    checkupDateLbl: "ತಪಾಸಣೆ ದಿನಾಂಕ:",
    saveGrowthBtn: "✅ ದಾಖಲೆಯನ್ನು ಉಳಿಸಿ",
    cancelBtn: "ರದ್ದುಮಾಡಿ",

    // Supervisor View
    supervisorDash: "ಮೇಲ್ವಿಚಾರಕರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    sectorTitle: "ವಲಯ: ಆನೇಕಲ್ ಜಿಲ್ಲಾ ವಲಯ ೪",
    exportCSV: "📥 CSV ಡೇಟಾ ಡೌನ್‌ಲೋಡ್",
    printReport: "📄 ಅಧಿಕೃತ PDF ವರದಿ ಮುದ್ರಿಸಿ",
    activeCenters: "ಸಕ್ರಿಯ ಕೇಂದ್ರಗಳು",
    enrolledChildren: "ಒಟ್ಟು ದಾಖಲಾದ ಮಕ್ಕಳು",
    mamCases: "MAM ಪ್ರಕರಣಗಳು (ಮಧ್ಯಮ)",
    samCases: "SAM ಪ್ರಕರಣಗಳು (ತೀವ್ರ)",
    reportingCompliance: "ದೈನಂದಿನ ವರದಿ ಅನುಸರಣೆ",
    centersStatusTitle: "🏢 ಅಂಗನವಾಡಿ ಕೇಂದ್ರಗಳ ಸ್ಥಿತಿ (ಆನೇಕಲ್ ವಲಯ)",
    colCenterName: "ಕೇಂದ್ರದ ಹೆಸರು",
    colWorker: "ನಿಯೋಜಿತ ಕಾರ್ಯಕರ್ತೆ",
    colChildren: "ಒಟ್ಟು ಮಕ್ಕಳು",
    colMAM: "MAM ಪ್ರಕರಣಗಳು",
    colSAM: "SAM ಪ್ರಕರಣಗಳು",
    colStunting: "ಎತ್ತರ ಕೊರತೆ ಅಪಾಯ",
    colCompliance: "ಅನುಸರಣೆ ಸ್ಥಿತಿ",
    colActions: "ಕ್ರಿಯೆಗಳು",
    btnInspect: "🔍 ತಪಾಸಣೆ ಮಾಡಿ",
    
    // Parent View
    parentHubTitle: "ಬೆಳವಣಿಗೆ ಮತ್ತು ಕಲಿಕಾ ಕೇಂದ್ರ",
    parentNameLbl: "ಪೋಷಕರು",
    centerLbl: "ಅಂಗನವಾಡಿ",
    cognitiveStars: "ಜ್ಞಾನಾತ್ಮಕ ನಕ್ಷತ್ರಗಳು",
    attendanceLbl: "ಹಾಜರಾತಿ",
    growthStatusTitle: "📈 ಬೆಳವಣಿಗೆ ಮತ್ತು ಆರೋಗ್ಯ ಸ್ಥಿತಿ",
    currentHeight: "ಪ್ರಸ್ತುತ ಎತ್ತರ",
    currentWeight: "ಪ್ರಸ್ತುತ ತೂಕ",
    muacMetric: "ತೋಳಿನ ಸುತ್ತಳತೆ (MUAC)",
    expectedLbl: "ನಿರೀಕ್ಷಿತ",
    standardLbl: "ಮಾನದಂಡ",
    dailyNutritionPlan: "🥗 ದೈನಂದಿನ ಪೌಷ್ಟಿಕಾಂಶ ಯೋಜನೆ",
    smartAdviceTitle: "ಬುದ್ಧಿವಂತ ಪೌಷ್ಟಿಕಾಂಶದ ಸಲಹೆ",
    playLearnHub: "🎮 ಆಟವಾಡಿ ಕಲಿಯಿರಿ ಚಟುವಟಿಕೆಗಳು",
    badgesTitle: "🏆 ಮೈಲಿಗಲ್ಲು ಪದಕಗಳು",
    btnPlay: "ಆಟವಾಡಿ 🎯"
  }
};

class I18nManager {
  constructor() {
    this.currentLang = localStorage.getItem("childplus_lang") || "en";
  }

  getLang() {
    return this.currentLang;
  }

  setLang(lang) {
    this.currentLang = lang;
    localStorage.setItem("childplus_lang", lang);
    if (window.App) window.App.route();
  }

  t(key) {
    if (!TRANSLATIONS[this.currentLang]) return key;
    return TRANSLATIONS[this.currentLang][key] || TRANSLATIONS["en"][key] || key;
  }
}

window.I18n = new I18nManager();
