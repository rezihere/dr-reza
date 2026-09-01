/* =========================================================
DR. REZA HEALTH & NUTRITION
FOOD LOGGER 3.0

USDA FOOD DATABASE
Cloudflare Worker API
========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", function () {


/* =====================================================
   CONFIGURATION
===================================================== */

const API_URL =
    "https://dr-reza-food-api.muhammadfahreza78.workers.dev";


const STORAGE_FOODS =
    "drReza_foodLogger_foods";

const STORAGE_TARGET =
    "drReza_foodLogger_target";

const STORAGE_DATE =
    "drReza_foodLogger_date";


const DEFAULT_TARGET = {

    calories: 2000,
    protein: 150,
    carbs: 200,
    fat: 60

};


/* =====================================================
   ELEMENTS
===================================================== */

const foodSearch =
    document.getElementById("foodSearch");

const searchFoodButton =
    document.getElementById("searchFoodButton");

const searchResults =
    document.getElementById("searchResults");

const searchStatus =
    document.getElementById("searchStatus");

const apiStatus =
    document.getElementById("apiStatus");


const selectedFoodBox =
    document.getElementById("selectedFoodBox");

const selectedFoodName =
    document.getElementById("selectedFoodName");

const selectedFoodSource =
    document.getElementById("selectedFoodSource");

const selectedFoodNutrition =
    document.getElementById("selectedFoodNutrition");


const foodAmount =
    document.getElementById("foodAmount");

const foodForm =
    document.getElementById("foodForm");

const mealType =
    document.getElementById("mealType");


const previewCalories =
    document.getElementById("previewCalories");

const previewProtein =
    document.getElementById("previewProtein");

const previewCarbs =
    document.getElementById("previewCarbs");

const previewFat =
    document.getElementById("previewFat");


const foodList =
    document.getElementById("foodList");

const emptyState =
    document.getElementById("emptyState");

const foodCount =
    document.getElementById("foodCount");


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

const resetDay =
    document.getElementById("resetDay");


const currentDate =
    document.getElementById("currentDate");

const footerYear =
    document.getElementById("footerYear");


const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");


/* =====================================================
   STATE
===================================================== */

let selectedFood = null;

let foods = loadFoods();

let target = loadTarget();


/* =====================================================
   DATE
===================================================== */

function getTodayKey() {

    const date = new Date();

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

    return new Date().toLocaleDateString(
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


if (footerYear) {

    footerYear.textContent =
        new Date().getFullYear();

}


/* =====================================================
   NEW DAY
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

    } catch (error) {

        console.error(
            "Gagal membaca foods:",
            error
        );

        return [];

    }

}


function saveFoods() {

    localStorage.setItem(
        STORAGE_FOODS,
        JSON.stringify(foods)
    );

}


function loadTarget() {

    try {

        const saved =
            localStorage.getItem(
                STORAGE_TARGET
            );


        if (!saved) {

            return {
                ...DEFAULT_TARGET
            };

        }


        const parsed =
            JSON.parse(saved);


        return {

            calories:
                Number(parsed.calories)
                || DEFAULT_TARGET.calories,

            protein:
                Number(parsed.protein)
                || DEFAULT_TARGET.protein,

            carbs:
                Number(parsed.carbs)
                || DEFAULT_TARGET.carbs,

            fat:
                Number(parsed.fat)
                || DEFAULT_TARGET.fat

        };

    } catch {

        return {
            ...DEFAULT_TARGET
        };

    }

}


function saveTarget() {

    localStorage.setItem(
        STORAGE_TARGET,
        JSON.stringify(target)
    );

}


/* =====================================================
   NUMBER
===================================================== */

function formatNumber(
    value,
    decimals = 1
) {

    const number =
        Number(value) || 0;


    return number.toLocaleString(
        "id-ID",
        {
            minimumFractionDigits: 0,
            maximumFractionDigits: decimals
        }
    );

}


/* =====================================================
   CALCULATE
===================================================== */

function calculateNutrition(
    food,
    grams
) {

    const weight =
        Number(grams);


    if (
        !food ||
        !Number.isFinite(weight) ||
        weight <= 0
    ) {

        return {

            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0

        };

    }


    const multiplier =
        weight / 100;


    return {

        calories:
            Number(food.kcalPer100g || 0) *
            multiplier,

        protein:
            Number(food.proteinPer100g || 0) *
            multiplier,

        carbs:
            Number(food.carbsPer100g || 0) *
            multiplier,

        fat:
            Number(food.fatPer100g || 0) *
            multiplier

    };

}


/* =====================================================
   SEARCH API
===================================================== */

async function searchFoods() {

    const query =
        foodSearch
            ? foodSearch.value.trim()
            : "";


    if (query.length < 2) {

        showNotification(
            "Masukkan minimal 2 karakter.",
            "error"
        );

        return;

    }


    setSearchLoading(true);


    try {

        /*
         * Worker menerima query melalui parameter q.
         */

        const url =
            API_URL +
            "?q=" +
            encodeURIComponent(query);


        console.log(
            "Food API:",
            url
        );


        const response =
            await fetch(
                url,
                {
                    method: "GET",
                    headers: {
                        "Accept":
                            "application/json"
                    },
                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                "HTTP " +
                response.status
            );

        }


        const data =
            await response.json();


        console.log(
            "Food API response:",
            data
        );


        if (
            !data ||
            data.success !== true
        ) {

            throw new Error(
                data?.error ||
                "API mengembalikan data tidak valid."
            );

        }


        const results =
            Array.isArray(data.foods)
                ? data.foods
                : [];


        renderSearchResults(
            results
        );


        if (results.length === 0) {

            showSearchMessage(
                "Tidak ditemukan makanan yang sesuai."
            );

        }

    } catch (error) {

        console.error(
            "Food API error:",
            error
        );


        showSearchMessage(
            "Gagal mengambil data makanan. Periksa koneksi API/CORS."
        );


        showNotification(
            "Tidak dapat mengambil database makanan.",
            "error"
        );


        if (apiStatus) {

            apiStatus.textContent =
                "API Error";

        }

    } finally {

        setSearchLoading(false);

    }

}


/* =====================================================
   SEARCH LOADING
===================================================== */

function setSearchLoading(
    loading
) {

    if (searchFoodButton) {

        searchFoodButton.disabled =
            loading;

        searchFoodButton.textContent =
            loading
                ? "⏳ Mencari..."
                : "🔎 Cari";

    }


    if (searchStatus) {

        searchStatus.style.display =
            loading
                ? "block"
                : "none";

        searchStatus.textContent =
            loading
                ? "⏳ Sedang mencari database makanan..."
                : "";

    }

}


/* =====================================================
   RENDER SEARCH RESULTS
===================================================== */

function renderSearchResults(
    results
) {

    if (!searchResults) {

        return;

    }


    searchResults.innerHTML = "";


    results.forEach(
        function (food) {

            const item =
                document.createElement(
                    "article"
                );


            item.className =
                "food-item search-food-result";


            const calories =
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


            item.innerHTML = `

                <div class="food-item-main">

                    <span class="food-item-meal">
                        ${escapeHTML(
                            food.category ||
                            "Database makanan"
                        )}
                    </span>

                    <h3 class="food-item-name">
                        ${escapeHTML(
                            food.name ||
                            "Makanan"
                        )}
                    </h3>

                    <div class="food-item-nutrition">

                        <span class="nutrition-value">
                            🔥
                            <strong>
                                ${formatNumber(calories)}
                            </strong>
                            kcal
                        </span>

                        <span class="nutrition-value">
                            🍗
                            <strong>
                                ${formatNumber(protein)}
                            </strong>
                            g protein
                        </span>

                        <span class="nutrition-value">
                            🍚
                            <strong>
                                ${formatNumber(carbs)}
                            </strong>
                            g karbo
                        </span>

                        <span class="nutrition-value">
                            🥑
                            <strong>
                                ${formatNumber(fat)}
                            </strong>
                            g lemak
                        </span>

                    </div>

                </div>

                <div class="food-item-actions">

                    <button
                        type="button"
                        class="select-food-button"
                    >
                        Pilih
                    </button>

                </div>

            `;


            const selectButton =
                item.querySelector(
                    ".select-food-button"
                );


            selectButton.addEventListener(
                "click",
                function () {

                    selectFood(
                        food
                    );

                }
            );


            searchResults.appendChild(
                item
            );

        }
    );

}


/* =====================================================
   SELECT FOOD
===================================================== */

function selectFood(
    food
) {

    selectedFood =
        food;


    if (selectedFoodBox) {

        selectedFoodBox.style.display =
            "block";

    }


    if (selectedFoodName) {

        selectedFoodName.textContent =
            food.name ||
            "Makanan";

    }


    if (selectedFoodSource) {

        selectedFoodSource.textContent =
            food.source ||
            "USDA FoodData Central";

    }


    if (selectedFoodNutrition) {

        selectedFoodNutrition.textContent =

            `${formatNumber(
                food.kcalPer100g
            )} kcal • ` +

            `${formatNumber(
                food.proteinPer100g
            )} g protein • ` +

            `${formatNumber(
                food.carbsPer100g
            )} g karbo • ` +

            `${formatNumber(
                food.fatPer100g
            )} g lemak per 100 g`;

    }


    if (foodAmount) {

        foodAmount.value =
            "";

        foodAmount.focus();

    }


    resetPreview();


    showNotification(
        "Makanan dipilih. Masukkan beratnya.",
        "success"
    );


    if (selectedFoodBox) {

        selectedFoodBox.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }

}


/* =====================================================
   PREVIEW
===================================================== */

function updatePreview() {

    if (!selectedFood) {

        resetPreview();

        return;

    }


    const grams =
        Number(
            foodAmount?.value
        );


    if (
        !grams ||
        grams <= 0
    ) {

        resetPreview();

        return;

    }


    const nutrition =
        calculateNutrition(
            selectedFood,
            grams
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


function resetPreview() {

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


/* =====================================================
   ADD FOOD
===================================================== */

if (foodForm) {

    foodForm.addEventListener(
        "submit",
        function (event) {

            /*
             * INI YANG PALING PENTING.
             *
             * Mencegah browser melakukan
             * submit HTML dan refresh halaman.
             */

            event.preventDefault();

            event.stopPropagation();


            if (!selectedFood) {

                showNotification(
                    "Pilih makanan terlebih dahulu.",
                    "error"
                );

                return false;

            }


            const meal =
                mealType
                    ? mealType.value
                    : "";


            const grams =
                Number(
                    foodAmount?.value
                );


            if (!meal) {

                showNotification(
                    "Pilih waktu makan terlebih dahulu.",
                    "error"
                );

                if (mealType) {

                    mealType.focus();

                }

                return false;

            }


            if (
                !Number.isFinite(grams) ||
                grams <= 0
            ) {

                showNotification(
                    "Masukkan berat makanan dalam gram.",
                    "error"
                );

                if (foodAmount) {

                    foodAmount.focus();

                }

                return false;

            }


            const nutrition =
                calculateNutrition(
                    selectedFood,
                    grams
                );


            if (
                nutrition.calories <= 0 &&
                nutrition.protein <= 0 &&
                nutrition.carbs <= 0 &&
                nutrition.fat <= 0
            ) {

                showNotification(
                    "Data nutrisi makanan tidak valid.",
                    "error"
                );

                return false;

            }


            const food = {

                id:
                    Date.now().toString(),

                meal:
                    meal,

                name:
                    selectedFood.name,

                amount:
                    grams,

                unit:
                    "gram",

                calories:
                    nutrition.calories,

                protein:
                    nutrition.protein,

                carbs:
                    nutrition.carbs,

                fat:
                    nutrition.fat,

                source:
                    selectedFood.source ||
                    "USDA FoodData Central",

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
             * RESET FORM
             */

            selectedFood =
                null;


            if (selectedFoodBox) {

                selectedFoodBox.style.display =
                    "none";

            }


            if (foodAmount) {

                foodAmount.value =
                    "";

            }


            if (mealType) {

                mealType.value =
                    "";

            }


            resetPreview();


            showNotification(
                `${food.name} berhasil ditambahkan.`,
                "success"
            );


            return false;

        }
    );

}


/* =====================================================
   RENDER HISTORY
===================================================== */

function renderFoods() {

    if (!foodList) {

        return;

    }


    foodList.innerHTML =
        "";


    if (
        !foods ||
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


    const sorted =
        [...foods].sort(
            function (a, b) {

                const mealA =
                    mealOrder[a.meal] || 99;

                const mealB =
                    mealOrder[b.meal] || 99;


                if (
                    mealA !== mealB
                ) {

                    return (
                        mealA -
                        mealB
                    );

                }


                return (
                    new Date(a.createdAt) -
                    new Date(b.createdAt)
                );

            }
        );


    sorted.forEach(
        function (food) {

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
                        gram
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
                        data-id="${escapeHTML(food.id)}"
                        title="Hapus makanan"
                        aria-label="Hapus makanan"
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


/* =====================================================
   DELETE
===================================================== */

function attachDeleteEvents() {

    document
        .querySelectorAll(
            ".delete-food"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const id =
                            button.dataset.id;


                        const food =
                            foods.find(
                                function (item) {

                                    return (
                                        String(
                                            item.id
                                        ) ===
                                        String(id)
                                    );

                                }
                            );


                        if (!food) {

                            return;

                        }


                        const confirmed =
                            confirm(
                                `Hapus "${food.name}" dari catatan hari ini?`
                            );


                        if (!confirmed) {

                            return;

                        }


                        foods =
                            foods.filter(
                                function (item) {

                                    return (
                                        String(
                                            item.id
                                        ) !==
                                        String(id)
                                    );

                                }
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


    foods.forEach(
        function (food) {

            totals.calories +=
                Number(food.calories) || 0;

            totals.protein +=
                Number(food.protein) || 0;

            totals.carbs +=
                Number(food.carbs) || 0;

            totals.fat +=
                Number(food.fat) || 0;

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


    updateRemaining(
        remainingCalories,
        target.calories -
        totals.calories,
        "kcal"
    );


    updateRemaining(
        remainingProtein,
        target.protein -
        totals.protein,
        "g"
    );


    updateRemaining(
        remainingCarbs,
        target.carbs -
        totals.carbs,
        "g"
    );


    updateRemaining(
        remainingFat,
        target.fat -
        totals.fat,
        "g"
    );


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


function updateRemaining(
    element,
    value,
    unit
) {

    if (!element) {

        return;

    }


    const remaining =
        Math.max(
            0,
            Number(value) || 0
        );


    element.textContent =
        `${formatNumber(
            remaining
        )} ${unit}`;

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
        (
            Number(current) /
            Number(targetValue)
        ) * 100;


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
   TARGET
===================================================== */

function updateTargetInputs() {

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


if (saveTarget) {

    saveTarget.addEventListener(
        "click",
        function () {

            const calories =
                Number(
                    targetCalories?.value
                );

            const protein =
                Number(
                    targetProtein?.value
                );

            const carbs =
                Number(
                    targetCarbs?.value
                );

            const fat =
                Number(
                    targetFat?.value
                );


            if (
                !calories ||
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


            saveTarget();

            updateSummary();


            showNotification(
                "Target nutrisi berhasil disimpan.",
                "success"
            );

        }
    );

}


/* =====================================================
   RESET DAY
===================================================== */

if (resetDay) {

    resetDay.addEventListener(
        "click",
        function () {

            if (
                foods.length === 0
            ) {

                showNotification(
                    "Belum ada makanan yang dicatat.",
                    "error"
                );

                return;

            }


            const confirmed =
                confirm(
                    "Yakin ingin menghapus seluruh catatan makanan hari ini?"
                );


            if (!confirmed) {

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
   SEARCH EVENTS
===================================================== */

if (searchFoodButton) {

    searchFoodButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            searchFoods();

        }
    );

}


if (foodSearch) {

    foodSearch.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();

                searchFoods();

            }

        }
    );

}


if (foodAmount) {

    foodAmount.addEventListener(
        "input",
        updatePreview
    );

}


/* =====================================================
   NAVBAR
===================================================== */

if (
    menuToggle &&
    navMenu
) {

    menuToggle.addEventListener(
        "click",
        function () {

            const open =
                navMenu.classList.toggle(
                    "active"
                );


            menuToggle.setAttribute(
                "aria-expanded",
                open
                    ? "true"
                    : "false"
            );

        }
    );


    navMenu
        .querySelectorAll(
            ".nav-link"
        )
        .forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        navMenu.classList.remove(
                            "active"
                        );


                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }
                );

            }
        );

}


/* =====================================================
   SEARCH MESSAGE
===================================================== */

function showSearchMessage(
    message
) {

    if (!searchResults) {

        return;

    }


    searchResults.innerHTML = `

        <div class="empty-state">

            <div class="empty-icon">
                🔎
            </div>

            <h3>
                ${escapeHTML(message)}
            </h3>

        </div>

    `;

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


    requestAnimationFrame(
        function () {

            notification.classList.add(
                "show"
            );

        }
    );


    setTimeout(
        function () {

            notification.classList.remove(
                "show"
            );


            setTimeout(
                function () {

                    notification.remove();

                },
                300
            );

        },
        2800
    );

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(
    value
) {

    return String(value ?? "")
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

updateTargetInputs();

renderFoods();

updateSummary();


/* =====================================================
   DEBUG
===================================================== */

window.drRezaFoodLogger = {

    searchFoods,

    calculateNutrition,

    getFoods:
        function () {
            return foods;
        },

    getTarget:
        function () {
            return target;
        },

    getSelectedFood:
        function () {
            return selectedFood;
        }

};
});
