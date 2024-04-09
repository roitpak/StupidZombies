import React, {useEffect, useState} from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import entities from './src/Entities';
import Physics from './physics';

export default function BestGameEver(): JSX.Element {
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setRunning(true);
  }, []);

  return (
    <GameEngine
      style={styles.container}
      entities={entities()}
      systems={[Physics]}
      running={running}>
      <StatusBar hidden={true} />
    </GameEngine>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
