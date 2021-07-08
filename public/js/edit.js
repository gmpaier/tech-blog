async function editBlog(event) {
  event.preventDefault();
  const title = $("#inputTitle").val().trim();
  const body = $("#inputBody").val().trim();
  console.log(title);
  console.log(body);
  if (title && body){
  const response = await fetch('/api/blogs/' + this.value, {
    method: 'PUT',
    body: JSON.stringify({title: title, body: body}),
    headers: { 'Content-Type': 'application/json' },
  });
    if (response.ok){
      document.location.replace('/blog/' + this.value);
    }
    else {
      alert(response.statusText);
    }
  }
  else {
    alert("Post must have a non-empty title and body");
  }
}


function cancelEdit(){
  document.location.replace('/blog/' + this.value);
}

$(document).on("click", "#submit-btn", editBlog);
$(document).on("click", "#cancel-btn", cancelEdit);