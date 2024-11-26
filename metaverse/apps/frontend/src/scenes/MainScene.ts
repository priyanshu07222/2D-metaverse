import Phaser from "phaser";

const mainScene = (): Phaser.Types.Scenes.CreateSceneFromObjectConfig => {
    // Change to Sprite for animation or movement

    function preload(this: Phaser.Scene) {
        // Load assets
        this.load.image('cave', '/assets/cave.png');
        this.load.image('inner', '/assets/Inner.png');
        this.load.image('objects', '/assets/objects.png');
        this.load.image('overworld', '/assets/Overworld.png');
        this.load.image('npctest', '/assets/NPC_test.png');
        this.load.image('log', '/assets/log.png');
        this.load.spritesheet('character', '/assets/character.png', {frameWidth: 32, frameHeight: 32});
        this.load.tilemapTiledJSON('main-map', '/assets/newTiled');
    }
    let avatar: Phaser.Physics.Arcade.Sprite;

    function create(this: Phaser.Scene) {
        // Create the tilemap
        const map = this.make.tilemap({ key: 'main-map' });

        // Add tilesets
        const overworldTileset = map.addTilesetImage('Overworld', 'overworld');
        const innerTileset = map.addTilesetImage('Inner', 'inner');
        const objectsTileset = map.addTilesetImage('objects', 'objects');
        // const NPC_testTileset = map.addTilesetImage('NPC_test', 'npctest');
        // const logTileset = map.addTilesetImage('log', 'log');
        const caveTileset = map.addTilesetImage('cave', 'cave');
        // const characterTileset = map.addTilesetImage('character', 'character');

        // Create layers
        const overworldLayer = map.createLayer('Tile Layer 1', overworldTileset!, 0, 0);
        const innerLayer = map.createLayer('Tile Layer 2', innerTileset!, 0, 0);
        // map.createLayer('Tile Layer 2', overworldTileset!, 0, 0); //yes
        // map.createLayer('Tile Layer 2', innerTileset!, 0, 0) //yes
        // map.createLayer('Tile Layer 2', objectsTileset!, 0, 0)
        const y = map.createLayer('object', innerTileset!, 0, 0)
        // Configure layers
        overworldLayer?.setCollisionByProperty({ collides: true });
        // innerLayer?.setDepth(0);

        // Add player/avatar
        // avatar = this.physics.add.sprite(100, 100, 'character'); // Initial position (100, 100)
        avatar = this.physics.add.sprite(100, 100, 'character', 0)
        avatar.setCollideWorldBounds()
        // avatar.setCollidesWith(1)

        // Add collider for player and map
        // this.physics.add.collider(avatar, overworldLayer!);
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
