import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {screens} from './screens';
import levels from '../levels';

function LevelsScreen() {
  const navigation = useNavigation();

  const navigateToGame = (index: Number) => {
    navigation.navigate(screens.gameScreen, {index: index});
  };

  return (
    <View style={styles.container}>
      <Text>Levels</Text>
      {levels.map((level, index) => (
        <TouchableOpacity
          style={styles.levels}
          key={index}
          onPress={() => navigateToGame(index)}>
          <Text style={styles.getStarted}>Level {index + 1}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  getStarted: {
    fontSize: 20,
  },
  levels: {
    padding: 10,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
});
export default LevelsScreen;
