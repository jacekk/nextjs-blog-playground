export function formatDate(raw: string) {
	return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(raw));
}
