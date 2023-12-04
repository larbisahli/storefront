import cn from 'clsx'
import React from 'react'

const HeaderPlaceholder = () => {
  return (
    <header
      className={cn(
        'flex animated-background items-center fixed w-full lg:h-[188px] h-[108px] z-20 pr-20px md:pr-30px lg:pr-40px'
      )}
    >
      <div />
    </header>
  )
}

export default HeaderPlaceholder
