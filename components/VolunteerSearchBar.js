import { View, TextInput, Text, Pressable, StyleSheet } from "react-native";
import { useState } from "react";

export default function VolunteerSearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for opportunities"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />

      <Pressable onPress={handleSearch} style={styles.button}>
        <Text style={styles.white}>Search</Text>
      </Pressable>

      {/* <Button title="Search" onPress={handleSearch} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    width: "100%",
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  white: {
    color: "#fff",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#7BB9F8",
    paddingVertical: 10,
    borderRadius: 25,
    width: 80,
    alignContent: "center",
  },
});
