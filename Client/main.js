

 $(document).ready(function(){
    if(localStorage.token){
        afterLogin()
    }
    else{
       beforeLogin()
    }
 })
 function afterLogin(){
        showTodos()
        $('#todos').show()
        $('#addTodo').hide()
        $('#updateTodo').hide()
        $('#registerForm').hide()
        $('#loginForm').hide()
        $('#updateTodo').hide()
        $('#content').hide()
        $('#loginButton').hide()
        $('#registerButton').hide()
        $('#content').hide()
        $('#logoutButton').show()

 }
 function beforeLogin(){
    $('#content').show()

    $('#addTodo').hide()
    $('#todos').hide()
    $('#loginButton').show()
    $('#registerButton').show()
    $('#logoutButton').hide()
    $('#registerForm').hide()
    $('#loginForm').hide()
    $('#updateTodo').hide()

 }
$(document).on("click","#logoutButton",function(){
    localStorage.removeItem('token')
    beforeLogin()
})
function showTodos(){
    $.ajax({
        url:'http://localhost:3000/todos',
        method:'GET',
        headers:{accesstoken:localStorage.token}
    })
    .done(function(data){
        console.log('ini data>>>>',data)
        data.forEach(el => {
            $('#todoList').append(`
            <tr class="todoRow">
                <td>${el.title}</td>
                <td>${el.description}</td>
                <td>${el.status}</td>
                <td>${el.due_date}</td>

                <td><button type="button" class="todo-DelBut" dataId="${el.id}">Delete</button> <button class="todo-UpdBut" dataId="${el.id}">Update</button></td>
                

            </tr>  
            `)
        });
       // $('#todos').show()
        // $('#loginForm').hide()
        // $('#registerForm').hide()

    })
    .fail(function(err){
        console.log(err)
    })
    .always(function(){
        console.log('exe')
    })
}
function showTodosById(id){
    $.ajax({
        url:`http://localhost:3000/todos/${id}`,
        method:'GET',
        headers:{accesstoken:localStorage.token}
    })
    .done(function(data){
        $('#updTitle').val(data.title),
        $('#updDescription').val(data.description),
        $('#updStatus').val(data.status),
        $('#updDue_date').val(data.due_date.split('T')[0])
    })
    .fail(function(err){
        console.log(err)
    })
    .always(function(){

    })
}
function updateTodoForm(id){
    let data={
        title:$('#updTitle').val(),
        description:$('#updDescription').val(),
        status:$('#updStatus').val(),
        due_date:$('#updDue_date').val()
    }
    console.log(data)
    $.ajax({
        url:`http://localhost:3000/todos/${id}`,
        method:'PUT',
        headers:{
            accesstoken:localStorage.token
        },
        data:{
            title:$('#updTitle').val(),
            description:$('#updDescription').val(),
            status:$('#updStatus').val(),
            due_date:$('#updDue_date').val()
        }
    })
    .done(function(data){
        $('.todoRow').remove()
        showTodos()
        $('#updateTodo').hide()

    })
    .fail(function(err){
        console.log(err)
    })
    .always(function(){

    })
}
function addTodo(event){
    event.preventDefault()
    let data={
        title:$('#title').val(),
        description:$('#description').val(),
        status:$('#status').val(),
        due_date:$('#due_date').val()
    }
    console.log(data)
    $.ajax({
        url:'http://localhost:3000/todos',
        method:'POST',
        headers:{accesstoken:localStorage.token},
        data:{
            title:$('#title').val(),
            description:$('#description').val(),
            status:$('#status').val(),
            due_date:$('#due_date').val()
        }
    })
    .done(function(data){
        $('#addTodo').hide()

        $('.todoRow').remove()
        showTodos()

    })
    .fail(function(err){
        console.log(err)
    })
    .always(function(){
        console.log('POST DATA')
    })
}
function deleteTodo(id){
    $.ajax({
        url:`http://localhost:3000/todos/${id}`,
        method:'DELETE',
        headers:{accesstoken:localStorage.token}

    })
    .done(function(data){
        $('.todoRow').remove()
        showTodos()
    })
    .fail(function(err){
        console.log(err)
    })
    .always(function(){
        
    }) 

}
function registerUser(event){
    event.preventDefault()
    
     console.log($('#inputRegisterEmail').val())
     console.log($('#inputRegisterPassword').val())

     $.ajax({
         url:'http://localhost:3000/register',
         method:'POST',

         data:{
             email:$('#inputRegisterEmail').val(),
             password:$('#inputRegisterPassword').val()
         }
     })
    .done(function(data){
        console.log(data)
        beforeLogin()
        $('#inputRegisterEmail').val('')
    $('#inputRegisterPassword').val('')
    })
    .fail(function(err){
        console.log(err)
    })
    .always(function(){
        console.log('good')
    })

     
}
function loginUser(event){
    event.preventDefault()
    $.ajax({
        url:'http://localhost:3000/login',
        method:'POST',

        data:{
            email:$('#inputLoginEmail').val(),
            password:$('#inputLoginPassword').val()
        }
    })
    .done(function(data){
        afterLogin()
        $('#tableTitle').text(`Todo of ${data.email}`)

        console.log(data)
        localStorage.token=data.token
        showTodos()
    })
    .fail(function(err){
        
        console.log(err)
    })
    .always(function(){
        $('#inputLoginEmail').val('')
    $('#inputLoginPassword').val('')
        console.log('good')
    })
    
}


$(document).on("click",".todo-DelBut",function(){
        console.log('gas')
        let todoId=$(this).attr("dataId")
        console.log(todoId)

        deleteTodo(todoId)
        
})
$(document).on("click",".todo-UpdBut",function(){
    console.log('gas')
    let todoId=$(this).attr("dataId")

    $('#todoIdSaver').val(todoId)
    showTodosById(todoId)
    $('#updateTodo').show()
        
})
$(document).on("click",'#submitUpdTodo',function(){
    // console.log('ini cobaliattt >>>>',$('#todoIdSaver').val)
    updateTodoForm($('#todoIdSaver').val())

})
function showAddTodoForm(event){
    event.preventDefault()
    $('#addTodo').show()

}
$(document).on("click",'#loginButton',function(){
    $('#registerForm').hide()

    $('#loginForm').show()

})
$(document).on("click",'#loginRef',function(){
    $('#registerForm').hide()
    $('#loginForm').show()

})
$(document).on("click",'#registerButton',function(){
    $('#loginForm').hide()
    $('#registerForm').show()
})
