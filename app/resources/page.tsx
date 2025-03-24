'use client';

import React from 'react';
import Image from 'next/image';
import { useSupabase } from '@/hooks/useSupabase';
import { TABLES } from '@/lib/supabase';
import Card from '../../components/ui/BasicCard'; 
import styles from '../../styles/resources.module.css';

interface Resource {
  id: string;
  name: string;
  pdf_url: string;
  description?: string;
}

const ResourcesPage = () => {
  const { data: resources, loading, error } = useSupabase<Resource>(TABLES.RESOURCES);

  const handleDownload = (url: string) => {
    window.open(url, '_blank');
  };

  const resourceList = (
    <div className={styles.resourceList}>
      {loading ? (
        <p className={styles.loading}>Loading resources...</p>
      ) : error ? (
        <p className={styles.error}>Error loading resources. Please try again later.</p>
      ) : (
        resources.map((resource) => (
          <div key={resource.id} className={styles.resourceItem}>
            <Image
              src="/images/pdf.png"
              alt="PDF Icon"
              width={50}
              height={50}
              className={styles.pdfIcon}
            />
            <a
              href={resource.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.resourceLink}
            >
              {resource.name}
            </a>
          </div>
        ))
      )}
    </div>
  );

  return (
    <main className={styles.page}>
      <div className={styles.heroImage}>
        <h1 className={styles.pageTitle}>RESOURCES</h1>
        <Image
          src="/images/organised-documents-references.jpg"
          alt="Resources"
          width={920}
          height={700}
          layout="responsive"
          objectFit="cover"
        />
      </div>
      <Card className={styles.cardContainer}>
        <h1 className={styles.title}>Downloads</h1>
        {resourceList}
      </Card>
    </main>
  );
};

export default ResourcesPage;
