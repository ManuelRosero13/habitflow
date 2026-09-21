import { useEffect, useState } from "react";
import HabitItem from "./components/HabitItem";
import type { Habit } from "./types/habit";
import {
  createHabit,
  deleteHabit,
  getHabits,
  updateHabit,
} from "./api/habits.ts";
import "./App.css";

function App() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Obtener hábitos al cargar la aplicación
  useEffect(() => {
    async function loadHabits() {
      try {
        setLoading(true);
        setError("");

        const data = await getHabits();
        setHabits(data);
      } catch (error) {
        setError("No se pudieron cargar los hábitos.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadHabits();
  }, []);

  // Crear hábito
  async function handleAddHabit(event: React.FormEvent) {
    event.preventDefault();

    if (!newHabit.trim()) {
      setError("Escribe el nombre de un hábito.");
      return;
    }

    try {
      setError("");
      setSuccess("");

      const habit = await createHabit(newHabit);

      setHabits((currentHabits) => [habit, ...currentHabits]);
      setNewHabit("");
      setSuccess("Hábito creado correctamente.");

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      setError("No se pudo crear el hábito.");
      console.error(error);
    }
  }

  // Marcar / desmarcar hábito
  async function handleToggleHabit(id: string) {
    const habit = habits.find((habit) => habit.id === id);

    if (!habit) return;

    try {
      setError("");
      setSuccess("");

      const updatedHabit = await updateHabit(
        habit.id,
        habit.name,
        !habit.completed
      );

      setHabits((currentHabits) =>
        currentHabits.map((habit) =>
          habit.id === id ? updatedHabit : habit
        )
      );

      setSuccess("Hábito actualizado correctamente.");

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      setError("No se pudo actualizar el hábito.");
      console.error(error);
    }
  }

  // Eliminar hábito
  async function handleDeleteHabit(id: string) {
    try {
      setError("");
      setSuccess("");

      await deleteHabit(id);

      setHabits((currentHabits) =>
        currentHabits.filter((habit) => habit.id !== id)
      );

      setSuccess("Hábito eliminado correctamente.");

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      setError("No se pudo eliminar el hábito.");
      console.error(error);
    }
  }

  return (
    <main className="app">
      <section className="habit-container">
        <header className="app-header">
          <h1>HabitFlow</h1>
          <p>Organiza tus hábitos y construye mejores rutinas.</p>
        </header>

        <form className="habit-form" onSubmit={handleAddHabit}>
          <input
            type="text"
            placeholder="Escribe un nuevo hábito..."
            value={newHabit}
            onChange={(event) => setNewHabit(event.target.value)}
          />

          <button type="submit">
            Agregar hábito
          </button>
        </form>

        {loading && (
          <p className="status-message">
            Cargando hábitos...
          </p>
        )}

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        {success && (
          <p className="success-message">
            {success}
          </p>
        )}

        {!loading && habits.length === 0 && !error && (
          <p className="empty-message">
            Todavía no tienes hábitos. ¡Crea el primero!
          </p>
        )}

        <section className="habit-list">
          {habits.map((habit) => (
            <HabitItem
              key={habit.id}
              habit={habit}
              onToggle={handleToggleHabit}
              onDelete={handleDeleteHabit}
            />
          ))}
        </section>
      </section>
    </main>
  );
}

export default App;