
export const PageFormUncontrolled = () => {
  return (
    <main>
      <form>
        <div><label>Name:</label><input type={'text'} placeholder="Enter name"/></div>
        <div><label>Age:</label><input type={'text'} placeholder="Enter age"/></div>
        <div><label>Email address:</label><input type={'email'} placeholder="Enter email"/></div>
        <div><label>Password:</label><input type={'password'} placeholder="Enter password"/></div>
        <div><label>Repeat password:</label><input type={'password'} placeholder="Enter password"/></div>

        <fieldset>
          <legend>Gender:</legend>
          <div><input type={'radio'} value='male' name='gender' defaultChecked /><label>male</label></div>
          <div><input type={'radio'} value='female' name='gender'/><label>female</label></div>
        </fieldset>

        <fieldset>
          <legend>User Agreement:</legend>
          <input type={'checkbox'}/><label>I accept Terms and Conditions agreement.</label>
        </fieldset>
        
        <div><label>Upload Picture:</label><input type={'file'} /></div>
        <div><label>Choose Country:</label><input type={'text'} placeholder='Enter country'></input></div>
      </form>
    </main>
  );
};
