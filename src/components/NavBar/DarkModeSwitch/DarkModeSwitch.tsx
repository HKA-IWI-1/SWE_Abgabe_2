/*
 * Copyright (c) 2024 - present Florian Sauer
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the “Software”), to deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions
 * of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
 * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

import Button from 'react-bootstrap/esm/Button';
import { theme } from '../../../helpers/localStorageKeys.ts';
import { useState } from 'react';

export const DarkModeSwitch = () => {
    const light = 'light';
    const dark = 'dark';
    const initialDarkMode = localStorage.getItem(theme) ?? light;
    const [darkMode, setDarkMode] = useState(initialDarkMode === dark);
    const setTheme = () => {
        document.body.dataset.bsTheme = darkMode ? dark : light;
    };
    setTheme();

    const switchDarkMode = () => {
        setDarkMode(!darkMode);
        localStorage.setItem(theme, darkMode ? light : dark);
        setTheme();
    };

    return (
        <>
            <div className="vr ms-3 me-3" />
            <Button variant="primary" onClick={switchDarkMode}>
                {darkMode && <i className="bi bi-moon-fill"></i>}
                {!darkMode && <i className="bi bi-brightness-high-fill"></i>}
            </Button>
        </>
    );
};
