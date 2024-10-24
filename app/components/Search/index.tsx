import { ModuleGroup } from '@dropgala/types'
import componentFactory from '@lib/componentFactory'

interface Props {
  moduleName: string
  [key: string]: any
}

const Search = (props: Props) =>
  componentFactory(props?.moduleName, ModuleGroup.SEARCH, props)

export default Search
