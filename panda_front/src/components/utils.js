import upperFirst from 'lodash.upperfirst';

export function sortAlph(a, b) {
	if (a.name < b.name) {
		return -1;
	}
	if (a.name > b.name) {
		return 1;
	}
	return 0;
}

export function championCleanSlug(c) {
	c.name = c.name.replace(/ |'/, '');
	switch (c.name) {
		case 'VelKoz':
			c.name = 'Velkoz'
			break;
		case 'LeBlanc':
			c.name = 'Leblanc'
			break;
		case 'ChoGath':
			c.name = 'Chogath'
			break;
		case 'Fiddlesticks':
			c.name = 'FiddleSticks'
			break;
		case 'Dr.Mundo':
			c.name = 'DrMundo'
			break;
		case 'Wukong':
			c.name = 'MonkeyKing'
			break;
		case 'KhaZix':
			c.name = 'Khazix'
			break;
	}
	return c;
}

export function reduceRole(acc, champion) {
	champion.tags.forEach(tag => {
		if (!acc.some(role => role.name === tag)) {
			const objTag = {
				name: tag,
				checked: false
			};
			acc.push(objTag);
		}
	});
	return acc;
}

function reduceById(champId) {
	return function r(acc, match) {
		if (match.champion === champId) {
			acc.push(match);
		}
		return acc;
	}
}

function groupByLane(acc, match) {
	let lane = match.lane;
	if (lane === 'MID') {
		lane = 'MIDDLE';
	} else if (match.lane === 'BOT') {
		lane = 'BOTTOM';
	}

	const index = acc.findIndex(role => role.lane === lane);
	if (index > -1) {
		acc[index].played++;
	} else {
		acc.push({
			lane: lane,
			played: 1
		});
	}
	return acc;
}

function barChartFormat(matchs) {
	const totalMatchs = matchs.reduce((acc, match) => (acc + match.played), 0);
	return function r(match) {
		return {
			percentage: 100 * match.played / totalMatchs,
			lane: upperFirst(match.lane.toLowerCase())
		};
	}
}

export function popularityRole(matchs, champId) {
	const r1 = reduceById(champId);
	const rMatchs = matchs
		.reduce(r1, [])
		.reduce(groupByLane, []);
	const m1 = barChartFormat(rMatchs);
	return rMatchs.map(m1);
}
/*
export popularityOverTime() {

	}
	*/

