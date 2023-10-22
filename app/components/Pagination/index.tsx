import { selectConfig } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types'
import { useAppSelector } from '@hooks/useStore'
import componentFactory from '@lib/componentFactory'

const Pagination = () => {
  const { theme } = useAppSelector(selectConfig)
  return componentFactory(theme, ComponentNames.PAGINATION, {})
}

export default Pagination
