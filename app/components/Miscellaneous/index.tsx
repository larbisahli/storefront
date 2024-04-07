import { ModuleNames, ProductCardLayout } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  layout: ProductCardLayout
  setLayout: React.Dispatch<React.SetStateAction<ProductCardLayout>>
}

const Miscellaneous = (props: any) =>
  componentFactory(null, ModuleNames.MISCELLANEOUS, { ...props })

export default Miscellaneous
