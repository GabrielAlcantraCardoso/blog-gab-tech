const express = require("express");
const Router = require("express");
const pool = require('../../db');
const route = Router();
const { generateToken } = require('../../services/auth'); 
const bcrypt = require('bcrypt');
const authMiddleware = require('../../middlewares/auth');

const registerRoutes = (app) => {


  app.post('/register', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    const checkEmailQuery = {
      text: 'SELECT * FROM ufmt.user WHERE email = $1',
      values: [email],
    };
   
    try {
        
      const emailResult = await pool.query(checkEmailQuery);
      
      if (emailResult.rows.length > 0) {
       3
        return res.status(401).json({ message: 'O email já está sendo usado' });
      }


      if (password !== confirmPassword) {
        
        return res.status(401).json({ message: 'A senha e a confirmação da senha não correspondem' });
      }

 const saltRounds = 10;
 const hashedPassword = await bcrypt.hash(password, saltRounds)

      const insertUserQuery = {
        text: 'INSERT INTO ufmt.user (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        values: [name, email, hashedPassword],
      };

      const insertUserResult = await pool.query(insertUserQuery);

     res.status(200).send('Usuario registrado');
    } catch (error) {
      console.error(error);
      return res.status(500).send('Erro interno do servidor');
    }
  });

};

module.exports = registerRoutes;
