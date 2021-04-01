

const weatherform = document.querySelector('form');
const search  = document.querySelector('input');
const message_1 = document.querySelector('#message-1');
const message_2 = document.querySelector('#message-2');


weatherform.addEventListener("submit",(e) => {
  e.preventDefault()
  let location = search.value;
  message_1.textContent = 'Loading...';
  message_2.textContent = '';
  fetch(`/weather?address=${location}`)
  .then(res => res.json())
  .then(data => {
    if(data.error){
      message_1.textContent = data.error;
      message_2.textContent = ''


    }else{
    message_1.textContent = data.location
    message_2.textContent = data.forecast
    }
  })

})
