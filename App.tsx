import React, {useEffect, useState} from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import entities from './src/Entities';
import Physics from './physics';

export default function BestGameEver(): JSX.Element {
  const [running, setRunning] = useState(false);
  const [gameEngine, setGameEngine] = useState<GameEngine | null>(null);
  useEffect(() => {
    setRunning(true);
  }, []);

  return (
    <GameEngine
      ref={(ref: GameEngine) => setGameEngine(ref)}
      style={styles.container}
      entities={entities()}
      systems={[Physics]}
      onEvent={(e: Event) => {
        switch (e.type) {
          case 'game_over':
            // console.log('FINISHED-------->');
            setRunning(false);
            gameEngine?.stop();
            break;
          default:
            break;
        }
      }}
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
