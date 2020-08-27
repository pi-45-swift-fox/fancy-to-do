function onSignIn(googleUser) {
    const google_token = googleUser.getAuthResponse().id_token;
    $.ajax('http://localhost:3000/google-login',{
    method: 'POST',
    headers: {
        google_token
    }
    })
    .done((data)=>{
        localStorage.accessToken = data
        showHomePage()  
    })
    .fail(err =>{
        console.log('err', err);
    })
    .always(()=>{
        console.log('selesai');
    })

}

function showLogin() {
    $('#registerPage').hide();
    $('#loginPage').show();
    $('#homePage').hide();
    $('#addTodos').hide();
    $('#get1Todo').hide();
    $('#updateTodo').hide();
    $('#calender-page').hide()
}

function showHomePage() {
    $('#bodyTable').empty()
    $('#registerPage').hide()
    $('#loginPage').hide()
    $('#homePage').show()
    $('#addTodos').hide()
    $('#get1Todo').hide()
    $('#updateTodo').hide()
    $('#calender-page').hide()

    $.ajax('http://localhost:3000/todos', {
        method: 'GET',
        headers: {
            accesstoken: localStorage.accessToken
        }
})
.done(function (data){
    $('#bodyTable').empty()
    $('#registerPage').hide()
    $('#loginPage').hide()
    $('#homePage').show()
    $('#addTodos').hide()
    data.forEach(e => {
        $('#bodyTable').append(`
        <tr>
        <th scope="col">${e.title}</th>
        <td>${e.description}</td>
        <td>${e.status}</td>
        <td>${e.Due_date}</td>
        <td><button id="see${e.id}" class="btn btn-success">Lihat</button></td>
        </tr>
        `)

        $(`#see${e.id}`).click( event=> {
            event.preventDefault()
            getTodo1(e)
        })
    });
})
.fail(function (err){
    console.log('err',err);
})
.always(function (){
    console.log('selesai');
})
}

function showRegister() {
    $('#registerPage').show()
    $('#loginPage').hide()
    $('#homePage').hide()
    $('#addTodos').hide()
    $('#get1Todo').hide()
    $('#updateTodo').hide()
    $('#calender-page').hide()
}

function showOne(){
    $('#registerPage').hide()
    $('#loginPage').hide()
    $('#homePage').hide()
    $('#addTodos').hide()
    $('#get1Todo').show()
    $('#updateTodo').hide()
    $('#calender-page').hide()

}

function showUpdate() {
    $('#registerPage').hide()
    $('#loginPage').hide()
    $('#homePage').hide()
    $('#addTodos').hide()
    $('#get1Todo').hide()
    $('#updateTodo').show()
    $('#calender-page').hide()

}

function showHolidays() {
    $('#registerPage').hide()
    $('#loginPage').hide()
    $('#homePage').hide()
    $('#addTodos').hide()
    $('#get1Todo').hide()
    $('#updateTodo').hide()
    $('#calender-page').show()

}

function getTodo1(todo) {
    $.ajax(`http://localhost:3000/todos/${todo.id}`, {
        method: 'GET',
        headers: {
            accesstoken: localStorage.accessToken
        }
    })
    .done((data)=>{
        $('#todo1').empty()
        showOne()
        $('#todo1').append(`
         <h3 class="text-center"> ${data.title}</h2>
         <br><br>
         <p>
         Description    : ${data.description} <br>
         Status         : ${data.status} <br>
         Will Be do in  : ${data.Due_date}
         </p>

         <br>
         <button id="edit${data.id}" class="btn btn-primary">Ubah</button> <button id="delete${data.id}" class="btn btn-danger">Hapus</button> <button type="button" id="back" class="back btn btn-secondary">Back</button>
         `)

         $(`#edit${data.id}`).click(event=> {
             event.preventDefault()
             updateTodo(data)
         })

         $(`#delete${data.id}`).click(event=> {
            event.preventDefault()
            deleteTodo(data)
        })

        $('#back').click(event => {
            event.preventDefault()
            showHomePage()
        })
         
    })
    .fail(err => {
        console.log('error',err);
    })
    .always('selesai')
}

function updateTodo(todo) {
    let dateValue = todo.Due_date
    let slicedDate = dateValue.slice(0,10)
    let checkStatus = todo.status
    switch (checkStatus) {
        case true:
            result ='selected'
            break;
        case false:
            result= 'selected'
            break;
        default:
            result= ''
            break;
    }
    showUpdate()
    $('#update-todo').empty()
    $('#update-todo').append(`
    <h3 class="text-center mt-10">Update Todo</h3>
    <form action="localhost:3000/todos/${todo.id}" method="PUT" id="updateForm">
        <div class="form-group">
        <label for="Title">Title</label>
        <input type="text" class="form-control"  name="title" id="title-update"
        value="${todo.title}">
        </div>
        <div class="form-group">
        <label for="Description">Descript this Todo</label>
        <input type="text" class="form-control" name="description" id="description-update" value="${todo.description}">
        </div>
        <div class="form-group">
            <label for="status">Status this todo now</label>
            <select class="custom-select" name="status" id="status-update" value="${todo.status}">
                <option ${result}>Choose</option>
                <option value="true" ${result}>True</option>
                <option value="false" ${result}>False</option>
            </select>
        </div>
        <div class="form-group">
        <label for="Due_date">Will be do in</label>
        <input type="date" class="form-control" name="Due_date" id="Due_date-update" value="${slicedDate}">
        <small id="duedatesm" class="form-text text-muted">Please don't fill the expired date </small>
        </div> 
        <div class="mx-auto" style="width: 180px;">           
        <button type="submit" class="btn btn-primary">Update</button> <button type="button" id="backHome" class="btn btn-danger">cancel</button>
        </div>
    </form>
    `)

    $('#updateForm').submit(event => {
        event.preventDefault()
        const title = $('#title-update').val()
        const description = $('#description-update').val()
        const status = $('#status-update').val()
        const Due_date = $('#Due_date-update').val()

        $.ajax(`http://localhost:3000/todos/${todo.id}`, {
            method: 'PUT',
            headers: {
                accesstoken: localStorage.accessToken
            },
            data: {
                title,
                description,
                status,
                Due_date
            }
        })
        .done(()=>{
            showHomePage()
        })
        .fail(err => {
            console.log(err);
        })
        .always(()=>{
            console.log('selesai');
        })
    })

    $('#backHome').click(event => {
        event.preventDefault()
        showHomePage()
    })

}

function deleteTodo(todo) {
    $.ajax(`http://localhost:3000/todos/${todo.id}`,{
        method: 'DELETE',
        headers: {
            accesstoken: localStorage.accessToken
        }
    })
    .done(()=>{
        showHomePage()
    })
    .fail(err => {
        console.log(err);
    })
    .always(()=>{
        console.log('selesai');
    })
}

function getHoliday(year) {
    $.ajax('http://localhost:3000/holidays',{
        method: 'POST',
        data: {
            year
        },
        headers: {
            accesstoken: localStorage.accessToken
        }
    })
    .done(function (data){
        $('#bodyTableHolidays').empty()

        $('#heading-year').empty()
        $('#heading-year').append(`
        <h2 class="text-center">${year}</h2>
        `)
        data.forEach(e => {
            $('#bodyTableHolidays').append(`
            <tr style="background-color: silver;">
            <th scope="row">${e.name}</th>
            <td>${e.weekdayName}</td>
            <td>${e.date}</td>
            <td>${e.types[0].name}</td>
            </tr>
            `)
        });
        console.log(data);
    })
    .fail(function (err){
        console.log('err',err);
    })
    .always(function (){
        console.log('selesai');
    })
}
$(document).ready(function (){
    if (!localStorage.accessToken) {
        showLogin()
    } else {            
        showHomePage()
    }
    $('.btn-home').click(event => {
        event.preventDefault()
        showHomePage()
    })
    
    $('.btn-holidays').click(event => {
        event.preventDefault()
        showHolidays()
    })
    $('#add-year-btn').click(event => {
        event.preventDefault()
        const year = $('#calender-year').val()
        getHoliday(year)
    })

    $('#formLogin').submit(function (event) {
        event.preventDefault()
        
        const email = $('#email').val()
        const password = $('#password').val()

        $.ajax('http://localhost:3000/login', {
            method: 'POST',
            data: {
                email,
                password
            }
        })
        .done(function (data){
            localStorage.accessToken = data
            const email = $('#email').val('')
            const password = $('#password').val('')
            showHomePage()    
        })
        .fail(function (err){
            console.log('err',err);
        })
        .always(function (){
            console.log('selesai');
        })

    })

    $('#registerBtn').click(function (e){
        e.preventDefault()
        showRegister()
    })
    $('#formRegister').submit(function (event) {
        event.preventDefault()
        const email = $('#emailRegister').val()
        const password = $('#passwordRegister').val()
        const role = $('#role').val()

        $.ajax('http://localhost:3000/register', {
            method: 'POST',
            data: {
                email,
                password,
                role
            }
        })
        .done(function (){
            console.log('berhasil');
            $('#emailRegister').val('')
            $('#passwordRegister').val('')
            $('#role').val('')
            showLogin()
        })
        .fail(function (err){
            $('#error-message-register').text(err.responseJSON)
            console.log(err);
        })
        .always(function (){
            console.log('selesai');
        })

    })

    $('#addtodoBtn').click(function(e){
        e.preventDefault()

        $('#registerPage').hide()
        $('#loginPage').hide()
        $('#homePage').hide()
        $('#addTodos').show()
    })

    $('#addForm').submit(function(e){
        e.preventDefault()

        const title = $('#title').val()
        const description = $('#description').val()
        const status = $('#status').val()
        const Due_date = $('#Due_date').val()

        $.ajax('http://localhost:3000/todos', {
        method: 'POST',
        data: {
            title,
            description,
            status,
            Due_date
        }, 
        headers: {
            accesstoken: localStorage.accessToken
        }
        })
        .done(function (data){
            $('#title').val('')
            ('#description').val('')
            ('#status').val('')
            ('#Due_date').val('')
            showHomePage()

        })
        .fail(function (err){
            $('#error-message-addTodo').text(err.responseJSON)
            console.log(err);
        })
        .always(function (){
            console.log('selesai');
        })
    })

    $('#btn-showLogin').click(event => {
        event.preventDefault()
        showLogin()
    })
    $('#logout').click(function (e){
        e.preventDefault()
        const auth2 = gapi.auth2.getAuthInstance()
        auth2.signOut()
        .then(()=>{
            localStorage.removeItem('accessToken')
            showLogin()
        })
        .catch(err => {
            console.log(err);
        })
        localStorage.removeItem('accessToken')
        showLogin()
    })
})