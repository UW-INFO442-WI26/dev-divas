import 'survey-core/survey-core.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { useCallback } from 'react';
import { db } from '../firebase.js';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../AuthContext.jsx';

const surveyJson = {
  "title": "Volunteer Profile & Qualifications",
  "description": "Complete your volunteer profile so schools can learn more about you. All information is kept confidential.",
  "pages": [
    {
      "name": "page1",
      "title": "Personal Information",
      "elements": [
        { "type": "text", "name": "question1", "title": "First Name", "isRequired": true },
        { "type": "text", "name": "question2", "title": "Last Name", "isRequired": true },
        { "type": "text", "name": "question6", "title": "Date of Birth", "inputType": "date", "isRequired": true }
      ]
    },
    {
      "name": "page2",
      "title": "Identity Verification",
      "elements": [
        {
          "type": "file",
          "name": "question5",
          "title": "Upload an ID image (Passport, ID Card, Driver's License, etc.)",
          "description": "This is used to verify your identity for the safety of students. Your document is stored securely."
        }
      ]
    },
    {
      "name": "page3",
      "title": "Address & Commute",
      "elements": [
        { "type": "text", "name": "question9", "title": "Street Address" },
        { "type": "text", "name": "question8", "title": "City" },
        { "type": "text", "name": "question10", "title": "State" },
        { "type": "text", "name": "question11", "title": "Zip Code" },
        { "type": "text", "name": "question12", "title": "Country" },
        {
          "type": "slider",
          "name": "question7",
          "title": "How far are you willing to commute? (miles)",
          "description": "You can change this later in your profile settings.",
          "customLabels": [0, 20, 40, 60, 80, { "value": 100, "text": "100+" }]
        }
      ]
    },
    {
      "name": "page4",
      "title": "Background Check",
      "elements": [
        {
          "type": "text",
          "name": "question4",
          "title": "Have you ever been convicted of a felony?",
          "description": "This information is required for volunteer safety screening."
        }
      ]
    }
  ],
  "headerView": "advanced"
};

const surveyTheme = {
  "themeName": "contrast",
  "colorPalette": "light",
  "isPanelless": false,
  "backgroundImage": "",
  "backgroundImageFit": "cover",
  "backgroundImageAttachment": "scroll",
  "backgroundOpacity": 1,
  "cssVariables": {
    "--sjs-editorpanel-backcolor": "rgba(245, 211, 224, 1)",
    "--sjs-editorpanel-hovercolor": "rgba(246, 212, 223, 1)",
    "--sjs-questionpanel-hovercolor": "rgba(245, 211, 224, 1)",
    "--sjs-font-family": "'Inter', system-ui, sans-serif",
    "--sjs-font-size": "16px",
    "--sjs-corner-radius": "4px",
    "--sjs-base-unit": "8px",
    "--sjs-shadow-small": "0px 0px 0px 2px rgba(0, 0, 0, 1)",
    "--sjs-shadow-inner": "0px 0px 0px 2px rgba(0, 0, 0, 1),0px -2px 0px 2px rgba(0, 0, 0, 1)",
    "--sjs-border-default": "rgba(0, 0, 0, 1)",
    "--sjs-border-light": "rgba(0, 0, 0, 0.2)",
    "--sjs-general-backcolor": "rgba(255, 255, 255, 1)",
    "--sjs-general-backcolor-dark": "rgba(255, 216, 77, 1)",
    "--sjs-general-backcolor-dim-light": "rgba(255, 216, 77, 1)",
    "--sjs-general-backcolor-dim-dark": "rgba(255, 216, 77, 1)",
    "--sjs-general-forecolor": "rgba(0, 0, 0, 1)",
    "--sjs-general-forecolor-light": "rgba(0, 0, 0, 1)",
    "--sjs-general-dim-forecolor": "rgba(0, 0, 0, 1)",
    "--sjs-general-dim-forecolor-light": "rgba(0, 0, 0, 1)",
    "--sjs-secondary-backcolor": "rgba(255, 152, 20, 1)",
    "--sjs-secondary-backcolor-light": "rgba(255, 152, 20, 0.1)",
    "--sjs-secondary-backcolor-semi-light": "rgba(255, 152, 20, 0.25)",
    "--sjs-secondary-forecolor": "rgba(255, 255, 255, 1)",
    "--sjs-secondary-forecolor-light": "rgba(255, 255, 255, 0.25)",
    "--sjs-shadow-small-reset": "0px 0px 0px 0px rgba(0, 0, 0, 1)",
    "--sjs-shadow-medium": "0px 0px 0px 2px rgba(0, 0, 0, 1)",
    "--sjs-shadow-large": "0px 6px 0px 0px rgba(0, 0, 0, 1)",
    "--sjs-shadow-inner-reset": "0px 0px 0px 0px rgba(0, 0, 0, 1),0px 0px 0px 0px rgba(0, 0, 0, 1)",
    "--sjs-border-inside": "rgba(0, 0, 0, 0.16)",
    "--sjs-special-red-forecolor": "rgba(255, 255, 255, 1)",
    "--sjs-special-green": "rgba(25, 179, 148, 1)",
    "--sjs-special-green-light": "rgba(25, 179, 148, 0.1)",
    "--sjs-special-green-forecolor": "rgba(255, 255, 255, 1)",
    "--sjs-special-blue": "rgba(67, 127, 217, 1)",
    "--sjs-special-blue-light": "rgba(67, 127, 217, 0.1)",
    "--sjs-special-blue-forecolor": "rgba(255, 255, 255, 1)",
    "--sjs-special-yellow": "rgba(255, 152, 20, 1)",
    "--sjs-special-yellow-light": "rgba(255, 152, 20, 0.1)",
    "--sjs-special-yellow-forecolor": "rgba(255, 255, 255, 1)",
    "--sjs-article-font-xx-large-textDecoration": "none",
    "--sjs-article-font-xx-large-fontWeight": "700",
    "--sjs-article-font-xx-large-fontStyle": "normal",
    "--sjs-article-font-xx-large-fontStretch": "normal",
    "--sjs-article-font-xx-large-letterSpacing": "0",
    "--sjs-article-font-xx-large-lineHeight": "64px",
    "--sjs-article-font-xx-large-paragraphIndent": "0px",
    "--sjs-article-font-xx-large-textCase": "none",
    "--sjs-article-font-x-large-textDecoration": "none",
    "--sjs-article-font-x-large-fontWeight": "700",
    "--sjs-article-font-x-large-fontStyle": "normal",
    "--sjs-article-font-x-large-fontStretch": "normal",
    "--sjs-article-font-x-large-letterSpacing": "0",
    "--sjs-article-font-x-large-lineHeight": "56px",
    "--sjs-article-font-x-large-paragraphIndent": "0px",
    "--sjs-article-font-x-large-textCase": "none",
    "--sjs-article-font-large-textDecoration": "none",
    "--sjs-article-font-large-fontWeight": "700",
    "--sjs-article-font-large-fontStyle": "normal",
    "--sjs-article-font-large-fontStretch": "normal",
    "--sjs-article-font-large-letterSpacing": "0",
    "--sjs-article-font-large-lineHeight": "40px",
    "--sjs-article-font-large-paragraphIndent": "0px",
    "--sjs-article-font-large-textCase": "none",
    "--sjs-article-font-medium-textDecoration": "none",
    "--sjs-article-font-medium-fontWeight": "700",
    "--sjs-article-font-medium-fontStyle": "normal",
    "--sjs-article-font-medium-fontStretch": "normal",
    "--sjs-article-font-medium-letterSpacing": "0",
    "--sjs-article-font-medium-lineHeight": "32px",
    "--sjs-article-font-medium-paragraphIndent": "0px",
    "--sjs-article-font-medium-textCase": "none",
    "--sjs-article-font-default-textDecoration": "none",
    "--sjs-article-font-default-fontWeight": "400",
    "--sjs-article-font-default-fontStyle": "normal",
    "--sjs-article-font-default-fontStretch": "normal",
    "--sjs-article-font-default-letterSpacing": "0",
    "--sjs-article-font-default-lineHeight": "28px",
    "--sjs-article-font-default-paragraphIndent": "0px",
    "--sjs-article-font-default-textCase": "none",
    "--sjs-general-backcolor-dim": "#f5d3e0",
    "--sjs-primary-backcolor": "rgba(0, 0, 0, 1)",
    "--sjs-primary-backcolor-dark": "rgba(83, 83, 83, 1)",
    "--sjs-primary-backcolor-light": "rgba(245, 211, 224, 1)",
    "--sjs-primary-forecolor": "rgba(255, 255, 255, 1)",
    "--sjs-primary-forecolor-light": "rgba(255, 255, 255, 0.25)",
    "--sjs-special-red": "rgba(156, 2, 39, 1)",
    "--sjs-special-red-light": "rgba(229, 10, 62, 0.1)",
    "--sjs-header-backcolor": "rgba(245, 211, 224, 1)"
  },
  "header": {
    "height": 0,
    "mobileHeight": 0,
    "inheritWidthFrom": "survey",
    "textAreaWidth": 0,
    "backgroundImageFit": "cover",
    "backgroundImageOpacity": 100,
    "overlapEnabled": false,
    "logoPositionX": "left",
    "logoPositionY": "top",
    "titlePositionX": "left",
    "titlePositionY": "bottom",
    "descriptionPositionX": "left",
    "descriptionPositionY": "bottom"
  },
  "headerView": "advanced"
};

export default function Qualifications() {
  const survey = new Model(surveyJson);
  survey.applyTheme(surveyTheme);

  const { user } = useAuth();

  const alertResults = useCallback(
    async (survey) => {
      const results = JSON.stringify(survey.data);
      alert(results);

      if (user) {
        try {
          const volunteerRef = doc(db, 'volunteers', user.uid);
          await setDoc(
            volunteerRef,
            { profile: survey.data },
            { merge: true }
          );
        } catch (error) {
          console.error('Error saving profile:', error);
        }
      }
    },
    [user]
  );

  survey.onComplete.add(alertResults);

  return (
    <main className="pt-16 min-h-screen bg-purple-50/30">
      <div className="max-w-3xl mx-auto px-6 py-8 space-y-4">
        <p className="text-sm text-gray-500">
          This page is a prototype of the volunteer profile editor. Your answers are shown in an
          alert when you finish and are not yet stored against a real account. In a full version,
          these details would be saved securely to your volunteer profile.
        </p>
        <Survey model={survey} />
      </div>
    </main>
  );
}
