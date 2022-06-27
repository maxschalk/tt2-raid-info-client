export function getEnumKeyByEnumValue(someEnum: any, enumValue: number | string): string {
	const keys = Object.keys(someEnum).filter((x) => someEnum[x] == enumValue);

	return keys.length > 0 ? keys[0] : '';
}
