const express = require("express");
const Router = require("express");
const pool = require('../../db/index');
const route = Router();
const { generateToken } = require('../../services/auth');
const bcrypt = require('bcrypt');  
const authMiddleware = require('../../middlewares/auth');

const loginRoutes = (app) => {


app.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;
    const query = {
      text: 'SELECT * FROM ufmt.user WHERE email = $1',
      values: [email],
      
    };

    try {
     
      const result = await pool.query(query);

      if (result.rows.length === 0) {
        
        return res.status(401).json({ message: 'email ou senha invalidos' });
        
      }  const user = result.rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
    
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Email ou senha inválidos' });
      }
    
      const token = generateToken({ id: user.id });
      return res.json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).send('Erro interno do servidor');
    }
  });


  app.post('/checkTokenValidity', authMiddleware, (req, res) => {
    res.sendStatus(200);
  });
  
};
module.exports = loginRoutes;