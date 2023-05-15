import ChevronForward from '../../assets/icons/chevron-right'
import HomeOutline from '../../assets/icons/home'
import React from 'react'
import dynamic from 'next/dynamic'
import { ROUTES } from '@dropgala/utils/routes'
import { CategoryType } from '@dropgala/types/category.type'

const Link = dynamic(() => import('../ui/Link'))

const Breadcrumb: React.FC<{ name: string; category: CategoryType }> = ({
  name,
  category
}) => {
  return (
    <div className="flex items-center text-sm text-gray-700 mb-4">
      <Link href={ROUTES.HOME} activeClassName="font-semibold text-heading">
        <div className="inline-flex items-center">
          <div className="mr-1.5 text-skin-base text-15px">
            <HomeOutline />
          </div>
          Home
        </div>
      </Link>

      <div className="text-skin-base text-opacity-40 text-15px mx-2">
        <ChevronForward width="6px" height="10px" />
      </div>

      <Link href={ROUTES.HOME} activeClassName="font-semibold">
        <div className="inline-flex items-center">{category?.name}</div>
      </Link>

      <div className="text-skin-base text-opacity-40 text-15px mx-2">
        <ChevronForward width="6px" height="10px" />
      </div>

      <div className="inline-flex items-center text-black line-clamp-1">
        {name}
      </div>
    </div>
  )
}

export default Breadcrumb
