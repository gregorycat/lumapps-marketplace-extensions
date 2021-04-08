/**
 *  Create-LumApps-Widget config file
 *  update the following to fit your needs
 */

export const useGlobalSettings = true;

/**
 * The ids of your provider and extension
 */
const providerId = '';
const extensionId = '';

const description = {
    en: 'SampleWidgetTypescript',
};

const name = {
    en: 'Currency Exchange Rate',
};

const icon = {
    en: 'https://c1.klipartz.com/pngpicture/680/286/sticker-png-money-logo-exchange-rate-currency-payment-finance-currency-converter-bank-bureau-de-change.png', // a working link to your widget icon
};

/**
 * Whether the extension requires an oauth application
 */
const oauth = false;

/**
 * The documentation's url of the enxtension.
 */
const links = {
    documentation: '',
}

/**
 * The components available for your extensions
 * 'content' : For the Widget content itself (required)
 * 'settings' : For your widget settings
 * 'globalSettings' : For globalsettings used by platform admin.
 */
const components = ['content', 'settings', 'global_settings'];

// Whether the extension is public or not in the marketplace.
const isPublic = true;

/**
 * The list of authorized customer ids.
 *
 * If your extension is not public only these customers will see and
 * will be able to install this extensions.
 */
const whitelist = [];

// do not change the following unless you know what you are doing
const config = {
    providerId,
    extensionId,
    name,
    description,
    icon,
    oauth,
    links,
    components,
    isPublic,
    public: isPublic,
    whitelist,
    category: 'widget',
};

if (!useGlobalSettings) {
    config.components.pop();
}

export default config;
