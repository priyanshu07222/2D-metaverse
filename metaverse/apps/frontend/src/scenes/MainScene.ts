import Phaser from "phaser";

const mainScene = (): Phaser.Types.Scenes.CreateSceneFromObjectConfig => {

    function preload(this: Phaser.Scene) {
        // Load assets

        this.load.image('floor', '/assets/Little_Bits_Office_Floors.png')
        this.load.image('objects', '/assets/Little_Bits_office_objects.png')
        this.load.image('walls', '/assets/Little_Bits_office_walls.png')
        this.load.tilemapTiledJSON('office-map', '/assets/officetiled')

        this.load.spritesheet('character', '/assets/character.png', { frameWidth: 32, frameHeight: 32 });
    }
    let avatar: Phaser.Physics.Arcade.Sprite;

    function create(this: Phaser.Scene) {
        const map = this.make.tilemap({ key: 'office-map' });


        const floorTileset = map.addTilesetImage('Little_Bits_Office_Floors', 'floor')
        const objectsTileset = map.addTilesetImage('Little_Bits_office_objects', 'objects')
        const wallsTileset = map.addTilesetImage('Little_Bits_office_walls', 'walls')

        const floorlayer = map.createLayer('floor', floorTileset!, 0, 0)
        const wallslayer = map.createLayer('walls', wallsTileset!, 0, 0)
        const objectslayer = map.createLayer('object', objectsTileset!, 0, 0)
        map.createLayer('things', objectsTileset!, 0, 0)
        // avatar.setCollidesWith(0)

        wallslayer?.setCollisionByProperty({ collides: true }, true, true)
        objectslayer?.setCollisionByProperty({ collides: true })

        // Add player/avatar
        avatar = this.physics.add.sprite(100, 100, 'character', 0)
        avatar.setCollideWorldBounds()
        this.physics.add.collider(avatar, wallslayer!); // Collide with walls
        this.physics.add.collider(avatar, objectslayer!); 
        // avatar.setCollidesWith(0)

        // Add collider for player and map
    }

    function update(this: Phaser.Scene) {
        // Handle player movement
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
            // avatar.setVelocity
        }
    }

    return { preload, create, update };
};

export default mainScene;
