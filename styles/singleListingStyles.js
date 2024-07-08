import { StyleSheet } from 'react-native';

export const singleListingStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    width: '100%',
    backgroundColor: '#7BB9F8',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 25,
    width: '100%',
    overflow: 'hidden',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 25,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#001FFF',
    marginBottom: 4,
    width: '80%',
    width: '80%',
  },
  orgName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7BB9F8',
    marginBottom: 10,
  },
  text: {
    paddingBottom: 10,
  },
  titleText: {
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: 'bold',
  },
  favourite: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
});
