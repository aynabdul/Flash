'use client';

import React from 'react';
import Image from 'next/image';
import Card from '../../components/ui/Card'; 
import styles from '../../styles/mission.module.css';

function MissionPage() {
  const cardContent = (
    <div className={styles["mission-content"]}>
      <h1 className={styles["mission-title"]}>WHO WE ARE</h1>
      <p className={styles["mission-paragraph"]}>
        Free Legal Aid Society for the Helpless (FLASH) was founded to assist those most vulnerable in society, particularly prisoners who, due to poverty and lack of legal knowledge, face endless incarceration without hope for a fair trial. Through our efforts, countless individuals have been acquitted or had their sentences reduced, proving the transformative power of free legal aid.
      </p>

      <h3 className={styles["mission-subtitle"]}>Our Rationale</h3>
      <p className={styles["mission-paragraph"]}>
        In Pakistan, a significant portion of the population is impoverished, illiterate, and uninformed about their legal rights. The justice system, based on the adversarial principle, requires individuals to prove their cases, a task made impossible without legal knowledge or representation. The maxim, “ignorance of the law is no excuse,” underscores this challenge, as many languish in jails due to systemic neglect and lack of resources. FLASH exists to address these inequities, ensuring that no one is denied their fundamental right to justice.
      </p>

      <h3 className={styles["mission-subtitle"]}>Our Mission</h3>
      <p className={styles["mission-paragraph"]}>
        <em>We vow to contribute towards building a just, fair, and egalitarian society by providing free legal aid to the helpless, without regard to caste, creed, gender, or race.</em>
      </p>

      <h3 className={styles["mission-subtitle"]}>Our Vision</h3>
      <p className={styles["mission-paragraph"]}>
        We envision a society where responsible and concerned citizens work together to create a high-quality system of justice. Through financial, legal, and moral support, we aim to transform lives, uplift families, and contribute to a system of speedy and economical justice.
      </p>

      <h3 className={styles["mission-subtitle"]}>Our Values</h3>
      <ul className={styles["key-achievements-list"]}>
        <li><strong>Justice-Based Rule of Law:</strong> Respect for the principle that all individuals are equal before the law.</li>
        <li><strong>Access to Justice:</strong> A commitment to ensuring every person can exercise their legal rights.</li>
        <li><strong>Neutrality and Fairness:</strong> A dedication to providing aid without personal judgment or bias.</li>
      </ul>

      <h3 className={styles["mission-subtitle"]}>Religious Inspiration</h3>
      <p className={styles["mission-paragraph"]}>
        Our work is guided by principles of fairness and justice deeply rooted in religious teachings:
      </p>
      <ul className={styles["key-achievements-list"]}>
        <li>In a well-known hadith, the Prophet Muhammad (PBUH) is reported to have told ‘Ali, who he had just appointed as governor of Yemen, “O ‘Ali! People will come to you asking for judgements. When the two parties to a dispute come to you, do not decide in favor of either party until you have heard all that both parties have to say. Only in this manner will you come to a proper decision, and only in this way will you come to know the truth.”</li>
        <li>‘Umar ibn ‘Abd al ‘Aziz said to one of his judges, “When a disputant comes to you with an eye put out, do not be quick to rule in his favor. Who knows, maybe the other party to the dispute will come to you with both eyes put out!”</li>
      </ul>

      <h3 className={styles["mission-subtitle"]}>UN Universal Charter of Human Rights</h3>
      <p className={styles["mission-paragraph"]}>
        FLASH upholds the universal principles of justice outlined in the UN Charter of Human Rights:
      </p>
      <ul className={styles["key-achievements-list"]}>
        <li><strong>Article 10:</strong> Everyone is entitled to a fair and public hearing by an independent and impartial tribunal.</li>
        <li><strong>Article 11:</strong> Everyone charged with a penal offense has the right to be presumed innocent until proven guilty.</li>
      </ul>

      <h3 className={styles["mission-subtitle"]}>The Constitution of the Islamic Republic of Pakistan</h3>
      <p className={styles["mission-paragraph"]}>
        We are aligned with the constitutional values of Pakistan, which enshrine:
      </p>
      <ul className={styles["key-achievements-list"]}>
        <li><strong>Article 4:</strong> The inalienable right of every citizen to be dealt with in accordance with the law.</li>
        <li><strong>Article 10A:</strong> The right to a fair trial and due process.</li>
        <li><strong>Article 25:</strong> Equality before the law and equal protection of the law for all citizens.</li>
      </ul>

      <p className={styles["mission-paragraph"]}>
        At FLASH, our mission is more than just words, it is a commitment to upholding justice, restoring hope, and creating a society where fairness prevails for everyone, regardless of their circumstances. Join us in building a world where justice is truly for all.
      </p>
    </div>
  );

  return (
    <main className={styles["mission-page"]}>
      <div className={styles["hero-image"]}>
        <h1 className={styles["page-title"]}>OUR MISSION</h1>
        <Image
          src="/images/revolution-still-life-design.jpg"
          alt="Our Mission"
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

export default MissionPage;