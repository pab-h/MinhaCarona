export default {
    openapi: "3.0.0",
    info: {
        version: "v1.0.0",
        title: "MinhaCarona - API",
        description: "O MinhaCarona é uma plataforma web destinada a conectar motoristas e passageiros que desejam compartilhar caronas em viagens entre cidades e para eventos específicos. A API foi desenvolvida para fornecer endpoints que permitam a interação com as funcionalidades do sistema de forma eficiente e segura. "
    },
    servers: [
        {
            "url": "http://localhost:3000/",
            "description": "Local"
        }
    ],
    tags: [
        "Users"
    ]
}