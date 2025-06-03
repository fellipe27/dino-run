export class Score {
    constructor(scene, isHigh) {
        this.scene = scene
        this.isHigh = isHigh
        this.points = 0
        this.digitSprites = []
        this.x = this.scene.cameras.main.width - 20 - (this.isHigh ? 140 : 0)
        this.y = 20
    }

    static preload(scene) {
        for (let i = 0; i < 10; i++) {
            scene.load.image(`digit-${i}`, `assets/images/numbers/${i}.png`)
        }

        scene.load.image('hi', 'assets/images/letters/hi.png')
    }

    setHi(points) {
        this.points = points > this.points ? points : this.points
    }

    add(points) {
        this.points += points
    }

    update() {
        if (this.isHigh) {
            this.scene.add.image(this.scene.cameras.main.width - 280, 20, 'hi').setOrigin(0, 0)
        }

        this.digitSprites.forEach(sprite => sprite.destroy())
        this.digitSprites = []

        const scoreStr = Math.floor(this.points).toString().padStart(6, '0')
        const startX = this.x - 15 * scoreStr.length

        for (let i = 0; i < scoreStr.length; i++) {
            const x = startX + i * 15
            const sprite = this.scene.add.image(x, this.y, `digit-${scoreStr[i]}`).setOrigin(0, 0)

            this.digitSprites.push(sprite)
        }

        const intScore = Math.floor(this.points)

        if (intScore > 0 && intScore % 100 === 0) {
            this.scene.pointSound.play()
        }
    }
}
