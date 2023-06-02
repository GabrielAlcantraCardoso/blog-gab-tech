const express = require('express');
const Router = require('express');
const pool = require('../../db/index');
const route = Router();
const { generateToken } = require('../../services/auth');
const bcrypt = require('bcrypt');
const authMiddleware = require('../../middlewares/auth');

const userRoutes = (app) => {
  app.post('/addUserConfig', authMiddleware, async (req, res) => {
    try {
      const { name, email, password, profile_picture, about, instagram_link, facebook_link, linkedin_link } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    'INSERT INTO ufmt.user (name, email, password, profile_picture, about, instagram_link, facebook_link, linkedin_link) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
    [name, email, hashedPassword, profile_picture, about, instagram_link, facebook_link, linkedin_link]
  );

      res.send('Dados adicionados com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar dados:', error);
      res.status(500).send('Erro ao adicionar dados');
    }
  });

  app.get('/showUserConfig', authMiddleware, async (req, res) => {
    const id = req.userId;

    try {

      const result = await pool.query('SELECT * FROM ufmt.user WHERE id = $1', [id]);

      res.json(result.rows[0]);
    } catch (error) {
      console.error('Erro ao recuperar os dados:', error);
      res.status(500).send('Erro ao recuperar os dados');
    }
  });

  app.get('/user/:id', async (req, res) => {
    const id = req.params.id;

    try {

      const result = await pool.query('SELECT * FROM ufmt.user WHERE id = $1', [id]);

      res.json(result.rows[0]);
    } catch (error) {
      console.error('Erro ao recuperar os dados:', error);
      res.status(500).send('Erro ao recuperar os dados');
    }
  });

  app.get('/list-users', async (req, res) => {
    
    try {

      const result = await pool.query('SELECT * FROM ufmt.user');
  
      res.json(result.rows);
    } catch (error) {
      console.error('Erro ao recuperar os usuários:', error);
      res.status(500).send('Erro ao recuperar os usuários');
    }
  });

  app.get('/user/:id', async (req, res) => {
    const id = req.params.id;
    try {

      const result = await pool.query('SELECT * FROM ufmt.user WHERE id = $1', [id]);
  
      const userData = result.rows[0];
      if (userData) {
        res.status(200).json(userData);
      } else {
        res.status(404).json({ error: 'Registro não encontrado.' });
      }
    } catch (error) {
      console.error('Erro ao recuperar os usuários:', error);
      res.status(500).send('Erro ao recuperar os usuários');
    }
  });

  app.put('/EditUserConfig/:id', authMiddleware, async (req, res) => {
    try {
      const id = req.params.id;
      const { name, email, password, profile_picture, about, instagram_link, facebook_link, linkedin_link } = req.body;


      const userResult = await pool.query('SELECT * FROM ufmt.user WHERE id = $1', [id]);
      const user = userResult.rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Senha incorreta' });
  }


  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    'UPDATE ufmt.user SET name = $1, email = $2, password = $3, profile_picture = $4, about = $5, instagram_link = $6, facebook_link = $7, linkedin_link = $8 WHERE id = $9',
    [name, email, hashedPassword, profile_picture, about, instagram_link, facebook_link, linkedin_link, id]
  );

      res.status(200).json({ message: 'Dados atualizados com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ocorreu um erro ao atualizar os dados' });
    }
  });


app.post('/home-info', authMiddleware,  async (req, res) => {
  try {
    const { id_user, hidden } = req.body;

    const insertQuery = `
      INSERT INTO ufmt.home_info (id_user, hidden)
      VALUES ($1, $2)
      RETURNING id;
    `;
    const insertValues = [id_user, hidden];
    const insertResult = await pool.query(insertQuery, insertValues);

    const homeInfoId = insertResult.rows[0].id;

    res.status(201).json({ message: 'Dados adicionados com sucesso!', homeInfoId });
  } catch (error) {
    console.error('Erro ao adicionar os dados:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao adicionar os dados.' });
  }
});

app.get('/home-info/:id', async (req, res) => {
  try {
    const homeInfoId = req.params.id;

    const selectQuery = `
      SELECT *
      FROM ufmt.home_info
      WHERE id = $1;
    `;
    const selectValues = [homeInfoId];
    const selectResult = await pool.query(selectQuery, selectValues);
    const homeInfo = selectResult.rows[0];

    if (homeInfo) {
      res.status(200).json(homeInfo);
    } else {
      res.status(404).json({ error: 'Registro não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao obter o registro:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao obter o registro.' });
  }
});

app.put('/home-info/:id', authMiddleware, async (req, res) => {
  const homeInfoId = req.params.id;

  try {
    const { id_user, hidden } = req.body;

    const updateQuery = `
      UPDATE ufmt.home_info
      SET id_user = $1, hidden = $2
      WHERE id = $3;
    `;
    const updateValues = [id_user, hidden, homeInfoId];
    await pool.query(updateQuery, updateValues);

    res.status(200).json({ message: 'Dados atualizados com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar os dados:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao atualizar os dados.' });
  }
});

};
module.exports = userRoutes;
