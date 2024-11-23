import React from 'react'
import Phaser from 'phaser'
import phaserGameConfig from '../utils/phaser'

export const Home = () => {
    const game = new Phaser.Game(phaserGameConfig)

    return (
        <div className='bg-slate-400 '>Home</div>
    )
}
