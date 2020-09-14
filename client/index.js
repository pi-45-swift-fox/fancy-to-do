const endpoint = "http://localhost:3000";

$(document).ready(() => {
  console.log(localStorage.accesstoken);
  if (!localStorage.accesstoken)
  {
    beforeLogin();
  }
  else
  {
    afterLogin();
  }
})

function afterLogin()
{
  $("#loginpage").hide();
  $("#registerpage").hide();
  $("#dashboard").show();
  $("#form-add").hide();
  $("#form-update").hide();
  fetchData();
}

function beforeLogin()
{
  $("#loginpage").show();
  $("#registerpage").hide();
  $("#dashboard").hide();
  $("#form-add").hide();
  $("#form-update").hide();
}

function registerUser(event)
{
  event.preventDefault();
  $("#loginpage").hide();
  $("#registerpage").show();
}

$("#form-register").submit(e => {
  e.preventDefault();

  const email = $("#email-register").val();
  const password = $("#password-register").val();

  console.log(email, password);

  $.ajax(`${endpoint}/register`, {
    method: 'POST',
    data: {
      email,
      password
    }
  })
  .done(userData => {
    console.log(userData);
    $.ajax(`${endpoint}/login`, {
      method: 'POST',
      data: {
        email,
        password
      }
    })
    .done(data => {
      console.log(data);
      localStorage.accesstoken = data.accesstoken;
      afterLogin();
    })
    .fail(err => {
      console.log(err);
    })
    .always(() => console.log('this is ajax login after register'));
  })
  .fail(err => {
    console.log('error', err);
  })
  .always(() => console.log('this is ajax'));
});

$("#cancel-register-form").click(event => {
  event.preventDefault();
  beforeLogin();
})

$("#logout-button").click(event => {
  event.preventDefault();

  signOut();
  localStorage.clear();
  beforeLogin();
})

$("#form-login").submit(e => {
  e.preventDefault();

  const email = $("#email").val();
  const password = $("#password").val();

  console.log(email, password);

  $.ajax(`${endpoint}/login`, {
    method: 'POST',
    data: {
      email,
      password
    }
  })
  .done(data => {
    console.log(data);
    localStorage.accesstoken = data.accesstoken;
    afterLogin();
  })
  .fail(err => {
    console.log('error', err);
  })
  .always(() => console.log('this is ajax'));
});

$("#create-todos").click(e => {
  e.preventDefault();
  $("#add-todos-form")[0].reset();
  $("#dashboard").hide();
  $("#form-add").show();
})

$("#add-button-form").click(e => {
  e.preventDefault();

  const title = $("#title-add").val();
  const description = $("#description-add").val();
  const status = $("#status-add").val();
  const due_date = $("#due_date-add").val();

  console.log(title, description, status, due_date);
  $.ajax(`${endpoint}/todos`, {
    method: 'POST',
    data: {
      title,
      description,
      status,
      due_date
    },
    headers: {
      accesstoken: localStorage.accesstoken
    }
  })
  .done(data => {
    $("#add-todos-form")[0].reset();
    console.log(data);
    afterLogin();
  })
  .fail(err => console.log(err))
  .always(() => console.log('this is posting form ajax'))
})

function cancelForm(event)
{
  event.preventDefault();
  afterLogin();
}

function onSignIn(googleUser)
{
  var id_token = googleUser.getAuthResponse().id_token;

  $.ajax(`${endpoint}/google-login`, {
    method: 'POST',
    data: {
      token: id_token
    }
  })
    .done(data => {
      localStorage.accesstoken = data.accesstoken;
      afterLogin();
      console.log(data);
    })
    .fail(err => {
      console.log(err);
    })
    .always(() => console.log('wndiwdn'));
}

function signOut()
{
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

function fetchData()
{
  $("#todo-content").empty();
  $.ajax(`${endpoint}/todos`, {
    method: 'GET',
    headers: {
      accesstoken: localStorage.accesstoken
    }
  })
  .done(data => {
    console.log(data);
    data.forEach(eachData => {
      const s = eachData.title.replace(/(\w)(\w*)/g, (g0,g1,g2) => g1.toUpperCase() + g2.toLowerCase());
      const date = eachData.due_date.split('T')[0];
      $("#todo-content").append(`<div class="col mb-4">
        <div id="${eachData.id}" class="card h-100 shadow-sm p-3 mb-5 bg-white rounded border border-primary" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title font-weight-bold font">${s}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Description</h6>
            <p class="card-text">${eachData.description}</p>
            <h6 class="card-subtitle mb-2 font-weight-bold font">Status</h6>
            <p class="card-text">${eachData.status}</p>
            <h6 class="card-subtitle mb-2 font-weight-bold font">Due Date</h6>
            <p class="card-text">${date}</p>
            <a href="" class="card-link" onclick="updateTodoList(event, ${eachData.id})">Update</a>
            <a href="" class="card-link text-danger" onclick="deleteTodoList(event, ${eachData.id})">Delete</a>
          </div>
        </div>
      </div>`);
    })
  })
  .fail(err => {
    console.log(err)
  })
  .always(() => console.log('this in ajax fetch data'));
}

function updateTodoList(event)
{
  event.preventDefault();
  console.log('update')
  $.ajax(`${endpoint}/todos/${arguments[1]}`, {
    method: 'GET',
    headers: {
      accesstoken: localStorage.accesstoken
    }
  })
  .done(todoData => {
    console.log(todoData);
    $("#update-todos-form")[0].reset();
    $("#dashboard").hide();
    $("#form-update").show();

    $("input[name=title]").val(`${todoData.title}`);
    $("input[name=description]").val(`${todoData.description}`);
    $("input[name=status]").val(`${todoData.status}`);
    $("input[name=due_date]").val(`${todoData.due_date.split('T')[0]}`);

    const todoId = todoData.id;
    // postUpdateTodoList(arguments[1]);

  })
  .fail(err => {
    console.log(err);
  })
  .always(() => console.log('this is update todo ajax'))
  console.log(arguments);
}

  $("#update-button-form").click(event => {
    event.preventDefault();
    console.log(event);
    const title = $("#title-update").val();
    const description = $("#description-update").val();
    const status = $("#status-update").val();
    const due_date = $("#due_date-update").val();

    console.log(title, description, status, due_date);
    $.ajax(`${endpoint}/todos/${arguments[1]}`, {
      method: 'PUT',
      data: {
        title,
        description,
        status,
        due_date
      },
      headers: {
        accesstoken: localStorage.accesstoken
      }
    })
    .done(data => {
      console.log(data, 'this is from update form');
      afterLogin();
    })
    .fail(err => {
      console.log(err)
    })
    .always(() => console.log('this is update ajax'))
  })
  console.log(todoId);

}

function deleteTodoList(event)
{
  event.preventDefault();
  console.log(arguments);

  $.ajax(`${endpoint}/todos/${arguments[1]}`, {
    method: "DELETE",
    headers: {
      accesstoken: localStorage.accesstoken
    }
  })
  .done(data => {
    console.log(data);
    afterLogin();
  })
  .fail(err => {
    console.log(err);
  })
  .always(() => console.log('this is delete ajax'))
}
