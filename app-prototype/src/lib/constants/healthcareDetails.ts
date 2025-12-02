// Comprehensive healthcare service details
export interface HealthcareServiceDetail {
  id: string;
  name: string;
  subcategory: string;
  price: number;
  duration: number;
  image: string;
  shortDescription: string;
  fullDescription: string;
  whatIsDone: string[];
  procedure: string[];
  benefits: string[];
  preparation: string[];
  frequency: string;
  parametersTested?: string[];
  resultsTime: string;
  partner: string;
}

export const HEALTHCARE_SERVICES: HealthcareServiceDetail[] = [
  // LAB TESTS
  {
    id: "cbc-test",
    name: "Complete Blood Count (CBC)",
    subcategory: "Lab Tests",
    price: 800,
    duration: 30,
    image: "/images/healthcare/cbc-test.svg",
    shortDescription: "Comprehensive blood analysis to evaluate overall health and detect disorders",
    fullDescription: "A Complete Blood Count (CBC) is one of the most common blood tests that measures several components of your blood, including red blood cells, white blood cells, hemoglobin, hematocrit, and platelets. This test provides valuable information about your overall health status.",
    whatIsDone: [
      "Blood sample collection from a vein in your arm",
      "Analysis of red blood cells (RBCs), white blood cells (WBCs), and platelets",
      "Measurement of hemoglobin and hematocrit levels",
      "Evaluation of blood cell counts and characteristics"
    ],
    procedure: [
      "Our certified phlebotomist arrives at your location with sterile equipment",
      "The puncture site is cleaned with an antiseptic",
      "A small blood sample (3-5ml) is collected using a sterile needle",
      "The sample is safely stored in labeled tubes",
      "Light pressure and bandage applied to the puncture site",
      "Sample transported to Patrangsit Hospital lab for analysis"
    ],
    benefits: [
      "Detects anemia, infection, and blood disorders",
      "Monitors chronic health conditions",
      "Evaluates immune system function",
      "Screens for blood cancers and clotting disorders",
      "Assesses overall health before surgery or treatment"
    ],
    preparation: [
      "No fasting required for standard CBC",
      "Wear comfortable clothing with easy arm access",
      "Stay hydrated - drink water before the test",
      "Inform the technician of any medications you're taking",
      "Avoid strenuous exercise immediately before the test"
    ],
    frequency: "Annually for routine health screening, or as recommended by your physician for monitoring specific conditions",
    parametersTested: [
      "Red Blood Cell (RBC) count",
      "White Blood Cell (WBC) count",
      "Hemoglobin (Hb)",
      "Hematocrit (Hct)",
      "Platelet count",
      "Mean Corpuscular Volume (MCV)",
      "Mean Corpuscular Hemoglobin (MCH)",
      "Red Cell Distribution Width (RDW)"
    ],
    resultsTime: "Results available within 24 hours via email and mobile app",
    partner: "Patrangsit Hospital"
  },
  {
    id: "lipid-profile",
    name: "Lipid Profile Test",
    subcategory: "Lab Tests",
    price: 1200,
    duration: 30,
    image: "/images/healthcare/lipid-profile.svg",
    shortDescription: "Cholesterol and triglyceride screening for heart health assessment",
    fullDescription: "A Lipid Profile is a comprehensive cholesterol test that measures the amount of specific fat molecules (lipids) in your blood. This test is crucial for assessing your risk of developing cardiovascular disease and monitoring the effectiveness of cholesterol-lowering medications.",
    whatIsDone: [
      "Fasting blood sample collection (8-12 hours fasting required)",
      "Measurement of total cholesterol levels",
      "Analysis of HDL (good) and LDL (bad) cholesterol",
      "Evaluation of triglyceride levels",
      "Calculation of cholesterol ratios and cardiovascular risk"
    ],
    procedure: [
      "Fast for 8-12 hours before the test (water allowed)",
      "Certified phlebotomist arrives at your scheduled time",
      "Blood sample (5ml) collected from arm vein using sterile technique",
      "Sample preserved in special tubes to maintain lipid stability",
      "Immediate transport to hospital laboratory",
      "Advanced lipid analysis performed using automated equipment"
    ],
    benefits: [
      "Early detection of high cholesterol and heart disease risk",
      "Monitors effectiveness of diet, exercise, and medications",
      "Identifies need for lifestyle modifications",
      "Assesses risk for stroke and heart attack",
      "Guides treatment decisions for cardiovascular health"
    ],
    preparation: [
      "Fast for 8-12 hours (only water permitted)",
      "Take regular medications unless instructed otherwise",
      "Avoid alcohol for 24 hours before test",
      "Maintain normal diet for 3 days before test",
      "Inform staff about supplements like fish oil or niacin"
    ],
    frequency: "Every 4-6 years for healthy adults; annually for those with high cholesterol, diabetes, or heart disease",
    parametersTested: [
      "Total Cholesterol",
      "LDL Cholesterol (Low-Density Lipoprotein)",
      "HDL Cholesterol (High-Density Lipoprotein)",
      "Triglycerides",
      "VLDL Cholesterol (Very Low-Density Lipoprotein)",
      "Total Cholesterol/HDL ratio",
      "LDL/HDL ratio"
    ],
    resultsTime: "Results available within 24-48 hours with cardiovascular risk assessment",
    partner: "Patrangsit Hospital"
  },
  {
    id: "diabetes-panel",
    name: "Diabetes Panel (HbA1c + Glucose)",
    subcategory: "Lab Tests",
    price: 1500,
    duration: 30,
    image: "/images/healthcare/diabetes-panel.svg",
    shortDescription: "Comprehensive diabetes screening and blood sugar monitoring",
    fullDescription: "The Diabetes Panel combines HbA1c and glucose testing to provide a complete picture of your blood sugar control. HbA1c shows average blood sugar levels over the past 2-3 months, while glucose testing measures current blood sugar levels.",
    whatIsDone: [
      "Blood glucose measurement (current blood sugar level)",
      "HbA1c test (glycated hemoglobin - 3-month average)",
      "Diabetes risk assessment and diagnosis",
      "Blood sugar control evaluation for existing diabetics"
    ],
    procedure: [
      "Single blood draw for both tests",
      "Fasting glucose sample collected first",
      "HbA1c sample (does not require fasting) collected simultaneously",
      "Samples processed using advanced laboratory analyzers",
      "Results compared against normal ranges and diabetes criteria",
      "Comprehensive report generated with interpretation"
    ],
    benefits: [
      "Early detection of prediabetes and diabetes",
      "Monitors long-term blood sugar control",
      "Assesses effectiveness of diabetes treatment",
      "Reduces risk of diabetes complications",
      "Guides dietary and medication adjustments"
    ],
    preparation: [
      "Fast for 8-10 hours for fasting glucose test",
      "Continue taking diabetes medications as prescribed",
      "Avoid vigorous exercise before the test",
      "Stay well-hydrated with water",
      "Record recent blood sugar readings if diabetic"
    ],
    frequency: "Every 3 months for diabetics; annually for prediabetics; every 3 years for routine screening in adults over 45",
    parametersTested: [
      "Fasting Blood Glucose (FBG)",
      "HbA1c (Glycated Hemoglobin)",
      "Random Blood Glucose (if applicable)",
      "Estimated Average Glucose (eAG)"
    ],
    resultsTime: "Results available within 24 hours with diabetes risk classification",
    partner: "Patrangsit Hospital"
  },
  {
    id: "thyroid-test",
    name: "Thyroid Function Test (TSH)",
    subcategory: "Lab Tests",
    price: 1800,
    duration: 30,
    image: "/images/healthcare/thyroid-test.svg",
    shortDescription: "Comprehensive thyroid hormone evaluation",
    fullDescription: "Thyroid Function Tests measure hormone levels to assess how well your thyroid gland is working. The thyroid controls metabolism, energy, temperature regulation, and many other vital body functions.",
    whatIsDone: [
      "TSH (Thyroid Stimulating Hormone) measurement",
      "Free T4 (Thyroxine) level analysis",
      "Free T3 (Triiodothyronine) evaluation if indicated",
      "Thyroid antibody testing if autoimmune disorder suspected"
    ],
    procedure: [
      "Blood sample collected at your preferred time",
      "No special fasting required for thyroid tests",
      "5-7ml blood drawn from arm vein",
      "Serum separated and analyzed for hormone levels",
      "Results interpreted by endocrinology specialists",
      "Comprehensive thyroid profile report generated"
    ],
    benefits: [
      "Diagnoses hypothyroidism and hyperthyroidism",
      "Monitors thyroid medication effectiveness",
      "Detects thyroid disorders causing fatigue or weight changes",
      "Evaluates fertility and pregnancy complications",
      "Screens for autoimmune thyroid disease"
    ],
    preparation: [
      "No fasting required",
      "Take thyroid medications after blood draw if possible",
      "Inform staff about biotin supplements (may affect results)",
      "Best tested in the morning for consistent results",
      "Avoid strenuous exercise before the test"
    ],
    frequency: "Every 6-12 months for those on thyroid medication; annually for routine screening in adults over 35, especially women",
    parametersTested: [
      "TSH (Thyroid Stimulating Hormone)",
      "Free T4 (Free Thyroxine)",
      "Free T3 (Free Triiodothyronine)",
      "Anti-TPO antibodies (if indicated)",
      "Thyroglobulin (if indicated)"
    ],
    resultsTime: "Results available within 48 hours with endocrinologist interpretation",
    partner: "Patrangsit Hospital"
  },
  {
    id: "liver-function",
    name: "Liver Function Test",
    subcategory: "Lab Tests",
    price: 1400,
    duration: 30,
    image: "/images/healthcare/liver-function.svg",
    shortDescription: "Comprehensive liver health assessment and enzyme analysis",
    fullDescription: "Liver Function Tests (LFTs) are a group of blood tests that measure enzymes, proteins, and substances produced or processed by the liver to assess its health and function.",
    whatIsDone: [
      "Liver enzyme measurement (ALT, AST, ALP)",
      "Bilirubin level analysis",
      "Protein and albumin assessment",
      "Evaluation of liver synthetic function"
    ],
    procedure: [
      "Fasting for 8-10 hours recommended",
      "Blood sample collected at your home",
      "Serum analyzed for multiple liver markers",
      "Results compared against normal reference ranges",
      "Hepatology specialist reviews abnormal findings",
      "Detailed report with clinical significance"
    ],
    benefits: [
      "Detects liver disease and damage",
      "Monitors medication side effects on liver",
      "Evaluates alcohol-related liver problems",
      "Screens for hepatitis and fatty liver disease",
      "Assesses liver function before surgery"
    ],
    preparation: [
      "Fast for 8-10 hours (water allowed)",
      "Avoid alcohol for 24-48 hours before test",
      "List all medications and supplements",
      "Avoid fatty foods the day before",
      "Stay hydrated with water"
    ],
    frequency: "Annually for routine screening; every 3-6 months when monitoring liver disease or taking hepatotoxic medications",
    parametersTested: [
      "ALT (Alanine Aminotransferase)",
      "AST (Aspartate Aminotransferase)",
      "ALP (Alkaline Phosphatase)",
      "Total and Direct Bilirubin",
      "Total Protein",
      "Albumin",
      "GGT (Gamma-Glutamyl Transferase)",
      "PT/INR (if coagulation assessment needed)"
    ],
    resultsTime: "Results available within 24-48 hours with hepatology consultation if needed",
    partner: "Patrangsit Hospital"
  },
  {
    id: "kidney-function",
    name: "Kidney Function Test",
    subcategory: "Lab Tests",
    price: 1300,
    duration: 30,
    image: "/images/healthcare/kidney-function.svg",
    shortDescription: "Comprehensive renal health and waste filtration assessment",
    fullDescription: "Kidney Function Tests evaluate how well your kidneys are filtering waste from your blood and maintaining electrolyte balance. These tests are essential for detecting kidney disease early.",
    whatIsDone: [
      "Creatinine and BUN measurement",
      "eGFR (estimated Glomerular Filtration Rate) calculation",
      "Electrolyte panel analysis",
      "Uric acid level evaluation"
    ],
    procedure: [
      "Blood sample collection at home",
      "Fasting recommended for accurate results",
      "Serum analyzed for kidney function markers",
      "eGFR calculated based on age, sex, and creatinine",
      "Results reviewed by nephrologist if abnormal",
      "Comprehensive kidney health report provided"
    ],
    benefits: [
      "Early detection of kidney disease",
      "Monitors chronic kidney disease progression",
      "Evaluates medication effects on kidneys",
      "Assesses kidney function in diabetes and hypertension",
      "Guides treatment decisions for kidney health"
    ],
    preparation: [
      "Fast for 8-10 hours recommended",
      "Avoid high-protein meals the day before",
      "Stay well-hydrated unless fluid-restricted",
      "List all medications, especially NSAIDs",
      "Avoid strenuous exercise 24 hours before"
    ],
    frequency: "Annually for adults over 60 or with risk factors; every 3-6 months for those with kidney disease, diabetes, or hypertension",
    parametersTested: [
      "Serum Creatinine",
      "Blood Urea Nitrogen (BUN)",
      "eGFR (estimated Glomerular Filtration Rate)",
      "Sodium, Potassium, Chloride",
      "Calcium and Phosphorus",
      "Uric Acid",
      "BUN/Creatinine Ratio"
    ],
    resultsTime: "Results available within 24 hours with kidney disease stage classification if applicable",
    partner: "Patrangsit Hospital"
  },
  {
    id: "vitamin-d-test",
    name: "Vitamin D Test",
    subcategory: "Lab Tests",
    price: 1600,
    duration: 30,
    image: "/images/healthcare/vitamin-d.svg",
    shortDescription: "Vitamin D level assessment for bone and immune health",
    fullDescription: "Vitamin D testing measures the level of 25-hydroxyvitamin D in your blood, which is essential for bone health, immune function, and overall wellness. Deficiency is common, especially in areas with limited sunlight.",
    whatIsDone: [
      "25-hydroxyvitamin D [25(OH)D] measurement",
      "Assessment of vitamin D sufficiency status",
      "Evaluation of bone health markers if indicated",
      "Calcium and PTH levels if deficiency suspected"
    ],
    procedure: [
      "No fasting required for vitamin D test",
      "Blood sample collected at your convenience",
      "Serum analyzed using specialized immunoassay",
      "Results categorized as deficient, insufficient, or sufficient",
      "Supplementation recommendations if low",
      "Follow-up testing schedule provided if needed"
    ],
    benefits: [
      "Detects vitamin D deficiency early",
      "Prevents bone disorders like osteoporosis",
      "Supports immune system function",
      "Reduces risk of fractures in elderly",
      "Guides vitamin D supplementation dosing"
    ],
    preparation: [
      "No fasting required",
      "Can be done at any time of day",
      "Inform about current vitamin D supplements",
      "List medications affecting vitamin D metabolism",
      "No special dietary restrictions needed"
    ],
    frequency: "Annually for at-risk individuals; after 3 months of supplementation to assess response; more frequently for severe deficiency",
    parametersTested: [
      "25-hydroxyvitamin D [25(OH)D]",
      "Calcium (if bone health concern)",
      "PTH (Parathyroid Hormone) if indicated",
      "Vitamin D status classification"
    ],
    resultsTime: "Results available within 48-72 hours with supplementation recommendations",
    partner: "Patrangsit Hospital"
  },

  // IV THERAPY
  {
    id: "hydration-iv",
    name: "Hydration IV Drip",
    subcategory: "IV Therapy",
    price: 2500,
    duration: 45,
    image: "/images/healthcare/hydration-iv.svg",
    shortDescription: "Rapid rehydration with electrolyte balance restoration",
    fullDescription: "Hydration IV Therapy delivers fluids, electrolytes, and essential minerals directly into your bloodstream for immediate absorption and rapid rehydration, bypassing the digestive system.",
    whatIsDone: [
      "Intravenous fluid administration (500-1000ml)",
      "Electrolyte replenishment (sodium, potassium, chloride)",
      "Vitamin B-complex infusion",
      "Mineral supplementation (magnesium, calcium)",
      "Vital signs monitoring throughout treatment"
    ],
    procedure: [
      "Registered nurse arrives with medical-grade IV equipment",
      "Health assessment and vital signs check",
      "IV catheter inserted into arm vein using sterile technique",
      "IV drip administered over 30-45 minutes",
      "Continuous monitoring for any reactions",
      "Catheter removed and bandage applied",
      "Post-treatment care instructions provided"
    ],
    benefits: [
      "Rapid rehydration more effective than oral fluids",
      "Relieves hangover symptoms quickly",
      "Treats dehydration from illness or exercise",
      "Boosts energy levels immediately",
      "Improves skin hydration and appearance",
      "Enhances athletic recovery"
    ],
    preparation: [
      "Eat a light meal before treatment",
      "Wear comfortable clothing with easy arm access",
      "Inform nurse of allergies or medical conditions",
      "List all current medications",
      "Avoid alcohol 24 hours before treatment"
    ],
    frequency: "As needed for dehydration; weekly for wellness maintenance; after intense physical activity or illness",
    resultsTime: "Immediate effects felt during and after treatment; full benefits within 24 hours",
    partner: "Patrangsit Hospital"
  },
  {
    id: "immunity-boost-iv",
    name: "Immunity Boost IV",
    subcategory: "IV Therapy",
    price: 3500,
    duration: 60,
    image: "/images/healthcare/immunity-iv.svg",
    shortDescription: "High-dose vitamin C and immune-supporting nutrients",
    fullDescription: "Immunity Boost IV combines high-dose vitamin C, zinc, B-vitamins, and antioxidants to strengthen your immune system and help fight off infections. Perfect for cold/flu season or when feeling run down.",
    whatIsDone: [
      "High-dose Vitamin C infusion (5-10 grams)",
      "Zinc supplementation for immune function",
      "B-Complex vitamins for energy",
      "Glutathione antioxidant boost",
      "Trace minerals for immune support"
    ],
    procedure: [
      "Pre-treatment health screening by nurse",
      "IV line established in comfortable setting",
      "Slow infusion over 45-60 minutes for optimal absorption",
      "Monitoring for any sensitivity reactions",
      "Relaxation time during infusion",
      "Post-treatment assessment",
      "Oral supplementation recommendations if needed"
    ],
    benefits: [
      "Strengthens immune system function",
      "Reduces duration and severity of colds",
      "Provides powerful antioxidant protection",
      "Increases energy and reduces fatigue",
      "Supports faster recovery from illness",
      "Protects against seasonal infections"
    ],
    preparation: [
      "Eat a full meal 1-2 hours before",
      "Stay well-hydrated the day before",
      "Inform nurse if pregnant or breastfeeding",
      "List any chronic health conditions",
      "Avoid caffeine immediately before treatment"
    ],
    frequency: "Weekly during cold/flu season; bi-weekly for immune support; monthly for maintenance wellness",
    resultsTime: "Immediate boost in energy; immune benefits accumulate over 48-72 hours; continued protection for 1-2 weeks",
    partner: "Patrangsit Hospital"
  },
  {
    id: "energy-boost-iv",
    name: "Energy Boost IV",
    subcategory: "IV Therapy",
    price: 3000,
    duration: 60,
    image: "/images/healthcare/energy-iv.svg",
    shortDescription: "B-vitamins and amino acids for sustained energy",
    fullDescription: "Energy Boost IV delivers a powerful combination of B-vitamins, amino acids, and energy-supporting nutrients directly to your cells for immediate and sustained energy enhancement.",
    whatIsDone: [
      "B-Complex vitamin infusion (B1, B2, B3, B5, B6, B12)",
      "Amino acid blend for cellular energy",
      "Magnesium for muscle function",
      "L-carnitine for fat metabolism",
      "Taurine for mental clarity"
    ],
    procedure: [
      "Energy level and fatigue assessment",
      "IV catheter placement",
      "Gradual infusion of energy-boosting nutrients",
      "Monitoring for optimal absorption",
      "Relaxation period during treatment",
      "Energy level evaluation post-treatment",
      "Lifestyle recommendations for sustained energy"
    ],
    benefits: [
      "Instant energy boost without caffeine crash",
      "Combats chronic fatigue",
      "Improves mental clarity and focus",
      "Enhances athletic performance",
      "Supports metabolism and weight management",
      "Reduces stress and improves mood"
    ],
    preparation: [
      "Have a balanced meal before treatment",
      "Get adequate sleep night before",
      "Reduce caffeine intake day of treatment",
      "Inform about fatigue symptoms and duration",
      "Wear comfortable, relaxing clothing"
    ],
    frequency: "Weekly for chronic fatigue; bi-weekly for performance enhancement; monthly for general wellness",
    resultsTime: "Energy boost felt within 30 minutes; peak benefits at 2-4 hours; sustained energy for 3-5 days",
    partner: "Patrangsit Hospital"
  },
  {
    id: "beauty-glow-iv",
    name: "Beauty Glow IV (Glutathione)",
    subcategory: "IV Therapy",
    price: 4000,
    duration: 60,
    image: "/images/healthcare/beauty-iv.svg",
    shortDescription: "Glutathione and antioxidants for skin brightening",
    fullDescription: "Beauty Glow IV features high-dose glutathione, the master antioxidant, combined with vitamin C, biotin, and collagen-supporting nutrients for radiant, youthful-looking skin from within.",
    whatIsDone: [
      "High-dose Glutathione infusion (1200-2400mg)",
      "Vitamin C for collagen production",
      "Biotin for hair, skin, and nails",
      "Vitamin E for skin protection",
      "Hyaluronic acid precursors for hydration"
    ],
    procedure: [
      "Skin assessment and beauty goals discussion",
      "IV line placement",
      "Slow glutathione infusion for safety and efficacy",
      "Comfortable treatment environment",
      "Monitoring throughout procedure",
      "Skin care recommendations",
      "Follow-up treatment schedule planning"
    ],
    benefits: [
      "Brightens and evens skin tone",
      "Reduces hyperpigmentation and dark spots",
      "Powerful anti-aging antioxidant",
      "Improves skin elasticity and texture",
      "Strengthens hair and nails",
      "Detoxifies and protects liver",
      "Enhances overall radiance"
    ],
    preparation: [
      "Remove makeup before treatment",
      "Stay hydrated for best results",
      "Avoid alcohol 48 hours before",
      "Inform about skin allergies or conditions",
      "Discuss current skincare routine"
    ],
    frequency: "Weekly for 4-8 weeks for visible skin lightening; monthly for maintenance; quarterly for anti-aging benefits",
    resultsTime: "Subtle glow within 24 hours; noticeable skin brightening after 3-4 sessions; optimal results after 8-12 treatments",
    partner: "Patrangsit Hospital"
  },

  // DOCTOR CONSULTATIONS
  {
    id: "general-practitioner",
    name: "General Practitioner Consultation",
    subcategory: "Doctor Consultations",
    price: 3000,
    duration: 45,
    image: "/images/healthcare/gp-consultation.svg",
    shortDescription: "Comprehensive home visit by licensed GP for general health concerns",
    fullDescription: "A General Practitioner (GP) home visit provides convenient, comprehensive medical care in the comfort of your home. Our experienced doctors can diagnose and treat a wide range of acute and chronic conditions.",
    whatIsDone: [
      "Complete medical history review",
      "Physical examination",
      "Vital signs assessment (BP, temperature, heart rate)",
      "Symptom evaluation and diagnosis",
      "Prescription of medications if needed",
      "Referral to specialists if required"
    ],
    procedure: [
      "Doctor arrives at scheduled time with medical equipment",
      "Initial consultation and medical history discussion",
      "Thorough physical examination",
      "Diagnostic assessment using portable equipment",
      "Discussion of findings and treatment plan",
      "Prescription provided via digital or paper format",
      "Follow-up schedule determined"
    ],
    benefits: [
      "Convenient healthcare without clinic visit",
      "Reduced exposure to infections in waiting rooms",
      "Ideal for elderly, bedridden, or mobility-limited patients",
      "Comprehensive care in familiar environment",
      "More time for detailed consultation",
      "Family members can participate in consultation"
    ],
    preparation: [
      "List current medications and supplements",
      "Prepare questions and concerns",
      "Have recent medical records available",
      "Note symptom patterns and duration",
      "Ensure quiet, comfortable examination space",
      "Have insurance information ready"
    ],
    frequency: "As needed for acute illness; quarterly for chronic disease management; annually for routine health check-up",
    resultsTime: "Immediate consultation and diagnosis; prescriptions provided same visit; follow-up scheduled as needed",
    partner: "Patrangsit Hospital"
  },
  {
    id: "pediatrician",
    name: "Pediatrician Consultation",
    subcategory: "Doctor Consultations",
    price: 3500,
    duration: 45,
    image: "/images/healthcare/pediatrician.svg",
    shortDescription: "Specialized child healthcare at home by pediatric specialist",
    fullDescription: "Pediatric home visits provide expert medical care for infants, children, and adolescents in the comfort of home. Our board-certified pediatricians specialize in child health, growth, and development.",
    whatIsDone: [
      "Age-appropriate health assessment",
      "Growth and development evaluation",
      "Physical examination tailored for children",
      "Diagnosis of childhood illnesses",
      "Vaccination updates if needed",
      "Parental guidance and health education"
    ],
    procedure: [
      "Pediatrician arrives with child-friendly equipment",
      "Parent consultation about concerns",
      "Gentle, age-appropriate examination",
      "Growth measurements (height, weight, head circumference)",
      "Developmental milestone assessment",
      "Treatment plan discussion with parents",
      "Written care instructions provided"
    ],
    benefits: [
      "Reduces child's anxiety from clinic visits",
      "Minimizes exposure to infections from sick children",
      "Convenient for parents with multiple children",
      "More relaxed consultation environment",
      "Better observation of child in home setting",
      "Extended consultation time for parental questions"
    ],
    preparation: [
      "Note child's symptoms, duration, and patterns",
      "Have vaccination records ready",
      "List any medications or allergies",
      "Prepare questions about growth/development",
      "Ensure comfortable temperature in room",
      "Have child's favorite toy for comfort"
    ],
    frequency: "As needed for illness; monthly for first year; quarterly for ages 1-3; annually for routine check-ups after age 3",
    resultsTime: "Immediate assessment and treatment plan; prescriptions provided same visit; developmental guidance given during consultation",
    partner: "Patrangsit Hospital"
  },

  // VACCINES
  {
    id: "flu-vaccine",
    name: "Flu Vaccine",
    subcategory: "Flu Vaccines",
    price: 800,
    duration: 30,
    image: "/images/healthcare/flu-vaccine.svg",
    shortDescription: "Annual influenza vaccination at home",
    fullDescription: "Seasonal flu vaccination protects against the most common influenza virus strains each year. The vaccine is updated annually based on global flu surveillance and is the best defense against flu complications.",
    whatIsDone: [
      "Health screening and allergy assessment",
      "Vaccine preparation and temperature verification",
      "Intramuscular injection (upper arm)",
      "15-minute observation period",
      "Vaccination record card provided",
      "Side effect monitoring instructions"
    ],
    procedure: [
      "Registered nurse arrives with vaccine cold chain",
      "Review of medical history and allergies",
      "Consent form completion",
      "Injection site cleaned with antiseptic",
      "Vaccine administered intramuscularly",
      "Brief observation for immediate reactions",
      "Post-vaccination care instructions provided"
    ],
    benefits: [
      "Prevents seasonal influenza infection",
      "Reduces severity if infection occurs",
      "Protects vulnerable family members",
      "Decreases risk of flu complications",
      "Reduces hospitalization risk by 40-60%",
      "Recommended for all ages 6 months and older"
    ],
    preparation: [
      "Inform about egg allergies (most flu vaccines contain egg)",
      "Not needed if currently have moderate-to-severe illness",
      "List previous vaccine reactions if any",
      "Wear short sleeves or loose clothing",
      "No fasting required",
      "Continue regular medications"
    ],
    frequency: "Annually, ideally before flu season (September-October); can be given throughout flu season",
    resultsTime: "Full immunity develops 2 weeks after vaccination; protection lasts entire flu season (6-8 months)",
    partner: "Patrangsit Hospital"
  },
  {
    id: "covid-vaccine",
    name: "COVID-19 Vaccine",
    subcategory: "Flu Vaccines",
    price: 1200,
    duration: 30,
    image: "/images/healthcare/covid-vaccine.svg",
    shortDescription: "COVID-19 vaccination and booster doses at home",
    fullDescription: "COVID-19 vaccination provides protection against severe illness, hospitalization, and death from coronavirus infection. We offer primary series and booster doses of approved vaccines.",
    whatIsDone: [
      "Pre-vaccination health assessment",
      "Vaccine type selection based on availability",
      "Intramuscular injection administration",
      "Digital vaccination certificate generation",
      "Post-vaccination monitoring (15-30 minutes)",
      "Side effect management guidance"
    ],
    procedure: [
      "Nurse arrives with WHO-approved vaccine",
      "Medical history and eligibility verification",
      "Vaccine information sheet review",
      "Injection given in upper arm muscle",
      "Extended observation period (15-30 min)",
      "Digital certificate uploaded to national system",
      "Next dose reminder scheduled if needed"
    ],
    benefits: [
      "Reduces risk of severe COVID-19 by 90%+",
      "Decreases hospitalization and ICU admission",
      "Protects against emerging variants",
      "Reduces long COVID risk",
      "Enables safer social interaction",
      "Required for travel to many countries"
    ],
    preparation: [
      "Delay if currently COVID-19 positive",
      "Wait 90 days after COVID infection",
      "Inform about immunocompromised status",
      "List bleeding disorders or blood thinners",
      "Wear short sleeves",
      "Stay hydrated before vaccination"
    ],
    frequency: "Primary series: 2 doses (3-8 weeks apart depending on vaccine); Booster: every 6-12 months or as recommended",
    resultsTime: "Partial immunity after first dose; full immunity 2 weeks after final dose; booster restores waning immunity",
    partner: "Patrangsit Hospital"
  },
  {
    id: "hepatitis-b",
    name: "Hepatitis B Vaccine",
    subcategory: "Flu Vaccines",
    price: 1000,
    duration: 30,
    image: "/images/healthcare/hepatitis-b.svg",
    shortDescription: "Hepatitis B vaccination series for liver protection",
    fullDescription: "Hepatitis B vaccine protects against hepatitis B virus, which can cause chronic liver infection, cirrhosis, and liver cancer. The vaccine is highly effective and recommended for all ages.",
    whatIsDone: [
      "Health screening and vaccination history review",
      "Vaccine dose preparation",
      "Intramuscular injection (deltoid muscle)",
      "Vaccination record documentation",
      "Schedule for remaining doses in series",
      "Antibody testing guidance if needed"
    ],
    procedure: [
      "Nurse reviews hepatitis B risk factors",
      "Confirmation of vaccine dose needed (1st, 2nd, or 3rd)",
      "Sterile injection technique",
      "Vaccine administered in upper arm",
      "Observation period",
      "Schedule card for next dose provided",
      "Post-vaccination instructions"
    ],
    benefits: [
      "Prevents hepatitis B infection (95% effective)",
      "Protects against chronic liver disease",
      "Reduces liver cancer risk",
      "Essential for healthcare workers",
      "Protects sexual partners and family members",
      "Lifelong immunity after complete series"
    ],
    preparation: [
      "Inform about previous hepatitis B infection",
      "List moderate-to-severe acute illnesses",
      "Note yeast allergies (vaccine contains yeast protein)",
      "Discuss pregnancy or breastfeeding status",
      "No fasting required",
      "Wear comfortable arm-accessible clothing"
    ],
    frequency: "3-dose series: Initial dose, 1 month later, 6 months after first dose; no booster typically needed",
    resultsTime: "Partial immunity after 2 doses; full protection 1 month after 3rd dose; immunity lasts lifetime in most people",
    partner: "Patrangsit Hospital"
  },

  // NURSE CARE
  {
    id: "nurse-visit-2h",
    name: "Nurse Visit (2 hours)",
    subcategory: "Nurse Care",
    price: 1500,
    duration: 120,
    image: "/images/healthcare/nurse-visit-2h.svg",
    shortDescription: "Professional nursing care and assistance at home",
    fullDescription: "Two-hour professional nursing visit provides comprehensive care including medication administration, vital signs monitoring, basic wound care, and health assessment in your home.",
    whatIsDone: [
      "Vital signs monitoring (BP, pulse, temperature, SpO2)",
      "Medication administration and management",
      "Basic wound care and dressing changes",
      "Blood glucose monitoring for diabetics",
      "Assistance with activities of daily living",
      "Health status documentation"
    ],
    procedure: [
      "Registered nurse arrives with medical supplies",
      "Initial assessment of patient condition",
      "Vital signs measurement and recording",
      "Administration of medications as prescribed",
      "Wound care or other nursing procedures",
      "Patient and family education",
      "Detailed care notes for physician review"
    ],
    benefits: [
      "Professional healthcare in comfortable home setting",
      "Reduces hospital readmissions",
      "Personalized one-on-one nursing attention",
      "Early detection of health changes",
      "Medication adherence support",
      "Family caregiver training and respite"
    ],
    preparation: [
      "Have medication list and prescriptions ready",
      "Prepare clean area for nursing procedures",
      "List questions or concerns",
      "Ensure medical supplies are available",
      "Have recent medical records accessible",
      "Arrange comfortable space for care"
    ],
    frequency: "Daily for post-surgical care; 2-3 times weekly for wound care; weekly for medication management; as prescribed by physician",
    resultsTime: "Immediate care provided during visit; health status report sent to doctor after each visit",
    partner: "Patrangsit Hospital"
  },
  {
    id: "nurse-visit-4h",
    name: "Nurse Visit (4 hours)",
    subcategory: "Nurse Care",
    price: 2800,
    duration: 240,
    image: "/images/healthcare/nurse-visit-4h.svg",
    shortDescription: "Extended nursing care for complex needs",
    fullDescription: "Four-hour professional nursing visit provides comprehensive care for patients with complex medical needs, including extensive wound care, IV therapy management, and continuous monitoring.",
    whatIsDone: [
      "Comprehensive health assessment",
      "Multiple medication administrations",
      "Advanced wound care and dressing",
      "IV line care and management",
      "Catheter care (urinary/central line)",
      "Continuous vital signs monitoring",
      "Patient mobility assistance",
      "Personal hygiene assistance"
    ],
    procedure: [
      "Registered nurse with advanced training arrives",
      "Thorough initial assessment",
      "Multiple rounds of vital signs monitoring",
      "Scheduled medication administration",
      "Complex nursing procedures performed",
      "Nutritional intake monitoring",
      "Documentation of all care provided",
      "Detailed report to attending physician"
    ],
    benefits: [
      "Intensive nursing care for complex conditions",
      "Suitable for post-surgical recovery",
      "Reduces need for hospital stays",
      "Continuous professional monitoring",
      "Management of multiple medical devices",
      "Comprehensive family caregiver education"
    ],
    preparation: [
      "All prescribed medications available",
      "Medical equipment in working order",
      "Clean linens and supplies stocked",
      "Emergency contact numbers accessible",
      "Recent medical records and care plans",
      "Comfortable environment prepared"
    ],
    frequency: "Daily for intensive post-op care; 3-5 times weekly for chronic complex conditions; as prescribed for home recovery programs",
    resultsTime: "Continuous care throughout 4-hour visit; comprehensive report provided to physician same day",
    partner: "Patrangsit Hospital"
  },
  {
    id: "wound-care",
    name: "Wound Care & Dressing",
    subcategory: "Nurse Care",
    price: 1200,
    duration: 60,
    image: "/images/healthcare/wound-care.svg",
    shortDescription: "Specialized wound care and dressing changes at home",
    fullDescription: "Professional wound care service provides expert assessment, cleaning, and dressing of surgical wounds, pressure ulcers, diabetic foot ulcers, and other chronic wounds using advanced techniques.",
    whatIsDone: [
      "Wound assessment (size, depth, drainage)",
      "Wound cleaning with sterile solution",
      "Debridement if necessary",
      "Application of appropriate dressing",
      "Infection monitoring",
      "Pain management during procedure",
      "Wound photography for healing tracking"
    ],
    procedure: [
      "Certified wound care nurse arrives with supplies",
      "Gentle removal of old dressing",
      "Wound examination and documentation",
      "Sterile wound cleaning technique",
      "Application of prescribed wound care products",
      "New sterile dressing application",
      "Instruction on wound care between visits",
      "Healing progress report to physician"
    ],
    benefits: [
      "Promotes faster wound healing",
      "Reduces infection risk with sterile technique",
      "Prevents scarring with proper care",
      "Early detection of complications",
      "Pain management during dressing changes",
      "Avoids multiple trips to clinic"
    ],
    preparation: [
      "Take pain medication 30 min before if prescribed",
      "Have clean towels and disposal bags ready",
      "Ensure good lighting in treatment area",
      "List any changes in wound condition",
      "Note increased pain or odor",
      "Have wound care supplies available"
    ],
    frequency: "Daily to every other day depending on wound type; surgical wounds: every 2-3 days; chronic wounds: 2-3 times weekly",
    resultsTime: "Immediate professional care; healing progress assessed at each visit; improvement typically seen within 1-2 weeks",
    partner: "Patrangsit Hospital"
  },
  {
    id: "post-surgery-care",
    name: "Post-Surgery Care",
    subcategory: "Nurse Care",
    price: 2000,
    duration: 90,
    image: "/images/healthcare/post-surgery.svg",
    shortDescription: "Specialized post-operative care and recovery support",
    fullDescription: "Comprehensive post-surgical nursing care helps patients recover safely at home after surgery. Our specialized nurses provide wound care, pain management, and monitoring for complications.",
    whatIsDone: [
      "Surgical site inspection and care",
      "Vital signs monitoring",
      "Pain assessment and management",
      "Drain and tube management",
      "Medication administration",
      "Mobility assistance",
      "Complication surveillance",
      "Patient education"
    ],
    procedure: [
      "Post-operative nurse reviews surgical records",
      "Comprehensive assessment of surgical recovery",
      "Surgical wound/incision care",
      "Management of surgical drains if present",
      "Administration of post-op medications",
      "Monitoring for signs of infection or bleeding",
      "Assistance with prescribed exercises",
      "Communication with surgeon about progress"
    ],
    benefits: [
      "Safe recovery in comfortable home environment",
      "Reduces hospital readmission rates",
      "Early detection of post-operative complications",
      "Professional wound and drain management",
      "Pain control optimization",
      "Faster return to normal activities",
      "Family education on caregiving"
    ],
    preparation: [
      "Have all post-operative instructions accessible",
      "Prepare elevated resting area if needed",
      "Stock prescribed medications",
      "Have ice packs or heating pads ready",
      "Arrange help for mobility if needed",
      "Keep surgeon's contact information available"
    ],
    frequency: "Daily for first 3-5 days post-surgery; then every other day for 1-2 weeks; weekly thereafter until full recovery",
    resultsTime: "Immediate post-operative support; healing progress monitored at each visit; full recovery timeline varies by surgery type",
    partner: "Patrangsit Hospital"
  },

  // PHYSIOTHERAPY
  {
    id: "physiotherapy-general",
    name: "General Physiotherapy Session",
    subcategory: "Physiotherapy",
    price: 2500,
    duration: 60,
    image: "/images/healthcare/physiotherapy-general.svg",
    shortDescription: "Comprehensive physical therapy for pain and mobility",
    fullDescription: "General physiotherapy provides treatment for musculoskeletal pain, movement disorders, and functional limitations through manual therapy, therapeutic exercises, and modalities.",
    whatIsDone: [
      "Comprehensive physical assessment",
      "Pain and range of motion evaluation",
      "Manual therapy techniques",
      "Therapeutic exercise prescription",
      "Stretching and strengthening",
      "Posture and gait analysis",
      "Home exercise program instruction"
    ],
    procedure: [
      "Licensed physiotherapist arrives with equipment",
      "Initial or ongoing assessment",
      "Manual therapy (mobilization, massage)",
      "Guided therapeutic exercises",
      "Application of modalities if needed",
      "Functional movement training",
      "Progress evaluation",
      "Home exercise program updates"
    ],
    benefits: [
      "Reduces pain and inflammation",
      "Improves range of motion and flexibility",
      "Increases strength and endurance",
      "Enhances functional independence",
      "Prevents future injuries",
      "Avoids or delays need for surgery",
      "Improves quality of life"
    ],
    preparation: [
      "Wear comfortable, loose clothing",
      "Have open floor space for exercises",
      "List current pain levels and limitations",
      "Note activities that increase pain",
      "Take pain medication if prescribed",
      "Prepare questions about condition"
    ],
    frequency: "2-3 times per week for acute conditions; weekly for chronic management; maintenance sessions monthly after improvement",
    resultsTime: "Some relief after first session; significant improvement after 4-6 sessions; optimal results after 8-12 weeks",
    partner: "Patrangsit Hospital"
  },
  {
    id: "sports-injury-rehab",
    name: "Sports Injury Rehabilitation",
    subcategory: "Physiotherapy",
    price: 3000,
    duration: 60,
    image: "/images/healthcare/sports-rehab.svg",
    shortDescription: "Specialized rehabilitation for athletic injuries",
    fullDescription: "Sports injury rehabilitation focuses on returning athletes to optimal performance after injury through sport-specific exercises, functional training, and progressive return-to-play protocols.",
    whatIsDone: [
      "Sports-specific injury assessment",
      "Functional movement screening",
      "Sport-specific rehabilitation exercises",
      "Plyometric and agility training",
      "Strength and conditioning",
      "Return-to-play testing",
      "Injury prevention strategies"
    ],
    procedure: [
      "Sports physiotherapist conducts assessment",
      "Injury mechanism analysis",
      "Progressive strengthening program",
      "Functional and sport-specific drills",
      "Cardiovascular reconditioning",
      "Performance testing",
      "Return-to-play clearance when ready",
      "Ongoing injury prevention guidance"
    ],
    benefits: [
      "Faster return to sports safely",
      "Reduces re-injury risk",
      "Restores athletic performance",
      "Addresses biomechanical issues",
      "Improves sports-specific strength",
      "Psychological recovery support",
      "Performance enhancement"
    ],
    preparation: [
      "Wear athletic clothing and proper shoes",
      "Have injury details and imaging ready",
      "Clear adequate exercise space",
      "Note sport-specific demands",
      "List performance goals",
      "Bring any braces or supports used"
    ],
    frequency: "3-4 times per week during acute rehab phase; 2-3 times weekly during strengthening phase; weekly for return-to-play phase",
    resultsTime: "Progressive improvement over 6-12 weeks; full return to sport in 3-6 months depending on injury severity",
    partner: "Patrangsit Hospital"
  },
  {
    id: "post-stroke-rehab",
    name: "Post-Stroke Rehabilitation",
    subcategory: "Physiotherapy",
    price: 3500,
    duration: 90,
    image: "/images/healthcare/stroke-rehab.svg",
    shortDescription: "Comprehensive rehabilitation for stroke recovery",
    fullDescription: "Post-stroke rehabilitation helps stroke survivors regain independence through intensive physical therapy, functional training, and neuroplasticity-based exercises to restore movement and function.",
    whatIsDone: [
      "Neurological assessment",
      "Strength and sensation testing",
      "Balance and coordination training",
      "Gait re-education",
      "Upper extremity functional training",
      "Transfer and mobility training",
      "Activities of daily living practice",
      "Caregiver training"
    ],
    procedure: [
      "Neuro-physiotherapist performs assessment",
      "Task-oriented functional exercises",
      "Constraint-induced movement therapy",
      "Balance and postural training",
      "Assisted and active exercises",
      "Walking and mobility practice",
      "Fine motor skill activities",
      "Home adaptation recommendations"
    ],
    benefits: [
      "Improves motor function and strength",
      "Enhances balance and prevents falls",
      "Increases independence in daily activities",
      "Promotes brain neuroplasticity",
      "Reduces spasticity and pain",
      "Improves quality of life",
      "Provides caregiver education and support"
    ],
    preparation: [
      "Wear non-slip footwear",
      "Have walking aids ready if used",
      "Clear pathways for mobility practice",
      "Have caregiver present for training",
      "List functional goals and challenges",
      "Ensure safe home environment"
    ],
    frequency: "Daily or 5 times per week in early recovery; 3 times weekly in ongoing rehabilitation; maintenance sessions as needed",
    resultsTime: "Gradual improvement over months; maximum recovery often within 6-12 months; continued gains possible beyond first year",
    partner: "Patrangsit Hospital"
  },

  // PSYCHOTHERAPY
  {
    id: "individual-therapy",
    name: "Individual Therapy Session",
    subcategory: "Psychotherapy & Counselling",
    price: 2500,
    duration: 60,
    image: "/images/healthcare/individual-therapy.svg",
    shortDescription: "One-on-one counseling for mental health support",
    fullDescription: "Individual therapy provides a safe, confidential space to explore thoughts, feelings, and behaviors with a licensed therapist. Evidence-based approaches help address mental health concerns and improve wellbeing.",
    whatIsDone: [
      "Mental health assessment",
      "Goal-setting for therapy",
      "Evidence-based therapeutic interventions",
      "Coping skills development",
      "Emotional processing and support",
      "Homework assignments",
      "Progress evaluation"
    ],
    procedure: [
      "Licensed therapist arrives for home session",
      "Private, comfortable therapy space arranged",
      "Initial or ongoing assessment",
      "Therapeutic conversation and interventions",
      "Skills practice and psychoeducation",
      "Session summary and homework",
      "Next session scheduling",
      "Crisis plan review if needed"
    ],
    benefits: [
      "Safe space to process emotions and experiences",
      "Learn effective coping strategies",
      "Reduce symptoms of depression and anxiety",
      "Improve self-awareness and insight",
      "Enhance relationships and communication",
      "Develop problem-solving skills",
      "Increase overall life satisfaction"
    ],
    preparation: [
      "Arrange private, quiet space for session",
      "Minimize distractions and interruptions",
      "Reflect on topics to discuss",
      "Complete any assigned homework",
      "Be open and honest during session",
      "Have tissues available if needed"
    ],
    frequency: "Weekly for active treatment; bi-weekly for maintenance; more frequent during crisis periods",
    resultsTime: "Some relief after first session; noticeable improvement after 4-6 sessions; significant changes after 3-6 months",
    partner: "Patrangsit Hospital"
  },
  {
    id: "couples-therapy",
    name: "Couples Therapy",
    subcategory: "Psychotherapy & Counselling",
    price: 3500,
    duration: 90,
    image: "/images/healthcare/couples-therapy.svg",
    shortDescription: "Relationship counseling for couples",
    fullDescription: "Couples therapy helps partners improve communication, resolve conflicts, and strengthen their relationship. Our therapists use evidence-based approaches like Gottman Method and Emotionally Focused Therapy.",
    whatIsDone: [
      "Relationship assessment",
      "Communication skills training",
      "Conflict resolution strategies",
      "Emotional regulation techniques",
      "Trust and intimacy building",
      "Problem-solving for specific issues",
      "Homework exercises for partners"
    ],
    procedure: [
      "Therapist meets both partners",
      "Relationship dynamics assessment",
      "Structured communication exercises",
      "Guided conflict resolution practice",
      "Exploration of relationship patterns",
      "Skills practice during session",
      "Between-session assignments",
      "Progress review and goal adjustment"
    ],
    benefits: [
      "Improves communication and understanding",
      "Resolves conflicts constructively",
      "Rebuilds trust and intimacy",
      "Strengthens emotional connection",
      "Addresses specific relationship issues",
      "Prevents escalation of problems",
      "Enhances relationship satisfaction"
    ],
    preparation: [
      "Both partners commit to attendance",
      "Reflect on relationship concerns",
      "Approach with open mind and willingness",
      "Minimize distractions during session",
      "Prepare specific examples if needed",
      "Agree to confidentiality of session content"
    ],
    frequency: "Weekly for intensive work; bi-weekly for ongoing support; maintenance sessions as needed",
    resultsTime: "Improved communication skills within 2-4 sessions; relationship satisfaction improvement after 8-12 sessions",
    partner: "Patrangsit Hospital"
  },
  {
    id: "family-therapy",
    name: "Family Therapy",
    subcategory: "Psychotherapy & Counselling",
    price: 4000,
    duration: 90,
    image: "/images/healthcare/family-therapy.svg",
    shortDescription: "Family counseling for relationship and communication issues",
    fullDescription: "Family therapy addresses family dynamics, improves communication, and resolves conflicts involving multiple family members. Suitable for families dealing with transitions, behavioral issues, or relationship challenges.",
    whatIsDone: [
      "Family system assessment",
      "Family dynamics exploration",
      "Communication pattern improvement",
      "Conflict resolution training",
      "Boundary setting",
      "Role clarification",
      "Family homework activities"
    ],
    procedure: [
      "Therapist meets all participating family members",
      "Assessment of family structure and dynamics",
      "Facilitated family discussions",
      "Communication skill practice",
      "Problem-solving exercises",
      "Individual perspectives honored",
      "Family action plan developed",
      "Regular progress reviews"
    ],
    benefits: [
      "Improves family communication",
      "Resolves multi-person conflicts",
      "Addresses behavioral issues in children/teens",
      "Navigates family transitions successfully",
      "Strengthens family bonds",
      "Develops healthy boundaries",
      "Promotes mutual understanding"
    ],
    preparation: [
      "All participating members agree to attend",
      "Private space large enough for all",
      "List family concerns and goals",
      "Approach with openness to change",
      "Minimize external distractions",
      "Agree to respect all perspectives"
    ],
    frequency: "Weekly for 6-8 sessions initially; bi-weekly for ongoing work; booster sessions as needed",
    resultsTime: "Communication improvements within 3-4 sessions; behavioral changes emerge after 6-10 sessions",
    partner: "Patrangsit Hospital"
  },
  {
    id: "cbt-session",
    name: "Cognitive Behavioral Therapy (CBT)",
    subcategory: "Psychotherapy & Counselling",
    price: 3000,
    duration: 60,
    image: "/images/healthcare/cbt-therapy.svg",
    shortDescription: "Evidence-based therapy for thought and behavior patterns",
    fullDescription: "CBT is a structured, goal-oriented therapy that helps identify and change negative thought patterns and behaviors. Highly effective for anxiety, depression, OCD, PTSD, and many other conditions.",
    whatIsDone: [
      "Thought pattern identification",
      "Cognitive distortion recognition",
      "Behavioral activation",
      "Exposure therapy (if applicable)",
      "Coping skills development",
      "Thought records and journals",
      "Between-session practice assignments"
    ],
    procedure: [
      "CBT-trained therapist begins session",
      "Homework review from previous session",
      "Current issues and symptoms assessment",
      "Cognitive restructuring exercises",
      "Behavioral experiments planning",
      "Skills practice during session",
      "New homework assignments",
      "Progress measurement using standardized tools"
    ],
    benefits: [
      "Reduces symptoms of depression and anxiety",
      "Changes unhelpful thinking patterns",
      "Develops practical coping skills",
      "Evidence-based and time-limited",
      "Prevents relapse of symptoms",
      "Empowers self-management",
      "Applicable to many conditions"
    ],
    preparation: [
      "Complete thought records if assigned",
      "Bring journal or notes about symptoms",
      "Be ready to practice new skills",
      "Prepare examples of situations",
      "Approach with willingness to experiment",
      "Commit to between-session practice"
    ],
    frequency: "Weekly for 12-20 sessions typically; may extend for complex conditions; maintenance sessions after improvement",
    resultsTime: "Symptom reduction often seen by session 4-6; significant improvement after 12-16 sessions; skills learned are lifelong",
    partner: "Patrangsit Hospital"
  },
  {
    id: "anxiety-depression",
    name: "Anxiety & Depression Counselling",
    subcategory: "Psychotherapy & Counselling",
    price: 2800,
    duration: 60,
    image: "/images/healthcare/anxiety-depression.svg",
    shortDescription: "Specialized counseling for anxiety and depression",
    fullDescription: "Specialized therapy targeting anxiety disorders and depression using integrative approaches including CBT, mindfulness, and supportive counseling to reduce symptoms and improve functioning.",
    whatIsDone: [
      "Symptom assessment and monitoring",
      "Anxiety and mood disorder psychoeducation",
      "Relaxation and breathing techniques",
      "Cognitive restructuring for anxious thoughts",
      "Behavioral activation for depression",
      "Mindfulness practices",
      "Safety planning if needed"
    ],
    procedure: [
      "Therapist specializing in mood/anxiety disorders",
      "Standardized symptom assessment (GAD-7, PHQ-9)",
      "Evidence-based interventions",
      "Relaxation training practice",
      "Thought challenging exercises",
      "Behavioral activity scheduling",
      "Crisis management plan review",
      "Regular symptom tracking"
    ],
    benefits: [
      "Reduces anxiety and depression symptoms",
      "Improves daily functioning",
      "Develops emotion regulation skills",
      "Decreases worry and rumination",
      "Increases engagement in life activities",
      "Improves sleep and energy",
      "Enhances overall wellbeing"
    ],
    preparation: [
      "Track mood and anxiety levels daily",
      "Note triggers and patterns",
      "List questions about symptoms",
      "Practice previously learned skills",
      "Be honest about symptom severity",
      "Have emergency contacts accessible"
    ],
    frequency: "Weekly during acute phase; bi-weekly as symptoms improve; monthly for maintenance",
    resultsTime: "Initial relief within 2-3 sessions; clinically significant improvement after 8-12 sessions; continued practice maintains gains",
    partner: "Patrangsit Hospital"
  }
];

// Helper function to get service details by ID
export function getHealthcareServiceDetail(serviceId: string): HealthcareServiceDetail | undefined {
  return HEALTHCARE_SERVICES.find(service => service.id === serviceId);
}

// Helper function to get services by subcategory
export function getHealthcareServicesBySubcategory(subcategory: string): HealthcareServiceDetail[] {
  return HEALTHCARE_SERVICES.filter(service => service.subcategory === subcategory);
}
