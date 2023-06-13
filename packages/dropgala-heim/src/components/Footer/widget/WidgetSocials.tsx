import { ConfigType } from '@dropgala/types/config.type'
import { mediaURL } from '@dropgala/utils/utils'
import Image from '../../common/Image'
import Link from '../../ui/Link'

interface Props {
  className?: string
  social?: {
    id: string | number
    icon: {
      value: string
    }
    name: string
    image: string
    width: number
    height: number
  }[]
  storeConfig: ConfigType
}

const WidgetSocials: React.FC<Props> = ({ social, className, storeConfig }) => {
  const storeLogo = !!storeConfig?.logo?.length
    ? `${mediaURL}/${storeConfig?.logo[0].image}`
    : '/assets/images/default_logo.webp'

  return (
    <div className={`pb-10 sm:pb-0 ${className}`}>
      {!!storeConfig?.socials?.length && (
        <ul className="flex flex-wrap justify-center flex-col sm:justify-start space-s-4 md:space-s-5 mx-auto md:mx-0">
          <div className="relative mb-6">
            <div className="relative flex overflow-hidden">
              <Link href="/">
                <div className="relative">
                  <Image
                    isCustomUrl
                    src={storeLogo}
                    // layout="fill"
                    height={50}
                    width={50}
                    alt="logo"
                  />
                </div>
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap justify-center sm:justify-start space-s-4 md:space-s-5 mx-auto md:mx-0">
            {storeConfig?.socials?.map((item, idx) => {
              const icon = social?.find((s) => s.icon.value === item.icon.value)
              return (
                <li
                  className="transition hover:opacity-80 mr-6"
                  key={`social-list--key-${idx}`}
                >
                  <Link href={item.url ? item.url : '/#'}>
                    <div>
                      <Image
                        isCustomUrl
                        placeholder="empty"
                        src={icon?.image ?? '/'}
                        alt={icon?.name ?? ''}
                        height={icon?.height ?? 0}
                        width={icon?.width ?? 0}
                        className="transform scale-85 md:scale-100"
                      />
                    </div>
                  </Link>
                </li>
              )
            })}
          </div>
        </ul>
      )}
    </div>
  )
}

export default WidgetSocials
