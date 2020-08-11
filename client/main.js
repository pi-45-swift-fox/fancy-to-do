$(document).ready(()=>{
    isLogin()
})

function isLogin(){
    const check = localStorage.token
    if(check){
        showHomepage()
        showTodo()
    }else{
        showLogin()
    }
}

function showLogin(){
    $(".form-login").show()
    $(".form-register").hide()
    $("#homepage").hide()
    $("#addtodolist-form").hide()
    login()
}

function showRegister(){
    $(".form-login").hide()
    $(".form-register").show()
    $("#homepage").hide()
    register()
}

function showError(error){
    $(".ERROR").empty()
    const errors = error.forEach(el => {
        $(".ERROR").append(` <span class="inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 m-3">${el}</span>
        `)
    });
}

function register(){
    $("#register-form").submit(event=>{
        event.preventDefault()
        const email = $('#email-register').val()
        const password = $('#password-register').val()
        console.log(email, password)
        $.ajax('http://localhost:3000/register',{
            method: "POST",
            data : {
                email,password
            }
        }).done(data=>{
            console.log(data)
            // isLogin()
        }).fail(err=>{
            const errors = err.responseJSON.message
            showError(errors)            
        }).always(()=>{
            console.log('Registrasi Berhasil')
        })
    })
}

function login(){
    $("#register-button").click(event=>{
        showRegister()
    })
    $('#login-form').submit(event=>{
        event.preventDefault()
        const email = $('#login-email').val()
        const password = $('#login-password').val()
        
        $.ajax('http://localhost:3000/login',{
            method: "POST",
            data : {
                email,password
            }
        }).done(data=>{
            localStorage.token = data.token
            localStorage.userId = data.id
            localStorage.name = data.email
            isLogin()
        }).fail(err=>{
            const errors = err.responseJSON.message
            showError(errors)            
            console.log(err)
        }).always(()=>{
            console.log('Login Berhasil')
        })
    })
}

function showHomepage(){
    $(".form-login").hide()
    $(".form-register").hide()
    $("#homepage").show()
    $("#logoutButton").click(event=>{
        event.preventDefault()
        localStorage.clear()
        showLogin()
    })
    let str = ''
    for (let i = 0; i < localStorage.name.length; i++) {
        if(localStorage.name[i] == '@'){
            break
        }
        str += localStorage.name[i]
    }

    $("#current-user").text(`LIST TO DO OF USER ${str.toUpperCase()}`)
}

function showTodo(){
    $('#TODO').empty()
    $.ajax("http://localhost:3000/todos",{
        method : 'get',
        headers : {
            access_token : localStorage.token
        }
    })
    .done(data=>{
        data.forEach(el=>{
            $("#TODO").append(`
            <tr>
            <td class="border px-4 py-2">${el.title}</td>
                <td class="border px-4 py-2">${el.description}</td>
                <td class="border px-4 py-2">${el.status}</td>
                <td class="border px-4 py-2">${el.due_date}</td>
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
        })
        console.log(data)
    })
    .fail(err=>{
        console.log(err)
    })
    .always(()=>{
        console.log('SHOW TODO NIH')
    })
}

function add(){
    $('#addListTodos').click(event=>{
        event.preventDefault()
        showAddTodoList()
    })
}

function showAddTodoList(){
    $(".form-login").hide()
    $(".form-register").hide()
    $("#homepage").hide()
    $("#addtodolist-form").show()
}

function addTodoList(){
    $("#addtodolist-form").submit(event=>{
        event.preventDefault()
        const title = $("#todo-title").val()
        const description = $("#todo-description").val()
        const status = $("#todo-status").val()
        const due_date = $("#todo-due_date").val()
        console.log(title,description,status,due_date)
    })
}