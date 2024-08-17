import './pages.css';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { validationSchema } from '../modules/validationSchema';
import { dispatchUserData } from '../modules/dispatchUserData';

export const PageFormUncontrolled = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const validateForm = async (event) => {
    event.preventDefault();
    const formData = {
      userName: inputName.current?.value,
      userAge: inputAge.current?.value,
      userEmail: inputEmail.current?.value,
      userPass: inputPass.current?.value,
      userPassRepeat: inputPassRepeat.current?.value,
      gender: inputMale.current?.checked ? inputMale.current?.value : inputFemale.current?.checked ? inputFemale.current?.value : false,
      userAgreement: inputAgreement.current?.checked,
      userFile: inputFile.current?.files,
      userCountry: inputCountry.current?.value,
    };
    
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setError({});
      dispatchUserData(formData, dispatch);
      navigate('/');
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
          <input className='file' ref={inputFile} id="userFile" type={'file'} />
        </div>

        <div className='input-box'>
          <label htmlFor="userCountry">Choose Country:</label> {error.userCountry && <span className='error'>{error.userCountry}</span>}
          <input ref={inputCountry} id="userCountry" type={'text'} placeholder='Enter country' />
        </div>
      
        <button className='button' type="submit">Submit</button>
      </form>
    </main>
  );
};
