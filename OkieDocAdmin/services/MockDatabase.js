// MockDatabase.js
// Stand-in for the Commercial / Patient / Nurse / Doctor / Pharmacy / PT modules.
// Phase 5 plan: replace the arrays below with data pulled from AppContext,
// Firebase, or Supabase — screens should never need to change, only this file.

export const consultations = [
  {
    id: 'C-1001',
    patient: 'Juan Dela Cruz',
    age: 23,
    gender: 'Male',
    symptoms: 'Fever, headache',
    diagnosis: 'Influenza',
    medicine: 'Paracetamol',
    ptRequired: false,
    doctor: 'Dr. Santos',
    nurse: 'Nurse Maria',
    status: 'Pending',
    date: '2026-07-05',
    time: '08:45 AM',
  },
  {
    id: 'C-1002',
    patient: 'Maria Santos',
    age: 34,
    gender: 'Female',
    symptoms: 'Lower back pain',
    diagnosis: 'Muscle strain',
    medicine: 'Ibuprofen',
    ptRequired: true,
    doctor: 'Dr. Reyes',
    nurse: 'Nurse Ana',
    status: 'Approved',
    date: '2026-07-05',
    time: '09:20 AM',
  },
  {
    id: 'C-1003',
    patient: 'Pedro Reyes',
    age: 45,
    gender: 'Male',
    symptoms: 'Sprained ankle',
    diagnosis: 'Grade 1 sprain',
    medicine: 'Naproxen',
    ptRequired: true,
    doctor: 'Dr. Cruz',
    nurse: 'Nurse Maria',
    status: 'Completed',
    date: '2026-07-04',
    time: '02:10 PM',
  },
  {
    id: 'C-1004',
    patient: 'Ana Lopez',
    age: 29,
    gender: 'Female',
    symptoms: 'Sore throat, cough',
    diagnosis: 'Pharyngitis',
    medicine: 'Amoxicillin',
    ptRequired: false,
    doctor: 'Dr. Santos',
    nurse: 'Nurse Ana',
    status: 'Pending',
    date: '2026-07-05',
    time: '10:05 AM',
  },
  {
    id: 'C-1005',
    patient: 'Carlos Villanueva',
    age: 51,
    gender: 'Male',
    symptoms: 'Chest tightness',
    diagnosis: 'Acid reflux',
    medicine: 'Omeprazole',
    ptRequired: false,
    doctor: 'Dr. Reyes',
    nurse: 'Nurse Maria',
    status: 'Approved',
    date: '2026-07-05',
    time: '10:40 AM',
  },
  {
    id: 'C-1006',
    patient: 'Grace Tan',
    age: 19,
    gender: 'Female',
    symptoms: 'Migraine',
    diagnosis: 'Tension headache',
    medicine: 'Mefenamic Acid',
    ptRequired: false,
    doctor: 'Dr. Cruz',
    nurse: 'Nurse Ana',
    status: 'Completed',
    date: '2026-07-04',
    time: '04:30 PM',
  },
];

export const nurseActivities = [
  { id: 'N-1', nurse: 'Nurse Maria', patient: 'Juan Dela Cruz', action: 'Vitals recorded', date: '2026-07-05', time: '08:30 AM' },
  { id: 'N-2', nurse: 'Nurse Ana', patient: 'Ana Lopez', action: 'Initial assessment', date: '2026-07-05', time: '09:50 AM' },
];

export const doctorActivities = [
  { id: 'D-1', doctor: 'Dr. Santos', patient: 'Juan Dela Cruz', action: 'Diagnosed: Influenza', date: '2026-07-05', time: '09:00 AM' },
  { id: 'D-2', doctor: 'Dr. Reyes', patient: 'Maria Santos', action: 'Diagnosed: Muscle strain', date: '2026-07-05', time: '09:35 AM' },
];

export const pharmacyReleases = [
  { id: 'P-1', patient: 'Juan Dela Cruz', medicine: 'Paracetamol', quantity: '10 tabs', date: '2026-07-05', time: '09:15 AM' },
  { id: 'P-2', patient: 'Pedro Reyes', medicine: 'Naproxen', quantity: '14 tabs', date: '2026-07-04', time: '02:45 PM' },
];

export const ptReferrals = [
  { id: 'PT-1', patient: 'Maria Santos', therapist: 'Therapist Cruz', session: 'Session 1 of 6', date: '2026-07-06', time: '10:00 AM' },
  { id: 'PT-2', patient: 'Pedro Reyes', therapist: 'Therapist Cruz', session: 'Session 3 of 4', date: '2026-07-05', time: '03:00 PM' },
];

export const admin = {
  name: 'Admin User',
  department: 'Hospital Administration',
  email: 'admin@okiedocplus.com',
};

// --- Pharmacy Module: Medicine Inventory (mirrors the Pharmacist's Inventory Check) ---
export const medicines = [
  {
    id: 'M-001',
    name: 'Paracetamol 500mg',
    genericName: 'Paracetamol',
    category: 'Analgesic / Antipyretic',
    dosage: '500mg, tablet',
    currentStock: 320,
    supplier: 'MedSupply Philippines Inc.',
    unitPrice: 2.5,
    status: 'In Stock',
    expiryDate: '2027-03-15',
  },
  {
    id: 'M-002',
    name: 'Amoxicillin 500mg',
    genericName: 'Amoxicillin',
    category: 'Antibiotic',
    dosage: '500mg, capsule',
    currentStock: 18,
    supplier: 'Unilab Distribution',
    unitPrice: 8.75,
    status: 'Low Stock',
    expiryDate: '2026-11-02',
  },
  {
    id: 'M-003',
    name: 'Ibuprofen 400mg',
    genericName: 'Ibuprofen',
    category: 'NSAID',
    dosage: '400mg, tablet',
    currentStock: 0,
    supplier: 'MedSupply Philippines Inc.',
    unitPrice: 3.2,
    status: 'Out of Stock',
    expiryDate: '2027-01-20',
  },
  {
    id: 'M-004',
    name: 'Omeprazole 20mg',
    genericName: 'Omeprazole',
    category: 'Proton Pump Inhibitor',
    dosage: '20mg, capsule',
    currentStock: 145,
    supplier: 'Zuellig Pharma',
    unitPrice: 6.4,
    status: 'In Stock',
    expiryDate: '2027-06-10',
  },
  {
    id: 'M-005',
    name: 'Naproxen 250mg',
    genericName: 'Naproxen Sodium',
    category: 'NSAID',
    dosage: '250mg, tablet',
    currentStock: 60,
    supplier: 'Unilab Distribution',
    unitPrice: 4.1,
    status: 'In Stock',
    expiryDate: '2026-07-30',
  },
  {
    id: 'M-006',
    name: 'Mefenamic Acid 500mg',
    genericName: 'Mefenamic Acid',
    category: 'NSAID',
    dosage: '500mg, capsule',
    currentStock: 12,
    supplier: 'Zuellig Pharma',
    unitPrice: 5.0,
    status: 'Low Stock',
    expiryDate: '2026-09-05',
  },
  {
    id: 'M-007',
    name: 'Cefalexin 500mg',
    genericName: 'Cephalexin',
    category: 'Antibiotic',
    dosage: '500mg, capsule',
    currentStock: 40,
    supplier: 'MedSupply Philippines Inc.',
    unitPrice: 9.9,
    status: 'Expired',
    expiryDate: '2026-05-18',
  },
  {
    id: 'M-008',
    name: 'Loperamide 2mg',
    genericName: 'Loperamide HCl',
    category: 'Antidiarrheal',
    dosage: '2mg, capsule',
    currentStock: 88,
    supplier: 'Zuellig Pharma',
    unitPrice: 3.75,
    status: 'In Stock',
    expiryDate: '2027-02-14',
  },
];

// --- Derived statistics (this is what a real "Statistics service" would compute) ---
export const getStats = () => {
  const total = consultations.length;
  const pending = consultations.filter((c) => c.status === 'Pending').length;
  const approved = consultations.filter((c) => c.status === 'Approved').length;
  const completed = consultations.filter((c) => c.status === 'Completed').length;

  return {
    totalPatients: total,
    todaysConsultations: consultations.filter((c) => c.date === '2026-07-05').length,
    pending,
    approved,
    completed,
    pharmacyReleases: pharmacyReleases.length,
    ptReferrals: ptReferrals.length,
  };
};

export const getInventoryStats = () => {
  const total = medicines.length;
  const inStock = medicines.filter((m) => m.status === 'In Stock').length;
  const lowStock = medicines.filter((m) => m.status === 'Low Stock').length;
  const outOfStock = medicines.filter((m) => m.status === 'Out of Stock').length;
  const expired = medicines.filter((m) => m.status === 'Expired').length;

  return { total, inStock, lowStock, outOfStock, expired };
};
