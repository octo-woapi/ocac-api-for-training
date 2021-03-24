const request = require("supertest");
const serverConfiguration = require("../../server-configuration");
const server = serverConfiguration.initServer();
const expect = require("chai").expect;

describe("GET /produits", function () {
  it("responds with json", function (done) {
    // GIVEN
    const expected = [
      {
        id: "cbde49b0-b7c0-446b-ac41-9e89a8bc1c8e",
        type: "service",
        titre:
          "Guide Aidant : prendre soin de soi pour prendre soin de son proche",
        description_courte:
          "Disposez d'un guide pratique pour comprendre votre...",
      },
      {
        id: "16146a21-c799-4d01-a7be-8965682d2549",
        type: "service",
        titre: "Téléconseil médical",
        description_courte:
          "Obtenez une réponse rapide et personnalisée à toutes vos questions d’ordre médical.",
      },
      {
        id: "a5f71f43-b17e-478d-b565-02228506fe85",
        type: "service",
        titre: "Téléconsultation médicale sans rendez-vous",
        description_courte:
          "Bénéficiez d’un accès aux soins simplifié et personnalisé avec une plateforme dédiée aux aidants.",
      },
    ];

    // WHEN
    request(server.listener)
      .get("/produits")

      // THEN
      .expect(200, (err, resp) => {
        expect(resp.body).to.eql(expected);
        done();
      });
  });
});

describe("GET /produits/{id}", function () {
  describe("when id is not an UUID", function () {
    it("throw a 400 error", function (done) {
      // GIVEN
      const expected = {
        error: "Bad Request",
        message: "Invalid request params input",
        statusCode: 400,
      };

      // WHEN
      request(server.listener)
        .get(`/produits/some-bad-id`)

        // THEN
        .expect(400, (err, resp) => {
          expect(resp.statusCode).to.eql(400);
          expect(resp.body).to.eql(expected);
          done();
        });
    });
  });

  describe("when product does not exists", function () {
    it("throw a 404 error", function (done) {
      // GIVEN
      unknownId = "fbae0116-d876-4e6e-9aea-0f3a6eed45b6";
      expected = {
        error: "Not Found",
        message: "Le produit n'existe pas",
        statusCode: 404,
      };

      // WHEN
      request(server.listener)
        .get(`/produits/${unknownId}`)

        // THEN
        .expect(404, (err, resp) => {
          expect(resp.statusCode).to.eql(404);
          expect(resp.body).to.eql(expected);
          done();
        });
    });
  });

  describe("when id is a correct UUID", function () {
    it("responds with json", function (done) {
      // GIVEN
      const expected = {
        id: "cbde49b0-b7c0-446b-ac41-9e89a8bc1c8e",
        type: "service",
        code_interne: "guideaidant",
        titre:
          "Guide Aidant : prendre soin de soi pour prendre soin de son proche",
        description_courte:
          "Disposez d'un guide pratique pour comprendre votre...",
        description:
          "Disposez d'un guide pratique pour comprendre votre rôle d’aidant et mieux le vivre au quotidien.",
      };

      // WHEN
      request(server.listener)
        .get(`/produits/${expected.id}`)

        // THEN
        .expect(200, (err, resp) => {
          done();
        });
    });
  });
});
