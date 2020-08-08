$(document).ready(function() {
    if (!localStorage.accesstoken) {
        homeBeforeLogin()
    } else {
        homeAfterLogin()
    }
})

function navBarArranged() {
    $('#searchRecipe').empty()
    $('.navBarArranged').append(
        `<li class="nav-item active">
            <a class="nav-link" href="#" onclick="backToTodoLists(event)">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#" onclick="addTodoForm(event)">Add Todo</a>
        </li>
        
        <li><button onclick="logOut(event)" id="logOut" class="btn btn-danger logoutButton">Log Out</button></li>
        `
    )
    $('#searchRecipe').append(
        `<form class="form-inline my-2 my-lg-0" onsubmit="getRecipe(event)">
        <input class="form-control mr-sm-2" type="search" placeholder="Search Recipe Here" aria-label="Search" id="recipe">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>`
    )
}

function homeBeforeLogin() {
    $('#todoList').hide()
    $('.loginForm').show()
    $('.registerForm').hide()
    $('.addTodoForm').hide()
    $('.navBarArranged').empty()
    $('.getRecipeWeb').hide()
    $('#searchRecipe').hide()
}

function homeAfterLogin() {
    $('#todoList').show()
    todoLists()
    $('.loginForm').hide()
    $('.registerForm').hide()
    $('.addTodoForm').hide()
    $('.getRecipeWeb').hide()
    $('#searchRecipe').show()
    navBarArranged()

}

function showRegisterForm(event) {
    $('#todoList').hide()
    $('.loginForm').hide()
    $('.registerForm').show()
    $('.addTodoForm').hide()
}

function showLoginPage(event) {
    homeBeforeLogin()
}

function addTodoForm(event) {
    $('#todoList').hide()
    $('.loginForm').hide()
    $('.registerForm').hide()
    $('.addTodoForm').show()

}

function backToTodoLists(event) {
    event.preventDefault()
    homeAfterLogin()
}

function showRecipe() {
    $('.getRecipeWeb').show()
    $('#todoList').hide()
    $('.loginForm').hide()
    $('.registerForm').hide()
    $('.addTodoForm').hide()
    $('.navBarArranged').show()
}

function getRecipe(event) {
    $('#listRecipe').empty()
    const recipe = $('#recipe').val()
    $('.getRecipeWeb').show()

    $.ajax(`http://localhost:3000/recipe`, {
            method: 'POST',
            data: {
                recipe
            },
            headers: {
                accesstoken: localStorage.accesstoken
            }
        })
        .done((data) => {
            if (data.length == 0) {
                $('#noTodo').append(`<p>Currently there is no Recipe List with that name. Please change the search key</p>`)
            }
            let num = 0

            data.forEach(el => {
                num++

                $('#listRecipe').append(`<tr><td>${num}</td><td>${el.title}</td><td><a href="${el.href}">Click Here</a></td><td><img src="${el.thumbnail}" alt="image"></td><td>${el.ingredients}</td></tr>`)

            })
        })
        .fail((err) => {
            console.log('err', err);
        })
        .always(() => {
            console.log('selesai');
        })
}

function deleteTodo(event, id) {
    $.ajax(`http://localhost:3000/todos/${id}`, {
            method: 'DELETE',
            headers: {
                accesstoken: localStorage.accesstoken
            }
        })
        .done((data) => {
            $('.navBarArranged').empty()
            homeAfterLogin()
        })
        .fail((err) => {
            console.log('err', err);
        })
        .always(() => {
            console.log('selesai');
        })
}

function logOut(event) {
    event.preventDefault()
    const auth2 = gapi.auth2.getAuthInstance();

    auth2.signOut()
        .then(() => {
            console.log('User signed out.');
            homeBeforeLogin()
            localStorage.clear()

        })
        .catch(err => {
            console.log();
        })
}


function addTodoPost(event) {
    event.preventDefault()
    const todoDescription = $('#todoDescription').val()
    const todoTitle = $('#todoTitle').val()
    const todoDue_date = $('#todoDue_date').val()
    console.log(todoDescription);
    $.ajax('http://localhost:3000/todos', {
            method: 'POST',
            data: {
                title: todoTitle,
                description: todoDescription,
                due_date: todoDue_date
            },
            headers: {
                accesstoken: localStorage.accesstoken
            }
        })
        .done((data) => {
            console.log('data', data);
            homeAfterLogin()
        })
        .fail(err => {
            console.log('err', err);
        })
        .always(() => {
            console.log('selesai');
        })

}


function registerNewUser(event) {
    event.preventDefault()

    const registerEmail = $('#registerEmail').val()
    const registerPassword = $('#registerPassword').val()
    $.ajax('http://localhost:3000/register', {
            method: 'POST',
            data: {
                email: registerEmail,
                password: registerPassword
            }
        })
        .done((data) => {
            console.log('data', data);
            localStorage.accesstoken = data.token
            homeAfterLogin()
        })
        .fail((err) => {
            console.log('err', err);
        })
        .always(() => {
            console.log('selesai');
        })
}

function onSignIn(googleUser) {
    const google_token = googleUser.getAuthResponse().id_token;
    $.ajax('http://localhost:3000/googleLogin', {
            method: 'POST',
            headers: {
                google_token
            }
        })
        .done(res => {
            localStorage.accesstoken = res.token
            homeAfterLogin()
        })
        .fail(err => {
            console.log('err', err);
        })
        .always(() => {
            console.log('selese');
        })

}



function todoLists() {
    $('#listTodo').empty()
    $('#noTodo').empty()
    $('.navBarArranged').empty()
    $.ajax('http://localhost:3000/todos', {
            method: 'GET',
            headers: {
                accesstoken: localStorage.accesstoken
            }
        })
        .done((data) => {
            if (data.length == 0) {
                $('#noTodo').append(`<p onclick="addTodoForm(event)">Currently there is no Todo List in your account. Please click  here to add </p>`)
            }
            $('#todoList').show()
            $('.loginForm').hide()
            let num = 0

            data.forEach(el => {
                num++
                if (el.status == false) {
                    $('#listTodo').append(`<tr><td>${num}</td><td>${el.title}</td><td>${el.description}</td><td><input type="checkbox" name="status" id="status" onclick="updateTodo(event,${el.id},${el.status})"></td><td>${el.due_date.toLocaleString()}</td><td><button type="button" class="btn btn-danger" onclick="deleteTodo(event,${el.id})">Delete</button></td></tr>`)
                } else {
                    $('#listTodo').append(`<tr><td>${num}</td><td>${el.title}</td><td>${el.description}</td><td><input checked type="checkbox" onclick="updateTodo(event,${el.id},${el.status})" name="status" id="status"></td><td>${el.due_date.toLocaleString()}</td><td><button type="button" class="btn btn-danger" onclick="deleteTodo(event,${el.id})">Delete</button></td></tr>`)
                }

            });
        })
        .fail((err) => {
            console.log('err', err);
        })
        .always(() => {
            console.log('selesai');
        })
}



function loginSubmission(event) {
    event.preventDefault()

    const loginEmail = $('#loginEmail').val()
    const loginPassword = $('#loginPassword').val()

    $.ajax('http://localhost:3000/login', {
            method: 'POST',
            data: {
                email: loginEmail,
                password: loginPassword
            }
        })
        .done((data) => {
            console.log('data', data);
            localStorage.accesstoken = data.token

            homeAfterLogin()
        })
        .fail((err) => {
            console.log('err', err);
        })
        .always(() => {
            console.log('selesai');
        })

}

function logOutButton(event) {
    $('.logoutButton').click(function() {
        localStorage.clear()
        homeBeforeLogin()
    })
}

function updateTodo(event, id, status) {
    console.log(status);
    let statusUpdated = null
    if (status == false) {
        statusUpdated = true
    } else {
        statusUpdated = false
    }
    $.ajax(`http://localhost:3000/todos/${id}/status`, {
            method: 'PATCH',
            data: {
                status: statusUpdated
            },
            headers: {
                accesstoken: localStorage.accesstoken
            }
        })
        .done((data) => {
            console.log(data);
            $('.navBarArranged').empty()
            homeAfterLogin()
        })
        .fail((err) => {
            console.log('err', err);
        })
        .always(() => {
            console.log('selesai');
        })

}