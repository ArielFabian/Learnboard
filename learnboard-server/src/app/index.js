// index.js
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const colabRoutes = require('./routes/colabSpacesRoutes');

app.use(express.json());

app.use('/users', userRoutes);
app.use('/colabs', colabRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
