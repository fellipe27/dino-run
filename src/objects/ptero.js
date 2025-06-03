import Phaser from 'phaser'

export class Ptero extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x) {
        super(scene, x, Math.floor(Math.random() * (200 - 20 + 1)) + 20, 'ptero-0')

        this.scene = scene
        this.scene.physics.add.existing(this)
        this.setImmovable(true)
        this.body.allowGravity = false
        this.body.moves = false
        this.body.setSize(this.width / 1.5, this.height / 3)
        this.scene.add.existing(this)

        this.scene.anims.create({
            key: 'fly',
            frames: [
                { key: 'ptero-0' },
                { key: 'ptero-1' }
            ],
            frameRate: 8,
            repeat: -1
        })
    }

    static preload(scene) {
        scene.load.image('ptero-0', 'assets/images/ptero/0.png')
        scene.load.image('ptero-1', 'assets/images/ptero/1.png')
    }

    update() {
        const { isPlaying, speed } = this.scene

        const pteroSpeed = speed + 2

        if (isPlaying) {
            this.x -= pteroSpeed
            this.play('fly', true)
        }
    }
}
