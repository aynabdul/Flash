"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import '../../styles/header.css';
import DonateButton from "../common/DonateButton"; // Import the reusable DonateButton component

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for dropdown

  const toggleAboutDropdown = () => {
    setAboutDropdown((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAboutDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className={menuOpen ? "mobile-menu-active" : ""}>
      <div className="container">
        {/* Logo and Text */}
        <div className="flex items-center">
          <div className="logo-container">
            <Image
              src="/images/FLASH Logo.jpg"
              alt="FLASH Logo"
              width={100}
              height={120}
            />
          </div>
          <span className="logo-text">
            Free Legal Aid Society <br />
            for the Helpless
          </span>
        </div>

        {/* Navigation Menu - Desktop */}
        <nav>
          <Link href="/">HOME</Link>
          <span className="divider">|</span>
          <div className={`dropdown ${aboutDropdown ? "open" : ""}`} ref={dropdownRef}>
            <button onClick={toggleAboutDropdown}>
              ABOUT US <ChevronDown size={16} className="dropdown-icon" />
            </button>
            <div className="dropdown-menu">
              <Link href="/mission">Our Mission</Link>
              <Link href="/history">Our History</Link>
              <Link href="/leadership">Our Leadership</Link>
              <Link href="/gallery">Gallery</Link>
            </div>
          </div>
          <span className="divider">|</span>
          <Link href="/services">SERVICES</Link>
          <span className="divider">|</span>
          <Link href="/impact">OUR IMPACT</Link>
          <span className="divider">|</span>
          <Link href="/get-involved">GET INVOLVED</Link>
          <span className="divider">|</span>
          <Link href="/contact">CONTACT US</Link>
        </nav>

        {/* Buttons */}
        <div>
          <Link href="/donate">
            <DonateButton /> {/* Use the reusable DonateButton component */}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="mobile-menu">
          <Link href="/" onClick={() => setMenuOpen(false)}>HOME</Link>
          <div className={`dropdown ${aboutDropdown ? "open" : ""}`} ref={dropdownRef}>
            <button onClick={toggleAboutDropdown}>
              ABOUT US <ChevronDown size={16} className="dropdown-icon" />
            </button>
            <div className="dropdown-menu">
              <Link href="/mission" onClick={() => setMenuOpen(false)}>Our Mission</Link>
              <Link href="/history" onClick={() => setMenuOpen(false)}>Our History</Link>
              <Link href="/leadership" onClick={() => setMenuOpen(false)}>Our Leadership</Link>
              <Link href="/gallery" onClick={() => setMenuOpen(false)}>Gallery</Link>
            </div>
          </div>
          <Link href="/services" onClick={() => setMenuOpen(false)}>SERVICES</Link>
          <Link href="/impact" onClick={() => setMenuOpen(false)}>OUR IMPACT</Link>
          <Link href="/get-involved" onClick={() => setMenuOpen(false)}>GET INVOLVED</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>CONTACT US</Link>
          <Link href="/donate" onClick={() => setMenuOpen(false)}>
            <DonateButton /> {/* Use the reusable DonateButton component */}
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;