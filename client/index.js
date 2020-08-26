const loginForm = $('.form-login'),
registerForm = $('.form-register'),
table = $('.append-todo'),
mainTable = $('.table'),
loginSubmit = $('#login-submit'),
registerSubmit = $('#register-submit'),
login = $('#login'),
register = $('#register'),
username = $('#whoami'),
add = $('#add-todo'),
todoForm = $('#form-todo'),
todoSubmit = $('#todo-submit'),
main = $('#home'),
logout = $('#logout');

// Function
function showHome() {
    add.show();
    todoForm.hide();
    table.empty();
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
    todoForm.hide();
    add.hide();
    table.empty();
    username.text(`Welcome back!`);
    logout.hide();
    register.show();
    login.hide();
    mainTable.hide();
    loginForm.show();
    registerForm.hide();
};

function showRegister() {
    todoForm.hide();
    add.hide();
    username.text('Hello, nice to meeeeet u');
    logout.hide();
    register.hide();
    login.show();
    mainTable.hide();
    loginForm.hide();
    registerForm.show();
};

function showTodoForm() {
    mainTable.hide();
    todoForm.show();
};

function fetchData() {
    $.ajax('http://localhost:3000/user/todo', {
        method: 'GET',
        headers: {
            accesstoken: localStorage.token
        }
    })
    .done(todos => {
        let i = 0;

        todos.forEach(todo => {
            if (todo.status) {
                todo.status = 'Complete';
            } else {
                todo.status = 'Incomplete'
            }
            todo.dueDate = new Date(todo.dueDate).toLocaleDateString();
            i++;

            table.append(
                `
                <tr>
                  <th scope="row">${i}</th>
                  <td>${todo.title}</td>
                  <td>${todo.description}</td>
                  <td>${todo.status}</td>
                  <td>${todo.dueDate}</td>
                  <td>
                    <button id="delete-${todo.id}"> Delete </button>
                    <button id="edit-${todo.id}"> Mark </button>
                  </td>
                </tr>
                `
            );

            $(`#delete-${todo.id}`).on('click', () => {
                deleteTodo(todo.id);
            });
            $(`#edit-${todo.id}`).on('click', () => {
                editTodo(todo.id);
            });
        });
    })
    .fail(err => {
        console.log(err);
    })
};

function deleteTodo(id) {
    $.ajax(`http://localhost:3000/todos/${id}`, {
        method: 'DELETE',
        headers: {
            accesstoken: localStorage.token
        }
    })
    .done(data => {
        showHome();
        // return data;
    })
    .fail(err => {
        console.log(err);
    })
};

function editTodo(id) {
    $.ajax(`http://localhost:3000/todos/${id}`, {
        method: 'GET',
        headers: {
            accesstoken: localStorage.token
        }
    })
    .done(todo => {
        if (todo.status) {
            todo.status = false;
        } else {
            todo.status = true;
        }

        const title = todo.title,
        description = todo.description,
        status = todo.status,
        dueDate = todo.dueDate;

        $.ajax(`http://localhost:3000/todos/${id}`, {
            method: 'PUT',
            headers: {
                accesstoken: localStorage.token
            },
            data: {
                title,
                description,
                status,
                dueDate
            }
        })
        .done(data => {
            showHome();
        })
        .fail(err => {
            console.log(err);
        })
    })
    .fail(err => {
        console.log(err);
    })
};

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    const googleToken = googleUser.getAuthResponse().id_token;

    $.ajax('http://localhost:3000/google-login', {
        method: 'POST',
        headers: {
            token: googleToken, // Naming googleToken in headers is not possible
        }
    })
        .done(data => {
            localStorage.username = data.username;
            localStorage.token = data.token;
            showHome();
        })
        .fail(err => {
            console.log(err);
        })
}
  
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
            console.log(err);
        })
    });

    todoSubmit.on('click', event => {
        event.preventDefault();
        const title = $('#title').val(),
        description = $('#description').val(),
        status = false,
        dueDate = $('#dueDate').val();

        $.ajax('http://localhost:3000/todos/', {
            method: 'POST',
            headers: {
                accesstoken: localStorage.token
            },
            data: {
                title,
                description,
                status,
                dueDate
            }
        })
        .done(res => {
            showHome();
        })
        .fail(err => {
            console.log(err); // Wrong date / no title
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
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
        });
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        showLogin();
    });

    add.on('click', event => {
        event.preventDefault();
        showTodoForm();
    });

    main.on('click', event => {
        event.preventDefault();
        showHome();
    })
});