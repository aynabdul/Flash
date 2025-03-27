import React from "react";
import Image from "next/image";
import Card from "../../components/ui/BasicCard";
import styles from "../../styles/services.module.css";

function ServicesPage() {
  const cardContent = (
    <div className={styles["content-container"]}>
      <h1 className={styles["card-title"]}>OUR SERVICES</h1>
      <p className={styles["card-paragraph"]}>
        At FLASH, we are driven by the belief that justice should not be a privilege but a fundamental right accessible to everyone, regardless of their financial circumstances. To achieve this, we dedicate all donations to advancing our objectives, ensuring that those in need receive the legal aid they deserve.
      </p>

      <h3 className={styles["card-subtitle"]}>Our Objectives</h3>
      <p className={styles["card-paragraph"]}>FLASH&apos;s work revolves around these core objectives:</p>
      <ul className={styles["card-list"]}>
        <li>Providing free legal aid to rehabilitate prisoners languishing in jails or detention centers.</li>
        <li>Offering expert legal advice to those unable to navigate the complexities of the justice system.</li>
        <li>Improving the welfare and living conditions of prisoners through suggestions to relevant authorities.</li>
        <li>Supporting individuals in paying fines or Diyat amounts through Society funds or third-party assistance.</li>
      </ul>

      <h3 className={styles["card-subtitle"]}>Transparency and Integrity in Legal Aid</h3>
      <p className={styles["card-paragraph"]}>
        FLASH is committed to ensuring that every rupee is spent meaningfully and transparently. The lawyers we engage uphold the highest standards of integrity, ensuring that justice is served without compromise.
      </p>
      <ul className={styles["card-list"]}>
        <li><strong>Clients never pay a single penny to the lawyers engaged by FLASH.</strong></li>
        <li>Lawyers genuinely accept significantly reduced fees, often just enough to cover litigation expenses.</li>
      </ul>
      <p className={styles["card-paragraph"]}>This mutual commitment enables us to deliver effective legal aid without compromising on quality or fairness.</p>

      <h3 className={styles["card-subtitle"]}>Our Methodology</h3>
      <p className={styles["card-paragraph"]}>
        Experience has shown that engaging lawyers with a formal fee agreement, even at minimal rates, fosters greater accountability and diligence. FLASH follows a structured approach to ensure effective and responsible legal aid:
      </p>
      <ol className={styles["card-list"]}>
        <li>
          <strong>Application Submission:</strong>
          <div style={{ marginLeft: "20px", marginTop: "5px" }}>
            Applicants seeking free legal aid submit their requests through a prescribed form.
          </div>
        </li>
        <li>
          <strong>Verification of Hardship:</strong>
          <div style={{ marginLeft: "20px", marginTop: "5px" }}>
            The applicant&apos;s financial and personal hardship is verified through two references and more.
          </div>
        </li>
        <li>
          <strong>Engagement of Legal Counsel:</strong>
          <div style={{ marginLeft: "20px", marginTop: "5px" }}>
            A lawyer is engaged through a formal agreement and a separate Power of Attorney.
          </div>
        </li>
        <li>
          <strong>Assurance of Free Representation:</strong>
          <div style={{ marginLeft: "20px", marginTop: "5px" }}>
            The applicant is clearly informed that they are not required to pay a single rupee to the advocate.
          </div>
        </li>
        <li>
          <strong>Fee Payment Process:</strong>
          <div style={{ marginLeft: "20px", marginTop: "5px" }}>
            The agreed fee is split into two payments: half is paid at the time of signing the agreement, and the remainder is paid upon completion of the case.
          </div>
        </li>
      </ol>

      <h3 className={styles["card-subtitle"]}>Beyond Court Representation</h3>
      <p className={styles["card-paragraph"]}>
        FLASH assists individuals who require legal support without going to court. In such cases, we provide:
      </p>
      <ul className={styles["card-list"]}>
        <li><strong>Expert Legal Advice:</strong> We offer legal advice free of cost for those in need.</li>
        <li><strong>Drafting and Vetting of Legal Documents:</strong> Appeals, applications, and petitions are prepared or reviewed by legal experts at no charge.</li>
        <li><strong>Correspondence with Authorities:</strong> We undertake communication with relevant authorities on behalf of the individual.</li>
      </ul>

      <h3 className={styles["card-subtitle"]}>Commitment to Justice</h3>
      <p className={styles["card-paragraph"]}>
        By maintaining our methodology and ensuring accountability, FLASH delivers impactful legal aid while maximizing the value of every donation. Together, with the support of our donors and the dedication of our legal experts, we continue to fight for a society where justice is a reality for everyone.
      </p>
    </div>
  );

  return (
    <main className={styles["our-services-page"]}>
      <div className={styles["hero-image"]}>
        <Image
          src="/images/businessman-signing-important-contract-papers.jpg"
          alt="Businessman Signing Contract"
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

export default ServicesPage; 