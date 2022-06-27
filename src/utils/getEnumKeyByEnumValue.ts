export function getEnumKeyByEnumValue(
	someEnum: { [key: string]: string },
	enumValue: number | string
): string {
	const keys = Object.keys(someEnum).filter((x) => someEnum[x] == enumValue);

	return keys.length > 0 ? keys[0] : '';
}
