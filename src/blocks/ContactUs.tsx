import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import TheSeparator from '../components/TheSeparator';
import HeaderMessage from '../components/HeaderMessage';

import styles from './ContactUs.module.scss';

import images from './../data/images';

import strings from './../data/strings.json';

import { sendEmailToOasis } from '../services/emails';

import { addEmailToList } from '../functions/firebase';

const ContactUs = () => {
  const [emailSucces, setEmailSucces] = useState<boolean>(true);
  const [showEmailBox, setShowEmailBox] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [showNameError, setShowNameError] = useState<boolean>(false);
  const [showEmailError, setShowEmailError] = useState<boolean>(false);
  const [showMessageError, setShowMessageError] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(true);
  const [newsChecked, setNewsChecked] = useState<boolean>(false);
  const [pressed, setPressed] = useState<boolean>(false);

  const validateEmail = (email: string) => {
    return email.match(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g);
  };

  const validateFields = () => {
    if (name === '') {
      setShowNameError(true);
    } else setShowNameError(false);
    if (!validateEmail(email) || email === '') {
      setShowEmailError(true);
    } else setShowEmailError(false);
    if (message === '') {
      setShowMessageError(true);
    } else setShowMessageError(false);
  };
  useEffect(() => {
    if (pressed) {
      if (showNameError || showEmailError || showMessageError) setError(true);
      if (!showNameError && !showEmailError && !showMessageError) setError(false);
    }
  }, [showNameError, showEmailError, showMessageError, pressed]);

  const validateAndSend = async () => {
    if (name && email && message && !error) {
      if ((await sendEmailToOasis(name, email, message)) === true) {
        setName('');
        setEmail('');
        setMessage('');
        setEmailSucces(true);
        setShowEmailBox(true);
        setError(true);
        setPressed(false);
        if (newsChecked) addEmailToList(email);
      } else {
        {
          setName('');
          setEmail('');
          setMessage('');
          setEmailSucces(false);
          setShowEmailBox(true);
          setError(true);
          setPressed(false);
        }
      }
    }
  };

  useEffect(() => {
    validateAndSend();
  }, [error]);

  return (
    <>
      <TheSeparator anchorID="contactus" />
      <div className={styles.headContainer}>
        <HeaderMessage headTitle={strings.contactUs.headerTitle} headDescription={strings.contactUs.smallDescription} />
        {showEmailBox ? (
          <div className={styles.emailResponseBoxBackground}>
            <div className={styles.emailResponseBox}>
              <img src={images.contactUs.emailBoxIcon} />
              <div>
                <div className={styles.emailBoxText}>
                  {emailSucces ? strings.contactUs.email.emailSucces : strings.contactUs.email.emailFail}
                </div>
                <div className={styles.emailBoxText}>
                  {emailSucces ? strings.contactUs.email.emailSuccesResp : strings.contactUs.email.emailFailResp}
                </div>
              </div>
              <button className={styles.newsButton} onClick={() => setShowEmailBox(false)}>
                <span className={styles.emailBoxClose}>{strings.contactUs.email.close}</span>
              </button>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        <div className={styles.innerContainer}>
          <div className={styles.forceExtend}>
            <div className={styles.newsletterContainerLarge}>
              <h3 className={styles.newsText}>{strings.contactUs.content.newsletterBox.name}</h3>
              <div className={styles.containerPadder}>
                <input
                  placeholder={strings.contactUs.content.newsletterBox.placeholderName}
                  type={showNameError ? 'textError' : 'text'}
                  value={name}
                  onChange={(text) => setName(text.target.value)}
                />
                <input
                  placeholder={strings.contactUs.content.newsletterBox.placeholderEmail}
                  type={showEmailError ? 'textError' : 'text'}
                  value={email}
                  onChange={(text) => setEmail(text.target.value)}
                />
                <span className={styles.fieldsText}>{strings.contactUs.content.newsletterBox.otherDetails}</span>
                <textarea
                  rows={5}
                  type={showMessageError ? 'detailsContainerError' : 'detailsContainer'}
                  value={message}
                  onChange={(text) => setMessage(text.target.value)}
                />
              </div>
              <div className={styles.newsAction}>
                <label className={`${styles.control}  ${styles.controlcheckbox} `}>
                  <span className={styles.checkBoxText}> {strings.contactUs.content.newsletterBox.radioButton} </span>
                  <input type="checkbox" className={styles.checked} onClick={() => setNewsChecked((prevState) => !prevState)} />
                  <div className={styles.control_indicator}></div>
                </label>

                <button className={styles.newsButton} onClick={() => (validateFields(), setPressed(true))}>
                  {strings.contactUs.content.newsletterBox.buttonSend}
                </button>
              </div>
            </div>
            <div className={styles.containerContactLarge}>
              <div className={styles.spacerInfo}>
                <img
                  className={styles.iconContact}
                  src={images.contactUs.callerIcon}
                  onClick={() => (window.location = 'tel:+40 747 057 615')}
                />
                <span className={styles.contactText}>{strings.contactUs.content.telephone}</span>
              </div>
              <div className={styles.spacerInfo}>
                <img
                  className={styles.iconContact}
                  src={images.contactUs.emailIcon}
                  onClick={() => (window.location = 'mailto:contact@oasisresidence.co')}
                />
                <span className={styles.contactText}>{strings.contactUs.content.email}</span>
              </div>
              <div className={styles.spacerInfo}>
                <img
                  className={styles.iconContact}
                  src={images.contactUs.mapIcon}
                  onClick={() => window.open(strings.contactUs.mapsUrl, '_blank', 'noopener,noreferrer')}
                />
                <span className={styles.contactText}>{strings.contactUs.content.address}</span>
              </div>
            </div>
          </div>
          <div className={styles.forceExtenderReversed}>
            <div className={styles.newsletterContainer}>
              <div className={styles.containerPadder}>
                <div>
                  <span className={styles.newsText}>{strings.contactUs.content.newsletterBox.name}</span>
                </div>

                <input
                  placeholder={strings.contactUs.content.newsletterBox.placeholderName}
                  type={showNameError ? 'textError' : 'text'}
                  value={name}
                  onChange={(text) => setName(text.target.value)}
                />
                <input
                  placeholder={strings.contactUs.content.newsletterBox.placeholderEmail}
                  type={showEmailError ? 'textError' : 'text'}
                  value={email}
                  onChange={(text) => setEmail(text.target.value)}
                />

                <div>
                  <span className={styles.fieldsText}>{strings.contactUs.content.newsletterBox.otherDetails}</span>
                  <textarea
                    type={showMessageError ? 'detailsContainerError' : 'detailsContainer'}
                    value={message}
                    onChange={(text) => setMessage(text.target.value)}
                  />
                </div>
              </div>
              <div className={styles.newsAction}>
                <label className={`${styles.control}  ${styles.controlcheckbox} `}>
                  <span className={styles.checkBoxText}> {strings.contactUs.content.newsletterBox.radioButton} </span>
                  <input type="checkbox" className={styles.checked} onClick={() => setNewsChecked((prevState) => !prevState)} />
                  <div className={styles.control_indicator}></div>
                </label>
                <button className={styles.newsButton} onClick={() => (validateFields(), setPressed(true))}>
                  {strings.contactUs.content.newsletterBox.buttonSend}
                </button>
              </div>
            </div>
            <div className={styles.mapContainer}>
              <img className={styles.mapImage} src={images.contactUs.mapLocation} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
