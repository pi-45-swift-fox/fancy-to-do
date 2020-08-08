const loginForm = $('.form-login'),
registerForm = $('.form-register'),
table = $('.append-todo'),
mainTable = $('.table'),
loginSubmit = $('#login-submit'),
registerSubmit = $('#register-submit'),
add = $('#add-todo'),
login = $('#login'),
register = $('#register'),
username = $('#whoami'),
logout = $('#logout');

// Function
function showHome() {
    username.text(`Hello, ${localStorage.username}`);
    logout.show();
    register.hide();
    login.hide();
    mainTable.show();
    loginForm.hide();
    registerForm.hide();
    fetchData();
};

function showLogin() {
    username.text(`Welcome back!`);
    logout.hide();
    register.show();
    login.hide();
    mainTable.hide();
    loginForm.show();
    registerForm.hide();
};

function showRegister() {
    username.text('Hello, nice to meeeeet u');
    logout.hide();
    register.hide();
    login.show();
    mainTable.hide();
    loginForm.hide();
    registerForm.show();
};

function fetchData() {
    $.ajax('http://localhost:3000/user/todo', {
        method: 'GET',
        headers: {
            accesstoken: localStorage.token
        }
    })
    .done(data => {
        let i = 0;
        data.forEach(e => {
            switch (e.status) {
                case (true):
                    e.status = 'Complete';
                    break;
                default:
                    e.status = 'Incomplete';
                    break;
            }
            e.dueDate = new Date(e.dueDate).toLocaleDateString(),
            i++;

            table.append(
                `
                <tr>
                  <th scope="row">${i}</th>
                  <td>${e.title}</td>
                  <td>${e.description}</td>
                  <td>${e.status}</td>
                  <td>${e.dueDate}</td>
                  <td>
                    <button> Delete </button>
                    <button> Edit </button>
                  </td>
                </tr>
                `
            );
        });
        // return data;
    })
    .fail(err => {
        console.log(err);
    })
};

function deleteTodo(id) {
    $.ajax(`http://localhost:3000/todo/${id}`, {
        method: 'DELETE',
        headers: {
            accesstoken: localStorage.token
        }
    })
    .done(data => {
        console.log(data);
        // return data;
    })
    .fail(err => {
        console.log(err);
    })
};

function editTodo(id) {
    $.ajax(`http://localhost:3000/user/todo/${id}`, {
        method: 'PUT',
        headers: {
            accesstoken: localStorage.token
        }
    })
    .done(data => {
        console.log(data);
        // return data;
    })
    .fail(err => {
        console.log(err);
    })
};

// Ready
$(document).ready(() => {
    if (localStorage.token) {
        showHome();
    } else {
        showLogin();
    }

    // Events
    loginSubmit.on('click', event => {
        event.preventDefault();
        const email = $('#email').val(),
        password = $('#password').val();

        $.ajax('http://localhost:3000/login', {
            method: 'POST',
            data: {
                email,
                password
            }
        })
            .done(data => {
                localStorage.username = data.username;
                localStorage.token = data.token;
                showHome();
            })
            .fail(err => {
                alert('noot noot');
                console.log(err);
            })
    });

    registerSubmit.on('click', event => {
        event.preventDefault();
        const email = $('#email').val(),
        username = $('#username').val(),
        password = $('#password').val();

        $.ajax('http://localhost:3000/register', {
            method: 'POST',
            data: {
                email,
                username,
                password
            }
        })
        .done(data => {
            localStorage.username = data.username;
            localStorage.token = data.token;
            showHome();
        })
        .fail(err => {
            alert('noot noot');
            console.log(err);
        })
    });

    register.on('click', event => {
        event.preventDefault();
        showRegister();
    })

    login.on('click', event => {
        event.preventDefault();
        showLogin();
    })

    logout.on('click', event => {
        event.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        showLogin();
    });

    add.on('click', event => {
        event.preventDefault();
    })
});