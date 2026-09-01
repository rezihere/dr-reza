```javascript
/* =========================================================
   DR. REZA HEALTH & NUTRITION
   FOOD LOGGER 3.0

   Hybrid Food Search
   Local Food Database + Cloudflare Worker + USDA

   Cloudflare Worker:
   https://dr-reza-food-api.muhammadfahreza78.workers.dev/
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

"use strict";


/* =========================================================
   CONFIGURATION
========================================================= */

const FOOD_API_URL =
    "https://dr-reza-food-api.muhammadfahreza78.workers.dev/";


/* =========================================================
   STORAGE
========================================================= */

const STORAGE_FOODS =
    "drReza_foodLogger_foods";

const STORAGE_TARGET =
    "drReza_foodLogger_target";

const STORAGE_DATE =
    "drReza_foodLogger_date";


/* =========================================================
   DEFAULT TARGET
========================================================= */

const defaultTarget = {

    calories: 2000,
    protein: 150,
    carbs: 200,
    fat: 60

};


/* =========================================================
   LOCAL FOOD DATABASE
   Fallback / common Indonesian foods
   Values per 100 g
========================================================= */

const foodDatabase = [

    {
        id: "nasi-putih",
        name: "Nasi putih",
        category: "Karbohidrat",
        calories: 130,
        protein: 2.7,
        carbs: 28,
        fat: 0.3
    },

    {
        id: "nasi-merah",
        name: "Nasi merah",
        category: "Karbohidrat",
        calories: 123,
        protein: 2.7,
        carbs: 25.6,
        fat: 0.9
    },

    {
        id: "kentang-rebus",
        name: "Kentang rebus",
        category: "Karbohidrat",
        calories: 87,
        protein: 1.9,
        carbs: 20.1,
        fat: 0.1
    },

    {
        id: "ubi-rebus",
        name: "Ubi jalar rebus",
        category: "Karbohidrat",
        calories: 76,
        protein: 1.4,
        carbs: 17.7,
        fat: 0.1
    },

    {
        id: "singkong-rebus",
        name: "Singkong rebus",
        category: "Karbohidrat",
        calories: 112,
        protein: 1.4,
        carbs: 26,
        fat: 0.3
    },

    {
        id: "roti-tawar",
        name: "Roti tawar",
        category: "Karbohidrat",
        calories: 266,
        protein: 9,
        carbs: 49,
        fat: 3.2
    },

    {
        id: "oatmeal",
        name: "Oatmeal kering",
        category: "Karbohidrat",
        calories: 389,
        protein: 16.9,
        carbs: 66.3,
        fat: 6.9
    },

    {
        id: "telur-ayam",
        name: "Telur ayam",
        category: "Protein",
        calories: 143,
        protein: 12.6,
        carbs: 0.7,
        fat: 9.5
    },

    {
        id: "dada-ayam",
        name: "Dada ayam tanpa kulit",
        category: "Protein",
        calories: 165,
        protein: 31,
        carbs: 0,
        fat: 3.6
    },

    {
        id: "paha-ayam",
        name: "Paha ayam tanpa kulit",
        category: "Protein",
        calories: 209,
        protein: 26,
        carbs: 0,
        fat: 10.9
    },

    {
        id: "ikan-kembung",
        name: "Ikan kembung",
        category: "Protein",
        calories: 167,
        protein: 21.3,
        carbs: 0,
        fat: 8.2
    },

    {
        id: "ikan-tongkol",
        name: "Ikan tongkol",
        category: "Protein",
        calories: 117,
        protein: 23,
        carbs: 0,
        fat: 2.3
    },

    {
        id: "ikan-lele",
        name: "Ikan lele",
        category: "Protein",
        calories: 105,
        protein: 18.7,
        carbs: 0,
        fat: 3
    },

    {
        id: "ikan-nila",
        name: "Ikan nila",
        category: "Protein",
        calories: 96,
        protein: 20.1,
        carbs: 0,
        fat: 1.7
    },

    {
        id: "udang",
        name: "Udang",
        category: "Protein",
        calories: 99,
        protein: 24,
        carbs: 0.2,
        fat: 0.3
    },

    {
        id: "tahu",
        name: "Tahu putih",
        category: "Protein",
        calories: 76,
        protein: 8.1,
        carbs: 0.8,
        fat: 4.8
    },

    {
        id: "tempe",
        name: "Tempe",
        category: "Protein",
        calories: 192,
        protein: 20.3,
        carbs: 7.6,
        fat: 10.8
    },

    {
        id: "bayam",
        name: "Bayam",
        category: "Sayuran",
        calories: 23,
        protein: 2.9,
        carbs: 3.6,
        fat: 0.4
    },

    {
        id: "kangkung",
        name: "Kangkung",
        category: "Sayuran",
        calories: 29,
        protein: 3,
        carbs: 5.4,
        fat: 0.3
    },

    {
        id: "wortel",
        name: "Wortel",
        category: "Sayuran",
        calories: 41,
        protein: 0.9,
        carbs: 9.6,
        fat: 0.2
    },

    {
        id: "brokoli",
        name: "Brokoli",
        category: "Sayuran",
        calories: 34,
        protein: 2.8,
        carbs: 6.6,
        fat: 0.4
    },

    {
        id: "kol",
        name: "Kol",
        category: "Sayuran",
        calories: 25,
        protein: 1.3,
        carbs: 5.8,
        fat: 0.1
    },

    {
        id: "buncis",
        name: "Buncis",
        category: "Sayuran",
        calories: 31,
        protein: 1.8,
        carbs: 7,
        fat: 0.2
    },

    {
        id: "tomat",
        name: "Tomat",
        category: "Sayuran",
        calories: 18,
        protein: 0.9,
        carbs: 3.9,
        fat: 0.2
    },

    {
        id: "pisang",
        name: "Pisang",
        category: "Buah",
        calories: 89,
        protein: 1.1,
        carbs: 22.8,
        fat: 0.3
    },

    {
        id: "apel",
        name: "Apel",
        category: "Buah",
        calories: 52,
        protein: 0.3,
        carbs: 13.8,
        fat: 0.2
    },

    {
        id: "pepaya",
        name: "Pepaya",
        category: "Buah",
        calories: 43,
        protein: 0.5,
        carbs: 10.8,
        fat: 0.3
    },

    {
        id: "semangka",
        name: "Semangka",
        category: "Buah",
        calories: 30,
        protein: 0.6,
        carbs: 7.6,
        fat: 0.2
    },

    {
        id: "jeruk",
        name: "Jeruk",
        category: "Buah",
        calories: 47,
        protein: 0.9,
        carbs: 11.8,
        fat: 0.1
    },

    {
        id: "mangga",
        name: "Mangga",
        category: "Buah",
        calories: 60,
        protein: 0.8,
        carbs: 15,
        fat: 0.4
    },

    {
        id: "susu",
        name: "Susu sapi full cream",
        category: "Susu",
        calories: 61,
        protein: 3.2,
        carbs: 4.8,
        fat: 3.3
    },

    {
        id: "yogurt",
        name: "Yogurt plain",
        category: "Susu",
        calories: 61,
        protein: 3.5,
        carbs: 4.7,
        fat: 3.3
    },

    {
        id: "alpukat",
        name: "Alpukat",
        category: "Lemak sehat",
        calories: 160,
        protein: 2,
        carbs: 8.5,
        fat: 14.7
    },

    {
        id: "kacang-tanah",
        name: "Kacang tanah",
        category: "Lemak sehat",
        calories: 567,
        protein: 25.8,
        carbs: 16.1,
        fat: 49.2
    }

];


/* =========================================================
   ELEMENTS
========================================================= */

const targetCalories =
    document.getElementById("targetCalories");

const targetProtein =
    document.getElementById("targetProtein");

const targetCarbs =
    document.getElementById("targetCarbs");

const targetFat =
    document.getElementById("targetFat");

const saveTarget =
    document.getElementById("saveTarget");

const foodForm =
    document.getElementById("foodForm");

const foodList =
    document.getElementById("foodList");

const emptyState =
    document.getElementById("emptyState");

const foodCount =
    document.getElementById("foodCount");

const currentDate =
    document.getElementById("currentDate");

const resetDay =
    document.getElementById("resetDay");


/* =========================================================
   SUMMARY
========================================================= */

const totalCalories =
    document.getElementById("totalCalories");

const totalProtein =
    document.getElementById("totalProtein");

const totalCarbs =
    document.getElementById("totalCarbs");

const totalFat =
    document.getElementById("totalFat");

const remainingCalories =
    document.getElementById("remainingCalories");

const remainingProtein =
    document.getElementById("remainingProtein");

const remainingCarbs =
    document.getElementById("remainingCarbs");

const remainingFat =
    document.getElementById("remainingFat");


/* =========================================================
   PROGRESS
========================================================= */

const calorieProgress =
    document.getElementById("calorieProgress");

const proteinProgress =
    document.getElementById("proteinProgress");

const carbsProgress =
    document.getElementById("carbsProgress");

const fatProgress =
    document.getElementById("fatProgress");

const caloriePercentage =
    document.getElementById("caloriePercentage");

const proteinPercentage =
    document.getElementById("proteinPercentage");

const carbsPercentage =
    document.getElementById("carbsPercentage");

const fatPercentage =
    document.getElementById("fatPercentage");


/* =========================================================
   SEARCH ELEMENTS
========================================================= */

const foodSearch =
    document.getElementById("foodSearch");

const foodSearchResults =
    document.getElementById("foodSearchResults");

const foodSearchStatus =
    document.getElementById("foodSearchStatus");

const clearFoodSearch =
    document.getElementById("clearFoodSearch");

const selectedFood =
    document.getElementById("selectedFood");

const selectedFoodName =
    document.getElementById("selectedFoodName");

const selectedFoodSource =
    document.getElementById("selectedFoodSource");

const changeFood =
    document.getElementById("changeFood");


/* =========================================================
   FORM ELEMENTS
========================================================= */

const foodAmount =
    document.getElementById("foodAmount");

const foodName =
    document.getElementById("foodName");

const foodCalories =
    document.getElementById("foodCalories");

const foodProtein =
    document.getElementById("foodProtein");

const foodCarbs =
    document.getElementById("foodCarbs");

const foodFat =
    document.getElementById("foodFat");

const previewCalories =
    document.getElementById("previewCalories");

const previewProtein =
    document.getElementById("previewProtein");

const previewCarbs =
    document.getElementById("previewCarbs");

const previewFat =
    document.getElementById("previewFat");


/* =========================================================
   NAVIGATION
========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");


if (menuToggle && navMenu) {

    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                navMenu.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        }
    );


    navMenu
        .querySelectorAll(".nav-link")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navMenu.classList.remove(
                        "active"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });

}


/* =========================================================
   FOOTER
========================================================= */

const footerYear =
    document.getElementById("footerYear");

if (footerYear) {

    footerYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   DATE
========================================================= */

function getTodayKey() {

    const date =
        new Date();

    return [

        date.getFullYear(),

        String(
            date.getMonth() + 1
        ).padStart(2, "0"),

        String(
            date.getDate()
        ).padStart(2, "0")

    ].join("-");

}


function formatDate() {

    return new Date()
        .toLocaleDateString(
            "id-ID",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

}


if (currentDate) {

    currentDate.textContent =
        formatDate();

}


/* =========================================================
   LOAD TARGET
========================================================= */

function loadTarget() {

    try {

        const saved =
            localStorage.getItem(
                STORAGE_TARGET
            );

        if (!saved) {

            return {
                ...defaultTarget
            };

        }

        const parsed =
            JSON.parse(saved);

        return {

            calories:
                Number(parsed.calories)
                || defaultTarget.calories,

            protein:
                Number(parsed.protein)
                || defaultTarget.protein,

            carbs:
                Number(parsed.carbs)
                || defaultTarget.carbs,

            fat:
                Number(parsed.fat)
                || defaultTarget.fat

        };

    } catch {

        return {
            ...defaultTarget
        };

    }

}


let target =
    loadTarget();


/* =========================================================
   LOAD FOODS
========================================================= */

function loadFoods() {

    try {

        const saved =
            localStorage.getItem(
                STORAGE_FOODS
            );

        if (!saved) {

            return [];

        }

        const parsed =
            JSON.parse(saved);

        return Array.isArray(parsed)
            ? parsed
            : [];

    } catch {

        return [];

    }

}


let foods =
    loadFoods();


/* =========================================================
   NEW DAY
========================================================= */

function checkNewDay() {

    const today =
        getTodayKey();

    const savedDate =
        localStorage.getItem(
            STORAGE_DATE
        );


    if (!savedDate) {

        localStorage.setItem(
            STORAGE_DATE,
            today
        );

        return;

    }


    if (savedDate !== today) {

        foods = [];

        saveFoods();

        localStorage.setItem(
            STORAGE_DATE,
            today
        );

    }

}


checkNewDay();


/* =========================================================
   STORAGE
========================================================= */

function saveFoods() {

    localStorage.setItem(
        STORAGE_FOODS,
        JSON.stringify(foods)
    );

}


function saveTargetData() {

    localStorage.setItem(
        STORAGE_TARGET,
        JSON.stringify(target)
    );

}


/* =========================================================
   NUMBER FORMAT
========================================================= */

function formatNumber(
    value,
    decimals = 1
) {

    const number =
        Number(value) || 0;

    if (Number.isInteger(number)) {

        return number.toLocaleString(
            "id-ID"
        );

    }

    return number.toLocaleString(
        "id-ID",
        {
            minimumFractionDigits: 0,
            maximumFractionDigits: decimals
        }
    );

}


/* =========================================================
   TARGET DISPLAY
========================================================= */

function updateTargetDisplay() {

    if (targetCalories) {

        targetCalories.value =
            target.calories;

    }

    if (targetProtein) {

        targetProtein.value =
            target.protein;

    }

    if (targetCarbs) {

        targetCarbs.value =
            target.carbs;

    }

    if (targetFat) {

        targetFat.value =
            target.fat;

    }

}


/* =========================================================
   TARGET SAVE
========================================================= */

if (saveTarget) {

    saveTarget.addEventListener(
        "click",
        () => {

            const calories =
                Number(
                    targetCalories.value
                );

            const protein =
                Number(
                    targetProtein.value
                );

            const carbs =
                Number(
                    targetCarbs.value
                );

            const fat =
                Number(
                    targetFat.value
                );


            if (
                calories <= 0 ||
                protein < 0 ||
                carbs < 0 ||
                fat < 0
            ) {

                showNotification(
                    "Masukkan target nutrisi yang valid.",
                    "error"
                );

                return;

            }


            target = {

                calories,
                protein,
                carbs,
                fat

            };


            saveTargetData();

            updateTargetDisplay();

            updateSummary();


            showNotification(
                "Target berhasil disimpan.",
                "success"
            );

        }
    );

}


/* =========================================================
   LOCAL SEARCH
========================================================= */

function searchLocalFoods(query) {

    const normalized =
        query
            .toLowerCase()
            .trim();

    if (!normalized) {

        return [];

    }


    return foodDatabase
        .filter(food => {

            return food.name
                .toLowerCase()
                .includes(normalized);

        })
        .map(food => ({

            id: food.id,

            name: food.name,

            brand: "",

            category:
                food.category,

            kcalPer100g:
                food.calories,

            proteinPer100g:
                food.protein,

            carbsPer100g:
                food.carbs,

            fatPer100g:
                food.fat,

            source:
                "Database Lokal Dr. Reza"

        }));

}


/* =========================================================
   SEARCH ONLINE
========================================================= */

let searchTimer = null;

let currentSearchController = null;

let selectedFoodData = null;


if (foodSearch) {

    foodSearch.addEventListener(
        "input",
        () => {

            const query =
                foodSearch.value.trim();


            clearTimeout(
                searchTimer
            );


            if (
                query.length < 2
            ) {

                clearSearchResults();

                return;

            }


            searchTimer =
                setTimeout(
                    () => {

                        performFoodSearch(
                            query
                        );

                    },
                    450
                );

        }
    );

}


/* =========================================================
   PERFORM FOOD SEARCH
========================================================= */

async function performFoodSearch(
    query
) {

    if (!foodSearchResults) {

        return;

    }


    if (currentSearchController) {

        currentSearchController.abort();

    }


    currentSearchController =
        new AbortController();


    foodSearchStatus.textContent =
        "🔎 Mencari makanan...";


    foodSearchResults.innerHTML =
        "";


    try {

        const url =
            `${FOOD_API_URL}?q=${encodeURIComponent(query)}`;


        const response =
            await fetch(
                url,
                {
                    method: "GET",
                    signal:
                        currentSearchController.signal
                }
            );


        if (!response.ok) {

            throw new Error(
                "Server tidak merespons."
            );

        }


        const data =
            await response.json();


        if (
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Pencarian gagal."
            );

        }


        const onlineFoods =
            Array.isArray(data.foods)
                ? data.foods
                : [];


        const localFoods =
            searchLocalFoods(query);


        const combined =
            mergeFoodResults(
                localFoods,
                onlineFoods
            );


        renderSearchResults(
            combined,
            query
        );


    } catch (error) {

        if (
            error.name ===
            "AbortError"
        ) {

            return;

        }


        console.error(
            "Food search error:",
            error
        );


        foodSearchStatus.textContent =
            "⚠️ Pencarian online gagal. Mencoba database lokal...";


        const localFoods =
            searchLocalFoods(query);


        renderSearchResults(
            localFoods,
            query
        );

    }

}


/* =========================================================
   MERGE RESULTS
========================================================= */

function mergeFoodResults(
    localFoods,
    onlineFoods
) {

    const result = [];

    const seen = new Set();


    /*
     * Local foods first
     */

    localFoods.forEach(food => {

        const key =
            normalizeFoodName(
                food.name
            );


        if (!seen.has(key)) {

            seen.add(key);

            result.push(food);

        }

    });


    /*
     * Online foods
     */

    onlineFoods.forEach(food => {

        if (
            !food ||
            !food.name
        ) {

            return;

        }


        const key =
            normalizeFoodName(
                food.name
            );


        if (!seen.has(key)) {

            seen.add(key);

            result.push(food);

        }

    });


    return result.slice(
        0,
        12
    );

}


/* =========================================================
   NORMALIZE FOOD NAME
========================================================= */

function normalizeFoodName(
    name
) {

    return String(name)
        .toLowerCase()
        .replace(
            /[^a-z0-9\s]/g,
            ""
        )
        .replace(
            /\s+/g,
            " "
        )
        .trim();

}


/* =========================================================
   RENDER SEARCH RESULTS
========================================================= */

function renderSearchResults(
    results,
    query
) {

    if (!foodSearchResults) {

        return;

    }


    foodSearchResults.innerHTML =
        "";


    if (!results.length) {

        foodSearchStatus.textContent =
            `Tidak ditemukan makanan untuk "${query}".`;

        return;

    }


    foodSearchStatus.textContent =
        `${results.length} hasil ditemukan`;


    results.forEach(
        (food, index) => {

            const card =
                document.createElement(
                    "button"
                );


            card.type =
                "button";


            card.className =
                "food-result-card";


            card.dataset.index =
                index;


            const kcal =
                Number(
                    food.kcalPer100g
                ) || 0;


            const protein =
                Number(
                    food.proteinPer100g
                ) || 0;


            const carbs =
                Number(
                    food.carbsPer100g
                ) || 0;


            const fat =
                Number(
                    food.fatPer100g
                ) || 0;


            card.innerHTML = `

                <div class="food-result-main">

                    <div class="food-result-icon">
                        🍽️
                    </div>

                    <div class="food-result-info">

                        <strong>
                            ${escapeHTML(food.name)}
                        </strong>

                        ${
                            food.brand
                                ? `
                                <small>
                                    ${escapeHTML(food.brand)}
                                </small>
                                `
                                : ""
                        }

                        <span>
                            ${
                                food.category
                                    ? escapeHTML(
                                        food.category
                                    )
                                    : "Makanan"
                            }
                        </span>

                    </div>

                </div>


                <div class="food-result-nutrition">

                    <span>
                        🔥
                        <b>
                            ${formatNumber(kcal)}
                        </b>
                        kcal
                    </span>

                    <span>
                        P
                        ${formatNumber(protein)}
                        g
                    </span>

                    <span>
                        K
                        ${formatNumber(carbs)}
                        g
                    </span>

                    <span>
                        L
                        ${formatNumber(fat)}
                        g
                    </span>

                </div>


                <div class="food-result-footer">

                    <small>
                        per 100 g
                    </small>

                    <small>
                        ${escapeHTML(
                            food.source ||
                            "Database makanan"
                        )}
                    </small>

                </div>

            `;


            card.addEventListener(
                "click",
                () => {

                    selectFood(
                        food
                    );

                }
            );


            foodSearchResults.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   SELECT FOOD
========================================================= */

function selectFood(
    food
) {

    selectedFoodData = {

        id:
            food.id,

        name:
            food.name,

        brand:
            food.brand || "",

        category:
            food.category || "",

        kcalPer100g:
            Number(
                food.kcalPer100g
            ) || 0,

        proteinPer100g:
            Number(
                food.proteinPer100g
            ) || 0,

        carbsPer100g:
            Number(
                food.carbsPer100g
            ) || 0,

        fatPer100g:
            Number(
                food.fatPer100g
            ) || 0,

        source:
            food.source ||
            "Database makanan"

    };


    /*
     * Fill hidden compatibility fields
     */

    if (foodName) {

        foodName.value =
            selectedFoodData.name;

    }


    if (foodCalories) {

        foodCalories.value =
            selectedFoodData.kcalPer100g;

    }


    if (foodProtein) {

        foodProtein.value =
            selectedFoodData.proteinPer100g;

    }


    if (foodCarbs) {

        foodCarbs.value =
            selectedFoodData.carbsPer100g;

    }


    if (foodFat) {

        foodFat.value =
            selectedFoodData.fatPer100g;

    }


    /*
     * Display selected food
     */

    if (selectedFood) {

        selectedFood.hidden =
            false;

    }


    if (selectedFoodName) {

        selectedFoodName.textContent =
            selectedFoodData.name;

    }


    if (selectedFoodSource) {

        selectedFoodSource.textContent =
            `${selectedFoodData.kcalPer100g} kcal / 100 g • ${selectedFoodData.source}`;

    }


    if (foodSearch) {

        foodSearch.value =
            selectedFoodData.name;

    }


    if (foodSearchResults) {

        foodSearchResults.innerHTML =
            "";

    }


    if (foodSearchStatus) {

        foodSearchStatus.textContent =
            "✓ Makanan dipilih";

    }


    updateAutomaticNutrition();

}


/* =========================================================
   CHANGE FOOD
========================================================= */

if (changeFood) {

    changeFood.addEventListener(
        "click",
        () => {

            selectedFoodData =
                null;


            if (selectedFood) {

                selectedFood.hidden =
                    true;

            }


            if (foodSearch) {

                foodSearch.value =
                    "";

                foodSearch.focus();

            }


            clearNutritionPreview();

        }
    );

}


/* =========================================================
   CLEAR SEARCH
========================================================= */

if (clearFoodSearch) {

    clearFoodSearch.addEventListener(
        "click",
        () => {

            if (foodSearch) {

                foodSearch.value =
                    "";

                foodSearch.focus();

            }


            selectedFoodData =
                null;


            if (selectedFood) {

                selectedFood.hidden =
                    true;

            }


            clearSearchResults();

            clearNutritionPreview();

        }
    );

}


/* =========================================================
   CLEAR SEARCH RESULTS
========================================================= */

function clearSearchResults() {

    if (foodSearchResults) {

        foodSearchResults.innerHTML =
            "";

    }


    if (foodSearchStatus) {

        foodSearchStatus.textContent =
            "";

    }

}


/* =========================================================
   CALCULATE NUTRITION
========================================================= */

function calculateNutrition(
    food,
    weight
) {

    const multiplier =
        Number(weight) / 100;


    return {

        calories:
            Number(
                food.kcalPer100g ??
                food.calories ??
                0
            ) * multiplier,

        protein:
            Number(
                food.proteinPer100g ??
                food.protein ??
                0
            ) * multiplier,

        carbs:
            Number(
                food.carbsPer100g ??
                food.carbs ??
                0
            ) * multiplier,

        fat:
            Number(
                food.fatPer100g ??
                food.fat ??
                0
            ) * multiplier

    };

}


/* =========================================================
   AUTOMATIC PREVIEW
========================================================= */

function updateAutomaticNutrition() {

    if (
        !selectedFoodData ||
        !foodAmount
    ) {

        return;

    }


    const weight =
        Number(
            foodAmount.value
        );


    if (
        !weight ||
        weight <= 0
    ) {

        clearNutritionPreview();

        return;

    }


    const nutrition =
        calculateNutrition(
            selectedFoodData,
            weight
        );


    updateNutritionPreview(
        nutrition
    );


    /*
     * Update hidden fields
     */

    if (foodCalories) {

        foodCalories.value =
            nutrition.calories;

    }


    if (foodProtein) {

        foodProtein.value =
            nutrition.protein;

    }


    if (foodCarbs) {

        foodCarbs.value =
            nutrition.carbs;

    }


    if (foodFat) {

        foodFat.value =
            nutrition.fat;

    }

}


/* =========================================================
   WEIGHT INPUT
========================================================= */

if (foodAmount) {

    foodAmount.addEventListener(
        "input",
        updateAutomaticNutrition
    );

}


/* =========================================================
   NUTRITION PREVIEW
========================================================= */

function updateNutritionPreview(
    nutrition
) {

    if (previewCalories) {

        previewCalories.textContent =
            `${formatNumber(
                nutrition.calories
            )} kcal`;

    }


    if (previewProtein) {

        previewProtein.textContent =
            `${formatNumber(
                nutrition.protein
            )} g`;

    }


    if (previewCarbs) {

        previewCarbs.textContent =
            `${formatNumber(
                nutrition.carbs
            )} g`;

    }


    if (previewFat) {

        previewFat.textContent =
            `${formatNumber(
                nutrition.fat
            )} g`;

    }

}


/* =========================================================
   CLEAR PREVIEW
========================================================= */

function clearNutritionPreview() {

    if (previewCalories) {

        previewCalories.textContent =
            "0 kcal";

    }

    if (previewProtein) {

        previewProtein.textContent =
            "0 g";

    }

    if (previewCarbs) {

        previewCarbs.textContent =
            "0 g";

    }

    if (previewFat) {

        previewFat.textContent =
            "0 g";

    }

}


/* =========================================================
   ADD FOOD
========================================================= */

if (foodForm) {

    foodForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const mealElement =
                document.getElementById(
                    "mealType"
                );


            const amountElement =
                document.getElementById(
                    "foodAmount"
                );


            const unitElement =
                document.getElementById(
                    "foodUnit"
                );


            const meal =
                mealElement
                    ? mealElement.value
                    : "";


            const amount =
                amountElement
                    ? Number(
                        amountElement.value
                    )
                    : 0;


            const unit =
                unitElement
                    ? unitElement.value
                    : "gram";


            /*
             * Selected online/local food
             */

            if (
                !selectedFoodData
            ) {

                showNotification(
                    "Silakan cari dan pilih makanan terlebih dahulu.",
                    "error"
                );

                return;

            }


            if (
                !meal
            ) {

                showNotification(
                    "Pilih waktu makan terlebih dahulu.",
                    "error"
                );

                return;

            }


            if (
                !amount ||
                amount <= 0
            ) {

                showNotification(
                    "Masukkan berat makanan.",
                    "error"
                );

                return;

            }


            const nutrition =
                calculateNutrition(
                    selectedFoodData,
                    amount
                );


            if (
                nutrition.calories <= 0 &&
                nutrition.protein <= 0 &&
                nutrition.carbs <= 0 &&
                nutrition.fat <= 0
            ) {

                showNotification(
                    "Data nutrisi makanan tidak tersedia.",
                    "error"
                );

                return;

            }


            const food = {

                id:
                    Date.now().toString(),

                meal,

                name:
                    selectedFoodData.name,

                amount,

                unit,

                calories:
                    nutrition.calories,

                protein:
                    nutrition.protein,

                carbs:
                    nutrition.carbs,

                fat:
                    nutrition.fat,

                source:
                    selectedFoodData.source,

                createdAt:
                    new Date().toISOString()

            };


            foods.push(
                food
            );


            saveFoods();

            renderFoods();

            updateSummary();


            /*
             * Reset form
             */

            foodForm.reset();


            selectedFoodData =
                null;


            if (selectedFood) {

                selectedFood.hidden =
                    true;

            }


            if (foodSearch) {

                foodSearch.value =
                    "";

            }


            clearSearchResults();

            clearNutritionPreview();


            showNotification(
                `${food.name} ${formatNumber(amount)} g berhasil ditambahkan.`,
                "success"
            );


            /*
             * Scroll to history
             */

            setTimeout(() => {

                if (foodList) {

                    foodList.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest"
                    });

                }

            }, 150);

        }
    );

}


/* =========================================================
   RENDER FOOD LIST
========================================================= */

function renderFoods() {

    if (!foodList) {

        return;

    }


    foodList.innerHTML =
        "";


    if (
        foods.length === 0
    ) {

        if (emptyState) {

            emptyState.style.display =
                "block";

        }


        if (foodCount) {

            foodCount.textContent =
                "0 makanan";

        }


        return;

    }


    if (emptyState) {

        emptyState.style.display =
            "none";

    }


    if (foodCount) {

        foodCount.textContent =
            `${foods.length} makanan`;

    }


    const mealOrder = {

        "Sarapan": 1,

        "Snack Pagi": 2,

        "Makan Siang": 3,

        "Snack Sore": 4,

        "Makan Malam": 5,

        "Snack Malam": 6

    };


    const sortedFoods =
        [...foods].sort(
            (a, b) => {

                const mealA =
                    mealOrder[a.meal] ||
                    99;

                const mealB =
                    mealOrder[b.meal] ||
                    99;


                if (
                    mealA !== mealB
                ) {

                    return (
                        mealA -
                        mealB
                    );

                }


                return (
                    new Date(
                        a.createdAt
                    ) -
                    new Date(
                        b.createdAt
                    )
                );

            }
        );


    sortedFoods.forEach(
        food => {

            const item =
                document.createElement(
                    "article"
                );


            item.className =
                "food-item";


            item.innerHTML = `

                <div class="food-item-main">

                    <span class="food-item-meal">
                        ${escapeHTML(food.meal)}
                    </span>

                    <h3 class="food-item-name">
                        ${escapeHTML(food.name)}
                    </h3>

                    <div class="food-item-portion">
                        ${formatNumber(food.amount)}
                        ${escapeHTML(food.unit)}
                    </div>

                    <div class="food-item-nutrition">

                        <span class="nutrition-value">
                            🔥
                            <strong>
                                ${formatNumber(food.calories)}
                            </strong>
                            kcal
                        </span>

                        <span class="nutrition-value">
                            🍗
                            <strong>
                                ${formatNumber(food.protein)}
                            </strong>
                            g protein
                        </span>

                        <span class="nutrition-value">
                            🍚
                            <strong>
                                ${formatNumber(food.carbs)}
                            </strong>
                            g karbo
                        </span>

                        <span class="nutrition-value">
                            🥑
                            <strong>
                                ${formatNumber(food.fat)}
                            </strong>
                            g lemak
                        </span>

                    </div>

                    ${
                        food.source
                            ? `
                            <small class="food-source">
                                ${escapeHTML(food.source)}
                            </small>
                            `
                            : ""
                    }

                </div>


                <div class="food-item-actions">

                    <button
                        type="button"
                        class="delete-food"
                        data-id="${food.id}"
                        aria-label="Hapus ${escapeHTML(food.name)}"
                        title="Hapus makanan"
                    >
                        🗑️
                    </button>

                </div>

            `;


            foodList.appendChild(
                item
            );

        }
    );


    attachDeleteEvents();

}


/* =========================================================
   DELETE FOOD
========================================================= */

function attachDeleteEvents() {

    document
        .querySelectorAll(
            ".delete-food"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const id =
                            button.dataset.id;


                        const food =
                            foods.find(
                                item =>
                                    item.id === id
                            );


                        if (!food) {

                            return;

                        }


                        if (
                            !confirm(
                                `Hapus "${food.name}" dari catatan hari ini?`
                            )
                        ) {

                            return;

                        }


                        foods =
                            foods.filter(
                                item =>
                                    item.id !== id
                            );


                        saveFoods();

                        renderFoods();

                        updateSummary();


                        showNotification(
                            "Makanan berhasil dihapus.",
                            "success"
                        );

                    }
                );

            }
        );

}


/* =========================================================
   SUMMARY
========================================================= */

function updateSummary() {

    const totals = {

        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0

    };


    foods.forEach(
        food => {

            totals.calories +=
                Number(
                    food.calories
                ) || 0;

            totals.protein +=
                Number(
                    food.protein
                ) || 0;

            totals.carbs +=
                Number(
                    food.carbs
                ) || 0;

            totals.fat +=
                Number(
                    food.fat
                ) || 0;

        }
    );


    if (totalCalories) {

        totalCalories.textContent =
            formatNumber(
                totals.calories
            );

    }


    if (totalProtein) {

        totalProtein.textContent =
            formatNumber(
                totals.protein
            );

    }


    if (totalCarbs) {

        totalCarbs.textContent =
            formatNumber(
                totals.carbs
            );

    }


    if (totalFat) {

        totalFat.textContent =
            formatNumber(
                totals.fat
            );

    }


    const remainCalories =
        Math.max(
            0,
            target.calories -
            totals.calories
        );


    const remainProtein =
        Math.max(
            0,
            target.protein -
            totals.protein
        );


    const remainCarbs =
        Math.max(
            0,
            target.carbs -
            totals.carbs
        );


    const remainFat =
        Math.max(
            0,
            target.fat -
            totals.fat
        );


    if (remainingCalories) {

        remainingCalories.textContent =
            `${formatNumber(
                remainCalories
            )} kcal`;

    }


    if (remainingProtein) {

        remainingProtein.textContent =
            `${formatNumber(
                remainProtein
            )} g`;

    }


    if (remainingCarbs) {

        remainingCarbs.textContent =
            `${formatNumber(
                remainCarbs
            )} g`;

    }


    if (remainingFat) {

        remainingFat.textContent =
            `${formatNumber(
                remainFat
            )} g`;

    }


    updateProgress(
        calorieProgress,
        caloriePercentage,
        totals.calories,
        target.calories
    );


    updateProgress(
        proteinProgress,
        proteinPercentage,
        totals.protein,
        target.protein
    );


    updateProgress(
        carbsProgress,
        carbsPercentage,
        totals.carbs,
        target.carbs
    );


    updateProgress(
        fatProgress,
        fatPercentage,
        totals.fat,
        target.fat
    );

}


/* =========================================================
   PROGRESS
========================================================= */

function updateProgress(
    progressElement,
    percentageElement,
    current,
    targetValue
) {

    if (!progressElement) {

        return;

    }


    if (
        !targetValue ||
        targetValue <= 0
    ) {

        progressElement.style.width =
            "0%";


        if (percentageElement) {

            percentageElement.textContent =
                "0%";

        }

        return;

    }


    const percentage =
        current /
        targetValue *
        100;


    const width =
        Math.min(
            Math.max(
                percentage,
                0
            ),
            100
        );


    progressElement.style.width =
        `${width}%`;


    if (percentageElement) {

        percentageElement.textContent =
            `${Math.round(
                percentage
            )}%`;

    }

}


/* =========================================================
   RESET DAY
========================================================= */

if (resetDay) {

    resetDay.addEventListener(
        "click",
        () => {

            if (
                foods.length === 0
            ) {

                showNotification(
                    "Belum ada makanan yang dicatat.",
                    "error"
                );

                return;

            }


            if (
                !confirm(
                    "Yakin ingin menghapus seluruh catatan makanan hari ini?"
                )
            ) {

                return;

            }


            foods = [];


            saveFoods();

            renderFoods();

            updateSummary();


            showNotification(
                "Catatan hari ini berhasil direset.",
                "success"
            );

        }
    );

}


/* =========================================================
   NOTIFICATION
========================================================= */

function showNotification(
    message,
    type = "success"
) {

    const old =
        document.querySelector(
            ".food-notification"
        );


    if (old) {

        old.remove();

    }


    const notification =
        document.createElement(
            "div"
        );


    notification.className =
        `food-notification ${type}`;


    notification.innerHTML = `

        <span class="notification-icon">
            ${
                type === "success"
                    ? "✓"
                    : "!"
            }
        </span>

        <span>
            ${escapeHTML(message)}
        </span>

    `;


    document.body.appendChild(
        notification
    );


    requestAnimationFrame(
        () => {

            notification.classList.add(
                "show"
            );

        }
    );


    setTimeout(
        () => {

            notification.classList.remove(
                "show"
            );


            setTimeout(
                () => {

                    notification.remove();

                },
                300
            );

        },
        2800
    );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(
    value
) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   INITIALIZE
========================================================= */

updateTargetDisplay();

renderFoods();

updateSummary();

clearNutritionPreview();


/* =========================================================
   PUBLIC DEBUG ACCESS
========================================================= */

window.drRezaFoodLogger = {

    database:
        foodDatabase,

    getFoods:
        () => foods,

    getTarget:
        () => target,

    getSelectedFood:
        () => selectedFoodData,

    calculateNutrition,

    searchLocalFoods,

    searchOnline:
        performFoodSearch

};


});
```
