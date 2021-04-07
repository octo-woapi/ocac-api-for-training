const request = require("supertest");
const expect = require("chai").expect;
const { listProducts } = require("./products-list");
const { findProduct } = require("./product-find");
const { createProduct } = require("./product-create");

describe("listProducts", function () {
  it("returns list of products", function () {
    // GIVEN
    const expected = [
      {
        id: "cbde49b0-b7c0-446b-ac41-9e89a8bc1c8e",
        type: "service",
        code_interne: "guideaidant",
        titre:
          "Guide Aidant : prendre soin de soi pour prendre soin de son proche",
        description_courte:
          "Disposez d'un guide pratique pour comprendre votre...",
        description:
          "Disposez d'un guide pratique pour comprendre votre rôle d’aidant et mieux le vivre au quotidien.",
      },
      {
        id: "16146a21-c799-4d01-a7be-8965682d2549",
        type: "service",
        code_interne: "teleconsultationmed",
        titre: "Téléconseil médical",
        description_courte:
          "Obtenez une réponse rapide et personnalisée à toutes vos questions d’ordre médical.",
        description:
          "Disposez d'un guide pratique pour comprendre votre rôle d’aidant et mieux le vivre au quotidien.",
      },
      {
        id: "a5f71f43-b17e-478d-b565-02228506fe85",
        type: "service",
        code_interne: "teleconsultationmedsasnrdv",
        titre: "Téléconsultation médicale sans rendez-vous",
        description_courte:
          "Bénéficiez d’un accès aux soins simplifié et personnalisé avec une plateforme dédiée aux aidants.",
        description:
          "Disposez d'un guide pratique pour comprendre votre rôle d’aidant et mieux le vivre au quotidien.",
      },
    ];

    // WHEN
    const actual = listProducts();

    // THEN
    expect(actual).to.eql(expected);
  });
});

describe("findProduct by id", function () {
  it("returns product found by it's id", async function () {
    // GIVEN
    const createId = await createProduct({
      type: "service",
      code_interne: "guideaidant",
      titre:
        "Guide Aidant : prendre soin de soi pour prendre soin de son proche",
      description_courte:
        "Disposez d'un guide pratique pour comprendre votre...",
      description:
        "Disposez d'un guide pratique pour comprendre votre rôle d’aidant et mieux le vivre au quotidien.",
    });

    const id = createId;
    const expected = {
      id: id,
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
    const actual = findProduct(id);

    // THEN
    expect(actual).to.eql(expected);
  });
});

describe("createProduct", function () {
  it("returns new product id", function () {
    // GIVEN
    const payload = {
      type: "service",
      code_interne: "teleconsultationmed",
      titre: "Téléconsultation médical",
      description_courte: "téléconsultation à distance",
      description: "téléconsultation à distance éloignée",
    };

    // WHEN
    const actual = createProduct(payload);

    // THEN
    expect(actual).to.not.null;
  });
});
