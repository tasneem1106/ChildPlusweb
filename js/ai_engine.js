/**
 * Child Plus - AI & Risk Prediction Engine
 * Analyzes anthropometric data (Height, Weight, Age, Gender, MUAC) and cognitive milestones
 * to predict Stunting, Malnutrition (SAM/MAM), and Cognitive Delays with WHO Standard thresholds.
 */

class AIRiskPredictionEngine {
  /**
   * Calculate Age in Months from DOB
   */
  getAgeInMonths(dobString) {
    const dob = new Date(dobString);
    const now = new Date();
    let months = (now.getFullYear() - dob.getFullYear()) * 12 + (now.getMonth() - dob.getMonth());
    if (now.getDate() < dob.getDate()) months--;
    return Math.max(1, months);
  }

  /**
   * Assess Child Risk Profile
   * @param {Object} child - Child object with DOB, gender, height, weight, muac, milestones
   */
  assessChildRisk(child) {
    const ageMonths = this.getAgeInMonths(child.dob);
    const gender = child.gender.toLowerCase();
    const height = child.currentHeight;
    const weight = child.currentWeight;
    const muac = child.muac || 14.0;

    // WHO Simplified Standard Median Reference Baselines (Age 12-60 Months)
    // Median height ~ 75cm at 12m to 110cm at 60m
    const expectedHeight = 75 + (ageMonths - 12) * 0.72;
    // Median weight ~ 9.5kg at 12m to 18.5kg at 60m
    const expectedWeight = 9.5 + (ageMonths - 12) * 0.19;

    const heightRatio = height / expectedHeight;
    const weightRatio = weight / expectedWeight;

    let stuntingRisk = "NORMAL";
    let wastingRisk = "NORMAL";
    let cognitiveRisk = "NORMAL";
    const recommendations = [];
    const alerts = [];

    // 1. Stunting Assessment (Height-for-Age)
    if (heightRatio < 0.90) {
      stuntingRisk = "SEVERE_STUNTING";
      alerts.push({ type: "CRITICAL", title: "Severe Stunting Flagged", message: `Height (${height} cm) is significantly below expected ${expectedHeight.toFixed(1)} cm for age ${ageMonths}m.` });
      recommendations.push("Refer to Primary Health Center (PHC) for pediatric growth assessment.");
      recommendations.push("Provide high-protein supplementary meal (Bal Amrutam) & daily egg.");
    } else if (heightRatio < 0.95) {
      stuntingRisk = "MODERATE_STUNTING";
      alerts.push({ type: "WARNING", title: "Stunting Risk Detected", message: `Height (${height} cm) is slightly lagging behind expected standard.` });
      recommendations.push("Ensure calcium-rich milk and daily sunlight exposure for bone growth.");
    }

    // 2. Wasting & Malnutrition Assessment (Weight-for-Height & MUAC)
    if (muac < 11.5 || weightRatio < 0.75) {
      wastingRisk = "SAM"; // Severe Acute Malnutrition
      alerts.push({ type: "CRITICAL", title: "SAM Alert (Severe Malnutrition)", message: `MUAC ${muac} cm & Weight (${weight} kg) indicates severe acute malnutrition!` });
      recommendations.push("IMMEDIATE ACTION: Enroll in Nutrition Rehabilitation Center (NRC).");
      recommendations.push("Administer Ready-to-Use Therapeutic Food (RUTF) and Iron-Folic Acid syrup.");
    } else if (muac < 12.5 || weightRatio < 0.85) {
      wastingRisk = "MAM"; // Moderate Acute Malnutrition
      alerts.push({ type: "WARNING", title: "MAM Alert (Moderate Malnutrition)", message: `Weight (${weight} kg) requires supplementary targeted nutrition.` });
      recommendations.push("Increase Take-Home Ration (THR) by 50%.");
      recommendations.push("Monitor weight bi-weekly and conduct home visit.");
    }

    // 3. Cognitive Assessment
    const totalMilestones = child.milestones ? Object.keys(child.milestones).length : 5;
    const completedMilestones = child.milestones ? Object.values(child.milestones).filter(Boolean).length : 5;
    const milestoneRatio = completedMilestones / totalMilestones;

    if (milestoneRatio < 0.5 || child.cognitiveScore < 60) {
      cognitiveRisk = "HIGH_DELAY_RISK";
      alerts.push({ type: "WARNING", title: "Cognitive Delay Flagged", message: "Child missed multiple early speech & fine motor milestones." });
      recommendations.push("Engage child in daily shape-sorter & picture-matching interactive games.");
      recommendations.push("Conduct early childhood education (ECE) focused group session.");
    } else if (milestoneRatio < 0.8 || child.cognitiveScore < 75) {
      cognitiveRisk = "MODERATE_DELAY_RISK";
    }

    // Determine Overall Risk Level
    let overallRiskLevel = "GREEN"; // GREEN, YELLOW, RED
    if (wastingRisk === "SAM" || stuntingRisk === "SEVERE_STUNTING") {
      overallRiskLevel = "RED";
    } else if (wastingRisk === "MAM" || stuntingRisk === "MODERATE_STUNTING" || cognitiveRisk === "HIGH_DELAY_RISK") {
      overallRiskLevel = "YELLOW";
    }

    return {
      ageMonths,
      expectedHeight: expectedHeight.toFixed(1),
      expectedWeight: expectedWeight.toFixed(1),
      stuntingRisk,
      wastingRisk,
      cognitiveRisk,
      overallRiskLevel,
      alerts,
      recommendations
    };
  }
}

window.AIRiskEngine = new AIRiskPredictionEngine();
