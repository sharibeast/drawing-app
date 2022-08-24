
type Border = 'border'

interface ColorProps {
          border?: Border,
          h?: string,
          w?: string,
          color?: string,
          onClick?: () => void

}

export default function Color({ border, h = 'h-4', w = 'w-4', color = "#0D1117", onClick }: ColorProps) {
          return (
                    <div
                              style={{ backgroundColor: color }}
                              className={`${h} ${w}
                                rounded-full`}
                              onClick={onClick}
                    >

                    </div>
          )
}
