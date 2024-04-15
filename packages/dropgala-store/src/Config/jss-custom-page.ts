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
      templateName: 'My template',
      layoutName: 'return-policy',
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
          componentId: 'e6d2b1b9-2514-4168-8181-20e4f32961sd',
          componentName: 'Breadcrumb',
          moduleName: 'Breadcrumb',
          position: 0,
          params: {},
          fields: {
            data: {
              collectionId: 'e6d2b1b9-2514-4168-8181-20e4f32961sd',
              name: 'Return Policy'
            }
          }
        },
        {
          componentId: 'e6d2bdb9-2514-4168-8181-20e4f32e616d',
          componentName: 'PageCms',
          moduleName: 'PageCms',
          position: 1,
          params: {},
          fields: {
            data: {
              id: 'f7be61db-f67e-4a9e-99b2-c05d5ed4efc5',
              ogMedia: [],
              slug: 'return-policy',
              name: 'Return Policy',
              content:
                '<p style="text-align:left;"><span style="color: rgb(65,65,65);background-color: rgb(255,255,255);font-size: 14px;font-family: sans-serif;"><strong>Return and exchange policy</strong></span></p><p style="text-align:left;"></p><p style="text-align:left;"><span style="color: rgb(65,65,65);background-color: rgb(255,255,255);font-size: 14px;font-family: sans-serif;">- The return or exchange of a product is a right for all our customers, and it includes all the products we offer on our shop.</span></p><p style="text-align:left;"><span style="color: rgb(65,65,65);background-color: rgb(255,255,255);font-size: 14px;font-family: sans-serif;">- All the products offered on our shop are subject to the exchange and refund policy according to the terms and conditions stipulated on this page.</span></p><p style="text-align:left;"><span style="color: rgb(65,65,65);background-color: rgb(255,255,255);font-size: 14px;font-family: sans-serif;">- Returns or exchanges can be made if the product is in its original condition when purchased and packed in its original packaging.</span></p><p style="text-align:left;"><span style="color: rgb(65,65,65);background-color: rgb(255,255,255);font-size: 14px;font-family: sans-serif;">- Return within three (3) days and replacement within seven (7) days from the date of purchase.</span></p><p style="text-align:left;"><span style="color: rgb(65,65,65);background-color: rgb(255,255,255);font-size: 14px;font-family: sans-serif;">- Please contact us via the Contact Us page or via our phone numbers to request a return or exchange.</span></p><p style="text-align:left;"><span style="color: rgb(65,65,65);background-color: rgb(255,255,255);font-size: 14px;font-family: sans-serif;">- Please take a picture and send the product with the city, address and order number specified so that it can be replaced by another product in case the product is corrupt or has a certain defect, or it is not used in accordance with the agreement.</span></p><p style="text-align:left;"><span style="color: rgb(65,65,65);background-color: rgb(255,255,255);font-size: 14px;font-family: sans-serif;">- The amount is returned to the customer in full if the product he received is completely different from the product presented on our website.</span></p><p style="text-align:left;"><span style="color: rgb(65,65,65);background-color: rgb(255,255,255);font-size: 14px;font-family: sans-serif;">- We are not responsible for expectations of customer use of the products, which we did not mention on the product page on our website.</span></p><p style="text-align:left;"><span style="color: rgb(65,65,65);background-color: rgb(255,255,255);font-size: 14px;font-family: sans-serif;">- Deduct 30% or a value of at least 25 dirhams if the customer does not want the product and the latter has no defect or problem mentioned.</span></p>',
              metaTitle: 'Return Policy',
              metaDescription: ''
            }
          }
        }
      ]
    }
  }
}
