import cn from 'clsx'
import React from 'react'

const FooterPlaceholder = () => {
  return (
    <footer
      className={cn(
        'flex h-[300px] animated-background fixed w-full z-20 pr-20px md:pr-30px lg:pr-40px'
      )}
    />
  )
}

export default FooterPlaceholder
