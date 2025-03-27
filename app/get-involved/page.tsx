'use client';

import React from 'react';
import Image from 'next/image';
import { useSupabase } from '@/hooks/useSupabase';
import { TABLES } from '@/lib/supabase';
import Card from '../../components/ui/Card';
import styles from '../../styles/get-involved.module.css';

interface Resource {
  id: string;
  name: string;
  pdf_url: string;
  description?: string;
}

const GetInvolvedPage = () => {
  const { data: resources, loading, error } = useSupabase<Resource>(TABLES.RESOURCES);

  const membershipForm = resources.find((resource) => resource.name === 'Membership Form for New Members');
  const friendsForm = resources.find((resource) => resource.name === 'Friends of FLASH Form for New Friends');

  return (
    <main className={styles.page}>
      <div className={styles.heroImage}>
        <Image
          src="/images/close-up-people-volunteer-teamwork-putting-finger-star-shapehands-togetherstack-handsunity-teamwork-world-environment-day.jpg"
          alt="Get Involved"
          width={1920}
          height={700}
          layout="responsive"
          objectFit="cover"
        />
      </div>
      <Card className={styles.cardContainer}>
        <h1 className={styles.title}>GET INVOLVED</h1>
        <p className={styles.description}>
          Making a difference in someone’s life begins with a single step. At FLASH, we rely on the dedication and passion of individuals who share our vision of a just and fair society. By volunteering with us, you can help amplify our efforts, provide hope to those in need, and contribute meaningfully to the fight for justice. Whether you are a legal professional, a concerned citizen, or someone who wants to give back to the community, your involvement can create a lasting impact.
        </p>

        <h2 className={styles.subtitle}>Ways to Volunteer with FLASH</h2>
        <ul className={styles.list}>
          <li>
            <span className={styles.number}>1.</span>
            <strong>Legal Assistance:</strong>
            <p className={styles.paragraph}>
              {/* <span className={styles.bulletPoint}>•</span> */}
              If you are a lawyer or legal expert, your skills can directly help those in need by providing representation, legal counsel, or research support.
            </p>
          </li>
          <li>
            <span className={styles.number}>2.</span>
            <strong>Community Outreach:</strong>
            <p className={styles.paragraph}>
              {/* <span className={styles.bulletPoint}>•</span> */}
              Assist FLASH in spreading awareness about legal rights and the services we provide through workshops, seminars, and public events.
            </p>
          </li>
          <li>
            <span className={styles.number}>3.</span>
            <strong>Administrative Support:</strong>
            <p className={styles.paragraph}>
              {/* <span className={styles.bulletPoint}>•</span> */}
              Help us organize our operations by contributing to case management, documentation, and other vital administrative tasks.
            </p>
          </li>
          <li>
            <span className={styles.number}>4.</span>
            <strong>Fundraising and Advocacy:</strong>
            <p className={styles.paragraph}>
              {/* <span className={styles.bulletPoint}>•</span> */}
              Join our efforts in raising funds and advocating for a more equitable justice system through events, campaigns, and networking opportunities.
            </p>
          </li>
          <li>
            <span className={styles.number}>5.</span>
            <strong>Skill-Based Volunteering:</strong>
            <p className={styles.paragraph}>
              {/* <span className={styles.bulletPoint}>•</span> */}
              Share your unique expertise, whether it’s graphic design, content creation, IT support, or event planning, to help strengthen FLASH’s initiatives.
            </p>
          </li>
        </ul>

        <h2 className={styles.subtitle}>Become a Member of FLASH</h2>
        <p className={styles.description}>
          Membership with FLASH is an opportunity to be part of a committed community working to restore justice and fairness for the helpless. Members have a direct role in shaping the future of the Society, contributing ideas, and helping sustain our mission.
        </p>

        <h2 className={styles.subtitle}>Join as a Friend of FLASH</h2>
        <p className={styles.description}>
          For those who wish to support our cause without formal membership, becoming a Friend of FLASH is a meaningful way to stay involved. Friends of FLASH contribute their time, skills, or resources in ways that align with their interests and availability.
          <br />
          <br />
          <strong>
            Together, as Members and Friends of FLASH, we can build a stronger foundation for justice and equality.
          </strong>
        </p>

        <h2 className={styles.subtitle}>Take the Next Step</h2>
        <div className={styles.downloadSection}>
          {loading ? (
            <p className={styles.loading}>Loading forms...</p>
          ) : error ? (
            <p className={styles.error}>Error loading forms. Please try again later.</p>
          ) : (
            <ul className={styles.linkList}>
              {membershipForm && (
                <li>
                  <Image
                    src="/images/pdf.png"
                    alt="PDF Icon"
                    width={20}
                    height={20}
                    className={styles.pdfIcon}
                  />
                  <a
                    href={membershipForm.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    Click Here to Download Membership Form
                  </a>
                </li>
              )}
              {friendsForm && (
                <li>
                  <Image
                    src="/images/pdf.png"
                    alt="PDF Icon"
                    width={20}
                    height={20}
                    className={styles.pdfIcon}
                  />
                  <a
                    href={friendsForm.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    Click Here to Download Friends of FLASH Form
                  </a>
                </li>
              )}
            </ul>
          )}
        </div>
      </Card>
    </main>
  );
};

export default GetInvolvedPage;