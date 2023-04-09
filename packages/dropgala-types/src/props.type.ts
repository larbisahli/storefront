export type SvgProps = {
  width?: number
  height?: number
  fill?: string
  title?: string
  className?: string
}

export const tuple = <T extends string[]>(...args: T) => args

const buttonVariants = tuple('primary', 'secondary', 'elevation', 'border')
const buttonSizes = tuple('big', 'normal', 'small')
const CounterSizesF = tuple('big', 'normal')

export type ButtonVariants = (typeof buttonVariants)[number]
export type ButtonSizes = (typeof buttonSizes)[number]
export type CounterSizes = (typeof CounterSizesF)[number]
