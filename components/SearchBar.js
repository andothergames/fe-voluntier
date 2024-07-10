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
          <Text>Sort By</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            containerStyle={styles.dropdown}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
    zIndex: 1000, // Ensure the dropdown is above other components
    marginBottom: 20,
  },
  dropdownContainerOpen: {
    marginBottom: 150, // Add space below dropdown when open
  },
  dropdown: {
    width: "100%",
  },
});
