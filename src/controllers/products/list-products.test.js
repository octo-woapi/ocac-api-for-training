const request = require("supertest");
const serverConfiguration = require("../../server-configuration");
const server = serverConfiguration.initServer();
const expect = require("chai").expect;

describe("GET /produits", function () {
  it("renvoi une liste de produits d'assurance", function (done) {
    // GIVEN
    const expected = [
      {
        id: "cbde49b0-b7c0-446b-ac41-9e89a8bc1c8e",
        type: "service",
        code_interne: "guideaidant",
        titre: "Guide Aidant : prendre soin de soi pour prendre soin de son proche",
        description_courte: "Disposez d'un guide pratique pour comprendre votre...",
        description:
            "Disposez d'un guide pratique pour comprendre votre rôle d’aidant et mieux le vivre au quotidien."
      },
      {
        id: "16146a21-c799-4d01-a7be-8965682d2549",
        type: "service",
        codeInterne: "teleconsultationmed",
        titre: "Téléconseil médical",
        description_courte:
          "Obtenez une réponse rapide et personnalisée à toutes vos questions d’ordre médical.",
        description:
            "Disposez d'un guide pratique pour comprendre votre rôle d’aidant et mieux le vivre au quotidien."
      },
      {
        id: "a5f71f43-b17e-478d-b565-02228506fe85",
        type: "service",
        codeInterne: "teleconsultationmedsasnrdv",
        titre: "Téléconsultation médicale sans rendez-vous",
        description_courte:
          "Bénéficiez d’un accès aux soins simplifié et personnalisé avec une plateforme dédiée aux aidants.",
        description:
            "Disposez d'un guide pratique pour comprendre votre rôle d’aidant et mieux le vivre au quotidien."
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
