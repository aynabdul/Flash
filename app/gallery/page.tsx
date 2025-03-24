'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Card from '@/components/ui/Card';
import { useSupabase } from '@/hooks/useSupabase';
import { TABLES } from '@/lib/supabase';
import styles from '../../styles/gallery.module.css';

interface GalleryItem {
  id: string;
  img_url: string;
  caption?: string;
}

const GalleryPage = () => {
  const { data: galleryItems, loading, error } = useSupabase<GalleryItem>(TABLES.GALLERY);

  if (loading) return <p>Loading gallery data...</p>;
  if (error) return <p>Error loading gallery data. Please try again later.</p>;

  return (
    <main className={styles.page}>
      <div className={styles.heroImage}>
        <h1 className={styles.pageTitle}>GALLERY</h1>
        <Image
          src="/images/professional-camera-blurred.jpg"
          alt="Gallery"
          width={1920}
          height={700}
          layout="responsive"
          objectFit="cover"
        />
      </div>

      <Card className={styles.cardContainer}>
        <h1 className={styles.title}>Our Gallery</h1>
        {galleryItems && galleryItems.length > 0 ? (
          <div className={styles.galleryGrid}>
            {galleryItems.map((item) => (
              <div key={item.id} className={styles.galleryItem}>
                <Image
                  src={item.img_url}
                  alt={item.caption || "Gallery Image"}
                  width={300}
                  height={400}
                  layout="responsive"
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <p>No gallery items found.</p>
        )}
      </Card>
    </main>
  );
};


export default GalleryPage;