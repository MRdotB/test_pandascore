import React, {PropTypes} from 'react';

import LaneChart from './LaneChart';
import PopularityChart from './PopularityChart';

const styles = {
	modalOpen: {
		position: 'fixed',
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0,0,0,0.5)'
	},
	modalClosed: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		opacity: 0,
		left: -9999
	},
	modalBody: {
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: '#fff',
		borderRadius: '2px',
		margin: '10vh 10vw',
		width: '80vw',
		height: '80vh'
	},
	subModal1: {
		height: '100%'
	},
	subModal2: {
		flexGrow: 1,
		height: '100%'
	},
	modalImg: {
		height: '100%'
	},
	chart: {
		display: 'inline-block',
		width: '100%',
		height: '50%'
	}
};

function Modal(props) {
	return (
		<div onClick={props.onHandleCloseModal} style={props.modal ? styles.modalOpen : styles.modalClosed}>
			<div style={styles.modalBody}>
				<div style={styles.subModal1}>
					{props.champion !== '' && <img style={styles.modalImg} src={'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/' + props.champion + '_0.jpg'} role="presentation"/>}
				</div>
				<div style={styles.subModal2}>
					<div style={styles.chart}>
						{props.popularityRoleData.length > 0 && <LaneChart data={props.popularityRoleData}/>}
					</div>
					<div style={styles.chart}>
						{props.popularityOverTimeData.length > 0 && <PopularityChart data={props.popularityOverTimeData}/>}
					</div>
				</div>
			</div>
		</div>

	);
}

Modal.propTypes = {
	modal: PropTypes.bool,
	onHandleCloseModal: PropTypes.func,
	champion: PropTypes.string,
	popularityRoleData: PropTypes.array,
	popularityOverTimeData: PropTypes.array
};
export default Modal;
