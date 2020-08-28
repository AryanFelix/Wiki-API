# Wiki API
 API backend used in article distribution sites like Wikipedia Inc. Made using Node, Express, Mongoose, EJS, Body Parser, Lodash.
 
 This API uses `GET`, `POST`, `DELETE`, `PUT`, `PATCH` requests to communicate. All responses come in standard JSON. All requests must include a `content-type` of `application/json` and the body must be valid JSON.

 ## Request Operations on Entire Database
 1. Adding New Article

    ```
    Route: /articles
    Operation: POST

    {
        title: "ABC",
        content: "XYZ" 
    }
    ```
 2. Deleting All Articles

    ```
    Route: /articles
    Operation: DELETE
    
    { 
    }
    ```
3. Getting all Article

    ```
    Route: /articles
    Operation: GET

    {
    }
    ```
 ## Request Operations on a Single Entry
 1. Getting One Article

    ```
    Route: /articles/:NameOfArticle
    Operation: GET

    { 
    }
    ```
 2. Editing One Article (PUT)

    ```
    Route: /articles/:NameOfArticle
    Operation: PUT

    {
        title: "ABC",
        content: "XYZ" 
    }
    ```
 3. Editing One Article (PATCH)

    ```
    Route: /articles/:NameOfArticle
    Operation: PATCH

    {
        //Attributes to be updated.
        //Minimum one attribute requires.
        content: "XYZ" 
    }
    ```
 ## License
 ### Created by Aryan Felix
 ### © MIT License