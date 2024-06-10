import { StoreProps, selectConfig } from '@dropgala/store'
import useTranslation from '@dropgala/utils/hooks/useTranslation'

const ProductNotFound = ({ useAppSelector, ...props }: StoreProps) => {
  const { language } = useAppSelector(selectConfig)
  const { __ } = useTranslation(language, 'common')
  return (
    <section className="mt-14 mb-0 text-center">
      <div className="hidden desktop:block">DESKTOP 1025px-1300px</div>
      <div className="hidden laptop:block">DESKTOP 769px-1024px</div>
      <div className="hidden tablet:block">TABLET 481px-768px</div>
      <div className="hidden mobile:block">MOBILE 320px-480px</div>
      <h2 className="text-24px font-semibold text-skin-primary">
        {__('We Are Sorry!')}
      </h2>
      <span className="text-18px font-medium text-gray-900">
        {__('There Were No Products Found Matching Your Request.')}
      </span>
    </section>
  )
}

export default ProductNotFound
