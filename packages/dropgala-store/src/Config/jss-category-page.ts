export const layout = {
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
      templateName: 'My template', // hidden
      templateId: 'facb0218-06ea-465c-bc70-168e88c0457b',
      layoutName: 'category',
      layoutId: 'ec8aa46e-4876-4a43-b945-ea51bdaaab07',
      'jss-footer': {
        componentId: '36d2b1b9-2514-4168-8181-20e4f32961sd',
        componentName: 'Footer',
        moduleName: 'Footer',
        data: {}
      },
      'jss-header': {
        componentId: '36d2b1b9-2514-4168-8181-20e4f32961sd',
        componentName: 'Header',
        moduleName: 'Header',
        data: {},
        children: [
          {
            componentId: '36d2b1b9-2514-4168-8181-20e4f32961sd',
            componentName: 'PromoBanner',
            moduleName: 'PromoBanner',
            data: {
              delaySpeed: '5000',
              backgroundColor: '#ea580c',
              direction: 'LTR',
              items: [
                {
                  position: 0,
                  content: '<h3>Demo store managed by dropgala</h3>'
                },
                {
                  position: 1,
                  content:
                    '<p><strong>Special offer: </strong><span style="font-size: 14px;font-family: sans-serif;">free delivery, pay on delivery, faster and order now </span><span style="color: rgb(31,41,55);font-size: 14px;font-family: Inter, Mulish, sans-serif, "Open Sans", system-ui;">🔥🔥🔥</span></p>'
                }
              ]
            }
          }
        ]
      },
      'jss-main': [
        {
          componentId: 'e6d2b1b9-2514-4168-8181-20e4f32961sd',
          componentName: 'CookiePopup',
          moduleName: 'CookiePopup',
          position: 0,
          data: {
            cookieLink: '/cookie-policy',
            cookieText:
              'This site uses cookies to provide and improve your shopping experience. If you want to benefit from this improved service, please opt-in.'
          }
        },
        {
          componentId: 'e6d2b1b9-2514-4168-8181-20e4f32961sd',
          componentName: 'InstallPrompt',
          moduleName: 'InstallPrompt',
          position: 0,
          data: {}
        },
        {
          componentId: 'e6d2b1b9-2514-4168-8181-20e4f32961sd',
          componentName: 'Breadcrumb',
          moduleName: 'Breadcrumb',
          position: 0,
          data: {}
        },
        {
          componentId: 'e6d2b1b9-2514-4168-8181-20e4f32961sd',
          componentName: 'CategoryDetails',
          moduleName: 'CategoryDetails',
          position: 1,
          data: {}
        },
        {
          componentId: 'e6d2b1b9-2514-4168-8181-20e4f32961sd',
          componentName: 'CategoryList',
          moduleName: 'CategoryList',
          position: 2,
          data: {}
        },
        {
          componentId: 'e6d2b1b9-251f-4168-8181-20e4f32961sd',
          componentName: 'ProductList',
          moduleName: 'ProductList',
          position: 3,
          data: {
            collectionId: 'categoryProducts'
          },
          children: [
            {
              componentId: '36d2b1b9-2514-4168-8181-20e4f32961sd',
              parentId: 'e6d2b1b9-251f-4168-8181-20e4f32961sd',
              componentName: 'ProductNotFound',
              moduleName: 'ProductNotFound',
              position: 0,
              data: {}
            },
            {
              componentId: '96d2b1b9-2514-4168-8181-20e4f32961sd',
              componentName: 'ProductCard',
              moduleName: 'ProductCard',
              position: 1,
              data: {}
            },
            {
              componentId: '96d2b1b9-2514-4168-8181-20e4f32961sd',
              componentName: 'Pagination',
              moduleName: 'Pagination',
              position: 2,
              data: {}
            }
          ]
        }
      ]
    }
  }
}
