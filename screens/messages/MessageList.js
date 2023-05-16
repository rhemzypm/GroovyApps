import React, { useState, useRef } from "react";
import { ScrollView } from "react-native";

import Message from "./Message";

import { theme } from "../../src/theme";

const MessagesList = ({ onSwipeToReply }) => {
	const [messages, setMessages] = useState([
		{
			user: 0,
			time: "12:00",
			content: "Halo",
		},
		{
			user: 1,
			time: "12:05",
			content: "Selamat siang, apa ada yang bisa kami bantu?",
		},
		{
			user: 0,
			time: "12:08",
			content: "Internetnya kok ngelag ya?",
		},
		{
			user: 0,
			time: "12:09",
			content: "Dari kemarin download cuma 300 kbps",
		},
		{
			user: 1,
			time: "12:15",
			content: "Coba restart routernya kak",
		},
		{
			user: 0,
			time: "12:16",
			content: "Sudah, masih tidak bisa",
		},
		{
			user: 1,
			time: "12:19",
			content: "Internetnya paket yang apa ya?",
		},
		{
			user: 0,
			time: "12:21",
			content: "10 Mbps",
		},
		{
			user: 0,
			time: "12:22",
			content: "Tapi tidak pernah sampe 10 Mbps downloadnya",
		},
		{
			user: 1,
			time: "12:25",
			content: "Mohon sertakan alamat lengkapnya ya kak, agar dapat dicek teknisi kami",
		},
    {
			user: 0,
			time: "12:50",
			content: "Jalan indah no 2, Jakbar",
		},
	]);

	const user = useRef(0);
	const scrollView = useRef();

	return (
		<ScrollView style={{ backgroundColor: theme.colors.white, flex: 1 }}
			ref={ref => scrollView.current = ref}
			onContentChange={() => {
				scrollView.current.scrollToEnd({ animated: true })
			}}
		> 
			{messages.map((message, index) => (
				<Message
					key={index}
					time={message.time}
					isLeft={message.user !== user.current}
					message={message.content}
					onSwipe={onSwipeToReply}
				/>
			))}
		</ScrollView>
	);
};

export default MessagesList;
