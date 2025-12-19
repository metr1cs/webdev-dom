import { loginUser } from "./api.js";
import { setLocalUser } from "./user.js";
import { initApp } from "./init.js";

export function renderLogin() {
    const appElement = document.getElementById("app");
    appElement.innerHTML = `
        <div class="add-form">
            <h3 class="form-title">Вход</h3>
            <input type="text" id="login-input" class="add-form-name" placeholder="Логин" />
            <input type="password" id="password-input" class="add-form-name" placeholder="Пароль" />
            <button id="login-button" class="add-form-button">Войти</button>
        </div>
    `;

    document.getElementById("login-button").addEventListener("click", () => {
        const login = document.getElementById("login-input").value;
        const password = document.getElementById("password-input").value;

        loginUser({ login, password })
            .then(data => {
                setLocalUser(data.user);
                initApp();
            })
            .catch(err => alert(err.message));
    });
}