import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState, useContext } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { UserContext } from "../contexts/user-context";
import VolunteerSearchBar from "./VolunteerSearchBar";

export default function SearchBar({ onSortChange, onSearch }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const { user } = useContext(UserContext);
  const [items, setItems] = useState([
    { label: "Date Ascending", value: "?sort_by=date&order=asc" },
    { label: "Date Descending", value: "?sort_by=date&order=desc" },
    { label: "Duration Ascending", value: "?sort_by=duration&order=asc" },
    { label: "Duration Descending", value: "?sort_by=duration&order=desc" },
  ]);

  useEffect(() => {
    onSortChange(value);
  }, [value]);

  return (
    <View>
      {user && user.vol_id && (
        <View
          style={[
            styles.dropdownContainer,
            open && styles.dropdownContainerOpen,
          ]}
        >
          <VolunteerSearchBar onSearch={onSearch} />
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            containerStyle={styles.dropdown}
            placeholder="Sort by Category"
            placeholderStyle={styles.placeholder}
            dropDownContainerStyle={styles.dropDownContainer}
            style={styles.picker}
            textStyle={styles.text}
            listItemContainerStyle={styles.listItemContainer}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
    zIndex: 1000,
    marginBottom: 0,
    marginRight: 10,
    marginLeft: 10,
    borderColor: '#7BB9F8',
    borderWidth: 1,
    borderRadius: 10,
    padding: 6,
    color: "gray",
  },
  dropdownContainerOpen: {
    marginBottom: 160,
  },
  dropdown: {
    width: "100%",
  },
  placeholder: {
    color: "gray",
  },
  text: {
    color: "gray",
  },
  picker: {
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
  },
  dropDownContainer: {
    borderRadius: 10,
    borderColor: "gray",
  },
  listItemContainer: {
    height: 40,
  },
});
