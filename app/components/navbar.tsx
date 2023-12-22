"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faUser } from "@fortawesome/free-solid-svg-icons";
import { useRouter, usePathname } from "next/navigation";

export const navLinks = [
  { id: "", title: "Home" },
  { id: "", title: "Companies" },
  { id: "", title: "Phones" },
  { id: "", title: "Top Search" },
];

const navAuthButtons = [
  { id: "signin", title: "LOGIN" },
  { id: "signup", title: "REGISTRATION" },
];

const HamburgerIcon: React.FC = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 12H21M3 6H21H3ZM3 18H21H3Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 6L6 18M6 6L18 18"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Navbar: React.FC = () => {
  const currentPage = usePathname();
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`w-full flex py-8 md:py-4 justify-between md:gap-[4rem] items-center navbar px-12  bg-[#0C5F4C] ${
        isScrolled ? "sticky top-0 bg-[#0C5F4C] shadow-md" : ""
      } z-20`}
    >
      <div className="flex md:w-[33%]">
        <img
          onClick={() => {
            window.location.href = "/";
          }}
          src="/svgs/logo-expanzo-black.svg"
          width={40}
          height={40}
          alt="Icon"
          className="cursor-pointer block sm:hidden"
        />

        <button
          onClick={() => setToggle(!toggle)}
          className="focus:outline-none hidden sm:block"
        >
          {toggle ? <CloseIcon /> : <HamburgerIcon />}
        </button>

        <Link href={`/`}>
          <p className="hidden sm:block text-white px-4 sm:font-medium">
            DASHBOARD
          </p>
        </Link>
        <Link href={`/contact`}>
          <p className="hidden sm:block text-white px-4 sm:font-medium">
            CONTACT
          </p>
        </Link>
      </div>

      {/* Desktop NavLinks */}
      <div className="list-none sm:flex hidden justify-center items-center w-[33%] md:w-[33%]">
        {currentPage === "/contact" && (
          <img
            src="/svgs/logo-expanzo.svg"
            width={70}
            height={70}
            alt="Expanzo i"
            className=""
          />
        )}
      </div>

      {/* Desktop NavAuthButtons */}
      <div className="float-right md:w-[33%]">
        <ul className="list-none sm:flex hidden justify-center gap-4 float items-center ">
          <Link className="flex gap-2" href={`/`}>
            <div className="rounded-full bg-[#00C29D] p-2 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faUser}
                style={{ fontSize: 20, color: "white" }}
              />
            </div>

            <button
              className="text-white border-brand-primary hover:text-white"
              type="submit"
            >
              LOGIN
            </button>
          </Link>

          <Link className="flex gap-2" href={`/`}>
            <div className="rounded-full bg-[#00C29D] p-2 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faPen}
                style={{ fontSize: 20, color: "white" }}
              />
            </div>

            <button
              className="text-white border-brand-primary  hover:text-white"
              type="submit"
            >
              REGISTRATION
            </button>
          </Link>
        </ul>
      </div>

      {/* Mobile Hamburger */}
      <div className="sm:hidden flex flex-1 justify-end items-center">
        <button
          onClick={() => setToggle(!toggle)}
          className="focus:outline-none"
        >
          {toggle ? <CloseIcon /> : <HamburgerIcon />}
        </button>

        {/* Mobile Menu */}
        {toggle && (
          <div
            className="bg-[#0C5F4C] z-10 w-[100%] fixed top-20 right-0 my-4 rounded-xl sidebar"
            style={{ height: "calc(100vh - 1.3rem)" }}
          >
            <ul className="list-none flex flex-col items-center justify-center">
              {/* Mobile NavLinks */}
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`hover:text-brand-primary font-poppins font-medium cursor-pointer text-[1rem] ${
                    active === nav.title
                      ? "text-brand-primary"
                      : "text-dimWhite"
                  } mb-4`}
                  onClick={() => {
                    setActive(nav.title);
                    setToggle(false);
                  }}
                >
                  <Link href={`/${nav.id}`}>{nav.title}</Link>
                </li>
              ))}

              {/* Mobile NavAuthButtons */}
              {navAuthButtons.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[1rem] ${
                    active === nav.title
                      ? "text-brand-primary"
                      : "text-dimWhite"
                  } mb-4`}
                  onClick={() => {
                    setActive(nav.title);
                    setToggle(false);
                  }}
                >
                  <Link href={`/`}></Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
