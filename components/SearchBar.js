import { View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";

const data = [
  { label: "Example 1", value: "1" },
  { label: "Example 2", value: "2" },
  { label: "Example 3", value: "3" }
];

export default function SearchBar() {
  const [value, setValue] = useState(null);

  return (
    <View>
      <Text>Dropdown Example</Text>
      <Dropdown
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Filter By Skill Type"
        value={value}
        onChange={(item) => {
          setValue(item.value);
        }}
      />
    </View>
  );
}
