# Data aggregation pipeline - user post report

1.  Advanced TypeScript Modeling: 
    -   Defined distinct interface definitions for User, Post, and the final combined datastructure, UserWithPosts. 
    -   The UserWithPosts interface contains the user's id, name, username, email, and 
a new property posts which will be an array of objects, each containing the post's id, 
title, and body. 
    -   Added a generic utility function: fetchData<T>(url: string): Promise<T>. This function 
must take a URL, fetch data from it, and return a promise that resolves with the data 
correctly typed as T. 
2.  Efficient Asynchronous Operations:      
    -   Fetch all users from  https://jsonplaceholder.typicode.com/users. 
    -   Fetch all posts from https://jsonplaceholder.typicode.com/posts. 
    -   These requests are handled in an efficient manner that avoids unnecessary 
delays. Implements robust error handling for these operations. 
3.  Class-Based Structure: 
    -   Encapsulate all of your logic within a ReportGenerator class. 
    -   The class should be well-structured, managing both the data fetching and processing 
logic internally. 
4.  Complex Data Aggregation: 
    -   Inside the class, are efficiently combined the users and posts arrays, producing the final UserWithPosts[] array. The solution is mindful of 
performance, especially concerning how it is looking up posts for each user. 
5.  Utility Function Using Closures: 
    -   Created a higher-order function called createLogger(context: string). 
    -   This function accepts a context string (e.g., "DataFetching", "Processing") and 
return a new logging function. 
    -   The returned function accepts a message string and log it to the console,
prefixed with the context. Example: [DataFetching] Fetching users and posts... 
    -   Instantiated and used this logger within ReportGenerator class to provide contextual 
status updates. 
6.  Final Output: 
    -   The script has a primary method generateReport that, when called, returns the final array of 
UserWithPosts objects. The final result is logged to the console in a readable format.



Run: 

    npm i
    npm start
