import cn from 'clsx'
import React from 'react'

const HeaderPlaceholder = () => {
  return (
    <header
      className={cn(
        'flex animated-background items-center fixed w-full h-100px z-20 pr-20px md:pr-30px lg:pr-40px'
      )}
    />
  )
}

export default HeaderPlaceholder
