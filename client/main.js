$(document).ready(function () {
  checkLogin()
  todayDate()

});


function checkLogin() {
  if (localStorage.token) {
    fetchTodoList()
    $("#welcome").hide()
    $("#btnLogin").hide()
    $("#btnRegis").hide()
    $("#login").hide()
    $("#regis").hide()
    $("#after-login").show()
    $("#btnLogOut").show()
    $('#updateFields').hide()
  } else {
    $("#welcome").show()
    $("#login").hide()
    $("#regis").hide()
    $("#after-login").hide()
    $("#notif").hide()
    $("#btnLogOut").hide()
    $('#updateFields').hide()
  }
}


function fetchTodoList() {
  $.ajax({
    method: "GET",
    url: 'http://localhost:3000/todos',
    headers: {
      access_token: localStorage.token,
    }
  })
    .done((todos) => {
      // $('#qrcode').attr('src', `${datez}`)
      let todoData = ""
      $("#todos-list").empty();
      todos.forEach((element, index) => {
        todoData = todoData + ` [ ${index + 1} (${element.title}) (${element.description}) (${element.status}) (${element.due_date}) ]`;
        $("#todos-list").append(`
      <tr>
        <th scope="row">${index + 1}</th>
        <td>${element.title}</td>
        <td>${element.description}</td>
        <td>${element.status}</td>
        <td>${element.due_date}</td>
        <td><button class="btn btn-primary" onclick="editTodo(${element.id})">Edit</button><button class="btn btn-danger" onclick="deleteTodo(${element.id})">Delete</button></td>
      </tr>      
      `)
      });
      $.ajax({
        method: "GET",
        url: 'http://localhost:3000/qrcode',
        data: {
          txt: todoData
        }
      })
        .done((link) => {
          $('#qrcode').attr('src', `${link}`)
        })
    })
    .fail((err) => {
      $("#notif").show("slow");
      $("#notif").text(err.responseJSON.message || err)
      setTimeout(function () {
        $("#notif").fadeOut("slow");
      }, 10000);
      console.log(err.responseJSON.message)
    })
}


function todayDate() {
  const d = new Date()
  // console.log()
  const monthz = d.getMonth() < 10 ? '0' + d.getMonth() : d.getMonth()
  const dayz = d.getDay() < 10 ? '0' + d.getDay() : d.getDay()
  const datez = `${d.getFullYear()}-${monthz}-${dayz}`
  $('#date').attr('min', `${datez}`)
}
function addTodo(event) {
  event.preventDefault()
  const dateTime = new Date(`${$("#date").val()} ${$("#time").val()}`)
  const dateTodo = '' + dateTime
  console.log($("#time").val(), '<<<<<<')
  $.ajax({
    method: "POST",
    url: "http://localhost:3000/todos",
    headers: {
      access_token: localStorage.token
    },
    data: {
      due_date: dateTodo,
      title: $('#title').val(),
      description: $('#description').val(),
      status: $('#status').val()
    }
  })
    .done((result) => {
      fetchTodoList()
    })
    .fail((err) => {
      $("#notif").show()
      $("#notif").text(err.responseJSON.message)
      setTimeout(function () {
        $("#notif").fadeOut("slow");
      }, 10000);
      console.log(err.responseJSON.message)
    })
    .always(() => {
      // $('#addFields')[0].reset();
    })
}
function updateTodo() {
  event.preventDefault()
  const dateTime = new Date(`${$("#date-update").val()} ${$("#time-update").val()}`)
  const dateTodo = '' + dateTime
  const id = $("#id-update").val()
  console.log(id)
  $.ajax({
    method: "PUT",
    url: `http://localhost:3000/todos/${id}`,
    headers: {
      access_token: localStorage.token
    },
    data: {
      due_date: dateTodo,
      title: $('#title-update').val(),
      description: $('#description-update').val(),
      status: $('#status-update').val()
    }
  })
    .done(() => {
      fetchTodoList()
      $('#updateFields').hide()
      $("#addFields").show()
    })
}
function deleteTodo(id) {
  $.ajax({
    method: "DELETE",
    url: `http://localhost:3000/todos/${id}`,
    headers: {
      access_token: localStorage.token
    },
  })
    .done((todo) => {
      fetchTodoList()
    })
    .fail((err) => {
      $("#notif").show()
      $("#notif").text(err.responseJSON.message)
      setTimeout(function () {
        $("#notif").fadeOut("slow");
      }, 10000);
      console.log(err.responseJSON.message)
    })
}

function editTodo(id) {
  $.ajax({
    method: "GET",
    url: `http://localhost:3000/todos/${id}`,
    headers: {
      access_token: localStorage.token
    },
  })
    .done((todo) => {
      console.log(todo)
      var now = new Date(todo.due_date); var day = ("0" + now.getDate()).slice(-2);
      var month = ("0" + (now.getMonth() + 1)).slice(-2); var today = now.getFullYear() + "-" + (month) + "-" + (day); $('#date-update').val(today);
      $('#title-update').val(todo.title)
      $('#status-update').val(todo.status)
      $('#description-update').val(todo.description)
      $("#updateFields").show()
      $("#addFields").hide()
      $("#id-update").val(todo.id)
    })
    .fail((err) => {
      $("#notif").show()
      $("#notif").text(err.responseJSON.message)
      setTimeout(function () {
        $("#notif").fadeOut("slow");
      }, 10000);
      console.log(err.responseJSON.message)
    })

}



function login(event) {
  event.preventDefault()

  $.ajax({
    method: "POST",
    url: "http://localhost:3000/user/login",
    data: {
      email: $("#emailLogin").val(),
      password: $("#passwordLogin").val()
    }
  })
    .done((result) => {
      localStorage.token = result.access_token
      fetchTodoList()
      $("#btnLogin").hide()
      $("#btnRegis").hide()
      $("#login").hide()
      $("#regis").hide()
      $("#after-login").show()
    })
    .fail((err) => {
      $("#notif").show()
      $("#notif").text(err.responseJSON.message)
      setTimeout(function () {
        $("#notif").fadeOut("slow");
      }, 10000);
      console.log(err.responseJSON.message)
    })
    .always(() => {
      $('#loginField')[0].reset();
    })
}
function register(event) {
  event.preventDefault()
  $.ajax({
    method: "POST",
    url: "http://localhost:3000/user/register",
    data: {
      email: $("#emailRegis").val(),
      password: $("#passwordRegis").val()
    }
  })
    .done((result) => {
      console.log(result)
    })
    .fail((err) => {
      $("#notif").show()
      $("#notif").text(err.responseJSON.message)
      setTimeout(function () {
        $("#notif").fadeOut("slow");
      }, 10000);
      console.log(err.responseJSON.message)
    })
    .always(() => {
      $('#regisFields')[0].reset();
    })
}

function toLogin() {
  $("#welcome").hide()
  $("#btnLogOut").hide()
  $("#btnLogin").hide()
  $("#btnRegis").show()
  $("#regis").hide()
  $("#login").show()
}

function toRegis() {
  $("#welcome").hide()
  $("#btnLogOut").hide()
  $("#btnLogin").show()
  $("#btnRegis").hide()
  $("#login").hide()
  $("#regis").show()
}
function logOut() {
  localStorage.clear()
  signOut()
  $("#welcome").show()
  $("#btnLogOut").hide()
  $("#btnRegis").show()
  $("#btnLogin").show()
  $("#login").hide()
  $("#regis").hide()
  $("#after-login").hide()
  $('#updateFields').hide()
  $("#addFields").show()
}

//GOOGLE OAUTH
function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: "POST",
    url: "http://localhost:3000/user/googleSignIn",
    data: { id_token }
  })
    .done(function (result) {
      $("#notif").show()
      $("#notif").text("selamat berhasil login dengan google")
      setTimeout(function () {
        $("#notif").fadeOut("slow");
      }, 10000);
      localStorage.token = result.access_token
      fetchTodoList()
      $("#btnLogOut").show()
      $("#btnLogin").hide()
      $("#btnRegis").hide()
      $("#login").hide()
      $("#regis").hide()
      $("#after-login").show()
    })
    .fail((err) => {
      $("#notif").show()
      $("#notif").text(err.responseJSON.message)
      setTimeout(function () {
        $("#notif").fadeOut("slow");
      }, 10000);
      console.log(err.responseJSON.message)
    })
}
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

