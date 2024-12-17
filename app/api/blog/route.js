import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/blog.model";
import { writeFile } from "fs/promises";
import { loadComponents } from "next/dist/server/load-components";

const { NextResponse } = require("next/server");

const LoadDB = async () => {
    await ConnectDB();
}
LoadDB();

export async function POST(request) {
    try {
        // Parse form data
        const formData = await request.formData();
        const timestamp = Date.now();

        // Extract fields
        const image = formData.get("image");
        const authorImg = formData.get("author_img");
        const author = formData.get("author");

        // Validate required fields
        if (!image || !authorImg || !author) {
            return NextResponse.json({
                success: false,
                message: "Missing required fields: image, author_img, or author.",
            }, { status: 400 });
        }

        // Save the image file locally
        const imageByteData = await image.arrayBuffer();
        const buffer = Buffer.from(imageByteData);
        const imagePath = `./public/${timestamp}_${image.name}`;
        await writeFile(imagePath, buffer);

        // Construct the image URL
        const imageURL = `/${timestamp}_${image.name}`;

        // Prepare blog data
        const blogData = {
            title: formData.get("title"),
            description: formData.get("description"),
            category: formData.get("category"),
            image: imageURL,
            author_img: authorImg,
            author: author,
        };

        // save the data
        await BlogModel.create(blogData);

        console.log("Blog saved successfully");
        return NextResponse.json({ success: true, msg: "Blog Added" });

    } catch (error) {
        console.error("Error saving blog:", error.message);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        }, { status: 500 });
    }
}
