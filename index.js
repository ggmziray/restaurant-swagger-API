const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const PORT = 4000;
const app = express();

var restaurants = [
  {
    id: 0,
    name: "Woodshill",
  },
  {
    id: 1,
    name: "Fiorellas",
  },
];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.get("/restaurants", (req, res) => {
  res.send(restaurants);
});

app.post("/restaurant", (req, res) => {
  restaurants.push({ id: req.body.id, name: req.body.name });
  res.send(`${JSON.stringify(restaurants)}`);
});

app.delete("/restaurant/:id", (req, res) => {
  console.log("delete:id:" + req.params.id);
  restaurants = restaurants.filter((rest) => rest.id !== req.params.id);
  res.send(`Restaurants left: ${JSON.stringify(restaurants)}`);
});

app.put("/restaurant/:id", (req, res) => {
  restaurants = restaurants.map((item) => {
    if (item.id === req.params.id) {
      item.name === req.body.name;
    }
    return item;
  });

  res.send(JSON.stringify(restaurants));
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
