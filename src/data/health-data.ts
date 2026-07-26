import doctorKavyaImage from "@/assets/doctor-kavya.jpg";
import doctorVikramImage from "@/assets/doctor-vikram.jpg";
import doctorRheaImage from "@/assets/doctor-rhea.jpg";

import yogaArjunImage from "@/assets/yoga-arjun.jpg";
import yogaMiraImage from "@/assets/yoga-mira.jpg";
import yogaNeelImage from "@/assets/yoga-neel.jpg";

export const metricsCards = [
  { title: "Health Score", value: "86", change: "+4.2%", trend: "up" },
  { title: "Resting Heart Rate", value: "68 bpm", change: "-2.1%", trend: "up" },
  { title: "Sleep Quality", value: "7h 42m", change: "+18 min", trend: "up" },
  { title: "Water Intake", value: "2.1 L", change: "84% goal", trend: "neutral" },
];

export const healthTrend = [
  { day: "Mon", score: 79, sleep: 7.1, steps: 6800 },
  { day: "Tue", score: 81, sleep: 7.4, steps: 7200 },
  { day: "Wed", score: 82, sleep: 7.6, steps: 8400 },
  { day: "Thu", score: 83, sleep: 7.3, steps: 7900 },
  { day: "Fri", score: 84, sleep: 7.8, steps: 9100 },
  { day: "Sat", score: 85, sleep: 8, steps: 9800 },
  { day: "Sun", score: 86, sleep: 7.7, steps: 8700 },
];

export const upcomingAppointments = [
  { id: "AP-3188", doctor: "Dr. Kavya Menon", specialty: "Integrative Medicine", date: "Today", time: "5:30 PM", mode: "Video" },
  { id: "AP-3197", doctor: "Dr. Meera Iyer", specialty: "Nutrition", date: "Jul 8", time: "11:15 AM", mode: "In Clinic" },
  { id: "AP-3202", doctor: "Dr. Rohan Das", specialty: "Yoga Therapy", date: "Jul 10", time: "7:00 AM", mode: "Session" },
];

export const doctors = [
  { id: "dr-kavya-menon", name: "Dr. Kavya Menon", specialty: "Integrative Medicine", experience: "14 years", rating: 4.9, fee: "₹1,800", availability: "Next available today", image: doctorKavyaImage },
  { id: "dr-vikram-shah", name: "Dr. Vikram Shah", specialty: "Cardio-Metabolic Care", experience: "11 years", rating: 4.8, fee: "₹1,600", availability: "Available tomorrow", image: doctorVikramImage },
  { id: "dr-rhea-singh", name: "Dr. Rhea Singh", specialty: "Lifestyle Medicine", experience: "9 years", rating: 4.7, fee: "₹1,400", availability: "Slots open this week", image: doctorRheaImage },
];

export const nutritionists: any[] = [];

export const yogaExperts = [
  { id: "yg-01", name: "Arjun Dev", specialty: "Therapeutic Yoga", sessions: 210, rating: 4.9, image: yogaArjunImage },
  { id: "yg-02", name: "Mira Patel", specialty: "Breathwork", sessions: 168, rating: 4.8, image: yogaMiraImage },
  { id: "yg-03", name: "Neel Joshi", specialty: "Mobility & Spine", sessions: 192, rating: 4.7, image: yogaNeelImage },
];

export const blogPosts = [
  {
    id: "understanding-dosha-balance",
    title: "Understanding Dosha Balance for Daily Energy",
    category: "Ayurveda",
    date: "Jul 22, 2026",
    readTime: "6 min read",
    author: "Dr. Kavya Menon (Ayurvedic Physician)",
    image: "/articles/dosha_balance.png",
    excerpt: "A practical guide to aligning your meals, movement, and sleep with your unique Vata, Pitta, and Kapha constitution.",
    content: `Ayurveda recognizes that health is not a one-size-fits-all formula. According to traditional Indian medicine, every individual possesses a unique constitution comprising three primary energies or Doshas: Vata (Air & Ether), Pitta (Fire & Water), and Kapha (Earth & Water).

When these energies are in harmony, you experience vibrant stamina, sharp mental clarity, effortless digestion, and sound sleep. However, modern stressors, irregular meal times, processed foods, and late-night screen exposure can disrupt this delicate equilibrium.

Key Principles to Restore Balance:
1. Vata Alignment: If you experience dry skin, anxiety, or irregular digestion, favor warm, cooked meals cooked in ghee or sesame oil. Engage in gentle grounding movement like Yin Yoga.
2. Pitta Balancing: For acidity, irritability, or inflammatory skin flares, avoid excessively spicy or fermented foods. Incorporate cooling herbs like cilantro, mint, and coconut water.
3. Kapha Revitalization: For sluggishness or water retention, incorporate warming spices such as ginger, black pepper, and cinnamon. Engage in morning cardiovascular exercise to stimulate lymphatic circulation.

By tuning into your body's subtle daily signals, you can fine-tune your nutrition and lifestyle routines for long-term vitality.`
  },
  {
    id: "sleep-and-inflammation",
    title: "How Sleep Quality Impacts Cellular Inflammation",
    category: "Lifestyle",
    date: "Jul 18, 2026",
    readTime: "8 min read",
    author: "Dr. Vikram Shah (Cardio-Metabolic Care)",
    image: "/articles/sleep_inflammation.png",
    excerpt: "What your wearable data may be missing and how to build deeper recovery habits to lower systemic inflammatory markers.",
    content: `Chronic low-grade inflammation is widely recognized as a root driver behind metabolic syndrome, cardiovascular disease, and premature cellular aging. While diet and exercise receive significant attention, deep restorative sleep remains the primary biological window for cellular repair and cytokine regulation.

During slow-wave deep sleep, your body suppresses pro-inflammatory cytokines such as Interleukin-6 (IL-6) and Tumor Necrosis Factor-alpha (TNF-a). Simultaneously, the brain's glymphatic system clears metabolic waste products accumulated throughout waking hours.

Actionable Sleep Optimization Strategies:
• Maintain Circadian Rhythm: Go to bed and wake up within the same 30-minute window daily, including weekends.
• Digital Sunset: Power off blue-light emitting devices 60 to 90 minutes before bedtime to prevent melatonin suppression.
• Evening Hydration & Temperature: Keep bedroom ambient temperature cool (around 18-20°C / 65-68°F) and consume calming warm chamomile or ashwagandha tea.`
  },
  {
    id: "gut-microbiome-rejuvenation",
    title: "Gut Microbiome & Agni: Rejuvenating Digestive Fire",
    category: "Nutrition",
    date: "Jul 15, 2026",
    readTime: "7 min read",
    author: "Dr. Meera Iyer (Clinical Nutritionist)",
    image: "/articles/gut_health.png",
    excerpt: "Ancient digestive fire (Agni) concepts combined with modern microbiome science to eliminate bloating and IBS symptoms.",
    content: `The human gut harbors over 100 trillion microorganisms that influence immune function, neurotransmitter synthesis, and nutrient absorption. In Ayurveda, this metabolic engine is known as 'Agni' or digestive fire.

When Agni is impaired (Agni Mandya), unassimilated metabolic toxins known as 'Ama' accumulate in tissues, manifesting as chronic bloating, sluggishness, and brain fog.

Key Dietary Protocols for Gut Health:
• Prebiotic Diversity: Incorporate fiber-rich foods such as asparagus, Jerusalem artichokes, green banana flour, and fermented kitchari.
• Spice Therapeutics: Utilize cumin, coriander, and fennel (CCF Tea) between meals to ignite digestive enzyme secretion without overheating Pitta.
• Mindful Eating Pace: Chew each bite thoroughly and avoid iced beverages during meals, which quench metabolic digestive enzymes.`
  },
  {
    id: "spine-decompression-posture",
    title: "Spine Decompression: 5 Postures for Desk Workers",
    category: "Yoga & Posture",
    date: "Jul 12, 2026",
    readTime: "5 min read",
    author: "Arjun Dev (Therapeutic Yoga Master)",
    image: "/articles/yoga_posture.png",
    excerpt: "Targeted posture flows and lumbar decompression stretches to reverse forward-head posture and sitting strain.",
    content: `Sitting at a desk for 8+ hours a day exerts up to 180% additional pressure on lumbar intervertebral discs compared to standing. Over time, this causes disc compression, tight hip flexors, and weakened deep core stabilizers.

Essential Daily Mobility Sequence:
1. Marjaryasana-Bitilasana (Cat-Cow Pose): 10 breath-synchronized cycles to restore spinal fluid circulation.
2. Bhujangasana (Gentle Cobra): 3 holds of 15 seconds to strengthen erector spinae muscles and counteract thoracic kyphosis.
3. Setu Bandhasana (Bridge Pose): Activates gluteal muscles while decompressing cervical & lumbar vertebrae.
4. Balasana (Child’s Pose): 2 minutes of deep diaphragmatic breathing to release sacral tension.
5. Supta Matsyendrasana (Supine Spinal Twist): Releases lateral lumbar strain and stimulates abdominal organs.`
  },
  {
    id: "preventive-health-dashboard",
    title: "Designing Your Personal Preventive Health Dashboard",
    category: "Digital Health",
    date: "Jul 10, 2026",
    readTime: "9 min read",
    author: "Dr. Rhea Singh (Lifestyle Medicine)",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
    excerpt: "How to combine blood biomarkers, wearable biometric data, and clinical coaching into one actionable preventative routine.",
    content: `Modern medicine is shifting from reactive disease management to proactive longevity optimization. By tracking key biomarkers—such as fasting insulin, hs-CRP, ApoB, and Heart Rate Variability (HRV)—you gain real-time visibility into your physiological trajectory long before symptoms emerge.

Key Metrics to Monitor Quarterly:
• Metabolic Health: Fasting blood glucose, HbA1c, and Lipid Fractionation.
• Inflammatory Status: High-Sensitivity C-Reactive Protein (hs-CRP) & Homocysteine.
• Recovery Telemetry: Resting Heart Rate (RHR) and HRV trends logged via smart wearables.`
  },
  {
    id: "stress-vagus-nerve-activation",
    title: "Vagus Nerve Activation for Chronic Stress & Anxiety",
    category: "Mental Health",
    date: "Jul 08, 2026",
    readTime: "6 min read",
    author: "Mira Patel (Breathwork & Meditation Expert)",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    excerpt: "Scientific somatic techniques to stimulate parasympathetic vagal tone and instantly lower serum cortisol.",
    content: `The vagus nerve is the longest cranial nerve in the body, serving as the main highway of the parasympathetic nervous system. When vagal tone is high, your body recovers rapidly from acute stressors, heart rate stabilizes, and digestion functions optimally.

Simple Somatic Vagal Exercises:
• 4-7-8 Diaphragmatic Breathing: Inhale through nose for 4 seconds, hold for 7 seconds, exhale slowly through pursed lips for 8 seconds.
• Gargling & Humming (Bhramari Pranayama): Vibration stimulates vagal nerve endings in the throat pharynx.
• Cold Water Face Immersion: Triggers the mammalian dive reflex, rapidly dropping heart rate.`
  },
  {
    id: "boosting-immunity-naturopathy",
    title: "Immunity Protocol: Ancient Herbs Meets Modern Immunology",
    category: "Immunity",
    date: "Jul 05, 2026",
    readTime: "7 min read",
    author: "Dr. Kavya Menon (Integrative Medicine)",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
    excerpt: "Botanical immunomodulators like Giloy, Ashwagandha, and Vitamin D3 strategies for year-round immune defense.",
    content: `Immunity is not merely an on/off switch; it is a complex, adaptive surveillance network. Botanicals known as immunomodulators help calibrate immune responses—preventing overactive autoimmune reactions while bolstering innate defense against viral invaders.

Top Immunomodulatory Botanicals:
• Guduchi (Giloy): Known as 'Amrita' (nectar of life), elevates white blood cell phagocytosis.
• Tulsi (Holy Basil): Rich in eugenol and ursolic acid to reduce respiratory mucus and inflammation.
• Zinc & Vitamin D3 Synergism: Maintains tight junction integrity in throat and gut mucosal linings.`
  },
  {
    id: "intermittent-fasting-metabolism",
    title: "Intermittent Fasting & Autophagy for Metabolic Health",
    category: "Nutrition",
    date: "Jul 02, 2026",
    readTime: "8 min read",
    author: "Dr. Meera Iyer (Nutrition)",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=800&auto=format&fit=crop",
    excerpt: "Understanding cellular housekeeping (autophagy), circadian eating windows, and insulin sensitivity gains.",
    content: `Fasting is one of humanity's oldest biological therapies. When you abstain from calories for 14-16 hours, blood glucose and insulin levels drop, triggering your body to switch from burning sugar to utilizing ketone bodies for fuel.

Biological Benefits of Time-Restricted Feeding:
• Cellular Autophagy: Damaged organelles and misfolded proteins are degraded and recycled.
• Insulin Re-sensitization: Receptors in muscle and liver tissue regain insulin sensitivity.
• Circadian Alignment: Eating during daylight hours synchronizes peripheral organ clocks with the brain's suprachiasmatic nucleus.`
  },
  {
    id: "pranayama-breathwork-lung-capacity",
    title: "Pranayama Science: Expanding VO2 Max & Lung Capacity",
    category: "Yoga & Posture",
    date: "Jun 28, 2026",
    readTime: "6 min read",
    author: "Neel Joshi (Mobility & Breath Coach)",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop",
    excerpt: "Breathing mechanics, carbon dioxide tolerance training, and diaphragmatic strengthening techniques.",
    content: `Most adults utilize less than 40% of their total lung volume during normal breathing. Shallow chest breathing leads to chronic hyperventilation, low CO2 tolerance, and elevated sympathetic drive.

Key Breath Training Techniques:
• Nadi Shodhana (Alternate Nostril): Balances left and right brain hemispheres and reduces blood pressure.
• Kapalabhati (Skull-Shining Breath): Rhythmic abdominal contractions clear stagnant carbon dioxide from alveolar air sacs.
• Ujjayi (Ocean Breath): Slight glottic constriction increases airway pressure, keeping alveoli open longer for gas exchange.`
  },
  {
    id: "circadian-rhythm-hormone-sync",
    title: "Circadian Rhythm Reset: Optimizing Melatonin & Cortisol",
    category: "Lifestyle",
    date: "Jun 24, 2026",
    readTime: "7 min read",
    author: "Dr. Vikram Shah (Cardio-Metabolic Care)",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
    excerpt: "Harnessing early morning sunlight and evening dark signals to align your endocrine clock.",
    content: `Every cell in your body operates on a 24-hour biological clock governed by light exposure. Early morning sunlight exposure (10-15 minutes) triggers a healthy morning cortisol surge, raising alertness and setting a biological timer for melatonin release 14 hours later.`
  },
  {
    id: "adaptogens-cortisol-control",
    title: "Adaptogenic Herbs for Adrenal Exhaustion",
    category: "Ayurveda",
    date: "Jun 20, 2026",
    readTime: "6 min read",
    author: "Dr. Kavya Menon (Ayurveda)",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop",
    excerpt: "Ashwagandha, Shatavari, and Rhodiola Rosea for buffering HPA-axis burnout and adrenal fatigue.",
    content: `Adaptogens are a special class of botanical herbs that help your body adapt to physical, emotional, and environmental stress. Unlike stimulants, adaptogens normalize HPA-axis (Hypothalamic-Pituitary-Adrenal) function, buffering cortisol spikes without causing crash symptoms.`
  },
  {
    id: "heart-rate-variability-recovery",
    title: "Decoding HRV: Tracking Recovery, Stress, and Readiness",
    category: "Mental Health",
    date: "Jun 16, 2026",
    readTime: "7 min read",
    author: "Dr. Rhea Singh (Lifestyle Medicine)",
    image: "/articles/hrv_recovery.png",
    excerpt: "Understanding the millisecond variation between heartbeats to gauge nervous system recovery.",
    content: `Heart Rate Variability (HRV) measures the subtle variation in time intervals between consecutive heartbeats. High HRV indicates a resilient, adaptable autonomic nervous system capable of switching smoothly between fight-or-flight and rest-and-digest modes.`
  }
];

export const faqItems = [
  {
    question: "How does Nirogi Tanman personalize healthcare plans?",
    answer: "Our platform combines your health inputs, session history, and lifestyle patterns to generate evidence-led recommendations from doctors, nutritionists, and yoga experts.",
  },
  {
    question: "Can I switch between online and in-clinic consultations?",
    answer: "Yes. Each practitioner profile displays available consultation modes and scheduling windows.",
  },
  {
    question: "Is my data secure and private?",
    answer: "Nirogi Tanman uses role-based access and encrypted transport to protect health records and communication across modules.",
  },
  {
    question: "Does the AI assistant replace doctor consultation?",
    answer: "No. The AI assistant supports education and habit guidance, while diagnosis and prescriptions are provided by licensed professionals.",
  },
];

export const roleOverview = [
  { role: "Patient", path: "/patient/dashboard", description: "Track health metrics, appointments, plans, and personalized guidance." },
  { role: "Doctor", path: "/doctor/dashboard", description: "Manage consultations, queues, notes, prescriptions, and follow-up care." },
  { role: "Yoga Instructor", path: "/yoga/dashboard", description: "Build routines, track attendance, and deliver therapeutic sessions." },
  { role: "Admin", path: "/admin/dashboard", description: "Operate platform users, revenue, support, analytics, and governance." },
];
