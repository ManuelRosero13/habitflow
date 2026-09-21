import type { Habit } from "../types/habit";

interface HabitItemProps {
  habit: Habit;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function HabitItem({ habit, onToggle, onDelete }: HabitItemProps) {
  return (
    <article
      className={`habit-item ${habit.completed ? "completed" : ""}`}
    >
      <label>
        <input
          type="checkbox"
          checked={habit.completed}
          onChange={() => onToggle(habit.id)}
        />

        <span>{habit.name}</span>
      </label>

      <button
        type="button"
        onClick={() => onDelete(habit.id)}
        className="delete-button"
      >
        Eliminar
      </button>
    </article>
  );
}

export default HabitItem;