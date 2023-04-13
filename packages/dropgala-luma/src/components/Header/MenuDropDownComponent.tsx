import { CategoryType } from '@dropgala/types/category.type'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'

const Link = dynamic(() => import('../ui/Link'))

interface Props {
  menu: CategoryType[]
  selectedFirstLevelCategory: number | null
}

const MenuDropDownComponent = ({ menu, selectedFirstLevelCategory }: Props) => {
  const secondLevelCategories = useMemo(() => {
    return menu.find((menu) => menu.id === selectedFirstLevelCategory)
      ?.children as CategoryType[]
  }, [selectedFirstLevelCategory, menu])

  if (!selectedFirstLevelCategory || secondLevelCategories?.length === 0) {
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
              {(children as CategoryType[])?.map(({ id, name }) => {
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
