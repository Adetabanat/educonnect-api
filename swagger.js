const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Educonnect API",
        description: "SMS API"
    },
    host: "localhost:3000",
    schemes: ["http"]
}

const outputfile = "./swagger.json";
const endpointfile = ["./routes/index"];

swaggerAutogen(outputfile, endpointfile, doc);
