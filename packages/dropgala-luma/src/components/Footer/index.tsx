import { Fragment, useEffect, useState } from 'react'

import Copyright from './Copyright'
import { footer } from './data'
import Widgets from './widget/Widget'
import { ConfigType } from '@dropgala/types/config.type'

const { widgets, payment } = footer

// Fixing Hydration failed because the initial UI does not match what was rendered on the server.
// store data should not be static

interface Props {
  storeConfig: ConfigType
}

const Footer: React.FC<Props> = ({storeConfig}) => {
  const [storeWidgets, setStoreWidgets] = useState(null)
  const [storePayment, setStorePayment] = useState(null)

  useEffect(() => {
    setStoreWidgets(widgets as any)
    setStorePayment(payment as any)
  })

  return (
    <Fragment>
      <footer className="mt-[50px] lg:mt-14 2xl:mt-16 bg-gray-200 pt-14 border-dashed border-1 border-t border-gray-300">
        {storeWidgets && <Widgets storeConfig={storeConfig} widgets={storeWidgets} />}
        {storePayment && <Copyright payment={storePayment} />}
      </footer>
    </Fragment>
  )
}

export default Footer
