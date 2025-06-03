import Phaser from 'phaser'

export class Dino extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'default')

        this.scene = scene
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
                { key: 'running-0' },
                { key: 'running-1' }
            ],
            frameRate: 8,
            repeat: -1
        })
        this.scene.anims.create({
            key: 'down',
            frames: [
                { key: 'down-0' },
                { key: 'down-1' }
            ],
            frameRate: 8,
            repeat: -1
        })
    }

    static preload(scene) {
        scene.load.image('dead', 'assets/images/dino/dead.png')
        scene.load.image('default', 'assets/images/dino/default.png')
        scene.load.image('down-dead', 'assets/images/dino/down-dead.png')
        scene.load.image('running-0', 'assets/images/dino/running/0.png')
        scene.load.image('running-1', 'assets/images/dino/running/1.png')
        scene.load.image('down-0', 'assets/images/dino/running/down/0.png')
        scene.load.image('down-1', 'assets/images/dino/running/down/1.png')
    }

    reborn(x, y) {
        this.setPosition(x, y)
        this.body.reset(x, y)
        this.body.enable = true
        this.isDead = false
        this.wasDownOnDeath = false
        this.play('run', true)
    }

    update() {
        const { isPlaying, cursors, spaceKey, isGameOver, deathSound, jumpSound } = this.scene

        if (isPlaying) {
            this.hitbox.x = this.x
            this.hitbox.y = this.y

            const isInGround = this.body.onFloor()

            if (isInGround) {
                if (cursors.down.isDown) {
                    this.play('down', true)
                    this.setBodySize(59,30)
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
                this.hitbox.body.setSize(20, 40)
            }

            if ((spaceKey.isDown || cursors.up.isDown) && isInGround) {
                this.setVelocityY(this.jumpForce)
                jumpSound.play()
            }
        } else if (isGameOver) {
            this.play('')
            this.body.enable = false

            if (!this.isDead) {
                this.wasDownOnDeath = cursors.down.isDown
                this.isDead = true
                deathSound.play()
            }

            this.setTexture(this.wasDownOnDeath ? 'down-dead' : 'dead')
        }
    }
}
