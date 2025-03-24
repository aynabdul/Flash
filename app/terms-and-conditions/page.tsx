'use client';

import React from 'react';
import Image from 'next/image';
import Card from '../../components/ui/Card'; 
import styles from '../../styles/terms-and-conditions.module.css';

function TermsAndConditionsPage() {
  const cardContent = (
    <div className={styles["tandc-content"]}>
      <h1 className={styles["tandc-title"]}>TERMS & CONDITIONS</h1>
      <p className={styles["tandc-top-paragraph"]}>
        Welcome to the Free Legal Aid Society for the Helpless (FLASH) website. By accessing or using this website, you agree to comply with and be bound by the following terms and conditions. Please read them carefully. If you do not agree to these terms, you are advised not to use this website.
      </p>

      <h3 className={styles["tandc-subtitle"]}>1. Use of the Website</h3>
      <p className={styles["tandc-paragraph"]}>
        a. The content of this website is for informational purposes only. FLASH reserves the right to modify or remove any content without prior notice.
      </p>
      <p className={styles["tandc-paragraph"]}>
        b. You agree to use this website for lawful purposes only and refrain from any actions that may harm or disrupt the website’s functionality.
      </p>

      <h3 className={styles["tandc-subtitle"]}>2. Intellectual Property Rights</h3>
      <p className={styles["tandc-paragraph"]}>
        a. All content on this website, including text, graphics, images, logos, and designs, is the property of FLASH or its licensors and is protected by copyright and trademark laws.
      </p>
      <p className={styles["tandc-paragraph"]}>
        b. You may not reproduce, distribute, or use any content from this website without prior written permission from FLASH.
      </p>

      <h3 className={styles["tandc-subtitle"]}>3. Donations and Payments</h3>
      <p className={styles["tandc-paragraph"]}>
        a. Donations made to FLASH are used exclusively to support our objectives and provide free legal aid to the helpless.
      </p>
      <p className={styles["tandc-paragraph"]}>
        b. By donating, you acknowledge that your contributions are voluntary and non-refundable unless explicitly agreed upon by FLASH.
      </p>

      <h3 className={styles["tandc-subtitle"]}>4. Links to Third-Party Websites</h3>
      <p className={styles["tandc-paragraph"]}>
        a. This website may contain links to external websites for informational purposes. FLASH is not responsible for the content, policies, or practices of these third-party websites.
      </p>
      <p className={styles["tandc-paragraph"]}>
        b. Visiting third-party websites is at your own risk, and we encourage you to review their terms and conditions.
      </p>

      <h3 className={styles["tandc-subtitle"]}>5. Disclaimer of Liability</h3>
      <p className={styles["tandc-paragraph"]}>
        a. FLASH strives to ensure the accuracy of the information provided on this website but does not guarantee its completeness, accuracy, or suitability for any purpose.
      </p>
      <p className={styles["tandc-paragraph"]}>
        b. FLASH will not be liable for any direct, indirect, or consequential damages arising from your use of this website or reliance on its content.
      </p>

      <h3 className={styles["tandc-subtitle"]}>6. Privacy</h3>
      <p className={styles["tandc-paragraph"]}>
        FLASH is committed to protecting your personal information. Please refer to our <a href="/privacy-policy" className={styles["link-underlined"]}>Privacy Policy</a> for detailed information on how we collect, use, and safeguard your data.
      </p>

      <h3 className={styles["tandc-subtitle"]}>7. User Submissions</h3>
      <p className={styles["tandc-paragraph"]}>
        a. Any information or materials you submit to FLASH via this website, including forms or inquiries, must be accurate and not violate the rights of any third party.
      </p>
      <p className={styles["tandc-paragraph"]}>
        b. FLASH reserves the right to remove or refuse any submissions deemed inappropriate or non-compliant with these terms.
      </p>

      <h3 className={styles["tandc-subtitle"]}>8. Modifications to Terms</h3>
      <p className={styles["tandc-paragraph"]}>
        a. FLASH reserves the right to update or modify these Terms & Conditions at any time without prior notice.
      </p>
      <p className={styles["tandc-paragraph"]}>
        b. By continuing to use this website, you agree to be bound by the updated terms.
      </p>

      <h3 className={styles["tandc-subtitle"]}>9. Governing Law</h3>
      <p className={styles["tandc-paragraph"]}>
        a. These Terms & Conditions shall be governed by and construed in accordance with the laws of the Islamic Republic of Pakistan.
      </p>
      <p className={styles["tandc-paragraph"]}>
        b. Any disputes arising from the use of this website shall be subject to the exclusive jurisdiction of the courts in Lahore, Pakistan.
      </p>

      <h3 className={styles["tandc-subtitle"]}>10. Contact Us</h3>
      <p className={styles["tandc-paragraph"]}>
        If you have any questions or concerns regarding these Terms & Conditions, please contact us at <a href="mailto:flashpakistan@gmail.com" className={styles["link-underlined"]}>flashpakistan@gmail.com</a>.
      </p>

      <p className={styles["tandc-bot-paragraph"]}>
        By using this website, you acknowledge that you have read, understood, and agree to these Terms & Conditions. Thank you for supporting FLASH’s mission to ensure justice for the helpless.
      </p>
    </div>
  );

  return (
    <main className={styles["tandc-page"]}>
      <div className={styles["hero-image"]}>
        <Image
          src="/images/terms.png" 
          alt="Terms and Conditions"
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

export default TermsAndConditionsPage;