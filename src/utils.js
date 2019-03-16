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
