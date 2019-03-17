export const calculateAge = (date) => {
  const diffedMS = Date.now() - new Date(date).getTime();
  const sad = new Date(diffedMS);

  // 1970 start of the unix clock
  return Math.floor(sad.getUTCFullYear() - 1970);
};

export const availablePositions = [
  'Attacking Midfield',
  'Central Midfield',
  'Centre-Back',
  'Centre-Forward',
  'Defensive Midfield',
  'Keeper',
  'Left Midfield',
  'Left Wing',
  'Left-Back',
  'Right-Back',
];

// We only allow players between 18 and 40 years old.
// Sorry if you're pelé.
const minimunAge = 18;
const maximunAge = 40;

export const availablePlayerAges = Array.from(
  Array(maximunAge - minimunAge + 1),
  (_, i) => i + minimunAge,
);
