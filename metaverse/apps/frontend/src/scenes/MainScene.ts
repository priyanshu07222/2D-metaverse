import Phaser from "phaser";

const mainScene = (): Phaser.Types.Scenes.CreateSceneFromObjectConfig => {
    let avatar: Phaser.Physics.Arcade.Sprite;
    // let controls;

    function preload(this: Phaser.Scene) {

        this.load.image('floor', '/assets/Little_Bits_Office_Floors.png')
        this.load.image('objects', '/assets/Little_Bits_office_objects.png')
        this.load.image('walls', '/assets/Little_Bits_office_walls.png')
        this.load.tilemapTiledJSON('office-map', '/assets/officetiled')

        this.load.spritesheet('character', '/assets/character.png', { frameWidth: 17, frameHeight: 32 });
    }


    function create(this: Phaser.Scene) {
        const map = this.make.tilemap({ key: 'office-map' });


        const floorTileset = map.addTilesetImage('Little_Bits_Office_Floors', 'floor')
        const objectsTileset = map.addTilesetImage('Little_Bits_office_objects', 'objects')
        const wallsTileset = map.addTilesetImage('Little_Bits_office_walls', 'walls')

        map.createLayer('floor', floorTileset!, 0, 0)
        const wallslayer = map.createLayer('walls', wallsTileset!, 0, 0)
        const objectslayer = map.createLayer('object', objectsTileset!, 0, 0)
        map.createLayer('things', objectsTileset!, 0, 0)

        wallslayer?.setCollisionByProperty({ collides: true }, true, true)
        objectslayer?.setCollisionByProperty({ collides: true })


        avatar = this.physics.add.sprite(100, 100, 'character')
        avatar.setCollideWorldBounds()
        this.physics.add.collider(avatar, wallslayer!);
        this.physics.add.collider(avatar, objectslayer!);


        const camera = this.cameras.main;
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        camera.startFollow(avatar)
        camera.zoomTo(2, 1000)
    }

    function update(this: Phaser.Scene) {
        const cursors = this.input.keyboard.createCursorKeys();


        if (cursors.left?.isDown) {
            avatar.setVelocityX(-100);
            avatar.setVelocityY(0)
        } else if (cursors.right?.isDown) {
            avatar.setVelocityX(100);
            avatar.setVelocityY(0)
        } else {
            avatar.setVelocityX(0);
        }

        if (cursors.up?.isDown) {
            avatar.setVelocityY(-100);
            avatar.setVelocityX(0)
        } else if (cursors.down?.isDown) {
            avatar.setVelocityY(100);
            avatar.setVelocityX(0)
        } else {
            avatar.setVelocityY(0);
        }
    }

    return { preload, create, update };
};

export default mainScene;
