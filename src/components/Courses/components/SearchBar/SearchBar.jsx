import styles from './SearchBar.module.css';
import { BUTTON } from '../../../../constants';
import { Input } from '../../../../common/Input/Input';
import { Button } from '../../../../common/Button/Button';

const SearchBar = ({ searchInput, searchItems }) => (
	<div className={styles.searchBar}>
		<Input
			value={searchInput}
			onChange={(event) => searchItems(event.target.value)}
			placeHolder='Enter course name...'
			name='searchInput'
			type='text'
		/>
		<Button
			type={BUTTON}
			name='search'
			value='Search'
			classN={styles.btnSearch}
		/>
	</div>
);

export default SearchBar;
