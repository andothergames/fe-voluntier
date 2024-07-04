import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  FlatList,
} from 'react-native';
import axios from 'axios';
import { DropDown } from '../components/DropDownPicker';

export default function AddListing() {
  const [listingTitle, setListingTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [skillsOption, setSkillsOption] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

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

  const handleSubmitListing = () => {};

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
        <TextInput
          style={styles.inputField}
          placeholder="Location"
          value={location}
          onChangeText={(input) => setLocation(input)}
        />

        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Date"
          value={date}
          onChangeText={(input) => setDate(input)}
        />

        <Text style={styles.label}>Time</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Time"
          value={time}
          onChangeText={(input) => setTime(input)}
        />

        <Text style={styles.label}>Duration</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Duration"
          value={duration}
          onChangeText={(input) => setDuration(input)}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Description"
          value={description}
          onChangeText={(input) => setDescription(input)}
        />

        <Pressable
          onPress={handleImageUpload}
          style={styles.uploadButton}>
          <Text style={styles.buttonText}>Upload Image</Text>
        </Pressable>

        <Text style={styles.label}>Skills</Text>
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

//   return (
//     <View style={styles.formContainer}>
//       <Text style={styles.heading}>Create a new listing</Text>

//       <Text style={styles.label}>Listing Title</Text>
//       <TextInput
//         style={styles.inputField}
//         placeholder="listing title"
//         value={listingTitle}
//         onChangeText={(input) => setListingTitle(input)}
//       />
//       <Text style={styles.label}>Location</Text>
//       <TextInput
//         style={styles.inputField}
//         placeholder="location"
//         value={location}
//         onChangeText={(input) => setLocation(input)}
//       />
//       <Text style={styles.label}>Date</Text>
//       <TextInput
//         style={styles.inputField}
//         placeholder="date"
//         value={date}
//         onChangeText={(input) => setDate(input)}
//       />
//       <Text style={styles.label}>Time</Text>
//       <TextInput
//         style={styles.inputField}
//         placeholder="time"
//         value={time}
//         onChangeText={(input) => setTime(input)}
//       />
//       <Text style={styles.label}>Duration</Text>
//       <TextInput
//         style={styles.inputField}
//         placeholder="duration"
//         value={duration}
//         onChangeText={(input) => setDuration(input)}
//       />
//       <Text style={styles.label}>Description</Text>
//       <TextInput
//         style={styles.inputField}
//         placeholder="description"
//         value={description}
//         onChangeText={(input) => setDescription(input)}
//       />
//       <Pressable
//         onPress={handleImageUpload}
//         style={styles.inputField}>
//         <Text style={styles.button}>Image Upload</Text>
//       </Pressable>
//       <Text style={styles.label}>Skills</Text>
//       <DropDown
//         open={open}
//         value={value}
//         items={skillsOption}
//         setOpen={setOpen}
//         setValue={setValue}
//         setItems={setSkillsOption}
//       />

//       <Pressable
//         onPress={handleSubmitListing}
//         style={styles.button}>
//         <Text style={styles}>Post</Text>
//       </Pressable>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 8,
//   },
//   heading: {
//     backgroundColor: '#7dd3fc',
//     marginVertical: 15,
//     textAlign: 'center',
//     padding: 10,
//     borderRadius: 10,
//     overflow: 'hidden',
//   },
//   formContainer: {
//     gap: 5,
//   },
//   label: {
//     borderWidth: 1,
//     borderColor: 'red',
//   },
//   inputField: {
//     borderWidth: 1,
//     borderColor: 'green',
//   },
//   button: {
//     backgroundColor: 'blue',
//     borderRadius: 5,
//   },
// });
