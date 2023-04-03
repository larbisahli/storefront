import { Fragment } from 'react'

import Copyright from './Copyright'
import { footer } from './data'
import Widgets from './widget/Widget'

const { widgets, payment } = footer

const Footer: React.FC = () => (
  <Fragment>
    <div className="border-dashed border-1 border border-gray-200 mx-8"></div>
    <footer className="mt-[50px] lg:mt-14 2xl:mt-16 bg-white">
      <Widgets widgets={widgets} />
      <Copyright payment={payment} />
    </footer>
  </Fragment>
)

export default Footer
