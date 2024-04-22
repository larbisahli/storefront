import { ModuleNames } from '@dropgala/types/enums.type'
import componentFactory from '@lib/componentFactory'

interface Props {
  componentName: string
  [key: string]: any
}

const CheckoutInformation = (props: Props) =>
  componentFactory(
    props?.componentName,
    ModuleNames.CHECKOUT_INFORMATION,
    props
  )

export default CheckoutInformation
