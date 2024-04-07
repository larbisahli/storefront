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
        moduleName: 'Footer',
        params: {},
        fields: { data: {} }
      },
      'jss-header': {
        componentName: 'Header',
        moduleName: 'Header',
        params: {},
        fields: { data: {} },
        children: [
          {
            componentId: '36d2b1b9-2514-4168-8181-20e4f32961sd',
            componentName: 'PromoBanner',
            moduleName: 'PromoBanner',
            params: {},
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
          componentId: 'e6d2bdb9-2514-4168-8181-20e4f32e616d',
          componentName: 'HeroBanner',
          moduleName: 'HeroBanner',
          position: 0,
          params: {},
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
          componentId: 'e6d2b1b9-2514-4168-8181-20e4f32961sd',
          componentName: 'HomepageCategories',
          moduleName: 'HomepageCategories',
          position: 1,
          params: {},
          fields: {
            data: {
              collectionId: 'e6d2b1b9-2514-4168-8181-20e4f32961sd'
            }
          }
        },
        {
          componentId: 'e6d2b1b9-251f-4168-8181-20e4f32961sd',
          componentName: 'ProductListWidget',
          moduleName: 'ProductListWidget',
          position: 2,
          params: {},
          fields: {
            data: {
              collectionId: 'e6d2b1b9-2514-4168-8181-20e4f32961sd'
            }
          },
          children: [
            {
              componentId: '36d2b1b9-2514-4168-8181-20e4f32961sd',
              componentName: 'ProductNotFound',
              moduleName: 'ProductNotFound',
              position: 0,
              params: {},
              fields: {
                data: {}
              }
            },
            {
              componentId: '96d2b1b9-2514-4168-8181-20e4f32961sd',
              componentName: 'ProductCard',
              moduleName: 'ProductCard',
              position: 1,
              params: {},
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
