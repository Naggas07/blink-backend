require("../config/db.config");

const User = require("../Models/User.model");
const faker = require("faker");

// for (let i = 0; i < 100; i++) {
//   const user = new User({
//     nickName: faker.internet.userName(),
//     name: faker.name.firstName(),
//     lastName1: faker.name.lastName(),
//     lastName2: faker.name.lastName(),
//     password: 123123123,
//     email: faker.internet.email(),
//     userType: "User",
//     avatar: faker.internet.avatar(),
//     rangeLocation: 5000
//   });

//   user
//     .save()
//     .then(user => console.log(user.nickName))
//     .catch(error => console.error(error));
// }

for (let i = 0; i < 25; i++) {
  const nameComp = faker.company.companyName();
  const user = new User({
    nickName: nameComp,
    name: nameComp,
    lastName1: faker.company.companySuffix(),

    password: 123123123,
    email: faker.internet.email(),
    userType: "Business",
    avatar: faker.image.business()
  });

  user
    .save()
    .then(user => console.log(user.nickName))
    .catch(error => console.error(error));
}
