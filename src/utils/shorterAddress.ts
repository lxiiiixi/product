export function shortAddress(address: string) {
    const newAddress = address.replace(
        address.slice(6, address.length - 4),
        '...'
    );
    return newAddress;
}
