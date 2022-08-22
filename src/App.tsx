import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { currentStrokeSelector } from './selectors'
import reactLogo from './assets/react.svg'
import './App.css'
import { beginStroke, endStroke, updateStroke } from './actions'
import { clearCanvas, drawStroke } from './canvasUtils'
import { ColorPanel } from './ColorPanel'
import { EditPanel } from './EditPanel'

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const currentStroke = useSelector(currentStrokeSelector)
  const isDrawing = !!currentStroke.points.length

  const getCanvasWithContext = (canvas = canvasRef.current) => {
    return { canvas, context: canvas?.getContext('2d') }
  }


  const dispatch = useDispatch()

  console.log(currentStroke);

  const startDrawing = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent
    dispatch(beginStroke(offsetX, offsetY))
  }

  const endDrawing = () => {
    if (isDrawing) {
      dispatch(endStroke())
    }

  }


  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return
    }
    const { offsetX, offsetY } = nativeEvent
    dispatch(updateStroke(offsetX, offsetY))

  }


  useEffect(() => {
    const { context } = getCanvasWithContext()
    if (!context) {
      return
    }
    requestAnimationFrame(() => drawStroke(context, currentStroke.points, currentStroke.color))
  }, [currentStroke])

  useEffect(() => {
    const { canvas, context } = getCanvasWithContext()
    if (!context || !canvas) {
      return
    }
    requestAnimationFrame(() => {
      clearCanvas(canvas)

      // strokes.slice(0,stokes)
    })
  }, [])
  return (
    <>
      <EditPanel />
      <ColorPanel />
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        onMouseMove={draw}
        ref={canvasRef} />
    </>
  )
}

export default App
