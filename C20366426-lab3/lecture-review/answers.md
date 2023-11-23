Answers for practice questions for Lab3 - Reactive Programming and Streams

1. The stream abstraction is a programming concept that represents a sequence of data elements made available over time. It is not necessarily tied to a specific data structure, and it allows for the processing of data in a continuous and incremental fashion. Streams are often used to model data that is produced or consumed asynchronously, and they provide a way to work with potentially infinite sets of data.

The observer pattern, is a design pattern where an object, known as the subject, maintains a list of its dependents, called observers, that are notified of any changes in the subject's state. The observer pattern is used to define a one-to-many dependency between objects, so when one object changes state, all its dependents are notified and updated automatically.

The relationship between streams and the observer pattern lies in the fact that streams can be considered as a form of observable sequence of data, and observers can subscribe to these streams to be notified of new data as it becomes available. This is particularly evident in reactive programming paradigms, where reactive streams and the observer pattern are closely related.

In the context of Rich Web development, streams can be beneficial in various scenarios. For example:

Real-time Data Updates: When dealing with real-time updates, such as live feeds, chat applications, or financial data, streams can be employed to model the continuous flow of data.

User Input Handling: Streams can be used to handle asynchronous user inputs, like mouse movements, keyboard events, or touch gestures, allowing for a more responsive and interactive user experience.

Data Fetching: When fetching data from APIs or databases, streams can be used to process and display data as it arrives, rather than waiting for the entire dataset to be loaded.


2. When building an interface to an API in a Rich Web App, RxJS is a powerful library for handling asynchronous operations, including network responses to API requests. RxJS provides a reactive programming paradigm, allowing you to work with asynchronous data streams using Observables. Here's a step-by-step guide on how you could use RxJS to handle asynchronous network responses:

Install RxJS:
Start by including RxJS in your project. You can install it using a package manager like: "npm install rxjs",

Import RxJS:
In your code, import the necessary RxJS functions and operators.

Create an Observable for API Request:
Use the Observable.create method to create an observable that represents your API request. 

Subscribe to the Observable:
Subscribe to the observable to initiate the API request and handle the response or error.

Use RxJS Operators for Transformation and Error Handling:
RxJS provides operators like map and catchError that can be used to transform data and handle errors in a more declarative and readable way.

Benefits to using streams library for network over promises:

Declarative and Readable Code: RxJS allows you to express asynchronous operations in a more declarative and readable manner using a combination of operators. This can lead to cleaner and more maintainable code.

Composability: RxJS provides a set of powerful operators that can be easily composed to handle complex asynchronous scenarios. This composability makes it easier to build and maintain complex asynchronous workflows.

Handling Streams of Data: RxJS is particularly well-suited for handling streams of data over time. It provides a consistent interface for working with events, user inputs, and network responses, making it easier to reason about and handle asynchronous behavior.

Downsides of using streams library for networking over promises:

Learning Curve: RxJS has a learning curve, especially for developers who are new to reactive programming concepts. Understanding observables, operators, and the reactive paradigm may take some time.

Potential Overhead: In simple scenarios, using promises might be more straightforward and result in less boilerplate code. RxJS introduces a level of abstraction that may not be necessary for all projects.

Size of the Library: While RxJS is a powerful library, its size can be a concern for some projects. If you are concerned about the size of your application, you might need to consider tree-shaking or other optimization techniques.

3. Consequences of the Asynchronous functions sharing global state:

Data Corruption:
Concurrent modifications to shared global state can lead to data corruption. If one task is reading the state while another is modifying it, the reading task may get inconsistent or corrupted data.

Difficulty in Debugging:
Debugging becomes more challenging when multiple asynchronous tasks share global state. Identifying the cause of unexpected behavior or errors can be complex, especially when the state is modified from various parts of the program.

Race Conditions:
If tasks A, B, and C are modifying the same global state concurrently, it can result in race conditions. Race conditions occur when the outcome of the program depends on the timing or order of execution of asynchronous tasks, leading to unpredictable and potentially incorrect behavior.

Maintenance Challenges:
As the codebase grows, maintaining and evolving the system becomes more challenging. It can be harder to reason about the behavior of the program, and making changes without introducing bugs becomes more difficult.



To alleviate the problems associated with sharing global state among asynchronous tasks, it is generally a good practice to follow principles of isolation and encapsulation. Here are some recommended practices:

Use Local State:
Encapsulate state within the scope of the asynchronous task whenever possible. Instead of relying on global variables, use local variables within the functions or closures to store and modify state.

Avoid Shared Mutable State:
Minimize the use of shared mutable state between asynchronous tasks. If state needs to be shared, consider making it immutable or use techniques like locks or mutexes to synchronize access.

Functional Programming Practices:
Embrace functional programming practices, such as immutability and pure functions. Functions that don't have side effects and don't modify external state are easier to reason about and less prone to concurrency issues.

Asynchronous Programming Patterns:
Utilize asynchronous programming patterns that promote isolation, such as promises or async/await in languages that support them. These patterns help manage the flow of asynchronous code and reduce the likelihood of race conditions.

Message Passing:
If tasks need to communicate, consider using message passing or event-driven architectures. Instead of directly modifying shared state, tasks can communicate through well-defined messages, making it easier to reason about the flow of information