import { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  FlatList,
  Button,
  Image,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { useNavigation } from "@react-navigation/native";

import * as postListingValidator from "../validators/post-listing.validator";
import { DropDown } from "../components/DropDownPicker";
import { UserContext } from "../contexts/user-context";
import * as api from "../api";

export default function AddListing({ setOrgListings, orgListings }) {
  const [listingTitle, setListingTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [duration, setDuration] = useState(0);
  const [description, setDescription] = useState("");
  const [skillsOption, setSkillsOption] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [mode, setMode] = useState("date");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [image, setImage] = useState({ uri: "", base64: "" });
  const { user } = useContext(UserContext);

  const navigation = useNavigation();

  const DEBUG = false;

  useEffect(() => {
    api.getSkillsOptions().then((skills) => {
      const formattedSkills = skills.map((skill) => {
        return { label: skill, value: skill };
      });
      setSkillsOption(formattedSkills);
    });
  }, []);

  const handleSubmitListing = () => {
    if (DEBUG) {
      console.log("In handleSubmitListing()");
    }

    const titleValObj = postListingValidator.validateTitle(listingTitle);
    if (!titleValObj.valid) {
      alert(titleValObj.msg);

      return;
    }

    const locValObj = postListingValidator.validateLocation(
      location,
      longitude,
      latitude
    );
    if (!locValObj.valid) {
      alert(locValObj.msg);

      return;
    }

    const dateValObj = postListingValidator.validateDate(date);
    if (!dateValObj.valid) {
      alert(dateValObj.msg);

      return;
    }

    const timeValObj = postListingValidator.validateTime(time);
    if (!timeValObj.valid) {
      alert(timeValObj.msg);

      return;
    }

    const durationValObj = postListingValidator.validateDuration(duration);
    if (!durationValObj.valid) {
      alert(durationValObj.msg);

      return;
    }

    const descValObj = postListingValidator.validateDescription(description);
    if (!descValObj.valid) {
      alert(descValObj.msg);

      return;
    }

    if (image.base64) {
      postListingValidator.validateImage(image.base64);
    } else {
      image.base64 = null;
    }

    // Validation complete!
    if (DEBUG) {
      console.log("Validation complete!");
    }

    const listingData = {
      list_title: listingTitle,
      list_location: location,
      list_date: date.toISOString().split("T")[0],
      list_time: time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      list_duration: duration,
      list_description: description,
      list_latitude: latitude,
      list_longitude: longitude,
      img_b64_data: image.base64 ? image.base64 : null,
      list_skills: value && value.length ? value : null,
    };

    // Post to server
    api
      .postListing(listingData, user.token)
      .then((listing) => {
        alert("Listing successfully posted!");

        // Fetch updated listings
        return api.getOrgListings(user.org_id, user.token);
      })
      .then((listings) => {
        setOrgListings(listings);

        navigation.navigate("TabOrgHome");
      })
      .catch(({ response }) => {
        console.log("ERROR: ", response.data);
      });
  };

  const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
      base64: false,
    });
    if (!result.canceled) {
      const manipResult = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 600 } }],
        {
          compress: 0.5,
          format: ImageManipulator.SaveFormat.JPEG,
          base64: true,
        }
      );

      if (DEBUG) {
        console.log("compressed_img_size: ", manipResult.base64.length);
      }

      setImage({
        uri: manipResult.uri,
        base64: `data:image/jpeg;base64,${manipResult.base64}`,
      });
    }
  };

  const handleTitleInput = (input) => {
    setListingTitle(input);
  };

  const handleLocationInput = (data, details) => {
    if (DEBUG) {
      console.log("Handling location input!");
    }

    if (!data) {
      if (DEBUG) {
        console.log("Unable to fetch location data!");
      }

      return;
    }

    if (
      data.description &&
      details.geometry &&
      details.geometry.location &&
      details.geometry.location.lat &&
      details.geometry.location.lng
    ) {
      if (DEBUG) {
        console.log("description: ", data.description);
        console.log("lng:", details.geometry.location.lng);
        console.log("lat:", details.geometry.location.lat);
      }

      setLocation(data.description);
      setLatitude(details.geometry.location.lat);
      setLongitude(details.geometry.location.lng);
    }
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

  const handleDurationChange = (input) => {
    const pattern = /^\d*$/;
    if (!pattern.test(input)) {
      return;
    }

    setDuration(Number(input));
  };

  const showMode = (currentMode) => {
    setShowDatePicker(currentMode === "date");
    setShowTimePicker(currentMode === "time");
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
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
          onChangeText={handleTitleInput}
        />

        {/* TODO: Bug on iPhone with GooglePlacesAutocomplete */}
        <Text style={styles.label}>Location</Text>
        <ScrollView keyboardShouldPersistTaps={"always"}>
          <GooglePlacesAutocomplete
            placeholder="Search"
            keepResultsAfterBlur={true}
            value={location}
            onPress={handleLocationInput}
            query={{
              key: "AIzaSyClTqhXEQu1PceR0w04nYWu2TkAbyiuAJs",
              language: "en",
            }}
            fetchDetails={true}
            listViewDisplayed={false}
            styles={{
              textInput: styles.inputField,
              container: { flex: 0 },
            }}
          />
        </ScrollView>

        <Text style={styles.label}>Date</Text>

        <Button title="Open Date Picker" onPress={showDatepicker} />

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
            hour: "2-digit",
            minute: "2-digit",
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
          onChangeText={handleDurationChange}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.inputField}
          placeholder="A quick description of the job"
          value={description}
          onChangeText={(input) => setDescription(input)}
        />

        {image.uri ? (
          <Image
            source={{ uri: image.uri }}
            style={{ width: 200, height: 200 }}
          />
        ) : null}

        <Pressable onPress={handleImageUpload} style={styles.uploadButton}>
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

        <Pressable onPress={handleSubmitListing} style={styles.submitButton}>
          <Text style={styles.buttonText}>Post</Text>
        </Pressable>
      </>
    );
  };

  return (
    <FlatList
      data={[{ key: "form" }]}
      renderItem={renderFormFields}
      keyExtractor={(item) => item.key}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8f9fa",
    flexGrow: 1,
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: "#495057",
    marginBottom: 5,
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#ffffff",
  },
  uploadButton: {
    backgroundColor: "#6c757d",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    padding: 15,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});
