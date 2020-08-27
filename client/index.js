let idSelected = null
const baseUrl = 'http://localhost:3002'
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
    $('.editTodoForm').hide()
}

function homeAfterLogin() {
    $('#todoList').show()
    todoLists()
    $('.loginForm').hide()
    $('.registerForm').hide()
    $('.addTodoForm').hide()
    $('.getRecipeWeb').hide()
    $('#searchRecipe').show()
    $('.editTodoForm').hide()
    navBarArranged()
}

function showRegisterForm(event) {
    $('#todoList').hide()
    $('.loginForm').hide()
    $('.registerForm').show()
    $('.addTodoForm').hide()
    $('#errRegister').empty()
}

function showLoginPage(event) {
    homeBeforeLogin()
    $('#errLogin').empty()
}

function editTodoPage(event,id){
    $('#todoList').hide()
    $('.loginForm').hide()
    $('.registerForm').hide()
    $('.addTodoForm').hide()
    $('.getRecipeWeb').hide()
    $('#searchRecipe').hide()
    $('.editTodoForm').show()

    $.ajax(`${baseUrl}/todos/${id}`, {
        method: 'GET',
        headers: {
            accesstoken: localStorage.accesstoken
        }
    })
    .done((data) => {
        idSelected = id
        let date = new Date(data.due_date)
        let day = date.getDate()
        let month = date.getMonth()+1
        let year = date.getFullYear()
        if(day<10) day = `0`+day
        if(month<10) month = `0`+month
        $('#editTodoTitle').val(data.title)
        $('#editTodoDescription').val(data.description)
        $('#editTodoDue_date').val(`${year}-${month}-${day}`)
    })
    .fail((err) => {
        console.log('err', err);
    })
    .always(() => {
        console.log('selesai');
    })
}

function addTodoForm(event) {
    $('#todoList').hide()
    $('.loginForm').hide()
    $('.registerForm').hide()
    $('.addTodoForm').show()
    $('.getRecipeWeb').hide()
    $('.editTodoForm').hide()
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
    event.preventDefault()
    $('#noRecipe').empty()
    $('#listRecipe').empty()
    const recipe = $('#recipe').val()
    $('.getRecipeWeb').show()

    $.ajax(`${baseUrl}/recipe`, {
            method: 'POST',
            data: {
                recipeRequested:recipe
            },
            headers: {
                accesstoken: localStorage.accesstoken
            }
        })
        .done((data) => {
            if (data.length == 0) {
                $('#noRecipe').append(`<p>Currently there is no Recipe List with that name. Please change the search key</p>`)
                // $('#recipe').empty()
                // $('#searchRecipe').val('')

                navBarArranged()
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
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this todo!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            $.ajax(`${baseUrl}/todos/${id}`, {
                method: 'DELETE',
                headers: {
                    accesstoken: localStorage.accesstoken
                }
            })
            .done((data) => {
                $('.navBarArranged').empty()
                swal("Poof! Your tofo has been deleted!", {
                    icon: "success",
                });
                homeAfterLogin()
            })
            .fail((err) => {
                console.log('err', err);
            })
            .always(() => {
                console.log('selesai');
            })

        } else {
          swal("Cancelled to delete todo!");
        }
      });

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
    $.ajax(`${baseUrl}/todos`, {
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
    $.ajax(`${baseUrl}/register`, {
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
            $('#registerEmail').val('')
            $('#registerPassword').val('')
            $('#errRegister').empty()
        })
        .fail((err) => {
            $('#errRegister').empty()
            $('#errRegister').append(err.responseJSON.message)
        })
        .always(() => {
            console.log('selesai');
        })
}

function onSignIn(googleUser) {
    const google_token = googleUser.getAuthResponse().id_token;
    $.ajax(`${baseUrl}/googleLogin`, {
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
    $.ajax(`${baseUrl}/todos`, {
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
                    $('#listTodo').append(`<tr><td>${num}</td><td>${el.title}</td><td>${el.description}</td><td><input type="checkbox" name="status" id="status" onclick="updateTodo(event,${el.id},${el.status})"></td><td>${new Date(el.due_date).toDateString()}</td><td><button type="button" class="btn btn-danger" onclick="deleteTodo(event,${el.id})">Delete</button></td><td><button type="button" class="btn btn-warning" onclick="editTodoPage(event,${el.id})">Edit</button></td></tr>`)
                } else {
                    $('#listTodo').append(`<tr><td>${num}</td><td>${el.title}</td><td>${el.description}</td><td><input checked type="checkbox" onclick="updateTodo(event,${el.id},${el.status})" name="status" id="status"></td><td>${new Date(el.due_date).toDateString()}</td><td><button type="button" class="btn btn-danger" onclick="deleteTodo(event,${el.id})">Delete</button></td><td><button type="button" class="btn btn-warning" onclick="editTodoPage(event,${el.id})">Edit</button></td></tr>`)
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

    $.ajax(`${baseUrl}/login`, {
            method: 'POST',
            data: {
                email: loginEmail,
                password: loginPassword
            }
        })
        .done((data) => {
            console.log('data', data);
            localStorage.accesstoken = data.token
            $('#loginEmail').val('')
            $('#loginPassword').val('')
            homeAfterLogin()
            $('#errLogin').empty()
        })
        .fail((err) => {
            console.log('err', err);
            $('#errLogin').empty()
            $('#errLogin').append(err.responseJSON.message)
        })
        .always(() => {
            console.log('selesai');
        })
}



function editTodo(event){
    event.preventDefault()
    $.ajax(`${baseUrl}/todos/${idSelected}`, {
        method: 'PUT',
        data: {
            title:$('#editTodoTitle').val(),
            description:$('#editTodoDescription').val(),
            due_date:$('#editTodoDue_date').val()
        },
        headers: {
            accesstoken: localStorage.accesstoken
        }
    })
    .done((data) => {
        idSelected = null
        swal("Done!", "Todo is updated!", "success");
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

function logOutButton(event) {
    $('.logoutButton').click(function() {
        localStorage.clear()
        homeBeforeLogin()
    })
}

function updateTodo(event, id, status) {
    let statusUpdated = null
    if (status == false) {
        statusUpdated = true
    } else {
        statusUpdated = false
    }
    $.ajax(`${baseUrl}/todos/${id}/status`, {
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