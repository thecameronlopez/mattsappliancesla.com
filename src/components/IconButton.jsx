import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../icons/icons";

const IconButton = ({ iconName, label = "", className = "", onClick }) => {
  const icon = icons[iconName];
  return (
    <button className={className} onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
      {label && <span>{label}</span>}
    </button>
  );
};

export default IconButton;
