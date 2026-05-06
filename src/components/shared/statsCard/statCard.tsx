import { LucideIcon } from "lucide-react";

export default function StatCard(
  {
    icon: Icon,
    label,
    value,
  }: {
    icon: LucideIcon;
    label: string;
    value: number;
  }
) {

  return (
    <div className="stat-card card bg-platform-dark">
      <div className="stat-card__icon">
        <Icon />
      </div>
      <div className="stat-card__text">
        <p className="stat-card__value bold">{value}</p>
        <p className="stat-card__label clr-txt-fadded">{label}</p>
      </div>
    </div>
  );
}