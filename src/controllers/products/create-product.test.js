const request = require("supertest");
const serverConfiguration = require("../../server-configuration");
const server = serverConfiguration.initServer();
const expect = require("chai").expect;

describe("POST /produits", function () {
  describe("les données en entrée sont au bon format", function () {
    it("crée un produit", function (done) {
      // GIVEN
      const productToCreate = {
        type: "soin",
        titre: "Test COVID19",
        code_interne: "COV19",
        description_courte:
          "Test PCR COVID19.",
        description:
          "Effectuez un test PCR pour le COVID19",
      };

      // WHEN
      request(server.listener)
        .post("/produits")
        .send(productToCreate)

        // THEN
        .expect(201, (err, resp) => {
          expect(resp.statusCode).to.eql(201);
          done();
        })
    });
  });

  describe("les données en entrée ne sont pas au bon format", function () {
    it("renvoi une erreur 400", function (done) {
      // GIVEN
      const productToCreate = {
        type: "mauvais type",
        titre: 12345,
        code_interne: "COV19",
        description_courte:
          "Test PCR COVID19.",
        description:
          "Effectuez un test PCR pour le COVID19",
      };

      // WHEN
      request(server.listener)
        .post("/produits")
        .send(productToCreate)

        // THEN
        .expect(400, (err, resp) => {
          expect(resp.body.statusCode).to.eql(400);
          expect(resp.body.error).to.eql("Bad Request");
          expect(resp.body.message).to.eql("Invalid request payload input");
          done();
        });
    });
  });
});
