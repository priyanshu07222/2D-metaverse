import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { CreateElement } from '../components/CreateElement';

export const MapEditor = () => {
  const gridRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      parent: gridRef.current, // Attach Phaser to this div
      width: 800, // Width of the grid area
      height: 600, // Height of the grid area
      backgroundColor: '#ffffff',
      scene: {
        preload: preload,
        create: create,
      },
    };

    const game = new Phaser.Game(config);

    function preload() {
      this.load.image('tile', 'assets/character.png'); // Replace with your tile image
      this.load.image('object', 'path/to/object.png'); // Replace with your object image
      this.load.image('wall', 'path/to/wall.png'); // Replace with your wall image
    }

    function create() {
      const gridSize = 32;
      const gridWidth = 25; // Number of columns
      const gridHeight = 18; // Number of rows
      const graphics = this.add.graphics();

      // Draw the grid
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

      // Enable tile/object placement
      this.input.on('pointerdown', (pointer) => {
        const x = Math.floor(pointer.x / gridSize) * gridSize + gridSize / 2;
        const y = Math.floor(pointer.y / gridSize) * gridSize + gridSize / 2;

        // Place a tile for demonstration; you can replace this logic
        this.add.image(x, y, 'tile');
      });
    }

    return () => {
      game.destroy(true); // Clean up Phaser instance on component unmount
    };
  }, []);

  return (
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
      <div className='w-4/6 h-screen bg-sky-500' ref={gridRef}></div>

      {/* Right Sidebar */}
      <div className='w-1/6 bg-orange-50 text-white p-4 '>
        <CreateElement />
      </div>
    </div>
  );

  // Logic for selecting tools
  function selectTool(toolType) {
    console.log(`Selected: ${toolType}`);
    // Implement logic to change the tool in Phaser
  }
};
