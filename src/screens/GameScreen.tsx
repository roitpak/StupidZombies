import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  StatusBar,
  Modal,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import levels from '../levels/index';
import {useNavigation} from '@react-navigation/native';

export default function GameScreen({route}): JSX.Element {
  const [running, setRunning] = useState(false);
  const [win, setWin] = useState(0);
  const [gameEngine, setGameEngine] = useState<GameEngine | null>(null);

  const navigation = useNavigation();

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

  const goBack = () => navigation.goBack();

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
            setWin(-1);
            setRunning(false);
            break;
          case 'win':
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
          <View style={styles.modalBox}>
            <Text>{returnModalText()} </Text>
            <TouchableOpacity onPress={goBack}>
              <Text style={styles.goBack}>Go Back</Text>
            </TouchableOpacity>
          </View>
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
  modalBox: {
    height: 100,
    width: 200,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  goBack: {
    fontSize: 20,
  },
});
