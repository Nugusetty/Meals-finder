document.addEventListener("DOMContentLoaded", function () {
  const cateElement = document.querySelector("#cate");
  const mealsElement = document.getElementById("meals");
  const galleryElement = document.getElementById("gallery");
  const outputElement = document.getElementById("output");
  const searchButton = document.querySelector(".search-button");
  const searchInput = document.querySelector(".search-input");
  // Hamburger menu functionality
  const hamburgerElement = document.getElementById("hamburger");
  const dropdownElement = document.getElementById("dropdown");
  const cancelElement = document.getElementById("cancle");

  if (hamburgerElement && dropdownElement) {
    hamburgerElement.addEventListener("click", () => {
      dropdownElement.style.display = "block";
    });
  }

  if (cancelElement && dropdownElement) {
    cancelElement.addEventListener("click", () => {
      dropdownElement.style.display = "none";
    });
  }
  // Show the category section initially
  if (cateElement) {
    cateElement.style.display = "block";
  }
  if (searchButton && searchInput) {
    searchButton.addEventListener("click", function () {
      searchMeals(searchInput.value.trim());
    });
  }

  function searchMeals(searchTerm) {
    if (mealsElement) {
      mealsElement.style.display = "none";
    }
    if (galleryElement) {
      galleryElement.style.display = "none";
    }
    if (cateElement) {
      cateElement.style.display = "none";
    }

    if (outputElement) {
      outputElement.innerHTML = ""; 
    }

    if (searchTerm) {
      console.log(`Searching for: ${searchTerm}`); 

      fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("API Response:", data);

          if (data.meals) {
            let mealgrid = `
              <h1 style="color:black;">Meals</h1>
              <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:15px;">
            `;

            // Loop through meals and build the grid
            data.meals.forEach((meal) => {
              mealgrid += `
                <div style="border: 2px solid red; padding: 15px; text-align: center; background-color: #f39c12;">
                  <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="max-width: 80%;">
                  <p>${meal.strMeal}</p>
                </div>
              `;
            });

            // Close the grid container
            mealgrid += "</div>";

            // Set the output to the new mealgrid content
            if (outputElement) {
              outputElement.innerHTML = mealgrid;
            }
          } else {
            // If no meals were found
            if (outputElement) {
              outputElement.innerHTML = "<p>No meals found</p>";
            }
          }
        });
    } else {
      // If no search term was entered
      if (outputElement) {
        outputElement.innerHTML = "<p>Please enter a search term</p>";
      }
    }
  }
  //  -----search item bar ends here-------------------------------------
  // Fetch categories and display them
  fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then((response) => response.json())
    .then((data) => {
      let gallery = `
        <div id="gallery" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 14px;">
      `;
      data.categories.forEach((category) => {
        gallery += `
          <div style="border: 1px solid #ccc; padding: 10px; text-align: center; cursor: pointer; box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; border-radius: 10px;"> 
            <img src="${category.strCategoryThumb}" alt="${category.strCategory}" style="max-width: 80%; cursor: pointer;"> 
            <p style="background-color: rgb(216, 91, 45); width: 55%; margin-left: 100px;">${category.strCategory}</p>
          </div>
        `;
      });
      gallery += `</div>`;
      document.getElementById("output").innerHTML = gallery;
    })
    .catch((error) => console.error("Error fetching data:", error));

  // Fetch and display categories list
  fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then((response) => response.json())
    .then((data) => {
      const categories = data.categories;
      const categoriesList = document.getElementById("categoriesList");

      // Create a list item for each category
      categories.forEach((category) => {
        const listItem = document.createElement("li");
        listItem.textContent = category.strCategory;

        // Add click event to load meals when category is clicked
        listItem.addEventListener("click", function () {
          fetchMealsByCategory(category.strCategory);
        });
        categoriesList.appendChild(listItem);
      });
    })
    .catch((error) => console.error("Error fetching categories:", error));

  // Function to fetch meals by category
  function fetchMealsByCategory(category) {
    document.getElementById("output").style.display = "none";
    document.getElementById("meals").style.display = "block";

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((response) => response.json())
      .then((data) => {
        displayMeals(data.meals);
      })
      .catch((error) => console.error("Error fetching meals:", error));
  }

  // Function to display meals
  function displayMeals(meals) {
    const mealsContainer = document.getElementById("meals");
    mealsContainer.innerHTML = "";

    meals.forEach((meal) => {
      const mealItem = document.createElement("div");
      mealItem.classList.add("meal-item");

      mealItem.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
      `;
      mealsContainer.appendChild(mealItem);
    });
  }
});

// document.addEventListener('DOMContentLoaded', function() {
//   // Show the category section initially
//   document.querySelector("#cate").style.display = "block";

//   // Hamburger menu functionality
//   document.getElementById('hamburger').addEventListener('click', () => {
//     document.getElementById('dropdown').style.display = 'block';
//   });

//   document.getElementById('cancle').addEventListener('click', () => {
//     document.getElementById('dropdown').style.display = 'none';
//   });

//   // Attach event listener to search button
//   document.querySelector('.search-button').addEventListener('click', searchMeals);

//   function searchMeals() {
//     const searchTerm = document.querySelector('.search-input').value.trim();

//     // Hide unnecessary sections
//     document.getElementById('meals').style.display = 'none';
//     document.getElementById('gallery').style.display = 'none';
//     document.querySelector("#cate").style.display = "none";

//     // Clear the output area before displaying new search results
//     document.getElementById('output').innerHTML = ""; // Ensure output is cleared before rendering new data

//     if (searchTerm) {
//       console.log(`Searching for: ${searchTerm}`); // Debugging: Check search term

//       fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
//         .then(response => {
//           if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//           }
//           return response.json();
//         })
//         .then(data => {
//           console.log('API Response:', data); // Debugging: Check API response

//           if (data.meals) {
//             // Initialize a fresh grid
//             let mealgrid = `
//               <h1 style="color:black;">Meals</h1>
//               <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;">
//             `;

//             // Loop through meals and build the grid
//             data.meals.forEach(meal => {
//               mealgrid += `
//                 <div style="border: 2px solid red; padding: 15px; text-align: center; background-color: #f39c12;">
//                   <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="max-width: 80%;">
//                   <p>${meal.strMeal}</p>
//                 </div>
//               `;
//             });

//             // Close the grid container
//             mealgrid += '</div>';

//             // Set the output to the new mealgrid content
//             document.getElementById('output').innerHTML = mealgrid;

//           } else {
//             // If no meals were found
//             document.getElementById('output').innerHTML = '<p>No meals found</p>';
//           }
//         })
//         .catch(error => {
//           console.error('Error fetching data:', error);
//           document.getElementById('output').innerHTML = '<p>Error fetching data</p>';
//         });
//     } else {
//       // If no search term was entered
//       document.getElementById('output').innerHTML = '<p>Please enter a search term</p>';
//     }
//   }

// //
// //
// //
// fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
//   .then((response) => response.json())
//   .then((data) => {
//     let gallery = `
//         <div  id ="gallery" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 14px;">
//     `;
//     data.categories.forEach((category) => {
//       gallery += `
//         <div style="border: 1px solid #ccc; padding: 10px; text-align: center; cursor: pointer; box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; border-radius: 10px;">
//           <img src="${category.strCategoryThumb}" alt="${category.strCategory}" style="max-width: 80%; cursor: pointer;">
//           <p style="background-color: rgb(216, 91, 45); width: 55%; margin-left: 100px; ">${category.strCategory}</p>
//         </div>
//       `;
//     });
//     gallery += `</div>`;
//     document.getElementById("output").innerHTML = gallery;
//   })
//   .catch((error) => console.error('Error fetching data:', error));
// //
// //    Output End
// fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
//       .then(response => response.json())
//       .then((data) => {
//         const categories = data.categories;
//         const categoriesList = document.getElementById('categoriesList');
//         // console.log(categories)

//         // Create a list item for each category
//         categories.forEach((category) => {
//           const listItem = document.createElement("li");
//           listItem.textContent = category.strCategory;
//           // console.log(categories)

//           // Add click event to load meals when category is clicked
//           listItem.addEventListener("click", function () {
//             fetchMealsByCategory(category.strCategory);
//           });

//           categoriesList.appendChild(listItem);
//           // console.log(categoriesList)
//         });
//       })
//       .catch((error) => console.error("Error fetching categories:", error));

//       // Function to fetch meals by category
//       function fetchMealsByCategory(category) {
//         document.getElementById('output').style.display = 'none';
//         // Show the meals section
//         // document.getElementById('meals').style.display = 'block';
//         fetch(`
//           https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}
//           `)
//           .then((response) => response.json())
//           .then((data) => {
//             displayMeals(data.meals);
//           })
//           .catch((error) => console.error ("Error fetching meals:", error));
//       }

//       // Function to display meals
//       function displayMeals(meals) {
//         const mealsContainer = document.getElementById("meals");
//         // document.querySelector("#output").style.display="none";
//         mealsContainer.innerHTML = "";
//         // console.log(mealsContainer)

//         meals.forEach((meal) => {
//           const mealItem = document.createElement('div');
//           mealItem.classList.add("meal-item");

//           mealItem.innerHTML = `
//           <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
//           <h3>${meal.strMeal}</h3>
//           `;
//           mealsContainer.appendChild(mealItem);
//         })
//       }
//     }
//   );
//       //
//       // Meals----- category---
