const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
const toyCollect = document.querySelector('#toy-collection');
const realToyForm = document.querySelector('.add-toy-form');
const likeButton = document.querySelector('#new-toy-btn');
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

function showToys(){
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(json => {
      json.forEach(toy => {
        toyCollect.innerHTML += `
        <div class="card">
          <h2>${toy.name}</h2>
          <img src=${toy.image} class="toy-avatar" />
          <p>  ${toy.likes} Likes</p>
          <button class="like-btn" data-id=${toy.id}>Like <3</button>
        </div>`
      })
    })
}

realToyForm.addEventListener('submit', e => {
  e.preventDefault()
  // debugger
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body:JSON.stringify(
      {name: e.target.name.value,
      image: e.target.image.value,
      likes: 0}
    )
  })
  .then(resp => resp.json())
  .then(toy => {
    toyCollect.innerHTML += `
    <div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>  ${toy.likes} Likes</p>
      <button class="like-btn", id=${toy.id}>Like <3</button>
    </div>`
  })
  realToyForm.reset()
  alert("Done su")
})

document.addEventListener('click', e => {
  if (e.target.className === 'like-btn'){
    e.target.previousElementSibling.innerText = `${parseInt(e.target.previousElementSibling.innerText) + 1} Likes`
    fetch(`http://localhost:3000/toys/${e.target.dataset['id']}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        'Accept': "application/json"
      },
      body: JSON.stringify({
        "likes": parseInt(e.target.previousElementSibling.innerText)
      })
    })
      console.log(e.target.previousElementSibling.innerText)
      showToys()
  }
})

showToys()
