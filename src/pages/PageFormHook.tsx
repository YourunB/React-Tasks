import './pages.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export const PageFormHook = () => {
  const validationSchema = Yup.object({
    userName: Yup.string().matches(/^[A-Z]/, 'Name must start with an uppercase letter').required('Name is required'),
    userAge: Yup.number().typeError('Age must be number').positive('Age must be positive number').required('Age is required'),
    userEmail: Yup.string().email('Invalid email address').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email address').required('Email is required'),
    userPass: Yup.string()
      .required('Password is required')
      .min(8, 'must be at least 8 characters')
      .matches(/[0-9]/, 'Must contain one number')
      .matches(/[a-z]/, 'Must contain one lowercase letter')
      .matches(/[A-Z]/, 'Must contain one uppercase letter')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Must contain one special character'),
    userPassRepeat: Yup.string().oneOf([Yup.ref('userPass'), null], 'Passwords must match'),
    gender: Yup.boolean().oneOf([true], 'Gender is required'),
    userAgreement: Yup.boolean().oneOf([true], 'You must accept the agreement'),
    userFile: Yup.mixed()
        .required('A file is required')
        .test(
          'fileSize',
          'File size must be < 1024 kb',
          value => value && value.size <= 1024 * 1024
        )
        .test(
          'fileFormat',
          'Format must be jpeg or png',
          value => value && ['image/jpeg', 'image/png'].includes(value.type)
        ),
        userCountry: Yup.string().required('Country is required'),
  });
  
  const { register, handleSubmit, formState: { errors }, trigger } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  return (
    <main className='page'>
      <form>
        <h2>React Hook Form</h2>

        <div className='input-box'>
          <label htmlFor="userName">Name:</label> {errors.userName?.message && <span className='error'>{errors.userName?.message}</span>}
          <input id="userName" type="text" placeholder="Enter name" {...register('userName')} onInput={() => trigger('userName')} />
        </div>
        <button className='button' type="submit">Submit</button>
      </form>
    </main>
  );
};
