'use client';

import React from 'react';
import Image from 'next/image';
import { useSupabase } from '@/hooks/useSupabase';
import { TABLES } from '@/lib/supabase';
import Card from '../../components/ui/BasicCard';
import styles from '../../styles/leadership.module.css';

interface Leadership {
  id: string;
  full_name: string;
  designation: string;
  img_url: string;
}

// Define the order of designations
const designationOrder = [
  'PRESIDENT',
  'SENIOR VICE PRESIDENT',
  'VICE PRESIDENT',
  'GENERAL SECRETARY',
  'JOINT SECRETARY',
  'FINANCE SECRETARY',
  'INFORMATION SECRETARY',
];

const LeadershipPage = () => {
  const { data: leaders, loading, error } = useSupabase<Leadership>(TABLES.LEADERSHIP);

  // Sort leaders based on the predefined designation order
  const sortedLeaders = leaders
    ? leaders.sort((a, b) => {
        // Normalize designations: trim spaces and convert to uppercase
        const normalizedA = a.designation.trim().toUpperCase();
        const normalizedB = b.designation.trim().toUpperCase();

        const indexA = designationOrder.indexOf(normalizedA);
        const indexB = designationOrder.indexOf(normalizedB);

        return indexA - indexB; 
      })
    : [];

  return (
    <main className={styles.page}>
      <div className={styles.heroImage}>
        <h1 className={styles.pageTitle}>OUR LEADERSHIP</h1>
        <Image
          src="/images/room-used-official-event.jpg" 
          alt="Leadership"
          width={1920}
          height={700}
          layout="responsive"
          objectFit="cover"
        />
      </div>
      <Card className={styles.cardContainer}>
        <h3 className={styles.title}>The Governing Body of FLASH<br/>Elected November 2023</h3>
        <div className={styles.grid}>
          {loading ? (
            <p className={styles.loading}>Loading leadership data...</p>
          ) : error ? (
            <p className={styles.error}>Error loading leadership data. Please try again later.</p>
          ) : sortedLeaders.length === 0 ? (
            <p className={styles.noData}>No leadership data found.</p>
          ) : (
            sortedLeaders.map((leader) => (
              <div key={leader.id} className={styles.leaderItem}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={leader.img_url}
                    alt={leader.full_name}
                    width={150}
                    height={150}
                    className={styles.image}
                  />
                </div>
                <h2 className={styles.name}>{leader.full_name}</h2>
                <p className={styles.designation}>{leader.designation}</p>
              </div>
            ))
          )}
        </div>
      </Card>
    </main>
  );
};

export default LeadershipPage;