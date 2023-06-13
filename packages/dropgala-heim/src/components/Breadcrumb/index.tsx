import ChevronForward from '../../assets/icons/chevron-right'
import HomeOutline from '../../assets/icons/home'
import React, { Fragment } from 'react'
import { ROUTES } from '@dropgala/utils/routes'
import { CategoryType } from '@dropgala/types/category.type'
import Link from '../ui/Link'

interface Props {
  name?: string
  breadcrumbs: CategoryType['categorySeo']['breadcrumbs']
}

const Breadcrumb: React.FC<Props> = ({ name, breadcrumbs }) => {
  return (
    <div className="items-center text-sm text-gray-700 mb-4 hidden lg:flex">
      <Link href={ROUTES.HOME}>
        <div className="flex items-center hover:text-rose-500">
          <div className="mr-1.5 text-skin-base text-15px">
            <HomeOutline />
          </div>
          Home
        </div>
      </Link>
      {breadcrumbs
        ?.sort((a, b) => a.categoryLevel - b.categoryLevel)
        ?.map((breadcrumb) => {
          return (
            <Fragment key={breadcrumb.categoryLevel}>
              <div className="text-skin-base text-opacity-40 mx-3">
                <ChevronForward width="6px" height="10px" />
              </div>
              <Link
                href={{
                  pathname: '/category/[slug]',
                  query: { slug: breadcrumb.categoryUrl }
                }}
              >
                <div className="flex items-center hover:text-rose-500">
                  {breadcrumb?.categoryName}
                </div>
              </Link>
            </Fragment>
          )
        })}
      {name && (
        <>
          <div className="text-skin-base text-opacity-40 text-15px mx-2">
            <ChevronForward width="6px" height="10px" />
          </div>
          <div className="inline-flex items-center text-black line-clamp-1">
            {name}
          </div>
        </>
      )}
    </div>
  )
}

export default Breadcrumb
