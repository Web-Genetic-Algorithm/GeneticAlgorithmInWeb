import express from 'express';

const apiRoutes = express.Router();

apiRoutes.post("/", (req, res) => {
    res.status(200).json({ message: 'В разработке' });
});

export default apiRoutes;