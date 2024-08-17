import './pages.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '../redux/dataSlice';
import { convertToBase64 } from '../helpers/convertToBase64';

export const PageFormHook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    userName: Yup.string().matches(/^[A-Z]/, 'Name must start with an uppercase letter').required('Name is required'),
    userAge: Yup.number().typeError('Age must be number').positive('Age must be positive number').required('Age is required'),
    userEmail: Yup.string().email('Invalid email address').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email address').required('Email is required'),
    userPass: Yup.string()
      .required('Password is required')
      .min(8, 'Must be at least 8 characters')
      .matches(/[0-9]/, 'Must contain one number')
      .matches(/[a-z]/, 'Must contain one lowercase letter')
      .matches(/[A-Z]/, 'Must contain one uppercase letter')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Must contain one special character'),
    userPassRepeat: Yup.string().oneOf([Yup.ref('userPass'), null], 'Passwords must match'),
    gender: Yup.string().oneOf(['male', 'female'], 'Gender is required'),
    userAgreement: Yup.boolean().oneOf([true], 'You must accept the agreement'),
    userFile: Yup.mixed()
    .required('A file is required')
    .test('fileSize', 'File size must be < 1024 kb', value => {
      return value && value[0] && value[0].size <= 1024 * 1024;
    })
    .test('fileFormat', 'Format must be jpeg or png', value => {
      return value && value[0] && ['image/jpeg', 'image/png'].includes(value[0].type);
    }),
    userCountry: Yup.string().required('Country is required'),
  });

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange'
  });

  const onSubmit = async (data) => {
    dispatch(updateUser({
      name: data.userName,
      age: data.userAge,
      email: data.userEmail,
      pass: data.userPass,
      gender: data.gender,
      agreement: data.userAgreement,
      image: await convertToBase64(data.userFile[0]),
      country: data.userCountry,
    }));
    navigate('/');
  };

  return (
    <main className='page'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>React Hook Form</h2>

        <div className='input-box'>
          <label htmlFor="userName">Name:</label> {errors.userName?.message && <span className='error'>{errors.userName?.message}</span>}
        <input id="userName" type="text" placeholder="Enter name" {...register('userName')} />
        </div>

        <div className='input-box'>
          <label htmlFor="userAge">Age:</label> {errors.userAge?.message && <span className='error'>{errors.userAge?.message}</span>}
          <input id="userAge" type="number" placeholder="Enter age" {...register('userAge')} />
        </div>

        <div className='input-box'>
          <label htmlFor="userEmail">Email:</label> {errors.userEmail?.message && <span className='error'>{errors.userEmail?.message}</span>}
          <input id="userEmail" type="email" placeholder="Enter email" {...register('userEmail')} />
        </div>

        <div className='input-box'>
          <label htmlFor="userPass">Password:</label> {errors.userPass?.message && <span className='error'>{errors.userPass?.message}</span>}
          <input id="userPass" type="password" placeholder="Enter password" {...register('userPass')} />
        </div>

        <div className='input-box'>
          <label htmlFor="userPassRepeat">Repeat password:</label> {errors.userPassRepeat?.message && <span className='error'>{errors.userPassRepeat?.message}</span>}
          <input id="userPassRepeat" type="password" placeholder="Enter password" {...register('userPassRepeat')} />
        </div>

        <fieldset>
          <legend>Gender:</legend>
          <div>
            <input id="userMale" type="radio" value="male" {...register('gender')} />
            <label htmlFor="userMale">male</label>
          </div>
          <div>
            <input id="userFemale" type="radio" value="female" {...register('gender')} />
            <label htmlFor="userFemale">female</label>
          </div>
          <div className='error-box'>{errors.gender?.message && <span className='error'>{errors.gender?.message}</span>}</div>
        </fieldset>

        <fieldset>
          <legend>User Agreement:</legend>
          <input id="userAgreement" type="checkbox" {...register('userAgreement')} />
          <label htmlFor="userAgreement">I accept Terms and Conditions agreement.</label>
          <div className='error-box'>{errors.userAgreement?.message && <span className='error'>{errors.userAgreement?.message}</span>}</div>
        </fieldset>

        <div className='input-box'>
          <label htmlFor="userFile">Upload Picture:</label> {errors.userFile?.message && <span className='error'>{errors.userFile?.message}</span>}
          <input className='file' id="userFile" type="file" {...register('userFile')} />
        </div>
        
        <div className='input-box'>
          <label htmlFor="userCountry">Choose Country:</label> {errors.userCountry?.message && <span className='error'>{errors.userCountry?.message}</span>}
          <input id="userCountry" type="text" placeholder="Enter country" {...register('userCountry')} />
        </div>

        <button className='button' type="submit" disabled={!isValid}>Submit</button>
      </form>
    </main>
  );
};
