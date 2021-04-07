const request = require("supertest");
const serverConfiguration = require("../../server-configuration");
const server = serverConfiguration.initServer();
const expect = require("chai").expect;

describe("GET /produits", function () {
  it("returns list of products", function (done) {
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
        expect(resp.status).to.eql(200);
        expect(resp.body).to.eql(expected);
        done();
      });
  });
});

describe("GET /produits/{identifiant}", function () {
  describe("identifier is not an uuid", function (done) {
    it("returns a 400 error", function (done) {
      // GIVEN
      const notAnUuid = "abc";
      const expected = {
        error: "Bad Request",
        message: "Invalid request params input",
        statusCode: 400,
      };

      // WHEN
      request(server.listener)
        .get(`/produits/${notAnUuid}`)

        // THEN
        .expect(400, (err, resp) => {
          expect(resp.status).to.eql(400);
          expect(resp.body).to.eql(expected);
          done();
        });
    });
  });
  describe("identifier is a valid uuid", function () {
    describe("id is known product id", function () {
      it("returns a product from it's id", function (done) {
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
          .get("/produits/cbde49b0-b7c0-446b-ac41-9e89a8bc1c8e")

          // THEN
          .expect(200, (err, resp) => {
            expect(resp.status).to.eql(200);
            expect(resp.body).to.eql(expected);
            done();
          });
      });
    });
    describe("id is an unknown product id", function () {
      it("returns a 404 error", function (done) {
        // GIVEN
        const unknowUuid = "d5d09531-2527-48a4-a018-4aec3c503ecd";

        const expected = {
          error: "Not Found",
          message: "Resource not found",
          statusCode: 404,
        };

        // WHEN
        request(server.listener)
          .get(`/produits/${unknowUuid}`)

          // THEN
          .expect(404, (err, resp) => {
            expect(resp.status).to.eql(404);
            expect(resp.body).to.eql(expected);
            done();
          });
      });
    });
  });
});

describe("POST /produits", function () {
  it.only("create a new product", function (done) {
    // GIVEN
    const payload = {
      type: "service",
      code_interne: "teleconsultationmed",
      titre: "Téléconsultation médical",
      description_courte: "téléconsultation à distance",
      description: "téléconsultation à distance éloignée",
    };

    // WHEN
    request(server.listener)
      .post("/produits")
      .send(payload)

      // THEN
      .expect(201, (err, resp) => {
        expect(resp.status).to.eql(201);
        expect(resp.body.id).to.not.empty;
        done();
      });
  });
});
