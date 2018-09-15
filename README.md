# Review Node

Projects and Exercises from: 
* [The Complete Node.js Developer Course (2nd Edition)](https://www.udemy.com/the-complete-nodejs-developer-course-2/learn/v4/overview)
* [Advanced Node](https://app.pluralsight.com/library/courses/nodejs-advanced/table-of-contents)

## Notes/Thoughts
### JavaScript Event Loop (A Dangerously Extended Metaphor)

The JavaScript event loop is like an official at a desk whose job is to review and stamp a stack of applications. She has a secretary who prepares new applications and places them on top of the stack in the corner of her desk. The official reviews whichever document is on top and tries to get through the pile as quickly as possible so as to have time for lunch. But lunch never comes.

Most of the applications are standard procedure. But every once in a while, there's a special application that requires another official's approval. When she encounters such an application, she calls in one of the interns and says, "Can you take this next door to get it approved?" The intern takes it and runs down the hall as the secretary drops off a new stack of applications. The official proceeds to process the new applications and eventually encounters another one that requires yet another official's approval. Again she calls for an intern, and with one intern still out, a second takes it and runs down the hall in a different direction. The secretary, as always, continues to bring in new applications.

The interns come back at different times, asynchronously, depending on how long it takes to get the necessary approvals. Unlike the secretary, they're not supposed to bother the official. So when they return, they line up outside her door and wait to be called in, forming the callback queue. As soon as the official gets to the bottom of the current stack of applications from the secretary, she calls the first intern in line. The intern places the specially approved application on the corner of the official's desk and the official processes it. The secretary brings in some new applications. The official processes those and then calls in the next intern.


### Authentication
#### Creating New User

* Get the email and password from the user
* Pass this data as an object to the constructor for the User model
* In a method on `UserSchema`, generate an auth token by passing in the user _id and access information to `jwt.sign`
* Add this token to an array `user.tokens` on the user object
* Return a promise that saves the user and returns a token
* Use `toJSON` method on the `UserSchema` to override the `JSON` sent back the user, only sending the `_id` and `email`
* From the route, use the token from the returned promise to set the response header
* The `res.header()` takes two arguments, a key value pair, the first being the name of the header and the second being the value. `x-` in the header name designates a custom header. We can call it `x-auth` and set the token as the value. Send the user object.
* Catch any errors.

#### Creating Auth Middleware
* Add a `statics` method to the `UserSchema` called `findByToken`
* This method accepts a token argument and attempts to decode it by passing it as the first argument to `jwt.verify()`, with the secret as the second argument
* If it cannot, return `Promise.reject()`
* Otherwise, return the User object from the database by using the `findOne` method on the User model and passing an object of `_id` set to the `decoded._id`. Use nested querying within the object to check `tokens.token` for `token` and `tokens.access` for `'auth'`.
* In a middleware function, assign `req.header('x-auth')` to `const token`
* Pass this value into the the static `findByToken` method on the User model, which returns a promise
* If there is no user, return `Promise.reject()`
* Otherwise, set the `req.user` to the returned user and `req.token` to the returned token
* Call `next()`.
* Catch any errors.

### Salt and Hash the Password Before Saving It
* Use the schema `pre` method to attach an event before the model gets saved to the db, passing in `save` as the first argument and a callback function with the `next` argument as the second.
* Inside the callback, use method available on instance called `.isModified`, which takes an individual property like `password` and returns true or false.
* If the password is modified, hash the password, else call `next()`.
* To hash the password, use the `genSalt` method from `bcryptjs`, passing in the the number of rounds as the first argument and a callback as the second.
* The `genSalt` callback takes an `err` object as the first argument and `salt` as the second.
* From within, the `genSalt` callback, call the `hash` method from `bcryptjs`, passing in the password as the first argument, the `salt` argument as the second, and a callback as a third.
* Inside this callback, set `this.user.password` to `hash`.
* Call `next()`.

### Handling Login
* Create a new `statics` method on `UserSchema` called `findByCredentials`, which accepts `email` and `password` as arguments
* Return `User.findOne`, passing in the `email`
* If no user is found, return a `Promise.reject()`
* Otherwise, return a new promise
* Inside this promise, use `bcrypt.compare` to compare the plaintext password from the user with the hashed password on the db document, passing in the plaintext password as the first argument, the hashed password from the db as the second, and a callback as the third with the following signature `(err, res)`
* If `res` is true, which means the passwords match, `resolve` the promise, passing in the `user` document object
* Else, `reject()`
* Create a post route for `/users/login`
* Inside the route callback, restructure the email and password from the request `body` object
* Use the `findByCredentials` method on the `User` model, passing in the restructured `email` and `password`
* In the chained `then` block, return `user.generateAuthToken()`, chaining a then block with a callback that captures the resolved `token`
* Set the response object `header`, passing in `x-auth` as the key and the `token` object as the value
* Send the `user` object in the response
* Catch/handle any errors

### V8 Options

* View all V8 options

```bash
node --v8-options
```

* Search for V8 options

```bash
node --v8-options | grep gc
```

* View all options "in progress"

```bash
node --v8-options | grep "in progress"
```

### Node's CLI and REPL


* Use autocomplete <kbd>TAB</kbd>+<kbd>TAB</kbd>
* Setup readlinwrap utility for Node
```bash
homebrew rlwrap
NODE_NO_READLINE=1 rlwrap node
```
....and then <kbd>CTRL</kbd>+<kbd>r</kbd> in Node

* View all '.' commands
```node
.help
```
* Save REPL session to disk
```node
.save <filename>
```

* Access last evaluated value
```node
_
```
* Create custom REPL sessions using the built-in `repl` module
```js
// repl.js
const repl = require('repl');

repl.start({
	ignoreUndefined: true,
	replMode: repl.REPL_MODE_STRICT
	});
```
...and then
```node
node repl.js
```

...add a library to the global context

```js
// ...custom repl code
r.context.lodash = require('lodash');
```

* View all node options

```bash
node --help
```

* Syntax check script without executin
```bash
node -c <script>
```
* Evaluate script and print result
```bash
node -p <script>
```
* Preload/require a module before running script
```bash
node -r babel-core <script>
```
* Access the array of arguments
```node
process.argv.slice(1)
```
### Global Object, Process, and Buffer
* The one global object is called `global`

* View all global methods
<kbd>Tab</kbd>+<kbd>Tab</kbd> in REPL

* View all global properties
```node
global
```

* Communicate with the node process through the standard streams: `stdout`, `stdin`, `stderr`
* These are pre-established ready streams, and cannot be closed
* `process` is an instance of event emitter
* `exit` event:
```js
process.on('exit', code => {
	// do one final sync operation before node process terminates
	// sync operations only; cannot use the event loop
})

```


* Force node process to exit on `uncaughtException`

```js
process.on('uncaughtException', err => {
console.error(err);

// Force exit 
process.exit(1);
}
```

* A Buffer is a chunk of memory allocated outside of the V8 heap
* We can put some data inside that memory, and the memory can be interpreted in many ways
* Whatever we place in the buffer does not have any character encoding
* To read it, we need to specify an encoding 
* If we don't specify an encoding, we get back a `Buffer` object
* Once a buffer is allocated, it cannot be resized

* Allocate and fill a Buffer
```node
Buffer.alloc(8)
```

* Allocate unfilled Buffer and then fill with `.fill()`
```node
Buffer.allocUnsafe(8).fill()
```

* Allocate a Buffer with `Buffer.from()` method

* Logging a Buffer from a UTF-8 string example: Buffer represents character with its internal UTF-8 represenation
* Buffers are useful when we need to read an image from a TCP stream, or a compressed file, or any other form of binary access
* Buffers have array-like methods such as `includes`, `indexOf`, and `slice`
* But the returned Buffer will share the same memory with the original Buffer 

* When converting streams of binary data, use the `StringDecoder` module. It handles multibyte characters much better.
* It preserves the incomplete encoded characters internally until it's complete and then returns the result
* The default `toString` method does not do that
* Always use `stringDecoder` if you're receiving UTF-8 bytes as chunks in a stream






