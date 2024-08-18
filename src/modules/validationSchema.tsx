import * as Yup from 'yup';

export const validationSchema = Yup.object({
  userName: Yup.string().matches(/^[A-Z]/, 'Name must start with uppercase letter').required('Name is required'),
  userAge: Yup.number().typeError('Age must be number').positive('Age must be positive number').required('Age is required'),
  userEmail: Yup.string().email('Invalid email address').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email address').required('Email is required'),
  userPass: Yup.string()
    .required('Password is required')
    .min(8, 'Must be at least 8 characters')
    .matches(/[0-9]/, 'Must contain one number')
    .matches(/[a-z]/, 'Must contain one lowercase letter')
    .matches(/[A-Z]/, 'Must contain one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Must contain one special character'),
  userPassRepeat: Yup.string().oneOf([Yup.ref('userPass'), undefined], 'Passwords must match'),
  gender: Yup.string().oneOf(['male', 'female'], 'Gender is required'),
  userAgreement: Yup.boolean().oneOf([true], 'You must accept the agreement'),
  userFile: Yup.mixed<File[]>()
    .required('A file is required')
    .test('fileSize', 'File size must be < 1024 kb', (value: File[]) => {
      return value && value[0] && value[0].size <= 1024 * 1024;
    })
    .test('fileFormat', 'Format must be jpeg or png', (value: File[]) => {
      return value && value[0] && ['image/jpeg', 'image/png'].includes(value[0].type);
    }),
  userCountry: Yup.string().required('Country is required'),
});