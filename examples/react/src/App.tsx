import React, { useRef, useState } from 'react';
import { SeatmapCanvas, SeatmapCanvasRef } from '../../../src/react';
import type { BlockData, SeatmapOptions } from '../../../src/react';
import './App.css';

function App() {
  const seatmapRef = useRef<SeatmapCanvasRef>(null);
  const [selectedSeats, setSelectedSeats] = useState<any[]>([]);
  const [blocks, setBlocks] = useState<BlockData[]>([]);

  const seatmapOptions: SeatmapOptions = {
    legend: true,
    style: {
      seat: {
        hover: '#8fe100',
        color: '#f0f7fa',
        selected: '#8fe100',
        check_icon_color: '#fff',
        not_salable: '#0088d3',
        focus: '#8fe100',
      },
      legend: {
        font_color: '#3b3b3b',
        show: false
      },
      block: {
        title_color: '#fff'
      }
    }
  };

  const generateRandomBlocks = (blockCount = 4, gapX = 40, gapY = 40) => {
    const blockColors = ['#01a5ff', '#fccf4e', '#01a5ff', '#01a5ff'];
    const newBlocks: BlockData[] = [];
    let lastX = 0;

    for (let j = 0; j < blockCount; j++) {
      const color = blockColors[j];
      const seats = [];
      let cellCount = 0;
      let rowCount = 0;
      let blockFinalX = 0;
      const randomSeatCount = Math.round(Math.random() * 200 + 200);
      const randomCell = Math.round(Math.random() * 12 + 12);
      const blockTitle = `Block ${j + 1}`;

      for (let k = 0; k < randomSeatCount; k++) {
        if (k % randomCell === 0) {
          cellCount = 1;
          rowCount++;
        }

        const x = cellCount * gapX + lastX;
        const y = rowCount * gapY;

        if (blockFinalX < x) blockFinalX = x;

        const salable = Math.ceil(Math.random() * 10) > 3;
        const randomPrice = (Math.floor(Math.random() * 10) + 1) * 10;

        seats.push({
          id: `s-${k}`,
          x,
          y,
          color,
          salable,
          custom_data: {
            price: randomPrice,
            basket_name: `${blockTitle} - ${cellCount} ${rowCount}`
          },
          title: `${blockTitle}\n${cellCount} ${rowCount}`
        });

        cellCount++;
      }

      lastX = blockFinalX + 320;

      newBlocks.push({
        id: `block-${j}`,
        title: blockTitle,
        color,
        seats,
        gap: 12
      });
    }

    setBlocks(newBlocks);
  };

  const handleSeatClick = (seat: any) => {
    if (!seat.isSelected() && seat.item.salable === true) {
      seat.select();
    } else {
      seat.unSelect();
    }
  };

  const handleSeatSelect = () => {
    updateSelectedSeats();
  };

  const handleSeatUnselect = () => {
    updateSelectedSeats();
  };

  const updateSelectedSeats = () => {
    if (seatmapRef.current?.seatmap) {
      setSelectedSeats(seatmapRef.current.seatmap.data.getSelectedSeats());
    }
  };

  const unselectSeat = (seat: any) => {
    const seatInstance = seatmapRef.current?.seatmap?.data.getSeat(seat.id, seat.block.id);
    if (seatInstance) {
      seatInstance.svg.unSelect();
      updateSelectedSeats();
    }
  };

  const handleZoomToVenue = () => {
    seatmapRef.current?.seatmap?.zoomManager.zoomToVenue();
  };

  const handleZoomToBlock = (blockId: string) => {
    seatmapRef.current?.seatmap?.zoomManager.zoomToBlock(blockId);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + (seat.custom_data?.price || 0), 0);

  // Initialize with random data
  React.useEffect(() => {
    generateRandomBlocks();
  }, []);

  return (
    <div className="app-container">
      <div className="header">
        <h1>Seatmap Canvas - React Demo</h1>
        <div className="controls">
          <button onClick={() => generateRandomBlocks()} className="btn btn-primary">
            <i className="fa-solid fa-shuffle"></i> Randomize Seats
          </button>
          <button onClick={handleZoomToVenue} className="btn btn-secondary">
            <i className="fa-solid fa-magnifying-glass-minus"></i> Zoom Out
          </button>
          <button onClick={() => handleZoomToBlock('block-0')} className="btn btn-secondary">
            <i className="fa-solid fa-magnifying-glass-plus"></i> Zoom to Block 1
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="sidebar left">
          <div className="panel">
            <h3>Blocks</h3>
            <div className="block-list">
              {blocks.map((block) => (
                <button
                  key={block.id}
                  onClick={() => handleZoomToBlock(block.id)}
                  className="block-btn"
                >
                  <i className="fa-solid fa-magnifying-glass-plus"></i>
                  {block.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="seatmap-wrapper">
          <SeatmapCanvas
            ref={seatmapRef}
            options={seatmapOptions}
            data={blocks}
            onSeatClick={handleSeatClick}
            onSeatSelect={handleSeatSelect}
            onSeatUnselect={handleSeatUnselect}
            className="seatmap-container"
          />
        </div>

        <div className="sidebar right">
          <div className="panel">
            <h3>Selected Seats</h3>
            {selectedSeats.length === 0 ? (
              <div className="empty-state">
                <i className="fa-regular fa-face-rolling-eyes"></i>
                <p>No selected seats</p>
              </div>
            ) : (
              <div className="seat-list">
                {selectedSeats.map((seat) => (
                  <div key={`${seat.block.id}-${seat.id}`} className="seat-item">
                    <div className="seat-color" style={{ backgroundColor: '#8fe100' }}></div>
                    <div className="seat-info">
                      <div className="seat-title">
                        {seat.custom_data?.basket_name || seat.title}
                      </div>
                      <div className="seat-price">
                        {formatPrice(seat.custom_data?.price || 0)}
                      </div>
                    </div>
                    <button onClick={() => unselectSeat(seat)} className="remove-btn">
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                ))}
                <div className="total">
                  <strong>Total: {formatPrice(totalPrice)}</strong>
                  <span>
                    for {selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
