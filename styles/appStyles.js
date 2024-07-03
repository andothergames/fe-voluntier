import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  navigationContainer: {
    flex: 1,
    // marginTop: 100,
    width: '100%',
  },
  text: {
    color: 'black',
  },
  image: {
    width: 375,
    height: 200,
    marginBottom: 20,
  },
  aboutHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: 'red',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginLeft: 20,
    padding: 10,
  },
});
