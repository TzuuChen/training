import React from "react";
import {
	Button,
	List,
	ListItem,
	ListItemText,
	Typography,
} from "@mui/material";
import { useRouter } from "next/router";

import { useData } from "@/store";
import { useTranslation } from "react-i18next";

interface User {
	name: string;
	email: string;
	age: number;
}

const Data: React.FC = () => {
	const { users }: { users: User[] } = useData();
	const { t } = useTranslation();
	const router = useRouter();

	const latestUser = users[users.length - 1];

	return (
		<>
			{latestUser ? (
				<List>
					<ListItem key={1}>
						<ListItemText
							primary={`${t("name")}: ${latestUser.name}`}
							secondary={
								<Typography
									component="span"
									variant="body2"
									sx={{
										color: "text.primary",
										display: "inline",
									}}>
									{t("email")}：{latestUser.email}／{t("age")}
									：{latestUser.age}
								</Typography>
							}
						/>
					</ListItem>
				</List>
			) : (
				<div>{t("no_data")}</div>
			)}

			<Button
				color="primary"
				variant="contained"
				fullWidth
				onClick={() => {
					router.push("./lang");
				}}>
				{users.length === 0 ? (
					<>
						{t("GO")}
						{t("submit")}／{t("change_lang")}
					</>
				) : (
					<>
						{t("submit")}／{t("change_lang")}
					</>
				)}
			</Button>
		</>
	);
};

export default Data;
