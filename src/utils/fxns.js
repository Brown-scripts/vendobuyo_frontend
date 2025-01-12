export const randomColor = () => {
    const randomHex = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomHex.padStart(6, "0")}`;
};