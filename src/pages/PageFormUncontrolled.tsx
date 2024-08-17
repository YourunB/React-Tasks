import './pages.css';
import * as Yup from 'yup';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { updateUser } from '../redux/dataSlice';
import { convertToBase64 } from '../helpers/convertToBase64';

export const PageFormUncontrolled = () => {
  const dispatch = useDispatch();
  const dataRedux = useSelector((state: RootState) => state.data);

  const inputName = useRef<HTMLInputElement>(null);
  const inputAge = useRef<HTMLInputElement>(null);
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputPass = useRef<HTMLInputElement>(null);
  const inputPassRepeat = useRef<HTMLInputElement>(null);
  const inputMale = useRef<HTMLInputElement>(null);
  const inputFemale = useRef<HTMLInputElement>(null);
  const inputAgreement = useRef<HTMLInputElement>(null);
  const inputFile = useRef<HTMLInputElement>(null);
  const inputCountry = useRef<HTMLInputElement>(null);

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

  const [error, setError] = useState({});

  const validateForm = async (event) => {
    event.preventDefault();
    const formData = {
      userName: inputName.current?.value,
      userAge: inputAge.current?.value,
      userEmail: inputEmail.current?.value,
      userPass: inputPass.current?.value,
      userPassRepeat: inputPassRepeat.current?.value,
      gender: inputMale.current?.checked || inputFemale.current?.checked,
      userAgreement: inputAgreement.current?.checked,
      userFile: inputFile.current?.files[0],
      userCountry: inputCountry.current?.value,
    };
    
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setError({});
      dispatch(updateUser({
        name: inputName.current?.value,
        age: inputAge.current?.value,
        email: inputEmail.current?.value,
        pass: inputPass.current?.value,
        gender: inputMale.current?.checked ? inputMale.current?.value : inputFemale.current?.value,
        agreement: inputAgreement.current?.checked,
        image: await convertToBase64(inputFile.current?.files[0]),
        country: inputCountry.current?.value,
      }))
    } catch (validationErrors) {
      const errors = validationErrors.inner.reduce((acc, error) => {
        return { ...acc, [error.path]: error.message };
      }, {});
      setError(errors);
    }
  };

  return (
    <main className='page'>
      <form onSubmit={(event) => validateForm(event)}>
        <h2>Uncontrolled Form</h2>

        <div className='input-box'>
          <label htmlFor="userName">Name:</label> {error.userName && <span className='error'>{error.userName}</span>}
          <input ref={inputName} id="userName" type="text" placeholder="Enter name" />
        </div>

        <div className='input-box'>
          <label htmlFor="userAge">Age:</label> {error.userAge && <span className='error'>{error.userAge}</span>}
          <input ref={inputAge} id="userAge" type={'number'} placeholder="Enter age"/>
        </div>

        <div className='input-box'>
          <label htmlFor="userEmail">Email:</label> {error.userEmail && <span className='error'>{error.userEmail}</span>}
          <input ref={inputEmail} id="userEmail" type={'email'} placeholder="Enter email"/>
        </div>

        <div className='input-box'>
          <label htmlFor="userPass">Password:</label> {error.userPass && <span className='error'>{error.userPass}</span>}
          <input ref={inputPass} id="userPass" type={'password'} placeholder="Enter password"/>
        </div>

        <div className='input-box'>
          <label htmlFor="userPassRepeat">Repeat password:</label> {error.userPassRepeat && <span className='error'>{error.userPassRepeat}</span>}
          <input ref={inputPassRepeat} id="userPassRepeat" type={'password'} placeholder="Enter password"/>
        </div>

        <fieldset>
          <legend>Gender:</legend>
          <div><input ref={inputMale} id="userMale" type={'radio'} value='male' name='gender' /><label htmlFor="userMale">male</label></div>
          <div><input ref={inputFemale} id="userFemale" type={'radio'} value='female' name='gender'/><label htmlFor="userFemale">female</label></div>
          <div className='error-box'>{error.gender && <span className='error'>{error.gender}</span>}</div>
        </fieldset>

        <fieldset>
          <legend>User Agreement:</legend>
          <input ref={inputAgreement} id="userAgreement" type={'checkbox'}/>
          <label htmlFor="userAgreement">I accept Terms and Conditions agreement.</label>
          <div className='error-box'>{error.userAgreement && <span className='error'>{error.userAgreement}</span>}</div>
        </fieldset>
        
        <div className='input-box'>
          <label htmlFor="userFile">Upload Picture:</label> {error.userFile && <span className='error'>{error.userFile}</span>}
          <input ref={inputFile} id="userFile" type={'file'} />
        </div>

        <div className='input-box'>
          <label htmlFor="userCountry">Choose Country:</label> {error.userCountry && <span className='error'>{error.userCountry}</span>}
          <input ref={inputCountry} id="userCountry" type={'text'} placeholder='Enter country' />
        </div>
      
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};
