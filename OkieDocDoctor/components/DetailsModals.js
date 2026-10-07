// components/DetailsModals.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native';

export default function DetailsModal({ 
  selectedRequest, 
  isWorkspaceActive, 
  setIsWorkspaceActive, 
  setSelectedPatientRequest,
  onDeny,
  onTransfer,
  onFinalize 
}) {
  // --- CORE CLINICAL SOAP STORAGE ENGINE ---
  const [subjective, setSubjective] = useState('');
  const [objective, setObjective] = useState('');
  const [assessment, setAssessment] = useState('');
  const [plan, setPlan] = useState('');

  // UI State Elements
  const [workspaceTab, setWorkspaceTab] = useState('PRESCRIPTION'); 
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [isBillingModalOpen, setIsBillingModalOpen] = useState(false);
  const [paymentType, setPaymentType] = useState('Private');
  const [customServiceName, setCustomServiceName] = useState('');
  const [customServiceAmount, setCustomServiceAmount] = useState('');

  // --- TELEHEALTH SUITE TRACKING STATES ---
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [sidebarTab, setSidebarTab] = useState('SOAP'); // SOAP, RX, LAB

  // --- LIVE ELAPSED DURATION TIMER ENGINE ---
  const [timeElapsed, setTimeElapsed] = useState(0); 

  useEffect(() => {
    const countupTimer = setInterval(() => {
      setTimeElapsed((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(countupTimer);
  }, []);

  const formatElapsedTimer = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  // Billing Matrix Configuration
  const [billingServices, setBillingServices] = useState([
    { id: 'b1', name: 'Follow-up Consultation', price: 400, selected: false },
    { id: 'b2', name: 'Medical Certificate', price: 200, selected: false },
    { id: 'b3', name: 'Medical Clearance', price: 300, selected: false },
    { id: 'b4', name: 'Lab Request', price: 150, selected: false },
    { id: 'b5', name: 'Treatment Plan', price: 250, selected: false },
    { id: 'b6', name: 'Specialist Add-on Fee', price: 500, selected: false },
  ]);

  // --- PRESCRIPTION SUITE FIELDS ---
  const [medName, setMedName] = useState('');
  const [dosage, setDosage] = useState('');
  const [duration, setDuration] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [frequency, setFrequency] = useState('');
  const [showFreqDropdown, setShowFreqDropdown] = useState(false);

  // --- LABORATORY REQUEST CHECKBOXES ---
  const [selectedLabs, setSelectedLabs] = useState([]);
  const [customLab, setCustomLab] = useState('');
  const [labInstructions, setLabInstructions] = useState('');

  // --- MEDICAL CERTIFICATE DATA PARAMETERS ---
  const [medCertDiagnosis, setMedCertDiagnosis] = useState('');
  const [dateIssued, setDateIssued] = useState('07/05/2026');
  const [restStart, setRestStart] = useState('');
  const [restEnd, setRestEnd] = useState('');
  const [restDays, setRestDays] = useState('');
  const [medCertRemarks, setMedCertRemarks] = useState('');

  const LAB_OPTIONS = [
    'Complete Blood Count (CBC)', 'Urinalysis', 'Lipid Profile', 'Blood Glucose (FBS)',
    'HbA1c', 'Liver Function Test (LFT)', 'Kidney Function Test (KFT)', 'Thyroid Function Test',
    'Chest X-Ray', 'ECG (Electrocardiogram)', 'Ultrasound', 'COVID-19 RT-PCR',
    'Hepatitis B Surface Antigen', 'Stool Examination', 'Pregnancy Test'
  ];

  const FREQ_OPTIONS = [
    'Once daily', 'Twice daily', 'Three times daily', 'Four times daily',
    'Every 4 hours', 'Every 6 hours', 'Every 8 hours', 'As needed'
  ];

  const toggleLabCheckbox = (lab) => {
    if (selectedLabs.includes(lab)) {
      setSelectedLabs(selectedLabs.filter(item => item !== lab));
    } else {
      setSelectedLabs([...selectedLabs, lab]);
    }
  };

  const toggleBillingService = (id) => {
    setBillingServices(billingServices.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  const handleAddCustomService = () => {
    if (!customServiceName.trim() || !customServiceAmount.trim()) {
      alert('Please fill out both the service name and the price amount.');
      return;
    }
    const newService = {
      id: Date.now().toString(),
      name: customServiceName.trim(),
      price: parseFloat(customServiceAmount) || 0,
      selected: true
    };
    setBillingServices([...billingServices, newService]);
    setCustomServiceName('');
    setCustomServiceAmount('');
  };

  const calculateFinalTotal = () => {
    const baseFee = 1000;
    const additionalFees = billingServices
      .filter(item => item.selected)
      .reduce((sum, item) => sum + item.price, 0);
    return baseFee + additionalFees;
  };

  const handleCommitInvoiceDispatch = () => {
    setIsBillingModalOpen(false);
    const invoiceSummary = `[Invoice Dispatched] Total Amount: ₱${calculateFinalTotal().toFixed(2)} | Coverage: ${paymentType}`;
    onFinalize(invoiceSummary);
  };

  // --- FULL FULLSCREEN INTERFACE SWAP WITH SCROLLING INTERACTION REPAIR ---
  if (isVideoCallActive) {
    return (
      <ScrollView 
        style={styles.fullscreenCallOverlayScroll} 
        contentContainerStyle={{ flexGrow: 1, backgroundColor: '#070F2E' }}
        bounces={true}
      >
        
        {/* TOP VIEWPORT: VIDEO STREAM CANVAS */}
        <View style={styles.leftVideoStreamCanvas}>
          
          {/* Top Floating Overlay Stats Bar */}
          <View style={styles.videoTopOverlayRow}>
            <View style={styles.patientBadgeGroupColumn}>
              <Text style={styles.videoPatientNameTitle}>{selectedRequest.name}</Text>
              <View style={styles.videoConnectivityIndicatorRow}>
                <Text style={styles.videoStatusSubtitleText}>Doctor Consultation</Text>
                <View style={styles.greenLiveConnectedDot} />
                <Text style={styles.connectedCaptionLabel}>Connected</Text>
              </View>
            </View>
            
            {/* Live Floating Timer Token Counter Block */}
            <View style={styles.floatingVideoTimerBox}>
              <Text style={styles.videoTimerText}>⏱/30m: {formatElapsedTimer(timeElapsed)}</Text>
            </View>
          </View>

          {/* Centered Patient Avatar Layout Symbol */}
          <View style={styles.centeredPatientAvatarContainer}>
            <View style={styles.largePatientProfileCircle}>
              <Text style={styles.largeAvatarProfileChar}>👤</Text>
            </View>
            <Text style={styles.largePatientNameLabelText}>{selectedRequest.name}</Text>
            <View style={styles.patientLabelBadge}><Text style={styles.badgeLabelFormatText}>Patient</Text></View>
          </View>

          {/* Small Doctor Picture-In-Picture View Window Box Overlay Frame */}
          <View style={styles.doctorPipPreviewBoxWindow}>
            <View style={styles.doctorMiniAvatarIndicatorCircle}>
              <Text style={styles.miniDocSymbolChar}>🧑‍⚕️</Text>
            </View>
            <Text style={styles.pipDocCaptionLabelText}>You (Doctor)</Text>
          </View>

          {/* Bottom Floating Horizontal Overlay Media Controls HUD Strip */}
          <View style={styles.mediaControlsHudRowContainerStrip}>
            <TouchableOpacity style={[styles.hudCircleButton, isMuted && styles.hudActiveAlertStateBtn]} onPress={() => setIsMuted(!isMuted)}>
              <Text style={styles.hudSymbolIconText}>{isMuted ? '🎙️' : '🎤'}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.hudCircleButton, isVideoOff && styles.hudActiveAlertStateBtn]} onPress={() => setIsVideoOff(!isVideoOff)}>
              <Text style={styles.hudSymbolIconText}>{isVideoOff ? '📷' : '📹'}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.hudCircleButton} onPress={() => alert('Message log encryption channels confirmed secure.')}>
              <Text style={styles.hudSymbolIconText}>💬</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.hudRedEndCallDisconnectBtn} onPress={() => setIsVideoCallActive(false)}>
              <Text style={styles.btnTextWhite}>📴</Text>
            </TouchableOpacity>
          </View>

        </View>

        {/* BOTTOM VIEWPORT: WORKSPACE COMPACT SIDEBAR ACTION DECK */}
        <View style={styles.rightClinicalWorkspaceSidebarDeck}>
          <Text style={styles.sidebarWorkspaceHeadingTitle}>Clinical Workspace</Text>
          <Text style={styles.sidebarWorkspaceSubtitleCaption}>Document consultation in real-time</Text>

          {/* Quick Header Record Triggers Row Container */}
          <View style={styles.sidebarHeaderControlsFlexRow}>
            <TouchableOpacity style={styles.sidebarWhiteRequestRecordsTriggerBtn} onPress={() => setIsRecordModalOpen(true)}>
              <Text style={styles.btnTextBlack}>📁 Request Records</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarGreenCompleteCaseTriggerBtn} onPress={() => setIsBillingModalOpen(true)}>
              <Text style={styles.btnTextWhite}>✓ Complete</Text>
            </TouchableOpacity>
          </View>

          {/* Micro Segment Tab Switchers Selection Rows Layout Blocks */}
          <View style={styles.microSidebarSegmentTabSelectorRowBar}>
            <TouchableOpacity style={[styles.microTabButton, sidebarTab === 'SOAP' && styles.activeMicroTabStyleLine]} onPress={() => setSidebarTab('SOAP')}>
              <Text style={[styles.microTabTextFormat, sidebarTab === 'SOAP' && styles.activeMicroTextWeightText]}>📄 SOAP Notes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.microTabButton, sidebarTab === 'RX' && styles.activeMicroTabStyleLine]} onPress={() => setSidebarTab('RX')}>
              <Text style={[styles.microTabTextFormat, sidebarTab === 'RX' && styles.activeMicroTextWeightText]}>🔗 Rx</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.microTabButton, sidebarTab === 'LAB' && styles.activeMicroTabStyleLine]} onPress={() => setSidebarTab('LAB')}>
              <Text style={[styles.microTabTextFormat, sidebarTab === 'LAB' && styles.activeMicroTextWeightText]}>🔬 Lab</Text>
            </TouchableOpacity>
          </View>

          {/* Dynamic Render Sub-tab Modules Slots Components */}
          <View style={styles.sidebarScrollContentWrapperBlock}>
            
            {/* SWITCH SUBTAB SELECTION MODULE BLOCK A: SOAP RECORDS VIEW CHARTING */}
            {sidebarTab === 'SOAP' && (
              <View style={styles.sidebarFormCardStackPaddingBlock}>
                <Text style={styles.microFieldLabelHeadingInputTitle}>Subjective</Text>
                <TextInput style={styles.sidebarTextMultiLineInputBox} multiline placeholder="Patient's reported symptoms and history..." placeholderTextColor="#A0AEC0" value={subjective} onChangeText={setSubjective}/>

                <Text style={styles.microFieldLabelHeadingInputTitle}>Objective</Text>
                <TextInput style={styles.sidebarTextMultiLineInputBox} multiline placeholder="Physical examination findings..." placeholderTextColor="#A0AEC0" value={objective} onChangeText={setObjective}/>

                <Text style={styles.microFieldLabelHeadingInputTitle}>Assessment</Text>
                <TextInput style={styles.sidebarTextMultiLineInputBox} multiline placeholder="Diagnosis and evaluation..." placeholderTextColor="#A0AEC0" value={assessment} onChangeText={setAssessment}/>

                <Text style={styles.microFieldLabelHeadingInputTitle}>Plan</Text>
                <TextInput style={styles.sidebarTextMultiLineInputBox} multiline placeholder="Treatment plan and next steps..." placeholderTextColor="#A0AEC0" value={plan} onChangeText={setPlan}/>
              </View>
            )}

            {/* SWITCH SUBTAB SELECTION MODULE BLOCK B: QUICK RX ASSIGNMENTS FIELDS */}
            {sidebarTab === 'RX' && (
              <View style={styles.sidebarFormCardStackPaddingBlock}>
                <Text style={styles.microFormSectionTitleLabelHeader}>Add medications for prescription</Text>
                
                <TextInput style={styles.sidebarTextFormInputSingleLineFieldBox} placeholder="Medication name" placeholderTextColor="#A0AEC0" value={medName} onChangeText={setMedName}/>
                <TextInput style={styles.sidebarTextFormInputSingleLineFieldBox} placeholder="Dosage" placeholderTextColor="#A0AEC0" value={dosage} onChangeText={setDosage}/>
                <TextInput style={styles.sidebarTextFormInputSingleLineFieldBox} placeholder="Frequency" placeholderTextColor="#A0AEC0" value={frequency} onChangeText={setFrequency}/>
                <TextInput style={styles.sidebarTextFormInputSingleLineFieldBox} placeholder="Duration" placeholderTextColor="#A0AEC0" value={duration} onChangeText={setDuration}/>

                <TouchableOpacity style={styles.sidebarBlackActionCommitBtn} onPress={() => alert('Prescription appended successfully.')}>
                  <Text style={styles.btnTextWhite}>Add Medication</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* SWITCH SUBTAB SELECTION MODULE BLOCK C: LABORATORY REQUISITION SORT FILES */}
            {sidebarTab === 'LAB' && (
              <View style={styles.sidebarFormCardStackPaddingBlock}>
                <Text style={styles.microFormSectionTitleLabelHeader}>Request laboratory tests</Text>

                <TextInput style={styles.sidebarTextFormInputSingleLineFieldBox} placeholder="Test name" placeholderTextColor="#A0AEC0" value={customLab} onChangeText={setCustomLab}/>
                <TextInput style={[styles.sidebarTextMultiLineInputBox, { minHeight: 70 }]} multiline placeholder="Clinical indication..." placeholderTextColor="#A0AEC0" value={labInstructions} onChangeText={setLabInstructions}/>

                <TouchableOpacity style={styles.sidebarBlackActionCommitBtn} onPress={() => alert('Lab request record submitted.')}>
                  <Text style={styles.btnTextWhite}>Add Lab Request</Text>
                </TouchableOpacity>
              </View>
            )}

          </View>

        </View>

      </ScrollView>
    );
  }

  // --- STANDARD POPUP LAYOUT TERM FALLBACK ---
  return (
    <View style={styles.detailsPopupBlanket}>
      <View style={popupCardStyleWrapper(isWorkspaceActive)}>
        
        {/* --- HEADER CONTROL COMPONENT --- */}
        <View style={styles.headerBanner}>
          <View style={styles.headerProfileRow}>
            <View style={styles.avatarCircleText}><Text style={styles.avatarInitials}>SM</Text></View>
            <View style={styles.headerMetadata}>
              <Text style={styles.patientNameTitle} numberOfLines={1}>{selectedRequest.name}</Text>
              <Text style={styles.subSubtitleText} numberOfLines={1}>{selectedRequest.type}</Text>
              
              {/* Live Countup Consultation Duration Timer Capsule */}
              <View style={styles.timerContainer}>
                <Text style={styles.timerValueText}>⏱️ Duration: {formatElapsedTimer(timeElapsed)}</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.headerCallActionsGroup}>
            <TouchableOpacity style={styles.startVideoCallBtn} onPress={() => setIsVideoCallActive(true)}>
              <Text style={styles.btnTextWhite}> Start Video Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.generateInvoiceTopTriggerBtn} onPress={() => setIsBillingModalOpen(true)}>
              <Text style={styles.invoiceBtnText}>📄 Invoice</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* --- STICKY NAVIGATION TABS MENU --- */}
        {isWorkspaceActive && (
          <View style={styles.workspaceSegmentBar}>
            <TouchableOpacity style={[styles.workTabButton, workspaceTab === 'PRESCRIPTION' && styles.activeWorkTab]} onPress={() => setWorkspaceTab('PRESCRIPTION')}>
              <Text style={[styles.workTabFormatText, workspaceTab === 'PRESCRIPTION' && styles.activeWorkTabText]}>💊 Prescription</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.workTabButton, workspaceTab === 'LAB_REQUESTS' && styles.activeWorkTab]} onPress={() => setWorkspaceTab('LAB_REQUESTS')}>
              <Text style={[styles.workTabFormatText, workspaceTab === 'LAB_REQUESTS' && styles.activeWorkTabText]}>🔬 Lab Requests</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.workTabButton, workspaceTab === 'MED_CERT' && styles.activeWorkTab]} onPress={() => setWorkspaceTab('MED_CERT')}>
              <Text style={[styles.workTabFormatText, workspaceTab === 'MED_CERT' && styles.activeWorkTabText]}>🏅 Med Certificate</Text>
            </TouchableOpacity>
          </View>
        )}

        <ScrollView style={styles.modalScrollBody} contentContainerStyle={{ paddingBottom: 40 }}>
          {!isWorkspaceActive ? (
            <View>
              {/* Profile card deck */}
              <View style={styles.clinicalCard}>
                <Text style={styles.cardSectionHeading}>👤 Patient Information Summary</Text>
                <View style={styles.infoGridRow}>
                  <View style={styles.gridColumn}><Text style={styles.gridLabel}>Age</Text><Text style={styles.gridValue}>{selectedRequest.age} years</Text></View>
                  <View style={styles.gridColumn}><Text style={styles.gridLabel}>Gender</Text><Text style={styles.gridValue}>{selectedRequest.gender}</Text></View>
                </View>
                <View style={[styles.infoGridRow, { marginTop: 8 }]}>
                  <View style={styles.gridColumn}><Text style={styles.gridLabel}>Blood Type</Text><Text style={styles.gridValue}>O-</Text></View>
                  <View style={styles.gridColumn}><Text style={styles.gridLabel}>Contact</Text><Text style={styles.gridValue}>+63 956 789 0123</Text></View>
                </View>

                <Text style={styles.subCardSectionFieldTitle}>Allergies</Text>
                <View style={styles.allergiesPillsFlexRow}>
                  <View style={styles.allergyBadgeItem}><Text style={styles.allergyBadgeText}>Penicillin</Text></View>
                  <View style={styles.allergyBadgeItem}><Text style={styles.allergyBadgeText}>Peanuts</Text></View>
                </View>

                <Text style={styles.subCardSectionFieldTitle}>Medical History</Text>
                <Text style={styles.bulletHistoryItemText}>•  Hypertension (2020)</Text>
                <Text style={styles.bulletHistoryItemText}>•  Appendectomy (2018)</Text>
              </View>

              {/* Triage card deck */}
              <View style={styles.clinicalCard}>
                <Text style={styles.cardSectionHeading}>📋 Triage Notes (From Nurse)</Text>
                <View style={styles.patientConcernContainer}>
                  <Text style={styles.concernLabelText}>Patient Submitted Concern</Text>
                  <Text style={styles.concernBodyContent}>"{selectedRequest.shortDescription}"</Text>
                </View>
                <Text style={styles.vitalValuesBody}>BP: 120/80 mmHg | Temp: 37.8°C | HR: 82 bpm</Text>
              </View>

              {/* Medical Records Access Security Card */}
              <View style={styles.clinicalCard}>
                <Text style={styles.cardSectionHeading}>🗄️ Medical Records Access</Text>
                <View style={styles.lockBoxCenteredContainer}>
                  <Text style={styles.lockIconSymbol}>🔒</Text>
                  <Text style={styles.lockBoxLabel}>No medical records shared yet</Text>
                  <TouchableOpacity style={styles.requestSharedBtn} onPress={() => alert('Access log link transmitted to patient mobile device.')}>
                    <Text style={styles.requestSharedBtnText}>Request Records from Patient</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={styles.triggerHistoryBanner} onPress={() => setIsRecordModalOpen(true)}>
                <Text style={styles.triggerBannerIcon}>📄</Text>
                <View style={styles.triggerTextGroup}><Text style={styles.triggerMainLabel}>View Complete Medical History</Text></View>
              </TouchableOpacity>

              {/* Charting blocks inputs */}
              <Text style={styles.soapSectionMasterHeader}>📝 Consultation SOAP Charting</Text>
              <TextInput style={styles.soapInputBox} multiline placeholder="Subjective notes..." value={subjective} onChangeText={setSubjective}/>
              <TextInput style={[styles.soapInputBox, { marginTop: 6 }]} multiline placeholder="Objective notes..." value={objective} onChangeText={setObjective}/>
              <TextInput style={[styles.soapInputBox, { marginTop: 6 }]} multiline placeholder="Assessment notes..." value={assessment} onChangeText={setAssessment}/>
              <TextInput style={[styles.soapInputBox, { marginTop: 6 }]} multiline placeholder="Plan notes..." value={plan} onChangeText={setPlan}/>

              <TouchableOpacity style={styles.actionAcceptBtn} onPress={() => setIsWorkspaceActive(true)}>
                <Text style={styles.btnTextWhite}>📝 Open Documents Workspace</Text>
              </TouchableOpacity>
              
              <View style={styles.splitButtonRow}>
                <TouchableOpacity style={styles.actionDenyBtn} onPress={onDeny}><Text style={styles.btnTextWhite}>❌ Deny</Text></TouchableOpacity>
                <TouchableOpacity style={styles.actionTransferBtn} onPress={() => onTransfer('Cardiology')}><Text style={styles.btnTextWhite}>🔄 Transfer</Text></TouchableOpacity>
              </View>
            </View>
          ) : (
            /* ========================================================
               --- DOCUMENTS WORKSPACE GENERATION SUITE MODAL ROOM ---
               ======================================================== */
            <View>
              {workspaceTab === 'PRESCRIPTION' && (
                <View style={styles.workspaceViewFrame}>
                  <View style={styles.suiteSubHeaderRow}>
                    <Text style={styles.suiteTitleText}>Prescription</Text>
                    <TouchableOpacity style={styles.prescriptionAddBtn} onPress={() => alert('Medication committed.')}>
                      <Text style={styles.btnTextWhite}>+ Add Medication</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.suiteSubtitleText}>Add medications for the patient</Text>

                  <View style={styles.medicationCardItemUnit}>
                    <Text style={styles.medicationCardTitleHeader}>Medication #1</Text>
                    
                    <Text style={styles.formInputHeadingFieldLabel}>Medication Name</Text>
                    <TextInput style={styles.formStandardBoxInput} placeholder="e.g., Amoxicillin" value={medName} onChangeText={setMedName}/>

                    <View style={styles.infoGridRow}>
                      <View style={styles.gridColumn}>
                        <Text style={styles.formInputHeadingFieldLabel}>Dosage</Text>
                        <TextInput style={styles.formStandardBoxInput} placeholder="e.g., 500mg" value={dosage} onChangeText={setDosage}/>
                      </View>
                      <View style={styles.gridColumn}>
                        <Text style={styles.formInputHeadingFieldLabel}>Frequency</Text>
                        <TouchableOpacity style={styles.dropdownSelectorTriggerBar} onPress={() => setShowFreqDropdown(!showFreqDropdown)}>
                          <Text style={styles.dropdownTriggerValueText}>{frequency || 'Select frequency'}</Text>
                          <Text style={styles.dropdownCaratSymbol}>▼</Text>
                        </TouchableOpacity>
                        {showFreqDropdown && (
                          <View style={styles.floatingBoxDropdown}>
                            {FREQ_OPTIONS.map((opt) => (
                              <TouchableOpacity key={opt} style={styles.dropdownSelectionRowOption} onPress={() => { setFrequency(opt); setShowFreqDropdown(false); }}>
                                <Text style={styles.dropdownOptionRowText}>{opt}</Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        )}
                      </View>
                    </View>

                    <Text style={styles.formInputHeadingFieldLabel}>Duration</Text>
                    <TextInput style={styles.formStandardBoxInput} placeholder="e.g., 7 days" value={duration} onChangeText={setDuration}/>

                    <Text style={styles.formInputHeadingFieldLabel}>Special Instructions</Text>
                    <TextInput style={styles.formStandardBoxInput} placeholder="e.g., Take with food" value={specialInstructions} onChangeText={setSpecialInstructions}/>
                  </View>
                </View>
              )}

              {workspaceTab === 'LAB_REQUESTS' && (
                <View style={styles.workspaceViewFrame}>
                  <Text style={styles.suiteTitleText}>Laboratory Requests</Text>
                  <Text style={styles.suiteSubtitleText}>Select tests to be performed</Text>

                  <View style={styles.clinicalCard}>
                    <Text style={styles.cardSectionHeading}>🔬 Common Laboratory Tests</Text>
                    <View style={styles.checkboxGridContainer}>
                      {LAB_OPTIONS.map((lab) => {
                        const isChecked = selectedLabs.includes(lab);
                        return (
                          <TouchableOpacity key={lab} style={styles.checkboxRowTrigger} onPress={() => toggleLabCheckbox(lab)}>
                            <View style={[styles.customCheckboxBox, isChecked && styles.customCheckboxChecked]}>
                              {isChecked && <Text style={styles.whiteCheckSymbol}>✓</Text>}
                            </View>
                            <Text style={styles.checkboxLabelText}>{lab}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>

                  <View style={styles.clinicalCard}>
                    <Text style={styles.formInputHeadingFieldLabel}>Add Custom Test</Text>
                    <View style={styles.inputInlineAppendRow}>
                      <TextInput style={styles.appendInlineInput} placeholder="Enter custom test name" value={customLab} onChangeText={setCustomLab}/>
                      <TouchableOpacity style={styles.appendInlineBtnBlack} onPress={() => { if(customLab.trim()) { setSelectedLabs([...selectedLabs, customLab.trim()]); setCustomLab(''); } }}>
                        <Text style={styles.btnTextWhite}>+ Add</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <Text style={styles.formInputHeadingFieldLabel}>Additional Instructions</Text>
                  <TextInput style={[styles.formStandardBoxInput, { minHeight: 60, textAlignVertical: 'top' }]} multiline placeholder="Add any special instructions for the laboratory..." value={labInstructions} onChangeText={setLabInstructions}/>
                </View>
              )}

              {workspaceTab === 'MED_CERT' && (
                <View style={styles.workspaceViewFrame}>
                  <View style={styles.suiteSubHeaderRow}>
                    <Text style={styles.suiteTitleText}>Medical Certificate</Text>
                    <TouchableOpacity style={styles.printCertificateBtn} onPress={() => alert('Certificate printed.')}>
                      <Text style={styles.btnTextBlack}>🖨️ Print Certificate</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.suiteSubtitleText}>Issue medical certificate for {selectedRequest.name}</Text>

                  <View style={styles.clinicalCard}>
                    <Text style={styles.formInputHeadingFieldLabel}>Diagnosis / Reason</Text>
                    <TextInput style={styles.formStandardBoxInput} placeholder="e.g., Acute Upper Respiratory Tract Infection" value={medCertDiagnosis} onChangeText={setMedCertDiagnosis}/>

                    <Text style={styles.formInputHeadingFieldLabel}>Date Issued</Text>
                    <TextInput style={styles.formStandardBoxInput} placeholder="07/05/2026" value={dateIssued} onChangeText={setDateIssued}/>

                    <View style={styles.infoGridRow}>
                      <View style={styles.gridColumn}>
                        <Text style={styles.formInputHeadingFieldLabel}>Rest Period Start Date</Text>
                        <TextInput style={styles.formStandardBoxInput} placeholder="mm/dd/yyyy" value={restStart} onChangeText={setRestStart}/>
                      </View>
                      <View style={styles.gridColumn}>
                        <Text style={styles.formInputHeadingFieldLabel}>Rest Period End Date</Text>
                        <TextInput style={styles.formStandardBoxInput} placeholder="mm/dd/yyyy" value={restEnd} onChangeText={setRestEnd}/>
                      </View>
                    </View>

                    <Text style={styles.formInputHeadingFieldLabel}>Number of Days Rest Recommended</Text>
                    <TextInput style={styles.formStandardBoxInput} placeholder="e.g., 3" value={restDays} onChangeText={setRestDays}/>

                    <Text style={styles.formInputHeadingFieldLabel}>Additional Remarks</Text>
                    <TextInput style={[styles.formStandardBoxInput, { minHeight: 60, textAlignVertical: 'top' }]} multiline placeholder="Any additional notes or instructions..." value={medCertRemarks} onChangeText={setMedCertRemarks}/>
                  </View>

                  <View style={styles.certificatePaperPreviewSheetFrame}>
                    <Text style={styles.paperCertificateHeaderMainTitle}>MEDICAL CERTIFICATE</Text>
                    <Text style={styles.paperHospitalBrandingSubLabel}>Healthcare Clinic</Text>
                    <Text style={styles.paperHospitalBrandingAddressText}>123 Medical Center, Manila, Philippines</Text>
                    
                    <Text style={styles.paperCalendarTimestampStamp}>📅 Date Issued: {dateIssued}</Text>
                    <Text style={styles.paperSalutationStatementLabel}>This is to certify that:</Text>
                    <Text style={styles.paperPatientTargetNameBody}>{selectedRequest.name}</Text>
                    <Text style={styles.paperDiagnosticExplanationLine}>was examined and treated at this clinic and is diagnosed with:</Text>
                    
                    <Text style={styles.paperDynamicDiagnosticValueText}>{medCertDiagnosis || '____________________'}</Text>
                    
                    {restDays ? (
                      <Text style={styles.paperRestDaysStatement}>Recommendation: Patient requires rest recovery of {restDays} days.</Text>
                    ) : null}

                    <View style={styles.paperSignatureLineWrapperBlock}>
                      <View style={styles.paperSignatureLineGraphicElement} />
                      <Text style={styles.paperPhysicianSignatureTitleText}>Attending Physician</Text>
                    </View>
                  </View>
                </View>
              )}

              <TouchableOpacity style={styles.actionFinalizeBtn} onPress={() => setIsBillingModalOpen(true)}>
                <Text style={styles.btnTextWhite}>🔒 Finalize Treatment & Open Billing Summary</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closePopupButton} onPress={() => setIsWorkspaceActive(false)}>
                <Text style={styles.closeButtonText}>◀ Back to Case Profile Overview</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>

        <TouchableOpacity style={styles.bottomDismissBar} onPress={() => { setIsWorkspaceActive(false); setSelectedPatientRequest(null); }}>
          <Text style={styles.dismissBarText}>Close Case Panel View</Text>
        </TouchableOpacity>

        {/* --- INVOICING POST-CONSULTATION BILLING OVERLAY MODAL --- */}
        <Modal visible={isBillingModalOpen} transparent animationType="slide">
          <View style={styles.modalOverlayShield}>
            <View style={styles.billingModalSheetCardContainer}>
              <View style={styles.billingHeaderSectionBlock}>
                <View style={styles.billingTitleFlexLine}>
                  <Text style={styles.billingTitleBrandedText}>$ Post-Consultation Billing</Text>
                  <TouchableOpacity onPress={() => setIsBillingModalOpen(false)}><Text style={styles.closeBillingCross}>✕</Text></TouchableOpacity>
                </View>
                <View style={styles.billingMetaRowGrid}>
                  <View style={styles.metaColumnUnit}><Text style={styles.metaLabelText}>Patient Name</Text><Text style={styles.metaValueText}>{selectedRequest.name}</Text></View>
                  <View style={styles.metaColumnUnit}><Text style={styles.metaLabelText}>Ticket ID</Text><Text style={styles.metaValueText}>T-005</Text></View>
                  <View style={styles.metaColumnUnit}><Text style={styles.metaLabelText}>Consultation Type</Text><Text style={styles.metaValueText}>{selectedRequest.type}</Text></View>
                  <View style={styles.metaColumnUnit}><Text style={styles.metaLabelText}>Assigned Doctor</Text><Text style={styles.metaValueText}>Dr. Juan Dela Cruz</Text></View>
                </View>
              </View>
              
              <ScrollView style={styles.billingScrollableBodyArea}>
                <View style={styles.clinicalWhiteFormCard}>
                  <Text style={styles.cardSectionHeading}>📄 Consultation Summary</Text>
                  <View style={styles.infoGridRow}>
                    <View style={styles.gridColumn}><Text style={styles.gridLabel}>Base Consultation Fee</Text><Text style={styles.baseFeeEmphasizedText}>₱1000.00</Text></View>
                    <View style={styles.gridColumn}><Text style={styles.gridLabel}>Consultation Date</Text><Text style={styles.gridValue}>7/5/2026</Text></View>
                  </View>
                  <View style={[styles.infoGridRow, { marginTop: 10 }]}>
                    <View style={styles.gridColumn}><Text style={styles.gridLabel}>Duration</Text><Text style={styles.gridValue}>30 mins</Text></View>
                    <View style={styles.gridColumn}>
                      <Text style={styles.gridLabel}>Payment Type</Text>
                      <View style={styles.fakeDropdownSelectorFrame}><Text style={styles.gridValue}>{paymentType} ▼</Text></View>
                    </View>
                  </View>
                </View>
                
                <Text style={styles.subCardSectionTitle}>Additional Billable Services</Text>
                {billingServices.map((service) => (
                  <TouchableOpacity key={service.id} style={styles.serviceCheckboxRowTriggerBar} onPress={() => toggleBillingService(service.id)}>
                    <View style={styles.checkboxLabelFlexLineAlign}>
                      <View style={[styles.customCheckboxBox, service.selected && styles.customCheckboxChecked]} />
                      <Text style={styles.billingServiceLabelNameText}>{service.name}</Text>
                    </View>
                    <Text style={service.selected ? styles.servicePriceLabelTextSelected : styles.servicePriceLabelText}>₱ {service.price}</Text>
                  </TouchableOpacity>
                ))}

                <View style={styles.clinicalWhiteFormCard}>
                  <Text style={styles.formInputHeadingFieldLabel}>Add Custom Service</Text>
                  <View style={styles.inputInlineAppendRow}>
                    <TextInput style={[styles.appendInlineInput, { flex: 2 }]} placeholder="Service name..." value={customServiceName} onChangeText={setCustomServiceName}/>
                    <TextInput style={[styles.appendInlineInput, { flex: 1, marginLeft: 6 }]} placeholder="Amount" keyboardType="numeric" value={customServiceAmount} onChangeText={setCustomServiceAmount}/>
                    <TouchableOpacity style={styles.appendCustomServicePlusBtn} onPress={handleAddCustomService}><Text style={styles.btnTextWhite}>+</Text></TouchableOpacity>
                  </View>
                </View>

                <View style={styles.finalBillingSummaryBlueCardBox}>
                  <Text style={styles.summaryBoxMasterHeading}>Final Billing Summary</Text>
                  <View style={styles.summaryInvoiceItemFlexRow}><Text style={styles.summaryItemLabel}>Base Consultation Fee</Text><Text style={styles.summaryItemValue}>₱1000.00</Text></View>
                  <View style={styles.summaryInvoiceItemFlexRow}><Text style={styles.summaryItemLabel}>Subtotal</Text><Text style={styles.summaryItemValue}>₱{calculateFinalTotal().toFixed(2)}</Text></View>
                  <View style={[styles.summaryInvoiceItemFlexRow, { marginTop: 12, borderTopWidth: 1, borderTopColor: '#DBEAFE', paddingTop: 8 }]}>
                    <Text style={styles.summaryItemFinalLabel}>Final Total</Text>
                    <Text style={styles.summaryItemFinalValue}>₱{calculateFinalTotal().toFixed(2)}</Text>
                  </View>
                  <View style={[styles.summaryInvoiceItemFlexRow, { marginTop: 12, alignItems: 'center' }]}>
                    <Text style={styles.gridLabel}>Payment Status</Text>
                    <View style={styles.statusGroupPillBadgeContainer}><Text style={styles.pendingStatusBadgeText}>Pending</Text></View>
                  </View>
                </View>
              </ScrollView>

              <View style={styles.billingStickyControlsFooterBlock}>
                <View style={styles.footerActionButtonsSplitGridRow}>
                  <TouchableOpacity style={styles.footerSecondaryBtnUnit} onPress={() => setIsBillingModalOpen(false)}><Text style={styles.btnTextBlack}>Cancel</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.footerSecondaryBtnUnit} onPress={() => alert('PDF generation process dispatched.')}><Text style={styles.btnTextBlack}>⬇ Download PDF</Text></TouchableOpacity>
                </View>
                <View style={[styles.footerActionButtonsSplitGridRow, { marginTop: 8 }]}>
                  <TouchableOpacity style={styles.footerSecondaryBtnUnit} onPress={() => alert('Invoice link securely transmitted to patient email channel.')}><Text style={styles.btnTextBlack}>➔ Send to Patient</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.footerSecondaryBtnUnit} onPress={() => alert('Retrieving ledger history data structures...')}><Text style={styles.btnTextBlack}>⏱️ View History</Text></TouchableOpacity>
                </View>
                
                <TouchableOpacity style={styles.masterGreenRedirectBtn} onPress={handleCommitInvoiceDispatch}>
                  <Text style={styles.btnTextWhite}>💳 Redirect to Payment Gateway</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* REUSE LAYOUT HISTORY POPUP BACKGROUND PORT */}
        <Modal visible={isRecordModalOpen} transparent animationType="fade">
          <View style={styles.modalOverlayShield}>
            <View style={styles.recordPopupContainer}>
              <ScrollView style={{ padding: 16 }}><Text style={{ fontStyle: 'italic' }}>Historical background diagnostics logs initialized successfully.</Text></ScrollView>
              <TouchableOpacity style={styles.actionFinalizeBtn} onPress={() => setIsRecordModalOpen(false)}><Text style={styles.btnTextWhite}>Close</Text></TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>
    </View>
  );
}

const popupCardStyleWrapper = (isWorkspaceOpen) => {
  return {
    backgroundColor: '#F1F5F9',
    width: '100%',
    height: isWorkspaceOpen ? '94%' : '90%',
    borderRadius: 16,
    overflow: 'hidden'
  };
};

const styles = StyleSheet.create({
  // --- TELEHEALTH VIEWPORT SPLIT CANVAS SCROLL WRAPPERS ---
  fullscreenCallOverlayScroll: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999 },
  fullscreenCallOverlay: { flex: 1, backgroundColor: '#070F2E', flexDirection: 'column' },
  
  // ADJUSTED: Fixed video frame height parameters to avoid layout occlusion
  leftVideoStreamCanvas: { height: 420, backgroundColor: '#0F172A', position: 'relative', justifyContent: 'center', alignItems: 'center' },
  videoTopOverlayRow: { position: 'absolute', top: 15, left: 15, right: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 10 },
  patientBadgeGroupColumn: { flexDirection: 'column' },
  videoPatientNameTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  videoConnectivityIndicatorRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  videoStatusSubtitleText: { color: '#94A3B8', fontSize: 11, marginRight: 6 },
  greenLiveConnectedDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#10B981', marginRight: 4 },
  connectedCaptionLabel: { color: '#10B981', fontSize: 11, fontWeight: '600' },
  floatingVideoTimerBox: { backgroundColor: 'rgba(0, 0, 0, 0.6)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 15, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  videoTimerText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  
  centeredPatientAvatarContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 15 },
  largePatientProfileCircle: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#2563EB', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  largeAvatarProfileChar: { fontSize: 28, color: '#FFFFFF' },
  largePatientNameLabelText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  patientLabelBadge: { backgroundColor: 'rgba(37, 99, 235, 0.2)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, marginTop: 4 },
  badgeLabelFormatText: { color: '#60A5FA', fontSize: 9, fontWeight: '700' },
  
  doctorPipPreviewBoxWindow: { position: 'absolute', bottom: 70, right: 15, width: 75, height: 95, backgroundColor: '#1E293B', borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center' },
  doctorMiniAvatarIndicatorCircle: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#10B981', justifyContent: 'center', alignItems: 'center', marginBottom: 4 },
  miniDocSymbolChar: { fontSize: 14 },
  pipDocCaptionLabelText: { color: '#94A3B8', fontSize: 9, fontWeight: '600' },
  
  mediaControlsHudRowContainerStrip: { position: 'absolute', bottom: 12, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.6)', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 25 },
  hudCircleButton: { width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 },
  hudActiveAlertStateBtn: { backgroundColor: '#EF4444' },
  hudSymbolIconText: { fontSize: 14, color: '#FFFFFF' },
  hudRedEndCallDisconnectBtn: { width: 40, height: 34, borderRadius: 17, backgroundColor: '#EF4444', justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 },
  
  // ADJUSTED: Re-allocated padding parameters to provide vertical scaling visibility
  rightClinicalWorkspaceSidebarDeck: { backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E2E8F0', padding: 14, paddingBottom: 35 },
  sidebarWorkspaceHeadingTitle: { fontSize: 15, fontWeight: '800', color: '#0F172A' },
  sidebarWorkspaceSubtitleCaption: { fontSize: 11, color: '#64748B', marginTop: 1, marginBottom: 8 },
  sidebarHeaderControlsFlexRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  sidebarWhiteRequestRecordsTriggerBtn: { flex: 1.2, borderWidth: 1, borderColor: '#CBD5E1', paddingVertical: 6, borderRadius: 6, alignItems: 'center', marginRight: 8, backgroundColor: '#FFFFFF' },
  sidebarGreenCompleteCaseTriggerBtn: { flex: 1, backgroundColor: '#10B981', paddingVertical: 6, borderRadius: 6, alignItems: 'center' },
  
  microSidebarSegmentTabSelectorRowBar: { flexDirection: 'row', backgroundColor: '#E2E8F0', borderRadius: 8, padding: 3, marginBottom: 10 },
  microTabButton: { flex: 1, paddingVertical: 6, alignItems: 'center', borderRadius: 6 },
  activeMicroTabStyleLine: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1' },
  microTabTextFormat: { fontSize: 11, color: '#475569', fontWeight: '500' },
  activeMicroTextWeightText: { color: '#0F172A', fontWeight: '700' },
  
  sidebarScrollContentWrapperBlock: { flexDirection: 'column' },
  sidebarFormCardStackPaddingBlock: { paddingBottom: 5 },
  microFieldLabelHeadingInputTitle: { fontSize: 11, fontWeight: '700', color: '#334155', marginTop: 6, marginBottom: 3 },
  sidebarTextMultiLineInputBox: { backgroundColor: '#F1F5F9', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 6, padding: 8, fontSize: 13, minHeight: 45, textAlignVertical: 'top', color: '#334155', marginBottom: 4 },
  microFormSectionTitleLabelHeader: { fontSize: 12, fontWeight: '700', color: '#475569', marginBottom: 6 },
  sidebarTextFormInputSingleLineFieldBox: { backgroundColor: '#F1F5F9', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 6, fontSize: 13, marginBottom: 6, color: '#334155' },
  sidebarBlackActionCommitBtn: { backgroundColor: '#070F2E', borderRadius: 6, paddingVertical: 8, alignItems: 'center', marginTop: 6 },

  // STANDARD PROFILE STYLES MAPPINGS
  headerBanner: { backgroundColor: '#FFFFFF', padding: 10, borderBottomWidth: 1, borderBottomColor: '#E2E8F0', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerProfileRow: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 4 },
  avatarCircleText: { width: 36, height: 38, borderRadius: 18, backgroundColor: '#2196F3', justifyContent: 'center', alignItems: 'center', marginRight: 6 },
  avatarInitials: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 13 },
  headerMetadata: { flexDirection: 'column', flex: 1 },
  patientNameTitle: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
  subSubtitleText: { fontSize: 11, color: '#64748B', marginTop: 1 },
  
  startVideoCallBtn: { backgroundColor: '#2563EB', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6, marginRight: 6 },
  generateInvoiceTopTriggerBtn: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  invoiceBtnText: { fontSize: 12, fontWeight: '700', color: '#0F172A' },

  workspaceSegmentBar: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E2E8F0', height: 46 },
  workTabButton: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  activeWorkTab: { borderBottomWidth: 3, borderBottomColor: '#2563EB' },
  workTabFormatText: { fontSize: 13, color: '#64748B', fontWeight: '500' },
  activeWorkTabText: { color: '#2563EB', fontWeight: '700' },
  modalScrollBody: { flex: 1, padding: 10 },

  clinicalCard: { backgroundColor: '#FFFFFF', borderRadius: 10, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  cardSectionHeading: { fontSize: 13, fontWeight: '700', color: '#1E293B', marginBottom: 8 },
  infoGridRow: { flexDirection: 'row', justifyContent: 'space-between' },
  gridColumn: { width: '48%' },
  gridLabel: { fontSize: 11, color: '#64748B', fontWeight: '500' },
  gridValue: { fontSize: 13, fontWeight: '700', color: '#0F172A', marginTop: 1 },
  
  subCardSectionFieldTitle: { fontSize: 12, fontWeight: '700', color: '#475569', marginTop: 12, marginBottom: 6, textTransform: 'uppercase' },
  allergiesPillsFlexRow: { flexDirection: 'row', marginBottom: 6 },
  allergyBadgeItem: { backgroundColor: '#FEE2E2', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginRight: 6, borderWidth: 1, borderColor: '#FCA5A5' },
  allergyBadgeText: { color: '#991B1B', fontSize: 12, fontWeight: '600' },
  bulletHistoryItemText: { fontSize: 13, color: '#334155', marginVertical: 2, paddingLeft: 4, fontWeight: '500' },

  patientConcernContainer: { backgroundColor: '#EFF6FF', padding: 8, borderRadius: 6, marginVertical: 4 },
  concernLabelText: { fontSize: 11, fontWeight: '700', color: '#1D4ED8' },
  concernBodyContent: { fontSize: 12, color: '#1E293B', fontStyle: 'italic' },
  vitalValuesBody: { fontSize: 12, fontWeight: '600', color: '#334155', marginTop: 2 },

  triggerHistoryBanner: { backgroundColor: '#FFFFFF', borderRadius: 8, borderWidth: 1, borderColor: '#CBD5E1', padding: 10, flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  triggerBannerIcon: { fontSize: 16, marginRight: 8 },
  triggerTextGroup: { flex: 1 },
  triggerMainLabel: { fontSize: 13, fontWeight: '700', color: '#1E3A8A' },
  triggerSubLabel: { fontSize: 11, color: '#64748B', marginTop: 1 },

  timerContainer: { backgroundColor: '#F1F5F9', paddingHorizontal: 6, paddingVertical: 3, borderRadius: 4, alignSelf: 'flex-start', marginTop: 4 },
  timerValueText: { fontSize: 11, fontWeight: '700', color: '#2563EB' },

  soapSectionMasterHeader: { fontSize: 12, fontWeight: '800', color: '#334155', marginBottom: 6 },
  soapInputBox: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 6, padding: 8, minHeight: 44, textAlignVertical: 'top', fontSize: 13 },

  workspaceViewFrame: { marginTop: 4 },
  suiteTitleText: { fontSize: 16, fontWeight: '700', color: '#0F172A', marginBottom: 4 },
  suiteSubtitleText: { fontSize: 12, color: '#64748B', marginBottom: 12 },
  medicationCardItemUnit: { backgroundColor: '#FFFFFF', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  prescriptionAddBtn: { backgroundColor: '#000000', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 4 },
  formInputHeadingFieldLabel: { fontSize: 12, fontWeight: '600', color: '#334155', marginBottom: 4, marginTop: 8 },
  formStandardBoxInput: { backgroundColor: '#F1F5F9', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 6, fontSize: 13, marginBottom: 4 },
  
  dropdownSelectorTriggerBar: { backgroundColor: '#F1F5F9', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 6, flexDirection: 'row', justifyContent: 'space-between' },
  dropdownTriggerValueText: { fontSize: 13, color: '#334155' },
  dropdownCaratSymbol: { fontSize: 10, color: '#64748B' },
  floatingBoxDropdown: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 6, marginTop: 2 },
  dropdownSelectionRowOption: { padding: 8 },
  dropdownOptionRowText: { fontSize: 12 },

  checkboxGridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  checkboxRowTrigger: { width: '48%', flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  customCheckboxBox: { width: 18, height: 18, borderRadius: 4, borderWidth: 1, borderColor: '#CBD5E1', marginRight: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC' },
  customCheckboxChecked: { backgroundColor: '#2563EB', borderColor: '#2563EB' },
  whiteCheckSymbol: { color: '#FFFFFF', fontSize: 11, fontWeight: 'bold' },
  checkboxLabelText: { fontSize: 12, color: '#334155', flex: 1 },
  inputInlineAppendRow: { flexDirection: 'row', marginTop: 4 },
  appendInlineInput: { flex: 1, backgroundColor: '#F1F5F9', borderRadius: 6, paddingHorizontal: 12, fontSize: 13, height: 36 },
  appendInlineBtnBlack: { backgroundColor: '#000000', paddingHorizontal: 14, borderRadius: 6, justifyContent: 'center' },

  printCertificateBtn: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  certificatePaperPreviewSheetFrame: { backgroundColor: '#FFFFFF', borderRadius: 10, borderWidth: 1, borderColor: '#CBD5E1', padding: 20, marginTop: 12 },
  paperCertificateHeaderMainTitle: { fontSize: 18, fontWeight: '800', textAlign: 'center', color: '#000000' },
  paperHospitalBrandingSubLabel: { fontSize: 13, color: '#475569', textAlign: 'center', marginTop: 4 },
  paperHospitalBrandingAddressText: { fontSize: 11, color: '#64748B', textAlign: 'center' },
  paperCalendarTimestampStamp: { fontSize: 12, color: '#334155', marginTop: 16, fontWeight: '600' },
  paperSalutationStatementLabel: { fontSize: 13, color: '#334155', marginTop: 12 },
  paperPatientTargetNameBody: { fontSize: 16, fontWeight: '700', textAlign: 'center', marginVertical: 10 },
  paperDiagnosticExplanationLine: { fontSize: 12, color: '#334155', lineHeight: 18 },
  paperDynamicDiagnosticValueText: { fontSize: 14, fontWeight: '700', textAlign: 'center', marginTop: 10, textDecorationLine: 'underline' },
  paperRestDaysStatement: { fontSize: 12, color: '#1E3A8A', fontStyle: 'italic', marginTop: 12, textAlign: 'center' },
  paperSignatureLineWrapperBlock: { marginTop: 30, alignSelf: 'flex-end', alignItems: 'center', width: 160 },
  paperSignatureLineGraphicElement: { width: '100%', height: 1, backgroundColor: '#000000', marginBottom: 4 },
  paperPhysicianSignatureTitleText: { fontSize: 12, fontWeight: '700' },

  actionAcceptBtn: { backgroundColor: '#10B981', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 10, marginBottom: 6 },
  splitButtonRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  actionDenyBtn: { backgroundColor: '#EF4444', padding: 10, borderRadius: 8, alignItems: 'center', width: '48%' },
  actionTransferBtn: { backgroundColor: '#F97316', padding: 10, borderRadius: 8, alignItems: 'center', width: '48%' },
  actionFinalizeBtn: { backgroundColor: '#2196F3', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 12, marginBottom: 8 },
  closePopupButton: { backgroundColor: '#64748B', padding: 10, borderRadius: 8, alignItems: 'center' },
  closeButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 12 },
  bottomDismissBar: { height: 40, backgroundColor: '#0F172A', justifyContent: 'center', alignItems: 'center' },
  dismissBarText: { color: '#FFFFFF', fontWeight: '700', fontSize: 12 },
  btnTextWhite: { color: '#FFFFFF', fontWeight: '700', fontSize: 12 },
  btnTextBlack: { color: '#0F172A', fontWeight: '700', fontSize: 12 },

  billingModalSheetCardContainer: { backgroundColor: '#F8FAFC', width: '100%', height: '90%', borderRadius: 14, overflow: 'hidden' },
  billingHeaderSectionBlock: { backgroundColor: '#FFFFFF', padding: 14, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  billingTitleFlexLine: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  billingTitleBrandedText: { fontSize: 16, fontWeight: '800', color: '#1E3A8A' },
  closeBillingCross: { fontSize: 16, color: '#64748B' },
  billingMetaRowGrid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 12, justifyContent: 'space-between' },
  metaColumnUnit: { width: '24%', minWidth: 70 },
  metaLabelText: { fontSize: 11, color: '#64748B', fontWeight: '500' },
  metaValueText: { fontSize: 13, fontWeight: '700', color: '#1E293B', marginTop: 2 },
  billingScrollableBodyArea: { flex: 1, padding: 12 },
  
  clinicalWhiteFormCard: { backgroundColor: '#FFFFFF', borderRadius: 10, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  baseFeeEmphasizedText: { fontSize: 14, fontWeight: '700', color: '#2563EB' },
  fakeDropdownSelectorFrame: { backgroundColor: '#F1F5F9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginTop: 2 },
  subCardSectionTitle: { fontSize: 12, fontWeight: '700', color: '#475569', marginBottom: 8, textTransform: 'uppercase' },
  serviceCheckboxRowTriggerBar: { backgroundColor: '#FFFFFF', borderRadius: 8, padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, borderWidth: 1, borderColor: '#E2E8F0' },
  checkboxLabelFlexLineAlign: { flexDirection: 'row', alignItems: 'center' },
  billingServiceLabelNameText: { fontSize: 12, fontWeight: '600', color: '#1E293B' },
  servicePriceLabelText: { fontSize: 12, fontWeight: '500', color: '#475569' },
  servicePriceLabelTextSelected: { fontSize: 12, fontWeight: '700', color: '#2563EB' },
  appendCustomServicePlusBtn: { backgroundColor: '#475569', width: 36, height: 36, borderRadius: 6, justifyContent: 'center', alignItems: 'center', marginLeft: 6 },
  
  finalBillingSummaryBlueCardBox: { backgroundColor: '#EFF6FF', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: '#BFDBFE', marginTop: 10 },
  summaryBoxMasterHeading: { fontSize: 14, fontWeight: '700', color: '#1E40AF', marginBottom: 10 },
  summaryInvoiceItemFlexRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  summaryItemLabel: { fontSize: 12, color: '#475569', fontWeight: '500' },
  summaryItemValue: { fontSize: 13, fontWeight: '600', color: '#1E293B' },
  summaryItemFinalLabel: { fontSize: 14, fontWeight: '700', color: '#1E40AF' },
  summaryItemFinalValue: { fontSize: 16, fontWeight: '800', color: '#2563EB', marginTop: 2 },
  statusGroupPillBadgeContainer: { backgroundColor: '#FEE2E2', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4 },
  pendingStatusBadgeText: { color: '#9B1C1C', fontSize: 12, fontWeight: '700' },
  
  billingStickyControlsFooterBlock: { backgroundColor: '#FFFFFF', padding: 12, borderTopWidth: 1, borderTopColor: '#E2E8F0' },
  footerActionButtonsSplitGridRow: { flexDirection: 'row', justifyContent: 'space-between' },
  footerSecondaryBtnUnit: { flex: 1, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', paddingVertical: 8, borderRadius: 6, alignItems: 'center', marginHorizontal: 3 },
  masterGreenRedirectBtn: { backgroundColor: '#10B981', paddingVertical: 10, borderRadius: 6, alignItems: 'center', marginTop: 12 },
  modalOverlayShield: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  recordPopupContainer: { backgroundColor: '#FFFFFF', width: '90%', height: '70%', borderRadius: 12, padding: 16 }
});