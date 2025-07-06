
## Library Management - Assignment3

Clone or download the git repository.

Then go that folder and run this command.

```
npm install
```

All package will install according to package.json file.

Then run the code by this command.

```
npm run dev
```

Now you will hangle the crud operation given bellow

In the Library Management project i created two models named books and borrow. Here some simple crud operation of book and borrow.

## Book

### 1. Create Book

#### POST ```/api/books```

##### Request:
```
{
    "title": "A Brief History of Time",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380164",
    "description": "Understanding the nature of time and the universe.",
    "copies": 2,
    "available": true
}
```

##### Response:
```
{
    "success": true,
    "message": "Book created successfully",
    "data": {
        "title": "A Brief History of Time",
        "author": "Stephen Hawking",
        "genre": "SCIENCE",
        "isbn": "9780553380164",
        "description": "Understanding the nature of time and the universe.",
        "copies": 2,
        "available": true,
        "_id": "68594b531779af85cd402b1a",
        "createdAt": "2025-06-23T12:40:51.635Z",
        "updatedAt": "2025-06-23T12:40:51.635Z"
    }
}
```

### 2. Get all book

#### GET ```/api/books```

##### Response:
```
{
    "success": true,
    "message": "Books retrieved successfully",
    "data": [
        {
            "_id": "666f1a301cde0a3d209c0010",
            "title": "Cosmos",
            "author": "Carl Sagan",
            "genre": "SCIENCE",
            "isbn": "9780345539434",
            "description": "A journey through the universe.",
            "copies": 7,
            "available": true,
            "createdAt": "2024-01-25T12:30:00.000Z"
        },

        ...
```

### 3. Get books according to query parameters

#### GET ```/api/books?filter=SCIENCE&sortBy=createdAt&sort=asc&limit=5```

#### Query Parameters:
filter: Filter by genre.
sort: asc or desc.
limit: Number of results (default: 10).

##### Response:
```
{
    "success": true,
    "message": "Books retrieved successfully",
    "data": [
        {
            "_id": "666f1a301cde0a3d209c0001",
            "title": "The Theory of Everything",
            "author": "Stephen Hawking",
            "genre": "SCIENCE",
            "isbn": "9780553380163",
            "description": "An overview of cosmology and black holes.",
            "copies": 5,
            "available": true,
            "createdAt": "2024-01-01T10:00:00.000Z"
        },

        ...
```

### 4. Get single book by id

#### GET ```/api/books/:bookId

##### Response:
```
{
    "success": true,
    "message": "Book retrieved successfully",
    "data": {
        "_id": "666f1a301cde0a3d209c0019",
        "title": "The Name of the Wind",
        "author": "Patrick Rothfuss",
        "genre": "FANTASY",
        "isbn": "9780756404741",
        "description": "A wizard recounts his legend.",
        "copies": 6,
        "available": true,
        "createdAt": "2024-02-06T10:40:00.000Z"
    }
}
```

### 5. Update a book by id

#### PUT ```/api/books/:bookId

##### Request:
```
{
    "description": "This is wonderfull book",
    "copies": 9
}
```

##### Response:
```
{
    "success": true,
    "message": "Book updated successfully",
    "data": {
        "_id": "666f1a301cde0a3d209c0019",
        "title": "The Name of the Wind",
        "author": "Patrick Rothfuss",
        "genre": "FANTASY",
        "isbn": "9780756404741",
        "description": "This is wonderfull book",
        "copies": 9,
        "available": true,
        "createdAt": "2024-02-06T10:40:00.000Z",
        "updatedAt": "2025-06-23T13:42:03.298Z"
    }
}
```

### 6. Delete a book by id

#### DELETE ```/api/books/:bookId

##### Response:
```
{
    "success": true,
    "message": "Book deleted successfully",
    "data": {
        "_id": "666f1a301cde0a3d209c0019",
        "title": "The Name of the Wind",
        "author": "Patrick Rothfuss",
        "genre": "FANTASY",
        "isbn": "9780756404741",
        "description": "This is wonderfull book",
        "copies": 9,
        "available": true,
        "createdAt": "2024-02-06T10:40:00.000Z",
        "updatedAt": "2025-06-23T13:42:03.298Z"
    }
}
```

## Borrow

### 7. Borrow a book

#### POST ```/api/borrow

##### Request:
```
{
    "book": "666f1a301cde0a3d209c0001",
    "quantity": 3,
    "dueDate": "2025-09-18T00:00:00.000Z"
}
```

##### Response:
```
{
    "success": true,
    "message": "Book borrowed successfully",
    "data": {
        "book": "666f1a301cde0a3d209c0001",
        "quantity": 3,
        "dueDate": "2025-09-18T00:00:00.000Z",
        "_id": "685960321779af85cd402b24",
        "createdAt": "2025-06-23T14:09:54.662Z",
        "updatedAt": "2025-06-23T14:09:54.662Z"
    }
}
```

### 8. Get all borrowed books summary

#### GET ```/api/borrow

##### Response:
```
{
    "success": true,
    "message": "Borrowed books summary retrieved successfully",
    "data": [
        {
            "totalQuantity": 2,
            "book": [
                {
                    "title": "Long Walk to Freedom",
                    "isbn": "9780316548182"
                }
            ]
        },
        {
            "totalQuantity": 2,
            "book": [
                {
                    "title": "Brief Answers to the Big Questions",
                    "isbn": "9781984819192"
                }
            ]
        },

        ...
    ]
}
```