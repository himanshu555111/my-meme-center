import React, { useRef, useEffect, useState, useCallback } from 'react'

const Canvas = props => {

    // const [isPainting, setIsPainting] = useState(false);
    // const [mousePosition, setMousePosition] = useState({
    //     x: undefined,
    //     y: undefined
    // });

    const canvasRef = useRef(null)

    // const { draw } = props;

    // const startPaint = useCallback((event) => {
    //     const coordinates = getCoordinates(event);
    //     if (coordinates) {
    //         setIsPainting(true);
    //         setMousePosition(coordinates);
    //     }
    // }, []);


    // const getCoordinates = (event) => {
    //     if (!canvasRef.current) {
    //         return;
    //     }
    //     const canvas = canvasRef.current;
      
    //     return { x: event.pageX, y: event.pageY };
    // };


    // useEffect(() => {
    //     const canvas = canvasRef.current
    //     const context = canvas.getContext('2d')
    //     if (!canvas) {
    //         return;
    //     }

        // canvas.addEventListener('mousedown', startPaint);
        // return () => {
        //     canvas.removeEventListener('mousedown', startPaint);
        // };

    // }, [startPaint])


    useEffect(()=>{
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
    
        // Set the line style
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 3;
    
        // Draw a line
        ctx.beginPath();
        ctx.moveTo(5, 50);
        ctx.lineTo(100, 80);
        ctx.stroke();
    
        // Draw another line
        // ctx.beginPath();
        // ctx.moveTo(50, 10);
        // ctx.lineTo(10, 50);
        // ctx.stroke();
    },[])

    // const paint = useCallback(
    //     (event) => {
    //         if (isPainting) {
    //             const newMousePosition = getCoordinates(event);
    //             if (mousePosition && newMousePosition) {
    //                 drawLine(mousePosition, newMousePosition);
    //                 setMousePosition(newMousePosition);
    //             }
    //         }
    //     },
    //     [isPainting, mousePosition]
    // );



    // const drawLine = (originalMousePosition, newMousePosition) => {
    //     if (!canvasRef.current) {
    //         return;
    //     }
    //     const canvas = canvasRef.current;
    //     const context = canvas.getContext('2d');
    //     if (context) {
    //         context.strokeStyle = 'red';
    //         context.lineJoin = 'round';
    //         context.lineWidth = 5;

    //         context.beginPath();
    //         context.moveTo(originalMousePosition.x, originalMousePosition.y);
    //         context.lineTo(newMousePosition.x, newMousePosition.y);
    //         context.closePath();

    //         context.stroke();
    //     }
    // };

    // useEffect(() => {
    //     if (!canvasRef.current) {
    //         return;
    //     }
    //     const canvas = canvasRef.current;
    //     canvas.addEventListener('mousemove', paint);
    //     return () => {
    //         canvas.removeEventListener('mousemove', paint);
    //     };
    // }, [paint]);

    // const exitPaint = useCallback(() => {
    //     setIsPainting(false);
    // }, []);

    // useEffect(() => {
    //     if (!canvasRef.current) {
    //         return;
    //     }
    //     const canvas: HTMLCanvasElement = canvasRef.current;
    //     canvas.addEventListener('mouseup', exitPaint);
    //     canvas.addEventListener('mouseleave', exitPaint);
    //     return () => {
    //         canvas.removeEventListener('mouseup', exitPaint);
    //         canvas.removeEventListener('mouseleave', exitPaint);
    //     };
    // }, [exitPaint]);


    return <canvas ref={canvasRef} {...props} />
}

export default Canvas