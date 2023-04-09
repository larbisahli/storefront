import React from 'react'
import cn from 'clsx'

type ScrollbarProps = {
  className?: string
  children: React.ReactNode
}

const Scrollbar: React.FC<ScrollbarProps> = ({ children, className }) => {
  return <div className={cn('overflow-auto', className)}>{children}</div>
}

export default Scrollbar
