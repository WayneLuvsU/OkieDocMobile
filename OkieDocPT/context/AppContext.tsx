import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Referral = {
  id: string;
  patientName: string;
  age: number;
  gender: string;
  issue: string;
  therapyType: string;
};

export type Appointment = {
  id: string;
  patientName: string;
  issue: string;
  therapyType: string;
  date: string;
  time: string;
  status: string;
  gender: string;
};

export type Patient = {
  id: string;
  patientName: string;
  age: number;
  gender: string;
  phone: string;
  recentIssue: string;
  activeTherapy: string;
  sessionsCompleted: number;
  totalSessions: number;
};

type AppContextType = {
  referrals: Referral[];
  appointments: Appointment[];
  patients: Patient[];
  processReferral: (id: string, appointmentData: any, patientData: any) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

/*
 * TODO (Integration):
 * The initial data below is entirely static and used for demonstration.
 * In a real-world scenario, you should NOT initialize state with hardcoded data.
 * Instead:
 * 1. Initialize these states as empty arrays `[]`.
 * 2. Use a `useEffect` hook to fetch data from your backend APIs 
 *    (e.g., GET /api/referrals, GET /api/appointments, GET /api/patients) when the app loads.
 * 3. Keep this context updated by dispatching actions or refetching whenever
 *    a new booking or referral is completed.
 * Alternatively, replace this entirely with a state management library like Redux Toolkit
 * or a data fetching library like React Query (TanStack Query) for better caching.
 */
const INITIAL_REFERRALS: Referral[] = [
  {
    id: '1',
    patientName: 'Maria Santos',
    age: 35,
    gender: 'Female',
    issue: 'Lower back pain',
    therapyType: 'Physical Therapy',
  },
  {
    id: '2',
    patientName: 'Juan Dela Cruz',
    age: 42,
    gender: 'Male',
    issue: 'Knee injury',
    therapyType: 'Physical Therapy',
  },
  {
    id: '3',
    patientName: 'Pedro Reyes',
    age: 55,
    gender: 'Male',
    issue: 'Post surgery rehab',
    therapyType: 'Occupational Therapy',
  },
];

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [referrals, setReferrals] = useState<Referral[]>(INITIAL_REFERRALS);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);

  const processReferral = (id: string, appointmentData: any, patientData: any) => {
    // 1. Find the referral to process
    const referralToProcess = referrals.find((r) => r.id === id);
    if (!referralToProcess) return;

    // 2. Remove from referrals
    setReferrals((prev) => prev.filter((r) => r.id !== id));

    // 3. Add to appointments
    const newAppointment: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      patientName: referralToProcess.patientName,
      issue: referralToProcess.issue,
      therapyType: referralToProcess.therapyType,
      date: appointmentData.date,
      time: appointmentData.time,
      status: appointmentData.status, // e.g., 'Booked'
      gender: referralToProcess.gender,
    };
    setAppointments((prev) => [...prev, newAppointment]);

    // 4. Add to patients (if not already existing)
    const existingPatient = patients.find((p) => p.patientName === referralToProcess.patientName);
    if (!existingPatient) {
      const newPatient: Patient = {
        id: Math.random().toString(36).substr(2, 9),
        patientName: referralToProcess.patientName,
        age: referralToProcess.age,
        gender: referralToProcess.gender,
        phone: patientData.phone || '+63 900 000 0000', // Dummy phone
        recentIssue: referralToProcess.issue,
        activeTherapy: referralToProcess.therapyType,
        sessionsCompleted: 0,
        totalSessions: patientData.totalSessions || 10,
      };
      setPatients((prev) => [...prev, newPatient]);
    }
  };

  return (
    <AppContext.Provider value={{ referrals, appointments, patients, processReferral }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
