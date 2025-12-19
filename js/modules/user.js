let user = JSON.parse(localStorage.getItem("user")) || null;

export const setLocalUser = (newUser) => {
    user = newUser;
    localStorage.setItem("user", JSON.stringify(newUser));
};

export const getLocalUser = () => user;

export const getToken = () => {
    return user ? `Bearer ${user.token}` : null;
};