const styles = `
        background: #00e676;
        color: black;
        padding: 5px;
        border-radius: 3px;
      `;

console.log(`%cacha i see where you're coming from! 😏😏`, styles);

function showSuccessToast() {
  toastr.success(`message sent! 😉 If you're legit, expect a prompt reply! `);
}

function showFailureToast() {
  toastr.error(`its not you, its us 😔  ,pls try again later `);
}

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const sendButton = document.querySelector('.btn');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    sendButton.disabled = true;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const description = document.getElementById('description').value;
    fetch('https://lil-watch-tower.onrender.com/api/v1/collab/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        subject: subject,
        description: description,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          showSuccessToast();
          form.reset();
        } else {
          throw new Error();
        }
      })
      .catch((error) => {
        showFailureToast();
      })
      .finally(() => {
        sendButton.disabled = false;
      });
  });
});
