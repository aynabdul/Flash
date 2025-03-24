"use client";

import React from "react";
import "../../styles/basic-card.css"; 

interface BasicCardProps {
  children: React.ReactNode;
  className?: string;
}

const BasicCard: React.FC<BasicCardProps> = ({ children, className }) => {
  return (
    <div className={`basic-card ${className}`}>
      <div className="basic-card-content">{children}</div>
    </div>
  );
};

export default BasicCard;