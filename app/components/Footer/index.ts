import { ComponentNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

const Footer = (props: any) =>
  componentFactory(ComponentNames.FOOTER, { ...props })

export default Footer
