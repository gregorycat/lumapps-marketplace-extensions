/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Lumapps, useCurrentUser } from 'lumapps-sdk-js';
import toLower from 'lodash/toLower';
import round from 'lodash/round';
import classNames from 'classnames';

import {
    Alignment,
    Orientation,
    Size,
    Theme,
    UserBlock,
    Toolbar,
    FlexBox,
    Table,
    TableBody,
    TableCell,
    TableCellVariant,
    TableHeader,
    TableHeaderProps,
    TableRow,
    Avatar,
} from '@lumx/react';

import { IntlProvider, FormattedMessage } from '@lumapps-extensions-playground/translations';
import { PredefinedErrorBoundary } from '@lumapps-extensions-playground/common';
import { getCurrencyRates } from '../api';

import messagesEn from '../translations/en.json';
import messagesFr from '../translations/fr.json';

import defaultGlobalSettings from './defaultGlobalSettings';

interface WidgetProps {
    value: any;
    globalValue: any;
    theme: Theme;
}

const tableHeader: Array<Partial<TableHeaderProps>> = [
    {
        label: 'Currency',
        name: 'currency',
    },
    {
        label: 'Amount',
        name: 'amount',
        width: '100',
    },
];

const Widget = ({ value = {}, globalValue = {}, theme = Theme.light }: WidgetProps): React.ReactElement => {
    const { baseCurrency } = value;
    const { availableSymbols = defaultGlobalSettings.defaultSymbols } = globalValue;
    const { fullName, email, thumbnailPhotoUrl } = useCurrentUser();
    const [curRate, setCurRate] = useState<any>();

    const loadRate = async () => {
        const currencyRate = await getCurrencyRates(baseCurrency, availableSymbols);
        setCurRate(currencyRate);
    };

    useEffect(() => {
        loadRate();
    }, [baseCurrency, availableSymbols]);

    return (
        <div className="widget-picsum">
            <Toolbar
                label={
                    <span
                        className={classNames(
                            'lumx-typography-title',
                            theme === 'light' ? 'lumx-color-font-dark-N' : 'lumx-color-font-light-N',
                        )}
                    >
                        <FormattedMessage id="title" />
                    </span>
                }
                after={
                    <UserBlock
                        theme={theme}
                        name={fullName}
                        fields={[email]}
                        avatarProps={{ image: thumbnailPhotoUrl, alt: 'Avatar' }}
                        size={Size.m}
                    />
                }
            />

            <div className="lumx-spacing-padding-huge text-center">
                {!baseCurrency && !curRate && (
                    <FlexBox vAlign="center" fillSpace>
                        <span
                            className={classNames(
                                theme === 'light' ? 'lumx-color-font-dark-N' : 'lumx-color-font-light-N',
                            )}
                        >
                            <FormattedMessage id="no_base_currency" />
                        </span>
                    </FlexBox>
                )}

                {baseCurrency && curRate && (
                    <div className="lumx-spacing-margin-huge">
                        <Table hasDividers theme={theme}>
                            <TableHeader>
                                <TableRow>
                                    {tableHeader.map((header) => (
                                        <TableCell
                                            key={header.name}
                                            icon={header.icon}
                                            isSortable={header.isSortable}
                                            variant={TableCellVariant.head}
                                            width={header.width}
                                        >
                                            <FormattedMessage id={header.name} />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow
                                    style={
                                        theme === 'light'
                                            ? { backgroundColor: '#0A146E', color: 'white' }
                                            : { backgroundColor: 'white' }
                                    }
                                >
                                    <TableCell>
                                        <FlexBox orientation={Orientation.horizontal} hAlign={Alignment.center}>
                                            <Avatar
                                                theme={theme}
                                                image={`https://github.com/transferwise/currency-flags/blob/master/src/flags/${toLower(
                                                    baseCurrency,
                                                )}.png?raw=true`}
                                                alt="S"
                                                size={Size.s}
                                            />
                                            <span
                                                className={classNames(
                                                    'lumx-spacing-margin-left-big lumx-typography-subtitle1',
                                                    theme === 'light'
                                                        ? 'lumx-color-font-light-N'
                                                        : 'lumx-color-font-dark-N',
                                                )}
                                            >
                                                {baseCurrency}
                                            </span>
                                        </FlexBox>
                                    </TableCell>
                                    <TableCell style={{ textAlign: 'center' }}>
                                        <span
                                            className={classNames(
                                                'lumx-typography-subtitle1',
                                                theme === 'light'
                                                    ? 'lumx-color-font-light-N'
                                                    : 'lumx-color-font-dark-N',
                                            )}
                                        >
                                            {1.0}
                                        </span>
                                    </TableCell>
                                </TableRow>
                                {Object.entries(curRate.rates).map(([rate, rateValue]) => {
                                    return (
                                        rate !== baseCurrency && (
                                            <TableRow key={rate}>
                                                <TableCell>
                                                    <FlexBox
                                                        orientation={Orientation.horizontal}
                                                        hAlign={Alignment.center}
                                                    >
                                                        <Avatar
                                                            theme={theme}
                                                            image={`https://github.com/transferwise/currency-flags/blob/master/src/flags/${toLower(
                                                                rate,
                                                            )}.png?raw=true`}
                                                            alt="S"
                                                            size={Size.s}
                                                        />
                                                        <span className="lumx-spacing-margin-left-big lumx-typography-subtitle1">
                                                            {rate}
                                                        </span>
                                                    </FlexBox>
                                                </TableCell>
                                                <TableCell style={{ textAlign: 'center' }}>
                                                    <span className="lumx-typography-subtitle2">
                                                        <b>{round(rateValue as number, 3)}</b>
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
        </div>
    );
};

const NotificationAwareWidget = (props: any) => {
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
            const isLangInTrad = Object.keys(messages).includes(userLang);

            setLang(isLangInTrad ? userLang : 'en');
        };
        getContext();
    }, []);

    return (
        <IntlProvider messages={messages[lang]} locale={lang}>
            <PredefinedErrorBoundary>
                <Widget {...props} />
            </PredefinedErrorBoundary>
        </IntlProvider>
    );
};

export default NotificationAwareWidget;
