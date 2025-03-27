"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react'; // Import ChevronDown icon
import '../../styles/Footer.css';
import JoinUsButton from './JoinUsButton';
import DonateButton from './DonateButton';
import Image from 'next/image';

const Footer = () => {
  const [sitemapDropdown, setSitemapDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for dropdown

  const toggleSitemapDropdown = () => {
    setSitemapDropdown((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSitemapDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Column 1: Contact */}
        <div className="footer-section">
          <h3>Contact</h3>
          <p>FREE LEGAL AID SOCIETY FOR THE HELPLESS (FLASH) ®</p>
          <p>Office No. 6, 3rd Floor, Leeds Center, Main Boulevard, Gulberg III, Lahore PK</p>
          <p>Phone: (92) 03 111 336 111</p>
          <p>Email: <a href="mailto:flashpakistan@gmail.com">flashpakistan@gmail.com</a></p>
        </div>

        {/* Column 2: Sitemap */}
        <div className="footer-section">
          <h3>Sitemap</h3>
          <ul>
            <li><Link href="/">Home</Link></li>
          </ul>
          <div className={`dropdown ${sitemapDropdown ? 'open' : ''}`} ref={dropdownRef}>
            <button onClick={toggleSitemapDropdown}>
              About Us <ChevronDown size={16} className="dropdown-icon" />
            </button>
            <div className="dropdown-menu">
              <Link href="/mission">Our Mission</Link>
              <Link href="/history">Our History</Link>
              <Link href="/leadership">Our Leadership</Link>
              <Link href="/gallery">Gallery</Link>
            </div>
          </div>
          <ul>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/impact">Our Impact</Link></li>
            <li><Link href="/get-involved">Get Involved</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 3: Connect */}
        <div className="footer-section">
          <h3>Connect</h3>
          <div className="social-icons">
            <a href="https://facebook.com/FreeLegalAidSociety/" target="_blank" rel="noopener noreferrer">
              <Image src="/images/facebook_circle_color-512.png" alt="Facebook" width={40} height={40} />
            </a>
            <a href="https://linkedin.com/company/free-legal-aid-society/" target="_blank" rel="noopener noreferrer">
              <Image src="/images/LinkedIn_icon_circle.png" alt="LinkedIn" width={40} height={40} />
            </a>
            <a href="https://wa.me/message/TUSOGBHMGQHIF1" target="_blank" rel="noopener noreferrer">
              <Image src="/images/social-whatsapp-circle-512.png" alt="WhatsApp" width={40} height={40} />
            </a>
          </div>
          <h3>Links</h3>
          <ul>
            <li><Link href="/faqs">FAQs</Link></li>
            <li><Link href="/resources">Resources</Link></li>
          </ul>
        </div>

        {/* Column 4: Buttons */}
        <div className="footer-section footer-buttons">
        <Link href="/get-involved">
            <JoinUsButton /> {/* Use the reusable JoinUsButton component */}
          </Link>
          <Link href="/donate">
            <DonateButton /> {/* Use the reusable DonateButton component */}
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© Copyright 2025 Free Legal Aid Society for the Helpless. All rights reserved.</p>
        <div className="footer-links">
          <Link href="/privacy-policy">
            <button className="footer-link-button">Privacy Policy</button>
          </Link>
          <Link href="/terms-and-conditions">
            <button className="footer-link-button">Terms & Conditions</button>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;