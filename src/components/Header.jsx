import { useState } from "react";
import IconButton from "./IconButton";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);
  return (
    <header>
      <a href="/">
        <img
          src="/images/matts-logo.png"
          alt="Matt's Appliances Logo"
          id="header-logo"
        />
      </a>
      <div className={clsx("navlinks", isOpen ? "open" : "")}>
        <a href="/">Home</a>
        <a href="/about">About Us</a>
        <a href="/payment-plans">Payment Plans</a>
        <a href="/locations">Locations</a>
      </div>
      <IconButton
        client:load
        className="menu-button"
        iconName={"faBars"}
        label=""
        onClick={handleToggle}
      />
    </header>
  );
};

export default Header;
