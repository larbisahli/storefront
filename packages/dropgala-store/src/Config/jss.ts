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
        params: {},
        fields: { data: {} }
      },
      'jss-header': {
        componentName: 'Header',
        params: {},
        fields: { data: {} }
      },
      'jss-main': [
        {
          componentId: 'e6d2bdb9-2514-4168-8181-20e4f32e616d',
          componentName: 'HeroBanner',
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
          componentName: 'HomePageCategories',
          position: 1,
          params: {},
          fields: {
            data: {}
          }
        },
        {
          componentId: 'e6d2bdb9-2514-4168-8181-20e4f3v9616d',
          componentName: 'MyCartB2C',
          position: 2,
          css: {},
          props: {},
          children: []
        }
      ]
    }
  }
}
