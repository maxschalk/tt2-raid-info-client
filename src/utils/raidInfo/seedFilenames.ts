export function seedIdentifierFromISODateString(isoDateString: string) {
    const dateString = isoDateString.replaceAll('-', '');

    const identifier = `raid_seed_${dateString}`;

    return identifier;
}

export function ISODateStringFromSeedIdentifier(identifier: string) {
    const matches = /^raid_seed_([0-9]{8})$/.exec(identifier);

    if (matches === null) {
        return '';
    }

    const dateString = matches[1];

    return `${dateString.substring(0, 4)}-${dateString.substring(4, 6)}-${dateString.substring(6)}`;
}
