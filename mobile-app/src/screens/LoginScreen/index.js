import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity,Image } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from "./styles";
import logo from "../../assets/logo.png";


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { login } = useContext(AuthContext);
 

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigation.navigate("StudentDashboard");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.container}>
    <Image source={logo} style={styles.logo} />
      <View style={styles.loginBox}>
      <Text style={styles.title}>Login</Text>
      
        <TextInput
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        style={styles.input}
        underlineColorAndroid="transparent"
      
      />
      
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        style={styles.input}
        secureTextEntry={secureTextEntry}
        underlineColorAndroid="transparent">
        
      </TextInput>
      <Icon
            name={secureTextEntry ? 'eye-slash' : 'eye'}
            size={20}
            color="gray"
            style={styles.eyeIcon}
            onPress={togglePasswordVisibility}
          />
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('Forgot password')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;


