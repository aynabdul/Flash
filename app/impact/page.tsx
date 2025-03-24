'use client';

import React from 'react';
import Image from 'next/image';
import Card from '../../components/ui/Card'; 
import styles from '../../styles/impact.module.css';

function ImpactPage() {
  const cardContent = (
    <div className={styles["impact-content"]}>
      <h1 className={styles["impact-title"]}>OUR IMPACT</h1>
      <p className={styles["impact-paragraph"]}>
        Since its establishment in 2005, the Free Legal Aid Society for the Helpless (FLASH) has been a catalyst for transformative change, tirelessly working to bring justice to those who cannot afford it. From advocating for innocent prisoners to assisting vulnerable individuals in civil cases, FLASH’s impact resonates deeply in the lives of the marginalized and oppressed. By focusing on free legal aid, we have saved many lives, restored dignity, and ensured that justice is not denied to the helpless.
      </p>

      <h3 className={styles["impact-subtitle"]}>Our Performance Over the Years</h3>
      <div className={styles["performance-section"]}>
        <div className={styles["performance-item"]}>
          <h4>1. Acquittals and Releases <span className={styles["stat-line"]}> - Last Year: <strong>75%</strong> - Since Inception: <strong>47%</strong></span></h4>
            <p>FLASH has contested <strong>300+</strong> cases in the High Courts and Supreme Court of Pakistan, <strong>140+</strong> of which resulted in the acquittal of innocent individuals, including those wrongfully sentenced to death or life imprisonment. Each individual is a universe in themselves. Each of these individuals had lives, families, kids, and professions, and now they have returned to them.</p>
            
            <br />
            <p>Through our efforts, dozens of prisoners have been released after their sentences were reduced, giving them a second chance at life.</p>
        </div>
        
        <div className={styles["performance-item"]}>
          <h4>2. Reduced Sentences <span className={styles["stat-line"]}> - Last Year: <strong>25%</strong> - Since Inception: <strong>9.8%</strong></span></h4>
          <p><strong>20+</strong> cases saw sentences reduced from death to life imprisonment, or lengthy imprisonment terms shortened significantly, alleviating the hardships of countless families.</p>
        </div>

        <div className={styles["performance-item"]}>
          <h4>3. Upholding Justice</h4>
          <p>While FLASH celebrates its successes, about <strong>29%</strong> appeals were dismissed, and punishments upheld, reflecting the integrity of our legal system and our commitment to fairness, even in unfavorable outcomes. On the other hand, <strong>10%</strong> of the cases were closed before they reached decisions.</p>
        </div>

        <div className={styles["performance-item"]}>
          <h4>4. Expanding Legal Aid - 100%</h4>
          <p>Initially focused on criminal cases, FLASH has, in recent years, taken on civil cases involving family law, including divorce, alimony, and guardianship. These cases only account for <strong>4.2%</strong> of our total cases, however, they have brought critical support to women and families in desperate need of legal representation.</p>
        </div>
      </div>
      <div className={styles["pie-image-container"]}>
        <Image
          src="/images/pie.png"
          alt="Pie Chart"
          width={500}
          height={500}
          className={styles["pie-image"]}
        />
      </div>

      <h3 className={styles["impact-subtitle"]}>Key Achievements</h3>
      <ul className={styles["key-achievements-list"]}>
        <li><strong>Lives Saved:</strong> Many innocent lives have been spared from wrongful sentences, ensuring that innocent lives were spared and their dignity restored.</li>
        <li><strong>Legal Support for Women:</strong> FLASH has handled several successful cases involving family laws, empowering women to secure their rights to maintenance, alimony, and child custody.</li>
        <li><strong>Comprehensive Legal Aid:</strong> From expert advice to legal representation, FLASH provides holistic support, ensuring no individual pays a single rupee for the aid they receive.</li>
      </ul>

      <h3 className={styles["impact-subtitle"]}>The Bigger Picture</h3>
      <p className={styles["impact-paragraph"]}>
        Each acquittal, reduced sentence, and successful civil case not only impacts individuals but also transforms the lives of their families and communities. FLASH’s work is a testament to the power of collective action in creating a just society. Through unwavering dedication and the generosity of our supporters, FLASH continues to fight for those who cannot fight for themselves. Together, we are building a society where justice prevails for all.
      </p>
    </div>
  );

  return (
    <main className={styles["impact-page"]}>
      <div className={styles["hero-image"]}>
        <Image
          src="/images/released from prison - our impact.png"
          alt="Released from Prison"
          width={920}
          height={700}
          layout="responsive"
          objectFit="cover"
        />
      </div>
      <Card className={styles["content"]}>{cardContent}</Card>
    </main>
  );
}

export default ImpactPage;