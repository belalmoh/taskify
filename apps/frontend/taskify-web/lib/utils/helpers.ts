export const getAvatarName = (name: string) => {
    return name.split(' ').map((word) => word.charAt(0).toUpperCase()).join('');
}

export const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
}