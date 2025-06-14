import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ícono personalizado

const pueblosMagicos = [
  {
    id: '1',
    nombre: 'Sucila',
    descripcion: 'Un hermoso puerto con historia y naturaleza.',
    latitud: 21.156718473686666,
    longitud: -88.3146497744703,
    imagen: require('./assets/sucila.jpg'),
  },
  {
    id: '2',
    nombre: 'Tizimín',
    descripcion: 'Conocida como la ciudad de los Reyes.',
    latitud: 21.1406,
    longitud: -88.1517,
    imagen: require('./assets/tizimin.jpeg'),
  },
  {
    id: '3',
    nombre: 'Valladolid',
    descripcion: 'La perla de oriente, con su belleza colonial.',
    latitud: 20.689,
    longitud: -88.201,
    imagen: require('./assets/valladolid.jpg'),
  },
  {
    id: '4',
    nombre: 'Izamal',
    descripcion: 'El pueblo amarillo con gran riqueza cultural.',
    latitud: 20.935,
    longitud: -89.017,
    imagen: require('./assets/izamal.jpg'),
  },
  {
    id: '5',
    nombre: 'Río Lagartos',
    descripcion: 'Paraíso de flamencos y naturaleza.',
    latitud: 21.5958,
    longitud: -88.1683,
    imagen: require('./assets/rio-lagartos.jpg'),
  },
  {
    id: '6',
    nombre: 'Las Coloradas',
    descripcion: 'Famosa por sus aguas rosas únicas.',
    latitud: 21.6033,
    longitud: -88.1778,
    imagen: require('./assets/las-coloradas.jpg'),
  },
];

export default function App() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 21.049797041668725, // UT Cancún
    longitude: -86.84694526164611, 
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  });

  const moverMapa = (lat, lon) => {
    setMapRegion({
      ...mapRegion,
      latitude: lat,
      longitude: lon,
    });
  };

  return (
    <View style={styles.container}>
      {/* Mapa */}
      <MapView style={styles.map} region={mapRegion}>
        {/* Marcador de la UT Cancún con icono personalizado */}
        <Marker coordinate={{ latitude: 21.049797041668725, longitude: -86.84694526164611 }} title="UT Cancún">
          <View style={styles.markerIcon}>
            <Icon name="place" size={40} color="red" />
          </View>
        </Marker>

        {/* Marcadores de los Pueblos Mágicos */}
        {pueblosMagicos.map((pueblo) => (
          <Marker
            key={pueblo.id}
            coordinate={{ latitude: pueblo.latitud, longitude: pueblo.longitud }}
            title={pueblo.nombre}
          />
        ))}
      </MapView>

      {/* Lista de tarjetas */}
      <View style={styles.listaContainer}>
        <FlatList
          horizontal
          data={pueblosMagicos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={item.imagen} style={styles.imagen} />
              <Text style={styles.titulo}>{item.nombre}</Text>
              <Text style={styles.descripcion}>{item.descripcion}</Text>
              <TouchableOpacity style={styles.boton} onPress={() => moverMapa(item.latitud, item.longitud)}>
                <Text style={styles.botonTexto}>📍 Ver en mapa</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '60%',
  },
  listaContainer: {
    position: 'absolute',
    bottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 10,
    width: 200,
    elevation: 5,
  },
  imagen: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  descripcion: {
    fontSize: 12,
    color: '#555',
  },
  boton: {
    backgroundColor: '#FF5733',
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  markerIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

