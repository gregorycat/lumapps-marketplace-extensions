import React, { useState } from 'react';
import { TextField } from '@lumx/react';

import { useDebounce, useExportProps } from '@lumapps-extensions-playground/common';

import defaultGlobalSettings from './defaultGlobalSettings';

/**
 * Render the widget Picsum setttings form.
 *
 * @param {Object} props The settings component properties.
 */
const WidgetGlobalSettings = ({ properties = {}, exportProp }: any) => {
    const [availableSymbols, setAvailableSymbols] = useState<string>(
        properties.availableSymbols || defaultGlobalSettings.defaultSymbols,
    );

    const debouncedSymbols = useDebounce(availableSymbols, 800);
    useExportProps(debouncedSymbols, 'availableSymbols', properties, exportProp);

    return (
        <div>
            <TextField
                className="mt0 ml"
                label="Available Currencies"
                value={availableSymbols}
                onChange={setAvailableSymbols}
            />
        </div>
    );
};
export default WidgetGlobalSettings;
