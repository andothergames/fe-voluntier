import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
  container: {
    backgroundColor: "#ffff",
  },
  form: {
    margin: 10,
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  input: {
    marginBottom: 20,

  },
  inputLabel: {
    fontSize: 17,
    color: "#222",
    marginBottom: 8,
  },
  title: {
    marginTop: 10,
    marginBottom: 20,
    textAlign: "center",
    fontSize: 20,
    color: "#001FFF",
  },
  button: {
    marginTop: 20,
    marginBottom: 40,
    marginRight: 'auto',
    marginLeft: 'auto',
    backgroundColor: "#7BB9F8",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: '40%',
    alignContent:'center'
  },
  white: {
    color: "#fff",
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputControl: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
  },
  switch: {
    marginLeft: 'auto',
    marginRight: 10,
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  switchText: {
    color: '#383838',
    textAlign: 'right',
    paddingRight: 10,
  },
  error: {
    textAlign: "center",
    color: "#001FFF",
  }
});
