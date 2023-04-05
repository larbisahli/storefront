import { useState } from 'react'
import PlusIcon from '../../../assets/icons/plus-icon'
import cn from 'clsx'
import Link from 'next/link'

interface Props {
  category: {
    id: number
    name: string
    children?: {
      id: number
      name: string
      children?: { id: number; name: string }[]
    }[]
  }
  level?: number
}

const MenuItem = ({ category, level = 2 }: Props) => {
  const [openSubMenuId, setOpenSubMenuId] = useState<number | null>(null)

  const { id, name, children = [] } = category

  const hasChildren = children?.length > 0

  const handleOpenSubMenu = () => {
    if (openSubMenuId) {
      setOpenSubMenuId(null)
      return
    }
    setOpenSubMenuId(id)
  }

  return (
    <div className="overflow-auto">
      {hasChildren ? (
        <div
          className="my-1 flex items-center justify-between"
          onClick={handleOpenSubMenu}
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
              'text-gray-800': level === 3,
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
                'text-gray-800': level === 2,
                'px-2 py-1': level === 2
              })}
            >{`All ${name}`}</div>
          </Link>
        )}
        {hasChildren &&
          openSubMenuId === id &&
          children?.map((subcategory) => (
            <MenuItem category={subcategory} level={level + 1} />
          ))}
      </div>
    </div>
  )
}

export default MenuItem
