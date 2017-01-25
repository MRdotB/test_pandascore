const data = require('../data');

const mostPlayed = data.matches.reduce((acc, m) => {
	if (acc.hasOwnProperty(m.champion)) {
		acc[m.champion].count++;
	} else {
		acc[m.champion] = {
			count: 0
		};
	}
	return acc;
}, {});
console.log(mostPlayed);
