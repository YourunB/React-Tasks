import './msg.css';
import { RootState } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { clearAll } from '../redux/dataSliceElements';

const Msg = () => {
  const dispatch = useDispatch();
  const dataReduxElements = useSelector( (state: RootState) => state.dataElements );

  const deleteElementsFromSlice = () => dispatch(clearAll());

  const arr: string[] = [];
  dataReduxElements.checkedCards.forEach(obj => {
    if (obj.id) {
      const res = Object.values(obj);
      arr.push(res.join(', '));
    }
  })

  return (
    <div className='msg'>
      <p>Total selected: {dataReduxElements.checkedCards.length - 1}</p>
      <button className='msg__btn' onClick={() => deleteElementsFromSlice()}>Reset</button>
      <a href={URL.createObjectURL(new Blob([`Disney Character:\n\n${arr.join('\n\n')}`], {type: 'text/plain'}))} download={`Disney_characters_${dataReduxElements.checkedCards.length - 1}.txt`} className='msg__btn'>Save</a>
    </div>
  );
};

export default Msg;
