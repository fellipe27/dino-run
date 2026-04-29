import { Ground } from '../objects/ground'
import { Dino } from '../objects/dino'
import { Cactus } from '../objects/cactus'
import { ScoreManager } from '../objects/score-manager'
import { GameOver } from '../objects/game-over'
import { Cloud } from '../objects/cloud'
import { Ptero } from '../objects/ptero'
import * as Phaser from 'phaser'

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' })
        this.isPlaying = false
        this.isGameOver = false
        this.canShowPhysicsDebug = false
        this.speed = 5
        this.scoreAdded = 0.4
        this.lastCactusScore = -1
        this.lastPteroScore = -1
        this.lastSpeedIncreaseScore = -1
    }

    preload() {
        this.load.audio('death', 'assets/sounds/death.wav')
        this.load.audio('point', 'assets/sounds/point.wav')
        this.load.audio('jump', 'assets/sounds/jump.wav')

        Ground.preload(this)
        Dino.preload(this)
        Cactus.preload(this)
        ScoreManager.preload(this)
        GameOver.preload(this)
        Cloud.preload(this)
        Ptero.preload(this)
    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys()
        this.spaceKey = this.input.keyboard.addKey('SPACE')
        this.upKey = this.input.keyboard.addKey('UP')
        this.downKey = this.input.keyboard.addKey('DOWN')

        this.physics.world.setBoundsCollision(true, true, true, true)

        if (this.canShowPhysicsDebug) {
            this.physics.world.createDebugGraphic()
        }

        this.centerY = this.cameras.main.height / 2

        this.deathSound = this.sound.add('death')
        this.pointSound = this.sound.add('point')
        this.jumpSound = this.sound.add('jump')

        this.ground = new Ground(this, 0, this.centerY)
        this.dino = new Dino(this, 120, this.centerY + 15)
        this.cactus = this.physics.add.group()
        this.scoreManager = new ScoreManager(this, false)
        this.highScoreManager = new ScoreManager(this, true)
        this.gameOver = new GameOver(this)
        this.cloud = new Cloud(this)
        this.pteros = this.physics.add.group()

        this.dino.setDepth(10)
        this.cactus.setDepth(5)

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
                ptero.setTexture('ptero0')
            })
        })
    }

    update() {
        if (this.spaceKey.isDown || this.upKey.isDown) {
            if (!this.isPlaying) {
                if (this.isGameOver) {
                    this.scoreManager.score = 0
                    this.speed = 5
                    this.dino.reborn(120, this.centerY + 15)
                    this.cactus.clear(true, true)
                    this.pteros.clear(true, true)
                    this.gameOver.reset()
                    this.isGameOver = false
                }

                this.isPlaying = true
            }
        }

        if (this.isPlaying) {
            const score = Math.floor(this.scoreManager.score)

            if (score % 30 == 0 && score != this.lastCactusScore) {
                if (Math.random() < 0.5) {
                    this.cactus.add(new Cactus(this, this.centerY + 17))
                }

                this.lastCactusScore = score
            }

            if (score % 80 == 0 && score != this.lastPteroScore) {
                if (Math.random() < 0.5) {
                    this.pteros.add(new Ptero(this, this.cameras.main.width + 50))
                }

                this.lastPteroScore = score
            }

            if (score % 500 == 0 && score != this.lastSpeedIncreaseScore) {
                this.speed++
                this.lastSpeedIncreaseScore = score
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
                    this.pteros.remove(ptero, true, true)
                }
            })

            this.scoreManager.add(this.scoreAdded)
            this.scoreManager.update()
        }

        if (this.isGameOver) {
            this.highScoreManager.setHigh(this.scoreManager.score)
            this.highScoreManager.update()
            this.gameOver.update()
        }

        this.ground.update()
        this.dino.update()
        this.cloud.update()
    }
}
