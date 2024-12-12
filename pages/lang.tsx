import React, { useMemo, useCallback, useEffect } from "react";
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

// React
const Language = () => {
	const { t } = useTranslation();
	const { setName, setEmail, setAge } = useData();
	const router = useRouter();

	// langLables
	const labels = useMemo(
		() => ({
			name: t("name"),
			email: t("email"),
			age: t("age"),
			submit: t("submit"),
			viewData: t("view_data"),
			prePage: t("pre_page"),
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
			setAge(values.age);
			setEmail(values.email);
			setName(values.name);
			router.push("./data");
		},
		[setAge, setEmail, setName, router]
	);

	const formik = useFormik<MyFormValues>({
		initialValues: {
			name: "",
			email: "",
			age: 0,
		},
		validationSchema: validationSchema,
		onSubmit: handleSubmit,
	});

	useEffect(() => {
		formik.validateForm();
	}, [t]);

	return (
		<div style={{ margin: 5 }}>
			<Button onClick={() => i18n.changeLanguage("zh")}>中文</Button>
			<Button onClick={() => i18n.changeLanguage("en")}>English</Button>
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
					style={{ marginBottom: 10 }}
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
					style={{ marginBottom: 10 }}
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
					style={{ marginBottom: 10 }}
				/>
				<Button
					color="primary"
					variant="contained"
					fullWidth
					type="submit"
					style={{ marginBottom: 5 }}>
					{labels.submit}
				</Button>
			</form>
			<Button
				color="primary"
				variant="contained"
				fullWidth
				onClick={() => {
					router.push("./data");
				}}
				style={{ marginBottom: 5 }}>
				{labels.viewData}
			</Button>
			<Button
				color="primary"
				variant="contained"
				fullWidth
				onClick={() => {
					router.push("./");
				}}
				style={{ marginBottom: 5 }}>
				{labels.prePage}
			</Button>
		</div>
	);
};

export default Language;
