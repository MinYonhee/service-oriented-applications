import express from 'express';
import db from '../models/index.js'; 

const router = express.Router();
const User = db.User; 
const Message = db.Message; 
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body); 
    return res.status(201).json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    console.error("Erro ao criar usuário:", error.message);
    return res.status(500).json({ 
      message: "Erro interno ao criar usuário. Verifique a unicidade do email.", 
      error: error.message 
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] } 
    });
    return res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error.message);
    return res.status(500).json({ message: "Erro interno do servidor ao buscar usuários." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id, {
      include: [{ model: Message, as: 'messages' }],
      attributes: { exclude: ['password'] }
    });

    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: `Usuário com id=${id} não encontrado.` });
    }
  } catch (error) {
    console.error("Erro ao buscar usuário:", error.message);
    return res.status(500).json({ message: "Erro interno do servidor ao buscar usuário." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await User.update(req.body, { where: { id: id } });

    if (updated) {
      const updatedUser = await User.findByPk(id, { attributes: { exclude: ['password'] } });
      return res.status(200).json(updatedUser);
    } else {
      return res.status(404).json({ message: `Usuário com id=${id} não encontrado.` });
    }
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error.message);
    return res.status(500).json({ message: "Erro interno do servidor ao atualizar usuário." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await User.destroy({ where: { id: id } });

    if (deleted) {
      return res.status(204).send();
    } else {
      return res.status(404).json({ message: `Usuário com id=${id} não encontrado.` });
    }
  } catch (error) {
    console.error("Erro ao deletar usuário:", error.message);
    return res.status(500).json({ message: "Erro interno do servidor ao deletar usuário." });
  }
});

export default router;