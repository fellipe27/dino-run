import { useEffect } from 'react'
import Phaser from 'phaser'

export function GameComponent({ config }) {
    useEffect(() => {
        const game = new Phaser.Game(config)

        return () => game.destroy(true)
    }, [config])

    return <div id="phaser-container" />
}
