let faker = require('faker');

let database = {
	items: []
};

database.items.push({ id: 1, task: 'task 1', checked: false });
database.items.push({ id: 2, task: 'task 2', checked: false });
database.items.push({ id: 3, task: 'task 3', checked: false });

console.log(JSON.stringify(database));
