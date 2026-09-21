import type { Habit } from "../types/habit";

interface HabitItemProps {
  habit: Habit;
  onToggle: (id: number) => void;
}

function HabitItem({ habit, onToggle }: HabitItemProps) {
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
    </article>
  );
}

export default HabitItem;