import cn from 'clsx'
import React from 'react'

const HeroBannerPlaceholder = () => {
  return (
    <section
      className={cn(
        'flex min-h-[400px] md:min-h-[460px] lg:min-h-[500px] xl:min-h-[520px] animated-background w-full'
      )}
    />
  )
}

export default HeroBannerPlaceholder
