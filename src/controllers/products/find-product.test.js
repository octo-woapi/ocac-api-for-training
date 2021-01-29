const request = require("supertest");
const serverConfiguration = require("../../server-configuration");
const server = serverConfiguration.initServer();
const expect = require("chai").expect;

describe("GET /produits/{identifiant-produit}", function () {
  it("renvoi le détail d'un produit d'assurance", function (done) {
    // GIVEN
    const expected = {
      id: "16146a21-c799-4d01-a7be-8965682d2549",
      type: "service",
      titre: "Téléconseil médical",
      description_courte:
        "Obtenez une réponse rapide et personnalisée à toutes vos questions d’ordre médical.",
      description:
        "Disposez d'un guide pratique pour comprendre votre rôle d’aidant et mieux le vivre au quotidien.",
    };

    // WHEN
    request(server.listener)
      .get("/produits/16146a21-c799-4d01-a7be-8965682d2549")

      // THEN
      .expect(200, (err, resp) => {
        expect(resp.body).to.eql(expected);
        done();
      });
  });
});
