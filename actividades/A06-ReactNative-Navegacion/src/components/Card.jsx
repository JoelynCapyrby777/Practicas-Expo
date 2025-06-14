import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Card = ({ children, id }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Details', { id })} style={styles.card}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F7F3E9', // Fondo cálido y neutro como el Home
    padding: 16,
    marginVertical: 10,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#A67B5B', // Borde marrón suave
    shadowColor: '#A9A9A9', 
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Card;
