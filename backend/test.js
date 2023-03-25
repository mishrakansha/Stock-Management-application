process.env.NODE_ENV = "test";
let mongoose = require("mongoose");
const Items = require("./models/Items");
const User = require("./models/User");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("./index");
let should = chai.should();
chai.use(chaiHttp);

describe("Items", () => {
  describe("/GET items", () => {
    it("it should GET all the Items", (done) => {
      chai
        .request(server)
        .get("/api/stock/allItem")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.length.should.be.not.eql(0);
          done();
        });
    });
  });
  describe("/POST items", () => {
    it("All fields are mandatory", (done) => {
      let Items = {};
      chai
        .request(server)
        .post("/api/stock/addItem")
        .send(Items)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          done();
        });
    });
    it("it should POST a Items ", (done) => {
      let Items = {
        itemName: "i-370",
        quantity: 13,
        price: 78,
        description:
          "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
        date: "1/19/2023",
        manufacturingCompany: "Isuzu",
      };
      chai
        .request(server)
        .post("/api/stock/addItem")
        .send(Items)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("itemName");
          res.body.should.have.property("quantity");
          res.body.should.have.property("price");
          res.body.should.have.property("description");
          res.body.should.have.property("date");
          res.body.should.have.property("manufacturingCompany");
          done();
        });
    });
  });
  describe("/GET/:id items", () => {
    it("it should GET a Items by the given id", async () => {
      let Item = new Items({
        itemName: "Monterey",
        quantity: 72,
        price: 26,
        description:
          "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
        date: "3/23/2022",
        manufacturingCompany: "Mercury",
      });
      try {
        Item = await Item.save();
        chai
          .request(server)
          .get("/api/stock/getOneItem/" + Item._id)
          .end((err, res) => {
            res.body.should.be.a("object");
            res.should.have.status(200);
            res.body.should.have.property("itemName");
            res.body.should.have.property("quantity");
            res.body.should.have.property("price");
            res.body.should.have.property("description");
            res.body.should.have.property("date");
            res.body.should.have.property("manufacturingCompany");
            // done();
          });
      } catch (err) {
        console.log(err);
      }
    });
  });

  describe("/PUT/:id Items", () => {
    it("it should UPDATE a Items given the id", async () => {
      let Item = new Items({
        itemName: "M",
        quantity: 72,
        price: 26,
        description:
          "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
        date: "3/23/2022",
        manufacturingCompany: "Mercury",
      });
      try {
        Item = await Item.save();
        chai
          .request(server)
          .get("/api/stock/getOneItem/" + Item._id)
          .send({
            quantity: 72,
            price: 260000,
            description:
              "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
            date: "3/23/2022",
          })
          .end((err, res) => {
            res.body.should.be.a("object");
            res.should.have.status(200);
            res.body.should.have.property("itemName");
            res.body.should.have.property("quantity");
            res.body.should.have.property("price");
            res.body.should.have.property("description");
            res.body.should.have.property("date");
            res.body.should.have.property("manufacturingCompany");
          });
      } catch (err) {
        console.log(err);
      }
    });
  });

  describe("/DELETE/:id Items", () => {
    it("it should DELETE a Items given the id", async () => {
      var Item = new Items({
        itemName: "Navigator",
        quantity: 16,
        price: 27,
        description:
          "Lorem ipsum dolor sit amet,  lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
        date: "6/27/2022",
        manufacturingCompany: "Lincoln",
      });
      Item.save((err) => {
        console.log(err);
      });
      try {
        Item = await Item.save();
        chai
          .request(server)
          .delete("/api/stock/deleteItem/" + Item._id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have
              .property("message")
              .eql("Item successfully deleted!");
            res.should.have.property("ok").eql(true);
          });
      } catch (err) {
        console.log("err", err);
      }
    });
  });
});
// describe("userSignUp", () => {
//   describe("/POST SignUp", () => {
//     it("All fields are mandatory", (done) => {
//       let User = {
//         name: "akansha",
//         // email: "akansha@keepAliveTimeout.com",
//         password: "hello",
//       };
//       chai
//         .request(server)
//         .post("/auth/signUp")
//         .send(User)
//         .end((err, res) => {
//           // console.log(res);
//           res.should.have.status(400);
//           res.body.should.be.a("object");
//           res.body.should.have.property("errors");
//           done();
//         });
//     });
//     it("Password must be valid", (done) => {
//       let User = {
//         name: "akansha",
//         email: "akansha@gmail.com",
//         password: "hello",
//       };
//       chai
//         .request(server)
//         .post("/auth/signUp")
//         .send(User)
//         .end((err, res) => {
//           res.should.have.status(400);
//           res.body.should.be.a("object");
//           res.body.should.have.property("errors");
//           done();
//         });
//     });
//     it("Sucessfully submitted form", (done) => {
//       let User = {
//         name: "akansha",
//         email: "akanshamishra@gmail.com",
//         password: "Hello@987",
//       };
//       chai
//         .request(server)
//         .post("/auth/signUp")
//         .send(User)
//         .end((err, res) => {
//           console.log(res.body);
//           // res.should.have.status(201);
//           // res.body.should.be.a("object");
//           done();
//         });
//     });
//   });
// });
describe("userSignIn", () => {
  describe("/POST SignIn", () => {
    it("Login Successfully", (done) => {
      let User = {
        email: "akanshamishra@gmail.com",
        password: "Hello@987",
      };
      chai
        .request(server)
        .post("/auth/signIn")
        .send(User)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").eql("Login Successful");
          done();
        });
    });
    it("Passwords does not match", (done) => {
      let User = {
        email: "akanshamishra@gmail.com",
        password: "Hello@98797",
      };
      chai
        .request(server)
        .post("/auth/signIn")
        .send(User)
        .end((err, res) => {
          // console.log(res);
          res.should.have.status(400);
          res.body.should.have
            .property("error")
            .eql("Passwords does not match");
          done();
        });
    });
  });
});
