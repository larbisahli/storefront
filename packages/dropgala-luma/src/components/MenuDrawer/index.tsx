import { CategoryType } from '@dropgala/types/category.type'
import React from 'react'

import MenuItem from './MenuItem'
import SearchSection from './SearchSection'
import { StoreProps } from '@dropgala/store'

interface Props extends StoreProps {
  menu: CategoryType[]
}

const MenuDrawerView: React.FC<Props> = ({ useAppDispatch, menu }) => {
  return (
    <div className="h-full overflow-auto">
      <div className="pb-20">
        <SearchSection />
        <div className="mx-3 bg-gray-300 h-[1px] w-full my-4"></div>
        <div className="h-full">
          <div className="h-full">
            {menu?.map((category) => (
              <MenuItem
                key={category.id}
                category={category}
                useAppDispatch={useAppDispatch}
                level={1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuDrawerView
