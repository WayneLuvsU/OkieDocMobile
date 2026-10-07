// App.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ScrollView, SafeAreaView, Alert } from 'react-native';

import { INITIAL_REQUESTS, INITIAL_HISTORY } from './constants/mockData';
import DetailsModal from './components/DetailsModals';

export default function App() {
  React.useEffect(() => {
    if(appState==='SPLASH'){const t=setTimeout(()=>setAppState('LOGIN'),2500);return ()=>clearTimeout(t);}
  },[appState]);
  const [appState, setAppState] = useState('SPLASH');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('REQUESTS'); 
  const [showBurgerMenu, setShowBurgerMenu] = useState(false); 

  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [history, setHistory] = useState([
    {
      id: 'h-999',
      name: 'Sofia Martinez',
      action: 'Accepted',
      date: '2026-07-05',
      notes: '[SOAP Done] Prescribed: Amoxicillin 500mg | Labs: Complete Blood Count (CBC) | Invoice Amount: ₱1,200.00 Dispatched Securely.'
    },
    {
      id: 'h-998',
      name: 'Mark Gabriel',
      action: 'Transfer',
      date: '2026-07-04',
      notes: 'Transferred to Cardiology department triage deck due to persistent borderline arrhythmias.'
    }
  ]);
  
  const [selectedRequest, setSelectedPatientRequest] = useState(null); 
  const [isWorkspaceActive, setIsWorkspaceActive] = useState(false);

  const handleFinalizePharmacyAndBilling = (soapSummaryText) => {
    const newHistoryLog = {
      id: Date.now().toString(),
      name: selectedRequest.name,
      action: 'Accepted',
      date: '2026-07-05',
      notes: soapSummaryText
    };

    setHistory([newHistoryLog, ...history]);
    setRequests(requests.filter(item => item.id !== selectedRequest.id));
    setIsWorkspaceActive(false);
    setSelectedPatientRequest(null);
    Alert.alert('Case Finalized', 'Records and invoice successfully committed.');
  };

  const handleTransferPatient = (dept) => {
    const transferLog = {
      id: Date.now().toString(),
      name: selectedRequest.name,
      action: 'Transfer',
      date: '2026-07-05',
      notes: `Transferred patient to ${dept} Department.`
    };
    setHistory([transferLog, ...history]);
    setRequests(requests.filter(item => item.id !== selectedRequest.id));
    setSelectedPatientRequest(null);
  };

  const handleDenyPatient = () => {
    const denyLog = {
      id: Date.now().toString(),
      name: selectedRequest.name,
      action: 'Denied',
      date: '2026-07-05',
      notes: 'Consultation request denied by attending practitioner.'
    };
    setHistory([denyLog, ...history]);
    setRequests(requests.filter(item => item.id !== selectedRequest.id));
    setSelectedPatientRequest(null);
  };

  if(appState==='SPLASH'){return <SafeAreaView style={{flex:1,backgroundColor:'#18B6D8',justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:42,fontWeight:'bold'}}>OkieDoc+ Doctor</Text></SafeAreaView>;}
  if(appState==='LOGIN'){return <SafeAreaView style={{flex:1,justifyContent:'center',padding:24,backgroundColor:'#18B6D8'}}><Text style={{fontSize:36,fontWeight:'bold',textAlign:'center',marginBottom:30}}>OkieDoc+ Doctor</Text><TextInput placeholder='Email' value={email} onChangeText={setEmail} style={{backgroundColor:'white',marginBottom:12,padding:12,borderRadius:8}}/><TextInput placeholder='Password' secureTextEntry value={password} onChangeText={setPassword} style={{backgroundColor:'white',marginBottom:20,padding:12,borderRadius:8}}/><TouchableOpacity onPress={()=>setAppState('APP')} style={{backgroundColor:'#117A93',padding:16,borderRadius:8}}><Text style={{color:'white',textAlign:'center',fontWeight:'bold'}}>Log In</Text></TouchableOpacity></SafeAreaView>;}
  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* Top Application Bar */}
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => setShowBurgerMenu(!showBurgerMenu)}><Text style={styles.burgerIcon}>☰</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>OkieDoc Doctor Portal</Text>
        <View style={styles.gearIconContainer}><Text style={styles.gearIcon}>⚙️</Text></View>
      </View>

      <View style={styles.bodyWorkspace}>
        {/* =======================================================
            --- TAB 1: DASHBOARD OVERVIEW SUMMARY ---
            ======================================================= */}
        {activeTab === 'DASHBOARD' && (
          <ScrollView style={styles.scrollBlock}>
            <Text style={styles.viewTitle}>Welcome, Dr. Ramos</Text>
            <View style={styles.dashCard}>
              <Text style={styles.cardHeader}>Consultation Request Queue</Text>
              <Text style={styles.bigNumber}>{requests.length}</Text>
              <Text style={styles.cardSub}>Patients waiting from nurse triage outflow</Text>
            </View>
          </ScrollView>
        )}

        {/* =======================================================
            --- TAB 2: TRIAGE ACTIVE PATIENTS QUEUE ---
            ======================================================= */}
        {activeTab === 'REQUESTS' && (
          <View style={{ flex: 1 }}>
            <View style={styles.queueInteractiveHeaderBlock}>
              <View>
                <Text style={styles.viewTitle}>Assigned Patients Queue</Text>
                <Text style={styles.viewCaption}>Patients automatically appear here after passing nurse triage sorting</Text>
              </View>
              <View style={styles.liveCounterRow}>
                <View style={styles.counterUnitColumn}>
                  <Text style={styles.counterUnitLabel}>In Consultation</Text>
                  <Text style={styles.counterUnitValueBlue}>{selectedRequest ? 1 : 0}</Text>
                </View>
                <View style={styles.counterUnitColumn}>
                  <Text style={styles.counterUnitLabel}>Waiting</Text>
                  <Text style={styles.counterUnitValueOrange}>{requests.length}</Text>
                </View>
              </View>
            </View>

            <FlatList
              data={requests}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.requestCard} onPress={() => setSelectedPatientRequest(item)}>
                  <View style={styles.requestHeaderRow}>
                    <Text style={styles.patientName}>{item.name}</Text>
                    <Text style={[styles.priorityTag, { color: item.priority === 'High' ? '#EF4444' : 'orange' }]}>{item.priority} Priority</Text>
                  </View>
                  <Text style={styles.requestSubDetails}>Age: {item.age} • Gender: {item.gender}</Text>
                  <Text style={styles.shortDescriptionText}>📋 Reason: {item.shortDescription}</Text>
                  <View style={styles.typeBadge}><Text style={styles.typeText}>Type: {item.type}</Text></View>
                </TouchableOpacity>
              )}
              ListEmptyComponent={<Text style={styles.emptyText}>No patient triage requests pending evaluation.</Text>}
            />

            {selectedRequest && (
              <DetailsModal 
                selectedRequest={selectedRequest}
                isWorkspaceActive={isWorkspaceActive}
                setIsWorkspaceActive={setIsWorkspaceActive}
                setSelectedPatientRequest={setSelectedPatientRequest}
                onDeny={handleDenyPatient}
                onTransfer={handleTransferPatient}
                onFinalize={handleFinalizePharmacyAndBilling}
              />
            )}
          </View>
        )}

        {/* =======================================================
            --- TAB 3: DETAILED CLINICAL AUDIT HISTORY LEDGER ---
            ======================================================= */}
        {activeTab === 'HISTORY' && (
          <View style={{ flex: 1 }}>
            <Text style={styles.viewTitle}>Consultation Audit Ledger</Text>
            <Text style={styles.viewCaption}>Archived logs of resolved case folders, actions, and invoices</Text>
            
            <FlatList
              data={history}
              keyExtractor={(item) => item.id}
              style={{ marginTop: 14 }}
              renderItem={({ item }) => (
                <View style={styles.historyItemCard}>
                  <View style={styles.historyCardHeaderRow}>
                    <View>
                      <Text style={styles.historyPatientName}>{item.name}</Text>
                      <Text style={styles.historyDateStamp}>Processed: {item.date}</Text>
                    </View>
                    <View style={[styles.historyActionPill, 
                      item.action === 'Accepted' && { backgroundColor: '#DCFCE7' },
                      item.action === 'Transfer' && { backgroundColor: '#FFEDD5' },
                      item.action === 'Denied' && { backgroundColor: '#FEE2E2' }
                    ]}>
                      <Text style={[styles.historyActionText,
                        item.action === 'Accepted' && { color: '#15803D' },
                        item.action === 'Transfer' && { color: '#B45309' },
                        item.action === 'Denied' && { color: '#B91C1C' }
                      ]}>{item.action}</Text>
                    </View>
                  </View>
                  <Text style={styles.historyNotesBodyText}>{item.notes}</Text>
                </View>
              )}
            />
          </View>
        )}

        {/* =======================================================
            --- TAB 4: MINIMALIST WELL-DETAILED DOCTOR PROFILE ---
            ======================================================= */}
        {activeTab === 'PROFILE' && (
          <ScrollView style={styles.scrollBlock}>
            <Text style={styles.viewTitle}>Practitioner Profile</Text>
            
            <View style={styles.profileCardBlock}>
              <View style={styles.profileAvatarCircle}><Text style={styles.profileAvatarText}>PR</Text></View>
              <Text style={styles.profileDoctorNameTitle}>Dr. Ramos, P. Preum Ram</Text>
              <Text style={styles.profileDoctorSpecialtyText}>Attending Computer Engineering & Telehealth Specialist</Text>
            </View>

            <View style={styles.profileDetailsCard}>
              <Text style={styles.profileSectionHeading}>Credentials & Licensing</Text>
              <View style={styles.profileRowItem}><Text style={styles.profileItemLabel}>License Number</Text><Text style={styles.profileItemValue}>PRC-01123456</Text></View>
              <View style={styles.profileRowItem}><Text style={styles.profileItemLabel}>Affiliation</Text><Text style={styles.profileItemValue}>Manila Healthcare Center</Text></View>
              <View style={styles.profileRowItem}><Text style={styles.profileItemLabel}>Department Vector</Text><Text style={styles.profileItemValue}>General & Virtual Triage</Text></View>
              <View style={styles.profileRowItem}><Text style={styles.profileItemLabel}>Account Status</Text><Text style={styles.activeStatusPillText}>Active / Verified</Text></View>
            </View>
          </ScrollView>
        )}
      </View>

      {/* Reconciled Sticky Bottom Bar Navigation */}
      <View style={styles.bottomTabNavbar}>
        <TouchableOpacity style={[styles.tabButton, activeTab === 'DASHBOARD' && styles.activeTabStyle]} onPress={() => setActiveTab('DASHBOARD')}><Text style={styles.tabIconText}>🏠</Text><Text style={styles.tabLabelText}>Dashboard</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, activeTab === 'REQUESTS' && styles.activeTabStyle]} onPress={() => setActiveTab('REQUESTS')}><Text style={styles.tabIconText}>📥</Text><Text style={styles.tabLabelText}>Requests</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, activeTab === 'HISTORY' && styles.activeTabStyle]} onPress={() => setActiveTab('HISTORY')}><Text style={styles.tabIconText}>📜</Text><Text style={styles.tabLabelText}>History</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, activeTab === 'PROFILE' && styles.activeTabStyle]} onPress={() => setActiveTab('PROFILE')}><Text style={styles.tabIconText}>👤</Text><Text style={styles.tabLabelText}>Profile</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#F8FAFC' },
  topHeader: { height: 60, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E2EAF2', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginTop: 30 },
  burgerIcon: { fontSize: 24, color: '#4A5568', padding: 4 },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: '#1A202C' },
  gearIconContainer: { width: 34, height: 34, backgroundColor: '#F1F5F9', borderRadius: 17, justifyContent: 'center', alignItems: 'center' },
  gearIcon: { fontSize: 16 },
  bodyWorkspace: { flex: 1, padding: 12 },
  
  viewTitle: { fontSize: 18, fontWeight: 'bold', color: '#0F172A' },
  viewCaption: { fontSize: 12, color: '#64748B', marginTop: 2 },
  scrollBlock: { flex: 1 },
  
  dashCard: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 8, borderWidth: 1, borderColor: '#E2EAF2', borderLeftWidth: 5, borderLeftColor: '#2196F3', marginTop: 14 },
  cardHeader: { fontSize: 14, fontWeight: '700', color: '#4A5568' },
  bigNumber: { fontSize: 36, fontWeight: 'bold', color: '#1A202C' },
  cardSub: { fontSize: 12, color: '#A0AEC0' },

  queueInteractiveHeaderBlock: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 12, borderRadius: 10, marginBottom: 14, borderWidth: 1, borderColor: '#E2E8F0' },
  liveCounterRow: { flexDirection: 'row', alignItems: 'center' },
  counterUnitColumn: { alignItems: 'center', marginLeft: 14 },
  counterUnitLabel: { fontSize: 10, color: '#64748B', fontWeight: '600' },
  counterUnitValueBlue: { fontSize: 16, fontWeight: 'bold', color: '#2563EB', marginTop: 2 },
  counterUnitValueOrange: { fontSize: 16, fontWeight: 'bold', color: '#EA580C', marginTop: 2 },

  requestCard: { backgroundColor: '#FFFFFF', padding: 14, borderRadius: 8, borderWidth: 1, borderColor: '#E2EAF2', marginBottom: 12 },
  requestHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  patientName: { fontSize: 15, fontWeight: 'bold', color: '#2D3748' },
  priorityTag: { fontSize: 11, fontWeight: '700' },
  requestSubDetails: { fontSize: 12, color: '#4A5568', marginTop: 2 },
  shortDescriptionText: { fontSize: 13, color: '#4A5568', marginTop: 4 },
  typeBadge: { alignSelf: 'flex-start', backgroundColor: '#EDF2F7', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginTop: 6 },
  typeText: { fontSize: 11, color: '#4A5568' },
  emptyText: { textAlign: 'center', color: '#718096', marginTop: 40 },

  // --- DETAILED CLINICAL AUDIT HISTORY TAB STYLES ---
  historyItemCard: { backgroundColor: '#FFFFFF', padding: 14, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 12 },
  historyCardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  historyPatientName: { fontSize: 15, fontWeight: '700', color: '#0F172A' },
  historyDateStamp: { fontSize: 11, color: '#64748B', marginTop: 1 },
  historyActionPill: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  historyActionText: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase' },
  historyNotesBodyText: { fontSize: 13, color: '#334155', marginTop: 8, lineHeight: 18, backgroundColor: '#F8FAFC', padding: 10, borderRadius: 6, borderWidth: 1, borderColor: '#F1F5F9' },

  // --- MINIMALIST DETAILED DOCTOR PROFILE TAB STYLES ---
  profileCardBlock: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, alignItems: 'center', marginTop: 14, borderWidth: 1, borderColor: '#E2E8F0' },
  profileAvatarCircle: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#EFF6FF', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#BFDBFE', marginBottom: 12 },
  profileAvatarText: { fontSize: 24, fontWeight: '800', color: '#2563EB' },
  profileDoctorNameTitle: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
  profileDoctorSpecialtyText: { fontSize: 12, color: '#64748B', textAlign: 'center', marginTop: 4, paddingHorizontal: 10 },
  profileSpacerLine: { height: 1, backgroundColor: '#E2E8F0', width: '100%', marginVertical: 14 },
  profileDetailsCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginTop: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  profileSectionHeading: { fontSize: 13, fontWeight: '800', color: '#475569', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 },
  profileRowItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  profileItemLabel: { fontSize: 13, color: '#64748B', fontWeight: '500' },
  profileItemValue: { fontSize: 13, fontWeight: '600', color: '#1E293B' },
  activeStatusPillText: { fontSize: 12, fontWeight: '700', color: '#16A34A', backgroundColor: '#DCFCE7', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, overflow: 'hidden' },

  bottomTabNavbar: { height: 60, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E2EAF2', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  tabButton: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  activeTabStyle: { borderTopWidth: 2, borderTopColor: '#2196F3' },
  tabIconText: { fontSize: 18 },
  tabLabelText: { fontSize: 10, fontWeight: '600' }
});