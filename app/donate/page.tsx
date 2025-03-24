'use client';

import React from 'react';
import Image from 'next/image';
import BasicCard from '../../components/ui/BasicCard'; 
import styles from '../../styles/donate.module.css';

function DonatePage() {
  const cardContent = (
    <div className={styles["donate-content"]}>
      <h1 className={styles["donate-title"]}>DONATE FOR JUSTICE!</h1>
      <p className={styles["donate-paragraph"]}>
        Your contribution to FLASH directly transforms lives by ensuring justice for those who cannot afford it. Every rupee helps provide free legal aid to the helpless, fight for the freedom of prisoners wrongfully incarcerated, and support vulnerable individuals in dire need of representation. Together, we can restore hope, dignity, and fairness where it is needed most.
      </p>

      <p className={styles["donate-paragraph"]}>
        You can donate conveniently through a bank transfer or deposit, or if you prefer, our representatives are available to personally receive cash or cheques at your convenience. Every contribution, no matter how small, brings us closer to a just and equitable society.
      </p>

      <p className={styles["donate-paragraph"]}>
        Thank you for standing with us in the fight for justice!
      </p>

      <h3 className={styles["donate-subtitle"]}>Bank Account Details</h3>
      <div className={styles["donate-details"]}>
        <div className={styles["detail-item"]}>
          <h4>Account Number:</h4> 
          <p><strong>0131 7010 1001 0508</strong></p>
        </div>

        <div className={styles["detail-item"]}>
          <h4>IBAN:</h4> <p><strong>PK79MUCB0131701010010508</strong></p>
        </div>

        <div className={styles["detail-item"]}>
          <h4>Bank:</h4> <p><strong>MCB Bank Limited</strong></p>
        </div>

        <div className={styles["detail-item"]}>
          <h4>Branch:</h4> <p><strong>Session Court Branch, Lahore</strong></p>
        </div>
      </div>

      <h3 className={styles["donate-subtitle"]}>For Cash / Cheque Collection</h3>
      <p className={styles["donate-paragraph"]}>
        Please call us: <strong>(92) 03 111 336 111</strong>
      </p>
    </div>
  );

  return (
    <main className={styles["donate-page"]}>
      <div className={styles["hero-image"]}>
        <Image
          src="/images/volunteer-giving-box-with-donations-another-volunteer.jpg" 
          alt="Donate for Justice"
          width={920}
          height={700}
          layout="responsive"
          objectFit="cover"
        />
      </div>
      <BasicCard className={styles["content"]}>{cardContent}</BasicCard>
    </main>
  );
}

export default DonatePage;