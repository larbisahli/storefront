export const footer = {
  widgets: [
    {
      id: 1,
      widgetTitle: 'widget-title-about',
      lists: [
        {
          id: 1,
          title: 'link-about-us',
          path: '/about-us'
        },
        {
          id: 2,
          title: 'link-contact-us',
          path: '/contact-us'
        },
        {
          id: 3,
          title: 'link-faq',
          path: '/faq'
        },
        {
          id: 4,
          title: 'link-customer-support',
          path: '/contact-us'
        }
      ]
    },
    {
      id: 2,
      widgetTitle: 'widget-title-our-information',
      lists: [
        {
          id: 1,
          title: 'link-privacy',
          path: '/privacy'
        },
        {
          id: 2,
          title: 'link-terms',
          path: '/terms'
        },
        {
          id: 3,
          title: 'link-return-policy',
          path: '/privacy'
        },
        {
          id: 4,
          title: 'link-site-map',
          path: '/'
        }
      ]
    }
  ],
  payment: [
    {
      id: 1,
      path: '/',
      image: '/assets/images/payment/mastercard.svg',
      name: 'payment-master-card',
      width: 34,
      height: 20
    },
    {
      id: 2,
      path: '/',
      image: '/assets/images/payment/visa.svg',
      name: 'payment-visa',
      width: 50,
      height: 20
    },
    {
      id: 3,
      path: '/',
      image: '/assets/images/payment/stripe.svg',
      name: 'payment-stripe',
      width: 60,
      height: 40
    },
    {
      id: 4,
      path: '/',
      image: '/assets/images/payment/jcb.svg',
      name: 'payment-jcb',
      width: 26,
      height: 20
    }
  ],
  social: [
    {
      id: 1,
      image: '/assets/images/social/facebook.svg',
      name: 'facebook',
      icon: {value: 'FacebookIcon'},
      width: 20,
      height: 20
    },
    {
      id: 2,
      image: '/assets/images/social/twitter.svg',
      icon: {value: 'TwitterIcon'},
      name: 'twitter',
      width: 20,
      height: 20
    },
    {
      id: 3,
      image: '/assets/images/social/instagram.svg',
      name: 'instagram',
      icon: {value: 'InstagramIcon'},
      width: 20,
      height: 20
    },
    {
      id: 4,
      image: '/assets/images/social/youtube.svg',
      name: 'youtube',
      icon: {value: 'YoutubeIcon'},
      width: 20,
      height: 20
    }
  ]
}
