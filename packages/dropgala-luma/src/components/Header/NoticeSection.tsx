interface Props {
  text: string
}

const NoticeSection = ({ text }: Props) => {
  return (
    <div className="bg-orange-600 py-3 w-full text-white text-center font-medium">
      <span>{text}</span>
    </div>
  )
}

export default NoticeSection
