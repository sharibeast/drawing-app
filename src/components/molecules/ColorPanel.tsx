import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Color from '../atoms/Color'
import { setStrokeColor } from '../../actions'
import { currentStrokeSelector } from '../../selectors'



const COLORS = [
          "#000000",
          "#808080",
          "#C0C0C0",
          "#800000",
          "#1ED760",
          "#1E60D7"
]

export default function ColorPanel() {
          const dispatch = useDispatch()
          const color = useSelector(currentStrokeSelector).color

          const onColorChange = (color: string) => {
                    dispatch(setStrokeColor(color))
          }
          return (
                    <div className='bg-zinc-100 max-w-[250px] mb-8'>
                              <div className='bg-zinc-100  flex p-2 gap-4 rounded-sm '>
                                        <Color h='h-6' w='w-6' color={color} border='border' />
                                        <div className='grid grid-cols-8  gap-1'>
                                                  {
                                                            COLORS.map((color) => (
                                                                      <Color key={color} color={color} onClick={() => onColorChange(color)} />
                                                            ))
                                                  }

                                        </div>
                              </div>
                              <p className='text-sm  text-zinc-400 '>colors</p>
                    </div>
          )
}
