import { StyleSheet, SafeAreaView, FlatList, ActivityIndicator, Text, View } from 'react-native'; 
import { useInfiniteQuery } from '@tanstack/react-query';
import PokemonCard from '../components/PokemonCard';
import { fetchAllPokemon } from '../utils/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function Home() {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['pokemons'],
      queryFn: fetchAllPokemon,
      getNextPageParam: (lastPage) => lastPage.next,
    });

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#A67B5B" />
      </View>
    );
  }

  if (!data) return null;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>
      <MaterialCommunityIcons name="pokeball" size={36} color="#A67B5B" /> Pokédex
</Text>
      <FlatList
        data={data.pages.flatMap((page) => page.results)}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <PokemonCard url={item.url} name={item.name} />}
        onEndReached={loadMore}
        ListFooterComponent={() =>
          isFetchingNextPage ? <ActivityIndicator size="large" color="#A67B5B" /> : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F3E9', // Fondo cálido y neutro
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#A67B5B', // Marrón suave con tonos tierra
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'serif',
    borderBottomWidth: 4,
    borderBottomColor: '#D9B382', // Sutil contraste en los bordes
    paddingBottom: 8,
    letterSpacing: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F3E9',
  },
});
