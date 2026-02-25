import 'survey-core/survey-core.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { push, ref } from 'firebase/database';  
import { database } from '../firebase.js'; 
import "../index.css" 

// interest form items
const surveyJson = 
{
  "title": "Interest Form",
  "description": "Fill out your interests and start matching!",
  "pages": [
    {
      "name": "Questions",
      "elements": [
        {
          "type": "tagbox",
          "name": "question1",
          "title": "What are some key aspect you are looking for in a school?\n",
          "choices": [
            {
              "value": "Strong mission",
              "text": "Strong mission"
            },
            {
              "value": "Friendly staff",
              "text": "Friendly staff"
            },
            {
              "value": "Flexible worktime",
              "text": "Flexible worktime"
            },
            {
              "value": "Community service",
              "text": "Community service"
            },
            {
              "value": "Fun students",
              "text": "Fun students"
            }
          ]
        },
        {
          "type": "tagbox",
          "name": "question2",
          "title": "What is your highest level of education?\n",
          "choices": [
            {
              "value": "Middle School",
              "text": "Middle School"
            },
            {
              "value": "High school",
              "text": "High school"
            },
            {
              "value": "Beyond high school",
              "text": "Beyond high school"
            },
            {
              "value": "College/University",
              "text": "College/University"
            },
            {
              "value": "Masters",
              "text": "Masters"
            },
            {
              "value": "PhD",
              "text": "PhD"
            }
          ]
        }
      ]
    }
  ],
  "headerView": "advanced"
};

export default function InterestForm() {
  const navigate = useNavigate(); // navigate for directing to match
  const [surveyCompleted, setSurveyCompleted] = useState(false);

  const survey = new Model(surveyJson);
  // applying custom theme to survey
  survey.applyTheme({
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
        "--sjs-font-family": "Open Sans",
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
  }  
  );

  // TODO: using local storage for now --> task: update after authentication is implemented
  const handleSurveyComplete = useCallback((survey) => {
      push(ref(database, 'surveyResults'), survey.data)
        .then(() => {
          console.log('Survey results added to Firebase successfully!');
          //local storage of survey data for later use in matching page
          localStorage.setItem('userSurveyData', JSON.stringify(survey.data));
          setSurveyCompleted(true);
        })
        .catch((error) => {
          console.error('Error adding survey results to Firebase:', error);
          alert('There was an error saving your results. Please try again.');
        });
    }, []);

    survey.onComplete.add(handleSurveyComplete);
    survey.showCompletedPage = false;

  // handling aftermath of completing the survey
  if (surveyCompleted) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f5d3e0', minHeight: '100vh' }}>
        <h2>Thank you for completing the survey!</h2>
        <button onClick={() => navigate('/match')} className="finish-button">
          See Results
        </button>
      </div>
    );
  }

  return <Survey model={survey} />;
}