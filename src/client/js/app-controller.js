import { postData, handleErrorAndReject } from './utils';

const polarityByScoreTag = {
  'P+': 'strong positive',
  P: 'positive',
  NEU: 'neutral',
  N: 'negative',
  'N+': 'strong negative',
  NONE: 'without polarity',
};

const transformAnalyseData = ({ agreement, confidence, score_tag: scoreTag, subjectivity }) => ({
  agreement,
  confidence,
  polarity: polarityByScoreTag[scoreTag],
  subjectivity,
});

const parseAnalyseData = (response) =>
  new Promise((resolve, reject) => {
    if (!response.success) {
      reject(new Error(response.message));
    }
    resolve(transformAnalyseData(response.results));
  });

export const analyse = (url) =>
  postData('/api/analyse', { url }).then(parseAnalyseData).catch(handleErrorAndReject);
