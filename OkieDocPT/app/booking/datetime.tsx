import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Platform, Modal } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';

/*
 * TODO (Integration):
 * The `TIME_SLOTS` array below contains static placeholder data.
 * When hooking this up to a real system:
 * 1. Fetch available time slots dynamically from your scheduling API.
 * 2. Pass the selected therapist ID (and possibly the therapy type) 
 *    from the previous screens via context or `useLocalSearchParams`
 *    to query availability for that specific therapist on the chosen date.
 */
const TIME_SLOTS = [
  { id: '8am', label: '8:00 AM' },
  { id: '10am', label: '10:00 AM' },
  { id: '11am', label: '11:00 AM' },
  { id: '1pm', label: '1:00 PM' },
  { id: '3pm', label: '3:00 PM' },
  { id: '5pm', label: '5:00 PM' },
];

export default function ChooseDateTimeScreen() {
  const router = useRouter();
  
  const [date, setDate] = useState(new Date(2026, 4, 23)); // May 23, 2026
  const [tempDate, setTempDate] = useState(new Date(2026, 4, 23));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState('10am');

  const onDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
      if (selectedDate) {
        setDate(selectedDate);
      }
    } else {
      if (selectedDate) {
        setTempDate(selectedDate);
      }
    }
  };

  const confirmDate = () => {
    setDate(tempDate);
    setShowDatePicker(false);
  };

  const cancelDate = () => {
    setTempDate(date);
    setShowDatePicker(false);
  };

  const formatDate = (d: Date) => {
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <SafeAreaView style={styles.container}>
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

      <View style={styles.titleRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>Choose Date & Time</Text>
        <Text style={styles.pageSubtitle}>Select your preferred date and time</Text>

        {/* Date Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Date</Text>
          <TouchableOpacity 
            style={styles.dateInputBox}
            onPress={() => setShowDatePicker(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.dateInputValue}>{formatDate(date)}</Text>
            <Feather name="calendar" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* iOS Date Picker Modal */}
        {Platform.OS === 'ios' ? (
          <Modal visible={showDatePicker} transparent animationType="fade">
            <View style={styles.modalBackdrop}>
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Select Date</Text>
                </View>
                <DateTimePicker
                  value={tempDate}
                  mode="date"
                  display="spinner"
                  minimumDate={new Date(2026, 0, 1)}
                  maximumDate={new Date(2026, 11, 31)}
                  onChange={onDateChange}
                  textColor="#000000"
                />
                <View style={styles.modalFooter}>
                  <TouchableOpacity style={styles.modalButton} onPress={cancelDate}>
                    <Text style={styles.modalButtonTextCancel}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.modalButton, styles.modalButtonPrimary]} onPress={confirmDate}>
                    <Text style={styles.modalButtonTextConfirm}>OK</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        ) : (
          showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              minimumDate={new Date(2026, 0, 1)}
              maximumDate={new Date(2026, 11, 31)}
              onChange={onDateChange}
            />
          )
        )}

        {/* Time Slots */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Available Time Slots</Text>
          
          <View style={styles.timeSlotsContainer}>
            {TIME_SLOTS.map((slot) => {
              const isSelected = selectedTime === slot.id;
              return (
                <TouchableOpacity 
                  key={slot.id}
                  style={styles.timeSlotCard}
                  onPress={() => setSelectedTime(slot.id)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.timeSlotLabel}>{slot.label}</Text>
                  <View style={styles.radioContainer}>
                    {isSelected ? (
                      <View style={styles.radioSelectedContainer}>
                        <View style={styles.radioSelectedInner} />
                      </View>
                    ) : (
                      <View style={styles.radioEmpty} />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => router.back()}
        >
          <Text style={styles.secondaryButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => router.push('/booking/summary')}
        >
          <Text style={styles.primaryButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    marginBottom: 16,
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
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  backButton: {
    padding: 4,
    marginLeft: -4,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C3F95',
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A7FB8',
    marginBottom: 32,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1C3F95',
    marginBottom: 12,
  },
  dateInputBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D0E4F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  dateInputValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C3F95',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    marginBottom: 16,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C3F95',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#F4FAFF',
  },
  modalButtonPrimary: {
    backgroundColor: '#286EF0',
  },
  modalButtonTextCancel: {
    color: '#4A7FB8',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalButtonTextConfirm: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  timeSlotsContainer: {
    gap: 12,
  },
  timeSlotCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#D0E4F5',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  timeSlotLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C3F95',
  },
  radioContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioEmpty: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D0D0D0',
  },
  radioSelectedContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#28A745',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelectedInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  bottomBar: {
    flexDirection: 'row',
    padding: 24,
    paddingBottom: 34,
    backgroundColor: '#FFFFFF',
    gap: 16,
  },
  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D0E4F5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#286EF0',
    fontSize: 18,
    fontWeight: 'bold',
  },
  primaryButton: {
    flex: 1,
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
});
