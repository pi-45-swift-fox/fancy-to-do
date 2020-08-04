let baseUrl = 'http://localhost:3000'

$(document).ready(() => {
    auth()
})


function auth() {
    if (localStorage.access_token) {
        homepage()
    } else {
        loginPage()
        $('#nav').hide()
        $('.page').hide()
    }
}

function loginPage() {
    $('.registerpage').hide()
    $('.loginpage').show()
}

function registerPage() {
    $('.loginpage').hide()
    $('.registerpage').show()
}

function openNav() {
    $('#mySidenav').width(250)
}

function closeNav() {
    $('#mySidenav').width(0)
}

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

function logout(event) {
    $('body').css('background-image', 'url(https://images.unsplash.com/photo-1595814304795-04e0ae903ae8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60)'); 
    event.preventDefault()
    closeNav()
    localStorage.clear()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log('User signed out.');
    });
    Toast.fire({
        icon: 'success',
        title: 'Logged Out'
    })
    auth()
}

function homepage() {
    $('body').css('background-image', 'url(https://cdn.nevadaappeal.com/wp-content/uploads/sites/2/2019/11/Tile-NAP-Road9-1024x683.jpg)'); 
    $('.page').show()
    $('#nav').show()
    $('.loginpage').hide()
    $('.registerpage').hide()
    showTodo()
    closeNav()
}

function login(event) {
    event.preventDefault()
    const email = $('#email-login').val()
    const password = $('#password-login').val()
    $.ajax({
            method: 'POST',
            url: baseUrl + '/login',
            data: {
                email,
                password
            }
        })
        .done(data => {
            localStorage.setItem('access_token', data.access_token)

            Toast.fire({
                icon: 'success',
                title: 'Logged in successfully'
            })
            auth()
        })
        .fail(err => {
            Toast.fire({
                icon: 'error',
                title: err.responseJSON.message
            })
            auth()
        })
}

function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
            method: 'POST',
            url: baseUrl + '/googlesign',
            data: {
                id_token
            }
        })
        .done(data => {
            localStorage.setItem('access_token', data.access_token)
            Toast.fire({
                icon: 'success',
                title: 'Logged in successfully'
            })
            auth()
        })
        .fail(err => {
            console.log(err)
        })
}

function register(event) {
    event.preventDefault()
    const email = $('#email-register').val()
    const password = $('#password-register').val()
    $.ajax({
            method: 'POST',
            url: baseUrl + '/register',
            data: {
                email,
                password
            }
        })
        .done(data => {
            console.log(data);
            localStorage.setItem('access_token', data.access_token)
            Toast.fire({
                icon: 'success',
                title: 'Registered successfully'
            })
            auth()
        })
        .fail(err => {
            Toast.fire({
                icon: 'error',
                title: err.responseJSON.message
            })
            auth()
        })
}

function showTodo() {
    $('.content-body').empty()
    $.ajax({
            method: 'GET',
            url: `${baseUrl}/todos`,
            headers: {
                access_token: localStorage.access_token
            }
        })
        .done(result => {
            $('.content-body').empty()
            for (i in result) {
                let monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                let date = new Date(result[i].Due_date)
                let day = date.getDate()
                let monthVal = date.getMonth()
                let month = monthName[monthVal]
                let year = date.getFullYear()
                $('.content-body').append(`
                <div id="todo-card">
                <h2 style="color: black;">${result[i].title}</h1>
                <h4 style="color: black;">${result[i].description}</h3>
                <h4 style="color: black;">status: ${result[i].status}</h3>
                <h4 style="color: black;">Due Date : ${day} ${month} ${year}</h3>
                <div id="actionbtn">
                <a style="color: lightskyblue;" href="#" onclick="editTodo(${result[i].id})"><h3>Edit</h3></a> 
                <a style="color: lightskyblue;" href="#" onclick="deleteTodo(${result[i].id})"><h3>Delete</h3></a>
                <a style="color: lightskyblue;" href="#" onclick="getQr('${result[i].title + ':' + result[i].description}')"><h3>Get QR</h3></a>
                </div>
                </div>
                `)
            }
        })
        .fail(err => {
            err.responseJSON.errors.forEach(data => {
                Swal.fire({
                    icon: 'error',
                    title: data.msg
                })
            })
        })
}

function getQr(input) {
    Swal.fire({
        title: 'Your QR Todo',
        html: '<img id="qr" style="width: 150px; height: 150px;">',
        focusConfirm: false,
        showCancelButton: true,
    })
    $('#qr').attr('src', `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${input}`)
}

function add() {
    closeNav()
    Swal.fire({
        title: 'Add Todo',
        html: '<label>title</label>' +
            '<input id="swal-input1-add" class="swal2-input" placeholder="title">' +
            '<label>description</label>' +
            '<input id="swal-input2-add" class="swal2-input" placeholder="description">' +
            '<label>status</label>' +
            '<input id="swal-input4-add" class="swal2-input" placeholder="status">' +
            '<label>due date</label>' +
            '<input id="swal-input3-add" class="swal2-input" type="date" placeholder="due date">',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            let title = $('#swal-input1-add').val()
            let description = $('#swal-input2-add').val()
            let fulldate = new Date($('#swal-input3-add').val())
            let status = $('#swal-input2-add').val()
            let Due_date = fulldate
            let data = {
                title,
                description,
                status,
                Due_date
            }
            $.ajax({
                    method: 'POST',
                    url: `${baseUrl}/todos`,
                    headers: {
                        access_token: localStorage.access_token
                    },
                    data
                })
                .done((result) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success add new Todo'
                    })
                    auth()
                })
                .fail((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed add new Todo'
                    })
                })
        }
    })
}

function deleteTodo(id) {
    Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                return $.ajax({
                    method: 'DELETE',
                    url: `${baseUrl}/todos/${id}`,
                    headers: {
                        access_token: localStorage.access_token
                    }
                })
            } else {

            }
        })
        .then((data) => {
            if (data) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success Delete Todo'
                })
            }
            auth()
        })
        .catch(err => {
            Swal.fire(
                'Failed!',
                'Cannot delete Todo.',
                'error'
            )
        })
}

function editTodo(id) {
    $.ajax({
            method: 'GET',
            url: `${baseUrl}/todos/${id}`,
            headers: {
                access_token: localStorage.access_token
            }
        })
        .done((result) => {
            let date = result.Due_date
            // let day = date.getDate()
            console.log(date);
            console.log(result.Due_date, '< ini di edit');
            Swal.fire({
                title: 'Edit Todo',
                html: `<label>title</label>
                    <input id="swal-input1-edit" class="swal2-input" value="${result.title}">
                    <label>description</label>
                    <input id="swal-input2-edit" class="swal2-input" value="${result.description}">
                    <label>Status</label>
                    <select id="swal-input3-edit" class="swal2-input">
                    <option selected value="${result.status}">${result.status}</option>
                    <option value="Done" >Done</option>
                    <option value="On-Going" >On-Going</option>
                    </select>
                    <label>Due Date</label> 
                    <input id="swal-input4-edit" class="swal2-input" type="date" values="${result.Due_date}">`,
                focusConfirm: false,
                showCancelButton: true,
                preConfirm: () => {
                    console.log('here preconfirm');
                    let title = $('#swal-input1-edit').val()
                    let description = $('#swal-input2-edit').val()
                    let status = $('#swal-input3-edit').val()
                    let Due_date = $('#swal-input4-edit').val()
                    console.log(Due_date);
                    let data = {
                        title,
                        description,
                        status,
                        Due_date
                    }
                    console.log(data);
                    $.ajax({
                            method: 'PUT',
                            url: baseUrl + '/todos/' + id,
                            headers: {
                                access_token: localStorage.access_token
                            },
                            data
                        })
                        .done((result) => {
                            if (result) {
                                showTodo()
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Success Update Todo'
                                })
                            }
                        })
                }
            })
        })
        .fail((err) => {
            console.log(err);
        })
}