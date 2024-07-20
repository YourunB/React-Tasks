import './search.modules.css';
import { SearchProps } from '../state/types';

const Search = (props: SearchProps) => {
  return (
    <div className="search" data-testid={'search'}>
      <button onClick={() => props.clearSearch()} className="search__btn-clear">
        X
      </button>
      <input
        ref={props.serchInputRef as React.LegacyRef<HTMLInputElement>}
        className="search__input"
        placeholder="Search..."
        defaultValue={props.search}
      />
      <button onClick={() => props.changeSearchCharacters()} className="search__btn">
        Search
      </button>
    </div>
  );
};

export default Search;
