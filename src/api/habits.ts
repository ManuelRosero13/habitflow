import type { Habit } from "../types/habit";

const API_URL = "http://localhost:3000/api/habits";

export async function getHabits(): Promise<Habit[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Error al obtener los hábitos");
  }

  return response.json();
}

export async function createHabit(name: string): Promise<Habit> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error("Error al crear el hábito");
  }

  return response.json();
}

export async function updateHabit(
  id: string,
  name: string,
  completed: boolean
): Promise<Habit> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      completed,
    }),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el hábito");
  }

  return response.json();
}

export async function deleteHabit(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar el hábito");
  }
}