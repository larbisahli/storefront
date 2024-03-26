import ChevronRight from '@dropgala/assets/icons/chevron-right'
import HomeOutline from '@dropgala/assets/icons/home'
import React, { Fragment } from 'react'
import { ROUTES } from '@dropgala/utils/routes'
import {
  CategoryType,
  GalaCoreComponentType
} from '@dropgala/types/category.type'
import Link from '../ui/Link'

interface Props {
  name?: string
  breadcrumbs: CategoryType['breadcrumbs']
  data: GalaCoreComponentType
}

const Breadcrumb: React.FC<Props> = ({ name, breadcrumbs, data }) => {
  console.log('Breadcrumb :>>', data)
  return (
    <div className="mt-14 items-center text-xs text-gray-700 mb-4 hidden lg:flex">
      <Link href={ROUTES.HOME}>
        <div className="flex items-center hover:text-rose-500">
          <div className="mr-1.5 text-skin-base text-xs">
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
                <ChevronRight width={10} height={10} />
              </div>
              <Link
                href={{
                  pathname: '/category/[slug]',
                  query: { slug: breadcrumb.categoryUrl }
                }}
              >
                <div className="flex items-center leading-none text-xs hover:text-rose-500">
                  {breadcrumb?.categoryName}
                </div>
              </Link>
            </Fragment>
          )
        })}
      {name && (
        <>
          <div className="text-skin-base text-opacity-40 text-xs mx-2">
            <ChevronRight width={10} height={10} />
          </div>
          <div className="inline-flex items-center leading-none text-black line-clamp-1">
            {name}
          </div>
        </>
      )}
    </div>
  )
}

export default Breadcrumb
