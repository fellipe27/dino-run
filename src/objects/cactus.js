import Phaser from 'phaser'

export class Cactus extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, y) {
        super(scene, scene.cameras.main.width + 50, y, `cactus-${Math.floor(Math.random() * 6)}`)

        this.scene = scene
        this.scene.physics.add.existing(this)
        this.setImmovable(true)
        this.body.allowGravity = false
        this.body.moves = false
        this.setBodySize(this.width / 2, this.height / 1.2)
        this.body.offset.y = 5
        this.setOrigin(0.5, 1)
        this.scene.add.existing(this)
    }

    static preload(scene) {
        for (let i = 0; i < 6; i++) {
            scene.load.image(`cactus-${i}`, `assets/images/cactus/${i}.png`)
        }
    }

    update() {
        const { isPlaying, speed } = this.scene

        if (isPlaying) {
            this.x -= speed
        }
    }
}
