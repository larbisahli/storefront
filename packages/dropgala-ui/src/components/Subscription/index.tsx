import React from 'react'
import { StoreProps } from '@dropgala/store'

interface Props extends StoreProps {
  data: any
}

const Subscription: React.FC<Props> = ({ useAppSelector }) => {
  return (
    <section className="mt-14 py-3 items-center text-xs text-gray-700 mb-4 hidden lg:flex">
      Subscription
    </section>
  )
}

export default Subscription
