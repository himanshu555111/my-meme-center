import React, { useRef, useEffect, useState, useCallback } from 'react'
import { fabric } from 'fabric';

const FabricCanvas = props => {

    const { pageSize } = props

    const [pageSizeValue, setPageSizeValue] = useState([ {
        shape: 'Square',
        id: 1,
        width: 720,
        height: 720,
        cssWidth: 20,
        cssHeight: 20,
        isSelected: true
      }]);

    useEffect(() => {
        const filterPageSizeVal = pageSize?.filter(res => res?.isSelected === true);
        setPageSizeValue(filterPageSizeVal)
    }, [pageSize])



    useEffect(() => {
        var shadow = new fabric.Shadow({
            color: "#dededea8",
            blur: 0,
            offsetX: 5,
            offsetY: 5,
        });
        const canvas = new fabric.Canvas('mycanvas', {
            backgroundColor: 'white',
            selectionColor: 'blue',
            selectionLineWidth: 2,
            
        });

        var windowWidth = pageSizeValue?.[0]?.width;
        var windowHeight = pageSizeValue?.[0]?.height;

        canvas.setWidth(windowWidth);
        canvas.setHeight(windowHeight);

        canvas.bringForward()

        // canvas.setDimensions({
        //     width:windowWidth,
        //     height:windowHeight
        // })
     

        // const rect = new fabric.Rect({
        //     width: 400,
        //     height: 400,
        //     fill: 'white',
        //     shadow: shadow,
        //     hoverCursor:'mouse',
        //     selectable:false
        // });
        // canvas.centerObject(rect); 
        // canvas.add(rect);
    }, [pageSizeValue]);


    return (
        <>

                <canvas id='mycanvas' />
  
        </>
    )
}

export default FabricCanvas