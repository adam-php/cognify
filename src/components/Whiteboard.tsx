import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase/config';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const Whiteboard: React.FC = () => {
  const [lines, setLines] = useState<any[]>([]);
  const isDrawing = useRef(false);

  useEffect(() => {
    const linesRef = ref(database, 'lines');
    onValue(linesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setLines(data);
      }
    });
  }, []);

  const handleMouseDown = (e: any) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing.current) return;

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
    set(ref(database, 'lines'), lines);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <div className="whiteboard-container">
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={2}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation="source-over"
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Whiteboard;