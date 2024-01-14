import { ConfigType } from '@dropgala/types/config.type'
import Heading from '../../ui/Heading'
import Link from '../../ui/Link'
import useTranslation from '@dropgala/utils/hooks/useTranslation'

interface Props {
  className?: string
  data: {
    widgetTitle?: string
    lists: {
      id: string
      path?: string
      title: string
      icon?: any
    }[]
  }
  storeConfig: ConfigType
}

const WidgetLink: React.FC<Props> = ({ className, data, storeConfig }) => {
  const { widgetTitle, lists } = data
  const { __ } = useTranslation(storeConfig?.language, 'common')
  return (
    <div className={`${className}`}>
      <Heading variant="mediumHeading" className="mb-4 sm:mb-5 lg:mb-6 pb-0.5">
        {__(`${widgetTitle}`)}
      </Heading>
      <ul className="text-sm lg:text-15px flex flex-col space-y-3">
        {lists.map((list) => (
          <li
            key={`widget-list--key${list.id}`}
            className="flex items-baseline"
          >
            {list.icon && (
              <span className="me-3 relative top-0.5 lg:top-1 text-sm lg:text-base">
                {list.icon}
              </span>
            )}

            <Link
              href={list.path ? list.path : '#!'}
              className="transition-colors duration-200 hover:text-skin-base"
            >
              {__(`${list.title}`)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default WidgetLink
