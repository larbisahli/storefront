import ChevronForward from '../../assets/icons/chevron-right'
import cn from 'clsx'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

const steps = [
  {
    name: 'Shopping Bag',
    activePath: '/cart'
  },
  {
    name: 'Information',
    activePath: 'contact_information'
  },
  {
    name: 'Shipping',
    activePath: 'shipping_method'
  },
  {
    name: 'Payment',
    activePath: 'payment_method'
  },
  {
    name: 'Order Complete',
    active: 'order_complete'
  }
]

const CheckoutBreadcrumb = () => {
  const router = useRouter()
  const { pathname, query } = router
  const { step } = query

  return (
    <div className="bg-white py-5 flex items-center md:text-base text-xs flex-wrap justify-center">
      {steps?.map((value, index) => {
        return (
          <Fragment key={value.name}>
            <div
              className={cn('text-gray-600 mb-1', {
                '!text-black !font-medium':
                  value.activePath === (step ?? pathname)
              })}
            >
              {value.name}
            </div>
            {index + 1 !== steps.length && (
              <div className="text-skin-base text-opacity-40 text-15px px-[9px] mb-1">
                <ChevronForward width="10px" height="11px" />
              </div>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}

export default CheckoutBreadcrumb
