// your JS code here

const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
    { url: "https://picsum.photos/id/237/200/300" },
    { url: "https://picsum.photos/id/238/200/300" },
    { url: "https://picsum.photos/id/239/200/300" }
];

function downloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
            resolve(img);
        };

        img.onerror = () => {
            reject(new Error("Failed to download image"));
        };

        img.src = url;
    });
}

function downloadImages() {
    output.innerHTML = "Loading...";

    Promise.all(
        images.map(image => downloadImage(image.url))
    )
    .then(downloadedImages => {
        output.innerHTML = "";

        downloadedImages.forEach(img => {
            output.appendChild(img);
        });
    })
    .catch(error => {
        output.innerHTML = "";
        
        const errorMessage = document.createElement("div");
        errorMessage.innerText = error.message;
        errorMessage.style.color = "red";

        output.appendChild(errorMessage);
    });
}

if (btn) {
    btn.addEventListener("click", downloadImages);
}