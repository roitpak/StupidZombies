import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {screens} from './screens';

function LevelsScreen() {
  const navigation = useNavigation();

  const navigateToGame = () => {
    navigation.navigate(screens.gameScreen);
  };

  return (
    <View style={styles.container}>
      <Text> Levels</Text>
      <TouchableOpacity onPress={navigateToGame}>
        <Text style={styles.getStarted}>Levels</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  getStarted: {
    fontSize: 20,
    marginTop: 10,
  },
});
export default LevelsScreen;
