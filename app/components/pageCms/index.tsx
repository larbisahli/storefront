import { selectConfig } from '@dropgala/store'
import { ComponentNames } from '@dropgala/types/enums.type'
import { PageType } from '@dropgala/types/page.type'
import { useAppSelector } from '@hooks/useStore'
import componentFactory from '@lib/componentFactory'

interface Props {
  page: PageType
}

const PageCms = ({ page }: Props) => {
  const { theme } = useAppSelector(selectConfig)
  return componentFactory(theme, ComponentNames.PAGE_CMS, {
    page
  })
}

export default PageCms
