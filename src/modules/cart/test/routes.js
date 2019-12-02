"use strict";
var request = require("supertest"),
  assert = require("assert"),
  config = require("../../../config/config"),
  _ = require("lodash"),
  jwt = require("jsonwebtoken"),
  mongoose = require("mongoose"),
  app = require("../../../config/express"),
  Cart = mongoose.model("Cart");

var credentials, token, mockup;


describe("Cart CRUD routes tests case simple product", function() {
  before(function(done) {
    mockup = {
      sku: "240-LV08",
      qty: 1,
      quote_id: "4"
    };
    credentials = {
      username: "username",
      password: "password",
      firstname: "first name",
      lastname: "last name",
      email: "test@email.com",
      roles: ["user"]
    };
    token = jwt.sign(_.omit(credentials, "password"), config.jwt.secret, {
      expiresIn: 2 * 60 * 60 * 1000
    });
    done();
  });

  it("should be Cart get use token", done => {
    request(app)
      .get("/api/carts")
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        var resp = res.body;
        done();
      });
  });

  it("should be Cart get by id", function(done) {
    request(app)
      .post("/api/carts")
      .set("Authorization", "Bearer " + token)
      .send(mockup)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        var resp = res.body;
        request(app)
          .get("/api/carts/" + resp.data._id)
          .set("Authorization", "Bearer " + token)
          .expect(200)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }
            var resp = res.body;
            // console.log(resp);
            assert.equal(resp.status, 200);
            assert.equal(resp.data.sku, mockup.sku);
            assert.equal(resp.data.qty, mockup.qty);
            assert.equal(resp.data.quote_id, mockup.quote_id);
            assert.equal(resp.data.name, "test");
            assert.equal(resp.data.product_type, "simple");
            done();
          });
      });
  });

  it("should be Cart post use token", done => {
    request(app)
      .post("/api/carts")
      .set("Authorization", "Bearer " + token)
      .send(mockup)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        var resp = res.body;
        assert.equal(resp.data.name, "test");
        done();
      });
  });

  it("should be cart put use token", function(done) {
    request(app)
      .post("/api/carts")
      .set("Authorization", "Bearer " + token)
      .send(mockup)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        var resp = res.body;
        var update = {
          name: "name update"
        };
        request(app)
          .put("/api/carts/" + resp.data._id)
          .set("Authorization", "Bearer " + token)
          .send(update)
          .expect(200)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }
            var resp = res.body;
            assert.equal(resp.data.name, update.name);
            done();
          });
      });
  });

  it("should be cart delete use token", function(done) {
    request(app)
      .post("/api/carts")
      .set("Authorization", "Bearer " + token)
      .send(mockup)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        var resp = res.body;
        request(app)
          .delete("/api/carts/" + resp.data._id)
          .set("Authorization", "Bearer " + token)
          .expect(200)
          .end(done);
      });
  });

  it("should be cart get not use token", done => {
    request(app)
      .get("/api/carts")
      .expect(403)
      .expect({
        status: 403,
        message: "User is not authorized"
      })
      .end(done);
  });

  it("should be cart post not use token", function(done) {
    request(app)
      .post("/api/carts")
      .send(mockup)
      .expect(403)
      .expect({
        status: 403,
        message: "User is not authorized"
      })
      .end(done);
  });

  it("should be cart put not use token", function(done) {
    request(app)
      .post("/api/carts")
      .set("Authorization", "Bearer " + token)
      .send(mockup)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        var resp = res.body;
        var update = {
          name: "name update"
        };
        request(app)
          .put("/api/carts/" + resp.data._id)
          .send(update)
          .expect(403)
          .expect({
            status: 403,
            message: "User is not authorized"
          })
          .end(done);
      });
  });

  it("should be cart delete not use token", function(done) {
    request(app)
      .post("/api/carts")
      .set("Authorization", "Bearer " + token)
      .send(mockup)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        var resp = res.body;
        request(app)
          .delete("/api/carts/" + resp.data._id)
          .expect(403)
          .expect({
            status: 403,
            message: "User is not authorized"
          })
          .end(done);
      });
  });

  afterEach(function(done) {
    Cart.remove().exec(done);
  });
});

describe("Cart CRUD routes tests case downloadable product", function() {
  before(function(done) {
    mockup = {
      sku: "240-LV08",
      qty: 1,
      quote_id: "4"
    };
    credentials = {
      username: "username",
      password: "password",
      firstname: "first name",
      lastname: "last name",
      email: "test@email.com",
      roles: ["user"]
    };
    token = jwt.sign(_.omit(credentials, "password"), config.jwt.secret, {
      expiresIn: 2 * 60 * 60 * 1000
    });
    done();
  });

  it("should be Cart get use token", done => {
    request(app)
      .get("/api/carts")
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        var resp = res.body;
        done();
      });
  });

  it("should be Cart get by id", function(done) {
    request(app)
      .post("/api/carts")
      .set("Authorization", "Bearer " + token)
      .send(mockup)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        var resp = res.body;
        request(app)
          .get("/api/carts/" + resp.data._id)
          .set("Authorization", "Bearer " + token)
          .expect(200)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }
            var resp = res.body;
            // console.log(resp);
            assert.equal(resp.status, 200);
            assert.equal(resp.data.sku, mockup.sku);
            assert.equal(resp.data.qty, mockup.qty);
            assert.equal(resp.data.quote_id, mockup.quote_id);
            assert.equal(resp.data.name, "test");
            assert.equal(resp.data.product_type, "simple");
            done();
          });
      });
  });

  it("should be Cart post use token", done => {
    request(app)
      .post("/api/carts")
      .set("Authorization", "Bearer " + token)
      .send(mockup)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        var resp = res.body;
        assert.equal(resp.data.name, "test");
        done();
      });
  });

  it("should be cart put use token", function(done) {
    request(app)
      .post("/api/carts")
      .set("Authorization", "Bearer " + token)
      .send(mockup)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        var resp = res.body;
        var update = {
          name: "name update"
        };
        request(app)
          .put("/api/carts/" + resp.data._id)
          .set("Authorization", "Bearer " + token)
          .send(update)
          .expect(200)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }
            var resp = res.body;
            assert.equal(resp.data.name, update.name);
            done();
          });
      });
  });

  it("should be cart delete use token", function(done) {
    request(app)
      .post("/api/carts")
      .set("Authorization", "Bearer " + token)
      .send(mockup)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        var resp = res.body;
        request(app)
          .delete("/api/carts/" + resp.data._id)
          .set("Authorization", "Bearer " + token)
          .expect(200)
          .end(done);
      });
  });

  it("should be cart get not use token", done => {
    request(app)
      .get("/api/carts")
      .expect(403)
      .expect({
        status: 403,
        message: "User is not authorized"
      })
      .end(done);
  });

  it("should be cart post not use token", function(done) {
    request(app)
      .post("/api/carts")
      .send(mockup)
      .expect(403)
      .expect({
        status: 403,
        message: "User is not authorized"
      })
      .end(done);
  });

  it("should be cart put not use token", function(done) {
    request(app)
      .post("/api/carts")
      .set("Authorization", "Bearer " + token)
      .send(mockup)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        var resp = res.body;
        var update = {
          name: "name update"
        };
        request(app)
          .put("/api/carts/" + resp.data._id)
          .send(update)
          .expect(403)
          .expect({
            status: 403,
            message: "User is not authorized"
          })
          .end(done);
      });
  });

  it("should be cart delete not use token", function(done) {
    request(app)
      .post("/api/carts")
      .set("Authorization", "Bearer " + token)
      .send(mockup)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        var resp = res.body;
        request(app)
          .delete("/api/carts/" + resp.data._id)
          .expect(403)
          .expect({
            status: 403,
            message: "User is not authorized"
          })
          .end(done);
      });
  });

  afterEach(function(done) {
    Cart.remove().exec(done);
  });
});

describe("Cart CRUD routes tests case configurable product", function() {
  before(function(done) {
    mockup = {
      sku: "240-LV08",
      qty: 1,
      quote_id: "4"
    };
    credentials = {
      username: "username",
      password: "password",
      firstname: "first name",
      lastname: "last name",
      email: "test@email.com",
      roles: ["user"]
    };
    token = jwt.sign(_.omit(credentials, "password"), config.jwt.secret, {
      expiresIn: 2 * 60 * 60 * 1000
    });
    done();
  });

  it("should be Cart get use token", done => {
    request(app)
      .get("/api/carts")
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        var resp = res.body;
        done();
      });
  });

  it("should be Cart get by id", function(done) {
    request(app)
      .post("/api/carts")
      .set("Authorization", "Bearer " + token)
      .send(mockup)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        var resp = res.body;
        request(app)
          .get("/api/carts/" + resp.data._id)
          .set("Authorization", "Bearer " + token)
          .expect(200)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }
            var resp = res.body;
            // console.log(resp);
            assert.equal(resp.status, 200);
            assert.equal(resp.data.sku, mockup.sku);
            assert.equal(resp.data.qty, mockup.qty);
            assert.equal(resp.data.quote_id, mockup.quote_id);
            assert.equal(resp.data.name, "test");
            assert.equal(resp.data.product_type, "simple");
            done();
          });
      });
  });

  it("should be Cart post use token", done => {
    request(app)
      .post("/api/carts")
      .set("Authorization", "Bearer " + token)
      .send(mockup)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        var resp = res.body;
        assert.equal(resp.data.name, "test");
        done();
      });
  });

  it("should be cart put use token", function(done) {
    request(app)
      .post("/api/carts")
      .set("Authorization", "Bearer " + token)
      .send(mockup)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        var resp = res.body;
        var update = {
          name: "name update"
        };
        request(app)
          .put("/api/carts/" + resp.data._id)
          .set("Authorization", "Bearer " + token)
          .send(update)
          .expect(200)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }
            var resp = res.body;
            assert.equal(resp.data.name, update.name);
            done();
          });
      });
  });

  it("should be cart delete use token", function(done) {
    request(app)
      .post("/api/carts")
      .set("Authorization", "Bearer " + token)
      .send(mockup)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        var resp = res.body;
        request(app)
          .delete("/api/carts/" + resp.data._id)
          .set("Authorization", "Bearer " + token)
          .expect(200)
          .end(done);
      });
  });

  it("should be cart get not use token", done => {
    request(app)
      .get("/api/carts")
      .expect(403)
      .expect({
        status: 403,
        message: "User is not authorized"
      })
      .end(done);
  });

  it("should be cart post not use token", function(done) {
    request(app)
      .post("/api/carts")
      .send(mockup)
      .expect(403)
      .expect({
        status: 403,
        message: "User is not authorized"
      })
      .end(done);
  });

  it("should be cart put not use token", function(done) {
    request(app)
      .post("/api/carts")
      .set("Authorization", "Bearer " + token)
      .send(mockup)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        var resp = res.body;
        var update = {
          name: "name update"
        };
        request(app)
          .put("/api/carts/" + resp.data._id)
          .send(update)
          .expect(403)
          .expect({
            status: 403,
            message: "User is not authorized"
          })
          .end(done);
      });
  });

  it("should be cart delete not use token", function(done) {
    request(app)
      .post("/api/carts")
      .set("Authorization", "Bearer " + token)
      .send(mockup)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        var resp = res.body;
        request(app)
          .delete("/api/carts/" + resp.data._id)
          .expect(403)
          .expect({
            status: 403,
            message: "User is not authorized"
          })
          .end(done);
      });
  });

  afterEach(function(done) {
    Cart.remove().exec(done);
  });
});

describe("Cart CRUD routes tests case bundle product", function() {
    before(function(done) {
      mockup = {
        sku: "240-LV08",
        qty: 1,
        quote_id: "4"
      };
      credentials = {
        username: "username",
        password: "password",
        firstname: "first name",
        lastname: "last name",
        email: "test@email.com",
        roles: ["user"]
      };
      token = jwt.sign(_.omit(credentials, "password"), config.jwt.secret, {
        expiresIn: 2 * 60 * 60 * 1000
      });
      done();
    });
  
    it("should be Cart get use token", done => {
      request(app)
        .get("/api/carts")
        .set("Authorization", "Bearer " + token)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          var resp = res.body;
          done();
        });
    });
  
    it("should be Cart get by id", function(done) {
      request(app)
        .post("/api/carts")
        .set("Authorization", "Bearer " + token)
        .send(mockup)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          var resp = res.body;
          request(app)
            .get("/api/carts/" + resp.data._id)
            .set("Authorization", "Bearer " + token)
            .expect(200)
            .end(function(err, res) {
              if (err) {
                return done(err);
              }
              var resp = res.body;
              // console.log(resp);
              assert.equal(resp.status, 200);
              assert.equal(resp.data.sku, mockup.sku);
              assert.equal(resp.data.qty, mockup.qty);
              assert.equal(resp.data.quote_id, mockup.quote_id);
              assert.equal(resp.data.name, "test");
              assert.equal(resp.data.product_type, "simple");
              done();
            });
        });
    });
  
    it("should be Cart post use token", done => {
      request(app)
        .post("/api/carts")
        .set("Authorization", "Bearer " + token)
        .send(mockup)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          var resp = res.body;
          assert.equal(resp.data.name, "test");
          done();
        });
    });
  
    it("should be cart put use token", function(done) {
      request(app)
        .post("/api/carts")
        .set("Authorization", "Bearer " + token)
        .send(mockup)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          var resp = res.body;
          var update = {
            name: "name update"
          };
          request(app)
            .put("/api/carts/" + resp.data._id)
            .set("Authorization", "Bearer " + token)
            .send(update)
            .expect(200)
            .end(function(err, res) {
              if (err) {
                return done(err);
              }
              var resp = res.body;
              assert.equal(resp.data.name, update.name);
              done();
            });
        });
    });
  
    it("should be cart delete use token", function(done) {
      request(app)
        .post("/api/carts")
        .set("Authorization", "Bearer " + token)
        .send(mockup)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          var resp = res.body;
          request(app)
            .delete("/api/carts/" + resp.data._id)
            .set("Authorization", "Bearer " + token)
            .expect(200)
            .end(done);
        });
    });
  
    it("should be cart get not use token", done => {
      request(app)
        .get("/api/carts")
        .expect(403)
        .expect({
          status: 403,
          message: "User is not authorized"
        })
        .end(done);
    });
  
    it("should be cart post not use token", function(done) {
      request(app)
        .post("/api/carts")
        .send(mockup)
        .expect(403)
        .expect({
          status: 403,
          message: "User is not authorized"
        })
        .end(done);
    });
  
    it("should be cart put not use token", function(done) {
      request(app)
        .post("/api/carts")
        .set("Authorization", "Bearer " + token)
        .send(mockup)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          var resp = res.body;
          var update = {
            name: "name update"
          };
          request(app)
            .put("/api/carts/" + resp.data._id)
            .send(update)
            .expect(403)
            .expect({
              status: 403,
              message: "User is not authorized"
            })
            .end(done);
        });
    });
  
    it("should be cart delete not use token", function(done) {
      request(app)
        .post("/api/carts")
        .set("Authorization", "Bearer " + token)
        .send(mockup)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          var resp = res.body;
          request(app)
            .delete("/api/carts/" + resp.data._id)
            .expect(403)
            .expect({
              status: 403,
              message: "User is not authorized"
            })
            .end(done);
        });
    });
  
    afterEach(function(done) {
      Cart.remove().exec(done);
    });
  });
