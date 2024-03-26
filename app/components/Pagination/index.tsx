import { selectConfig } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types'
import { useAppSelector } from '@hooks/useStore'
import componentFactory from '@lib/componentFactory'

const Pagination = () => {
  const { jssState } = useAppSelector(selectConfig)
  const data = jssState['galaCore']['route']['jss-main']
  return componentFactory(ComponentNames.PAGINATION, { data })
}

export default Pagination
