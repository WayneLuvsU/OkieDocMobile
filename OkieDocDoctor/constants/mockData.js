// constants/mockData.js

export const INITIAL_REQUESTS = [
  { 
    id: '1', 
    name: 'Juan Dela Cruz', 
    age: 45, 
    gender: 'Male', 
    priority: 'High', 
    type: 'Video Consultation', 
    triagedTime: '08:45 AM',
    shortDescription: 'Severe chest pains and high blood pressure.',
    complaint: 'Severe chest pains radiating to left arm for the past hour. Patient has a history of hypertension and skipped morning dose.' 
  },
  { 
    id: '4', 
    name: 'Ana Luna', 
    age: 19, 
    gender: 'Female', 
    priority: 'High', 
    type: 'Specialist Consultation', 
    triagedTime: '09:12 AM',
    shortDescription: 'Acute lower abdominal pain with nausea.',
    complaint: 'Acute lower abdominal pain accompanied by nausea and mild fever. Nurse notes potential appendicitis triage and requests immediate evaluation.' 
  },
  { 
    id: '2', 
    name: 'Maria Santos', 
    age: 29, 
    gender: 'Female', 
    priority: 'Medium', 
    type: 'Chat Consultation', 
    triagedTime: '08:50 AM',
    shortDescription: 'Persistent dry cough and low-grade fever.',
    complaint: 'Persistent dry cough and low-grade fever (38.2°C) for 3 days. No breathing difficulties noted during manual lung auscultation.' 
  },
  { 
    id: '5', 
    name: 'Jose Rizal', 
    age: 35, 
    gender: 'Male', 
    priority: 'Medium', 
    type: 'Callback request Consultation', 
    triagedTime: '09:30 AM',
    shortDescription: 'Interpretation of recent blood panel results.',
    complaint: 'Requesting interpretation of recent laboratory blood panel results sent yesterday. Patient is anxious about elevated cholesterol numbers.' 
  },
  { 
    id: '3', 
    name: 'Pedro Reyes', 
    age: 62, 
    gender: 'Male', 
    priority: 'Low', 
    type: 'Voice Consultation', 
    triagedTime: '08:15 AM',
    shortDescription: 'Routine follow-up for Type 2 Diabetes.',
    complaint: 'Routine follow-up regarding maintenance medication adjustments for Type 2 Diabetes. Blood sugar monitoring logs are stable.' 
  }
];

export const INITIAL_HISTORY = [
  { id: 'h1', name: 'Emilio Aguinaldo', age: 70, action: 'Accepted', notes: 'Diagnosed with acute bronchitis. Prescribed Antibiotics for 7 days. Sent to Pharmacy.' },
  { id: 'h2', name: 'Apolinario Mabini', age: 50, action: 'Transfer', notes: 'Transferred to Orthopedics department due to complex joint chronic pain.' },
  { id: 'h3', name: 'Andres Bonifacio', age: 31, action: 'Denied', notes: 'Duplicate ticket entry submitted by patient. Redirected to pharmacy query.' }
];