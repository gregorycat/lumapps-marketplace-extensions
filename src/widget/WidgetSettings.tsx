/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Slider, Switch, TextField } from '@lumx/react';

import { Lumapps } from 'lumapps-sdk-js';

import { FormattedMessage, IntlProvider, useIntl } from '@lumapps-extensions-playground/translations';
import { PredefinedErrorBoundary, useDebounce, useExportProps } from '@lumapps-extensions-playground/common';

import messagesEn from '../translations/en.json';
import messagesFr from '../translations/fr.json';

interface WithIntlSettingsProps {
    properties?: any;
    exportProp: any;
}

const WithIntlSettings: React.FC<WithIntlSettingsProps> = ({ properties = {}, exportProp }) => {
    const [baseCurrency, setBaseCurrency] = useState(properties.baseCurrency);
    const debouncedBaseCurrency = useDebounce(baseCurrency, 800);

    useExportProps(debouncedBaseCurrency, 'baseCurrency', properties, exportProp);

    return (
        <>
            <TextField
                className="mt0 ml lumx-spacing-margin-vertical-big"
                label={(<FormattedMessage id="settings.base_currency" />) as any}
                value={baseCurrency}
                onChange={setBaseCurrency}
            />
        </>
    );
};

const WidgetSettings = ({ properties = {}, exportProp = undefined }) => {
    const messages: any = {
        en: messagesEn,
        fr: messagesFr,
    };

    const [lang, setLang] = useState<string>('en');
    useEffect(() => {
        const getContext = async () => {
            const lumapps = new Lumapps();
            const { userLang: userLangPromise } = lumapps.context;

            const userLang = await userLangPromise;
            if (Object.keys(messages).includes(userLang)) {
                setLang(userLang);
            }
        };
        getContext();
    }, []);

    return (
        <PredefinedErrorBoundary lang={lang}>
            <IntlProvider locale={lang} messages={messages[lang]}>
                <WithIntlSettings properties={properties} exportProp={exportProp} />
            </IntlProvider>
        </PredefinedErrorBoundary>
    );
};

export default WidgetSettings;
