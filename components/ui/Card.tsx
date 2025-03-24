"use client";

import React, { useState } from "react";
import "../../styles/card.css";
import Image from "next/image";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className={`card ${className} ${isExpanded ? "expanded" : ""}`}>
      <div className="card-content">{children}</div>
      <button className="expand-button" onClick={toggleExpand}>
        <Image
          src="/images/show-more-button.png"
          alt={isExpanded ? "Show Less" : "Show More"}
          width={24}
          height={24}
        />
      </button>
    </div>
  );
};

export default Card;