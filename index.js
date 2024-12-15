// langModule.js
const langdata = require('./data');

const languages = {
    'fr': 'French',
    'en': 'English',
    'es': 'Spanish',
    'de': 'German',
    'it': 'Italian',
    'pt': 'Portuguese'
};

const formatNumber = (num, langCode) => {
    return new Intl.NumberFormat(langCode).format(num);
};

const detectLang = (sentence) => {
    if (!sentence || typeof sentence !== 'string') {
        return 'Invalid input. Please provide a valid sentence.';
    }

    const words = sentence.toLowerCase().split(/\W+/);
    const score = {};

    for (const [key, keywords] of Object.entries(langdata)) {
        const keywordSet = new Set(keywords.map(keyword => keyword.toLowerCase()));
        score[key] = words.filter(word => keywordSet.has(word)).length;
    }

    const maxScore = Math.max(...Object.values(score));
    if (maxScore === 0) {
        return 'Unable to detect language. No matches found.';
    }

    const detectedLanguages = Object.keys(score).filter(key => score[key] === maxScore);
    const detectedLangCode = detectedLanguages[0];
    return { language: languages[detectedLangCode], langCode: detectedLangCode };
};

// Exporting the functions and constants
module.exports = {
    formatNumber,
    detectLang,
    languages
};
