interface Props {
  email: string
  phone: string
}

const InfoSection = ({ email, phone }: Props) => {
  return (
    <div className="hidden lg:flex items-center justify-between pt-2 pb-1  xl:px-0 px-20px">
      <div className="flex items-center text-xs text-gray-900">
        <div className="pr-5 flex items-center">
          <div className="pr-3">Telephone:</div>
          <span>{phone}</span>
        </div>
        <div className="flex items-center">
          <div className="pr-3">Mail:</div>
          <span>{email}</span>
        </div>
      </div>
      <div className="text-sm text-gray-900">USD</div>
    </div>
  )
}

export default InfoSection
