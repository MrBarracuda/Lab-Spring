import * as PropTypes from 'prop-types';

export const FontAwesomeIcon = ({ icon }) => (
	<fa-icon className={icon} size='2em'></fa-icon>
);

FontAwesomeIcon.propTypes = { icon: PropTypes.string };
