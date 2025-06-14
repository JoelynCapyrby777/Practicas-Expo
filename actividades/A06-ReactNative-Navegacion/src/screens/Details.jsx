import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { fetchFn } from '../utils/api';
import TypeBadge from '../components/TypeBadge';

export function Details() {
  const route = useRoute();
  const { id } = route.params;

  const { isLoading, error, data } = useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => fetchFn(`https://pokeapi.co/api/v2/pokemon/${id}`),
  });

  if (isLoading) return <ActivityIndicator size="large" color="#A67B5B" />;
  if (!data || error) return <Text style={styles.error}>Error al cargar los datos</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{data.name}</Text>
      </View>

      <Image
        source={{ uri: data.sprites.other['official-artwork'].front_default }}
        style={styles.image}
      />

      <View style={styles.infoContainer}>
        <Text style={styles.info}>ID: <Text style={styles.value}>{data.id}</Text></Text>
        <Text style={styles.info}>Altura: <Text style={styles.value}>{data.height / 10} m</Text></Text>
        <Text style={styles.info}>Peso: <Text style={styles.value}>{data.weight / 10} kg</Text></Text>

        <Text style={styles.info}>Tipo:</Text>
        <View style={styles.typeContainer}>
          {data.types.map((type) => (
            <TypeBadge key={type.type.name} type={type.type.name} />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F3E9', // Tono cálido, neutro y relajante
    alignItems: 'center',
    padding: 20,
  },
  header: {
    backgroundColor: '#A67B5B', // Marrón suave con tonos tierra
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#D9B382', // Sutil contraste en los bordes
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF8E1',
    textTransform: 'capitalize',
    fontFamily: 'serif', // Toque elegante y atemporal
  },
  image: {
    width: 220,
    height: 220,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#A67B5B',
    borderRadius: 16,
    backgroundColor: '#EADDC0', // Fondo crema detrás de la imagen
  },
  infoContainer: {
    backgroundColor: '#F3E9DA', // Fondo cálido con textura ligera
    width: '100%',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#C1A080',
  },
  info: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#5A3E2B',
    fontFamily: 'serif',
  },
  value: {
    fontWeight: 'bold',
    color: '#A67B5B',
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  error: {
    fontSize: 18,
    color: '#A67B5B',
    textAlign: 'center',
    fontFamily: 'serif',
  },
});

export default Details;
