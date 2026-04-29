export class GameOver {
    constructor(scene) {
        this.scene = scene
        this.digitSprites = []
        this.show = false
        this.text = 'game over'
    }

    static preload(scene) {
        scene.load.image('restart', 'assets/images/restart-button.png')

        this.letters = 'gameovr'
        this.letters.split('').forEach(letter => {
            scene.load.image(letter, `assets/images/letters/${letter}.png`)
        })
    }

    reset() {
        this.digitSprites.forEach(sprite => sprite.destroy())
        this.digitSprites = []
        this.show = false

        if (this.restartBtn) {
            this.restartBtn.destroy()
        }
    }

    update() {
        if (this.show) {
            return
        }

        let x = (this.scene.cameras.main.width - (25 * this.text.replace(' ', '').length)) / 2

        for (let char of this.text) {
            if (char == ' ') {
                x += 20

                continue
            }

            const sprite = this.scene.add.image(x, 80, char).setOrigin(0, 0)

            this.digitSprites.push(sprite)
            x += 20
        }

        this.restartBtn = this.scene.add.image(
            this.scene.cameras.main.width / 2 - 20, this.scene.cameras.main.height / 4 + 20, 'restart'
        ).setOrigin(0.5, 0)
        this.show = true
    }
}
