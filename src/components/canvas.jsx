import React, { useRef, useEffect, useState, useCallback } from 'react'
import {fabric} from 'fabric';

const FabricCanvas = props => {
    // const canvasRef = useRef();
    useEffect(() => {
        // Create a Fabric.js canvas instance
        const canvas = new fabric.Canvas('mycanvas', {
            width: 400,
            height: 400,
            backgroundColor: 'rgb(100,100,200)',
  selectionColor: 'blue',
  selectionLineWidth: 2
        });

        // Create and add a rectangle to the canvas
        const rect = new fabric.Rect({
            width: 100,
            height: 100,
            fill: 'red',
        });
        canvas.add(rect);
    }, []);


    return (
        <div>
            <canvas id='mycanvas' />
        </div>
    )


}

export default FabricCanvas