import getDirection from '@dropgala/utils/get-direction'
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document'

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return Document.getInitialProps(ctx)
  }
  render() {
    const { locale } = this.props.__NEXT_DATA__
    const dir = getDirection(locale)
    return (
      <Html dir={dir} lang={locale}>
        <Head>
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
