import * as yup from 'yup'

export const checkoutValidationSchema = yup.object().shape({
  last_name: yup.string().required('Enter a last name'),
  email: yup.string().email('').required('Enter an email'),
  address1: yup.string().required('Enter an address'),
  country: yup
    .object()
    .typeError('Select a country')
    .required('Select a country'),
  city: yup.string().required('Enter a city')
})
