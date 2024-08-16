
import * as Yup from 'yup';
import { useRef } from 'react';

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

  return (
    <main>
      <form>
        <h2>Uncontrolled Form</h2>

        <div><label htmlFor="userName">Name:</label><input ref={inputName} id="userName" type={'text'} placeholder="Enter name"/></div>
        <div><label htmlFor="userAge">Age:</label><input ref={inputAge} id="userAge" type={'text'} placeholder="Enter age"/></div>
        <div><label htmlFor="userEmail">Email address:</label><input ref={inputEmail} id="userEmail" type={'email'} placeholder="Enter email"/></div>
        <div><label htmlFor="userPass">Password:</label><input ref={inputPass} id="userPass" type={'password'} placeholder="Enter password"/></div>
        <div><label htmlFor="userPassRepeat">Repeat password:</label><input ref={inputPassRepeat} id="userPassRepeat" type={'password'} placeholder="Enter password"/></div>

        <fieldset>
          <legend>Gender:</legend>
          <div><input ref={inputMale} id="userMale" type={'radio'} value='male' name='gender' defaultChecked /><label htmlFor="userMale">male</label></div>
          <div><input ref={inputFemale} id="userFemale" type={'radio'} value='female' name='gender'/><label htmlFor="userFemale">female</label></div>
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
