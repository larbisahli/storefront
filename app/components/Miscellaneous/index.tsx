import { selectConfig } from '@dropgala/store'
import { ComponentNames, ProductCardLayout } from '@dropgala/types'
import { useAppSelector } from '@hooks/useStore'
import renderRemoteComponent from '@lib/packages'

interface Props {
  layout: ProductCardLayout
  setLayout: React.Dispatch<React.SetStateAction<ProductCardLayout>>
}

const Miscellaneous = ({ layout, setLayout }: Props) => {
  const { theme } = useAppSelector(selectConfig)

  return renderRemoteComponent(theme, ComponentNames.MISCELLANEOUS, {
    layout,
    setLayout
  })
}

export default Miscellaneous
