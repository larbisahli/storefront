import EmptyCartSVG from '../../assets/icons/empty-svg'

export default function EmptyCart() {
  return (
    <>
      <div className="w-full flex justify-center flex-shrink-0 relative px-30px py-20px mb-30px border-b border-gray-200">
        <h2 className="font-semibold text-21px m-0">No items in Your Basket</h2>
      </div>

      <div className="flex-auto">
        <p className="text-center text-gray-900 px-10 leading-loose">
          {
            "You haven't added anything in your cart yet. Start adding the products you like."
          }
        </p>
        <div className="flex items-center justify-center mt-40px md:mt-95px">
          <EmptyCartSVG />
        </div>
      </div>
    </>
  )
}
