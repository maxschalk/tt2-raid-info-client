export function isoDateWithinWeek(isoDate: string) {
  if (!/[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(isoDate)) {
    return false;
  }

  const fullStr = `${isoDate}T00:00:01+02:00`;

  const now = new Date();
  const seedStartDate = new Date(fullStr);

  const seedEndDate = new Date(seedStartDate);
  seedEndDate.setDate(seedEndDate.getDate() + 7);

  return seedStartDate <= now && now < seedEndDate;
}
