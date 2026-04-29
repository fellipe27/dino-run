import * as Phaser from 'phaser'

export class Dino extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'default')
        this.scene = scene
        this.x = x
        this.y = y
        this.hitbox = this.scene.add.rectangle(this.x, this.y, 15, 40)
        this.hitbox.setOrigin(0.5, 1.1)
        this.scene.physics.add.existing(this)
        this.scene.physics.add.existing(this.hitbox)
        this.setGravityY(1200)
        this.jumpForce = -500
        this.setOrigin(0.5, 1)
        this.body.offset.y = 0
        this.wasDownOnDeath = false
        this.isDead = false
        this.scene.add.existing(this)
        this.scene.anims.create({
            key: 'run',
            frames: [
                { key: 'running0' },
                { key: 'running1' }
            ],
            frameRate: 8,
            repeat: -1
        })
        this.scene.anims.create({
            key: 'down',
            frames: [
                { key: 'down0' },
                { key: 'down1' }
            ],
            frameRate: 8,
            repeat: -1
        })
    }

    static preload(scene) {
        scene.load.image('default', 'assets/images/dino/default.png')
        scene.load.image('dead', 'assets/images/dino/dead.png')
        scene.load.image('downDead', 'assets/images/dino/down-dead.png')
        scene.load.image('running0', 'assets/images/dino/running/0.png')
        scene.load.image('running1', 'assets/images/dino/running/1.png')
        scene.load.image('down0', 'assets/images/dino/running/down/0.png')
        scene.load.image('down1', 'assets/images/dino/running/down/1.png')
    }

    reborn(x, y) {
        this.setPosition(x, y)
        this.body.reset(x, y)
        this.body.enable = true
        this.isDead = false
        this.setTexture('default')
        this.play('run', true)
    }

    update() {
        const { isPlaying, spaceKey, upKey, downKey, isGameOver, deathSound, jumpSound } = this.scene
    
        if (isPlaying) {
            this.hitbox.x = this.x
            this.hitbox.y = this.y

            const isInGround = this.body.onFloor()

            if (isInGround) {
                if (downKey.isDown) {
                    this.play('down', true)
                    this.setBodySize(59, 30)
                    this.hitbox.body.setSize(this.width, 20)
                } else {
                    this.play('run', true)
                    this.setBodySize(44, 47)
                    this.hitbox.body.setSize(15, 40)
                }
            } else {
                this.play('')
                this.setTexture('default')
                this.setBodySize(44, 47)
                this.hitbox.body.setSize(25, 40)
            }

            if ((spaceKey.isDown || upKey.isDown) && isInGround) {
                this.setVelocityY(this.jumpForce)
                jumpSound.play()
            }
        } else if (isGameOver) {
            this.play('')
            this.body.enable = false

            if (!this.isDead) {
                this.wasDownOnDeath = downKey.isDown
                this.isDead = true
                deathSound.play()
            }

            this.setTexture(this.wasDownOnDeath ? 'downDead' : 'dead')
        }
    }
}
