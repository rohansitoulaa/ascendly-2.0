"use client";

import { useRef, useEffect } from "react";

type CanvasStrokeStyle = string | CanvasGradient | CanvasPattern;

interface GridOffset {
  x: number;
  y: number;
}

interface ShapeGridProps {
  direction?: "diagonal" | "up" | "right" | "down" | "left";
  speed?: number;
  borderColor?: CanvasStrokeStyle;
  squareSize?: number;
  hoverFillColor?: CanvasStrokeStyle;
  shape?: "square" | "hexagon" | "circle" | "triangle";
  hoverTrailAmount?: number;
}

export default function ShapeGrid({
  direction = "right",
  speed = 1,
  borderColor = "#999",
  squareSize = 40,
  hoverFillColor = "#222",
  shape = "square",
  hoverTrailAmount = 0,
}: ShapeGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const numSquaresX = useRef<number>(0);
  const numSquaresY = useRef<number>(0);
  const gridOffset = useRef<GridOffset>({ x: 0, y: 0 });
  const hoveredSquareRef = useRef<GridOffset | null>(null);
  const trailCells = useRef<GridOffset[]>([]);
  const cellOpacities = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const isHex = shape === "hexagon";
    const isTriangle = shape === "triangle";
    const hexHorizontal = squareSize * 1.5;
    const hexVertical = squareSize * Math.sqrt(3);

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const drawHex = (cx: number, cy: number, size: number) => {
      context.beginPath();

      for (let index = 0; index < 6; index += 1) {
        const angle = (Math.PI / 3) * index;
        const x = cx + size * Math.cos(angle);
        const y = cy + size * Math.sin(angle);

        if (index === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      }

      context.closePath();
    };

    const drawCircle = (cx: number, cy: number, size: number) => {
      context.beginPath();
      context.arc(cx, cy, size / 2, 0, Math.PI * 2);
      context.closePath();
    };

    const drawTriangle = (
      cx: number,
      cy: number,
      size: number,
      flip: boolean,
    ) => {
      context.beginPath();

      if (flip) {
        context.moveTo(cx, cy + size / 2);
        context.lineTo(cx + size / 2, cy - size / 2);
        context.lineTo(cx - size / 2, cy - size / 2);
      } else {
        context.moveTo(cx, cy - size / 2);
        context.lineTo(cx + size / 2, cy + size / 2);
        context.lineTo(cx - size / 2, cy + size / 2);
      }

      context.closePath();
    };

    const updateCellOpacities = () => {
      const targets = new Map<string, number>();

      if (hoveredSquareRef.current) {
        targets.set(
          `${hoveredSquareRef.current.x},${hoveredSquareRef.current.y}`,
          1,
        );
      }

      if (hoverTrailAmount > 0) {
        for (let index = 0; index < trailCells.current.length; index += 1) {
          const trail = trailCells.current[index];
          const key = `${trail.x},${trail.y}`;

          if (!targets.has(key)) {
            targets.set(
              key,
              (trailCells.current.length - index) /
                (trailCells.current.length + 1),
            );
          }
        }
      }

      for (const [key] of targets) {
        if (!cellOpacities.current.has(key)) {
          cellOpacities.current.set(key, 0);
        }
      }

      for (const [key, opacity] of cellOpacities.current) {
        const target = targets.get(key) ?? 0;
        const nextOpacity = opacity + (target - opacity) * 0.15;

        if (nextOpacity < 0.005) {
          cellOpacities.current.delete(key);
        } else {
          cellOpacities.current.set(key, nextOpacity);
        }
      }
    };

    const drawGrid = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      if (isHex) {
        const columnShift = Math.floor(gridOffset.current.x / hexHorizontal);
        const offsetX =
          ((gridOffset.current.x % hexHorizontal) + hexHorizontal) %
          hexHorizontal;
        const offsetY =
          ((gridOffset.current.y % hexVertical) + hexVertical) % hexVertical;

        const columns = Math.ceil(canvas.width / hexHorizontal) + 3;
        const rows = Math.ceil(canvas.height / hexVertical) + 3;

        for (let column = -2; column < columns; column += 1) {
          for (let row = -2; row < rows; row += 1) {
            const cx = column * hexHorizontal + offsetX;
            const cy =
              row * hexVertical +
              ((column + columnShift) % 2 !== 0 ? hexVertical / 2 : 0) +
              offsetY;

            const cellKey = `${column},${row}`;
            const alpha = cellOpacities.current.get(cellKey);

            if (alpha) {
              context.globalAlpha = alpha;
              drawHex(cx, cy, squareSize);
              context.fillStyle = hoverFillColor;
              context.fill();
              context.globalAlpha = 1;
            }

            drawHex(cx, cy, squareSize);
            context.strokeStyle = borderColor;
            context.stroke();
          }
        }
      } else if (isTriangle) {
        const halfWidth = squareSize / 2;
        const columnShift = Math.floor(gridOffset.current.x / halfWidth);
        const rowShift = Math.floor(gridOffset.current.y / squareSize);
        const offsetX =
          ((gridOffset.current.x % halfWidth) + halfWidth) % halfWidth;
        const offsetY =
          ((gridOffset.current.y % squareSize) + squareSize) % squareSize;

        const columns = Math.ceil(canvas.width / halfWidth) + 4;
        const rows = Math.ceil(canvas.height / squareSize) + 4;

        for (let column = -2; column < columns; column += 1) {
          for (let row = -2; row < rows; row += 1) {
            const cx = column * halfWidth + offsetX;
            const cy = row * squareSize + squareSize / 2 + offsetY;
            const flip =
              ((column + columnShift + row + rowShift) % 2 + 2) % 2 !== 0;

            const cellKey = `${column},${row}`;
            const alpha = cellOpacities.current.get(cellKey);

            if (alpha) {
              context.globalAlpha = alpha;
              drawTriangle(cx, cy, squareSize, flip);
              context.fillStyle = hoverFillColor;
              context.fill();
              context.globalAlpha = 1;
            }

            drawTriangle(cx, cy, squareSize, flip);
            context.strokeStyle = borderColor;
            context.stroke();
          }
        }
      } else if (shape === "circle") {
        const offsetX =
          ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
        const offsetY =
          ((gridOffset.current.y % squareSize) + squareSize) % squareSize;

        const columns = Math.ceil(canvas.width / squareSize) + 3;
        const rows = Math.ceil(canvas.height / squareSize) + 3;

        for (let column = -2; column < columns; column += 1) {
          for (let row = -2; row < rows; row += 1) {
            const cx = column * squareSize + squareSize / 2 + offsetX;
            const cy = row * squareSize + squareSize / 2 + offsetY;

            const cellKey = `${column},${row}`;
            const alpha = cellOpacities.current.get(cellKey);

            if (alpha) {
              context.globalAlpha = alpha;
              drawCircle(cx, cy, squareSize);
              context.fillStyle = hoverFillColor;
              context.fill();
              context.globalAlpha = 1;
            }

            drawCircle(cx, cy, squareSize);
            context.strokeStyle = borderColor;
            context.stroke();
          }
        }
      } else {
        const offsetX =
          ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
        const offsetY =
          ((gridOffset.current.y % squareSize) + squareSize) % squareSize;

        const columns = Math.ceil(canvas.width / squareSize) + 3;
        const rows = Math.ceil(canvas.height / squareSize) + 3;

        for (let column = -2; column < columns; column += 1) {
          for (let row = -2; row < rows; row += 1) {
            const startX = column * squareSize + offsetX;
            const startY = row * squareSize + offsetY;

            const cellKey = `${column},${row}`;
            const alpha = cellOpacities.current.get(cellKey);

            if (alpha) {
              context.globalAlpha = alpha;
              context.fillStyle = hoverFillColor;
              context.fillRect(startX, startY, squareSize, squareSize);
              context.globalAlpha = 1;
            }

            context.strokeStyle = borderColor;
            context.strokeRect(startX, startY, squareSize, squareSize);
          }
        }
      }

      const gradient = context.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2,
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(1, "#120F17");

      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
    };

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1);
      const wrapX = isHex ? hexHorizontal * 2 : squareSize;
      const wrapY = isHex ? hexVertical : isTriangle ? squareSize * 2 : squareSize;

      switch (direction) {
        case "right":
          gridOffset.current.x =
            (gridOffset.current.x - effectiveSpeed + wrapX) % wrapX;
          break;
        case "left":
          gridOffset.current.x =
            (gridOffset.current.x + effectiveSpeed + wrapX) % wrapX;
          break;
        case "up":
          gridOffset.current.y =
            (gridOffset.current.y + effectiveSpeed + wrapY) % wrapY;
          break;
        case "down":
          gridOffset.current.y =
            (gridOffset.current.y - effectiveSpeed + wrapY) % wrapY;
          break;
        case "diagonal":
          gridOffset.current.x =
            (gridOffset.current.x - effectiveSpeed + wrapX) % wrapX;
          gridOffset.current.y =
            (gridOffset.current.y - effectiveSpeed + wrapY) % wrapY;
          break;
        default:
          break;
      }

      updateCellOpacities();
      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      if (isHex) {
        const columnShift = Math.floor(gridOffset.current.x / hexHorizontal);
        const offsetX =
          ((gridOffset.current.x % hexHorizontal) + hexHorizontal) %
          hexHorizontal;
        const offsetY =
          ((gridOffset.current.y % hexVertical) + hexVertical) % hexVertical;
        const adjustedX = mouseX - offsetX;
        const adjustedY = mouseY - offsetY;

        const column = Math.round(adjustedX / hexHorizontal);
        const rowOffset =
          (column + columnShift) % 2 !== 0 ? hexVertical / 2 : 0;
        const row = Math.round((adjustedY - rowOffset) / hexVertical);

        if (
          !hoveredSquareRef.current ||
          hoveredSquareRef.current.x !== column ||
          hoveredSquareRef.current.y !== row
        ) {
          if (hoveredSquareRef.current && hoverTrailAmount > 0) {
            trailCells.current.unshift({ ...hoveredSquareRef.current });
            if (trailCells.current.length > hoverTrailAmount) {
              trailCells.current.length = hoverTrailAmount;
            }
          }

          hoveredSquareRef.current = { x: column, y: row };
        }

        return;
      }

      if (isTriangle) {
        const halfWidth = squareSize / 2;
        const offsetX =
          ((gridOffset.current.x % halfWidth) + halfWidth) % halfWidth;
        const offsetY =
          ((gridOffset.current.y % squareSize) + squareSize) % squareSize;

        const adjustedX = mouseX - offsetX;
        const adjustedY = mouseY - offsetY;

        const column = Math.round(adjustedX / halfWidth);
        const row = Math.floor(adjustedY / squareSize);

        if (
          !hoveredSquareRef.current ||
          hoveredSquareRef.current.x !== column ||
          hoveredSquareRef.current.y !== row
        ) {
          if (hoveredSquareRef.current && hoverTrailAmount > 0) {
            trailCells.current.unshift({ ...hoveredSquareRef.current });
            if (trailCells.current.length > hoverTrailAmount) {
              trailCells.current.length = hoverTrailAmount;
            }
          }

          hoveredSquareRef.current = { x: column, y: row };
        }

        return;
      }

      const offsetX =
        ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
      const offsetY =
        ((gridOffset.current.y % squareSize) + squareSize) % squareSize;

      const adjustedX = mouseX - offsetX;
      const adjustedY = mouseY - offsetY;

      const column =
        shape === "circle"
          ? Math.round(adjustedX / squareSize)
          : Math.floor(adjustedX / squareSize);
      const row =
        shape === "circle"
          ? Math.round(adjustedY / squareSize)
          : Math.floor(adjustedY / squareSize);

      if (
        !hoveredSquareRef.current ||
        hoveredSquareRef.current.x !== column ||
        hoveredSquareRef.current.y !== row
      ) {
        if (hoveredSquareRef.current && hoverTrailAmount > 0) {
          trailCells.current.unshift({ ...hoveredSquareRef.current });
          if (trailCells.current.length > hoverTrailAmount) {
            trailCells.current.length = hoverTrailAmount;
          }
        }

        hoveredSquareRef.current = { x: column, y: row };
      }
    };

    const handleMouseLeave = () => {
      if (hoveredSquareRef.current && hoverTrailAmount > 0) {
        trailCells.current.unshift({ ...hoveredSquareRef.current });
        if (trailCells.current.length > hoverTrailAmount) {
          trailCells.current.length = hoverTrailAmount;
        }
      }

      hoveredSquareRef.current = null;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener("resize", resizeCanvas);

      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }

      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [
    direction,
    speed,
    borderColor,
    hoverFillColor,
    squareSize,
    shape,
    hoverTrailAmount,
  ]);

  return <canvas ref={canvasRef} className="block h-full w-full border-none" />;
}
