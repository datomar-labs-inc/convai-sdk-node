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
const {ConvaiAPIClient, UserQueryBuilder} = require('convai-sdk');

const convai = new ConvaiAPIClient(API_KEY);

convai
    .queryUsers(UserQueryBuilder.all().where('first-name').equals('John').build())
    .then(users => console.log(users));
```

To add multiple conditions, you can stack them on the UserQueryBuilder. For example,

```js
convai
    .queryUsers(
        UserQueryBuilder.all()
        .where('first-name').equals('John')
        .where('last-name').equals('Snow')
        .build()
    )
    .then(users => console.log(users));
```

### Reference

* all() - Equivalent of Inner Join. All the conditions must be true for the users.
* any() - Equivalent of Full Join. Atleast one condition should be true for the users.
* none() - Equivalent of not (!). None of the condition should be true for the users.
<br></br>
* equals(value) - Denotes that the return set from where 'key' is equal to 'value'
* notEquals(value) - Denotes that the return set from where 'key' doesn't equal 'value'
* startsWith(value) - Denotes that the return set from the where 'key' starts with 'value'
* greaterThan(value) - Denotes that the return set from the where 'key' should be greater than 'value'
* lessThan(value) - Denotes that the return set from the where 'key' should be less than 'value'
* exists() - Denotes that the user data should have the where 'key'
* notExists() - Denotes that the user data should not have the where 'key'