import countryJson from './countries.json';

export const FONTS = ['Mynerve', 'Bangers', 'Fruktur', 'Gluten', 'Roboto', 'SedgwickAveDisplay'];

export const linearGradientColor = [
  ['#E54D24', '#DDB249'],
  ['#ED4264', '#FFEDBC'],
  ['#6D53DC', '#DB8282'],
  ['#539566', '#72A5C2'],
  ['#8D60BE', '#F2D49E'],
  ['#A446A4', '#83A5BE'],
  ['#6D53DC', '#DC5356'],
  ['#D9B967', '#8EC3A7'],
  ['#F08686', '#9CC495'],
];

export const playerRoles: CustomObject<string> = {
  GK: 'Goalkeeper',
  CB: 'Center back',
  WB: 'Wing back',
  CDM: 'Defensive Midfielder',
  CM: 'Central Midfielder',
  ST: 'Striker',
  W: 'Winger',
};

export const events: CustomObject<string> = {
  shots: 'Shots',
  goals: 'Goals',
  offSide: 'Offside',
  cornerKick: 'Corner Kick',
  errors: 'Errors',
  redCard: 'Red Card',
  yellowCard: 'Yellow Card',
};

export const countryOptions = countryJson.map(({ name, code }) => ({ label: name, value: code }));
