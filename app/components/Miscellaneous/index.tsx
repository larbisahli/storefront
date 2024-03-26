import { selectConfig } from '@dropgala/store'
import { ComponentNames, ProductCardLayout } from '@dropgala/types'
import { useAppSelector } from '@hooks/useStore'
import componentFactory from '@lib/componentFactory'

interface Props {
  layout: ProductCardLayout
  setLayout: React.Dispatch<React.SetStateAction<ProductCardLayout>>
}

const Miscellaneous = ({ layout, setLayout }: Props) => {
  const { jssState } = useAppSelector(selectConfig)
  const data = jssState['galaCore']['route']['jss-main']
  return componentFactory(ComponentNames.MISCELLANEOUS, {
    layout,
    setLayout,
    data
  })
}

export default Miscellaneous
