async function postBlog(event) {
  event.preventDefault();
  const title = $("#inputTitle").value().trim();
  const body = $("#inputBody").text().trim();
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