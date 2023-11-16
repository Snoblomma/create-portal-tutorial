const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function formatDate(date: Date) {
    return `${date.getDate()} ${monthNames[date.getMonth()]}, ${date.getFullYear()}`
}

export function today() {
    return formatDate(new Date())
}

export function yesterday() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return formatDate(date)
}