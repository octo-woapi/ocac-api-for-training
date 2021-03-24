const request = require("supertest");
const serverConfiguration = require("../../server-configuration");
const server = serverConfiguration.initServer();
const expect = require("chai").expect;

const productBusiness = require("../../business/products/products")

describe("POST /produits", function () {
    describe("Les données en entrée sont au mauvais format", function () {
        it('renvoi une erreur 400', function (done) {
            // GIVEN 
            const falseProduct = {
                type: "booléen",
                titre: 12345,
                code_interne: "un code", 
                description_courte: "TEST",
                description: "un objet au mauvais format"
            }

            // WHEN
            request(server.listener)
                .post("/produits")
                .send(falseProduct)

                // THEN
                .expect(400, (err, resp) => {
                    expect(resp.body.statusCode).to.eql(400);
                    expect(resp.body.error).to.eql("Bad Request")
                    expect(resp.body.message).to.eql("Invalid request payload input")
                    done();
                });
        })
    })

    it("Le produit est créé avec succès", async function () {
        // GIVEN
        const productToCreate = {
            type: "service",
            titre: "Test COVID19",
            code_interne: "COV19",
            description_courte: "Test PCR COVID-19",
            description: "Effectuez un test PCR pour le COVID-19. Résultat garantie en 48h."
        }

        // WHEN
        const response = await request(server.listener)
            .post("/produits")
            .send(productToCreate)

            // THEN
            expect(response.statusCode).to.eql(201);
            const createdProduct = await productBusiness.findProduct(response.body.productId)
            expect(createdProduct.type).to.eql(productToCreate.type)
            expect(createdProduct.code_interne).to.eql(productToCreate.code_interne)
    });
});
