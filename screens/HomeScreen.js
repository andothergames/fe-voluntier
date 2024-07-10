import { View } from "react-native";
import { styles } from "../styles/appStyles";
import Listings from "../components/Listings";
import SearchBar from "../components/SearchBar";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/user-context";
import { getListings } from "../api";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [listings, setListings] = useState([]);
  const [sortOption, setSortOption] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchListings();
  }, [sortOption, searchQuery]);

  const fetchListings = () => {
    getListings(sortOption, searchQuery)
      .then((fetchedListings) => {
        setListings(fetchedListings);
      })
      .catch((error) => {
        console.error("Error fetching listings:", error);
      });
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <View style={styles.container}>
      {user && user.vol_id && (
        <SearchBar onSortChange={handleSortChange} onSearch={handleSearch} />
      )}
      <Listings listings={listings} />
    </View>
  );
}
