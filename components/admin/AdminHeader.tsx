"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, LogOut } from "lucide-react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import '../../styles/header.css';
import '../../styles/DonateButton.css';

const AdminHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      // Sign out from NextAuth
      await signOut({ 
        redirect: false,
        callbackUrl: "/admin/login"
      });
      
      // Clear any local storage or cookies if needed
      localStorage.clear();
      
      // Redirect to login page
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

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
        <nav className="flex items-center">
          <Link href="/admin/gallery">GALLERY</Link>
          <span className="divider">|</span>
          <Link href="/admin/leadership">LEADERSHIP</Link>
          <span className="divider">|</span>
          <Link href="/admin/resources">RESOURCES</Link>
          <span className="divider">|</span>
          <Link href="/admin/success-stories">SUCCESS STORIES</Link>
          <span className="divider">|</span>
          <button 
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="donate-button flex items-center gap-2"
          >
            <LogOut size={16} />
            {isLoggingOut ? "Logging out..." : "LOGOUT"}
          </button>
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
          <button 
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="donate-button flex items-center gap-2 w-full justify-center mt-4"
          >
            <LogOut size={16} />
            {isLoggingOut ? "Logging out..." : "LOGOUT"}
          </button>
        </nav>
      )}
    </header>
  );
};

export default AdminHeader;