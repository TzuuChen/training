import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";

import { useData } from "@/store";

// TypeScript
interface MyFormValues {
	name: string;
	email: string;
	age: number;
}

// Yup
const validationSchema = yup.object({
	name: yup.string().required("姓名為必填項目"),
	email: yup.string().email("Email格式不符").required("電子郵件為必填項目"),
	age: yup
		.number()
		.typeError("年齡必須是數字")
		.min(1, "年齡必須至少為 1 歲")
		.max(120, "年齡不能超過 120 歲")
		.required("年齡為必填項目"),
});

// React
const MyApp = () => {
	const { setName, setEmail, setAge } = useData();
	const router = useRouter();
	const formik = useFormik<MyFormValues>({
		initialValues: {
			name: "",
			email: "",
			age: 0,
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			setAge(values.age);
			setEmail(values.email);
			setName(values.name);
			router.push("./data");
		},
	});

	return (
		<div>
			<form onSubmit={formik.handleSubmit}>
				<TextField
					fullWidth
					id="name"
					name="name"
					label="姓名"
					value={formik.values.name}
					onChange={formik.handleChange}
					error={formik.touched.name && Boolean(formik.errors.name)}
					helperText={formik.touched.name && formik.errors.name}
				/>
				<TextField
					fullWidth
					id="email"
					name="email"
					label="電子郵件"
					value={formik.values.email}
					onChange={formik.handleChange}
					error={formik.touched.email && Boolean(formik.errors.email)}
					helperText={formik.touched.email && formik.errors.email}
				/>
				<TextField
					fullWidth
					id="age"
					name="age"
					label="年齡"
					type="number"
					value={formik.values.age}
					onChange={formik.handleChange}
					error={formik.touched.age && Boolean(formik.errors.age)}
					helperText={formik.touched.age && formik.errors.age}
				/>
				<Button
					color="primary"
					variant="contained"
					fullWidth
					type="submit">
					提交
				</Button>
			</form>
		</div>
	);
};

export default MyApp;
