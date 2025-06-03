import Phaser from 'phaser'

export class Ground extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y)

        this.scene = scene
        this.ground0 = new Phaser.GameObjects.Image(this.scene, 0, 0, 'ground').setOrigin(0, 0)
        this.ground1 = new Phaser.GameObjects.Image(this.scene, this.ground0.width, 0, 'ground').setOrigin(0, 0)
        this.add(this.ground0)
        this.add(this.ground1)
        this.platform = this.scene.physics.add.staticImage(
            x, y + 15, null
        ).setOrigin(0,0).setDisplaySize(this.scene.scale.width, 10).setVisible(false).refreshBody()
        this.scene.add.existing(this)
    }

    static preload(scene) {
        scene.load.image('ground', 'assets/images/ground.png')
    }

    update() {
        const { isPlaying, speed } = this.scene

        if (isPlaying) {
            this.ground0.x -= speed
            this.ground1.x -= speed

            if (this.ground0.x + this.ground0.width < 0) {
                this.ground0.x = this.ground1.x + this.ground1.width
            }
            if (this.ground1.x + this.ground1.width < 0) {
                this.ground1.x = this.ground0.x + this.ground0.width
            }
        }
    }
}
