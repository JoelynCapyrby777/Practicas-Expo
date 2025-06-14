import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons"; 

const StorageExample = () => {
  const [tempData, setTempData] = useState("");
  const [data, setData] = useState("");
  const [storedData, setStoredData] = useState("");

  // Guardar datos en AsyncStorage
  const saveData = async () => {
    try {
      await AsyncStorage.setItem("userData", data);
      setTempData(data);
      setData(""); 
      Alert.alert("Guardado", "Dato guardado correctamente.");
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el dato.");
    }
  };

  // Cargar datos desde AsyncStorage
  const loadData = async () => {
    try {
      const value = await AsyncStorage.getItem("userData");
      if (value !== null) {
        setStoredData(value);
        setTempData(value);
      } else {
        Alert.alert("Sin datos", "No hay datos guardados.");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo cargar el dato.");
    }
  };

  // Eliminar datos de AsyncStorage
  const clearData = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      setStoredData("");
      setTempData("");
      Alert.alert("Eliminado", "Dato eliminado.");
    } catch (error) {
      Alert.alert("Error", "No se pudo eliminar el dato.");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Manejo de datos por AsyncStorage </Text>
      
      <TextInput
        value={data}
        onChangeText={setData}
        placeholder="Ingresa un dato"
        style={styles.input}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={saveData}>
          <FontAwesome name="save" size={20} color="white" />
          <Text style={styles.buttonText}> Guardar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={loadData}>
          <FontAwesome name="download" size={20} color="white" />
          <Text style={styles.buttonText}> Cargar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={clearData}>
          <FontAwesome name="trash" size={20} color="white" />
          <Text style={styles.buttonText}> Eliminar</Text>
        </TouchableOpacity>
      </View>

      {storedData ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Dato Guardado</Text>
          <Text style={styles.cardText}>{storedData}</Text>
        </View>
      ) : null}

   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 45,
    borderColor: "#888",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#007BFF", 
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  deleteButton: {
    backgroundColor: "#FF5252",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
  },
  tempData: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
    color: "#555",
  },
});

export default StorageExample;
