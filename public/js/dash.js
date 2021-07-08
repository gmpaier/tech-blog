async function postBlog(event) {
  event.preventDefault();
  const title = $("#inputTitle").val().trim();
  const body = $("#inputBody").val().trim();
  console.log(title);
  console.log(body);
  if (title && body){
    const response = await fetch('/api/blogs', {
      method: 'POST',
      body: JSON.stringify({title: title, body: body}),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok){
      document.location.reload();
    }
    else {
      alert(response.statusText);
    }
  }
  else {
    alert("Post must have a non-empty title and body");
  }
}

$(document).on("click", "#submit-btn", postBlog);