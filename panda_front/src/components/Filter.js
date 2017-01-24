import React, { Component } from 'react';

import fuzzysearch from 'fuzzysearch';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend
} from Recharts;
import {
	sortAlph,
	championCleanSlug,
	reduceRole,
	popularityRole
} from './utils';

class Filter extends Component {
	constructor() {
		super()

		const champions = [];
		const matchs = [];
		this.state = {
			champions: [],
			roles: [],
			filter: '',
			activeRole: [],
			modal: true 
		};

		this.filtering = this.filtering.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleCheck = this.handleCheck.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
	}

	componentDidMount() {
		this.getData();
	}

	getData() {
		fetch('/champions.json', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		})
		.then(res => res.json())
		.then(data => {
			const champions = data.champions.map(championCleanSlug).sort(sortAlph);
			const roles = champions.reduce(reduceRole, []).sort(sortAlph);

			this.champions = champions;
			this.matchs = data.matches;
			console.log(this.matchs);
			this.setState({champions});
			this.setState({roles});
			popularityRole(this.matchs, 1);
		})
		.then(() => console.log(this.state))
		.catch(err => console.log('error', err));
	}

	filtering() {
		const activeRoles = this.state.roles.reduce((acc, role) => {
			if (role.checked) {
				acc.push(role.name);
			}
			return acc;
		}, []);

		const champions = this.champions.filter(champion => {
			const fuzz = fuzzysearch(this.state.filter.toLowerCase(), champion.name.toLowerCase());
			const role = !activeRoles.length || champion.tags.some(tag => activeRoles.some(activeRole => activeRole === tag));

			return (role && fuzz);
		});
		this.setState({champions});
	}


	handleSearch(e) {
		this.setState({filter: e.target.value}, this.filtering);
	}

	handleCheck(e) {
		const roles = this.state.roles.map(role => {
			if (role.name === e.target.name) {
				role.checked = !role.checked;
			}
			return role;
		});
		this.setState({roles}, this.filtering);
	}

	handleCloseModal(e) {
		this.setState({modal: false});
	}

	handleOpenModal(e) {

	}

	render() {
		const styles = {
			title: {
				textAlign: 'center'
			},
			search: {
				display: 'block',
				margin: '0 auto'
			},
			wrapper: {
				display: 'flex',
				flexDirection: 'row',
				flexWrap: 'wrap',
				justifyContent: 'center',
				alignItems: 'center',
				margin: '10px 0'
			},
			filter: {
				padding: '10px'
			},
			box: {
				padding: '0 4px 4px 4px'
			},
			img: {
				width: '81px',
				height: '81px'
			},
			modalOpen: {
				position: 'fixed',
				width: '100%',
				height: '100%',
				backgroundColor: 'rgba(0,0,0,0.5)',
			},
			modalClosed: {
				display: 'none'
			},
			modalBody: {
				display: 'flex',
				flexDirection: 'row',
				flexWrap: 'wrap',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: '#fff',
				borderRadius: '2px',
				margin: '10vh 10vw',
				width: '80vw',
				height: '80vh'
			}
		}

		const {champions, roles, filter, modal} = this.state;
		return (
			<div>
				<div onClick={this.handleCloseModal} style={modal ? styles.modalOpen : styles.modalClosed}>
					<div style={styles.modalBody}>
					lol
					</div>
				</div>
				<h1 style={styles.title}>Champion Filter Panda</h1>
				<div>
					<h2 style={styles.title}>Search</h2>
					<input style={styles.search} type="search" placeholder="Champions" value={filter} onChange={this.handleSearch}/>
					<h3 style={styles.title}>Roles</h3>
					<div style={styles.wrapper}>
						{roles.map((role, i) => (
							<div style={styles.filter} key={i}>
								<input onChange={this.handleCheck} name={role.name} value={role.checked} type="checkbox"/><label>{role.name}</label>
							</div>
						))}
					</div>
				</div>

				<div style={styles.wrapper}>
					{champions.map(champion => (
						<div style={styles.box} key={champion.id}>
							<img style={styles.img} role="presentation" src={'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/' + champion.name + '.png'} />
						</div>
					))}
				</div>
				
			</div>
		);
	}
}

export default Filter;
