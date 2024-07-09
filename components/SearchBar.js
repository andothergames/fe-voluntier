import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { getListings } from "../api";
import DropDownPicker from "react-native-dropdown-picker";

export default function SearchBar({ onSortChange }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
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
      <Text>Sort By</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
    </View>
  );
}

