'use client';

import React from 'react';
import '../../styles/DonateButton.css';

interface DonateButtonProps {
  className?: string;
}

const DonateButton: React.FC<DonateButtonProps> = ({ className }) => {
  return (
    <button className="donate-button">
      Donate
    </button>
  );
};

export default DonateButton;