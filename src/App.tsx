import { useState } from "react";
import "./App.css";
import HabitItem from "./components/HabitItem";
import type { Habit } from "./types/habit";


function App() {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: 1,
      name: "Tomar agua",
      completed: false,
    },
    {
      id: 2,
      name: "Leer 20 minutos",
      completed: true,
    },
    {
      id: 3,
      name: "Hacer ejercicio",
      completed: false,
    },
  ]);

  const [newHabit, setNewHabit] = useState("");

  const addHabit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newHabit.trim() === "") {
      return;
    }

    const habit: Habit = {
      id: Date.now(),
      name: newHabit.trim(),
      completed: false,
    };

    setHabits([...habits, habit]);
    setNewHabit("");
  };

  const toggleHabit = (id: number) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id
          ? { ...habit, completed: !habit.completed }
          : habit
      )
    );
  };

  return (
    <main className="app">
      <section className="habit-container">
        <header className="header">
          <h1>HabitFlow</h1>
          <p>Construye mejores hábitos, un día a la vez.</p>
        </header>

        <form className="habit-form" onSubmit={addHabit}>
          <input
            type="text"
            placeholder="¿Qué hábito quieres agregar?"
            value={newHabit}
            onChange={(event) => setNewHabit(event.target.value)}
          />

          <button type="submit">Agregar</button>
        </form>

        <section className="habit-list">
          <h2>Mis hábitos</h2>

          {habits.length === 0 ? (
            <p className="empty-message">
              Todavía no tienes hábitos registrados.
            </p>
          ) : (
            habits.map((habit) => (
              <HabitItem
                key={habit.id}
                habit={habit}
                onToggle={toggleHabit}
              />
            ))
          )}
        </section>
      </section>
    </main>
  );
}

export default App;

