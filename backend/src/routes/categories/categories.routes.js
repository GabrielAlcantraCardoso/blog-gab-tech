const express = require("express");
const Router = require("express");
const pool = require('../../db/index');
const route = Router();
const { generateToken } = require('../../services/auth'); 
const authMiddleware = require('../../middlewares/auth');

const categoriesRoutes = (app) => {
  
  app.post('/add-categorie' , authMiddleware, async (req, res) => {
    
    try {
      const { name } = req.body;
      const query = 'INSERT INTO ufmt.categories (name) VALUES ($1)';
      const values = [name];
      await pool.query(query, values);
      res.status(200).send('Profile added successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error adding profile');
    }
  });

  app.get('/list-categories',  async (req, res) => {
    try {

    let query = 'SELECT * FROM ufmt.categories';

    

    const { rows } = await pool.query(query);
      res.status(200).json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error listing profiles');
    }
  });


  app.get('/categorie/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const query = 'SELECT * FROM ufmt.categories WHERE id = $1';
      const { rows } = await pool.query(query, [id]);
      if (rows.length === 0) {
        res.status(404).send('AccessProfile not found');
      } else {
        res.status(200).json(rows[0]);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving AccessProfile');
    }
  });
  
  

  app.delete('/delete-categorie/:id', authMiddleware,  async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'DELETE FROM ufmt.categories WHERE id = $1';
      const values = [id];
      const { rowCount } = await pool.query(query, values);
      if (rowCount === 0) {
        res.status(404).send(`Profile with id ${id} not found`);
      } else {
        res.status(200).send(`Profile with id ${id} deleted successfully`);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Error deleting profile');
    }

  });

  app.put('/edit-categorie/:id', authMiddleware, async (req, res) => {
    try {
      console.log(req.body)
      const { name, id } = req.body;
  
      const query = 'UPDATE ufmt.categories SET name = $1 WHERE id = $2';
      const values = [name, id];
  
      await pool.query(query, values);
      res.status(200).send('Profile updated successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error updating profile');
    }
  });
  




  app.use("", route);
};




module.exports = categoriesRoutes;
