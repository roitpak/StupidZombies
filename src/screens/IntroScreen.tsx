import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {screens} from './screens';

function IntroScreen() {
  const navigation = useNavigation();

  const navigateToLevels = () => {
    navigation.navigate(screens.levelsScreen);
  };

  return (
    <View style={styles.container}>
      <Text>Stupid Zombies</Text>
      <TouchableOpacity onPress={navigateToLevels}>
        <Text style={styles.getStarted}>Get Started</Text>
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
export default IntroScreen;
