'use client';

import React from 'react';
import Image from 'next/image';
import Card from '../../components/ui/Card'; 
import styles from '../../styles/faqs.module.css';

function FaqsPage() {
  const cardContent = (
    <div className={styles["faqs-content"]}>
      <h1 className={styles["faqs-title"]}>FREQUENTLY ASKED QUESTIONS</h1>
      <p className={styles["faqs-paragraph"]}>
        Below are answers to some of the most commonly asked questions about our Society, the services we provide, and how you can get involved. If your question is not addressed here, please feel free to contact us through our <a href="/contact" className={styles["link-underlined"]}>Contact Us</a> page.
      </p>

      <h3 className={styles["faqs-subtitle"]}>1. What is FLASH?</h3>
      <p className={styles["faqs-paragraph"]}>
        FLASH, or the Free Legal Aid Society for the Helpless, is a nonprofit legal aid organization founded in 2005. We provide free legal representation and support to individuals who cannot afford legal assistance, focusing on criminal and civil cases for the underprivileged.
      </p>

      <h3 className={styles["faqs-subtitle"]}>2. Who is eligible for free legal aid from FLASH?</h3>
      <p className={styles["faqs-paragraph"]}>
        FLASH provides legal aid to individuals who are unable to afford legal representation due to financial hardship. Eligibility is determined based on an application and verification process, ensuring our resources are directed to those most in need.
      </p>

      <h3 className={styles["faqs-subtitle"]}>3. What types of cases does FLASH handle?</h3>
      <p className={styles["faqs-paragraph"]}>
        FLASH primarily handles:
      </p>
      <ul className={styles["key-achievements-list"]}>
        <li><strong>Criminal Cases:</strong> Representing prisoners facing charges or seeking appeals.</li>
        <li><strong>Civil Cases:</strong> Cases of extreme helplessness requiring urgent legal intervention, e.g., family cases.</li>
      </ul>

      <h3 className={styles["faqs-subtitle"]}>4. Does FLASH charge for its services?</h3>
      <p className={styles["faqs-paragraph"]}>
        No, FLASH provides 100% free legal aid. Clients are not required to pay any fees to the lawyers engaged by FLASH.
      </p>

      <h3 className={styles["faqs-subtitle"]}>5. How does FLASH verify applicants for legal aid?</h3>
      <p className={styles["faqs-paragraph"]}>
        FLASH follows a structured methodology:
      </p>
      <ol className={styles["key-achievements-list"]}>
        <li>An application for legal aid is submitted.</li>
        <li>The applicant’s hardship is verified through two references via mail.</li>
        <li>A lawyer is formally engaged to represent the applicant.</li>
        <li>The applicant is notified that they are not required to pay any fees.</li>
      </ol>

      <h3 className={styles["faqs-subtitle"]}>6. Where does FLASH operate?</h3>
      <p className={styles["faqs-paragraph"]}>
        FLASH’s office is located at Leeds Center, Main Boulevard, Gulberg III, Lahore. However, we handle cases across Pakistan, particularly in the High Court and the Supreme Court.
      </p>

      <h3 className={styles["faqs-subtitle"]}>7. How is FLASH funded?</h3>
      <p className={styles["faqs-paragraph"]}>
        FLASH operates solely through donations from individuals and organizations. Every rupee received is directed toward providing legal aid, with complete transparency in how funds are used.
      </p>

      <h3 className={styles["faqs-subtitle"]}>8. Can I volunteer with FLASH?</h3>
      <p className={styles["faqs-paragraph"]}>
        Yes, we welcome volunteers from all walks of life. Whether you’re a lawyer, an advocate for justice, or someone with unique skills, your contribution can help us achieve our mission. Visit our <a href="/get-involved" className={styles["link-underlined"]}>Get Involved</a> page for more details.
      </p>

      <h3 className={styles["faqs-subtitle"]}>9. Can I donate to FLASH, and how?</h3>
      <p className={styles["faqs-paragraph"]}>
        Absolutely. Donations are crucial to sustaining our work. You can donate via bank transfer or have our representatives collect cash or cheques. Visit our <a href="/donate" className={styles["link-underlined"]}>Donate</a> page for more information.
      </p>
    </div>
  );

  return (
    <main className={styles["faqs-page"]}>
      <div className={styles["hero-image"]}>
        <Image
          src="/images/faq.png"
          alt="Frequently Asked Questions"
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

export default FaqsPage;