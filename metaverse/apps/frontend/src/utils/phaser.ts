import Phaser from 'phaser';
import mainScene from '../scenes/MainScene';

export const phaserGameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#4rf',
  scale: {
    mode: Phaser.Scale.FIT, // Ensures the game fits within the container
    autoCenter: Phaser.Scale.CENTER_BOTH, // Centers the canvas
    width: window.innerWidth * 0.7, // 70% of the screen width
    height: window.innerHeight * 0.7, // 70% of the screen height
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
  scene: [mainScene()],
};

export default phaserGameConfig;
