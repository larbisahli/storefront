import { ComponentNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

const Header = (props: any) =>
  componentFactory(ComponentNames.HEADER, { ...props })

export default Header
