module.exports = {
  presets: ['babel-preset-gatsby'],
  plugins: [
    [
      'i18next-extract',
      {
        nsSeparator: ':',
        locales: ['it', 'en'],
        keyAsDefaultValue: ['it'],
        useI18nextDefaultValue: ['it'],
        discardOldKeys: false,
        outputPath: 'locales/{{locale}}/{{ns}}.json',
        customTransComponents: [['gatsby-plugin-react-i18next', 'Trans']],
        customUseTranslationHooks: [['gatsby-plugin-react-i18next', 'useTranslation']],
      },
    ],
  ],
};
