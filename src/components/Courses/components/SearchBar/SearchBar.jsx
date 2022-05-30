import styles from './SearchBar.module.css';

import { Input } from '../../../../common/Input/Input';
import { Button } from '../../../../common/Button/Button';

const SearchBar = ({ searchInput, onChangeSearchInput }) => {
	return (
		<div className={styles.searchBar}>
			<Input
				value={searchInput}
				onChange={onChangeSearchInput}
				placeHolder='Enter course name...'
				name='searchInput'
				type='text'
			/>
			<Button
				type='button'
				name='search'
				value='Search'
				classN={styles.btnSearch}
			/>
		</div>
	);
};
export default SearchBar;
