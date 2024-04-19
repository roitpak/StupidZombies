import React, {useEffect, useState} from 'react';
import {StyleSheet, StatusBar, Modal, Text, View} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import levels from '../levels/index';

export default function GameScreen({route}): JSX.Element {
  const [running, setRunning] = useState(false);
  const [win, setWin] = useState(0);
  const [gameEngine, setGameEngine] = useState<GameEngine | null>(null);
  useEffect(() => {
    setRunning(true);
  }, []);
  const returnModalText = () => {
    if (win === -1) {
      return 'Game over!';
    }
    if (win === 1) {
      return 'You win!';
    }
  };

  return (
    <GameEngine
      ref={(ref: GameEngine) => setGameEngine(ref)}
      style={styles.container}
      // systems={[
      //   (gameEntities: Entities, physicsProps: PhysicsProps) =>
      //     physicsGenerator(gameEntities, physicsProps, levels[0]),
      // ]}
      // entities={entitiesGenerator(levels[0])}
      entities={levels[route.params.index].entities()}
      systems={[levels[route.params.index].physics]}
      onEvent={(e: Event) => {
        switch (e.type) {
          case 'game_over':
            // console.log('FINISHED-------->');
            setWin(-1);
            setRunning(false);
            break;
          case 'win':
            // console.log('FINISHED-------->');
            setWin(1);
            setRunning(false);
            break;
          default:
            break;
        }
      }}
      running={running}>
      <StatusBar hidden={true} />
      <Modal
        supportedOrientations={['landscape']}
        transparent={true}
        visible={win !== 0}>
        <View style={styles.modalView}>
          <Text>{returnModalText()} </Text>
        </View>
      </Modal>
    </GameEngine>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  modalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
