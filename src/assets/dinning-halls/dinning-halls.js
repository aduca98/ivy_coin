export default {
    dinningHalls: {
        1: {
            name: "Andrews",
            description: "This popular dinning hall contains classics such as pizzas and sandwiches as well as more exotic options such as pho and curry. ",
            photo: require('./images/Andrews.jpg'),
            location: {
                address: "211 Bowen St, Providence, RI 02912",
                lat: 41.830583,
                long: -71.402411
            },
            food: [
                {
                    name: "Cheese Pizza",
                    description: "fresh dough from our bakeshop, house-made sauce, and a blend of cheeses, hearth-baked for a perfect slice",
                    tags: ["Cheese Pizza", "lunch", "dinner", "vegetarian"],
                    photo: require('./images/cheesePizza.jpg')
                },
                {
                    name: "Pepperoni Pizza",
                    description: "spicy pepperoni slices on our hand-made cheese pizza",
                    tags: ["Pepperoni Pizza", "lunch", "dinner"],
                    photo: require('./images/whatever-file-name-is.png')
                },
                {
                    name: "Pepperoni & Meatball",
                    description: "classic peperoni with house made meatballs",
                    tags: ["Pepperoni & Meatball", "dinner"],
                    photo: require('./images/pepPizza.jpg')
                },
                {
                    name: "Cookie Slice",
                    description: "giant chocolate chip cookie, baked in a pizza pan. served warm :)",
                    tags: ["Cookie Slice", "lunch", "dinner", "desert"],
                    photo: require('./images/cookiePizza.jpg')
                },
                {
                    name: "Brownie",
                    description: "giant brownie, baked in a pizza pan. served warm :)",
                    tags: ["Brownie", "lunch", "dinner", "desert"],
                    photo: require('./images/BrowniePizza.jpg')
                },
                {
                    name: "Bacon & Feta",
                    description: "niman ranch bacon & narragansett creamery feta, house made pizza sauce",
                    tags: ["Bacon & Feta", "dinner"],
                    photo: require('./images/bacon&Feta.jpg')
                },
                {
                    name: "Brunch Burrito",
                    description: "an andrews classic! get here early to avoid the line :)",
                    tags: ["Brunch Burrito", "breakfast", "lunch"],
                    photo: require('./images/brunchBurrito.jpg')
                },
                {
                    name: "Pho",
                    description: "Our twist on the classic Vietnamese soup. start with fresh rice noodles, cooked to order. choose from an array of vegetables, house roasted sirloin beef, all natural chicken breast or tofu. finish with your choice of chicken broth, vegetable broth or green curry broth.",
                    tags: ["Pho", "lunch","dinner"],
                    photo: require('./images/pho.jpg')
                },
                {
                    name: "Granola Bowl",
                    description: "andrews famous granola, local yogurt, fresh fruit. rotating toppings available",
                    tags: ["Granola Bowl", "breakfast", "lunch"],
                    photo: require('./images/gBowl.jpg')
                },
            ]
        },
        2: {
            name: "VDub",
            description: "Located on the Pembroke campus, Verney-Woolley (better known as the “V-Dub”) is the smaller of Brown’s two all-you-care-to-eat dining halls. Its intimacy and unique character carry over to its work environment where our culinary team prepares grilled items in full view of the line. Dine with friends at our round tables or booth seating, in the sunny windows of the dining room, or outside in the inner courtyard. Looking to grab a quiet bite? The V-Dub has counter seating perfect for solo diners.",
            photo: require('./images/VDub.jpg'),
            location: {
                address: "135 Cushing St, Providence, RI 02912",
                lat: 41.829802,
                long: -71.401696
            },
            food: [
                {
                    name: "Chicken Fingers",
                    description: "a Friday specialty of the VDub",
                    tags: ["Chicken Fingers", "lunch","dinner"],
                    photo: require('./images/chicken-fingers.jpg')
                },
                {
                    name: "Waffles",
                    description: "crisp and freshly-made",
                    tags: ["Waffles", "breakfast", "lunch", "vegetarian"],
                    photo: require('./images/waffles.jpg')
                },
                {
                    name: "Burrito Bowl",
                    description: "don't forget to add a note to this custom order!",
                    tags: ["Burrito Bowl", "lunch","dinner","vegetarian", "gluten-free"],
                    photo: require('./images/burrito-bowl.jpg')
                },
                {
                    name: "Salad Bar",
                    description: "don't forget to add a note to this custom order!",
                    tags: ["Salad Bar", "lunch","dinner","vegetarian","gluten-free"],
                    photo: require('./images/salad-bar.jpg')
                },
                {
                    name: "Steak Fries",
                    description: "large, thick, wedge-shaped fries",
                    tags: ["Steak Fries", "lunch", "dinner", "vegetarian", "gluten-free"],
                    photo: require('./images/steak-fries.jpg')
                },
                {
                    name: "Zuchinni Muffins",
                    description: "a tasty desert option for the health-concious",
                    tags: ["Zuchinni Muffins", "lunch", "dinner", "vegetarian"],
                    photo: require('./images/zucchini-muffins.jpg')
                },
                {
                    name: "Lentil Stew",
                    description: "a thick stew of lentils and sausage",
                    tags: ["Lentil Stew", "lunch", "dinner"],
                    photo: require('./images/lentil-stew.jpg')
                }
            ]
        },
        3: {
            name: "Blue Room",
            description: "Conveniently located in the Stephen Robert Campus Center, the Blue Room Café features sustainable fair-trade coffee, delicious breakfast sandwiches and a fantastic array of freshly baked goodies and artisan pastries. The Blue Room also boasts an extensive, customizable deli with local artisan bread, high-quality meats, and plenty of vegetarian options. Locally prepared soups, sushi, and a wide selection of fresh snacks and beverages are available for folks on the go. The Blue Room also partners with local restaurants serving authentic ethnic cuisine.",
            photo: require('./images/BlueRoom.jpg'),
            location: {
                address: "75 Waterman St, Providence, RI 02912",
                lat: 41.826754, 
                long: -71.403197
            },
            food: [
                {
                    name: "Chicken, Kale & Sweet Potato Soup",
                    description: "chicken, kale, sweet potato, kidney beans, vegetables in a hearty chicken broth",
                    tags: ["Chicken, Kale & Sweet Potato Soup", "lunch", "dinner", "gluten-free"],
                    photo: require('./images/CKSPSoup.jpg')
                },
                {
                    name: "Baked Potato Soup",
                    description: "potatoes, uncured bacon, chives, and spice in a creamy chicken broth",
                    tags: ["Baked Potato Soup", "lunch", "dinner", "gluten-free"],
                    photo: require('./images/BPSoup.jpg')
                },
                {
                    name: "Butternut Squash & Apple Soup",
                    description: "pureed butternut squash and apples with fresh rosemary in a flavorful chicken broth with cream and butter",
                    tags: ["Butternut Squash & Apple Soup", "lunch", "dinner", "gluten-free"],
                    photo: require('./images/BSSoup.jpg')
                },
                {
                    name: "Madras Chicken Curry with Green Beans",
                    description: "white meat chicken, coconut milk, tamarind paste, red chili powder, coriander and cumin powder, star anise, herbs, spices and green beans",
                    tags: ["Madras Chicken Curry with Green Beans", "lunch", "dinner"],
                    photo: require('./images/MadrasChicken.jpg')
                },
                {
                    name: "Vegetable Dhanask",
                    description: "butternut squash, eggplant, carrot, green beans, cauliflower, corn, lima bans, coriander and cumin powder, tamarind paste and coconut paste",
                    tags: ["Vegetable Dhanask", "lunch", "dinner", "vegetarian"],
                    photo: require('./images/VegieDhansak.jpg')
                },
            ]
        }
        4: {
            name: "Ratty",
            description: "Choose from a variety of quality entrees and sides crafted from scratch-made recipes, locally grown produce, quality meats from our in-house Butcher Shop, and Pinterest-worthy desserts from our in-house Bakeshop.",
            photo: require('./images/Ratty.jpg'),
            location: {
                address: "Upper Level, 144 Thayer St, Providence, RI 02906",
                lat: 41.825218,
                long: -71.401232
            },
            food: [
                {
                    name: "Scrambled Eggs",
                    description: "eggs stirred and beaten together in a pan while being gently heated",
                    tags: ["Scrambled Eggs", "breakfast", "lunch", "vegetarian", "gluten-free"],
                    photo: require('./images/scrambled-eggs.jpg')
                },
                {
                    name: "Pancakes",
                    description: "prepared from a starch-based batter with eggs, milk, and butter and cooked on a griddle",
                    tags: ["Pancakes", "breakfast", "vegetarian"],
                    photo: require('./images/pancake.png')
                },
                {
                    name: "Breakfast Sausage",
                    description: "a fresh pork sausage",
                    tags: ["Breakfast Sausage", "breakfast", "gluten-free"],
                    photo: require('./images/breakfast-sausage.png')
                },
                {
                    name: "Home Fries with Garlic",
                    description: "potatoes cooked in oil and butter and then seasoned with garlic and onion powders",
                    tags: ["Home Fries with Garlic", "breakfast", "lunch", "vegetarian", "gluten-free"],
                    photo: require('./images/home-fries.jpg')
                },
                {
                    name: "Bacon",
                    description: "delicious cured and smoked bacon",
                    tags: ["Bacon","breakfast"],
                    photo: require('./images/')
                },
                {
                    name: "Whole Wheat Penne Pasta",
                    description: "cylindrical-shaped pasta",
                    tags: ["Whole Wheat Penne Pasta", "lunch", "dinner", "vegetarian"],
                    photo: require('./images/whatever-file-name-is.png')
                },
                {
                    name: "Red Potato Frittata",
                    description: "yummy omelette good for breakfast or lunch",
                    tags: ["Red Potato Frittata", "breakfast", "lunch", "dinner", "vegetarian"],
                    photo: require('./images/fritata.jpg')
                },
                {
                    name: "Tamale Pie",
                    description: "a pie and casserole dish prepared with a cornmeal crust",
                    tags: ["Tamale Pie", "lunch", "dinner"],
                    photo: require('./images/tamale-pie-3-550.jpg')
                },
                {
                    name: "Veggie Pizza",
                    description: "vegetarian pizza, order by the slice",
                    tags: ["Veggie Pizza", "lunch", "dinner", "vegetarian"],
                    photo: require('./images/veg-pizza.jpg')
                },
                {
                    name: "Pepperoni Pizza",
                    description: "classic pepperoni, order by the slice",
                    tags: ["Pepperoni Pizza", "lunch", "dinner"],
                    photo: require('./images/pepperoni-pizza.jpg')
                },
                {
                    name: "Grilled Itallian Chicken",
                    description: "grilled chicken, for the health-concious consumer",
                    tags: ["Grilled Itallian Chicken", "lunch", "dinner", "gluten-free"],
                    photo: require('./images/itallian-chicken.jpg')
                },
                {
                    name: "Fried Southwest Black Bean Burger",
                    description: "a vegetarian option for burger-lovers",
                    tags: ["Fried Southwest Black Bean Burger", "lunch", "dinner", "vegetarian"],
                    photo: require('./images/black-bean-burger.jpg')
                },
                {
                    name: "Curly Fries",
                    description: "crispy potatoes fried, spiralized, and seasoned",
                    tags: ["Curly Fries", "lunch", "dinner", "gluten-free", "vegetarian"],
                    photo: require('./images/curly-fries.jpg')
                },
                {
                    name: "Waffle Fries",
                    description: "crispy and crunchy waffle-shaped potatoes",
                    tags: ["Waffle Fries", "lunch", "dinner", "gluten-free", "vegetarian"],
                    photo: require('./images/waffle-fries.jpg')
                },
                {
                    name: "m&m Cookies",
                    description: "warm, oven-baked cookies with m&m chocolates",
                    tags: ["m&m Cookies", "lunch", "dinner","vegetarian", "desert"],
                    photo: require('./images/mm-cookies.jpg')
                },
                {
                    name: "S'mores Cupcakes",
                    description: "cupcakes with hershey's chocolate and marshmallow",
                    tags: ["S'mores Cupcakes", "lunch", "dinner","vegetarian", "desert"],
                    photo: require('./images/smores-cupcake.jpg')
                }
            ]
        },
        5: {
            name: "Jo's",
            description: "Customize your meal with our make your own chopped salads and quesadillas; or choose from our popular grilled selection of burgers, chicken sandwiches, french fries, and onion rings",
            photo: require('./images/jos.jpg'),
            location: {
                address: "114 Power St, Providence, RI 02912",
                lat: 41.823639,
                long: -71.399550
            },
            food: [
                {
                    name: "Spicy With",
                    description: "a staple of every diet",
                    tags: ["Spicy With", "dinner"],
                    photo: require('./images/spicy-with-cmon-we-can-find-a-better-picture-than-this.jpg')
                },
                {
                    name: "Waffle Fries",
                    description: "crispy and crunchy waffle-shaped potatoes",
                    tags: ["Waffle Fries", "dinner", "vegetarian"],
                    photo: require('./images/waffle-fries.jpg')
                },
                {
                    name: "Mac and Cheese Bacon Burger",
                    description: "1/4 angus beef burger, topped with Blount mac and cheese sprinkled with bacon bits. Served on a Calise potato bun.",
                    tags: ["Mac and Cheese Bacon Burger", "dinner"],
                    photo: require('./images/mac-n-cheese-bacon-burger.jpg')
                },
                {
                    name: "Cobb Salad",
                    description: "lettuce, cheese, bacon bits, tomatoes, and croutons",
                    tags: ["Cobb Salad", "dinner"],
                    photo: require('./images/cobb-salad.jpg')
                },
                {
                    name: "Caesar Salad",
                    description: "fresh chopped romaine lettuce, grilled chicken, shaved parmesan cheese, garlic croutons, creamy caesar dressing",
                    tags: ["Caesar Salad", "dinner"],
                    photo: require('./images/caesar-salad.jpg')
                },
                {
                    name: "Cheeseburger",
                    description: "flame grilled quarter pound burger. served on a potato roll with your choice of condiments and sauces.",
                    tags: ["Cheeseburger", "dinner"],
                    photo: require('./images/cheeseburger.jpg')
                },
                {
                    name: "Tacos",
                    description: "soft corn tacos, with a plethora of topping options",
                    tags: ["Tacos", "dinner","gluten-free"],
                    photo: require('./images/beef-tacos.jpg')
                }
            ]
        },
        6: {
            name: "Ivy Room",
            description: "The Ivy Room features a daily selection of hot entrees, made-to-order sandwiches and salads, homemade soups, and more.",
            photo: require('./images/Ratty.jpg'),
            location: {
                address: "Lower Level, 144 Thayer St, Providence, RI 02906",
                lat: 41.825218,
                long: -71.401232
            },
            food: [
                {
                    name: "Veggie Tacos",
                    description: "don't forget to add a note to this custom order!",
                    tags: ["Veggie Tacos", "dinner", "vegetarian"],
                    photo: require('./images/beggie-tacos.jpg')
                },
                {
                    name: "Avocado Toast",
                    description: "don't forget to add a note to this custom order!",
                    tags: ["Avocado Toast","lunch", "dinner", "vegetarian"],
                    photo: require('./images/avocado-toast.jpg')
                },
                {
                    name: "Smoothie",
                    description: "don't forget to add a note to this custom order!",
                    tags: ["Smoothie","lunch", "dinner", "gluten-free", "vegetarian"],
                    photo: require('./images/smoothies.jpg')
                },
                {
                    name: "Mashed Potatoes", 
                    description: "whipped to creamy perfection",
                    tags: ["Mashed Potatoes", "lunch", "dinner", "vegetarian", "gluten-free"],
                    photo: require('./images/mashed-potatoes.jpg')
                },
                {
                    name: "Chicken and Dumplings",
                    description: "a creamy mix of two faculty favorites",
                    tags: ["Chicken and Dumplings", "lunch"],
                    photo: require('./images/chicken-dumplings.jpg')
                },
                {
                    name: "Custom Falafel Sandwich",
                    description: "don't forget to add a note to this order!",
                    tags: ["Custom Falafel Sandwich", "dinner", "vegetarian"],
                    photo: require('./images/falafel-sandwich.jpg')
                }
            ]
        }
    }
}
