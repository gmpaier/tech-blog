let idleInterval = setInterval(timerIncrement, 60000);

const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

const timeout = (function(){
  let count = 0;
  return function (opt) {
    switch (opt){
      case "clear":
        return count = 0;
      case "add":
        return count += 20;    
    }
  }
})();


function timerIncrement() {
  const count = timeout("add");
  if (count > 19){
    clearInterval(idleInterval);
    logout();
  }
}

// $(document).ready(timeout);
$(this).mousemove(()=>timeout("clear"));
$(this).keypress(()=>timeout("clear"));
$(document).on("click", "#logout", logout);
