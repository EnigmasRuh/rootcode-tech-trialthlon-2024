import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import clsx from "clsx";

const navItems = [
  { label: "Home", href: "home" },
  { label: "Explore", href: "explore" },
  { label: "Plan Your Trip", href: "planytrip" },
  { label: "Visa Application", href: "visapplication" },
  { label: "About Sri Lanka", href: "about" },
  { label: "Contact", href: "contact" },
];

function Navbar() {
  const scrolltoHash = (element_id) => {
    const element = document.getElementById(element_id);

    if (!element) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }

    element?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  };

  const elementIsVisibleInViewport = (el, partiallyVisible = true) => {
    if (!el) return false;
    const { top, left, bottom, right } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    return partiallyVisible
      ? ((top > 0 && top < innerHeight) ||
          (bottom > 0 && bottom < innerHeight)) &&
          ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
      : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
  };

  const setActiveLinks = () => {
    if (elementIsVisibleInViewport(document.getElementById("home"))) {
      setActiveLink("Home");
    }
    if (elementIsVisibleInViewport(document.getElementById("explore"))) {
      setActiveLink("Explore");
    }
    if (elementIsVisibleInViewport(document.getElementById("planytrip"))) {
      setActiveLink("Plan Your Trip");
    }
    if (elementIsVisibleInViewport(document.getElementById("visapplication"))) {
      setActiveLink("Visa Application");
    }
    if (elementIsVisibleInViewport(document.getElementById("about"))) {
      setActiveLink("About Sri Lanka");
    }
  };

  const [activeLink, setActiveLink] = useState("Home");

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", setActiveLinks);
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", setActiveLinks);
    };
  }, []);

  return (
    <nav
      className={clsx(
        "sticky top-0 z-50 border-b border-[#01224D] transition duration-300",
        { "backdrop-blur-lg h-[69px] md:h-[85px]": hasScrolled }
      )}
    >
      <div className="absolute w-full">
        <div className="container mx-auto px-4 relative lg:text-sm">
          <div className="py-3 md:py-4 flex justify-between items-center">
            <div className="flex items-center flex-shrink-0">
              <a href="#home">
                <img
                  className={clsx("mr-2 duration-500 h-12", {
                    "h-16 md:h-20": !hasScrolled,
                  })}
                  src={logo}
                  alt="Logo"
                />
              </a>
            </div>
            <ul className="hidden lg:flex ml-14 space-x-12 ">
              {navItems.map((item, index) => (
                <li
                  key={index}
                  className={
                    activeLink === item.label
                      ? "bg-text-gradient font-bold text-transparent bg-clip-text"
                      : undefined
                  }
                >
                  <div
                    className="hover:cursor-pointer"
                    onClick={() => {
                      scrolltoHash(item.href);
                      setActiveLink(item.label);
                    }}
                  >
                    {item.label}
                  </div>
                </li>
              ))}
            </ul>
            <div className="lg:hidden md:flex flex-col justify-end">
              <HamburgerMenu
                isOpen={mobileDrawerOpen}
                toggleMenu={toggleNavbar}
              />
            </div>
          </div>
          {mobileDrawerOpen && (
            <div className="fixed right-0 z-20 bg-[#01224D] w-full pt-2 flex flex-col justify-center lg:hidden">
              <ul>
                {navItems.map((item, index) => (
                  <li
                    key={index}
                    className="py-3 pl-8 border-b-2 border-primary-background"
                  >
                    <div
                      className="hover:cursor-pointer"
                      onClick={() => {
                        toggleNavbar();
                        scrolltoHash(item.href);
                      }}
                    >
                      {item.label}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

const HamburgerMenu = ({ toggleMenu, isOpen }) => (
  <button
    onClick={toggleMenu}
    className="relative w-6 h-4 flex flex-col justify-between items-center group"
  >
    <span
      className={clsx(
        "block w-full h-0.5 bg-text-gradient transform transition duration-300",
        { "rotate-45 translate-y-1.5": isOpen }
      )}
    ></span>
    <span
      className={clsx(
        "block w-full h-0.5 bg-text-gradient transition duration-300",
        { "opacity-0": isOpen }
      )}
    ></span>
    <span
      className={clsx(
        "block w-full h-0.5 bg-text-gradient transform transition duration-300",
        { "-rotate-45 -translate-y-1.5": isOpen }
      )}
    ></span>
  </button>
);
