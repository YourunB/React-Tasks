
export const PageFormUncontrolled = () => {
  return (
    <main>
      <form>
        <h2>Uncontrolled Form</h2>

        <div><label htmlFor="userName">Name:</label><input id="userName" type={'text'} placeholder="Enter name"/></div>
        <div><label htmlFor="userAge">Age:</label><input id="userAge" type={'text'} placeholder="Enter age"/></div>
        <div><label htmlFor="userEmail">Email address:</label><input id="userEmail" type={'email'} placeholder="Enter email"/></div>
        <div><label htmlFor="userPass">Password:</label><input id="userPass" type={'password'} placeholder="Enter password"/></div>
        <div><label htmlFor="userPassRepeat">Repeat password:</label><input id="userPassRepeat" type={'password'} placeholder="Enter password"/></div>

        <fieldset>
          <legend>Gender:</legend>
          <div><input id="userMale" type={'radio'} value='male' name='gender' defaultChecked /><label htmlFor="userMale">male</label></div>
          <div><input id="userFemale" type={'radio'} value='female' name='gender'/><label htmlFor="userFemale">female</label></div>
        </fieldset>

        <fieldset>
          <legend>User Agreement:</legend>
          <input id="userAgreement" type={'checkbox'}/><label htmlFor="userAgreement">I accept Terms and Conditions agreement.</label>
        </fieldset>
        
        <div><label htmlFor="userFile">Upload Picture:</label><input id="userFile" type={'file'} /></div>
        <div><label htmlFor="userCountry">Choose Country:</label><input id="userCountry" type={'text'} placeholder='Enter country'></input></div>
      </form>
    </main>
  );
};
