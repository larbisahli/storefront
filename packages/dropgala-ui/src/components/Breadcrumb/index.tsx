import ChevronRight from '@dropgala/assets/icons/chevron-right'
import HomeOutline from '@dropgala/assets/icons/home'
import React, { Fragment } from 'react'
import { ROUTES } from '@dropgala/utils/routes'
import Link from '../common/Link'
import { selectBreadcrumbs } from '@dropgala/store/Breadcrumbs'
import { StoreProps } from '@dropgala/store'
import { cloneDeep } from '@dropgala/utils/lodashFunctions'

interface Props extends StoreProps {
  fields: any
}

const Breadcrumb: React.FC<Props> = ({ useAppSelector }) => {
  const state = useAppSelector(selectBreadcrumbs)
  const breadcrumbs = cloneDeep(state.breadcrumbs)
  return (
    <section className="mt-14 py-3 items-center text-xs text-gray-700 mb-4 hidden lg:flex">
      <Link href={ROUTES.HOME}>
        <div className="flex items-center hover:text-rose-500 cursor-pointer">
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
      {state?.name && (
        <>
          <div className="text-skin-base text-opacity-40 text-xs mx-2">
            <ChevronRight width={10} height={10} />
          </div>
          <div className="inline-flex items-center leading-none text-black line-clamp-1">
            {state.name}
          </div>
        </>
      )}
    </section>
  )
}

export default Breadcrumb
