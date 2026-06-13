const exportManual = async (req, res) => {
    res.json({ message: `Export manual ${req.params.id} - placeholder` });
};

module.exports = { exportManual };
