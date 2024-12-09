import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

import { useData } from "@/store";
const Data = () => {
	const { name, email, age } = useData();
	const router = useRouter();
	return (
		<>
			<div>
				<p>姓名: {name}</p>
				<p>Email: {email}</p>
				<p>年齡: {age}</p>
			</div>
			<Button
				color="primary"
				variant="contained"
				fullWidth
				onClick={() => {
					router.push("./");
				}}>
				重新輸入資料
			</Button>
		</>
	);
};

export default Data;
