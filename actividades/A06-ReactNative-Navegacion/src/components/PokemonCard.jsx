import React from 'react';
import { Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchFn } from '../utils/api';
import Card from './Card';

export default function PokemonCard({ url, name }) {
  const { isLoading, error, data } = useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => fetchFn(url),
  });

  if (isLoading) return <ActivityIndicator size="large" color="#A67B5B" />;
  if (!data || error) return null;

  return (
    <Card id={data.id}>
      <View style={styles.cardContent}>
        <Image
          source={{ uri: data.sprites.other['official-artwork'].front_default }}
          style={styles.image}
        />
        <Text style={styles.title}>{data.name}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F3E9DA', // Fondo similar al Home
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#A67B5B', // Borde marrón uniforme
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    width: '100%',
  },
  image: {
    width: 90,
    height: 90,
    marginRight: 15,
    borderRadius: 10,
    backgroundColor: '#EADDC0', // Fondo crema detrás de la imagen
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5A3E2B', // Marrón cálido
    textTransform: 'capitalize',
    fontFamily: 'serif',
  },
});

