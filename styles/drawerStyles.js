import { StyleSheet } from 'react-native';

export const drawerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {
    marginRight: 20,
    marginLeft: 20,
  },
  image: {
    height: 200,
    marginVertical: 20,
    borderRadius: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    marginTop: 40,
    marginLeft: 20,
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  white: {
    color: 'white',
    textAlign: 'center',
  }
});
