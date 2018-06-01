# Review Node

* Projects and Exercises from [The Complete Node.js Developer Course (2nd Edition)](https://www.udemy.com/the-complete-nodejs-developer-course-2/learn/v4/overview)

## Notes/Thoughts
### JavaScript Event Loop (A Dangerously Extended Metaphor)

The JavaScript event loop is like an official at a desk whose job is to review and stamp a stack of applications. She has a secretary who prepares new applications and places them on top of the stack in the corner of her desk. The official reviews whichever document is on top and tries to get through the pile as quickly as possible so as to have time for lunch. But lunch never comes.

Most of the applications are standard procedure. But every once in a while, there's a special application that requires another official's approval. When she encounters such an application, she calls in one of the interns and says, "Can you take this next door to get it approved?" The intern takes it and runs down the hall as the secretary drops off a new stack of applications. The official proceeds to process the new applications and eventually encounters another one that requires yet another official's approval. Again she calls for an intern, and with one intern still out, a second takes it and runs down the hall in a different direction. The secretary, as always, continues to bring in new applications.

The interns come back at different times, asynchronously, depending on how long it takes to get the necessary approvals. Unlike the secretary, they're not supposed to bother the official. So when they return, they line up outside her door and wait to be called in, forming the callback queue. As soon as the official gets to the bottom of the current stack of applications from the secretary, she calls the first intern in line. The intern places the specially approved application on the corner of the official's desk and the official processes it. The secretary brings in some new applications. The official processes those and then calls in the next intern.
