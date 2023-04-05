import { useMemo } from 'react'

import Link from '../ui/Link'
import { MENU } from '../../data/menu'

interface Props {
  selectedFirstLevelCategory: number | null
}

const MenuDropDownComponent = ({ selectedFirstLevelCategory }: Props) => {
  const secondLevelCategories = useMemo(() => {
    return MENU.find((menu) => menu.id === selectedFirstLevelCategory)?.children
  }, [selectedFirstLevelCategory])

  if (!selectedFirstLevelCategory) {
    return null
  }

  return (
    <div id="menu-drop" className="pt-3 pb-8">
      <div className="grid grid-cols-5 gap-3">
        {secondLevelCategories?.map(({ id, name, children = [] }) => {
          return (
            <div key={id} className="text-black text-sm flex flex-col">
              <Link
                href="/"
                className="font-medium pb-1 hover:text-red-500 w-fit"
              >
                {name}
              </Link>
              {children?.map(({ id, name }) => {
                return (
                  <Link
                    href="/"
                    key={id}
                    className="pb-1 hover:text-red-500 w-fit"
                  >
                    {name}
                  </Link>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MenuDropDownComponent
