document.addEventListener("DOMContentLoaded", function() {
    
    fetch("https://catfact.ninja/fact")
        .then(response => response.json())
        .then(data => {
            document.getElementById("cat-fact").textContent = data.fact;
        })
        .catch(error => console.error("Kļūda ielādējot kaķu faktu:", error));
});

document.addEventListener("DOMContentLoaded", function() {
    const poemForm = document.getElementById("poem-form");
    const poemText = document.getElementById("poem-text");
    const poetryList = document.getElementById("poetry-list");

    function loadPoems() {
        let poems = JSON.parse(localStorage.getItem("poems")) || [];

        
        if (window.location.pathname.includes("index.html")) {
            poems = poems.slice(0, 2); 
        }

        if (poetryList) {
            poetryList.innerHTML = "";
            poems.forEach(poem => {
                const poemElement = document.createElement("div");
                poemElement.classList.add("poem");
                poemElement.innerHTML = `<p>${poem.replace(/\n/g, "<br>")}</p><hr>`;
                poetryList.appendChild(poemElement);
            });
        }
    }

    if (poemForm) {
        poemForm.addEventListener("submit", function(event) {
            event.preventDefault();
            if (poemText.value.trim() !== "") {
                const poems = JSON.parse(localStorage.getItem("poems")) || [];
                poems.unshift(poemText.value.trim()); 
                localStorage.setItem("poems", JSON.stringify(poems));
                poemText.value = ""; 
                alert("Dzejolis veiksmīgi publicēts!");
            }
        });
    }

    loadPoems();
});
