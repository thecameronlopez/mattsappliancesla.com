import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../icons/icons";

const IconButton = ({
  iconName,
  label = "",
  className = "",
  onClick,
  ariaLabel,
  ariaExpanded,
  ariaControls,
}) => {
  const icon = icons[iconName];
  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      aria-label={ariaLabel || label || "Button"}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
    >
      <FontAwesomeIcon icon={icon} aria-hidden="true" />
      {label && <span>{label}</span>}
    </button>
  );
};

export default IconButton;
