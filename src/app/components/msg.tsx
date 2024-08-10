import s from './msg.module.css';
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
    <div className={s['msg']}>
      <p>Total selected: {dataReduxElements.checkedCards.length - 1}</p>
      <button className={s['msg__btn']} onClick={() => deleteElementsFromSlice()}>
        Reset
      </button>
      <a
        href={URL.createObjectURL(
          new Blob([`Rich and Morty Characters\nId:;Name:;Image:;Species:;Url:;\n${arr.join('\n')}`], {
            type: 'text/plain',
          })
        )}
        download={`Rich_and_Morty_characters_${dataReduxElements.checkedCards.length - 1}.csv`}
        className={s['msg__btn']}
      >
        Save
      </a>
    </div>
  );
};

export default Msg;
