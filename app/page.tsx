'use client';


import React, { useState, useEffect } from "react";
import Image from "next/image";
import BasicCard from "@/components/ui/BasicCard";
import DonateButton from "@/components/ui/DonateButton";
import JoinUSButton from "@/components/ui/JoinUsButton";
import NavigationCard from "@/components/ui/NavigationCard";
import { useSupabase } from "@/hooks/useSupabase";
import { TABLES } from "@/lib/supabase";
import "../styles/home.css";
import Link from "next/link";
import ContactForm from '@/components/forms/ContactForm'; // Import the ContactForm component


interface SuccessStory {
  id: string;
  name: string;
  circumstances: string;
  engaged_on: string;
  released_on: string | null;
  avatar_url: string;
}

export default function HomePage() {
  const { data: successStories, fetchData } = useSupabase<SuccessStory>(TABLES.SUCCESS_STORIES);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const nextStory = () => {
    setCurrentIndex((prev) => (prev + 1) % successStories.length);
  };

  const prevStory = () => {
    setCurrentIndex((prev) => (prev - 1 + successStories.length) % successStories.length);
  };
  return (
    <main className="page">
      {/* Hero Section */}
      <div className="heroImage">
        <div className="heroContent">
          <h1 className="headline">BUILDING A JUST SOCIETY</h1>
          <h2 className="subHeadline">WHERE JUSTICE IS A RIGHT,<br/> NOT A PRIVILEGE.</h2>
          <div className="actionButtons">
          <Link href="/donate">
            <DonateButton/>
            </Link>
            <Link href="/get-involved">
            <JoinUSButton /> 
          </Link>
          </div>
        </div>
        <Image
          src="/images/middle-aged-man-spending-time-jail.jpg" // Replace with your hero image
          alt="Hero Image"
          width={1920}
          height={700}
          style={{ objectFit: 'cover' }} // Replace objectFit with style
        />
      </div>

      {/* BasicCard Section */}
      <BasicCard className="cardContainer">
        <div className="cardContent">
          <div className="centralImage">
            <Image
              src="/images/champion of justice.png" // Replace with your central image
              alt="Champion of Justice"
              width={200} // Adjust size as needed
              height={200}
              style={{ objectFit: 'contain' }} // Replace objectFit with style
            />
          </div>
          <h2 className="tagline">Championing Justice for the Helpless Since 2005</h2>
          <p className="description">
            Since 2005, the Free Legal Aid Society for the Helpless (FLASH) has been a beacon of
            hope for the destitute in need of justice. Dedicated to providing free legal aid to
            prisoners and individuals unable to afford or access fair trials, FLASH has secured
            freedom and dignity for many lives. Through our unwavering commitment to justice, we aim
            to build a fairer society where every individual’s right to a fair trial is upheld,
            regardless of their circumstances. <a href="/mission">Learn more</a>.
          </p>
        </div>
      </BasicCard>

      {/* Navigation Cards Section */}
      <section className="navigationCards">
        <div className="navigationCardWrapper">
          <NavigationCard
            imageSrc="/images/prisoners.png"
            title="THE ISSUE"
            description="The justice system in Pakistan often denies the poor and marginalized fair trials due to lack of legal access and representation."
            buttonText="LEARN MORE"
            route="/mission"
          />
          <NavigationCard
            imageSrc="/images/LHC.jpg"
            title="OUR WORK"
            description="We provide free legal aid and representation to the helpless, ensuring their right to justice and fair trials is upheld."
            buttonText="HERE'S HOW"
            route="/services"
          />
          <NavigationCard
            imageSrc="/images/free from prison.webp"
            title="OUR IMPACT"
            description="Our efforts have secured freedom for many helpless prisoners, restoring hope and dignity to their lives and families."
            buttonText="READ ON"
            route="/impact"
          />
        </div>
      </section>

      <section className="imageOverlaySection">
        <div className="imageWrapper">
          <Image
            src="/images/portrait-indian-man.jpg" // Replace with your image
            alt="Community Impact"
            width={1920}
            height={700}
            style={{ objectFit: 'cover' }}
          />
          <div className="overlayContent">
            <h2 className="subHeadline">
              Make a difference today and join our community of impactful lifesavers
            </h2>
            <div className="actionButtons">
            <Link href="/donate">
            <DonateButton/>
            </Link>
            <Link href="/get-involved">
            <JoinUSButton /> 
            </Link>
            </div>
          </div>
        </div>
      </section>
            {/* Success Stories Section */}
            <section className="successStoriesSection">
        <h2 className="successStoriesTitle">Our Success Stories</h2>
        <div className="successStoriesContent">
          <p className="successStoriesParagraph">
            These are the names of few of the many prisoners acquitted and released due to the tireless 
            advocacy of the lawyers we engage. Additionally, dozens have had their sentences significantly 
            reduced, including commutations from the death penalty to life imprisonment or shorter terms. 
            While some appeals are dismissed each year, our commitment remains unwavering. In recent years, 
            FLASH has also extended its support to women in need, successfully handling cases involving 
            divorce, alimony, and guardianship.<br /> <br />All legal aid provided by FLASH is entirely free of charge, 
            ensuring justice is accessible to all, regardless of their financial circumstances.
          </p>
          <div className="successStoriesContainer">
            <button className="scrollButton left" onClick={prevStory}>◀</button>
            {successStories.length > 0 && (
              <div className="successStoryCard">
                <Image
                  src="/images/rb_3276.png" // Static image for all success stories
                  alt={successStories[currentIndex].name}
                  width={100}
                  height={100}
                  className="successStoryAvatar"
                />
                <div className="successStoryDetails">
                  <h3 className="successStoryName">{successStories[currentIndex].name}</h3>
                  <p className="successStoryCircumstances">{successStories[currentIndex].circumstances}</p>
                  <p className="successStoryEngaged">Engaged FLASH on {successStories[currentIndex].engaged_on}</p>
                  {successStories[currentIndex].released_on && (
                    <p className="successStoryReleased">Released on {successStories[currentIndex].released_on}</p>
                  )}
                </div>
              </div>
            )}
            <button className="scrollButton right" onClick={nextStory}>▶</button>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contactFormSection">
        <ContactForm />
      </section>
    </main>
  );
}