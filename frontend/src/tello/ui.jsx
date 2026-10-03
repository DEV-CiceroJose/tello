import * as Icons from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
export function Icon({ name, size = 20, ...props }) {
  const Component = Icons[name] || Icons.BookOpen;
  return <Component size={size} strokeWidth={1.8} aria-hidden="true" {...props} />;
}
export function Button({ children, icon, endIcon, variant = "", className = "", ...props }) {
  return (
    <button className={`t-button ${variant} ${className}`} {...props}>
      {icon && <Icon name={icon} size={17} />} {children}{" "}
      {endIcon && <Icon name={endIcon} size={17} />}
    </button>
  );
}
export function Picker({ label, value, onChange, options }) {
  return (
    <div className="picker">
      <label>{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger aria-label={label}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
export function SectionHead({ eyebrow, title, description, children }) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {children}
    </div>
  );
}
export function Empty({ icon = "BookOpen", title, children, action }) {
  return (
    <div className="empty-state">
      <span className="subject-icon blue">
        <Icon name={icon} size={26} />
      </span>
      <h3>{title}</h3>
      <p>{children}</p>
      {action}
    </div>
  );
}
export function Meter({ value, label }) {
  return (
    <div
      className="meter"
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <span style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}
export function downloadFile(name, content, type = "text/plain;charset=utf-8") {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
