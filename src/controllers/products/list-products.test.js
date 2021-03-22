const request = require("supertest");
const serverConfiguration = require("../../server-configuration");
const server = serverConfiguration.initServer();
const expect = require("chai").expect;
const { productRepository } = require('../../repositories/product-repository')

describe("GET /produits", function () {
  before(async () => {
    await productRepository.removeAll()
  })

  it("renvoi une liste de produits d'assurance", async function () {
    // GIVEN
    const firstProduct = {
      id: "cbde49b0-b7c0-446b-ac41-9e89a8bc1c8e",
      type: "service",
      titre:
        "Guide Aidant : prendre soin de soi pour prendre soin de son proche",
      code_interne: "first",
      description: "first",
      description_courte:
        "Disposez d'un guide pratique pour comprendre votre...",
    }
    const secondProduct = {
      id: "16146a21-c799-4d01-a7be-8965682d2549",
      code_interne: "second",
      description: "second",
      type: "service",
      titre: "Téléconseil médical",
      description_courte:
        "Obtenez une réponse rapide et personnalisée à toutes vos questions d’ordre médical.",
    }
    const thirdProduct = {
      id: "a5f71f43-b17e-478d-b565-02228506fe85",
      code_interne: "third",
      description: "third",
      type: "service",
      titre: "Téléconsultation médicale sans rendez-vous",
      description_courte:
        "Bénéficiez d’un accès aux soins simplifié et personnalisé avec une plateforme dédiée aux aidants.",
    }

    await productRepository.create(firstProduct)
    await productRepository.create(secondProduct)
    await productRepository.create(thirdProduct)

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
    const response = await request(server.listener)
      .get("/produits")

      // THEN
      expect(response.statusCode).to.eql(200);
      expect(response.body).to.eql(expected);
  });
});
