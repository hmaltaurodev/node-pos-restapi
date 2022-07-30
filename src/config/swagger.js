const swaggerJsDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    info: {
        title: 'Postgraduate UNIPAR 2022 - Henrique Augusto Maltauro',
        verson: '1.0.0',
        description: 'Api created for final work on NodeJs'
    },
    host: 'localhost:3000',
    basePath: '/',
    schemes: [
        'http'
    ]
};

const options = {
    swaggerDefinition,
    apis: ['./src/docs/*.yaml']
};

module.exports = swaggerJsDoc(options);
