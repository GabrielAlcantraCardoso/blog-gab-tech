const express = require("express");
const Router = require("express");
const pool = require("../../db/index");
const route = Router();
const { generateToken } = require("../../services/auth");
const authMiddleware = require("../../middlewares/auth");

const postRoutes = (app) => {
  app.post("/add-post", authMiddleware, async (req, res) => {
    const id_user = req.userId;
    console.log(req.body);
    console.log(req.userId);
    try {
      const { title, text, date, thumb_img, text_img } = req.body;

      // Insere o post na tabela 'post'
      const postQuery = `
            INSERT INTO ufmt.post (title, text, date, id_user, thumb_img, text_img)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id;
          `;
      const postValues = [title, text, date, id_user, thumb_img, text_img];
      const postResult = await pool.query(postQuery, postValues);

      const postId = postResult.rows[0].id;

      // Adiciona as categorias do post na tabela 'post_categories'
      const { categories, id_categories } = req.body;
      const categoryId = id_categories;
      const postCategoriesValues = [postId, categoryId];
      const postCategoriesQuery = `
            INSERT INTO ufmt.post_categories (id_post, id_categories)
            VALUES ($1, $2);
          `;
      await pool.query(postCategoriesQuery, postCategoriesValues);

      res
        .status(201)
        .json({ message: "Post adicionado com sucesso!", postId: postId });
    } catch (error) {
      console.error("Erro ao adicionar o post:", error);
      res.status(500).json({ error: "Ocorreu um erro ao adicionar o post." });
    }
  });

  app.put("/edit-post/:postId", authMiddleware, async (req, res) => {
    const postId = req.params.postId;
    const id_user = req.userId;
    const {
      title,
      text,
      date,
      thumb_img,
      text_img,
      categories,
      id_categories,
    } = req.body;

    try {

      const updatePostQuery = `
            UPDATE ufmt.post
            SET title = $1, text = $2, date = $3, thumb_img = $4, text_img = $5
            WHERE id = $6 AND id_user = $7;
          `;
      const updatePostValues = [
        title,
        text,
        date,
        thumb_img,
        text_img,
        postId,
        id_user,
      ];
      await pool.query(updatePostQuery, updatePostValues);

      const removeCategoriesQuery = `
            DELETE FROM ufmt.post_categories
            WHERE id_post = $1;
          `;
      await pool.query(removeCategoriesQuery, [postId]);

      const addCategoriesQuery = `
            INSERT INTO ufmt.post_categories (id_post, id_categories)
            VALUES ($1, $2);
          `;
      const addCategoriesValues = [postId, id_categories];
      await pool.query(addCategoriesQuery, addCategoriesValues);

      res.status(200).json({ message: "Post atualizado com sucesso!" });
    } catch (error) {
      console.error("Erro ao atualizar o post:", error);
      res.status(500).json({ error: "Ocorreu um erro ao atualizar o post." });
    }
  });

  app.delete("/delete-post/:postId", authMiddleware, async (req, res) => {
    const { postId } = req.params;
  
    try {
      await pool.query("BEGIN");
  

      const deletePostCategoriesQuery = `
        DELETE FROM ufmt.post_categories
        WHERE id_post = $1;
      `;
      const deletePostCategoriesValues = [postId];
      await pool.query(deletePostCategoriesQuery, deletePostCategoriesValues);
  

      const deletePostQuery = `
        DELETE FROM ufmt.post
        WHERE id = $1;
      `;
      const deletePostValues = [postId];
      await pool.query(deletePostQuery, deletePostValues);
  
      await pool.query("COMMIT");
  
      res.status(200).json({ message: "Post excluído com sucesso!" });
    } catch (error) {
      await pool.query("ROLLBACK");
      console.error("Erro ao excluir o post:", error);
      res.status(500).json({ error: "Ocorreu um erro ao excluir o post." });
    }
  });
  

  app.get("/post/:postId", async (req, res) => {
    const postId = req.params.postId;

    try {

      const postQuery = `
            SELECT * FROM ufmt.post
            WHERE id = $1;
          `;
      const postResult = await pool.query(postQuery, [postId]);


      const categoriesQuery = `
            SELECT c.name FROM ufmt.post_categories pc
            JOIN ufmt.categories c ON c.id = pc.id_categories
            WHERE pc.id_post = $1;
          `;
      const categoriesResult = await pool.query(categoriesQuery, [postId]);

      const post = postResult.rows[0];
      const postCategories = categoriesResult.rows.map((row) => row.name);

      res.status(200).json({ post, categories: postCategories });
    } catch (error) {
      console.error("Erro ao buscar o post:", error);
      res.status(500).json({ error: "Ocorreu um erro ao buscar o post." });
    }
  });

  app.get("/list-posts", async (req, res) => {
    try {

      const postsQuery = `
        SELECT * FROM ufmt.post;
      `;
      const postsResult = await pool.query(postsQuery);


      const categoriesQuery = `
        SELECT c.name FROM ufmt.post_categories pc
        JOIN ufmt.categories c ON c.id = pc.id_categories
        WHERE pc.id_post = $1;
      `;

      const posts = postsResult.rows;
      const postsWithCategories = [];

      for (const post of posts) {
        const categoriesResult = await pool.query(categoriesQuery, [post.id]);
        const postCategories = categoriesResult.rows.map((row) => row.name);
        postsWithCategories.push({ ...post, categories: postCategories });
      }

      res.status(200).json({ posts: postsWithCategories });
    } catch (error) {
      console.error("Erro ao buscar os posts:", error);
      res.status(500).json({ error: "Ocorreu um erro ao buscar os posts." });
    }
  });
};

module.exports = postRoutes;
