import 'survey-core/survey-core.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { push, ref } from 'firebase/database';
import { database, db } from '../firebase.js';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../AuthContext.jsx';

const surveyJson = {
  "title": "Interest Form For School Matching",
  "description": "Select your interests in the following questions so we can match you with schools that align with your values and qualifications.",
  "pages": [
    {
      "name": "Questions",
      "elements": [
        {
          "type": "tagbox",
          "name": "question1",
          "title": "What are some key aspects you are looking for in a school?",
          "description": "Select all values that matter most to you in a volunteer placement.",
          "choices": [
            { "value": "Strong mission", "text": "Strong mission" },
            { "value": "Friendly staff", "text": "Friendly staff" },
            { "value": "Flexible worktime", "text": "Flexible worktime" },
            { "value": "Community service", "text": "Community service" },
            { "value": "Fun students", "text": "Fun students" }
          ]
        },
        {
          "type": "tagbox",
          "name": "question2",
          "title": "What is your highest level of education?",
          "description": "This helps us match you with schools seeking volunteers at your qualification level.",
          "choices": [
            { "value": "Middle school", "text": "Middle school" },
            { "value": "High school", "text": "High school" },
            { "value": "Beyond high school", "text": "Beyond high school" },
            { "value": "College/University", "text": "College/University" },
            { "value": "Masters", "text": "Masters" },
            { "value": "PhD", "text": "PhD" }
          ]
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

export default function InterestForm() {
  const navigate = useNavigate();
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const { user } = useAuth();

  const survey = new Model(surveyJson);
  survey.applyTheme(surveyTheme);

  const handleSurveyComplete = useCallback(
    (survey) => {
      const data = survey.data;

      // Always keep the original demo behavior first
      localStorage.setItem('userSurveyData', JSON.stringify(data));
      setSurveyCompleted(true);

      // Fire-and-forget: best-effort write to Realtime DB (demo analytics)
      try {
        push(ref(database, 'surveyResults'), data).catch((error) => {
          console.error('Error saving survey results to Realtime DB:', error);
        });
      } catch (error) {
        console.error('Error initializing Realtime DB write:', error);
      }

      // If logged in, also persist preferences to the volunteer profile in Firestore
      if (user) {
        try {
          const volunteerRef = doc(db, 'volunteers', user.uid);
          setDoc(
            volunteerRef,
            { preferences: data },
            { merge: true }
          ).catch((error) => {
            console.error('Error saving preferences to Firestore:', error);
          });
        } catch (error) {
          console.error('Error initializing Firestore write:', error);
        }
      }
    },
    [user]
  );

  survey.onComplete.add(handleSurveyComplete);
  survey.showCompletedPage = false;

  if (surveyCompleted) {
    return (
      <main className="pt-16 min-h-screen bg-gradient-to-b from-rose-50 to-white flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-xl bg-white rounded-3xl border border-rose-100 shadow-lg px-8 py-10 text-center"
        >
          <div className="inline-flex items-center justify-center rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
            Step 1 of 2 · Interests saved
          </div>
          <div className="w-16 h-16 mx-auto mt-6 mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Thank you!</h2>
          <p className="mt-3 text-gray-500 text-base max-w-md mx-auto">
            Your interests have been recorded. Next, review your matched schools and decide where
            you&apos;d like to volunteer.
          </p>
          <button
            onClick={() => navigate('/match')}
            className="mt-8 px-10 py-4 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 text-white font-semibold text-lg shadow-lg shadow-rose-200/50 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            aria-label="View your school matches"
          >
            Go to Matches
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="pt-16 min-h-screen bg-rose-50/30">
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-4">
        <div className="text-left">
          <p className="inline-flex items-center rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-rose-700">
            Step 1 · Your interests
          </p>
          <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-gray-900">
            Tell us what you&apos;re looking for
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-xl">
            This short form lets us understand what kind of school environment and education level
            you prefer so we can suggest better matches.
          </p>
        </div>
        <div className="mt-4 bg-white/90 rounded-3xl border border-rose-100 shadow-sm p-4 sm:p-6">
          <Survey model={survey} />
        </div>
      </div>
    </main>
  );
}
