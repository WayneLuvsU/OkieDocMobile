import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Modal, Pressable, Platform, KeyboardAvoidingView } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useApp } from '@/context/AppContext';

const MOCK_THERAPISTS = [
  { id: '1', name: 'Johnson, PT', title: 'Physical Therapist', avatar: 'doctor' },
  { id: '2', name: 'Smith, OT', title: 'Occupational Therapist', avatar: 'doctor' },
  { id: '3', name: 'Davis, ST', title: 'Speech Therapist', avatar: 'doctor' },
];

const MOCK_TIMES = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM'];

export default function ScheduleAppointmentScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const { referrals } = useApp();

  const data = referrals.find((r) => r.id === id) || referrals[0];
  
  const [notes, setNotes] = useState('Patient needs core strengthening and posture training');
  const [selectedTherapist, setSelectedTherapist] = useState(MOCK_THERAPISTS[0]);
  
  // Date State
  const today = new Date();
  const currentYear = today.getFullYear();
  const [selectedDate, setSelectedDate] = useState(today);
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const [selectedTime, setSelectedTime] = useState(MOCK_TIMES[2]);

  const [showTherapistModal, setShowTherapistModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);

  // Format Date for Display (e.g., "May 23, 2026")
  const formatDate = (date: any) => {
    const validDate = date instanceof Date ? date : new Date(date);
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    return validDate.toLocaleDateString('en-US', options);
  };

  const onDateChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollContent}>
          
          {/* Header Logo */}
          <View style={styles.headerLogoContainer}>
            <View style={styles.logoBox}>
              <Text style={styles.logoText}>O<Text style={styles.logoPlus}>+</Text></Text>
            </View>
            <View style={styles.brandTextContainer}>
              <Text style={styles.brandName}>OkieDoc+</Text>
              <Text style={styles.brandSubtitle}>PT</Text>
            </View>
          </View>

          {/* Back Button & Title */}
          <View style={styles.titleRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Feather name="arrow-left" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.pageTitle}>Schedule Appointment</Text>

          {/* Form Container */}
          <View style={styles.formContainer}>
            
            {/* Patient Section */}
            <View style={styles.fieldSection}>
              <Text style={styles.fieldLabel}>Patient</Text>
              <View style={styles.cardBox}>
                <View style={styles.avatarContainer}>
                  {data.gender === 'Female' ? (
                    <MaterialCommunityIcons name="face-woman-profile" size={50} color="#E83E8C" />
                  ) : (
                    <MaterialCommunityIcons name="face-man-profile" size={50} color="#007BFF" />
                  )}
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{data.patientName}</Text>
                  <Text style={styles.cardSubtext}>{data.age} • {data.gender}</Text>
                  <Text style={styles.cardTextLight}>{data.issue}</Text>
                </View>
              </View>
            </View>

            {/* Therapy Type Section */}
            <View style={styles.fieldSection}>
              <Text style={styles.fieldLabel}>Therapy Type</Text>
              <View style={styles.cardBoxCentered}>
                <MaterialCommunityIcons name="human-handsup" size={32} color="#000" style={styles.iconMargin} />
                <Text style={styles.cardTitle}>{data.therapyType}</Text>
              </View>
            </View>

            {/* Therapist Dropdown */}
            <View style={styles.fieldSection}>
              <Text style={styles.fieldLabel}>Therapist</Text>
              <TouchableOpacity 
                style={styles.dropdownBox} 
                activeOpacity={0.7}
                onPress={() => setShowTherapistModal(true)}
              >
                <View style={styles.dropdownContent}>
                  <MaterialCommunityIcons name={selectedTherapist.avatar as any} size={40} color="#007BFF" style={styles.therapistAvatar} />
                  <View style={styles.therapistInfo}>
                    <Text style={styles.dropdownTitle}>{selectedTherapist.name}</Text>
                    <Text style={styles.dropdownSubtext}>{selectedTherapist.title}</Text>
                  </View>
                </View>
                <Feather name="chevron-down" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Date Picker */}
            <View style={styles.fieldSection}>
              <Text style={styles.fieldLabel}>Date</Text>
              <TouchableOpacity 
                style={styles.inputBox} 
                activeOpacity={0.7}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.inputText}>{formatDate(selectedDate)}</Text>
                <MaterialCommunityIcons name="calendar-month-outline" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Date Picker Modal */}
            <Modal visible={showDatePicker} transparent animationType="slide">
              <View style={styles.modalOverlay}>
                <Pressable style={styles.modalBackdrop} onPress={() => setShowDatePicker(false)} />
                <View style={styles.modalContent}>
                  <View style={styles.modalHeaderRow}>
                    <Text style={styles.modalHeader}>Select Date</Text>
                    <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                      <Text style={styles.modalHeaderButton}>Done</Text>
                    </TouchableOpacity>
                  </View>
                  <DateTimePicker
                    value={selectedDate instanceof Date ? selectedDate : new Date(selectedDate)}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    minimumDate={new Date(currentYear, 0, 1)}
                    maximumDate={new Date(currentYear, 11, 31)}
                    onChange={(event: any, date?: Date) => {
                      if (Platform.OS === 'android') {
                        setShowDatePicker(false);
                      }
                      if (date) {
                        setSelectedDate(date);
                      }
                    }}
                  />
                </View>
              </View>
            </Modal>

            {/* Time Dropdown */}
            <View style={styles.fieldSection}>
              <Text style={styles.fieldLabel}>Time</Text>
              <TouchableOpacity 
                style={styles.inputBox} 
                activeOpacity={0.7}
                onPress={() => setShowTimeModal(true)}
              >
                <Text style={styles.inputText}>{selectedTime}</Text>
                <Feather name="chevron-down" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Notes Input */}
            <View style={styles.fieldSection}>
              <Text style={styles.fieldLabel}>Notes (Optional)</Text>
              <View style={styles.notesBox}>
                <TextInput 
                  style={styles.notesInput}
                  multiline
                  value={notes}
                  onChangeText={setNotes}
                  placeholder="Add any additional notes here..."
                  onFocus={() => {
                    setTimeout(() => {
                      scrollViewRef.current?.scrollToEnd({ animated: true });
                    }, 100);
                  }}
                />
              </View>
            </View>

          </View>
        </ScrollView>

        {/* Sticky Bottom Button */}
        <View style={styles.bottomBar}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => {
              router.push({
                pathname: `/referral/summary/${id}`,
                params: {
                  date: formatDate(selectedDate),
                  time: selectedTime,
                  therapistName: selectedTherapist.name,
                  therapistTitle: selectedTherapist.title,
                  notes: notes
                }
              });
            }}
          >
            <Text style={styles.primaryButtonText}>Schedule Appointment</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* MODALS */}
      {/* Therapist Modal */}
      <Modal visible={showTherapistModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalBackdrop} onPress={() => setShowTherapistModal(false)} />
          <View style={styles.modalContent}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalHeader}>Select Therapist</Text>
              <TouchableOpacity onPress={() => setShowTherapistModal(false)}>
                <Feather name="x" size={24} color="#8E8E93" />
              </TouchableOpacity>
            </View>
            {MOCK_THERAPISTS.map((th) => {
              const isSelected = selectedTherapist.id === th.id;
              return (
                <TouchableOpacity 
                  key={th.id} 
                  style={[styles.modalOption, isSelected && styles.modalOptionSelected]}
                  onPress={() => {
                    setSelectedTherapist(th);
                    setShowTherapistModal(false);
                  }}
                >
                  <View style={styles.modalOptionLeft}>
                    <MaterialCommunityIcons name={th.avatar as any} size={36} color={isSelected ? "#286EF0" : "#8E8E93"} style={styles.modalOptionIcon} />
                    <View>
                      <Text style={[styles.modalOptionTitle, isSelected && styles.modalOptionTitleSelected]}>{th.name}</Text>
                      <Text style={styles.modalOptionSubtext}>{th.title}</Text>
                    </View>
                  </View>
                  {isSelected && <MaterialCommunityIcons name="check-circle" size={24} color="#286EF0" />}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </Modal>

      {/* Time Modal */}
      <Modal visible={showTimeModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalBackdrop} onPress={() => setShowTimeModal(false)} />
          <View style={styles.modalContent}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalHeader}>Select Time</Text>
              <TouchableOpacity onPress={() => setShowTimeModal(false)}>
                <Feather name="x" size={24} color="#8E8E93" />
              </TouchableOpacity>
            </View>
            <View style={styles.timeGrid}>
              {MOCK_TIMES.map((time) => {
                const isSelected = selectedTime === time;
                return (
                  <TouchableOpacity 
                    key={time} 
                    style={[styles.timeChip, isSelected && styles.timeChipSelected]}
                    onPress={() => {
                      setSelectedTime(time);
                      setShowTimeModal(false);
                    }}
                  >
                    <Text style={[styles.timeChipText, isSelected && styles.timeChipTextSelected]}>{time}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  headerLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoBox: {
    width: 48,
    height: 48,
    backgroundColor: '#20B2AA',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '400',
  },
  logoPlus: {
    fontSize: 16,
    lineHeight: 20,
  },
  brandTextContainer: {
    justifyContent: 'center',
  },
  brandName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  brandSubtitle: {
    fontSize: 16,
    color: '#000000',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    marginRight: 12,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1C3F95',
    marginBottom: 24,
  },
  formContainer: {
    gap: 20,
  },
  fieldSection: {
    gap: 8,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A7FB8',
  },
  cardBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D0E4F5',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  cardBoxCentered: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D0E4F5',
    borderRadius: 12,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C3F95',
  },
  cardSubtext: {
    fontSize: 15,
    color: '#8E8E93',
    marginTop: 2,
  },
  cardTextLight: {
    fontSize: 15,
    color: '#B0B0B0',
    marginTop: 2,
  },
  iconMargin: {
    marginRight: 12,
  },
  dropdownBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#D0E4F5',
    borderRadius: 12,
    padding: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  dropdownContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  therapistAvatar: {
    marginRight: 12,
    backgroundColor: '#E6F0FA',
    borderRadius: 20,
  },
  therapistInfo: {
    justifyContent: 'center',
  },
  dropdownTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C3F95',
  },
  dropdownSubtext: {
    fontSize: 14,
    color: '#8E8E93',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#D0E4F5',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  inputText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C3F95',
  },
  notesBox: {
    borderWidth: 1,
    borderColor: '#D0E4F5',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#FFFFFF',
    minHeight: 100,
  },
  notesInput: {
    fontSize: 15,
    color: '#1C3F95',
    fontWeight: 'bold',
  },
  bottomBar: {
    padding: 24,
    paddingBottom: 34,
    backgroundColor: '#FFFFFF',
  },
  primaryButton: {
    backgroundColor: '#286EF0',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C3F95',
  },
  modalHeaderButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#286EF0',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  modalOptionSelected: {
    backgroundColor: '#F4FAFF',
    borderColor: '#B0D4F1',
  },
  modalOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalOptionIcon: {
    marginRight: 16,
  },
  modalOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A4A4A',
  },
  modalOptionTitleSelected: {
    color: '#1C3F95',
    fontWeight: 'bold',
  },
  modalOptionSubtext: {
    fontSize: 14,
    color: '#8E8E93',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeChip: {
    width: '30%',
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    backgroundColor: '#FAFAFA',
  },
  timeChipSelected: {
    backgroundColor: '#286EF0',
    borderColor: '#286EF0',
  },
  timeChipText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4A4A4A',
  },
  timeChipTextSelected: {
    color: '#FFFFFF',
  },
});
