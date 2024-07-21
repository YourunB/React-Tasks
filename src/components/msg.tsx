import './msg.css';
import { RootState } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { clearAll } from '../redux/dataSliceElements';

const Msg = () => {
  const dispatch = useDispatch();
  const dataReduxElements = useSelector( (state: RootState) => state.dataElements );

  function deleteElementsFromSlice() {
    dispatch(clearAll());
  }

  return (
    <div className='msg'>
      <p>Total selected: {dataReduxElements.checkedCards.length - 1}</p>
      <button className='msg__btn' onClick={() => deleteElementsFromSlice()}>Reset</button>
      <button className='msg__btn'>Save</button>
    </div>
  );
};

export default Msg;
