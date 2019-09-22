const { acceptedPeople } = require('../utils/wcif');
const { sortWcifEvents } = require('../utils/events');
const { competitionCountryIso2s } = require('../utils/wcif');
const { countryByIso2 } = require('../utils/countries');
const { podiums } = require('../utils/rounds');

module.exports = {
  id: ({ wcif }) => {
    return wcif.id;
  },
  name: ({ wcif }) => {
    return wcif.shortName;
  },
  events: ({ wcif }) => {
    return sortWcifEvents(wcif.events);
  },
  schedule: ({ wcif }) => {
    return wcif.schedule;
  },
  competitors: ({ wcif }) => {
    return acceptedPeople(wcif);
  },
  countries: ({ wcif }) => {
    return competitionCountryIso2s(wcif).map(countryByIso2);
  },
  synchronizedAt: ({ synchronizedAt }) => {
    return synchronizedAt.toISOString();
  },
  podiums: ({ wcif }) => {
    return podiums(wcif);
  },
};
