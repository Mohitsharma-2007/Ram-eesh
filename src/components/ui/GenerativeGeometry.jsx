import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

export const GenerativeGeometry = ({ onComplete }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const sketch = (p) => {
            let squares = [];
            let canvasSize;
            const white = '#F2F5F1';
            const colors = ['#D40920', '#1356A2', '#F7D842']; // Red, Blue, Yellow

            p.setup = () => {
                canvasSize = p.min(p.windowWidth, p.windowHeight) * 0.7;
                p.createCanvas(canvasSize, canvasSize);
                generateMondrian();

                // Signal completion after a short delay to allow viewing
                setTimeout(() => {
                    if (onComplete) onComplete();
                }, 3500);
            };

            p.draw = () => {
                drawMondrian();
                p.noLoop();
            };

            const generateMondrian = () => {
                const size = canvasSize;
                const step = size / 7;

                // Start with one big square
                squares = [{
                    x: 0,
                    y: 0,
                    width: size,
                    height: size
                }];

                // Split squares on grid lines
                for (let i = step; i < size; i += step) {
                    splitSquaresWith({ y: i });
                    splitSquaresWith({ x: i });
                }

                // Add some random color to squares
                const numColored = p.floor(p.random(3, 6));
                for (let i = 0; i < numColored; i++) {
                    const randomSquare = squares[p.floor(p.random(squares.length))];
                    if (randomSquare) randomSquare.color = colors[i % colors.length];
                }
            };

            const splitSquaresWith = (coordinates) => {
                const { x, y } = coordinates;

                for (let i = squares.length - 1; i >= 0; i--) {
                    const square = squares[i];

                    if (x && x > square.x && x < square.x + square.width) {
                        if (p.random() > 0.5) {
                            squares.splice(i, 1);
                            splitOnX(square, x);
                        }
                    }

                    if (y && y > square.y && y < square.y + square.height) {
                        if (p.random() > 0.5) {
                            squares.splice(i, 1);
                            splitOnY(square, y);
                        }
                    }
                }
            };

            const splitOnX = (square, splitAt) => {
                const squareA = {
                    x: square.x,
                    y: square.y,
                    width: square.width - (square.width - splitAt + square.x),
                    height: square.height,
                    color: square.color
                };

                const squareB = {
                    x: splitAt,
                    y: square.y,
                    width: square.width - splitAt + square.x,
                    height: square.height,
                    color: square.color
                };

                squares.push(squareA);
                squares.push(squareB);
            };

            const splitOnY = (square, splitAt) => {
                const squareA = {
                    x: square.x,
                    y: square.y,
                    width: square.width,
                    height: square.height - (square.height - splitAt + square.y),
                    color: square.color
                };

                const squareB = {
                    x: square.x,
                    y: splitAt,
                    width: square.width,
                    height: square.height - splitAt + square.y,
                    color: square.color
                };

                squares.push(squareA);
                squares.push(squareB);
            };

            const drawMondrian = () => {
                p.background(255);
                p.strokeWeight(8);
                p.stroke(0);

                for (let i = 0; i < squares.length; i++) {
                    const square = squares[i];

                    // Fill color
                    if (square.color) {
                        p.fill(square.color);
                    } else {
                        p.fill(white);
                    }

                    // Draw rectangle
                    p.rect(square.x, square.y, square.width, square.height);
                }
            };

            p.windowResized = () => {
                canvasSize = p.min(p.windowWidth, p.windowHeight) * 0.7;
                p.resizeCanvas(canvasSize, canvasSize);
                squares = [];
                generateMondrian();
                p.redraw();
            };

            // Removed p.mousePressed to keep it as a loading screen without interaction resetting it constantly relative to the user flow
        };

        const p5Instance = new p5(sketch, containerRef.current);

        return () => {
            p5Instance.remove();
        };
    }, [onComplete]);

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen bg-white">
            <div ref={containerRef} className="shadow-2xl border-4 border-black" />
            <p className="mt-8 text-lg font-mono font-bold tracking-widest text-gray-900 animate-pulse">GENERATING INTERFACE...</p>
        </div>
    );
};
