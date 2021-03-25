const request = require("supertest");
const serverConfiguration = require("../../server-configuration");
const server = serverConfiguration.initServer();
const expect = require("chai").expect;
const { productRepository} = require("../../repositories/product-repository")

describe("PUT /produits/{id}/type", function () {
  before(async () => {
    await productRepository.removeAll()
  })

  describe("L'ID fournit n'existe pas", function () {
    it("renvoi une erreur 404", async function () {
      // GIVEN
      const unknownId = '5d52f17f-b331-4971-ac27-5a8419687074'
      const knownType = "soin"

      // WHEN
      const response = await request(server.listener)
        .put(`/produits/${unknownId}/type`)
        .send({ type: knownType })

      // THEN
      expect(response.statusCode).to.eql(404);
      expect(response.body.error).to.eql("Not Found");
      expect(response.body.message).to.eql("Le produit n'existe pas");
    });
  });

  describe("L'ID fournit n'est pas un UUID", function () {
    it("renvoi une erreur 400", async function () {
      // GIVEN
      const unknownId = 'unknown-id'

      // WHEN
      const response = await request(server.listener)
        .put(`/produits/${unknownId}/type`)

      // THEN
      expect(response.statusCode).to.eql(400);
      expect(response.body.error).to.eql("Bad Request");
      expect(response.body.message).to.eql("Invalid request params input");
    });
  });

  describe("Le type fournit n'est pas au bon format", function () {
    it("renvoi une erreur 400", async function () {
      // GIVEN
      const productId = "16146a21-c799-4d01-a7be-8965682d2549"
      const unknownType = "unknown-type"
      const productToCreate = {
        id: productId,
        type: "service",
        titre: "Téléconseil médical",
        description_courte:
          "Obtenez une réponse rapide et personnalisée à toutes vos questions d’ordre médical.",
        description:
          "Disposez d'un guide pratique pour comprendre votre rôle d’aidant et mieux le vivre au quotidien.",
      };
      await productRepository.create(productToCreate)

      // WHEN
      const response = await request(server.listener)
        .put(`/produits/${productId}/type`)
        .send({ type: unknownType })

      // THEN
      expect(response.statusCode).to.eql(400);
      expect(response.body.error).to.eql("Bad Request");
      expect(response.body.message).to.eql("Invalid request payload input");
    });
  });

  describe("les données en entrée sont valides", function () {
    it("Met à jour le type du produit", async function () {
      // GIVEN
      const productId = "69be5a1f-6c9a-4764-85dc-99888a583653"
      const knownType = "soin"
      const productToCreate = {
        id: productId,
        type: "service",
        titre: "Téléconseil médical",
        description_courte:
          "Obtenez une réponse rapide et personnalisée à toutes vos questions d’ordre médical.",
        description:
          "Disposez d'un guide pratique pour comprendre votre rôle d’aidant et mieux le vivre au quotidien.",
      };
      await productRepository.create(productToCreate)

      // WHEN
      const response = await request(server.listener)
        .put(`/produits/${productId}/type`)
        .send({ type: knownType })

      // THEN
      expect(response.statusCode).to.eql(204);
      const updatedProduct = await productRepository.findOne(productId)
      expect(updatedProduct.type).to.eql(knownType);
    });
  });
});
