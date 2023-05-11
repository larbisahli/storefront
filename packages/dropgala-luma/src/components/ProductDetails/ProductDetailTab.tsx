import ReactHtmlParser from 'html-react-parser'

const tabHeading = [
  'Description'
  // 'Review Rating'
]

export default function ProductDetailsTab({
  description
}: {
  description: string
}) {
  return (
    <div className="w-full xl:px-2 py-11 lg:py-14 xl:py-16 sm:px-0">
      {ReactHtmlParser(description ?? '')}
    </div>
  )
}
