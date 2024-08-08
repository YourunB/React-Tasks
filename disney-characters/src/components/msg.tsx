import './msg.module.css';
import { RootState } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { clearAll } from '../redux/dataSliceElements';

const Msg = () => {
  const dispatch = useDispatch();
  const dataReduxElements = useSelector((state: RootState) => state.dataElements);

  const deleteElementsFromSlice = () => dispatch(clearAll());

  const arr: string[] = [];
  dataReduxElements.checkedCards.forEach((obj) => {
    if (obj.id) {
      const res = Object.values(obj);
      arr.push(res.join(';'));
    }
  });

  return (
    <div className="msg">
      <p>Total selected: {dataReduxElements.checkedCards.length - 1}</p>
      <button className="msg__btn" onClick={() => deleteElementsFromSlice()}>
        Reset
      </button>
      <a
        href={URL.createObjectURL(
          new Blob([`Disney Character\nId:;Name:;Image:;Films:;Url:;\n${arr.join('\n')}`], { type: 'text/plain' })
        )}
        download={`Disney_characters_${dataReduxElements.checkedCards.length - 1}.csv`}
        className="msg__btn"
      >
        Save
      </a>
    </div>
  );
};

export default Msg;
