import Phaser from "phaser";

const mainScene = (): any => {
    let avatar: Phaser.GameObjects.Image

    function preload(this: Phaser.Scene) {
        this.load.image('avatar', '/assets/avatar.png')
    }

    function create(this: Phaser.Scene) {
        avatar = this.add.image(400, 300, 'avatar');
    }

    function update(this: Phaser.Scene) {
        avatar.x += 1; // Move the 
    }
    return { preload, create, update };
}

export default mainScene 