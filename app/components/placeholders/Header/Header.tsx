import React, { Fragment, memo } from 'react'
import cn from 'clsx'

const HeaderPlaceholder = () => {
  return (
    <header
      className={cn(
        'flex animated-background items-center fixed w-full h-80px z-20 pr-20px md:pr-30px lg:pr-40px'
      )}
    />
  )
}

export default HeaderPlaceholder
