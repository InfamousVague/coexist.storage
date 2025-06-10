export function formatDate(epoch: number): string {
    return new Date(epoch * 1000).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}