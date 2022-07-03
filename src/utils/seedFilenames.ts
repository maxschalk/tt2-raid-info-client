export function filenameFromISODateString(isoDateString: string) {
  const dateString = isoDateString.replaceAll('-', '');

  const name = `raid_seed_${dateString}`;
  const suffix = '.json';

  return {
    name,
    suffix,
    filename: `${name}${suffix}`,
  };
}

export function ISODateStringFromFilename(filename: string) {
  const matches = /^raid_seed_([0-9]{8})\.json$/.exec(filename);

  if (matches === null) {
    return '';
  }

  const dateString = matches[1];

  return `${dateString.substring(0, 4)}-${dateString.substring(4, 6)}-${dateString.substring(6)}`;
}
