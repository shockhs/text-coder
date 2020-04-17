export const controlNumber = (value) => {
    return (value ? (value > 0 && value < 20 ? `Must be in range from 0 to 20` : undefined) : undefined);
}