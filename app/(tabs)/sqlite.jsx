import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('users.db');

export default function Tab() {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    db.execAsync('CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, edad INTEGER);')
      .then(() => cargarUsuarios())
      .catch(error => console.log('Error creando tabla:', error));
  }, []);

  const insertarUsuario = () => {
    if (!nombre || !edad) {
      Alert.alert('⚠️ Error', 'Por favor ingresa nombre y edad.');
      return;
    }

    db.runAsync('INSERT INTO usuarios (nombre, edad) VALUES (?, ?)', [nombre, edad])
      .then(() => {
        setNombre('');
        setEdad('');
        cargarUsuarios();
      })
      .catch(error => console.log('Error insertando usuario:', error));
  };

  const cargarUsuarios = () => {
    db.getAllAsync('SELECT * FROM usuarios')
      .then(rows => setUsuarios(rows))
      .catch(error => console.log('Error cargando usuarios:', error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manejo de datos por SQLite</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Edad"
        value={edad}
        onChangeText={setEdad}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={insertarUsuario}>
        <Text style={styles.buttonText}> Agregar Usuario</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Usuarios Registrados:</Text>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text style={styles.userText}>👤 {item.nombre} - {item.edad} años</Text>
          </View>
        )}
      />
    </View>
  );
}

// 📌 ESTILOS MEJORADOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#007BFF',
    borderWidth: 1,
    backgroundColor: 'white',
    marginBottom: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  userItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 6,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userText: {
    fontSize: 18,
    color: '#444',
  },
});
