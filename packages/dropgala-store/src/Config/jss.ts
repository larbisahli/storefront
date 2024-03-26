export const jssState = {
  galaCore: {
    context: {
      host: {
        host: '127.0.0.1:3000',
        alias: 'mystore'
      },
      tracking: {},
      locales: [],
      settings: {}
    },
    route: {
      templateName: 'HomePage',
      templateId: 'facb0218-06ea-465c-bc70-168e88c0457b',
      layoutId: 'ec8aa46e-4876-4a43-b945-ea51bdaaab07',
      'jss-footer': {
        componentName: 'Footer',
        dataSource:
          '/sitecore/content/YasConnect/FWAD/Site Components/Common/Footer/Final Footer',
        params: {},
        fields: { data: {} }
      },
      'jss-header': {
        componentName: 'Header',
        dataSource:
          '/sitecore/content/YasConnect/FWAD/Site Components/Common/Footer/Final Footer',
        params: {},
        fields: { data: {} }
      },
      'jss-main': [
        {
          componentId: 'e6d2bdb9-2514-4168-8181-20e4f329616d',
          componentName: 'Breadcrumb',
          source: '@dropgala/ui/Breadcrumb/groupA/BreadcrumbA1',
          params: {},
          fields: {
            data: {}
          }
        },
        {
          componentId: 'e6d2b1b9-2514-4168-8181-20e4f329616d',
          componentName: 'HeroComponent',
          dataSource:
            '/sitecore/content/YasConnect/FWAD/Site Components/Common/Footer/Final Footer',
          params: {},
          fields: {
            carousel: {
              dots: true,
              arrows: true,
              autoplay: true,
              rtl: false,
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: false,
              infiniteScroll: false,
              fade: false,
              pauseOnHover: false,
              autoplaySpeed: 5000
            }
          }
        },
        {
          componentName: 'MyCartB2C',
          dataSource:
            '/sitecore/content/YasConnect/FWAD/Site Components/Common/Footer/Final Footer',
          params: {},
          fields: { data: {} }
        }
      ]
    }
  }
}
