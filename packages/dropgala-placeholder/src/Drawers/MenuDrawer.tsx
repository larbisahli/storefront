import cn from 'clsx'
import React from 'react'

const MenuDrawerPlaceholder = () => {
  return (
    <div className="p-3">
      {[...Array(6)]?.map((_, index) => (
        <div
          key={index}
          className={cn(
            'flex h-[30px] animated-background w-full rounded my-5'
          )}
        />
      ))}
    </div>
  )
}

export default MenuDrawerPlaceholder
