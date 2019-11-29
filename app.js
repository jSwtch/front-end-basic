console.log("hello from app.js")

// arrow function
// const addClick = () => {
//   click++;
//   console.log(click);
//   counterBox.innerHTML = click;
//   createPost(click)
// }

// initialize variables and get elements from dom
let click = 0;
let posts;
const url = 'https://jsonplaceholder.typicode.com/posts'
const urlPost = 'https://postman-echo.com/post'
const cat = document.getElementById("cat")
const counterBox = document.getElementById("counter")
const postList = document.getElementById("post-list")
const button = document.getElementById("button")

// event listeners
cat.addEventListener("click", addClickCounter)

// traditional function
// can be defined below (hoisting)
function addClickCounter() {
  click++;
  console.log(click);
  counterBox.innerHTML = click;
  createPostTitle(click)
}

// AJAX
// CORS anywhere approach - could build own proxy
// (Reason: CORS header ‘Access - Control - Allow - Origin’ missing).
// const url = 'https://cors-anywhere.herokuapp.com/...
function makeXMLHttpRequest() {
  const Http = new XMLHttpRequest();
  // open ties the GET method with the URL endpoint
  Http.open("GET", url);
  // send fires the request
  Http.send();

  Http.onreadystatechange = function () {
    // 4 request is done | 200 ok connection
    if (this.readyState == 4 && this.status == 200) {
      // console.log(Http.responseText);
      posts = Http.responseText;
      // console.log(typeof (posts))
      posts = JSON.parse(posts)
      // console.log(typeof (posts))
    }
  }
}

function makeFetchRequest() {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    // callback hell
    .then((json) => {
      // console.log(json)
      posts = json
    })
    .catch((error) => {
      console.error(error)
    })
}


async function makeAsyncAwaitRequest() {
  try {
    let response = await fetch(url);
    let data = await response.json();
    return data
  } catch (error) {
    console.error(error);
    // handle errors
  }
}
// create DOM Li element with post title 
function createPostTitle(i) {
  let node = document.createElement("LI");
  let textnode = document.createTextNode(posts[i].title)
  node.appendChild(textnode);
  postList.appendChild(node)
}

// makeXMLHttpRequest()
// makeFetchRequest()
makeAsyncAwaitRequest()
  .then(data => {
    // console.log(data)
    posts = data
  })