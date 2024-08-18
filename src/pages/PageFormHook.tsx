import './pages.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { validationSchema } from '../modules/validationSchema';
import { dispatchUserData } from '../modules/dispatchUserData';
import { useState } from 'react';
import { UserDataDispatch } from '../helpers/types';

export const PageFormHook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataRedux = useSelector((state: RootState) => state.data);

  const countriesList = dataRedux.countriesList;
  const [inputValue, setInputValue] = useState<string>('');
  const [countriesFilter, setCountriesFilter] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    clearErrors,
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.length > 0) {
      const filtered = countriesList.filter((country) => country.toLowerCase().includes(value.toLowerCase()));
      setCountriesFilter(filtered);
      clearErrors('userCountry');
    } else {
      setCountriesFilter([]);
      setError('userCountry', { type: 'manual', message: 'Country is required' });
    }
  };

  const handleSelectCountry = (country: string) => {
    setInputValue(country);
    setCountriesFilter([]);
    setValue('userCountry', country);
    clearErrors('userCountry');
  };

  const onSubmit = async (data: UserDataDispatch) => {
    dispatchUserData(data, dispatch);
    navigate('/');
  };

  return (
    <main className="page">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>React Hook Form</h2>

        <div className="input-box">
          <label htmlFor="userName">Name:</label>{' '}
          {errors.userName?.message && <span className="error">{errors.userName?.message}</span>}
          <input id="userName" type="text" placeholder="Enter name" {...register('userName')} />
        </div>

        <div className="input-box">
          <label htmlFor="userAge">Age:</label>{' '}
          {errors.userAge?.message && <span className="error">{errors.userAge?.message}</span>}
          <input id="userAge" type="number" placeholder="Enter age" {...register('userAge')} />
        </div>

        <div className="input-box">
          <label htmlFor="userEmail">Email:</label>{' '}
          {errors.userEmail?.message && <span className="error">{errors.userEmail?.message}</span>}
          <input id="userEmail" type="email" placeholder="Enter email" {...register('userEmail')} />
        </div>

        <div className="input-box">
          <label htmlFor="userPass">Password:</label>{' '}
          {errors.userPass?.message && <span className="error">{errors.userPass?.message}</span>}
          <input id="userPass" type="password" placeholder="Enter password" {...register('userPass')} />
        </div>

        <div className="input-box">
          <label htmlFor="userPassRepeat">Repeat password:</label>{' '}
          {errors.userPassRepeat?.message && <span className="error">{errors.userPassRepeat?.message}</span>}
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
          <div className="error-box">
            {errors.gender?.message && <span className="error">{errors.gender?.message}</span>}
          </div>
        </fieldset>

        <fieldset>
          <legend>User Agreement:</legend>
          <input id="userAgreement" type="checkbox" {...register('userAgreement')} />
          <label htmlFor="userAgreement">I accept Terms and Conditions agreement.</label>
          <div className="error-box">
            {errors.userAgreement?.message && <span className="error">{errors.userAgreement?.message}</span>}
          </div>
        </fieldset>

        <div className="input-box">
          <label htmlFor="userFile">Upload Picture:</label>{' '}
          {errors.userFile?.message && <span className="error">{errors.userFile?.message}</span>}
          <input className="file" id="userFile" type="file" {...register('userFile')} />
        </div>

        <div className="input-box">
          <label htmlFor="userCountry">Choose Country:</label>{' '}
          {errors.userCountry?.message && <span className="error">{errors.userCountry?.message}</span>}
          <input
            id="userCountry"
            type="text"
            placeholder="Enter country"
            {...register('userCountry')}
            value={inputValue}
            onChange={handleInputChange}
          />
          {countriesFilter.length > 0 && (
            <ul className="drop-list">
              {countriesFilter.map((country, index) => (
                <li key={index} onClick={() => handleSelectCountry(country)}>
                  {country}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button className="button" type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </main>
  );
};
