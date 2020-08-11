const store = {
    selectedId: null
}

$(document).ready(() => {
    isLogin()
    // event click
    $(".back").click(event=>{
        event.preventDefault()
        showHomepage()
        showTodo()
    })
    $('#addListTodos').click(event => {
        event.preventDefault()
        console.log("click")
        showAddTodoList()
    })

    $('.backRegister').click(event => {
        event.preventDefault()
        showLogin()
    })

    //event form
    $("#addtodolist-form").submit(event => {
        event.preventDefault()
        $(".ERROR").empty()

        const title = $("#todo-title").val()
        const description = $("#todo-description").val()
        const status = $("#todo-status").val()
        const due_date = $("#todo-due_date").val()
        console.log(title, description, status, due_date)

        $.ajax('http://localhost:3000/todos', {
                method: "post",
                data: {
                    title,
                    description,
                    status,
                    due_date
                },
                headers: {
                    access_token: localStorage.token
                }
            })
            .done(data => {
                showHomepage()
                showTodo()
            })
            .fail(err => {
                console.log(err)
                const errors = err.responseJSON.message
                console.log(err.responseJSON.message)
                showError(errors)
            })
            .always(() => {
                console.log('sukses menambahkan data')
            })
    })

    $("#updateTodo-form").submit(event=>{
        event.preventDefault()
        const title = $("#update-todo-title").val()
        const description = $("#update-todo-description").val()
        const status = $("#update-todo-status").val()
        const due_date = $("#update-todo-due_date").val()
        $.ajax(`http://localhost:3000/todos/${store.selectedId}`,{
            method : "PUT",
            data : {
                title,
                description,
                status,
                due_date
            },
            headers: {
                access_token: localStorage.token
            }
        })
        .done(data=>{
            store.selectedId = null
            showHomepage()
            showTodo()
        })
        .fail(err=>{
            const errors = err.responseJSON.message
            console.log(err.responseJSON.message)
            showError(errors)
        })
        .always(()=>{
            console.log('Update berhasil')
        })
    })
})

function isLogin() {
    const check = localStorage.token
    if (check) {
        showHomepage()
        showTodo()
    } else {
        showLogin()
    }
}

function showLogin() {
    $(".form-login").show()
    $(".form-register").hide()
    $("#homepage").hide()
    $("#addtodolist-form").hide()
    $("#updateTodo-form").hide()
    $(".ERROR").empty()
    login()
}

function showRegister() {
    $(".form-login").hide()
    $(".form-register").show()
    $("#homepage").hide()
    register()
}

function showError(error) {
    $(".ERROR").empty()
    const errors = error.forEach(el => {
        $(".ERROR").append(` <span class="inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 m-3">${el}</span>
        `)
    });
}

function register() {
    $("#register-form").submit(event => {
        event.preventDefault()
        const email = $('#email-register').val()
        const password = $('#password-register').val()
        console.log(email, password)
        $.ajax('http://localhost:3000/register', {
            method: "POST",
            data: {
                email,
                password
            }
        }).done(data => {
            console.log(data)
            let str = ''
            for (let i = 0; i < data.email.length; i++) {
                if (data.email[i] === '@') {
                    break
                }
                str += data.email[i]
            }
            $("#welcome-text").html(`<h2> User ${str} has registered. Please sign in </h2>`)
            isLogin()
        }).fail(err => {
            const errors = err.responseJSON.message
            showError(errors)
        }).always(() => {
            console.log('Registrasi Berhasil')
        })
    })
}

function login() {
    $("#register-button").click(event => {
        showRegister()
    })
    $('#login-form').submit(event => {
        event.preventDefault()
        const email = $('#login-email').val()
        const password = $('#login-password').val()

        $.ajax('http://localhost:3000/login', {
            method: "POST",
            data: {
                email,
                password
            }
        }).done(data => {
            localStorage.token = data.token
            localStorage.userId = data.id
            localStorage.name = data.email
            isLogin()
        }).fail(err => {
            const errors = err.responseJSON.message
            console.log(err.responseJSON.message)
            showError(errors)
        }).always(() => {
            console.log('Login Berhasil')
        })
    })
}

function showHomepage() {
    $(".ERROR").empty()
    $(".form-login").hide()
    $(".form-register").hide()
    $("#homepage").show()
    $("#addtodolist-form").hide()
    $("#updateTodo-form").hide()
    $("#logoutButton").click(event => {
        event.preventDefault()
        localStorage.clear()
        showLogin()
    })
    let str = ''
    for (let i = 0; i < localStorage.name.length; i++) {
        if (localStorage.name[i] == '@') {
            break
        }
        str += localStorage.name[i]
    }
    $("#current-user").text(`LIST TO DO OF USER ${str.toUpperCase()}`)

}

function showTodo() {
    $('#TODO').empty()
    $.ajax("http://localhost:3000/todos", {
            method: 'get',
            headers: {
                access_token: localStorage.token
            }
        })
        .done(data => {
            data.forEach(el => {
                const dueDate = new Date(el.due_date).toDateString()
                $("#TODO").append(`
                <tr>
                <td class="border px-4 py-2">${el.title}</td>
                    <td class="border px-4 py-2">${el.description}</td>
                    <td class="border px-4 py-2">${el.status}</td>
                    <td class="border px-4 py-2">${dueDate}</td>
                    <td>
                    <button id="editTodo${el.id}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Edit
                    </button>
                    <button id="deleteTodo${el.id}" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                    Delete
                    </button>
                    <button id="showTodo${el.id}" class="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Show
                    </button></td>
                    </tr>
                `)

                $(`#editTodo${el.id}`).click(event => {
                    event.preventDefault()
                    updateForm(el)
                    showUpdateForm()
                    store.selectedId = el.id
                })

                $(`#deleteTodo${el.id}`).click(event =>{
                    event.preventDefault()
                    destroyTodo(el.id)
                })
                
            })
        })
        .fail(err => {
            console.log(err)
        })
        .always(() => {
            console.log('SHOW TODO NIH')
        })
}

function destroyTodo(id){
    $.ajax(`http://localhost:3000/todos/${id}`, {
        method : "delete",
        headers: {
            access_token: localStorage.token
        }
    })
    .done(data=>{
        showHomepage()
        showTodo()
    })
    .always(()=>{
        console.log('Delete berhasil')
    })
}

function showAddTodoList() {
    $(".form-login").hide()
    $(".form-register").hide()
    $("#homepage").hide()
    $("#addtodolist-form").show()
    $("#updateTodo-form").hide()

}

function updateForm(data){
    $("#update-todo-title").val(data.title)
    $("#update-todo-description").val(data.description)
    $("#update-todo-status").attr(`${data.status}`, true)
    $("#update-todo-due_date").val(`${data.due_date}`)
}

function showUpdateForm(){
    $(".form-login").hide()
    $(".form-register").hide()
    $("#homepage").hide()
    $("#addtodolist-form").hide()
    $("#updateTodo-form").show()
}