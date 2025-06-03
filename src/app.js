import Phaser from 'phaser'
import { GameComponent } from './components/game-component'
import { GameScene } from './scenes/game-scene'

export function App() {
  const config = {
    type: Phaser.AUTO,
    parent: 'phaser-container',
    width: window.innerWidth / 1.5,
    height: window.innerHeight / 1.5,
    backgroundColor: '#ffffff',
    scene: GameScene,
    physics: {
      default: 'arcade'
    }
  }

  return <GameComponent config={ config } />
}
