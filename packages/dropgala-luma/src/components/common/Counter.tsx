import type { CounterSizes } from '@dropgala/types/props.type'
import cn from 'clsx'
import React from 'react'

import Minus from '../../assets/icons/minus-icon'
import Plus from '../../assets/icons/plus-icon'
import Trash from '../../assets/icons/trash'
import IconButton from '../ui/IconButton'

const CounterSize = {
  big: 'h-12',
  normal: 'h-30px'
}

type CounterProps = {
  single?: boolean
  className?: string
  value: number
  size?: CounterSizes
  disabled?: boolean
  onDecrement: () => void
  onIncrement: () => void
}

const Counter: React.FC<CounterProps> = ({
  single = false,
  onDecrement,
  onIncrement,
  value,
  size = 'normal',
  className = 'flex',
  disabled = false
}) => {
  const btnClassName = cn(
    'text-skin-base rounded-full bg-gray-200 transition border border-solid',
    'border-gray-300 shadow-current duration-300 hover:bg-gray-400 focus:outline-none',
    'w-30px h-30px',
    { 'w-60px h-60px': size === 'big' }
  )

  return (
    <div
      className={cn(
        'group flex items-center justify-between',
        'flex-shrink-0 rounded overflow-hidden shadow-floatingUp',
        'h-30px',
        className,
        CounterSize[size],
        { 'h-60px': size === 'big' }
      )}
    >
      <IconButton onClick={onDecrement} className={btnClassName}>
        {single ? <Minus /> : value > 1 ? <Minus /> : <Trash />}
      </IconButton>

      <span
        className={cn(
          'font-semibold text-skin-base text-13px flex items-center justify-center',
          'h-full w-45px px-2 transition-colors duration-250 ease-in-out cursor-default'
        )}
      >
        {value}
      </span>

      <IconButton
        onClick={onIncrement}
        disabled={disabled}
        className={cn(btnClassName, {
          '!bg-gray-100 text-gray-500 border-dashed cursor-not-allowed':
            disabled
        })}
      >
        <Plus />
      </IconButton>
    </div>
  )
}

export default Counter
