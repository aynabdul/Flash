'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const cards = [
    {
      title: 'Leadership',
      description: 'Manage Team',
      route: '/admin/leadership',
      imageSrc: '/images/user.png',
      buttonText: 'View Team',
    },
    {
      title: 'Gallery',
      description: 'Manage Images',
      route: '/admin/gallery',
      imageSrc: '/images/camera.png',
      buttonText: 'View Gallery',
    },
    {
      title: 'Resources',
      description: 'Manage PDFs',
      route: '/admin/resources',
      imageSrc: '/images/pdf_1.png',
      buttonText: 'View PDFs',
    },
    {
      title: 'Success Stories',
      description: 'Manage Stories',
      route: '/admin/success-stories',
      imageSrc: '/images/success.png',
      buttonText: 'View Stories',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 pt-10">
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h1 className="text-2xl font-semibold text-gray-900">Welcome to Admin Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your website content from here.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {cards.map((card, index) => (
                <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <img
                      src={card.imageSrc}
                      alt={card.title}
                      className="object-contain h-32 w-full mb-4"
                    />
                    <h3 className="text-lg font-medium text-gray-900">{card.title}</h3>
                    <p className="mt-2 text-sm text-gray-500">{card.description}</p>
                  </div>
                  <div className="bg-gray-50 px-5 py-3">
                    <a
                      href={card.route}
                      className="font-medium text-blue-700 hover:text-blue-900 text-sm"
                    >
                      {card.buttonText}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}