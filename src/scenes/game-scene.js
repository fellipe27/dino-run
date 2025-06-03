import Phaser from 'phaser'
import { Ground } from '../objects/ground'
import { Dino } from '../objects/dino'
import { Cactus } from '../objects/cactus'
import { Cloud } from '../objects/cloud'
import { Ptero } from '../objects/ptero'
import { Score } from '../objects/score'
import { GameOver } from '../objects/game-over'

export class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene')

        this.isPlaying = false
        this.isGameOver = false
        this.showPhysicsDebug = false
        this.speed = 5
        this.lastCactusScore = -1
        this.lastSpeedUpdateScore = -1
        this.lastPteroScore = -1
    }

    preload() {
        this.load.audio('death', 'assets/sounds/death.wav')
        this.load.audio('jump', 'assets/sounds/jump.wav')
        this.load.audio('point', 'assets/sounds/point.wav')

        Ground.preload(this)
        Dino.preload(this)
        Cactus.preload(this)
        Cloud.preload(this)
        Ptero.preload(this)
        Score.preload(this)
        GameOver.preload(this)
    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys()
        this.spaceKey = this.input.keyboard.addKey('SPACE')

        if (this.showPhysicsDebug) {
            this.physics.world.createDebugGraphic()
        }
        this.physics.world.setBoundsCollision(true, true, true, true)

        this.deathSound = this.sound.add('death')
        this.jumpSound = this.sound.add('jump')
        this.pointSound = this.sound.add('point')

        this.centerY = this.cameras.main.height / 2

        this.ground = new Ground(this, 0, this.centerY)
        this.cloud = new Cloud(this)
        this.dino = new Dino(this, 120, this.centerY + 15)
        this.cactus = this.physics.add.group()
        this.pteros = this.physics.add.group()
        this.scoreManager = new Score(this, false)
        this.hiScoreManager = new Score(this, true)
        this.gameOver = new GameOver(this)

        this.dino.setDepth(10)
        this.cactus.setDepth(5)
        this.pteros.setDepth(5)

        this.physics.add.collider(this.dino, this.ground.platform)
        this.physics.add.collider(this.dino.hitbox, this.cactus, () => {
            this.isPlaying = false
            this.isGameOver = true
        })
        this.physics.add.collider(this.dino.hitbox, this.pteros, () => {
            this.isPlaying = false
            this.isGameOver = true

            this.pteros.getChildren().forEach(ptero => {
                ptero.anims.stop()
                ptero.setTexture('ptero-0')
            })
        })
    }

    update() {
        if (this.spaceKey.isDown || this.cursors.up.isDown) {
            if (!this.isPlaying) {
                if (this.isGameOver) {
                    this.scoreManager.points = 0
                    this.speed = 5

                    this.cactus.clear(true, true)
                    this.pteros.clear(true, true)
                    this.dino.reborn(120, this.centerY + 15)

                    this.gameOver.reset()
                    this.isGameOver = false
                }

                this.isPlaying = true
            }
        }

        if (this.isPlaying) {
            const score = Math.floor(this.scoreManager.points)

            if (score % 30 === 0 && score !== this.lastCactusScore) {
                if (Math.random() < 0.5) {
                    this.cactus.add(new Cactus(this, this.centerY + 17))
                }

                this.lastCactusScore = score
            }
            if (score % 80 === 0 && score !== this.lastPteroScore) {
                if (Math.random() < 0.5) {
                    this.pteros.add(new Ptero(this, this.cameras.main.width + 50))
                }

                this.lastPteroScore = score
            }
            if (score % 500 === 0 && score !== this.lastSpeedUpdateScore) {
                this.speed++
                this.lastSpeedUpdateScore = score
            }

            this.cactus.getChildren().forEach(cactus => cactus.update())
            this.cactus.getChildren().forEach(cactus => {
                if (cactus.x + cactus.width < 0) {
                    this.cactus.remove(cactus, true, true)
                }
            })

            this.pteros.getChildren().forEach(ptero => ptero.update())
            this.pteros.getChildren().forEach(ptero => {
                if (ptero.x + ptero.width < 0) {
                    this.cactus.remove(ptero, true, true)
                }
            })

            this.scoreManager.add(0.4)
            this.scoreManager.update()
        }

        if (this.isGameOver) {
            this.hiScoreManager.setHi(this.scoreManager.points)
            this.hiScoreManager.update()
            this.gameOver.update()
        }

        this.ground.update()
        this.dino.update()
        this.cloud.update()
    }
}
