import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const HeaderCtaContainer = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.HEADER_CTA_CONTAINER, props)

export default HeaderCtaContainer
