import express from 'express';
import db from '../models/index.js'; 

const router = Router();
const Message = db.Message; 
const User = db.User; 

router.post("/", async (req, res) => {
  try {
    const message = await Message.create(req.body); 
    
    const createdMessage = await Message.findByPk(message.id, {
      include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }] 
    });
    return res.status(201).json(createdMessage); 
  } catch (error) {
    console.error("Erro ao criar mensagem:", error.message);
    return res.status(500).json({ 
      message: "Erro interno ao criar mensagem. Verifique se o 'userId' existe.", 
      error: error.message 
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const messages = await Message.findAll({
      include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }], 
      order: [['createdAt', 'DESC']]
    });
    return res.status(200).json(messages); 
  } catch (error) {
    console.error("Erro ao buscar mensagens:", error.message);
    return res.status(500).json({ message: "Erro interno do servidor ao buscar mensagens." }); 
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const message = await Message.findByPk(id, {
      include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }] 
    });

    if (message) {
      return res.status(200).json(message);
    } else {
      return res.status(404).json({ message: `Mensagem com id=${id} não encontrada.` }); 
    }
  } catch (error) {
    console.error("Erro ao buscar mensagem:", error.message);
    return res.status(500).json({ message: "Erro interno do servidor ao buscar mensagem." }); 
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Message.update(req.body, { where: { id: id } });

    if (updated) {
      const updatedMessage = await Message.findByPk(id, { 
        include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }] 
      });
      return res.status(200).json(updatedMessage); 
    } else {
      return res.status(404).json({ message: `Mensagem com id=${id} não encontrada ou sem alterações.` }); 
    }
  } catch (error) {
    console.error("Erro ao atualizar mensagem:", error.message);
    return res.status(500).json({ message: "Erro interno do servidor ao atualizar mensagem." }); 
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Message.destroy({ where: { id: id } });

    if (deleted) {
      return res.status(204).send(); 
    } else {
      return res.status(404).json({ message: `Mensagem com id=${id} não encontrada.` }); 
    }
  } catch (error) {
    console.error("Erro ao deletar mensagem:", error.message);
    return res.status(500).json({ message: "Erro interno do servidor ao deletar mensagem." }); 
  }
});

export default router;