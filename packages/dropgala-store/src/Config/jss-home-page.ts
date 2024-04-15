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
      templateName: 'My template', // hidden
      templateId: 'facb0218-06ea-465c-bc70-168e88c0457b',
      layoutName: 'HomePage',
      layoutId: 'ec8aa46e-4876-4a43-b945-ea51bdaaab07',
      'jss-footer': {
        layoutBlockIdentifier: 'jss-footer',
        componentId: '36d2b1b9-2514-4168-8181-20e4f32961sd',
        componentName: 'Footer',
        moduleName: 'Footer',
        fields: { data: {} }
      },
      'jss-header': {
        layoutBlockIdentifier: 'jss-header',
        componentId: '36d2b1b9-2514-4168-8181-20e4f32961sd',
        componentName: 'Header',
        moduleName: 'Header',
        fields: { data: {} },
        children: [
          {
            layoutBlockIdentifier: 'jss-header',
            componentId: '36d2b1b9-2514-4168-8181-20e4f32961sd',
            componentName: 'PromoBanner',
            moduleName: 'PromoBanner',
            fields: {
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
          }
        ]
      },
      'jss-main': [
        {
          layoutBlockIdentifier: 'jss-main',
          componentId: 'e6d2b1b9-2514-4168-8181-20e4f32961sd',
          componentName: 'CookiePopup',
          moduleName: 'CookiePopup',
          position: 0,
          fields: {
            data: {
              cookieLink: '/cookie-policy',
              cookieText:
                'This site uses cookies to provide and improve your shopping experience. If you want to benefit from this improved service, please opt-in.'
            }
          }
        },
        {
          layoutBlockIdentifier: 'jss-main',
          componentId: 'e6d2b1b9-2514-4168-8181-20e4f32961sd',
          componentName: 'InstallPrompt',
          moduleName: 'InstallPrompt',
          position: 0,
          fields: {
            data: {}
          }
        },
        {
          layoutBlockIdentifier: 'jss-main',
          componentId: 'e6d2bdb9-2514-4168-8181-20e4f32e616d',
          componentName: 'HeroBanner',
          moduleName: 'HeroBanner',
          position: 1,
          fields: {
            data: {
              items: [
                {
                  thumbnail: [
                    {
                      id: 1,
                      image: 'mystore/images/2024/3/slider-xbox.png',
                      placeholder:
                        'mystore/images/2024/3/slider-xbox_placeholder.png',
                      width: 0,
                      height: 0
                    }
                  ],
                  id: 1,
                  destinationUrl: '',
                  title: 'Xbox Series X & S',
                  description: 'Xbox Series X & S',
                  published: false,
                  btnLabel: 'Explore more',
                  styles: {
                    align: '',
                    textColor: '#000',
                    btnBgc: '#dcdbdb',
                    btnTextColor: '#222121'
                  },
                  position: 0
                }
              ],
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
          }
        },
        {
          layoutBlockIdentifier: 'jss-main',
          componentId: 'e6d2b1b9-2514-4168-8181-20e4f32961sd',
          componentName: 'HomepageCategories',
          moduleName: 'HomepageCategories',
          position: 2,
          fields: {
            data: {
              collectionId: 'e6d2b1b9-2514-4168-8181-20e4f32961sd'
            }
          }
        },
        {
          layoutBlockIdentifier: 'jss-main',
          componentId: 'e6d2b1b9-251f-4168-8181-20e4f32961sd',
          componentName: 'ProductListWidget',
          moduleName: 'ProductListWidget',
          position: 3,
          fields: {
            data: {
              name: 'Best Sellers',
              collectionId: 'e6d2b1b9-2514-4168-8181-20e4f32961sd'
            }
          },
          children: [
            {
              layoutBlockIdentifier: 'jss-main',
              componentId: '36d2b1b9-2514-4168-8181-20e4f32961sd',
              parentId: 'e6d2b1b9-251f-4168-8181-20e4f32961sd',
              componentName: 'ProductNotFound',
              moduleName: 'ProductNotFound',
              position: 0,
              fields: {
                data: {}
              }
            },
            {
              layoutBlockIdentifier: 'jss-main',
              componentId: '96d2b1b9-2514-4168-8181-20e4f32961sd',
              componentName: 'ProductCard',
              moduleName: 'ProductCard',
              position: 1,
              fields: {
                data: {}
              }
            },
            {
              layoutBlockIdentifier: 'jss-main',
              componentId: '96d2b1b9-2514-4168-8181-20e4f32961sd',
              componentName: 'Pagination',
              moduleName: 'Pagination',
              position: 1,
              fields: {
                data: {}
              }
            }
          ]
        }
      ]
    }
  }
}
