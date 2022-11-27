let timer;
let deleteFirstPhotoDelay;

async function start() {
  try {
    const response = await fetch(
      "https://dog.ceo/api/breeds/list/all"
    );
    const data = await response.json();
    createBreedList(data.message);
  } catch (e) {
    console.log("There was a problem fetching the breed list.");
  }
}

start();

function createBreedList(breedList) {
  document.getElementById("breed").innerHTML = `
  <select onchange="loadByBreed(this.value)">
        <option>Choose a dog breed</option>
        ${Object.keys(breedList)
          .map(function (breed) {
            return `<option>${breed}</option>`;
          })
          .join("")}
      </select>
  `;
}

async function loadByBreed(breed) {
  if (breed != "Choose a dog breed") {
    const response = await fetch(
      `https://dog.ceo/api/breed/${breed}/images`
    );
    const data = await response.json();
    createSlideshow(data.message);
  }
}

function createSlideshow(images) {
  let currentPosition = 0;
  clearInterval(timer);
  clearTimeout(deleteFirstPhotoDelay);

  if (images.length > 1) {
    document.getElementById("slideshow").innerHTML = `
  <div class="slide" style="background-image: url('${images[0]}')"></div>
  <div class="slide" style="background-image: url('${images[1]}')"></div>
  `;
    currentPosition += 2;
    if (images.length == 2) currentPosition = 0;
    timer = setInterval(nextSlide, 3000);
  } else {
    document.getElementById("slideshow").innerHTML = `
  <div class="slide" style="background-image: url('${images[0]}')"></div>
  <div class="slide"></div>
  `;
  }

  function nextSlide() {
    document
      .getElementById("slideshow")
      .insertAdjacentHTML(
        "beforeend",
        `<div class="slide" style="background-image: url('${images[currentPosition]}')"></div>`
      );
    deleteFirstPhotoDelay = setTimeout(function () {
      document.querySelector(".slide").remove();
    }, 1000);
    if (currentPosition + 1 >= images.length) {
      currentPosition = 0;
    } else {
      currentPosition++;
    }
  }
}

function ajax_get(url, callback) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      console.log("responseText:" + xmlhttp.responseText);
      try {
        var data = JSON.parse(xmlhttp.responseText);
      } catch (err) {
        console.log(err.message + " in " + xmlhttp.responseText);
        return;
      }
      callback(data);
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

ajax_get(
  "https://api.thecatapi.com/v1/images/search?size=full",
  function (data) {
    document.getElementById("id").innerHTML = data[0]["id"];
    document.getElementById("url").innerHTML = data[0]["url"];

    var html = '<img src="' + data[0]["url"] + '">';
    document.getElementById("image").innerHTML = html;
  }
);

// let timer;
// let deleteFirstPhotoDelay;

// async function start() {
//   const response = await fetch("https://dog.ceo/api/breeds/list/all");
//   const data = await response.json();
//   createBreedList(data.message);
// }

// function createBreedList(breedList) {
//   document.getElementById("breed").innerHTML = `
//     <select onchange="loadByBreed(this.value)">
//      <option>Choose a dog breed</option>
//         ${Object.keys(breedList)
//           .map(function (breed) {
//             return `<option>${breed}</option>`;
//           })
//           .join("")}
//       </select>
//   `;
// }

// async function loadByBreed(breed) {
//   if (breed != "Choose a dog breed") {
//     const response = await fetch(
//       `https://dog.ceo/api/breed/${breed}/images`
//     );
//     const data = await response.json();
//     createSlideshow(data.message);
//   }
// }

// function createSlideshow(images) {
//   let currentPosition = 0;
//   clearInterval(timer);
//   clearTimeout(deleteFirstPhotoDelay);

//   if (images.length > 1) {
//     document.getElementById("slideshow").innerHTML = `
//   <div class="slide" style="background-image: url('${images[0]}')"></div>
//   <div class="slide" style="background-image: url('${images[1]}')"></div>
//   `;
//     currentPosition += 2;
//     if (images.length == 2) currentPosition = 0;
//     timer = setInterval(nextSlide, 3000);
//   } else {
//     document.getElementById("slideshow").innerHTML = `
//   <div class="slide" style="background-image: url('${images[0]}')"></div>
//   <div class="slide"></div>
//   `;
//   }
//   function nextSlide() {
//     document
//       .getElementById("slideshow")
//       .insertAdjacentHTML(
//         "beforeend",
//         `<div class="slide" style="background-image: url('${images[currentPosition]}')"></div>`
//       );
//     deleteFirstPhotoDelay = setTimeout(function () {
//       document.querySelector(".slide").remove();
//     }, 1000);
//     if (currentPosition + 1 >= images.length) {
//       currentPosition = 0;
//     } else {
//       currentPosition++;
//     }
//   }
// }
