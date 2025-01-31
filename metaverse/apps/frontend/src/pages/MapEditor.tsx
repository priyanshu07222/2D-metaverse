import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import { LuLayers2 } from "react-icons/lu";
import { CreateElement } from '../components/CreateElement';
import { PiWallThin } from 'react-icons/pi';
import { TbMoodBoy } from 'react-icons/tb';
import { CreateAvatar } from '../components/CreateAvatar';
import { GetElement } from '../components/GetElement';
import { GetAvatar } from '../components/GetAvatar';

export const MapEditor = () => {
  const gridRef = useRef(null);
  const tileSelectorRef = useRef(null);
  const [selectedTileIndex, setSelectedTileIndex] = useState(null)

  useEffect(() => {
    const gridConfig = {
      type: Phaser.AUTO,
      parent: gridRef.current,
      width: 800,
      height: 600,
      backgroundColor: '#ffffff',
      scene: {
        preload: preloadGrid,
        create: createGrid,
      },
    };

    const gridGame = new Phaser.Game(gridConfig);

    function preloadGrid() {
      this.load.spritesheet('tiles', 'assets/Little_Bits_Office_Floors.png', {
        frameWidth: 16,
        frameHeight: 16,
      });

    }

    function createGrid() {
      const gridSize = 32;
      const gridWidth = 25;
      const gridHeight = 18;
      // let selectedTileIndex = null;

      const graphics = this.add.graphics();
      graphics.lineStyle(1, 0x000000, 1);

      for (let x = 0; x <= gridWidth * gridSize; x += gridSize) {
        graphics.moveTo(x, 0);
        graphics.lineTo(x, gridHeight * gridSize);
      }
      for (let y = 0; y <= gridHeight * gridSize; y += gridSize) {
        graphics.moveTo(0, y);
        graphics.lineTo(gridWidth * gridSize, y);
      }
      graphics.strokePath();
      console.log("no clue", selectedTileIndex)


      this.input.on('pointerdown', (pointer) => {
        if (selectedTileIndex === null) {
          console.log('No tile selected!');
          return;
        }

        const x = Math.floor(pointer.x / gridSize);
        const y = Math.floor(pointer.y / gridSize);

        // Place the selected tile
        this.add
          .image(x * gridSize + gridSize / 2, y * gridSize + gridSize / 2, 'tiles', selectedTileIndex)
          .setScale(2); // Scale to match the grid size
      });


    }

    // Tile Selector Phaser Instance
    const tileSelectorConfig = {
      type: Phaser.AUTO,
      parent: tileSelectorRef.current,
      width: 150, // Adjust to fit the sidebar width
      height: 600,
      backgroundColor: '#f8f9fa',
      scene: {
        preload: preloadTileSelector,
        create: createTileSelector,
      },
    };

    // const tileSelectorGame = new Phaser.Game(tileSelectorConfig);

    function preloadTileSelector() {
      // Load the tileset image
      this.load.spritesheet('tiles', 'assets/Little_Bits_Office_Floors.png', {
        frameWidth: 16, // Tile width
        frameHeight: 16, // Tile height
      });
    }

    function createTileSelector() {
      const tileSize = 16;
      const tileScale = 2;
      let selectedTileGraphic = null;

      // Display tiles
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 5; j++) {
          const tileIndex = i * 5 + j;
          const x = j * tileSize * tileScale;
          const y = i * tileSize * tileScale;

          const tile = this.add
            .image(x, y, 'tiles', tileIndex)
            .setOrigin(0)
            .setScale(tileScale)
            .setInteractive();



          // Select tile on click
          tile.on('pointerdown', () => {
            if (selectedTileGraphic) {
              selectedTileGraphic.destroy();
            }

            selectedTileGraphic = this.add.graphics();
            selectedTileGraphic.lineStyle(2, 0xffd700, 1); // Gold color for outline
            selectedTileGraphic.strokeRect(
              tile.x, // Tile's x-coordinate
              tile.y, // Tile's y-coordinate
              tileSize * tileScale, // Width of the tile
              tileSize * tileScale  // Height of the tile
            );
            this.game.events.emit('selectTile', tileIndex); // Emit the event
            setSelectedTileIndex(tileIndex)
            console.log("Tile clicked, emitted event for index:", tileIndex);
          });
        }
      }
    }

    return () => {
      gridGame.destroy(true);
      // tileSelectorGame.destroy(true);
    };
  }, [selectedTileIndex]);


  return (
    <div>
      <h1>hello</h1>
      {/* <GetElement/> */}
      <GetAvatar />
      <div className='flex gap-8'>
        <div className='flex flex-col items-center p-2 hover:bg-gray-700 hover:text-white cursor-pointer '>
          <LuLayers2 size={25} />
          <p>Floor</p>
        </div>
        <div className='flex flex-col items-center p-2 hover:bg-gray-700 hover:text-white cursor-pointer '>
          <PiWallThin size={25} />
          <p>Walls</p>
        </div>
        <div className='flex flex-col items-center p-2 hover:bg-gray-700 hover:text-white cursor-pointer '>
          <TbMoodBoy size={25} />
          <p>Objects</p>
        </div>
      </div>
      <div className='h-screen flex'>
        {/* Left Sidebar */}
        <div className='w-1/6 bg-gray-600 text-white p-4'>
          <h2 className='text-lg font-bold'>Map Details</h2>
          <div>
            <label>Name:</label>
            <input
              type='text'
              placeholder='Enter map name'
              className='w-full mt-2 p-2 rounded'
            />
          </div>
        </div>

        {/* Grid Area */}
        <div className='w-4/6 h-screen bg-sky-50' ref={gridRef}></div>

        {/* Right Sidebar */}
        <div className='w-1/6 bg-orange-500 text-white p-4 '>
          <CreateElement />
          <h2 className='text-lg font-bold'>Tile Selector</h2>
          <p>Click on a tile to select it, then click on the grid to place it.</p>
          <div
            ref={tileSelectorRef}

          ></div>
          <CreateAvatar />
        </div>
      </div>
    </div>
  );


};
