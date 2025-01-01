import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

const WhiteboardCanvas = ({ boardId }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: true,
    });

    // Set up basic drawing settings
    canvas.freeDrawingBrush.color = '#000000';
    canvas.freeDrawingBrush.width = 5;

    // Clean up on component unmount
    return () => {
      canvas.dispose();
    };
  }, []);

  return (
    <div className="whiteboard-canvas">
      <canvas ref={canvasRef} width={800} height={600} />
    </div>
  );
};

export default WhiteboardCanvas;
