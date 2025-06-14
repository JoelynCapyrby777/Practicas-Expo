import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import { FontAwesome } from "@expo/vector-icons"; 

async function save(key, value) {
  if (!key || !value) {
    Alert.alert("⚠️ Error", "Debes ingresar una clave y un valor.");
    return;
  }
  await SecureStore.setItemAsync(key, value);
  Alert.alert("✅ Guardado", `Clave "${key}" guardada con éxito.`);
}

async function getValueFor(key, setStoredData) {
  if (!key) {
    Alert.alert("⚠️ Error", "Ingresa una clave para buscar.");
    return;
  }

  let result = await SecureStore.getItemAsync(key);
  if (result) {
    setStoredData(result);
    Alert.alert("🔐 Valor Recuperado", result);
  } else {
    Alert.alert("❌ No encontrado", "No hay valores almacenados bajo esa clave.");
  }
}

async function deleteValueFor(key, setStoredData) {
  if (!key) {
    Alert.alert("⚠️ Error", "No hay clave para eliminar.");
    return;
  }

  let result = await SecureStore.getItemAsync(key);
  if (result) {
    await SecureStore.deleteItemAsync(key);
    setStoredData("");
    Alert.alert("🗑️ Eliminado", `Clave "${key}" eliminada.`);
  } else {
    Alert.alert("❌ No encontrado", "No hay valores almacenados bajo esa clave.");
  }
}

export default function Tab() {
  const [saveKey, setSaveKey] = useState("");
  const [saveValue, setSaveValue] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [storedData, setStoredData] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manejo de Datos con SecureStore</Text>

      <TextInput
        style={styles.input}
        placeholder="Clave para guardar"
        value={saveKey}
        onChangeText={setSaveKey}
      />

      <TextInput
        style={styles.input}
        placeholder="Valor para guardar"
        value={saveValue}
        onChangeText={setSaveValue}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            save(saveKey, saveValue);
            setSaveKey("");
            setSaveValue("");
          }}
        >
          <FontAwesome name="save" size={20} color="white" />
          <Text style={styles.buttonText}> Guardar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}> Recuperar o Eliminar Clave</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingresa la clave"
        value={searchKey}
        onChangeText={setSearchKey}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => getValueFor(searchKey, setStoredData)}>
          <FontAwesome name="search" size={20} color="white" />
          <Text style={styles.buttonText}> Recuperar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => {
            deleteValueFor(searchKey, setStoredData);
            setSearchKey("");
          }}
        >
          <FontAwesome name="trash" size={20} color="white" />
          <Text style={styles.buttonText}> Eliminar</Text>
        </TouchableOpacity>
      </View>

      {storedData ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}> Dato Guardado</Text>
          <Text style={styles.cardText}>{storedData}</Text>
        </View>
      ) : null}
    </View>
  );
}

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
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
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
});

