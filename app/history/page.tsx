'use client';

import React from 'react';
import Image from 'next/image';
import Card from '../../components/ui/Card';
import styles from '../../styles/history.module.css';

function HistoryPage() {
  const cardContent = (
    <div className={styles["history-content"]}>
      <h1 className={styles["history-title"]}>OUR HISTORY</h1>
      <div className={styles["history-section"]}>
        <div className={styles["history-text"]}>
            <p className={styles["history-paragraph"]}>
            <strong>Free Legal Aid Society for (the) Helpless</strong> was founded in 2005 by <strong>Mr. Justice Manzoor Ahmad Malik</strong>, then a practicing lawyer, with a profound vision to make justice accessible to the most vulnerable. He recognized the dire need for an organization that could provide free legal aid to individuals unable to afford or navigate the complexities of the justice system. His unwavering commitment to fairness and equity laid the foundation for what would become a beacon of hope for countless lives.
            </p>
        </div>
        <div className={styles["history-image"]}>
          <Image
            src="/images/Justice Mazoor Ahmad Malik.jpg" 
            alt="Justice Manzoor Ahmad Malik"
            width={200}
            height={250}
            className={styles["round-image"]}
          />
        </div>
      </div>

      <p className={styles["history-paragraph"]}>
        FLASH began its journey from a humble office in Ali Plaza on Fane Road, Lahore. Over the years, as its impact grew and operations expanded, FLASH relocated to Westend Plaza on Mall Road and eventually established its current, spacious office at Leeds Center on Main Boulevard Gulberg III, Lahore, a testament to its growth and dedication.
      </p>

      <p className={styles["history-paragraph"]}>
        This progress would not have been possible without the steadfast guidance of FLASH’s past Presidents, including Prof. Dr. Akhtar Pervez, Prof. Dr. Tariq Aziz, and Mr. Shahid Ikram Siddiqui Advocate. Their leadership, vision, and unwavering support have been instrumental in shaping FLASH into the respected institution it is today.
      </p>

      <p className={styles["history-paragraph"]}>
        In November 2023, FLASH held its most recent elections, and Mr. Moazzam Rasheed, CEO of Bin Rasheed Group, was elected as President. Under his leadership, FLASH continues to thrive with dedication and responsibility. The contributions of former President, Mr. Shahid Ikram Siddiqui Advocate, and former Vice President, Mr. M. Shahid Usman Advocate, remain invaluable as they continue to serve as patrons, providing guidance and support whenever needed.
      </p>

      <p className={styles["history-paragraph"]}>
        Since its inception, FLASH has contested 300+ cases in the High Court and the Supreme Court of Pakistan. Many of these cases have resulted in acquittals, the release of the accused, and reduced sentences for convicted individuals. While FLASH initially focused on criminal cases, it has recently extended its efforts to civil cases, particularly those involving family law, such as divorce, alimony, and guardianship, to assist individuals unable to afford legal representation.
      </p>

      <p className={styles["history-paragraph"]}>
        From a small office to a highly regarded legal aid society, FLASH’s journey is a story of resilience, dedication, and an unyielding commitment to justice for the helpless. As we continue to grow, we honor our founders and leaders while remaining steadfast in our mission to create a just and equitable society.
      </p>

      <div className={styles["certificates-section"]}>
        <div className={styles["certificate"]}>
          <Image
            src="/images/registration.png" // Replace with the actual image path
            alt="Registration Certificate"
            width={300}
            height={200}
            className={styles["certificate-image"]}
          />
          <p className={styles["certificate-title"]}>Registration Certificate</p>
        </div>
        <div className={styles["certificate"]}>
          <Image
            src="/images/tax exemption.png" 
            alt="Tax Exemption Certificate"
            width={300}
            height={200}
            className={styles["certificate-image"]}
          />
          <p className={styles["certificate-title"]}>Tax Exemption Certificate</p>
        </div>
      </div>
    </div>
  );

  return (
    <main className={styles["history-page"]}>
      <div className={styles["hero-image"]}>
        <h1 className={styles["page-title"]}>OUR HISTORY</h1>
        <Image
          src="/images/history page header.jpg" // Replace with the actual image path
          alt="Our History"
          width={1920}
          height={700}
          layout="responsive"
          objectFit="cover"
        />
      </div>
      <Card className={styles["content"]}>{cardContent}</Card>
    </main>
  );
}

export default HistoryPage;