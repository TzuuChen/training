import React, { useMemo, useCallback } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, TextField } from "@mui/material";
import i18n from "@/app/i18n";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useData } from "@/store";

// TypeScript
interface MyFormValues {
	name: string;
	email: string;
	age: number;
}

interface Labels {
	name: string;
	email: string;
	age: string;
	submit: string;
	viewData: string;
	changeLang: string;
}

const MyApp: React.FC = () => {
	const { t } = useTranslation();
	const { addUser } = useData();
	const router = useRouter();

	const labels = useMemo<Labels>(
		() => ({
			name: t("name"),
			email: t("email"),
			age: t("age"),
			submit: t("submit"),
			viewData: t("view_data"),
			changeLang: t("change_lang"),
		}),
		[t]
	);

	const validationSchema = useMemo(() => {
		const schema = yup.object({
			name: yup.string().required(t("required_name")),
			email: yup
				.string()
				.email(t("invalid_email"))
				.required(t("required_email")),
			age: yup
				.number()
				.typeError(t("must_be_number"))
				.min(1, t("age_min"))
				.max(120, t("age_max"))
				.required(t("required_age")),
		});
		return schema;
	}, [t]);

	const handleSubmit = useCallback(
		(values: MyFormValues) => {
			addUser({
				name: values.name,
				age: values.age,
				email: values.email,
			});
			router.push("./data");
		},
		[addUser, router]
	);

	const changeLang = async (): Promise<void> => {
		const newLang = i18n.language === "zh" ? "en" : "zh";
		await i18n.changeLanguage(newLang);
		router.push("./lang");
	};

	const formik = useFormik<MyFormValues>({
		initialValues: {
			name: "",
			email: "",
			age: 0,
		},
		validationSchema: validationSchema,
		onSubmit: handleSubmit,
	});

	return (
		<div className="container">
			<form onSubmit={formik.handleSubmit}>
				<TextField
					fullWidth
					id="name"
					name="name"
					label={labels.name}
					value={formik.values.name}
					onChange={formik.handleChange}
					error={formik.touched.name && Boolean(formik.errors.name)}
					helperText={formik.touched.name && formik.errors.name}
					className="form_textField"
				/>
				<TextField
					fullWidth
					id="email"
					name="email"
					label={labels.email}
					value={formik.values.email}
					onChange={formik.handleChange}
					error={formik.touched.email && Boolean(formik.errors.email)}
					helperText={formik.touched.email && formik.errors.email}
					className="form_textField"
				/>
				<TextField
					fullWidth
					id="age"
					name="age"
					label={labels.age}
					type="number"
					value={formik.values.age}
					onChange={formik.handleChange}
					error={formik.touched.age && Boolean(formik.errors.age)}
					helperText={formik.touched.age && formik.errors.age}
					className="form_textField"
				/>
				<Button
					color="primary"
					variant="contained"
					fullWidth
					type="submit"
					className="button">
					{labels.submit}
				</Button>
			</form>
			<Button
				color="primary"
				variant="contained"
				fullWidth
				className="button"
				onClick={() => {
					router.push("./data");
				}}>
				{labels.viewData}
			</Button>
			<Button
				color="primary"
				variant="contained"
				fullWidth
				className="button"
				onClick={() => {
					changeLang();
				}}>
				{labels.changeLang}
			</Button>
		</div>
	);
};

export default MyApp;
