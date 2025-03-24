import React from 'react';
import Link from 'next/link';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  return (
    <section className="bg-blue-700 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Free Legal Aid Society for the Helpless
          </h1>
          <p className="text-xl mb-8">
            Providing free legal assistance to those who need it most. We believe everyone deserves access to justice regardless of their financial situation.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/services">
              <Button variant="primary" className="bg-white text-blue-700 hover:bg-gray-100">
                Our Services
              </Button>
            </Link>
            <Link href="/donate">
              <Button variant="outline" className="border-white text-white hover:bg-blue-600">
                Donate Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 