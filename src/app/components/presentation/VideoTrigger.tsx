import { cn } from "../ui/utils";

interface VideoTriggerProps {
  label: string;
  ariaLabel: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  iconSrc?: string;
  variant?: "globe" | "artwork";
  className?: string;
  title?: string;
}

export const VideoTrigger = ({
  label,
  ariaLabel,
  onClick,
  active = false,
  disabled = false,
  iconSrc,
  variant = "globe",
  className,
  title,
}: VideoTriggerProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={ariaLabel}
    title={title}
    disabled={disabled}
    className={cn(
      "presentation-video-trigger",
      variant === "globe"
        ? "presentation-video-trigger--globe"
        : "presentation-video-trigger--artwork",
      active && "is-active",
      disabled && "is-disabled",
      className,
    )}
  >
    {iconSrc && (
      <span className="presentation-video-trigger__icon-shell" aria-hidden="true">
        <img
          src={iconSrc}
          alt=""
          className="presentation-video-trigger__icon"
        />
      </span>
    )}
    <span className="presentation-video-trigger__label">{label}</span>
  </button>
);
