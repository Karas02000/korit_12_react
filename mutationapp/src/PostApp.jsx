import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {PlusCircle, Loader2, FileText, Send} from "lucide-react";

const getPosts = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
    if (!res.ok) throw new Error("Failed to fetch posts...⏱️");
    return res.json();
}

const createPost = async ({title, body}) => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({title, body, userId: 1}),
        headers: {'Content-type': 'application/json; charset=UTF-8'},
    });
    return res.json();
}