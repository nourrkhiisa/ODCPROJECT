/*import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAF9F6",
  },
  title: {
    fontSize: 27,
    fontWeight: "bold",
    marginBottom: 25,
  },
  input: {
    width: "30%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 15,
    borderRadius: 15,
  },
  button: {
    backgroundColor: "#F28C28",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },
});

export default styles;*/

/*import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF9F6',
  },
  loginBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    width:500,
    height:255,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 15,
    borderRadius: 15,
  },
  inputIcon: {
    marginRight: 5,
  },
  button: {
    backgroundColor: '#F28C28',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    width:100,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default styles;*/

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF9F6',
  },
  loginBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 35,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    width: '80%',
    shadowRadius: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 15,
    marginBottom: 15,
    borderRadius: 20,
    backgroundColor: '#F8F8F8',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  
  button: {
    backgroundColor: '#F28C28',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  forgotPasswordText: {
    color: '#F28C28',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  logo: {
    width: 250,
    height: 150,
    marginBottom: 20,
  },
  eyeIcon: {
    position: 'absolute',
    right: 50,
    top: '50%',
    transform: [{ translateY: 8 }],
    
  },
});

export default styles;



