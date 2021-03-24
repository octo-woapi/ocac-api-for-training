const request = require("supertest");
const serverConfiguration = require("../../server-configuration");
const server = serverConfiguration.initServer();
const expect = require("chai").expect;

describe("GET /produits/{id}", function () {
    it("renvoi le détail d'un produit à partir de son ID", function (done) {
        // GIVEN
        const expected = {
            id: "16146a21-c799-4d01-a7be-8965682d2549",
            type: "service",
            titre: "Téléconseil médical",
            description_courte:
                "Obtenez une réponse rapide et personnalisée à toutes vos questions d’ordre médical.",
            description:
                "Disposez d'un guide pratique pour comprendre votre rôle d’aidant et mieux le vivre au quotidien."
        };

        // WHEN
        request(server.listener)
            .get("/produits/16146a21-c799-4d01-a7be-8965682d2549")

            // THEN
            .expect(200, (err, resp) => {
                expect(resp.statusCode).to.eql(200);
                expect(resp.body).to.eql(expected);
                done();
            });
    });

    describe("L'ID fourni ne correspond à aucun produit", function () {
        it("renvoi une erreur 404", function (done) {
            // WHEN
            request(server.listener)
                .get("/produits/b4d5c80a-2774-4939-a704-37a0a018bad1")

                // THEN
                .expect(404, (err, resp) => {
                    expect(resp.body.statusCode).to.eql(404);
                    expect(resp.body.error).to.eql("Not Found");
                    expect(resp.body.message).to.eql("Le produit n'existe pas.");
                    done()
                })
        })
    })

    describe("L'ID fourni n'est pas au format UUID", function () {
        it("renvoi une erreur 400", function (done) {
            // GIVEN 
            const notAnUuid = "some-value"

            // WHEN
            request(server.listener)
                .get(`/produits/${notAnUuid}`)

                // THEN
                .expect(404, (err, resp) => {
                    expect(resp.body.statusCode).to.eql(400);
                    expect(resp.body.error).to.eql("Bad Request");
                    expect(resp.body.message).to.eql("Invalid request params input");
                    done()
                })
        })
    })
});
