'use client';

import React from 'react';
import Image from 'next/image';
import ContactForm from '@/components/forms/ContactForm';
import styles from '../../styles/contact.module.css';

function ContactUsPage() {
  const contactParagraph = `
    We’re here to help and answer any questions you may have. Whether you’re seeking legal aid, 
    want to support our cause, or simply wish to learn more about FLASH, we encourage you to reach out. 
    Your voice matters, and together, we can work towards creating a just society. Fill out the form below 
    or use the contact details provided to connect with us, we’d love to hear from you!
  `;

  return (
    <main className={styles.contactPage}>
      <div className={styles.heroImage}>
      <h1 className={styles.pageTitle}>CONTACT US</h1>
      <Image
        src="/images/telephone-laptop-flat-lay-with-workspace-yellow-background.jpg"
        alt="Contact Us"
        width={1920}
        height={700}
        layout="responsive"
        objectFit="cover"
      />
      </div>
      <div className={styles.formContainer}>
      <ContactForm paragraph={contactParagraph} />
      </div>
    </main>
  );
}

export default ContactUsPage;