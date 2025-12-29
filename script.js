document.addEventListener("DOMContentLoaded", function () {

    const cars = [
        // ===== ORIGINAL CARS =====
        {
            name: "Toyota Corolla",
            brand: "Toyota",
            year: 2019,
            condition: "Used",
            mileage: "45,000 km",
            price: 140000,
            available: true,
            img: "krish-parmar-q1bBfWG1G1E-unsplash.jpg"
        },
        {
            name: "Honda Accord",
            brand: "Honda",
            year: 2020,
            condition: "Used",
            mileage: "38,000 km",
            price: 250000,
            available: true,
            img: "eli-clouse-G48s1FJb_WE-unsplash.jpg"
        },
        {
            name: "BMW M3",
            brand: "BMW",
            year: 2023,
            condition: "Brand New",
            mileage: "0 km",
            price: 456000,
            available: false, // SOLD
            img: "jakob-rosen-KFlNr7MehPg-unsplash.jpg"
        },
        {
            name: "Mercedes C300",
            brand: "Mercedes",
            year: 2021,
            condition: "Used",
            mileage: "30,000 km",
            price: 290000,
            available: true,
            img: "luke-schobert-uVL4EOTVgoU-unsplash.jpg"
        },
        {
            name: "Tesla Cybertruck",
            brand: "Tesla",
            year: 2022,
            condition: "Brand New",
            mileage: "0 km",
            price: 1850000,
            available: true,
            img: "varun-palaniappan-_JkqGe0ufU8-unsplash.jpg"
        },
        {
            name: "Toyota Hilux",
            brand: "Toyota",
            year: 2018,
            condition: "Used",
            mileage: "60,000 km",
            price: 120000,
            available: true,
            img: "shrawan-choudhary-c2kxNwDcPZo-unsplash.jpg"
        },

        // ===== ADDITIONAL 7 CARS =====
        {
            name: "Lexus Supersport",
            brand: "Lexus",
            year: 2020,
            condition: "Used",
            mileage: "42,000 km",
            price: 110000,
            available: true,
            img: "daniil-lyusov-H-spSeBgiXc-unsplash.jpg"
        },
        {
            name: "Toyota Highlander",
            brand: "Toyota",
            year: 2021,
            condition: "Used",
            mileage: "28,000 km",
            price: 260000,
            available: true,
            img: "gabriel-tovar-aNwtUkpb3cU-unsplash.jpg"
        },
        {
            name: "Toyota Fortuner",
            brand: "Toyota",
            year: 2019,
            condition: "Used",
            mileage: "55,000 km",
            price: 135000,
            available: true,
            img: "devan-mnn-9Px9UR-wZkQ-unsplash.jpg"
        },
        {
            name: "Honda CR-V",
            brand: "Honda",
            year: 2018,
            condition: "Used",
            mileage: "70,000 km",
            price: 95000,
            available: true,
            img: "y-s-psnrEcsAcjY-unsplash.jpg"
        },
        {
            name: "BMW XM",
            brand: "BMW",
            year: 2022,
            condition: "Brand New",
            mileage: "0 km",
            price: 890000,
            available: true,
            img: "brian-lundquist-TBieehOJqQc-unsplash.jpg"
        },
        {
            name: "Hyundai Santa FE",
            brand: "Hyundai",
            year: 2021,
            condition: "Used",
            mileage: "33,000 km",
            price: 160000,
            available: true,
            img: "zoshua-colah-pRGsIjCvUrA-unsplash.jpg"
        },
        {
            name: "Mazda CX-5",
            brand: "Mazda",
            year: 2020,
            condition: "Used",
            mileage: "40,000 km",
            price: 155000,
            available: true,
            img: "duc-van-Kpkarn5Ezx8-unsplash.jpg"
        }
    ];

    const grid = document.getElementById("carGrid");
    const filterBtn = document.getElementById("filterBtn");
    const minInput = document.getElementById("minPrice");
    const maxInput = document.getElementById("maxPrice");
    const brandInput = document.getElementById("brandFilter");
    const conditionInput = document.getElementById("conditionFilter");

    // Remove commas and convert to number
    function parseNumber(value) {
        return Number(value.replace(/,/g, "")) || 0;
    }

    // Format number inputs with commas
    function formatWithCommas(input) {
        input.addEventListener("input", () => {
            let raw = input.value.replace(/,/g, "");
            if (!isNaN(raw) && raw !== "") {
                input.value = Number(raw).toLocaleString();
            }
        });
    }

    formatWithCommas(minInput);
    formatWithCommas(maxInput);

    function displayCars(list) {
        grid.innerHTML = "";

        if (list.length === 0) {
            grid.innerHTML = `
                <div style="grid-column:1/-1; text-align:center; padding:40px;">
                    😕 <strong>We didn’t find your match</strong>
                </div>`;
            return;
        }

        list.forEach((car, index) => {
            const card = document.createElement("div");
            card.className = "car-card";
            card.style.animationDelay = `${index * 0.08}s`;

            const message = encodeURIComponent(
                `Loftus Garage 👋\n\nI'm interested in this car:\n• ${car.name}\n• Year: ${car.year}\n• Condition: ${car.condition}\n• Price: GHS ${car.price.toLocaleString()}\n\nIs it still available?`
            );

            card.innerHTML = `
                <img src="${car.img}" alt="${car.name}">
                <div class="car-info">
                    <h3>${car.name}</h3>
                    <p>Brand: ${car.brand}</p>
                    <p>Year: ${car.year}</p>
                    <p>Condition: ${car.condition}</p>
                    <p>Mileage: ${car.mileage}</p>
                    <p class="price">GHS ${car.price.toLocaleString()}</p>
                    <a class="contact-btn"
                       href="https://wa.me/233243495780?text=${message}"
                       target="_blank">
                       View Details
                    </a>
                </div>
            `;

            grid.appendChild(card);
        });
    }

    function filterCars() {
        const min = parseNumber(minInput.value);
        const max = parseNumber(maxInput.value) || Infinity;
        const brand = brandInput.value.toLowerCase();
        const condition = conditionInput.value;

        const filtered = cars.filter(car =>
            car.available === true &&
            car.price >= min &&
            car.price <= max &&
            (brand === "" || car.brand.toLowerCase().includes(brand)) &&
            (condition === "" || car.condition === condition)
        );

        displayCars(filtered);
    }

    filterBtn.addEventListener("click", filterCars);

    // Initial load: show only available cars
    displayCars(cars.filter(car => car.available === true));

});

