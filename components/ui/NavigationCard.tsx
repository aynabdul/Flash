import React from 'react';
import Link from 'next/link'; 
import '../../styles/NavigationCard.css';

interface NavigationCardProps {
  imageSrc: string;
  title: string;
  description: string;
  buttonText: string;
  route: string;
}

const NavigationCard: React.FC<NavigationCardProps> = ({ imageSrc, title, description, buttonText, route }) => {
  return (
    <div className="navigation-card">
      <img src={imageSrc} alt={title} className="navigation-card-image" />
      <h3 className="navigation-card-title">{title}</h3>
      <p className="navigation-card-description">{description}</p>
      <Link href={route}>
        <button className="navigation-card-button">{buttonText}</button>
      </Link>
    </div>
  );
};

export default NavigationCard;