/* =========================================================
DR. REZA HEALTH & NUTRITION
FOOD LOGGER 2.0
Automatic Nutrition Calculator
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

 
"use strict";


/* =====================================================
   STORAGE
===================================================== */

const STORAGE_FOODS = "drReza_foodLogger_foods";
const STORAGE_TARGET = "drReza_foodLogger_target";
const STORAGE_DATE = "drReza_foodLogger_date";


/* =====================================================
   DEFAULT TARGET
===================================================== */

const defaultTarget = {
    calories: 2000,
    protein: 150,
    carbs: 200,
    fat: 60
};


/* =====================================================
   FOOD DATABASE
   
   Nutritional values are per 100 g.
   
   IMPORTANT:
   These values are estimates. Actual nutrition can
   vary depending on variety, brand and preparation.
===================================================== */

const foodDatabase = [

    /* =========================
       CARBOHYDRATES
    ========================= */

    {
        id: "nasi-putih",
        name: "Nasi putih",
        category: "Karbohidrat",
        calories: 130,
        protein: 2.7,
        carbs: 28.0,
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
        carbs: 26.0,
        fat: 0.3
    },

    {
        id: "roti-tawar",
        name: "Roti tawar",
        category: "Karbohidrat",
        calories: 266,
        protein: 9.0,
        carbs: 49.0,
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


    /* =========================
       PROTEIN
    ========================= */

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
        protein: 31.0,
        carbs: 0,
        fat: 3.6
    },

    {
        id: "paha-ayam",
        name: "Paha ayam tanpa kulit",
        category: "Protein",
        calories: 209,
        protein: 26.0,
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
        protein: 23.0,
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
        fat: 3.0
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
        protein: 24.0,
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


    /* =========================
       VEGETABLES
    ========================= */

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
        protein: 3.0,
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
        carbs: 7.0,
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


    /* =========================
       FRUITS
    ========================= */

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
        carbs: 15.0,
        fat: 0.4
    },


    /* =========================
       MILK & DAIRY
    ========================= */

    {
        id: "susu-full-cream",
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


    /* =========================
       OTHER
    ========================= */

    {
        id: "alpukat",
        name: "Alpukat",
        category: "Lemak sehat",
        calories: 160,
        protein: 2.0,
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
    },

    {
        id: "kacang-kedelai",
        name: "Kedelai",
        category: "Protein",
        calories: 446,
        protein: 36.5,
        carbs: 30.2,
        fat: 19.9
    }

];


/* =====================================================
   ELEMENTS
===================================================== */

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


/* =====================================================
   SUMMARY
===================================================== */

const totalCalories =
    document.getElementById("totalCalories");

const totalProtein =
    document.getElementById("totalProtein");

const totalCarbs =
    document.getElementById("totalCarbs");

const totalFat =
    document.getElementById("totalFat");


const displayTargetCalories =
    document.getElementById("displayTargetCalories");

const displayTargetProtein =
    document.getElementById("displayTargetProtein");

const displayTargetCarbs =
    document.getElementById("displayTargetCarbs");

const displayTargetFat =
    document.getElementById("displayTargetFat");


const remainingCalories =
    document.getElementById("remainingCalories");

const remainingProtein =
    document.getElementById("remainingProtein");

const remainingCarbs =
    document.getElementById("remainingCarbs");

const remainingFat =
    document.getElementById("remainingFat");


/* =====================================================
   PROGRESS
===================================================== */

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


/* =====================================================
   NAVIGATION
===================================================== */

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


/* =====================================================
   FOOTER
===================================================== */

const footerYear =
    document.getElementById("footerYear");

if (footerYear) {

    footerYear.textContent =
        new Date().getFullYear();

}


/* =====================================================
   DATE
===================================================== */

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


/* =====================================================
   LOAD TARGET
===================================================== */

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


/* =====================================================
   LOAD FOODS
===================================================== */

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


/* =====================================================
   NEW DAY CHECK
===================================================== */

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


/* =====================================================
   STORAGE
===================================================== */

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


/* =====================================================
   NUMBER FORMAT
===================================================== */

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


/* =====================================================
   TARGET DISPLAY
===================================================== */

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


    if (displayTargetCalories) {

        displayTargetCalories.textContent =
            formatNumber(target.calories);

    }

    if (displayTargetProtein) {

        displayTargetProtein.textContent =
            formatNumber(target.protein);

    }

    if (displayTargetCarbs) {

        displayTargetCarbs.textContent =
            formatNumber(target.carbs);

    }

    if (displayTargetFat) {

        displayTargetFat.textContent =
            formatNumber(target.fat);

    }

}


/* =====================================================
   TARGET SAVE
===================================================== */

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


/* =====================================================
   FIND FOOD
===================================================== */

function findFood(foodId) {

    return foodDatabase.find(
        food => food.id === foodId
    );

}


/* =====================================================
   CALCULATE NUTRITION
   
   Formula:
   
   nutrient = value per 100g × weight / 100
===================================================== */

function calculateNutrition(
    food,
    weight
) {

    const multiplier =
        Number(weight) / 100;


    return {

        calories:
            food.calories *
            multiplier,

        protein:
            food.protein *
            multiplier,

        carbs:
            food.carbs *
            multiplier,

        fat:
            food.fat *
            multiplier

    };

}


/* =====================================================
   CREATE FOOD SELECT
   
   This function creates a food selector when the
   current HTML contains a container with ID:
   
   foodDatabaseSelector
   
   We keep compatibility with the old HTML.
===================================================== */

function initializeFoodSelector() {

    const selector =
        document.getElementById(
            "foodDatabaseSelector"
        );


    if (!selector) {
        return;
    }


    selector.innerHTML = "";


    foodDatabase.forEach(food => {

        const option =
            document.createElement(
                "option"
            );

        option.value =
            food.id;

        option.textContent =
            `${food.name} — ${food.category}`;

        selector.appendChild(
            option
        );

    });


    selector.addEventListener(
        "change",
        updateAutomaticNutrition
    );

}


/* =====================================================
   AUTOMATIC NUTRITION PREVIEW
===================================================== */

function updateAutomaticNutrition() {

    const selector =
        document.getElementById(
            "foodDatabaseSelector"
        );

    const amount =
        document.getElementById(
            "foodAmount"
        );


    if (
        !selector ||
        !amount
    ) {
        return;
    }


    const food =
        findFood(
            selector.value
        );

    const weight =
        Number(amount.value);


    if (
        !food ||
        !weight ||
        weight <= 0
    ) {

        return;

    }


    const nutrition =
        calculateNutrition(
            food,
            weight
        );


    updateNutritionPreview(
        nutrition
    );

}


/* =====================================================
   NUTRITION PREVIEW
===================================================== */

function updateNutritionPreview(
    nutrition
) {

    const previewCalories =
        document.getElementById(
            "previewCalories"
        );

    const previewProtein =
        document.getElementById(
            "previewProtein"
        );

    const previewCarbs =
        document.getElementById(
            "previewCarbs"
        );

    const previewFat =
        document.getElementById(
            "previewFat"
        );


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


/* =====================================================
   INPUT EVENT FOR WEIGHT
===================================================== */

const foodAmountInput =
    document.getElementById(
        "foodAmount"
    );


if (foodAmountInput) {

    foodAmountInput.addEventListener(
        "input",
        updateAutomaticNutrition
    );

}


/* =====================================================
   ADD FOOD
   
   VERSION 2:
   Automatically calculates nutrition
   from database + weight.
   
   It also supports old manual fields
   as fallback.
===================================================== */

if (foodForm) {

    foodForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const mealElement =
                document.getElementById(
                    "mealType"
                );

            const nameElement =
                document.getElementById(
                    "foodName"
                );

            const amountElement =
                document.getElementById(
                    "foodAmount"
                );

            const unitElement =
                document.getElementById(
                    "foodUnit"
                );

            const databaseSelector =
                document.getElementById(
                    "foodDatabaseSelector"
                );


            const meal =
                mealElement
                    ? mealElement.value
                    : "";


            const manualName =
                nameElement
                    ? nameElement.value.trim()
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


            let foodName =
                manualName;


            let nutrition = null;


            /*
             * DATABASE MODE
             */

            if (
                databaseSelector &&
                amount > 0 &&
                unit === "gram"
            ) {

                const selectedFood =
                    findFood(
                        databaseSelector.value
                    );


                if (selectedFood) {

                    foodName =
                        selectedFood.name;

                    nutrition =
                        calculateNutrition(
                            selectedFood,
                            amount
                        );

                }

            }


            /*
             * FALLBACK MODE
             *
             * Allows the old HTML to continue
             * functioning until the new UI is installed.
             */

            if (!nutrition) {

                const caloriesElement =
                    document.getElementById(
                        "foodCalories"
                    );

                const proteinElement =
                    document.getElementById(
                        "foodProtein"
                    );

                const carbsElement =
                    document.getElementById(
                        "foodCarbs"
                    );

                const fatElement =
                    document.getElementById(
                        "foodFat"
                    );


                const calories =
                    caloriesElement
                        ? Number(
                            caloriesElement.value
                        )
                        : 0;


                const protein =
                    proteinElement
                        ? Number(
                            proteinElement.value
                        )
                        : 0;


                const carbs =
                    carbsElement
                        ? Number(
                            carbsElement.value
                        )
                        : 0;


                const fat =
                    fatElement
                        ? Number(
                            fatElement.value
                        )
                        : 0;


                nutrition = {

                    calories,
                    protein,
                    carbs,
                    fat

                };

            }


            /*
             * VALIDATION
             */

            if (
                !meal ||
                !foodName ||
                amount <= 0
            ) {

                showNotification(
                    "Lengkapi waktu makan, makanan, dan berat.",
                    "error"
                );

                return;

            }


            if (
                nutrition.calories <= 0 &&
                nutrition.protein <= 0 &&
                nutrition.carbs <= 0 &&
                nutrition.fat <= 0
            ) {

                showNotification(
                    "Nutrisi makanan belum tersedia.",
                    "error"
                );

                return;

            }


            /*
             * CREATE FOOD
             */

            const food = {

                id:
                    Date.now().toString(),

                meal,

                name:
                    foodName,

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

                createdAt:
                    new Date().toISOString()

            };


            foods.push(food);

            saveFoods();

            renderFoods();

            updateSummary();


            foodForm.reset();


            updateAutomaticNutrition();


            showNotification(
                `${foodName} berhasil ditambahkan.`,
                "success"
            );

        }
    );

}


/* =====================================================
   RENDER FOOD LIST
===================================================== */

function renderFoods() {

    if (!foodList) {
        return;
    }


    foodList.innerHTML = "";


    if (foods.length === 0) {

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
                    mealOrder[a.meal] || 99;

                const mealB =
                    mealOrder[b.meal] || 99;


                if (
                    mealA !== mealB
                ) {

                    return mealA - mealB;

                }


                return (
                    new Date(a.createdAt) -
                    new Date(b.createdAt)
                );

            }
        );


    sortedFoods.forEach(food => {

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

    });


    attachDeleteEvents();

}


/* =====================================================
   DELETE FOOD
===================================================== */

function attachDeleteEvents() {

    document
        .querySelectorAll(".delete-food")
        .forEach(button => {

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

        });

}


/* =====================================================
   SUMMARY
===================================================== */

function updateSummary() {

    const totals = {

        calories: 0,

        protein: 0,

        carbs: 0,

        fat: 0

    };


    foods.forEach(food => {

        totals.calories +=
            Number(food.calories) || 0;

        totals.protein +=
            Number(food.protein) || 0;

        totals.carbs +=
            Number(food.carbs) || 0;

        totals.fat +=
            Number(food.fat) || 0;

    });


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


    /* =========================
       REMAINING
    ========================= */

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


    /* =========================
       PROGRESS
    ========================= */

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


/* =====================================================
   PROGRESS
===================================================== */

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


/* =====================================================
   RESET DAY
===================================================== */

if (resetDay) {

    resetDay.addEventListener(
        "click",
        () => {

            if (foods.length === 0) {

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


/* =====================================================
   NOTIFICATION
===================================================== */

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


    requestAnimationFrame(() => {

        notification.classList.add(
            "show"
        );

    });


    setTimeout(() => {

        notification.classList.remove(
            "show"
        );


        setTimeout(() => {

            notification.remove();

        }, 300);

    }, 2800);

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(value) {

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


/* =====================================================
   INITIALIZE
===================================================== */

initializeFoodSelector();

updateTargetDisplay();

renderFoods();

updateSummary();


/* =====================================================
   PUBLIC DEBUG ACCESS
   
   Helpful during development.
===================================================== */

window.drRezaFoodLogger = {

    database:
        foodDatabase,

    getFoods:
        () => foods,

    getTarget:
        () => target,

    calculateNutrition,

    findFood

};
 

});
