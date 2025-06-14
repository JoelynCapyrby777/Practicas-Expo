import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const getTypeColor = (type) => {
  const typeColors = {
    grass: "#A3C68C",
    fire: "#E07A5F",
    water: "#5E81AC",
    bug: "#A8B820",
    normal: "#D3C4A1",
    poison: "#A17CA5",
    electric: "#F4A261",
    ground: "#C3A27F",
    fairy: "#EAC8C1",
    fighting: "#C47451",
    psychic: "#F18F8E",
    rock: "#B7A87F",
    ghost: "#827191",
    ice: "#AEC6CF",
    dragon: "#735C91",
    dark: "#5A4E4D",
    steel: "#B8B8D0",
    flying: "#A890F0",
  };
  return typeColors[type] || "#A58F72";
};

const TypeBadge = ({ type }) => {
  const backgroundColor = getTypeColor(type);

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={styles.text}>{type.toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: "#5A3E2B",
  },
  text: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
    textTransform: "capitalize",
    fontFamily: "serif",
  },
});

export default TypeBadge;
