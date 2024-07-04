import { StyleSheet } from 'react-native';

export const listingStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: '100%',
  },
  card: {
    backgroundColor: '#fff',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 25,
    width: '100%',
    overflow: 'hidden',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  orgName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7BB9F8',
    marginBottom: 4,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 25,
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 10,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  hoursContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba( 123, 185, 248, 0.8)',
    padding: 10,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center'
  },
  hours: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  hrs: {
    color: 'black',
    fontSize: 14,
  },
  smallTextContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  date: {
    flex: 1,
    fontSize: 14,
    color: 'white',
    textAlign: 'right',
  },
});
