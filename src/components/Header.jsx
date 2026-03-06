import { useState } from "react";
import IconButton from "./IconButton";
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
      <nav id="primary-nav" className={clsx("navlinks", isOpen ? "open" : "")}>
        <a href="/">Home</a>
        <a href="/about">About Us</a>
        <a href="/payment-plans">Payment Plans</a>
        <a href="/locations">Locations</a>
      </nav>
      <IconButton
        className="menu-button"
        iconName={"faBars"}
        ariaLabel={isOpen ? "Close navigation menu" : "Open navigation menu"}
        ariaExpanded={isOpen}
        ariaControls="primary-nav"
        onClick={handleToggle}
      />
    </header>
  );
};

export default Header;
