// Menu data for Sisters Cafe
const menuData = [
    {
        category: "Appetizers",
        items: [
            { name: "Mini Tacos", price: 5.00 },
            { name: "French Fries", price: 4.50 },
            { name: "Tator Kegs (Cheddar Jalapeno)", price: 6.00 },
            { name: "Tator Kegs (Cheddar Bacon)", price: 6.00 },
            { name: "Onion Chips", price: 5.00 },
            { name: "Cheese Balls", price: 5.00 },
            { name: "Spicy Cheese Balls", price: 5.00 },
            { name: "Breaded Mushrooms", price: 5.00 },
            { name: "Breaded Cauliflower", price: 5.00 },
            { name: "Cinnamon Roll", price: 3.25 }
        ]
    },
    {
        category: "Soups",
        items: [{ name: "Soup Bowl", price: 4.50 }]
    },
    {
        category: "Sandwiches",
        items: [
            { name: "Hamburgers", price: 8.00 },
            { name: "Cheeseburger", price: 8.50 },
            { name: "Double Cheeseburger", price: 13.50 },
            { name: "Bacon Cheeseburger", price: 11.00 },
            { name: "Double Bacon Cheeseburger", price: 13.50 },
            { name: "Swiss Mushroom Burger", price: 9.00 },
            { name: "Western Burger", price: 12.95 },
            { name: "Patty Melt", price: 9.00 },
            { name: "Pork Tenderloin", price: 8.00 },
            { name: "Fish Sandwich", price: 8.00 },
            { name: "Chicken Parmesan", price: 9.00 },
            { name: "Taco Burger (Seasoned Beef, Cheese Mix, Salsa, Lettuce, Tomatoes, and Sour Cream)", price: 10.95 }
        ]
    },
    {
        category: "Dinner Meals",
        items: [
            { name: "Chicken Fried Steak", price: 11.00 },
            { name: "Hamburger Steak", price: 11.00 },
            { name: "Salisbury Steak", price: 11.00 },
            { name: "Chicken Parmesan", price: 11.00 },
            { name: "Pork Tenderloin", price: 11.00 }
        ]
    },
    {
        category: "Baskets",
        items: [
            { name: "Fried Fish Basket", price: 10.00 },
            { name: "Mini Corn Dog Basket", price: 10.00 }
        ]
    },
    {
        category: "Salads",
        items: [
            { name: "Green Salad", price: 4.00 },
            { name: "Chef Salad (Chicken)", price: 9.50 },
            { name: "Chef Salad (Ham)", price: 9.50 }
        ]
    },
    {
        category: "Sides",
        items: [
            { name: "Bacon (4 Slices)", price: 5.00 },
            { name: "Sausage (2 Patties)", price: 5.00 },
            { name: "Ham (2 Slices)", price: 5.00 },
            { name: "Hashbrowns", price: 3.00 },
            { name: "Toast (2 Slices)", price: 3.00 }
        ]
    },
    {
        category: "Eggs & Toast",
        items: [
            { name: "1 Egg & Toast", price: 6.00 },
            { name: "1 Egg & Toast with Meat", price: 8.00 },
            { name: "2 Eggs & Toast", price: 7.00 },
            { name: "2 Eggs & Toast with Meat", price: 9.00 },
            { name: "Omelet Combo", price: 14.00 }
        ]
    },
    {
        category: "Drinks",
        items: [
            { name: "Soda", price: 2.00 },
            { name: "Hot Tea", price: 2.00 },
            { name: "Iced Tea", price: 2.00 },
            { name: "Lemonade", price: 2.00 },
            { name: "Milk Small", price: 1.50 },
            { name: "Milk Large", price: 2.00 },
            { name: "OJ Small", price: 1.50 },
            { name: "OJ Large", price: 2.00 }
        ]
    }
];

// Make menuData available globally
window.menuData = menuData;
console.log('Menu data exported to window.menuData:', menuData);

// Trigger a custom event to notify that menu data is loaded
if (typeof document !== 'undefined') {
    document.dispatchEvent(new CustomEvent('menuDataLoaded', { detail: menuData }));
}

// For compatibility with module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { menuData };
}