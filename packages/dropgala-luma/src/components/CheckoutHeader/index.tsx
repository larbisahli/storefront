import { StoreProps, selectConfig } from '@dropgala/store'
import ArrowRightFilled from '../../assets/icons/filed-right-arrow'
import SecureLock from '../../assets/icons/secure-lock'
import { mediaURL } from '@dropgala/utils/utils'
import cn from 'clsx'
import Image from '../common/Image'
import Link from '../ui/Link'

interface Props extends StoreProps {}

function CheckoutHeader({ useAppSelector }: Props) {
  const storeConfig = useAppSelector(selectConfig)

  const { device } = storeConfig

  const storeLogo = !!storeConfig?.logo?.length
    ? `${mediaURL}/${storeConfig?.logo[0].image}`
    : '/assets/images/default_logo.webp'

  return (
    <header
      className={cn(
        'flex items-center text-gray-700 body-font w-full h-60px border-b border-gray-300'
      )}
    >
      <div className="flex items-center justify-between w-full px-4">
        <div className="flex items-center">
          <Link href="/">
            <div className="relative">
              <div className="relative">
                <div className="relative flex justify-center overflow-hidden w-[130px] h-[50px]">
                  <Link href="/">
                    <Image
                      isCustomUrl
                      src={storeLogo}
                      objectFit="cover"
                      height={device?.isDesktop ? 45 : 30}
                      width={device?.isDesktop ? 45 : 30}
                      alt="logo"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </Link>
          <div
            style={{ transform: 'rotate(30deg)' }}
            className="w-[1px] h-[30px] bg-gray-400 mx-3"
          ></div>
          <div style={{ color: '#83b293' }} className="flex items-center">
            <div>
              <SecureLock width="23px" height="23px" />
            </div>
            <div className="pl-2 text-xs">SECURE CHECKOUT</div>
          </div>
        </div>
        <Link href="/">
          <div className="flex items-center text-gray-600">
            <div className="pt-[2px] text-xs">CONTINUE SHOPPING</div>
            <div className="pl-2">
              <ArrowRightFilled width="9px" height="9px" />
            </div>
          </div>
        </Link>
      </div>
    </header>
  )
}

export default CheckoutHeader
