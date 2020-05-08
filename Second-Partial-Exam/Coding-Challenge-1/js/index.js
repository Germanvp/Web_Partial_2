function getMealData(meal) {
    let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal

    let settings = {
        method: "GET"
    }

    var resultBody = document.querySelector(".js-search-results")

    resultBody.innerHTML = ''

    fetch(url, settings)
    .then(response => {
        if(response.ok) {
            return response.json()
        }

        console.log(response);
    }).then(responseJson => {
        var resultBody = document.querySelector(".js-search-results")

        if (responseJson["meals"].length <= 0){
            resultBody.innerHTML += '<p>Meal not found</p>'
        }

        responseJson["meals"].forEach(element => {
            resultBody.innerHTML += `<div>
            <h1>` + element.strMeal + `</<h1>
            <p>` + element.strArea + `</p>
            <p>` + element.strInstructions + `</p>
            <img src="`+ element.strMealThumb + `">
            </div>
            `
        });
        console.log(responseJson);
    })
    .catch(err => {
        var resultBody = document.querySelector(".js-search-results")

        resultBody.innerHTML += '<p>Meal not found</p>'
    })
}


function init() {
    let mealForm = document.querySelector(".js-search-form")

    mealForm.addEventListener('submit', (event) => {
        event.preventDefault()

        let meal = document.getElementById("query").value
        console.log("A", meal);
        getMealData(meal);
    })
}

init()