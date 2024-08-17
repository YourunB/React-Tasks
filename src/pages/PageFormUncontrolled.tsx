
import * as Yup from 'yup';
import { useRef, useState } from 'react';

export const PageFormUncontrolled = () => {
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

  const [error, setError] = useState({});

  const validationSchema = Yup.object({
    userName: Yup.string().matches(/^[A-Z]/, 'Name must start with an uppercase letter').required('Name is required'),
    userAge: Yup.number().typeError('Age must be number').positive('Age must be positive number').required('Age is required'),
    userEmail: Yup.string().email('Invalid email address').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email address').required('Email is required'),
    userPass: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
    userPassRepeat: Yup.string().oneOf([Yup.ref('userPass'), null], 'Passwords must match'),
    userMale: Yup.boolean().oneOf([true], 'Gender is required'),
    userFemale: Yup.boolean().oneOf([true], 'Gender is required'),
    userAgreement: Yup.boolean().oneOf([true], 'You must accept the agreement'),
  });

  const validateForm = async (event) => {
    event.preventDefault();
    const formData = {
      userName: inputName.current?.value,
      userAge: inputAge.current?.value,
      userEmail: inputEmail.current?.value,
      userPass: inputPass.current?.value,
      userPassRepeat: inputPassRepeat.current?.value,
      userMale: inputMale.current?.checked,
      userFemale: inputFemale.current?.checked,
      userAgreement: inputAgreement.current?.checked,
    };

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setError({});
    } catch (validationErrors) {
      const errors = validationErrors.inner.reduce((acc, error) => {
        return { ...acc, [error.path]: error.message };
      }, {});
      setError(errors);
    }
  };

  return (
    <main>
      <form onSubmit={(event) => validateForm(event)}>
        <h2>Uncontrolled Form</h2>

        <div>
          <label htmlFor="userName">Name:</label>
          <input ref={inputName} id="userName" type="text" placeholder="Enter name" />
          {error.userName && <p>{error.userName}</p>}
        </div>
        <div>
          <label htmlFor="userAge">Age:</label>
          <input ref={inputAge} id="userAge" type={'number'} placeholder="Enter age"/>
          {error.userAge && <p>{error.userAge}</p>}
        </div>
        <div>
          <label htmlFor="userEmail">Email address:</label>
          <input ref={inputEmail} id="userEmail" type={'email'} placeholder="Enter email"/>
          {error.userEmail && <p>{error.userEmail}</p>}
        </div> 
        <div>
          <label htmlFor="userPass">Password:</label>
          <input ref={inputPass} id="userPass" type={'password'} placeholder="Enter password"/>
          {error.userPass && <p>{error.userPass}</p>}
        </div>   
        <div>
          <label htmlFor="userPassRepeat">Repeat password:</label>
          <input ref={inputPassRepeat} id="userPassRepeat" type={'password'} placeholder="Enter password"/>
          {error.userPassRepeat && <p>{error.userPassRepeat}</p>}
        </div>

        <fieldset>
          <legend>Gender:</legend>
          <div><input ref={inputMale} id="userMale" type={'radio'} value='male' name='gender'  /><label htmlFor="userMale">male</label></div>
          <div><input ref={inputFemale} id="userFemale" type={'radio'} value='female' name='gender'/><label htmlFor="userFemale">female</label></div>
          {(error.userMale && <p>{error.userMale}</p>) && (error.userFemale && <p>{error.userFemale}</p>)}
        </fieldset>

        <fieldset>
          <legend>User Agreement:</legend>
          <input ref={inputAgreement} id="userAgreement" type={'checkbox'}/><label htmlFor="userAgreement">I accept Terms and Conditions agreement.</label>
        </fieldset>
        
        <div><label htmlFor="userFile">Upload Picture:</label><input ref={inputFile} id="userFile" type={'file'} /></div>
        <div><label htmlFor="userCountry">Choose Country:</label><input ref={inputCountry} id="userCountry" type={'text'} placeholder='Enter country'></input></div>
      
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};
