import { useEffect, useRef, useState } from "react";
import IconButton from "./IconButton";
import clsx from "clsx";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef(null);

  const handleToggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      setIsOpen(false);
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <header ref={headerRef}>
      <a href="/">
        <img
          src="/images/matts-logo.png"
          alt="Matt's Appliances Logo"
          id="header-logo"
          width="934"
          height="766"
        />
      </a>
      <nav id="primary-nav" className={clsx("navlinks", isOpen ? "open" : "")}>
        <a href="/" onClick={() => setIsOpen(false)}>Home</a>
        <a href="/about" onClick={() => setIsOpen(false)}>About Us</a>
        <a href="/payment-plans" onClick={() => setIsOpen(false)}>Payment Plans</a>
        <a href="/locations" onClick={() => setIsOpen(false)}>Locations</a>
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
