import { GameScene } from './scenes/game-scene'
import * as Phaser from 'phaser'
import './style.css'

export function app() {
  const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: innerWidth / 1.5,
    height: innerHeight / 1.5,
    backgroundColor: '#fff',
    scene: GameScene,
    physics: {
      default: 'arcade'
    }
  }

  return new Phaser.Game(config)
}

app()
