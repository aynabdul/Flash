'use client';

import React from 'react';
import Image from 'next/image';
import Card from '../../components/ui/Card'; 
import styles from '../../styles/privacy-policy.module.css';

function PrivacyPolicyPage() {
  const cardContent = (
    <div className={styles["privacy-content"]}>
      <h1 className={styles["privacy-title"]}>PRIVACY POLICY</h1>
      <p className={styles["privacy-paragraph"]}>
        At the Free Legal Aid Society for the Helpless (FLASH), we value your trust and are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard the personal information you provide to us through our website and other communication channels.
      </p>

      <h3 className={styles["privacy-subtitle"]}>A. Information We Collect</h3>
      <p className={styles["privacy-paragraph"]}>
        We may collect the following types of personal information:
      </p>
      <ul className={styles["key-achievements-list"]}>
        <li><strong>Contact Information:</strong> Your name, email address, phone number, and mailing address when you fill out forms or contact us.</li>
        <li><strong>Donation Details:</strong> Information related to donations, including transaction details.</li>
        <li><strong>Volunteering and Membership Information:</strong> Data you provide when applying to volunteer, become a member, or join as a Friend of FLASH.</li>
        <li><strong>Other Information:</strong> Any additional details you choose to share with us through inquiries or applications.</li>
      </ul>

      <h3 className={styles["privacy-subtitle"]}>B. How We Use Your Information</h3>
      <p className={styles["privacy-paragraph"]}>
        We use the information you provide for the following purposes:
      </p>
      <ul className={styles["key-achievements-list"]}>
        <li>To process and acknowledge donations.</li>
        <li>To respond to your inquiries and requests.</li>
        <li>To manage applications for membership, volunteering, or legal aid.</li>
        <li>To communicate updates, news, and events related to FLASH.</li>
        <li>To comply with legal and regulatory requirements.</li>
      </ul>
      <p className={styles["privacy-paragraph"]}>
        We do not sell, rent, or share your personal information with third parties for their marketing purposes.
      </p>

      <h3 className={styles["privacy-subtitle"]}>C. How We Protect Your Information</h3>
      <p className={styles["privacy-paragraph"]}>
        FLASH implements robust security measures to protect your personal information, including:
      </p>
      <ul className={styles["key-achievements-list"]}>
        <li>Secure storage and restricted access to personal data.</li>
        <li>Encryption of sensitive data during transmission.</li>
        <li>Regular updates to our website’s security protocols.</li>
      </ul>
      <p className={styles["privacy-paragraph"]}>
        Despite these measures, please note that no method of transmission or storage is completely secure, and we cannot guarantee absolute security.
      </p>

      <h3 className={styles["privacy-subtitle"]}>D. Sharing of Information</h3>
      <p className={styles["privacy-paragraph"]}>
        We may share your information under the following circumstances:
      </p>
      <ul className={styles["key-achievements-list"]}>
        <li><strong>Legal Compliance:</strong> When required by law or to protect our legal rights.</li>
        <li><strong>Consent:</strong> When you explicitly authorize us to share your information.</li>
        <li><strong>Service Providers:</strong> With trusted service providers who assist us in operations, such as processing donations or managing communications.</li>
      </ul>

      <h3 className={styles["privacy-subtitle"]}>E. Cookies</h3>
      <p className={styles["privacy-paragraph"]}>
        Our website may use cookies to enhance user experience and analyze website traffic. Cookies are small files stored on your device that help us improve functionality and personalize content. You can disable cookies in your browser settings, but some features of our website may be affected.
      </p>

      <h3 className={styles["privacy-subtitle"]}>F. Third-Party Links</h3>
      <p className={styles["privacy-paragraph"]}>
        Our website may include links to third-party websites. FLASH is not responsible for the privacy practices or content of these external sites, and we encourage you to review their privacy policies.
      </p>

      <h3 className={styles["privacy-subtitle"]}>G. Your Rights</h3>
      <p className={styles["privacy-paragraph"]}>
        You have the right to:
      </p>
      <ul className={styles["key-achievements-list"]}>
        <li>Access and review the personal information we hold about you.</li>
        <li>Request corrections to inaccurate or incomplete information.</li>
        <li>Withdraw your consent to the use of your data, where applicable.</li>
        <li>Request deletion of your personal data, subject to legal or operational constraints.</li>
      </ul>
      <p className={styles["privacy-paragraph"]}>
        To exercise these rights, please contact us at <a href="mailto:flashpakistan@gmail.com" className={styles["link-underlined"]}>flashpakistan@gmail.com</a>.
      </p>

      <h3 className={styles["privacy-subtitle"]}>H. Updates to This Privacy Policy</h3>
      <p className={styles["privacy-paragraph"]}>
        FLASH reserves the right to update or modify this Privacy Policy at any time. Changes will be posted on this page, and the date of the most recent update will be noted. We encourage you to review this policy periodically to stay informed about how we protect your information.
      </p>

      <h3 className={styles["privacy-subtitle"]}>I. Contact Us</h3>
      <p className={styles["privacy-paragraph"]}>
        If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at:
      </p>
      <ul className={styles["key-achievements-list"]}>
        <li><strong>Email:</strong> <a href="mailto:flashpakistan@gmail.com" className={styles["link-underlined"]}>flashpakistan@gmail.com</a></li>
        <li><strong>Phone:</strong> (92) 03 111 336 111</li>
        <li><strong>Address:</strong> Office No. 6, 3rd Floor, Leeds Center, Main Boulevard, Gulberg III, Lahore – Pakistan.</li>
      </ul>
      <p className={styles["privacy-paragraph"]}>
        Your privacy matters to us, and we are committed to ensuring your information is handled responsibly and transparently. Thank you for trusting FLASH.
      </p>
    </div>
  );

  return (
    <main className={styles["privacy-page"]}>
      <div className={styles["hero-image"]}>
        <Image
          src="/images/privacy.png" 
          alt="Privacy Policy"
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

export default PrivacyPolicyPage;