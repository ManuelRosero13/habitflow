import { Router } from "express";
import { supabase } from "../config";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from("habits")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({
        message: "Error al obtener los hábitos",
        error: error.message,
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
});
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        message: "El nombre del hábito es obligatorio",
      });
    }

    const { data, error } = await supabase
      .from("habits")
      .insert([
        {
          name: name.trim(),
          completed: false,
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        message: "Error al crear el hábito",
        error: error.message,
      });
    }

    return res.status(201).json(data);
  } catch (_error) {
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, completed } = req.body;

    const { data, error } = await supabase
      .from("habits")
      .update({
        name,
        completed,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        message: "Error al actualizar el hábito",
        error: error.message,
      });
    }

    return res.status(200).json(data);
  } catch (_error) {
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("habits")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(500).json({
        message: "Error al eliminar el hábito",
        error: error.message,
      });
    }

    return res.status(200).json({
      message: "Hábito eliminado correctamente",
    });
  } catch (_error) {
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
});

export default router;