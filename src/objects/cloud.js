import Phaser from 'phaser'

export class Cloud extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene)

        this.scene = scene
        this.startX = this.scene.cameras.main.width
        this.cloud0 = new Phaser.GameObjects.Image(this.scene, this.startX, this.setY, 'cloud').setOrigin(0, 0)
        this.cloud1 = new Phaser.GameObjects.Image(this.scene, this.startX + 400, this.setY, 'cloud').setOrigin(0, 0)
        this.add(this.cloud0)
        this.add(this.cloud1)
        this.scene.add.existing(this)
    }

    static preload(scene) {
        scene.load.image('cloud', 'assets/images/cloud.png')
    }

    setY() {
        return Math.floor(Math.random() * (100 - 20 + 1)) + 20
    }

    update() {
        const { isPlaying, speed } = this.scene

        if (isPlaying) {
            this.cloud0.x -= speed
            this.cloud1.x -= speed

            if (this.cloud0.x + this.cloud0.width < 0) {
                this.cloud0.y = this.setY()
                this.cloud0.x = this.startX
            }
            if (this.cloud1.x + this.cloud1.width < 0) {
                this.cloud1.y = this.setY()
                this.cloud1.x = this.startX
            }
        }
    }
}
