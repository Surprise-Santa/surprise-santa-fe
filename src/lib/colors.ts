export const christmasColors = [
    "#C8102E", // Red
    "#007849", // Green
    "#FFD100", // Gold
    "#177245", // Forest Green
    "#D72638", // Cranberry Red
    "#0B74AA", // Deep Blue
    "#FF914D", // Orange
    "#871C15", // Maroon
    "#FFE156", // Yellow
    "#4C4C4C", // Silver
];

export const getRandomChristmasColors = (count: number) => {
    const randomColors = [];

    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * christmasColors.length);
        randomColors.push(christmasColors[randomIndex]);
    }

    return randomColors;
};
