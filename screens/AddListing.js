import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  FlatList,
  Button,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import { DropDown } from '../components/DropDownPicker';
import { TextInputMask } from 'react-native-masked-text';
import DateTimePicker from '@react-native-community/datetimepicker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function AddListing() {
  const [listingTitle, setListingTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [skillsOption, setSkillsOption] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [mode, setMode] = useState('date');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    getSkillsOptions().then((data) => {
      const formattedSkills = data.data.skills.map((skill) => {
        return { label: skill, value: skill };
      });
      setSkillsOption(formattedSkills);
    });
  }, []);

  const getSkillsOptions = () => {
    return axios.get(`https://voluntier-api.codermatt.com/api/skills`);
  };

  const handleImageUpload = () => {};

  const handleSubmitListing = () => {
    const listingData = {
      list_title: listingTitle,
      list_location: location,
      list_date: date.toISOString().split('T')[0],
      list_time: time.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      list_duration: duration,
      list_description: description,
      list_latitude: latitude,
      list_longitude: longitude,
      list_skills: value,
      list_visible: true,
    };
    console.log(listingData);
    // Submit the listingData to your backend
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  const showMode = (currentMode) => {
    setShowDatePicker(currentMode === 'date');
    setShowTimePicker(currentMode === 'time');
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const renderFormFields = () => {
    return (
      <>
        <Text style={styles.heading}>Create a new listing</Text>

        <Text style={styles.label}>Listing Title</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Listing Title"
          value={listingTitle}
          onChangeText={(input) => setListingTitle(input)}
        />

        <Text style={styles.label}>Location</Text>
        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            setLocation(data.description);
            setLatitude(details.geometry.location.lat);
            setLongitude(details.geometry.location.lng);
          }}
          query={{
            key: 'AIzaSyClTqhXEQu1PceR0w04nYWu2TkAbyiuAJs',
            language: 'en',
          }}
          fetchDetails={true}
          styles={{
            textInput: styles.inputField,
            container: { flex: 0 },
          }}
        />
        {/* <TextInput
          style={styles.inputField}
          placeholder="Location"
          value={location}
          onChangeText={(input) => setLocation(input)}
        /> */}

        <Text style={styles.label}>Date</Text>

        <Button
          title="Open Date Picker"
          onPress={showDatepicker}
        />

        <TextInput
          style={styles.inputField}
          placeholder="Select Date"
          value={date.toDateString()}
          editable={false}
          pointerEvents="none"
        />

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Text style={styles.label}>Start Time</Text>
        <Button
          title="Open Time Picker"
          onPress={() => setShowTimePicker(true)}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Select Time"
          value={time.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
          editable={false}
          pointerEvents="none"
        />
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleTimeChange}
          />
        )}

        <Text style={styles.label}>Duration in hours</Text>
        <TextInput
          style={styles.inputField}
          placeholder="A number between 1 and 8"
          value={duration}
          onChangeText={(input) => setDuration(input)}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.inputField}
          placeholder="A quick description of the job"
          value={description}
          onChangeText={(input) => setDescription(input)}
        />

        <Pressable
          onPress={handleImageUpload}
          style={styles.uploadButton}>
          <Text style={styles.buttonText}>Upload Image</Text>
        </Pressable>

        <Text style={styles.label}>Skills required</Text>
        <DropDown
          open={open}
          value={value}
          items={skillsOption}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setSkillsOption}
          multiple={true}
          min={0}
          max={7}
        />

        <Pressable
          onPress={handleSubmitListing}
          style={styles.submitButton}>
          <Text style={styles.buttonText}>Post</Text>
        </Pressable>
      </>
    );
  };

  return (
    <FlatList
      data={[{ key: 'form' }]}
      renderItem={renderFormFields}
      keyExtractor={(item) => item.key}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    flexGrow: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#495057',
    marginBottom: 5,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#ffffff',
  },
  uploadButton: {
    backgroundColor: '#6c757d',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
