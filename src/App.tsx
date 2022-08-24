import React, { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { currentStrokeSelector } from './selectors'
import { beginStroke, endStroke, updateStroke } from './actions'
import { clearCanvas, drawStroke } from './canvasUtils'
import ColorPanel from './components/molecules/ColorPanel'

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
    <div className='bg-zinc-200 h-screen flex flex-col justify-center items-center'>
      {/* <EditPanel />
      <ColorPanel />
      <h1 className='text-3xl text-red-500'>test</h1> */}
      <ColorPanel />

      <canvas

        height={700}
        width={1024}
        className='mx-auto'
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        onMouseMove={draw}
        ref={canvasRef} />
    </div>
  )
}

export default App
