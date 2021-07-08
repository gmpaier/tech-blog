$(document).ready(function(){

  const reply = $("#reply-div");
  let formRendered = false;   

  async function editBlog(){
    const response = await fetch('/edit/' + this.value, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok){
      alert(response.statusText);
    }
  }

  async function delBlog(){
    const confirm = confirm("You are about to permanantly delete this blog post. Would you like to continue?");
    if (confirm === true){
      const response = await fetch('/api/blogs/' + this.value, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok){
        document.location.replace('/');
      }
      else {
        alert(response.statusText);
      }
    }
  }

  function hideForm(){
    if (formRendered === true){
      formRendered = false;
    }
    $("#reply-div").detach();
  }

  function renderForm(){
    if (formRendered === false){
      $("#target-div").after(reply);
      formRendered = true;
    }
  }

  async function postReply(){
    const comment = $("#inputBody").val().trim();
    if (comment) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({body: comment, blog_id: this.value}),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok){
        window.location.href = window.location.href;
      }
      else {
        alert(response.statusText);
      }
    }
    else {
      alert("You cannot post an empty comment.");
    }
  }

  $(document).on("click", "#edit-btn", editBlog);
  $(document).on("click", "#del-btn", delBlog);
  $(document).on("click", "#reply-btn", renderForm);
  $(document).on("click", "#submit-btn", postReply);
  $(document).on("click", "#cancel-btn", hideForm);

  hideForm();
});