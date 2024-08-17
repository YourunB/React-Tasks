import { updateUser } from '../redux/dataSlice';
import { convertToBase64 } from '../helpers/convertToBase64';

export const dispatchUserData = async (data, dispatch) => {
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
}