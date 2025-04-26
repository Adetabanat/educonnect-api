const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Educonnect API",
        description: "SMS API"
    },
    host: "https://educonnect-api-bprr.onrender.com",
    schemes: ["https"]
}

const outputfile = "./swagger.json";
const endpointfile = ["./routes/index"];

swaggerAutogen(outputfile, endpointfile, doc);
