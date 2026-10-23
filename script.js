
const imageUrls = [
  "https://picsum.photos/id/10/200/200",
  "https://picsum.photos/id/20/200/200",
  "https://picsum.photos/id/30/200/200"
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () => reject(
      new Error("Failed to download image")
    );

    img.src = url;
  });
}

function downloadImages() {
  const output = document.getElementById("output");
  const error = document.getElementById("error");
  const loading = document.getElementById("loading");

  loading.textContent = "Loading images...";
  loading.style.display = "block";
  error.textContent = "";
  output.innerHTML = "";

  Promise.all(imageUrls.map(url => downloadImage(url)))
    .then(images => {
      images.forEach(img => output.appendChild(img));
    })
    .catch(err => {
      error.textContent = err.message;
    })
    .finally(() => {
      loading.style.display = "none";
    });
}

downloadImages();
