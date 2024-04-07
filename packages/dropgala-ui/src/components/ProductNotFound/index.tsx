import { StoreProps, selectConfig } from '@dropgala/store'
import useTranslation from '@dropgala/utils/hooks/useTranslation'

const ProductNotFound = ({ useAppSelector, ...props }: StoreProps) => {
  const { language } = useAppSelector(selectConfig)
  const { __ } = useTranslation(language, 'common')
  return (
    <section className="mt-14 mb-0 text-center">
      <h2 className="text-24px font-semibold">{__('We Are Sorry!')}</h2>
      <span className="text-18px font-medium text-gray-900">
        {__('There Were No Products Found Matching Your Request.')}
      </span>
    </section>
  )
}

export default ProductNotFound
