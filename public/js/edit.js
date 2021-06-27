async function editBlog(event) {
  event.preventDefault();
  const response = await fetch('/api/blogs/' + this.value, {
    method: 'PUT',
    body: JSON.stringify({title: $("#inputTitle").text(), body: $("#inputBody").text()}),
    headers: { 'Content-Type': 'application/json' },
  });
  
  if (response.ok) {
    document.location.replace('/blog/' + this.value);
  } else {
    alert(response.statusText);
  }
}


function cancelEdit(){
  document.location.replace('/blog/' + this.value);
}

$(document).on("click", "#submit-btn", editBlog);
$(document).on("click", "#cancel-btn", cancelEdit);