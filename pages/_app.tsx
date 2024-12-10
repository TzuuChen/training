import React from "react";
import type { AppProps } from "next/app";
import { I18nextProvider } from "react-i18next";
import i18n from "@/app/i18n";
import { Button } from "@mui/material";

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<I18nextProvider i18n={i18n}>
			<div>
				<Button onClick={() => i18n.changeLanguage("zh")}>中文</Button>
				<Button onClick={() => i18n.changeLanguage("en")}>
					English
				</Button>
			</div>
			<Component {...pageProps} />
		</I18nextProvider>
	);
};

export default MyApp;
