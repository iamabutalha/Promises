const btn = document.querySelector(".btn-primary");
const resultDiv = document.querySelector(".result");

btn.addEventListener("click", () => {
  const inputValue = document.querySelector("#inputVal");
  document.querySelector(".postDiv").innerHTML = "";

  fetch(`https://jsonplaceholder.typicode.com/users/${inputValue.value}`)
    .then((res) => {
      console.log(res);
      if (res.status !== 200) {
        resultDiv.innerHTML = `<h2>No user Found </h2>`;
        document.querySelector(".postDiv").innerHTML = "";
        return;
      }
      return res.json();
    })
    .then((data) => {
      const HTML = `
    <h1>${data.name}</h1>
    <h2>${data.id} </h2>
    <button class="btnInside">Get User Post </button>


    `;

      resultDiv.innerHTML = HTML;

      let secondBtn = document.querySelector(".btnInside");
      console.log(secondBtn);

      secondBtn.addEventListener("click", () => {
        fetch(`https://jsonplaceholder.typicode.com/posts`)
          .then((res) => res.json())
          .then((posts) => {
            console.log(posts);
            const userPost = posts.filter(
              (post) => post.userId == inputValue.value
            );
            document.querySelector(".postDiv").innerHTML = `<ul>${userPost
              .map((post) => `<li>${post.title}</li>`)
              .join("")}</ul>`;
          });
      });
    })
    .catch((err) => {});
});
