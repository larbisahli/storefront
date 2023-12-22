import * as yup from 'yup'

export const checkoutValidationSchema = yup.object().shape({
  firstName: yup.string().required('Enter a first name'),
  lastName: yup.string().required('Enter a last name'),
  email: yup.string().email('').required('Enter an email'),
  address1: yup.string().required('Enter an address'),
  country: yup
    .object()
    .shape({
      name: yup.string().required('Country name needed'),
      iso2: yup.string().required('Country iso2 needed')
    })
    .typeError('Select a country')
    .required('Select a country'),
  city: yup.string().required('Enter a city')
})
