import React from 'react';
import {
	Paper,
	Text,
	TextInput,
	Textarea,
	Button,
	Group,
	createStyles,
} from '@mantine/core';
import emailjs, { sendForm } from '@emailjs/browser';
import { format } from 'path';
import { useForm } from '@mantine/form';

const useStyles = createStyles((theme) => {
	const BREAKPOINT = theme.fn.smallerThan('sm');
	return {
		wrapper: {
			display: 'flex',
			backgroundColor:
				theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
			borderRadius: theme.radius.lg,
			padding: 4,
			border: `1px solid ${
				theme.colorScheme === 'dark'
					? theme.colors.dark[8]
					: theme.colors.gray[2]
			}`,

			[BREAKPOINT]: {
				flexDirection: 'column',
			},
		},

		form: {
			boxSizing: 'border-box',
			flex: 1,
			padding: theme.spacing.xl,
			paddingLeft: theme.spacing.xl * 2,
			borderLeft: 0,

			[BREAKPOINT]: {
				padding: theme.spacing.md,
				paddingLeft: theme.spacing.md,
			},
		},

		fields: {
			marginTop: -12,
		},

		fieldInput: {
			flex: 1,

			'& + &': {
				marginLeft: theme.spacing.md,

				[BREAKPOINT]: {
					marginLeft: 0,
					marginTop: theme.spacing.md,
				},
			},
		},

		fieldsGroup: {
			display: 'flex',

			[BREAKPOINT]: {
				flexDirection: 'column',
			},
		},

		title: {
			marginBottom: theme.spacing.xl * 1.5,
			fontFamily: `Greycliff CF, ${theme.fontFamily}`,

			[BREAKPOINT]: {
				marginBottom: theme.spacing.xl,
			},
		},

		control: {
			[BREAKPOINT]: {
				flex: 1,
			},
		},
	};
});

export function Feedback() {
	const { classes } = useStyles();

	const form = useForm({
		initialValues: {
			name: '',
			email: '',
			message: '',
		},
		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
		},
	});

	const sendEmail = (e: any) => {
		emailjs
			.sendForm('service_erbggal', 'template_bx0l769', e, 'OSfbZloCDjfdktmeM')
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.error(err);
			});
		// console.log(e.target);

		// for testing now, have to put into an env variable
	};

	return (
		<Paper shadow="md" radius="lg" my="md">
			<div className={classes.wrapper}>
				<form className={classes.form} onSubmit={(e) => sendEmail(e.target)}>
					<Text size="lg" weight={700} className={classes.title}>
						How may we help you?
					</Text>
					<div className={classes.fields}>
						<TextInput
							mt="md"
							name="user_name"
							label="Name"
							placeholder="Name"
							required
							{...form.getInputProps('name')}
						/>
						<TextInput
							mt="md"
							name="from_email"
							label="Email"
							placeholder="your@email.com"
							required
							{...form.getInputProps('email')}
						/>
						<Textarea
							mt="md"
							label="Inquiry"
							name="message"
							placeholder="Please include all relevant information"
							minRows={3}
							{...form.getInputProps('message')}
						/>
						<Group position="right" mt="md">
							<Button type="submit" className={classes.control}>
								Submit
							</Button>
						</Group>
					</div>
				</form>
			</div>
		</Paper>
	);
}
