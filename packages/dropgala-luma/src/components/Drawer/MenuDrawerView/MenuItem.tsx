import { CategoryRefLevel2, CategoryRefLevel3,CategoryType } from '@dropgala/types/category.type'
import cn from 'clsx'
import Link from 'next/link'
import React, { useState } from 'react'

import PlusIcon from '../../../assets/icons/plus-icon'

type MenuType = CategoryType | CategoryRefLevel2 | CategoryRefLevel3

interface Props {
  category: MenuType
  level?: number
}

const MenuItem: React.FC<Props> = ({ category, level = 2 }) => {
  const [openSubMenuId, setOpenSubMenuId] = useState<number | null>(null)

  const { id, name, children = [] } = category

  const hasChildren = (children?.length ?? []) > 0

  const handleOpenSubMenu = () => {
    if (openSubMenuId) {
      setOpenSubMenuId(null)
      return
    }
    setOpenSubMenuId(id)
  }

  const handleKeyEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleOpenSubMenu()
    }
  }

  return (
    <div className="overflow-auto">
      {hasChildren ? (
        <div
          className="my-1 flex items-center justify-between"
          role={'button'}
          tabIndex={0}
          onClick={handleOpenSubMenu}
          onKeyDown={handleKeyEnter}
        >
          <div
            className={cn('px-3 py-2 text-base', {
              'text-sm text-gray-800': level === 3,
              'px-2 py-0': level === 3
            })}
          >
            {name}
          </div>
          <div className="p-3">
            <PlusIcon />
          </div>
        </div>
      ) : (
        <Link href={'/'} className="my-1 flex items-center justify-between">
          <div
            className={cn('px-3 py-2 text-base', {
              'text-base text-gray-800': level === 3,
              'px-2 py-1': level === 3
            })}
          >
            {name}
          </div>
        </Link>
      )}
      <div className="bg-gray-200 pl-4">
        {hasChildren && openSubMenuId === id && (
          <Link href={'/'}>
            <div
              className={cn('px-3 py-2 text-base', {
                'text-base text-gray-800': level === 2,
                'px-2 py-1': level === 2
              })}
            >{`All ${name}`}</div>
          </Link>
        )}
        {hasChildren &&
          openSubMenuId === id &&
          children && children?.map((subcategory: MenuType) => (
            <MenuItem
              key={subcategory.id}
              category={subcategory}
              level={level + 1}
            />
          ))}
      </div>
    </div>
  )
}

export default MenuItem
