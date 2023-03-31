import getDirection from '@dropgala/utils/get-direction'
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import { i18n } from 'next-i18next'

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return Document.getInitialProps(ctx)
  }
  render() {
    const { locale } = this.props.__NEXT_DATA__
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    if (process.env.NODE_ENV !== 'production') {
      i18n?.reloadResources(locale)
    }
    return (
      <Html dir={getDirection(locale)}>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
