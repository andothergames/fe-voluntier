import { StyleSheet } from 'react-native'

export const singleListingStyles = StyleSheet.create({


    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f8f8f8',
        width: '100%',
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
      },
      image: {
        width: '100%',
        height: 250,
        borderRadius: 25,
      },
      title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5,
      },



})