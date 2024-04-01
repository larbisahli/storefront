import { ComponentNames } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

const PromoSlider = (props: any) =>
  componentFactory(ComponentNames.BREADCRUMB, { ...props })

export default PromoSlider
