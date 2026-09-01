/* =========================================================
DR. REZA HEALTH & NUTRITION
FOOD LOGGER JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

 
"use strict";


/* =====================================================
   STORAGE KEYS
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
   SUMMARY ELEMENTS
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
   PROGRESS ELEMENTS
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
   MOBILE NAVIGATION
===================================================== */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");


if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            navMenu.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });


    const navLinks =
        navMenu.querySelectorAll(".nav-link");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* =====================================================
   FOOTER YEAR
===================================================== */

const footerYear =
    document.getElementById("footerYear");

if (footerYear) {

    footerYear.textContent =
        new Date().getFullYear();

}


/* =====================================================
   DATE FUNCTIONS
===================================================== */

function getTodayKey() {

    const now = new Date();

    const year =
        now.getFullYear();

    const month =
        String(now.getMonth() + 1).padStart(2, "0");

    const day =
        String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

}


function formatDate() {

    const now = new Date();

    return now.toLocaleDateString(
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
   DEFAULT DATA
===================================================== */

function loadTarget() {

    try {

        const saved =
            localStorage.getItem(STORAGE_TARGET);

        if (!saved) {

            return {
                ...defaultTarget
            };

        }

        const parsed =
            JSON.parse(saved);

        return {
            calories:
                Number(parsed.calories) || defaultTarget.calories,

            protein:
                Number(parsed.protein) || defaultTarget.protein,

            carbs:
                Number(parsed.carbs) || defaultTarget.carbs,

            fat:
                Number(parsed.fat) || defaultTarget.fat
        };

    } catch (error) {

        console.error(
            "Gagal membaca target:",
            error
        );

        return {
            ...defaultTarget
        };

    }

}


let target = loadTarget();


/* =====================================================
   LOAD FOOD DATA
===================================================== */

function loadFoods() {

    try {

        const saved =
            localStorage.getItem(STORAGE_FOODS);

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
            "Gagal membaca data makanan:",
            error
        );

        return [];

    }

}


let foods = loadFoods();


/* =====================================================
   AUTOMATIC NEW DAY
===================================================== */

function checkNewDay() {

    const today =
        getTodayKey();

    const savedDate =
        localStorage.getItem(STORAGE_DATE);

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
   SAVE FUNCTIONS
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
   FORMAT NUMBER
===================================================== */

function formatNumber(value, decimals = 1) {

    const number =
        Number(value) || 0;

    if (Number.isInteger(number)) {

        return number.toLocaleString("id-ID");

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
   UPDATE TARGET DISPLAY
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
   SAVE TARGET
===================================================== */

if (saveTarget) {

    saveTarget.addEventListener(
        "click",
        () => {

            const calories =
                Number(targetCalories.value);

            const protein =
                Number(targetProtein.value);

            const carbs =
                Number(targetCarbs.value);

            const fat =
                Number(targetFat.value);


            if (
                calories <= 0 ||
                protein < 0 ||
                carbs < 0 ||
                fat < 0
            ) {

                showNotification(
                    "Mohon masukkan target yang valid.",
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
                "Target nutrisi berhasil disimpan.",
                "success"
            );

        }
    );

}


/* =====================================================
   ADD FOOD
===================================================== */

if (foodForm) {

    foodForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const mealType =
                document.getElementById(
                    "mealType"
                ).value;

            const foodName =
                document.getElementById(
                    "foodName"
                ).value.trim();

            const foodAmount =
                Number(
                    document.getElementById(
                        "foodAmount"
                    ).value
                );

            const foodUnit =
                document.getElementById(
                    "foodUnit"
                ).value;

            const calories =
                Number(
                    document.getElementById(
                        "foodCalories"
                    ).value
                );

            const protein =
                Number(
                    document.getElementById(
                        "foodProtein"
                    ).value
                );

            const carbs =
                Number(
                    document.getElementById(
                        "foodCarbs"
                    ).value
                );

            const fat =
                Number(
                    document.getElementById(
                        "foodFat"
                    ).value
                );


            if (
                !mealType ||
                !foodName ||
                foodAmount <= 0 ||
                calories < 0 ||
                protein < 0 ||
                carbs < 0 ||
                fat < 0
            ) {

                showNotification(
                    "Mohon lengkapi data makanan.",
                    "error"
                );

                return;

            }


            const food = {

                id:
                    Date.now().toString(),

                meal:
                    mealType,

                name:
                    foodName,

                amount:
                    foodAmount,

                unit:
                    foodUnit,

                calories:
                    calories,

                protein:
                    protein,

                carbs:
                    carbs,

                fat:
                    fat,

                createdAt:
                    new Date().toISOString()

            };


            foods.push(food);

            saveFoods();

            renderFoods();

            updateSummary();


            foodForm.reset();


            showNotification(
                `${foodName} berhasil ditambahkan.`,
                "success"
            );


            document
                .getElementById("foodName")
                ?.focus();

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

                if (mealA !== mealB) {

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
            document.createElement("article");

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
                        🔥 <strong>
                            ${formatNumber(food.calories)}
                        </strong> kcal
                    </span>

                    <span class="nutrition-value">
                        🍗 <strong>
                            ${formatNumber(food.protein)}
                        </strong> g protein
                    </span>

                    <span class="nutrition-value">
                        🍚 <strong>
                            ${formatNumber(food.carbs)}
                        </strong> g karbo
                    </span>

                    <span class="nutrition-value">
                        🥑 <strong>
                            ${formatNumber(food.fat)}
                        </strong> g lemak
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


        foodList.appendChild(item);

    });


    attachDeleteEvents();

}


/* =====================================================
   DELETE FOOD
===================================================== */

function attachDeleteEvents() {

    const buttons =
        document.querySelectorAll(
            ".delete-food"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const id =
                    button.dataset.id;

                const food =
                    foods.find(
                        item => item.id === id
                    );


                if (!food) {
                    return;
                }


                const confirmation =
                    confirm(
                        `Hapus "${food.name}" dari catatan hari ini?`
                    );


                if (!confirmation) {
                    return;
                }


                foods =
                    foods.filter(
                        item => item.id !== id
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
   UPDATE SUMMARY
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


    /* TOTAL */

    if (totalCalories) {

        totalCalories.textContent =
            formatNumber(totals.calories);

    }

    if (totalProtein) {

        totalProtein.textContent =
            formatNumber(totals.protein);

    }

    if (totalCarbs) {

        totalCarbs.textContent =
            formatNumber(totals.carbs);

    }

    if (totalFat) {

        totalFat.textContent =
            formatNumber(totals.fat);

    }


    /* REMAINING */

    const remaining = {

        calories:
            target.calories -
            totals.calories,

        protein:
            target.protein -
            totals.protein,

        carbs:
            target.carbs -
            totals.carbs,

        fat:
            target.fat -
            totals.fat

    };


    if (remainingCalories) {

        remainingCalories.textContent =
            `${formatNumber(
                Math.max(0, remaining.calories)
            )} kcal`;

    }


    if (remainingProtein) {

        remainingProtein.textContent =
            `${formatNumber(
                Math.max(0, remaining.protein)
            )} g`;

    }


    if (remainingCarbs) {

        remainingCarbs.textContent =
            `${formatNumber(
                Math.max(0, remaining.carbs)
            )} g`;

    }


    if (remainingFat) {

        remainingFat.textContent =
            `${formatNumber(
                Math.max(0, remaining.fat)
            )} g`;

    }


    /* PROGRESS */

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
   UPDATE PROGRESS
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


    if (!targetValue || targetValue <= 0) {

        progressElement.style.width =
            "0%";

        if (percentageElement) {

            percentageElement.textContent =
                "0%";

        }

        return;

    }


    const percentage =
        (current / targetValue) * 100;


    const displayPercentage =
        Math.round(percentage);


    const width =
        Math.min(
            Math.max(percentage, 0),
            100
        );


    progressElement.style.width =
        `${width}%`;


    if (percentageElement) {

        percentageElement.textContent =
            `${displayPercentage}%`;

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
                    "Belum ada catatan makanan untuk dihapus.",
                    "error"
                );

                return;

            }


            const confirmation =
                confirm(
                    "Yakin ingin menghapus seluruh catatan makanan hari ini?"
                );


            if (!confirmation) {
                return;
            }


            foods = [];

            saveFoods();

            renderFoods();

            updateSummary();


            showNotification(
                "Catatan hari ini telah direset.",
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

    const existing =
        document.querySelector(
            ".food-notification"
        );


    if (existing) {
        existing.remove();
    }


    const notification =
        document.createElement("div");

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
   PHOTO / CAMERA FOUNDATION
   ===================================================== */

/*
   Fitur AI belum memanggil API di tahap ini.

   Fungsi berikut dipersiapkan untuk tahap berikutnya:

   1. Kamera smartphone
   2. Upload foto
   3. Preview
   4. Kirim foto ke backend
   5. Vision AI
   6. Deteksi makanan
   7. Estimasi porsi
   8. Estimasi nutrisi
*/


function initializePhotoFeature() {

    const photoInput =
        document.getElementById(
            "foodPhoto"
        );

    const cameraInput =
        document.getElementById(
            "foodCamera"
        );

    const photoPreview =
        document.getElementById(
            "photoPreview"
        );

    const removePhoto =
        document.getElementById(
            "removePhoto"
        );


    if (
        !photoInput &&
        !cameraInput
    ) {

        return;

    }


    function handlePhoto(file) {

        if (!file) {
            return;
        }


        if (
            !file.type.startsWith(
                "image/"
            )
        ) {

            showNotification(
                "File yang dipilih harus berupa gambar.",
                "error"
            );

            return;

        }


        const maxSize =
            10 * 1024 * 1024;


        if (file.size > maxSize) {

            showNotification(
                "Ukuran foto maksimal 10 MB.",
                "error"
            );

            return;

        }


        const reader =
            new FileReader();


        reader.onload = event => {

            if (photoPreview) {

                photoPreview.src =
                    event.target.result;

                photoPreview.style.display =
                    "block";

            }


            if (removePhoto) {

                removePhoto.style.display =
                    "inline-flex";

            }

        };


        reader.readAsDataURL(file);


        /*
            TEMPORARY:

            File belum dikirim ke AI.

            Tahap berikutnya kita akan
            mengirim foto ke backend
            yang aman.
        */

        console.log(
            "Foto siap dianalisis:",
            file.name
        );

    }


    if (photoInput) {

        photoInput.addEventListener(
            "change",
            event => {

                const file =
                    event.target.files?.[0];

                handlePhoto(file);

            }
        );

    }


    if (cameraInput) {

        cameraInput.addEventListener(
            "change",
            event => {

                const file =
                    event.target.files?.[0];

                handlePhoto(file);

            }
        );

    }


    if (removePhoto) {

        removePhoto.addEventListener(
            "click",
            () => {

                if (photoInput) {
                    photoInput.value = "";
                }

                if (cameraInput) {
                    cameraInput.value = "";
                }

                if (photoPreview) {

                    photoPreview.src = "";

                    photoPreview.style.display =
                        "none";

                }

                removePhoto.style.display =
                    "none";

            }
        );

    }

}


initializePhotoFeature();


/* =====================================================
   INITIAL RENDER
===================================================== */

updateTargetDisplay();

renderFoods();

updateSummary();
 

});
