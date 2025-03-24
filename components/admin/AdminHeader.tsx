"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import '../../styles/header.css';

const AdminHeader = () => {
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
            FLASH ADMIN
          </span>
        </div>

        {/* Navigation Menu - Desktop */}
        <nav>
          <Link href="/admin/gallery">GALLERY</Link>
          <span className="divider">|</span>
          <Link href="/admin/leadership">LEADERSHIP</Link>
          <span className="divider">|</span>
          <Link href="/admin/resources">RESOURCES</Link>
          <span className="divider">|</span>
          <Link href="/admin/success-stories">SUCCESS STORIES</Link>
        </nav>

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
          <Link href="/admin/gallery" onClick={() => setMenuOpen(false)}>GALLERY</Link>
          <Link href="/admin/leadership" onClick={() => setMenuOpen(false)}>LEADERSHIP</Link>
          <Link href="/admin/resources" onClick={() => setMenuOpen(false)}>RESOURCES</Link>
          <Link href="/admin/success-stories" onClick={() => setMenuOpen(false)}>SUCCESS STORIES</Link>
        </nav>
      )}
    </header>
  );
};

export default AdminHeader;