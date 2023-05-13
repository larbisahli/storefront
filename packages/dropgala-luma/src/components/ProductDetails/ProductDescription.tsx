import ReactHtmlParser from 'html-react-parser'

export default function ProductDescription({
  description
}: {
  description: string
}) {
  return (
    <div className="w-full xl:px-2 py-5 lg:py-8 xl:py-10 sm:px-0">
      {ReactHtmlParser(description ?? '')}
    </div>
  )
}
