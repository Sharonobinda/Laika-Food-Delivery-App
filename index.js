document.getElementById('pizza-btn').addEventListener('click', function() {
    window.location.href = 'pizza.html';
});

document.getElementById('burger-btn').addEventListener('click', function() {
    window.location.href = 'burger.html';
});

document.addEventListener("DOMContentLoaded", function () {
    const pizzaList = document.getElementById("pizzaList");
    const burgerList = document.getElementById("burgerList");
    
    // Function to fetch and populate menu
    function populateMenu(category) {
        // Clear existing menu items
        pizzaList.innerHTML = "";
        burgerList.innerHTML = "";
  
        // Fetch data from the URL based on category
        fetch(`http://localhost:5000/restaurants?category=${category}`)
            .then(response => response.json())
            .then(data => {
                // Iterate over the data to populate menu
                data.forEach(item => {
                    // Create a new card
                    const card = document.createElement("div");
                    card.classList.add("card", "mb-3", "col-md-3", "pizza-card");
                    card.style.display = "inline-block";
  
                    // Populate card content
                    card.innerHTML = `
                        <img src="${item.image}" class="card-img-top" alt="${item.name}" height="250" width="250">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">Price: $${item.price}</p>
                        </div>
                    `;
  
                    // Append card to the appropriate list
                    if (category === "pizza") {
                        pizzaList.appendChild(card);
                    } else if (category === "burger") {
                        burgerList.appendChild(card);
                    }
                });
            })
            .catch(error => console.error("Error fetching data:", error));
    }

    // Call the populateMenu function when the DOM is loaded
    populateMenu("pizza"); // Populate pizza menu initially
});
