# Convai Node SDK

This is the node library to facilitate development for [Convai](https://convai.studio/) bots.

## Installation

```js
npm install convai-sdk --save
```

## Initializing Convai Client

Before using any methods for Convai, you would need to config the Convai Client.
You can create an API key from Bot > Development > API Keys > Create Key

```js
const {ConvaiAPIClient} = require('convai-sdk');

const convai = new ConvaiAPIClient(API_KEY);
```

## Querying Users

Use the queryUsers() method to query users from the Convai bot. The queryUsers() method returns a promise with an array of users.

*Note - All the queries use the data from the user scope for returning results.*

```js
const {ConvaiAPIClient, UserQueryBuilder, UserQueryMode} = require('convai-sdk');

const convai = new ConvaiAPIClient(API_KEY);

convai
    .queryUsers(new UserQueryBuilder(UserQueryMode.ALL).where('first-name').equals('John').build())
    .then(users => console.log(users));
```

To add multiple conditions, you can stack them on the UserQueryBuilder. For example,

```js
convai
    .queryUsers(new UserQueryBuilder(UserQueryMode.ALL).where('first-name').equals('John').where('last-name').equals('Snow').build())
    .then(users => console.log(users));
```

### Reference

| Name | Parameters | Function |
| --- | :---: | --- |
| UserQueryMode.ALL |  | Equivalent of Inner Join. All the conditions must be true for the users. |
| UserQueryMode.ANY |  | Equivalent of Full Join. Atleast one condition should be true for the users. |
| UserQueryMode.NONE |  | Equivalent of not (!). None of the condition should be true for the users. |
| equals() | value | Denotes that the return set from where 'key' is equal to 'value' |
| notEquals() | value | Denotes that the return set from where 'key' doesn't equal 'value' |
| startsWith() | value | Denotes that the return set from the where 'key' starts with 'value' |
| greaterThan() | value | Denotes that the return set from the where 'key' should be greater than 'value' |
| lessThan() | value | Denotes that the return set from the where 'key' should be less than 'value' |
| exists() |  | Denotes that the user data should have the where 'key' |
| notExists() |  | Denotes that the user data should not have the where 'key' |

## Querying Executions

Use the queryExecutions() method to query executions from the Convai bot. The queryExecutions() method returns a promise with an array of executions.

```js
const {ConvaiAPIClient, ExecutionMatcher} = require('convai-sdk');

const convai = new ConvaiAPIClient(API_KEY);

convai
    .queryExecutions(new ExecutionMatcher().where('userId').equals('ef44ad85-b97a-477b-b314-abcdefghijkl'))
    .then(executions => console.log(executions));
```

To add multiple conditions you can stack them on the execution matcher. For example, if we want executions for a user from just the facebook channel

```js
convai
    .queryExecutions(new ExecutionMatcher().where('userId').equals('ef44ad85-b97a-477b-b314-abcdefghijkl').where('channel').equals('facebook'))
    .then(executions => console.log(executions));
```

You can also negate a condition. For example, if we want all the executions for a user except for the facebook channel

```js
convai
    .queryExecutions(new ExecutionMatcher().where('userId').equals('ef44ad85-b97a-477b-b314-abcdefghijkl').where('channel').equals('facebook').not())
    .then(executions => console.log(executions));
```

### Reference

* not() - Negate a condition
<br></br>
* equals(value) - Denotes that the return set from where 'key' is equal to 'value'
* exists() - Denotes that the execution data should have the where 'key'
* hasPrefix(value) - Denotes that the return set from the where 'key' starts with 'value'
* between(low, high, inclusive) - Denotes that the return set from the where 'key' should be between (low, high) for inclusive = true or [low, high] for inclusive = false
<br></br>
* setLimit(limit) - Set the limit on results
* setOffset(offset) - Set the offset on results
<br></br>
* sortAsc(field) - Sort the executions by the field in ascending order
* sortDesc(field) - Sort the executions by the field in descending order