# Bicycle Store API

**Live Deployment:** https://bicycle-store-api.vercel.app/
**Video Explanation:**

This is a Bicycle Store API built with Express and TypeScript. It integrates MongoDB with Mongoose for managing products (bicycles) and orders, providing a full CRUD functionality. The project also includes error handling, input validation, and inventory management.

---

### **Features:**

-   **Product Management**: Create, read, update, and delete bicycles (products).
-   **Order Management**: Create orders and track the quantities of bicycles sold.
-   **Inventory Management**: Automatically update the stock quantity of bicycles when an order is placed. If the quantity reaches zero, the bicycle is marked as out of stock.
-   **Revenue Calculation**: Use MongoDB aggregation to calculate the total revenue from all orders.
-   **Error Handling**: Handle validation errors, resource not found, and other error scenarios with detailed error messages.

---

### **Models:**

1. **Product Model (Bicycle):**
    - **name** (string): The name of the bicycle.
    - **brand** (string): The brand of the bicycle.
    - **price** (number): Price of the bicycle.
    - **type** (string): The type of bicycle (e.g., Mountain, Road, Hybrid, BMX). Use an `enum`: `Mountain, Road, Hybrid, BMX, Electric`.
    - **description** (string): A brief description of the bicycle.
    - **quantity** (number): Quantity of the bicycle available.
    - **inStock** (boolean): Indicates if the bicycle is in stock.
2. **Order Model:**
    - **email** (string): The email address of the customer.
    - **product** (ObjectId): The bicycle ordered. (`unused ref`)
    - **quantity** (number): The quantity of the ordered bicycle.
    - **totalPrice** (number): The total price (bicycle price \* quantity).

---

### **Generic Error Response:**

1. **`message`**: A brief error message explaining what went wrong.
2. **`success`**: Set to `false` for error responses.
3. **`error`**: The error message or error object returned by the application (e.g., `"ValidationError"`, `"Resource not found"`).
4. **`stack`**: The stack trace showing where the error occurred in the code.

### Example:

```json
{
    "message": "Validation failed",
    "success": false,
    "error": {
        "name": "ValidationError",
        "errors": {
            "price": {
                "message": "Price must be a positive number",
                "name": "ValidatorError",
                "properties": {
                    "message": "Price must be a positive number",
                    "type": "min",
                    "min": 0
                },
                "kind": "min",
                "path": "price",
                "value": -5
            }
        }
    },
    "stack": "Error: Something went wrong\n    at app.js:23:13\n    at..."
}
```

### API Endpoints

---

### **1. Create a Bicycle**

-   **Endpoint:** **`/api/products`**
-   **Method:** `POST`
-   **Request Body:**

```json
{
    "name": "Roadster 5000",
    "brand": "SpeedX",
    "price": 300,
    "type": "Road",
    "description": "A premium road bike designed for speed and performance.",
    "quantity": 20,
    "inStock": true
}
```

-   **Response:** Success message and created bicycle details.

```json
{
    "message": "Bicycle created successfully",
    "success": true,
    "data": {
        "_id": "648a45e5f0123c45678d9012",
        "name": "Roadster 5000",
        "brand": "SpeedX",
        "price": 300,
        "type": "Road",
        "description": "A premium road bike designed for speed and performance.",
        "quantity": 20,
        "inStock": true,
        "createdAt": "2024-11-19T10:23:45.123Z",
        "updatedAt": "2024-11-19T10:23:45.123Z"
    }
}
```

---

### **2. Get All Bicycles**

-   **Endpoint:** **`/api/products`**
-   **Method:** `GET`
-   **Response:** A list of all bicycles with details like name, brand, price, type, etc.
-   **Query:** `/api/products?searchTerm=type` (`searchTerm` can be `name`, `brand`, `type`)

```json
{
    "message": "Bicycles retrieved successfully",
    "status": true,
    "data": [
        {
            "_id": "648a45e5f0123c45678d9012",
            "name": "Roadster 5000",
            "brand": "SpeedX",
            "price": 300,
            "type": "Road",
            "description": "A premium road bike designed for speed and performance.",
            "quantity": 20,
            "inStock": true,
            "createdAt": "2024-11-19T10:23:45.123Z",
            "updatedAt": "2024-11-19T10:23:45.123Z"
        }
    ]
}
```

---

### **3. Get a Specific Bicycle**

-   **Endpoint:** **`/api/products/:productId`**
-   **Method:** `GET`
-   **Response:** The details of a specific bicycle by ID.

```json
{
    "message": "Bicycle retrieved successfully",
    "status": true,
    "data": {
        "_id": "648a45e5f0123c45678d9012",
        "name": "Roadster 5000",
        "brand": "SpeedX",
        "price": 300,
        "type": "Road",
        "description": "A premium road bike designed for speed and performance.",
        "quantity": 20,
        "inStock": true,
        "createdAt": "2024-11-19T10:23:45.123Z",
        "updatedAt": "2024-11-19T10:23:45.123Z"
    }
}
```

---

### **4. Update a Bicycle**

-   **Endpoint:** **`/api/products/:productId`**
-   **Method:** `PUT`
-   **Request Body:** (Bicycle details to update)

```json
{
    "price": 350,
    "quantity": 15
}
```

-   **Response:** Success message and updated bicycle details.

```json
{
    "message": "Bicycle updated successfully",
    "status": true,
    "data": {
        "_id": "648a45e5f0123c45678d9012",
        "name": "Roadster 5000",
        "brand": "SpeedX",
        "price": 350, // Price updated
        "type": "Road",
        "description": "A premium road bike designed for speed and performance.",
        "quantity": 15, // Quantity updated
        "inStock": true,
        "createdAt": "2024-11-19T10:23:45.123Z",
        "updatedAt": "2024-11-19T11:00:00.000Z" // Updated timestamp
    }
}
```

---

### **5. Delete a Bicycle**

-   **Endpoint:** **`/api/products/:productId`**
-   **Method:** `DELETE`
-   **Response:** Success message confirming the bicycle has been deleted.

```json
{
    "message": "Bicycle deleted successfully",
    "status": true,
    "data": {}
}
```

---

### **6. Order a Bicycle**

-   **Endpoint:** **`/api/orders`**
-   **Method:** `POST`
-   **Inventory Management Logic:**
    -   When an order is placed, reduce the **quantity** in the product model.
    -   If the inventory quantity goes to zero, set **inStock** to `false`.
    -   Handle **insufficient stock** cases by returning an appropriate error message.
-   **Request Body:**

```json
{
    "email": "customer@example.com",
    "product": "648a45e5f0123c45678d9012",
    "quantity": 2,
    "totalPrice": 600
}
```

-   **Response:** Success message confirming the order.

```json
{
    "message": "Order created successfully",
    "status": true,
    "data": {
        "_id": "648b45f5e1234b56789a6789",
        "email": "customer@example.com",
        "product": "648a45e5f0123c45678d9012",
        "quantity": 2,
        "totalPrice": 600,
        "createdAt": "2024-11-19T12:00:00.000Z",
        "updatedAt": "2024-11-19T12:00:00.000Z"
    }
}
```

---

### **7. Calculate Revenue from Orders (Aggregation)**

-   **Endpoint:** **`/api/orders/revenue`**
-   **Method:** `GET`
-   **Aggregation:**
    -   Use MongoDB aggregation pipeline to calculate the total revenue from `all orders`.
    -   Calculate the total price by multiplying the price of each bicycle by the quantity ordered.
-   **Response:** The total revenue from all orders.

```json
{
    "message": "Revenue calculated successfully",
    "status": true,
    "data": {
        "totalRevenue": 1200 // Total revenue calculated from all orders
    }
}
```

---

### Setup Instructions

#### Prerequisites

-   **Node.js:** **`(v16+)`**
-   **MongoDB** **`(Local or Remote)`**

**1. Clone the Repository**

```bash
git clone https://github.com/MehediMehad/Pedal-Power.git
cd Pedal-Power
```

**2. Install Dependencies**

```bash
npm install
npm run build
```

**3. Configure Environment Variables**
`Create` **`.env`** `file in the root directory and add the following variables:`

```bash
MONGODB_URI=mongodb://localhost:27017/bicycle-store
PORT=5000
```

**4. Start the Application**

```bash
npm run start:dev
```
